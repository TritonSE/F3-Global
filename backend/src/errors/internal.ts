import { CustomError } from "./errors";
const NO_APP_PORT_MESSAGE = "Could not find app port env variable";
const NO_MONGO_URI_MESSAGE = "Could not find Mongo URI env variable";
const NO_FRONTEND_ORIGIN_MESSAGE =
  "Could not find frontend origin env variable";

export class InternalError extends CustomError {
  constructor(code: number, message: string) {
    super(code, 500, message);
  }
  static NO_APP_PORT = new InternalError(1, NO_APP_PORT_MESSAGE);
  static NO_MONGO_URI = new InternalError(2, NO_MONGO_URI_MESSAGE);
  static NO_FRONTEND_ORIGIN = new InternalError(3, NO_FRONTEND_ORIGIN_MESSAGE);
}
