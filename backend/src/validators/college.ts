import { body } from "express-validator";

export const createCollegeValidator = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("imageUrl")
    .exists({ checkFalsy: true })
    .withMessage("Image URL is required")
    .isString()
    .withMessage("Image URL must be a string"),
];
