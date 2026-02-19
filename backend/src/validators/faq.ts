import { body, query, param } from "express-validator";

import { FAQ_PAGES } from "../models/faq";

const pageErrorMessage = `page must be one of ${FAQ_PAGES.join(", ")}`;

export const createFaqValidators = [
  body("page")
    .exists()
    .withMessage("page is required")
    .bail()
    .isString()
    .withMessage("page must be a string")
    .bail()
    .isIn(FAQ_PAGES)
    .withMessage(pageErrorMessage),
  body("question")
    .exists()
    .withMessage("question is required")
    .bail()
    .isString()
    .withMessage("question must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("question is required"),
  body("answer")
    .exists()
    .withMessage("answer is required")
    .bail()
    .isString()
    .withMessage("answer must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("answer is required"),
  body("order")
    .exists()
    .withMessage("order is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("order must be a non-negative integer")
    .toInt(),
];

export const pageQueryValidator = [
  query("page")
    .exists()
    .withMessage("page query parameter is required")
    .bail()
    .isString()
    .withMessage("page query parameter must be a string")
    .bail()
    .isIn(FAQ_PAGES)
    .withMessage(`page query parameter ${pageErrorMessage}`),
];

export const idParamValidator = [
  param("id")
    .exists()
    .withMessage("id is required")
    .bail()
    .isMongoId()
    .withMessage("id must be a valid MongoDB ObjectId"),
];

export const updateFaqsValidation = [
  body().isArray().withMessage("Request body must be an array of FAQ objects"),

  body("*._id").optional().isMongoId().withMessage("_id must be a valid MongoDB ObjectId"),

  body("*.page")
    .exists()
    .withMessage("page is required")
    .bail()
    .isString()
    .withMessage("page must be a string")
    .bail()
    .isIn(FAQ_PAGES)
    .withMessage(pageErrorMessage),

  body("*.question")
    .exists()
    .withMessage("question is required")
    .bail()
    .isString()
    .withMessage("question must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("question cannot be empty"),

  body("*.answer")
    .exists()
    .withMessage("answer is required")
    .bail()
    .isString()
    .withMessage("answer must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("answer cannot be empty"),

  body("*.order")
    .exists()
    .withMessage("order is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("order must be a non-negative integer")
    .toInt(),

  body().custom((value, { req }) => {
    if (!Array.isArray(value)) return true;

    const page = req.query.page;
    if (typeof page !== "string") return true;

    for (const faq of value as Array<{ page?: string }>) {
      if (faq.page !== page) {
        throw new Error("Each FAQ object's page must match the page query parameter");
      }
    }

    return true;
  }),
];
