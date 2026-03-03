import { validationResult } from "express-validator";

import College from "../models/college";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";
import type mongoose from "mongoose";

// GET /api/colleges/all
export const getAllColleges: RequestHandler = async (req, res, next) => {
  try {
    const colleges = await College.find().sort({ order: 1 });
    res.status(200).json(colleges);
  } catch (err) {
    next(err);
  }
};

// POST /api/colleges
export const createCollege: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorParser(errors));
  }
  try {
    const { name, imageUrl, order } = req.body as { name: string; imageUrl: string; order: number };
    const college = await College.create({ name, imageUrl, order });
    res.status(201).json(college);
  } catch (err) {
    next(err);
  }
};

// PUT /api/colleges
export const updateColleges: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorParser(errors));
  }
  try {
    type IncomingCollege = { _id?: string; name: string; imageUrl: string; order?: number };
    const incoming = req.body as IncomingCollege[];
    const existing: (IncomingCollege & { _id: mongoose.Types.ObjectId })[] = await College.find();
    const incomingIds = incoming
      .filter((college) => college._id)
      .map((college) => String(college._id));

    // Delete colleges not in incoming
    const toDelete = existing.filter((college) => !incomingIds.includes(college._id.toString()));
    await College.deleteMany({ _id: { $in: toDelete.map((college) => college._id) } });

    // Delete their images from Firebase (in parallel)
    await Promise.all(
      toDelete.map(async (college) => deleteImageFromFirebaseStorage(college.imageUrl)),
    );

    // Update existing colleges (in parallel)
    await Promise.all(
      incoming
        .filter((college) => college._id)
        .map((college) =>
          College.findByIdAndUpdate(college._id, {
            name: college.name,
            imageUrl: college.imageUrl,
            order: college.order,
          }),
        ),
    );

    // Create new colleges
    const toCreate = incoming.filter((college) => !college._id);
    if (toCreate.length) await College.insertMany(toCreate);

    const updated = await College.find();
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/colleges/:id
export const deleteCollege: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorParser(errors));
  }
  try {
    const { id } = req.params;
    const college = await College.findById(id);
    if (!college) return res.status(404).json({ error: "College not found" });
    await deleteImageFromFirebaseStorage(college.imageUrl);
    await College.findByIdAndDelete(id);
    res.status(200).json({ message: "College deleted" });
  } catch (err) {
    next(err);
  }
};
