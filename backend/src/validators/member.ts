import { body, param } from "express-validator";

import type { ValidationChain } from "express-validator";

const makeIdValidator = (): ValidationChain =>
  param("id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");

const makeNameValidator = (isOptional = false): ValidationChain => {
  const validator = body("name");
  if (isOptional) {
    validator.optional();
  } else {
    validator.exists().withMessage("name is required").bail();
  }
  return validator
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");
};

const makeMemberPositionValidator = (isOptional = false): ValidationChain => {
  const validator = body("memberPosition");
  if (isOptional) validator.optional();

  return validator
    .isString()
    .withMessage("member position must be a string")
    .bail()
    .notEmpty()
    .withMessage("member position cannot be empty");
};

const makeLinkedinUrlValidator = (isOptional = false): ValidationChain => {
  const validator = body("linkedinUrl");
  if (isOptional) validator.optional();

  return validator
    .isString()
    .withMessage("linkedin URL must be a string")
    .bail()
    .notEmpty()
    .withMessage("linkedin URL cannot be empty")
    .bail()
    .isURL()
    .withMessage("linkedin URL be a valid URL");
};

const makeEmailValidator = (isOptional = false): ValidationChain => {
  const validator = body("email");
  if (isOptional) validator.optional();

  return validator
    .isEmail()
    .withMessage("email must be a valid email")
    .isString()
    .withMessage("email must be a string")
    .bail()
    .notEmpty()
    .withMessage("email cannot be empty");
};

const makeHeadshotUrlValidator = (isOptional = false): ValidationChain => {
  const validator = body("headshotUrl");
  if (isOptional) validator.optional();

  return validator
    .isString()
    .withMessage("headshot URL must be a string")
    .bail()
    .notEmpty()
    .withMessage("headshot URL cannot be empty")
    .bail()
    .notEmpty()
    .withMessage("headshot URL cannot be empty")
    .bail()
    .isURL()
    .withMessage("headshot URL be a valid URL");
};

const makeCountryValidator = (isOptional = false): ValidationChain => {
  const validator = body("country");
  if (isOptional) validator.optional();

  return validator
    .isString()
    .withMessage("country must be a string")
    .bail()
    .notEmpty()
    .withMessage("country cannot be empty")
    .bail()
    .isISO31661Alpha2()
    .withMessage("country must be a valid ISO 3166-1 alpha-2 country code");
};

export const createMember = [
  makeNameValidator(),
  makeMemberPositionValidator(),
  makeLinkedinUrlValidator(),
  makeHeadshotUrlValidator(),
  makeEmailValidator(),
  makeCountryValidator(),
];

export const updateMember = [
  makeIdValidator(),
  makeNameValidator(true),
  makeMemberPositionValidator(true),
  makeLinkedinUrlValidator(true),
  makeHeadshotUrlValidator(true),
  makeEmailValidator(true),
  makeCountryValidator(true),
];

export const deleteMember = [makeIdValidator()];
