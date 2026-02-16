import { validationResult } from "express-validator";

import HighlightModel from "../models/highlights";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

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

export const UpdateHighlights: RequestHandler = async (req, res, next) => {
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

    const hashmap = new Map();
    highlightdocument.highlights.forEach((highlight) => {
      if (highlight._id) {
        hashmap.set(highlight._id.toString(), highlight);
      }
    });

    const updatedHighlights = highlights.map((highlight) => {
      if (highlight._id && hashmap.has(highlight._id)) {
        return {
          _id: highlight._id, // Preserve existing _id
          quoteText: highlight.quoteText,
          previewText: highlight.previewText,
          imageUrl: highlight.imageUrl,
          fullText: highlight.fullText,
          index: highlight.index,
        };
      } else {
        return {
          quoteText: highlight.quoteText,
          previewText: highlight.previewText,
          imageUrl: highlight.imageUrl,
          fullText: highlight.fullText,
          index: highlight.index,
        };
      }
    });

    highlightdocument.highlights = updatedHighlights;
    await highlightdocument.save();
    res.status(200).json(highlightdocument);
  } catch (error) {
    next(error); // Pass errors to error handler
  }
};
