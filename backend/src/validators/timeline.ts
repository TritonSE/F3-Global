import { body, param } from "express-validator";

import Timeline from "../models/timeline";

import type { ValidationChain } from "express-validator";

//POST api/timeline
export const createTimelineValidator: ValidationChain[] = [
  body("year")
    .exists()
    .withMessage("year is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("year must be a number greater than 0")
    .bail()
    .custom(async (year: string | number) => {
      const existingTimeline = await Timeline.findOne({ year: Number(year) });

      if (existingTimeline) {
        throw new Error(`year ${year} already exists`);
      }

      return true;
    }),
  body("description")
    .exists()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("imageUrl")
    .exists({ checkFalsy: true })
    .withMessage("Image URL is required")
    .bail()
    .isURL()
    .withMessage("Image URL must be a valid URL"),
];

//PUT api/timeline
export const updateTimelineValidator: ValidationChain[] = [
  body()
    .isArray({ min: 0 })
    .withMessage("Request body must be an array of timeline objects")
    .bail(),
  body("*._id")
    .optional()
    .isMongoId()
    .withMessage("_id must be a valid MongoDB ObjectId if provided")
    .bail(),
  body("*.year")
    .exists()
    .withMessage("year is required")
    .bail()
    .toInt()
    .isInt({ min: 1 })
    .withMessage("year must be a number greater than 0")
    .bail(),
  body("*.description")
    .exists()
    .withMessage("description is required")
    .bail()
    .isString()
    .withMessage("description must be a string")
    .bail(),
  body("*.imageUrl")
    .exists({ checkFalsy: true })
    .withMessage("Image URL is required")
    .bail()
    .isURL()
    .withMessage("Image URL must be a valid URL")
    .bail(),
  body().custom((timelineItems: { year?: unknown }[]) => {
    const years = timelineItems
      .map((item) => item.year)
      .filter(
        (year): year is number => typeof year === "number" && Number.isInteger(year) && year > 0,
      );

    const uniqueYears = new Set(years);

    if (uniqueYears.size !== years.length) {
      throw new Error("year values must be unique across all timeline objects");
    }

    return true;
  }),
];

//DELETE api/timeline/:id
export const deleteTimelineValidator: ValidationChain[] = [
  param("id").isMongoId().withMessage("id must be a valid MongoDB ObjectId"),
];
