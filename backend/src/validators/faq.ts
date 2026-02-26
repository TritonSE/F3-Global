import { body, param, query } from "express-validator";

import { FAQ_PAGES } from "../models/faq";

import type { ValidationChain } from "express-validator";

const pageQueryValidator: ValidationChain = query("page")
  .exists()
  .withMessage("page is required")
  .bail()
  .isString()
  .withMessage("page must be a string")
  .bail()
  .notEmpty()
  .withMessage("page cannot be empty")
  .bail()
  .isIn(FAQ_PAGES)
  .withMessage(`page must be one of: ${FAQ_PAGES.join(", ")}`);

const pageBodyValidator = (field = "page"): ValidationChain =>
  body(field)
    .exists()
    .withMessage(`${field} is required`)
    .bail()
    .isString()
    .withMessage(`${field} must be a string`)
    .bail()
    .notEmpty()
    .withMessage(`${field} cannot be empty`)
    .bail()
    .isIn(FAQ_PAGES)
    .withMessage(`${field} must be one of: ${FAQ_PAGES.join(", ")}`);

const requiredStringBodyValidator = (field: string): ValidationChain =>
  body(field)
    .exists()
    .withMessage(`${field} is required`)
    .bail()
    .isString()
    .withMessage(`${field} must be a string`)
    .bail()
    .notEmpty()
    .withMessage(`${field} cannot be empty`);

const requiredStringArrayBodyValidator = (field: string): ValidationChain =>
  body(`*.${field}`)
    .exists()
    .withMessage(`${field} is required`)
    .bail()
    .isString()
    .withMessage(`${field} must be a string`)
    .bail()
    .notEmpty()
    .withMessage(`${field} cannot be empty`);

export const createFaqValidators: ValidationChain[] = [
  pageBodyValidator("page"),
  requiredStringBodyValidator("question"),
  requiredStringBodyValidator("answer"),
  requiredStringBodyValidator("order"),
];

export const getFaqValidator: ValidationChain[] = [pageQueryValidator];

export const putFaqValidators: ValidationChain[] = [
  pageQueryValidator,
  body().isArray().withMessage("request body must be an array of faq objects"),
  pageBodyValidator("*.page"),
  requiredStringArrayBodyValidator("question"),
  requiredStringArrayBodyValidator("answer"),
  requiredStringArrayBodyValidator("order"),
  body("*._id").optional().isMongoId().withMessage("_id must be a valid MongoDB ObjectID"),
];

export const deleteFaqValidators: ValidationChain[] = [
  param("id")
    .exists()
    .withMessage("id is required")
    .bail()
    .isMongoId()
    .withMessage("id must be a valid MongoDB ObjectID"),
];
