import { body } from "express-validator";

function UpdateStringValidation(index, fieldname) {
  return body(`highlights.${index}.${fieldname}`)
    .exists()
    .withMessage(`at ${index} ${fieldname} Does not exist`)
    .bail()
    .isString()
    .withMessage(`at ${index} ${fieldname} Not a string`)
    .bail()
    .notEmpty()
    .withMessage(`at ${index} ${fieldname} Is empty`);
}

function makeHighlightValidator(index) {
  return [
    UpdateStringValidation(index, "quoteText"),
    UpdateStringValidation(index, "previewText"),
    UpdateStringValidation(index, "imageUrl")
      .isURL()
      .withMessage(`highlights[${index}] does not have a valid URL`),
    UpdateStringValidation(index, "fullText"),
    body(`highlights.${index}.index`)
      .exists()
      .withMessage("Does not exist")
      .bail()
      .isInt({ min: 0, max: 2 })
      .withMessage(`highlights[${index}].index must be 0, 1, or 2`),
    body(`highlights.${index}._id`)
      .optional()
      .isMongoId()
      .withMessage(`highlights[${index}]._id must be a valid MongoDB ID`),
  ];
}

export const UpdateHighlightValidation = [
  body("highlights").isArray({ min: 3, max: 3 }).withMessage("Have exactly 3 highlights"),

  ...makeHighlightValidator(0),
  ...makeHighlightValidator(1),
  ...makeHighlightValidator(2),
];
