import { validationResult } from "express-validator";

import NewsletterModel from "../models/newsletters";
import { deletePdfFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

type NewsletterPayload = {
  title: string;
  uploadDate: Date;
  views: number;
  blurb: string;
  authorName: string;
  pdfUrl: string;
};

export const getAllNewsletters: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const data = await NewsletterModel.find();
    res.status(200).json(data);
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

    const { title, uploadDate, views, blurb, authorName, pdfUrl } = req.body;
    const doc = await NewsletterModel.create({
      title,
      uploadDate,
      views,
      blurb,
      authorName,
      pdfUrl,
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

    if (updateData.pdfUrl && updateData.pdfUrl !== existingDoc.pdfUrl) {
      await deletePdfFromFirebaseStorage(existingDoc.pdfUrl);
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
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    next(error);
  }
};
