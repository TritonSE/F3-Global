import { validationResult } from "express-validator";

import { ClientModel } from "../models/client";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";
import type { AnyBulkWriteOperation } from "mongoose";

export type Client = {
  name: string;
  imageUrl: string;
};

export const getAllClients: RequestHandler = async (req, res, next) => {
  try {
    const clients = await ClientModel.find();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

export const createClient: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const { name, imageUrl } = req.body as Client;

    const client = await ClientModel.create({ name, imageUrl });
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

export const removeClient: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await ClientModel.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await deleteImageFromFirebaseStorage(client.imageUrl);
    const result = await ClientModel.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export type ClientInput = {
  _id?: string;
  name: string;
  imageUrl: string;
};

type UpdateClientsReqBody = ClientInput[];
type UpdateClientsResBody = unknown;

export const updateClients: RequestHandler<
  Record<string, never>,
  UpdateClientsResBody,
  UpdateClientsReqBody
> = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const incoming = req.body;

    const existing = await ClientModel.find();
    const existingById = new Map(existing.map((doc) => [doc._id.toString(), doc]));

    const incomingWithId = incoming.filter(
      (c): c is ClientInput & { _id: string } => typeof c._id === "string" && c._id.length > 0,
    );
    const incomingNew = incoming.filter((c) => !c._id);
    const incomingIds = new Set(incomingWithId.map((c) => c._id));

    const docsToDelete = existing.filter((doc) => !incomingIds.has(doc._id.toString()));
    const outdatedImageUrls: string[] = [];

    const updateOps: AnyBulkWriteOperation[] = incomingWithId.map((c) => {
      const id = c._id;
      const doc = existingById.get(id);

      if (!doc) {
        throw Object.assign(new Error(`Client not found for _id: ${id}`), { statusCode: 404 });
      }

      if (doc.imageUrl !== c.imageUrl) {
        outdatedImageUrls.push(doc.imageUrl);
      }

      return {
        updateOne: {
          filter: { _id: id },
          update: { $set: { name: c.name, imageUrl: c.imageUrl } },
        },
      };
    });

    if (updateOps.length > 0) {
      await ClientModel.bulkWrite(updateOps);
    }
    if (incomingNew.length > 0) {
      await ClientModel.insertMany(incomingNew.map(({ name, imageUrl }) => ({ name, imageUrl })));
    }
    if (docsToDelete.length > 0) {
      await ClientModel.deleteMany({ _id: { $in: docsToDelete.map((d) => d._id) } });
    }

    const imgsToDelete = {
      ...docsToDelete.map((d) => d.imageUrl),
      ...outdatedImageUrls,
    };

    await Promise.allSettled(imgsToDelete.map(async (url) => deleteImageFromFirebaseStorage(url)));

    const updatedClients = await ClientModel.find();
    return res.status(200).json(updatedClients);
  } catch (error) {
    next(error);
  }
};
