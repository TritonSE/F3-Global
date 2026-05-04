import { body, param } from "express-validator";

import type { ValidationChain } from "express-validator";

const makeIdValidator = (): ValidationChain =>
  param("id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");

const makeTitleValidator = (isOptional = false): ValidationChain => {
  const validator = body("title");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("title is required").bail();
  }
  return validator
    .isString()
    .withMessage("title must be a string")
    .bail()
    .notEmpty()
    .withMessage("title cannot be empty");
};

const makeUploadDateValidator = (isOptional = false): ValidationChain => {
  const validator = body("uploadDate");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("uploadDate is required").bail();
  }
  return validator
    .isISO8601()
    .withMessage("uploadDate must be a valid ISO 8601 date")
    .bail()
    .toDate();
};

const makeViewsValidator = (isOptional = false): ValidationChain => {
  const validator = body("views");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("views is required").bail();
  }
  return validator
    .isInt({ min: 0 })
    .withMessage("views must be a non-negative integer")
    .bail()
    .toInt();
};

const makeBlurbValidator = (isOptional = false): ValidationChain => {
  const validator = body("blurb");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("blurb is required").bail();
  }
  return validator
    .isString()
    .withMessage("blurb must be a string")
    .bail()
    .notEmpty()
    .withMessage("blurb cannot be empty");
};

const makeAuthorNameValidator = (isOptional = false): ValidationChain => {
  const validator = body("authorName");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("authorName is required").bail();
  }
  return validator
    .isString()
    .withMessage("authorName must be a string")
    .bail()
    .notEmpty()
    .withMessage("authorName cannot be empty");
};

const makeFeaturedValidator = (): ValidationChain => {
  return body("featured")
    .optional()
    .isBoolean()
    .withMessage("featured must be a boolean")
    .bail()
    .toBoolean();
};

const makePdfUrlValidator = (isOptional = false): ValidationChain => {
  const validator = body("pdfUrl");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("pdfUrl is required").bail();
  }
  return validator
    .isString()
    .withMessage("pdfUrl must be a string")
    .bail()
    .notEmpty()
    .withMessage("pdfUrl cannot be empty")
    .bail()
    .isURL()
    .withMessage("pdfUrl must be a valid URL");
};

const makeImageUrlValidator = (isOptional = false): ValidationChain => {
  const validator = body("imageUrl");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("imageUrl is required").bail();
  }
  return validator
    .isString()
    .withMessage("imageUrl must be a string")
    .bail()
    .notEmpty()
    .withMessage("imageUrl cannot be empty")
    .bail()
    .isURL()
    .withMessage("imageUrl must be a valid URL");
};

export const createNewsletter = [
  makeTitleValidator(),
  makeUploadDateValidator(),
  makeViewsValidator(),
  makeBlurbValidator(),
  makeAuthorNameValidator(),
  makePdfUrlValidator(),
  makeImageUrlValidator(),
  makeFeaturedValidator(),
];

export const updateNewsletter = [
  makeIdValidator(),
  makeTitleValidator(true),
  makeUploadDateValidator(true),
  makeViewsValidator(true),
  makeBlurbValidator(true),
  makeAuthorNameValidator(true),
  makePdfUrlValidator(true),
  makeImageUrlValidator(true),
  makeFeaturedValidator(),
];

export const deleteNewsletter = [makeIdValidator()];

export const getNewsletterById = [makeIdValidator()];

export const incrementNewsletterViews = [makeIdValidator()];
