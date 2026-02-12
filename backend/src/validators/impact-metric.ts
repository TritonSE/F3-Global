import { body } from "express-validator";

export const updateImpactMetric = [
  body("metrics")
    .isArray({ min: 1 })
    .withMessage("metrics must be an array with at least one item"),

  body("metrics.*.order")
    .exists()
    .withMessage("order is required for every metric item")
    .isInt({ min: 0, max: 2 })
    .withMessage("order must be 0, 1, or 2"),

  body("metrics.*.statistic")
    .optional()
    .isString()
    .withMessage("statistic must be a string")
    .notEmpty()
    .withMessage("statistic cannot be empty")
    .isLength({ max: 6 })
    .withMessage("statistic max length is 6"),

  body("metrics.*.subtitle")
    .optional()
    .isString()
    .withMessage("subtitle must be a string")
    .notEmpty()
    .withMessage("subtitle cannot be empty")
    .isLength({ max: 17 })
    .withMessage("subtitle max length is 17"),

  body("metrics.*.description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .notEmpty()
    .withMessage("description cannot be empty")
    .isLength({ max: 107 })
    .withMessage("description max length is 107"),
];
