import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import Timeline from "../models/timeline";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";
import type mongoose from "mongoose";

// POST api/timeline
export const createTimeline: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { year, description, imageUrl } = req.body as {
      year: number;
      description: string;
      imageUrl: string;
    };
    const timeline = await Timeline.create({ year, description, imageUrl });
    res.status(201).json(timeline);
  } catch (error) {
    next(error);
  }
};

// PUT api/timeline
export const updateTimeline: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(validationErrorParser(errors));
  }
  try {
    type IncomingTimelineItem = {
      _id?: string;
      year: number;
      description: string;
      imageUrl: string;
    };
    const incoming = req.body as IncomingTimelineItem[];
    const existing: (IncomingTimelineItem & { _id: mongoose.Types.ObjectId })[] =
      await Timeline.find();
    const incomingIds = incoming.filter((item) => item._id).map((item) => String(item._id));

    // Delete items not in incoming
    const toDelete = existing.filter((item) => !incomingIds.includes(item._id.toString()));
    await Timeline.deleteMany({ _id: { $in: toDelete.map((item) => item._id) } });

    // Delete their images from Firebase
    await Promise.all(toDelete.map(async (item) => deleteImageFromFirebaseStorage(item.imageUrl)));

    // Update existing items
    await Promise.all(
      incoming
        .filter((item) => item._id)
        .map((item) =>
          Timeline.findByIdAndUpdate(item._id, {
            year: item.year,
            description: item.description,
            imageUrl: item.imageUrl,
          }),
        ),
    );

    // Create new items
    const toCreate = incoming.filter((item) => !item._id);
    if (toCreate.length) await Timeline.insertMany(toCreate);

    const updated = await Timeline.find().sort({ year: 1 });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// GET api/timeline/all
export const getTimeline: RequestHandler = async (req, res, next) => {
  try {
    const timelines = await Timeline.find().sort({ year: 1 });
    res.status(200).json(timelines);
  } catch (error) {
    next(error);
  }
};

// DELETE api/timeline/:id
export const deleteTimeline: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;
    const timeline = await Timeline.findById(id);
    if (!timeline) throw createHttpError(404, "timeline not found");

    await deleteImageFromFirebaseStorage(timeline.imageUrl);
    await Timeline.findByIdAndDelete(id);

    res.status(200).json({ message: "timeline item deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};
