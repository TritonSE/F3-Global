import { body } from "express-validator";

export const createClientValidation = [
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty"),

  body("imageUrl")
    .exists()
    .withMessage("imageUrl is required")
    .bail()
    .isString()
    .withMessage("imageUrl must be a string")
    .bail()
    .notEmpty()
    .withMessage("imageUrl cannot be empty"),
];

export const updateClientValidation = [
  body().isArray().withMessage("Request body must be an array of clients"),

  body("*.name")
    .exists()
    .withMessage("name is requrired")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty"),

  body("*.imageUrl")
    .exists()
    .withMessage("imageUrl is required")
    .bail()
    .isString()
    .withMessage("imageUrl must be a string")
    .bail()
    .notEmpty()
    .withMessage("imageUrl cannot be empty"),

  body("*._id").optional().isMongoId().withMessage("_id must be a valid MongoDB ObjectID"),
];
