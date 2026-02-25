import { validationResult } from "express-validator";

import HighlightModel from "../models/highlights";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";
import type { Types } from "mongoose";

// Type definitions for request body
type HighlightRequestItem = {
  _id?: string | Types.ObjectId;
  quoteText: string;
  previewText: string;
  imageUrl: string;
  fullText: string;
  order: number;
};

type UpdateHighlightsRequestBody = {
  highlights: HighlightRequestItem[];
};

export const GetHighlights: RequestHandler = async (req, res, next) => {
  try {
    const result = await HighlightModel.findOne();
    if (!result) {
      return res.status(200).json({ highlights: [] });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const UpdateHighlights: RequestHandler<
  Record<string, never>,
  unknown,
  UpdateHighlightsRequestBody
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { highlights } = req.body;

    let highlightdocument = await HighlightModel.findOne();

    if (!highlightdocument) {
      highlightdocument = new HighlightModel({ highlights });
      await highlightdocument.save();
      return res.status(201).json(highlightdocument);
    }
    // Updated to set and not hashmaps
    const existingIds = new Set<string>();
    highlightdocument.highlights.forEach((highlight) => {
      if (highlight._id) {
        existingIds.add(String(highlight._id));
      }
    });

    const updatedHighlights = highlights.map((highlight) => {
      if (highlight._id && existingIds.has(String(highlight._id))) {
        // Updating existing highlight
        return {
          _id: highlight._id,
          quoteText: highlight.quoteText,
          previewText: highlight.previewText,
          imageUrl: highlight.imageUrl,
          fullText: highlight.fullText,
          order: highlight.order,
        };
      } else {
        // Creating new highlight
        return {
          quoteText: highlight.quoteText,
          previewText: highlight.previewText,
          imageUrl: highlight.imageUrl,
          fullText: highlight.fullText,
          order: highlight.order,
        };
      }
    });

    // Delete old images from Firebase Storage
    const oldImageUrls = highlightdocument.highlights.map((h) => h.imageUrl);
    const newImageUrls = updatedHighlights.map((h) => h.imageUrl);
    const imagesToDelete = oldImageUrls.filter((url: string) => !newImageUrls.includes(url));

    //removed images from Firebase Storage in parallel
    await Promise.all(
      imagesToDelete.map(async (imageUrl) => {
        try {
          await deleteImageFromFirebaseStorage(imageUrl);
        } catch (error) {
          console.error(`Failed to delete image from storage:`, error);
        }
      }),
    );

    highlightdocument.highlights = updatedHighlights;
    await highlightdocument.save();
    res.status(200).json(highlightdocument);
  } catch (error) {
    next(error);
  }
};
