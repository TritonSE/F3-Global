import { validationResult } from "express-validator";

import Affiliate from "../models/affiliate";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";
import type mongoose from "mongoose";

// GET /api/affiliates/all
export const getAllAffiliates: RequestHandler = async (req, res, next) => {
  try {
    const affiliates = await Affiliate.find().sort({ order: 1 });
    res.status(200).json(affiliates);
  } catch (error) {
    next(error);
  }
};

// POST /api/affiliates
export const createAffiliate: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { name, imageUrl, order } = req.body as { name: string; imageUrl: string; order: number };
    const affiliate = await Affiliate.create({ name, imageUrl, order });
    res.status(201).json(affiliate);
  } catch (error) {
    next(error);
  }
};

// PUT /api/affiliates
export const updateAffiliates: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    type IncomingAffiliate = { _id?: string; name: string; imageUrl: string; order?: number }; // type for affiliate data coming from client
    const incomingAffiliates = req.body as IncomingAffiliate[];
    const existingAffiliates: (IncomingAffiliate & { _id: mongoose.Types.ObjectId })[] =
      await Affiliate.find();

    // Delete removed affiliates + their images
    const incomingIds = incomingAffiliates
      .filter((affiliate) => affiliate._id)
      .map((affiliate) => String(affiliate._id));

    const affiliatesToDelete = existingAffiliates.filter(
      (affiliate) => !incomingIds.includes(String(affiliate._id)),
    );

    await Affiliate.deleteMany({
      _id: { $in: affiliatesToDelete.map((affiliate) => affiliate._id) },
    });

    await Promise.all(
      affiliatesToDelete.map(async (affiliate) =>
        deleteImageFromFirebaseStorage(affiliate.imageUrl),
      ),
    );

    // Update existing affiliates + remove outdated images from firebase
    await Promise.all(
      incomingAffiliates
        .filter((affiliate) => affiliate._id)
        .map((affiliate) => {
          const existing = existingAffiliates.find((e) => String(e._id) === String(affiliate._id));
          if (existing && existing.imageUrl !== affiliate.imageUrl) {
            deleteImageFromFirebaseStorage(existing.imageUrl).catch((e) =>
              console.error(`Failed to delete old image for affiliate ${affiliate._id}:`, e),
            );
          }
          return Affiliate.findByIdAndUpdate(affiliate._id, {
            name: affiliate.name,
            imageUrl: affiliate.imageUrl,
            order: affiliate.order,
          });
        }),
    );

    // Create new affiliates
    const newAffiliates = incomingAffiliates.filter((affiliate) => !affiliate._id);
    if (newAffiliates.length) await Affiliate.insertMany(newAffiliates);

    const updatedAffiliatesList = await Affiliate.find();
    res.status(200).json(updatedAffiliatesList);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/affiliates/:id
export const deleteAffiliates: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { id } = req.params;
    const affiliate = await Affiliate.findById(id);
    if (!affiliate) return res.status(404).json({ error: "Affiliate not found" });

    await deleteImageFromFirebaseStorage(affiliate.imageUrl);
    await Affiliate.findByIdAndDelete(id);
    res.status(200).json({ message: "Affiliate deleted" });
  } catch (error) {
    next(error);
  }
};
