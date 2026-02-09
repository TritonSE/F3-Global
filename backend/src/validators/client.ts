import { body } from "express-validator";

export const createClientValidation = [
  body("name")
    .exists()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty"),

  body("imageUrl")
    .exists()
    .withMessage("imageUrl is required")
    .isString()
    .withMessage("imageUrl must be a string")
    .notEmpty()
    .withMessage("imageUrl cannot be empty"),
];
