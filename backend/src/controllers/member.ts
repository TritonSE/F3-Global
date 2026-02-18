import { validationResult } from "express-validator";

import Member from "../models/member";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { MemberModel } from "../models/member";
import type { RequestHandler } from "express";

export const getAllMembers: RequestHandler = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

export const createMember: RequestHandler<Record<string, any>, unknown, MemberModel> = async (
  req,
  res,
  next,
) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    next(error);
  }
};

export const updateMembers: RequestHandler<
  Record<string, any>,
  unknown,
  Partial<MemberModel>
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const incomingMembers = req.body as (MemberModel & { _id?: string })[];
    const currentMembers = await Member.find({});
    const currentMemberMap = new Map(currentMembers.map((m) => [m._id.toString(), m]));

    const incomingIds = new Set(incomingMembers.filter((m) => m._id).map((m) => m._id.toString()));

    const membersToDelete = currentMembers.filter((m) => !incomingIds.has(m._id.toString()));

    const imageDeletionPromises: Promise<void>[] = [];
    const dbOperations: Promise<any>[] = [];

    for (const member of membersToDelete) {
      if (member.headshotUrl) {
        imageDeletionPromises.push(
          deleteImageFromFirebaseStorage(member.headshotUrl).catch((e) =>
            console.error(`failed to delete image for member ${member._id.toString()}:`, e),
          ),
        );
      }
      dbOperations.push(Member.deleteOne({ _id: member._id }));
    }

    for (const incoming of incomingMembers) {
      if (incoming._id && currentMemberMap.has(incoming._id)) {
        const current = currentMemberMap.get(incoming._id)!;

        if (current.headshotUrl !== incoming.headshotUrl) {
          imageDeletionPromises.push(
            deleteImageFromFirebaseStorage(current.headshotUrl).catch((e) =>
              console.error(`failed to delete old image for member ${current._id.toString()}:`, e),
            ),
          );
        }

        dbOperations.push(Member.findByIdAndUpdate(incoming._id, incoming, { new: true }));
      } else {
        const { _id, ...memberData } = incoming;
        const newMember = new Member(memberData);
        dbOperations.push(newMember.save());
      }
    }

    await Promise.all(imageDeletionPromises);
    await Promise.all(dbOperations);

    const updatedMembersList = await Member.find({});
    res.status(200).json(updatedMembersList);
  } catch (error) {
    next(error);
  }
};

export const deleteMember: RequestHandler<Record<string, any>> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "member not found" });
    }

    await deleteImageFromFirebaseStorage(member.headshotUrl);

    const result = await Member.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
