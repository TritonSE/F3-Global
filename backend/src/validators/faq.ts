import { body, param, query } from "express-validator";

import type { ValidationChain } from "express-validator";

const VALID_PAGES = ["members", "clients", "donors"] as const;

// ── POST /api/faq/create ──────────────────────────────────────────────────────
export const postFaqValidator: ValidationChain[] = [
  body("page")
    .isString()
    .withMessage("page must be a string")
    .trim()
    .notEmpty()
    .withMessage("page is required")
    .isIn(VALID_PAGES)
    .withMessage(`page must be one of: ${VALID_PAGES.join(", ")}`),
  body("question")
    .isString()
    .withMessage("question must be a string")
    .trim()
    .notEmpty()
    .withMessage("question is required"),
  body("answer")
    .isString()
    .withMessage("answer must be a string")
    .trim()
    .notEmpty()
    .withMessage("answer is required"),
  body("order").isInt({ min: 1 }).withMessage("order must be an integer greater than 0"),
];

// ── GET /api/faq/?page={pageKey} ──────────────────────────────────────────────
export const getFaqValidator: ValidationChain[] = [
  query("page")
    .isString()
    .withMessage("page query param must be a string")
    .trim()
    .notEmpty()
    .withMessage("page query param is required")
    .isIn(VALID_PAGES)
    .withMessage(`page must be one of: ${VALID_PAGES.join(", ")}`),
];

// ── PUT /api/faq/?page={pageKey} ──────────────────────────────────────────────
export const putFaqValidator: ValidationChain[] = [
  query("page")
    .isString()
    .withMessage("page query param must be a string")
    .trim()
    .notEmpty()
    .withMessage("page query param is required")
    .isIn(VALID_PAGES)
    .withMessage(`page must be one of: ${VALID_PAGES.join(", ")}`),
  body().isArray({ min: 0 }).withMessage("Request body must be an array of FAQ objects"),
  body("*.question")
    .isString()
    .withMessage("question must be a string")
    .trim()
    .notEmpty()
    .withMessage("question is required on every FAQ object"),
  body("*.answer")
    .isString()
    .withMessage("answer must be a string")
    .trim()
    .notEmpty()
    .withMessage("answer is required on every FAQ object"),
  body("*.order")
    .isInt({ min: 1 })
    .withMessage("order must be an integer greater than 0 on every FAQ object"),
];

// ── DELETE /api/faq/:id ───────────────────────────────────────────────────────
export const deleteFaqValidator: ValidationChain[] = [
  param("id").isMongoId().withMessage("id must be a valid MongoDB ObjectId"),
];
