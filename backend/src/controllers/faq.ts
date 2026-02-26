import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import { FAQModel } from "../models/faq";
import validationErrorParser from "../utils/validationErrorParser";

import type { FAQPage } from "../models/faq";
import type { RequestHandler } from "express";

type FAQInput = {
  _id?: string;
  page: FAQPage;
  question: string;
  answer: string;
  order: string;
};

type FAQQuery = {
  page: FAQPage;
};

type FAQIdParams = {
  id: string;
};

export const createFAQ: RequestHandler<Record<string, never>, unknown, FAQInput> = async (
  req,
  res,
  next,
) => {
  try {
    validationErrorParser(validationResult(req));
    const created = await FAQModel.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const getFaqs: RequestHandler<Record<string, never>, unknown, unknown, FAQQuery> = async (
  req,
  res,
  next,
) => {
  try {
    validationErrorParser(validationResult(req));
    const { page } = req.query;

    const faqs = await FAQModel.find({ page })
      .sort({ order: 1 })
      .collation({ locale: "en", numericOrdering: true });

    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
};

export const updateFaq: RequestHandler<
  Record<string, never>,
  unknown,
  FAQInput[],
  FAQQuery
> = async (req, res, next) => {
  try {
    validationErrorParser(validationResult(req));

    const { page } = req.query;
    const incoming = req.body;

    // Safety check: all objects in body must match query page
    for (const faq of incoming) {
      if (faq.page !== page) {
        throw createHttpError(400, `All FAQ objects must have page="${page}"`);
      }
    }

    const existing = await FAQModel.find({ page });
    const existingById = new Map(existing.map((doc) => [doc._id.toString(), doc]));

    const incomingWithId = incoming.filter(
      (faq): faq is FAQInput & { _id: string } => typeof faq._id === "string" && faq._id.length > 0,
    );
    const incomingIds = new Set(incomingWithId.map((faq) => faq._id));

    // Reject unknown _id in body
    for (const faq of incomingWithId) {
      if (!existingById.has(faq._id)) {
        throw createHttpError(404, `FAQ not found for _id: ${faq._id}`);
      }
    }

    // Update existing docs
    if (incomingWithId.length > 0) {
      await FAQModel.bulkWrite(
        incomingWithId.map((faq) => ({
          updateOne: {
            filter: { _id: faq._id },
            update: {
              $set: {
                page: faq.page,
                question: faq.question,
                answer: faq.answer,
                order: faq.order,
              },
            },
          },
        })),
      );
    }

    // Delete docs removed by frontend
    const idsToDelete = existing
      .filter((doc) => !incomingIds.has(doc._id.toString()))
      .map((doc) => doc._id);

    if (idsToDelete.length > 0) {
      await FAQModel.deleteMany({ _id: { $in: idsToDelete } });
    }

    // Insert new docs
    const newFaqs = incoming
      .filter((faq) => !faq._id)
      .map(({ page: faqPage, question, answer, order }) => ({
        page: faqPage,
        question,
        answer,
        order,
      }));

    if (newFaqs.length > 0) {
      await FAQModel.insertMany(newFaqs);
    }

    const updatedFaqs = await FAQModel.find({ page })
      .sort({ order: 1 })
      .collation({ locale: "en", numericOrdering: true });

    res.status(200).json(updatedFaqs);
  } catch (error) {
    next(error);
  }
};

export const deleteFaq: RequestHandler<FAQIdParams> = async (req, res, next) => {
  try {
    validationErrorParser(validationResult(req));

    const deleted = await FAQModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      throw createHttpError(404, "FAQ not found");
    }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
