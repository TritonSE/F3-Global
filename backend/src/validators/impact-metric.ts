import { body } from "express-validator";

export const updateImpactMetric = [
  body("metrics")
    .isArray({ min: 3, max: 3 })
    .withMessage("metrics must be an array with exactly three items"),

  body("metrics.*.order")
    .exists()
    .withMessage("order is required for every metric item")
    .bail()
    .isInt({ min: 0, max: 2 })
    .withMessage("order must be 0, 1, or 2"),

  body("metrics.*.statistic")
    .optional()
    .isString()
    .withMessage("statistic must be a string")
    .bail()
    .notEmpty()
    .withMessage("statistic cannot be empty"),

  body("metrics.*.subtitle")
    .optional()
    .isString()
    .withMessage("subtitle must be a string")
    .bail()
    .notEmpty()
    .withMessage("subtitle cannot be empty"),

  body("metrics.*.description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .bail()
    .notEmpty()
    .withMessage("description cannot be empty"),
];
