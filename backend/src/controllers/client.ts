import { validationResult } from "express-validator";

import { ClientModel } from "../models/client";
import { deleteImageFromFirebaseStorage } from "../utils/firebaseStorage";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

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
