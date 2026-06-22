import { validationResult } from "express-validator";

import NewsletterModel from "../models/newsletters";
import {
  deleteImageFromFirebaseStorage,
  deletePdfFromFirebaseStorage,
} from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

type NewsletterPayload = {
  title: string;
  uploadDate: Date;
  views: number;
  blurb: string;
  pdfUrl: string;
  imageUrl: string;
  featured?: boolean;
};

const SORT_OPTIONS: Record<string, Record<string, 1 | -1>> = {
  none: {},
  newest: { uploadDate: -1 },
  oldest: { uploadDate: 1 },
  mostViewed: { views: -1 },
  leastViewed: { views: 1 },
  titleAsc: { title: 1 },
  titleDesc: { title: -1 },
  dateAsc: { uploadDate: 1 },
  dateDesc: { uploadDate: -1 },
  viewsAsc: { views: 1 },
  viewsDesc: { views: -1 },
};

const escapeRegex = (input: string): string => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SEARCH_FIELDS = ["title", "blurb", "pdfUrl"] as const;
type SearchField = (typeof SEARCH_FIELDS)[number];

const getSearchFields = (input: unknown): SearchField[] => {
  if (typeof input !== "string") {
    return ["title", "blurb"];
  }

  const requestedFields = input
    .split(",")
    .map((field) => field.trim())
    .filter((field): field is SearchField => SEARCH_FIELDS.includes(field as SearchField));

  return requestedFields.length ? requestedFields : ["title", "blurb"];
};

export const getNewsletters: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const page = Math.max(1, Number.parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Number.parseInt(req.query.limit as string) || 10);

    const search = (req.query.search as string | undefined)?.trim();
    const featuredOnly = req.query.featured === "true";
    const searchFields = getSearchFields(req.query.searchFields);

    const filter: Record<string, unknown> = {};
    if (search) {
      const searchRegex = { $regex: escapeRegex(search), $options: "i" };
      filter.$or = searchFields.map((field) => ({ [field]: searchRegex }));
    }
    if (featuredOnly) filter.featured = true;

    const sortKey = (req.query.sortBy as string | undefined) ?? "none";
    const selectedSort = SORT_OPTIONS[sortKey] ?? SORT_OPTIONS.none;

    if (featuredOnly) {
      const skip = (page - 1) * limit;
      const data = (
        await NewsletterModel.find(filter).sort(selectedSort).skip(skip).limit(limit)
      ).map((doc) => ({
        ...doc.toObject(),
        imageUrl: doc.imageUrl ?? "",
      }));
      const total = await NewsletterModel.countDocuments(filter);

      return res.status(200).json({
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    }

    if (search) {
      const skip = (page - 1) * limit;
      const data = (
        await NewsletterModel.find(filter).sort(selectedSort).skip(skip).limit(limit)
      ).map((doc) => ({
        ...doc.toObject(),
        imageUrl: doc.imageUrl ?? "",
      }));
      const total = await NewsletterModel.countDocuments(filter);

      return res.status(200).json({
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    }

    const featuredDoc = await NewsletterModel.findOne({ ...filter, featured: true });
    const nonFeaturedFilter = { ...filter, featured: { $ne: true } };
    const nonFeaturedLimit = featuredDoc ? Math.max(1, limit - 1) : limit;
    const skip = (page - 1) * nonFeaturedLimit;

    const nonFeaturedDocs = await NewsletterModel.find(nonFeaturedFilter)
      .sort(selectedSort)
      .skip(skip)
      .limit(nonFeaturedLimit);
    const total = await NewsletterModel.countDocuments(nonFeaturedFilter);
    const data = [...(featuredDoc ? [featuredDoc] : []), ...nonFeaturedDocs].map((doc) => ({
      ...doc.toObject(),
      imageUrl: doc.imageUrl ?? "",
    }));

    res.status(200).json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / nonFeaturedLimit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsletterById: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const doc = await NewsletterModel.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

export const createNewsletter: RequestHandler<
  Record<string, any>,
  unknown,
  NewsletterPayload
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { title, uploadDate, views, blurb, pdfUrl, imageUrl, featured } = req.body;

    if (featured === true) {
      await NewsletterModel.updateMany({ featured: true }, { $set: { featured: false } });
    }

    const doc = await NewsletterModel.create({
      title,
      uploadDate,
      views,
      blurb,
      pdfUrl,
      imageUrl,
      featured,
    });
    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

export const updateNewsletter: RequestHandler<
  { id: string },
  unknown,
  Partial<NewsletterPayload>
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;
    const updateData = req.body;
    const existingDoc = await NewsletterModel.findById(id);
    if (!existingDoc) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    if (updateData.featured === true) {
      await NewsletterModel.updateMany(
        { _id: { $ne: id }, featured: true },
        { $set: { featured: false } },
      );
    }

    if (updateData.pdfUrl && updateData.pdfUrl !== existingDoc.pdfUrl) {
      await deletePdfFromFirebaseStorage(existingDoc.pdfUrl);
    }

    if (
      updateData.imageUrl &&
      existingDoc.imageUrl &&
      updateData.imageUrl !== existingDoc.imageUrl
    ) {
      await deleteImageFromFirebaseStorage(existingDoc.imageUrl);
    }

    const doc = await NewsletterModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!doc) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

export const deleteNewsletter: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;
    const doc = await NewsletterModel.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    await deletePdfFromFirebaseStorage(doc.pdfUrl);
    if (doc.imageUrl) {
      await deleteImageFromFirebaseStorage(doc.imageUrl);
    }
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const incrementNewsletterViews: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;
    const doc = await NewsletterModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

    if (!doc) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};
