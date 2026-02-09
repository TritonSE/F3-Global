import createHttpError from "http-errors";

import type { Result, ValidationError } from "express-validator";

/**
 * Parses through errors thrown by validator (if any exist). Error messages are
 * added to a string and that string is used as the error message for the HTTP
 * error.
 *
 * @param errors the validation result provided by express validator middleware
 */
const validationErrorParser = (errors: Result<ValidationError>) => {
  if (!errors.isEmpty()) {
    let errorString = "";

    // parse through errors returned by the validator and append them to the error string
    for (const error of errors.array()) {
      errorString += `${String(error.msg)} `;
    }

    // trim removes the trailing space created in the for loop
    throw createHttpError(400, errorString.trim());
  }
};

export default validationErrorParser;
