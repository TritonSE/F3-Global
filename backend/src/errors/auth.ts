import { CustomError } from "./errors";

const DECODE_ERROR = "Error decoding the auth token. Make sure the auth token is valid";
const TOKEN_NOT_IN_HEADER =
  "Token was not found in the header. Be sure to use Bearer <Token> syntax";
const INVALID_AUTH_TOKEN = "Token was invalid. Be sure to refresh token if needed.";

export class AuthError extends CustomError {
  static DECODE_ERROR = new AuthError(0, 401, DECODE_ERROR);

  static TOKEN_NOT_IN_HEADER = new AuthError(1, 401, TOKEN_NOT_IN_HEADER);

  static INVALID_AUTH_TOKEN = new AuthError(2, 401, INVALID_AUTH_TOKEN);
}
