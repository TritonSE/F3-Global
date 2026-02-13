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

export const updateMember: RequestHandler<
  Record<string, any>,
  unknown,
  Partial<MemberModel>
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;
    const updateData = req.body;

    const updatedMember = await Member.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedMember) {
      res.status(404).json({ error: "member not found" });
      return;
    }

    res.status(200).json(updatedMember);
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
