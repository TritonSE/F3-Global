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

    const { year, text, imageUrl } = req.body as { year: number; text: string; imageUrl: string };
    const timeline = await Timeline.create({ year, text, imageUrl });
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

    // Treat the PUT body as the full final timeline list from the admin client.
    type IncomingTimelineItem = {
      _id?: string;
      year: number;
      text: string;
      imageUrl: string;
    };

    const incomingTimeline = req.body as IncomingTimelineItem[];

    // Load the current DB state so we can compare old items against the incoming list.
    const existingTimeline = await Timeline.find();
    const existingById = new Map(existingTimeline.map((doc) => [doc._id.toString(), doc]));

    // Split out items that already exist so we can validate their ids and reuse them.
    const incomingExistingItems = incomingTimeline.filter(
      (item): item is IncomingTimelineItem & { _id: string } => Boolean(item._id),
    );
    const unknownIds = incomingExistingItems
      .filter((item) => !existingById.has(item._id))
      .map((item) => item._id);

    // Reject stale ids before we start deleting or updating anything.
    if (unknownIds.length > 0) {
      throw createHttpError(404, `timeline item not found for _id: ${unknownIds[0]}`);
    }

    // Anything missing from the incoming list should be removed from MongoDB.
    const incomingIds = new Set(incomingExistingItems.map((item) => item._id));
    const timelineToDelete = existingTimeline.filter((doc) => !incomingIds.has(doc._id.toString()));

    // Keep track of old Firebase URLs that should be cleaned up after the DB write.
    const outdatedImageUrls: string[] = [];

    // Start the bulk write with a delete step so PUT behaves like full replacement.
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

        // If the image changed, remember the old one so Firebase can delete it later.
        if (existingItem && existingItem.imageUrl !== item.imageUrl) {
          outdatedImageUrls.push(existingItem.imageUrl);
        }

        // Existing item: update it in place.
        ops.push({
          updateOne: {
            filter: { _id: item._id },
            update: { year: item.year, text: item.text, imageUrl: item.imageUrl },
          },
        });
      } else {
        // New item: insert it because there is no _id yet.
        ops.push({
          insertOne: {
            document: {
              year: item.year,
              text: item.text,
              imageUrl: item.imageUrl,
            } as unknown as timelineModel,
          },
        });
      }
    }

    // Apply the full replacement in MongoDB.
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
