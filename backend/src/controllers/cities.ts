import { validationResult } from "express-validator";

import { CityModel } from "../models/cities";
import validationErrorParser from "../utils/validationErrorParser";

import type { RequestHandler } from "express";

export const getAllCities: RequestHandler = async (req, res, next) => {
  try {
    const data = await CityModel.findOne();
    res.status(200).json(data?.cities ?? []);
  } catch (error) {
    next(error);
  }
};

export const updateCities: RequestHandler<
  Record<string, any>,
  unknown,
  { cities: string[] }
> = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { cities } = req.body;
    const doc = await CityModel.findOneAndUpdate({}, { cities }, { new: true, upsert: true });
    res.status(200).json(doc.cities);
  } catch (error) {
    next(error);
  }
};
