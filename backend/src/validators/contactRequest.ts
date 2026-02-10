import { body } from "express-validator";

import type { ValidationChain } from "express-validator";

const makeFullNameValidator = (isOptional = false): ValidationChain => {
  const base = body("fullName");

  const chain = isOptional ? base.optional() : base;

  return chain
    .isString()
    .withMessage("Full name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Full name cannot be empty");
};

const makeEmailValidator = (isOptional = false): ValidationChain => {
  const base = body("email");

  const chain = isOptional ? base.optional() : base;

  return chain
    .isEmail()
    .withMessage("Email must be a valid email address")
    .bail()
    .notEmpty()
    .withMessage("Email cannot be empty");
};

const makeInterestedInBecomingValidator = (isOptional = true): ValidationChain => {
  const base = body("interestedInBecoming");

  const chain = isOptional ? base.optional({ nullable: true, checkFalsy: true }) : base;

  return chain
    .isString()
    .withMessage("Interested in becoming must be a string")
    .bail()
    .notEmpty()
    .withMessage("Interested in becoming cannot be empty");
};

const makeMessageValidator = (isOptional = false): ValidationChain => {
  const base = body("message");

  const chain = isOptional ? base.optional() : base;

  return chain
    .isString()
    .withMessage("Message must be a string")
    .bail()
    .notEmpty()
    .withMessage("Message cannot be empty");
};

export const contactRequestValidators = [
  makeFullNameValidator(),
  makeEmailValidator(),
  makeInterestedInBecomingValidator(),
  makeMessageValidator(),
];
