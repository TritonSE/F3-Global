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

  /* the length validator for eachwas created/tested in kind of a dumb way, i tested a wide character like `W` and
   * saw how many it took to overflow the container, then added a couple chars for leeway. wondering if theres
   * maybe a smarter way to validate length?
   */

  body("metrics.*.statistic")
    .optional()
    .isString()
    .withMessage("statistic must be a string")
    .notEmpty()
    .withMessage("statistic cannot be empty")
    .isLength({ max: 8 })
    .withMessage("statistic max length is 6"),

  body("metrics.*.subtitle")
    .optional()
    .isString()
    .withMessage("subtitle must be a string")
    .notEmpty()
    .withMessage("subtitle cannot be empty")
    .isLength({ max: 28 })
    .withMessage("subtitle max length is 17"),

  body("metrics.*.description")
    .optional()
    .isString()
    .withMessage("description must be a string")
    .notEmpty()
    .withMessage("description cannot be empty")
    .isLength({ max: 150 })
    .withMessage("description max length is 107"),
];
