import { body, param } from "express-validator";

//POST
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

//PUT
export const updateCollegesValidator = [
  body().isArray().withMessage("Body must be an array"),

  body("*.name").isString().notEmpty().withMessage("Name is required"),

  body("*.imageUrl").isString().notEmpty().isURL().withMessage("Valid image URL is required"),

  body("*._id").optional().isMongoId().withMessage("Invalid_id"),
];

//DELETE
export const deleteCollegeValidator = [param("id").isMongoId().withMessage("Invalid college id")];
