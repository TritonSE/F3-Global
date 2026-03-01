import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Types } from "mongoose";

import Faq from "../models/faq";
import validationErrorParser from "../utils/validationErrorParser";

import type { FAQModel } from "../models/faq";
import type { RequestHandler } from "express";

type FaqPayloadItem = {
  _id?: string;
  question: string;
  answer: string;
  order: number;
};

type CreateFaqRequest = {
  page: "members" | "clients" | "donors";
  question: string;
  answer: string;
  order: number;
};

type BulkSyncRequest = FaqPayloadItem[];

type BulkSyncResponse = {
  inserted: number;
  updated: number;
  deleted: number;
  faqs: FAQModel[];
};

type DeleteFaqResponse = {
  message: string;
  deleted: FAQModel;
};

// ── POST /api/faq/create ──────────────────────────────────────────────────────
export const createFaq: RequestHandler<Record<string, never>, FAQModel, CreateFaqRequest> = async (
  req,
  res,
  next,
) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { page, question, answer, order } = req.body;
    const faq = await Faq.create({ page, question, answer, order });
    res.status(201).json(faq);
  } catch (error) {
    next(error);
  }
};

// ── GET /api/faq/?page={pageKey} ──────────────────────────────────────────────
export const getFaqsByPage: RequestHandler<
  Record<string, never>,
  FAQModel[],
  { page: string }
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { page } = req.query as { page: string };
    const faqs = await Faq.find({ page }).sort({ order: 1 });
    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
};

// ── PUT /api/faq/?page={pageKey} ──────────────────────────────────────────────
export const bulkSyncFaqs: RequestHandler<
  Record<string, never>,
  BulkSyncResponse,
  BulkSyncRequest
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { page } = req.query as { page: string };
    const incomingFaqs = req.body;

    // Split incoming items into those that exist in the DB and those that are new
    const existingItems = incomingFaqs.filter((f) => f._id && Types.ObjectId.isValid(f._id));
    const newItems = incomingFaqs.filter((f) => !f._id || !Types.ObjectId.isValid(f._id));

    const keptIds = existingItems.map((f) => new Types.ObjectId(f._id!));

    // 1. Delete documents for this page that are no longer in the list
    const deleteResult = await Faq.deleteMany({
      page,
      _id: { $nin: keptIds },
    });

    // 2. Update documents that were kept (may have been edited)
    const updatePromises = existingItems.map((f) =>
      Faq.findByIdAndUpdate(
        f._id,
        { $set: { question: f.question, answer: f.answer, order: f.order } },
        { new: true, runValidators: true },
      ),
    );
    await Promise.all(updatePromises);

    // 3. Insert brand-new documents
    const insertedFaqs =
      newItems.length > 0
        ? await Faq.insertMany(
            newItems.map((f) => ({
              page,
              question: f.question,
              answer: f.answer,
              order: f.order,
            })),
          )
        : [];

    // 4. Return the final state for this page
    const finalFaqs = await Faq.find({ page }).sort({ order: 1 });

    res.status(200).json({
      inserted: insertedFaqs.length,
      updated: existingItems.length,
      deleted: deleteResult.deletedCount,
      faqs: finalFaqs,
    });
  } catch (error) {
    next(error);
  }
};

// ── DELETE /api/faq/:id ───────────────────────────────────────────────────────
export const deleteFaq: RequestHandler<{ id: string }, DeleteFaqResponse> = async (
  req,
  res,
  next,
) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const deleted = await Faq.findByIdAndDelete(req.params.id);

    if (!deleted) {
      throw createHttpError(404, "FAQ not found");
    }

    res.status(200).json({ message: "FAQ deleted successfully", deleted });
  } catch (error) {
    next(error);
  }
};
