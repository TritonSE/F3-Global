import { body } from "express-validator";

function UpdateStringValidation(order: number, fieldname: string) {
  return body(`highlights.${order}.${fieldname}`)
    .exists()
    .withMessage(`at ${order} ${fieldname} Does not exist`)
    .bail()
    .isString()
    .withMessage(`at ${order} ${fieldname} Not a string`)
    .bail()
    .notEmpty()
    .withMessage(`at ${order} ${fieldname} Is empty`);
}

function makeHighlightValidator(order: number) {
  return [
    UpdateStringValidation(order, "quoteText"),
    UpdateStringValidation(order, "previewText"),
    UpdateStringValidation(order, "imageUrl")
      .isURL()
      .withMessage(`highlights[${order}] does not have a valid URL`),
    UpdateStringValidation(order, "fullText"),
    body(`highlights.${order}.order`)
      .exists()
      .withMessage("Does not exist")
      .bail()
      .isInt({ min: 0, max: 2 })
      .withMessage(`highlights[${order}].order must be 0, 1, or 2`),
    body(`highlights.${order}._id`)
      .optional()
      .isMongoId()
      .withMessage(`highlights[${order}]._id must be a valid MongoDB ID`),
  ];
}

export const UpdateHighlightValidation = [
  body("highlights").isArray({ min: 3, max: 3 }).withMessage("Have exactly 3 highlights"),

  ...makeHighlightValidator(0),
  ...makeHighlightValidator(1),
  ...makeHighlightValidator(2),
];
