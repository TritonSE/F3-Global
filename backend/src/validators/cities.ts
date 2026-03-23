import { body } from "express-validator";

import type { ValidationChain } from "express-validator";

export const updateCitiesValidation: ValidationChain[] = [
  body("cities")
    .exists()
    .withMessage("cities is required")
    .bail()
    .isArray({ min: 1 })
    .withMessage("cities must be a non-empty array"),

  body("cities.*")
    .exists()
    .withMessage("each city is required")
    .bail()
    .isString()
    .withMessage("each city must be a string")
    .bail()
    .notEmpty()
    .withMessage("city names cannot be empty"),
];
