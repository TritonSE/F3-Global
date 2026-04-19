import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import Timeline from "../models/timeline";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { timelineModel } from "../models/timeline";
import type { RequestHandler } from "express";
import type { AnyBulkWriteOperation } from "mongoose";

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
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    type IncomingTimelineItem = {
      _id?: string;
      year: number;
      description: string;
      imageUrl: string;
    };

    const incomingTimeline = req.body as IncomingTimelineItem[];
    const incomingImageUrls = new Set(incomingTimeline.map((item) => item.imageUrl));

    const existingTimeline = await Timeline.find();
    const existingById = new Map(existingTimeline.map((doc) => [doc._id.toString(), doc]));

    const incomingExistingItems = incomingTimeline.filter(
      (item): item is IncomingTimelineItem & { _id: string } => Boolean(item._id),
    );
    const unknownIds = incomingExistingItems
      .filter((item) => !existingById.has(item._id))
      .map((item) => item._id);

    if (unknownIds.length > 0) {
      throw createHttpError(404, `timeline item not found for _id: ${unknownIds[0]}`);
    }

    const incomingIds = new Set(incomingExistingItems.map((item) => item._id));
    const timelineToDelete = existingTimeline.filter((doc) => !incomingIds.has(doc._id.toString()));
    const outdatedImageUrls: string[] = [];
    const ops: AnyBulkWriteOperation<timelineModel>[] = [
      {
        deleteMany: {
          filter: { _id: { $nin: [...incomingIds] } },
        },
      },
    ];

    for (const item of incomingTimeline) {
      if (item._id) {
        const existingItem = existingById.get(item._id);

        if (existingItem && existingItem.imageUrl !== item.imageUrl) {
          outdatedImageUrls.push(existingItem.imageUrl);
        }

        ops.push({
          updateOne: {
            filter: { _id: item._id },
            update: { year: item.year, description: item.description, imageUrl: item.imageUrl },
          },
        });
      } else {
        ops.push({
          insertOne: {
            document: {
              year: item.year,
              description: item.description,
              imageUrl: item.imageUrl,
            } as unknown as timelineModel,
          },
        });
      }
    }

    await Timeline.bulkWrite(ops);

    // Delete images for removed items and for items whose image URL changed.
    const imageUrlsToDelete = [
      ...timelineToDelete.map((item) => item.imageUrl),
      ...outdatedImageUrls,
    ];

    await Promise.allSettled(
      imageUrlsToDelete.map(async (imageUrl) => deleteImageFromFirebaseStorage(imageUrl)),
    );

    const updated = await Timeline.find().sort({ year: 1 });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
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
