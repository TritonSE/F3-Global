import { body, param } from "express-validator";

import type { ValidationChain } from "express-validator";

const makeIdValidator = (): ValidationChain =>
  param("id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");

const makeNameValidator = (): ValidationChain =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");

const makeMemberPositionValidator = (): ValidationChain =>
  body("memberPosition")
    .exists()
    .withMessage("member position is required")
    .bail()
    .isString()
    .withMessage("member position must be a string")
    .bail()
    .notEmpty()
    .withMessage("member position cannot be empty");

const makeLinkedinUrlValidator = (): ValidationChain =>
  body("linkedinUrl")
    .exists()
    .withMessage("linkedin URL is required")
    .bail()
    .isString()
    .withMessage("linkedin URL must be a string")
    .bail()
    .notEmpty()
    .withMessage("linkedin URL cannot be empty")
    .bail()
    .isURL()
    .withMessage("linkedin URL be a valid URL");

const makeEmailValidator = (): ValidationChain =>
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email must be a valid email")
    .isString()
    .withMessage("email must be a string")
    .bail()
    .notEmpty()
    .withMessage("email cannot be empty");

const makeHeadshotUrlValidator = (): ValidationChain =>
  body("headshotUrl")
    .exists()
    .withMessage("headshot URL is required")
    .bail()
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

const makeCountryValidator = (): ValidationChain =>
  body("country")
    .exists()
    .withMessage("country is required")
    .bail()
    .isString()
    .withMessage("country must be a string")
    .bail()
    .notEmpty()
    .withMessage("country cannot be empty")
    .bail()
    .isISO31661Alpha2()
    .withMessage("country must be a valid ISO 3166-1 alpha-2 country code");

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
  makeNameValidator(),
  makeMemberPositionValidator(),
  makeLinkedinUrlValidator(),
  makeHeadshotUrlValidator(),
  makeEmailValidator(),
  makeCountryValidator(),
];

export const deleteMember = [makeIdValidator()];
