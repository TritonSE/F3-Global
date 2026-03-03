import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Types } from "mongoose";

import Faq from "../models/faq";
import validationErrorParser from "../utils/validationErrorParser";

import type { FAQModel } from "../models/faq";
import type { RequestHandler } from "express";
import type { AnyBulkWriteOperation } from "mongoose";

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

type BulkWriteRequest = FaqPayloadItem[];

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
export const bulkWriteFaqs: RequestHandler<
  Record<string, never>,
  FAQModel[],
  BulkWriteRequest
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { page } = req.query as { page: "members" | "clients" | "donors" };
    const incomingFaqs = req.body;

    // Remove any FAQs for this page that were not included in the incoming payload
    // This must come first so it runs before insertOnes (bulkWrite is ordered),
    // otherwise newly inserted docs would be immediately deleted.
    const existingIds = incomingFaqs.filter((f) => f._id).map((f) => new Types.ObjectId(f._id!));
    const ops: AnyBulkWriteOperation<FAQModel>[] = [
      {
        deleteMany: {
          filter: { page, _id: { $nin: existingIds } },
        },
      },
    ];

    for (const f of incomingFaqs) {
      if (f._id) {
        ops.push({
          updateOne: {
            filter: { _id: new Types.ObjectId(f._id), page },
            update: { $set: { question: f.question, answer: f.answer, order: f.order } },
          },
        });
      } else {
        ops.push({
          insertOne: {
            document: {
              page,
              question: f.question,
              answer: f.answer,
              order: f.order,
            } as unknown as FAQModel,
          },
        });
      }
    }

    await Faq.bulkWrite(ops);
    const faqs = await Faq.find({ page }).sort({ order: 1 });

    res.status(200).json(faqs);
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
