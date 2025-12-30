import dotenv from "dotenv";

import { InternalError } from "./errors/internal";

dotenv.config();

function throwIfUndefined(
  envVar: string | undefined,
  error: InternalError
): string {
  if (!envVar) throw error;
  return envVar;
}

const PORT = throwIfUndefined(process.env.APP_PORT, InternalError.NO_APP_PORT);
const MONGO_URI = throwIfUndefined(
  process.env.MONGO_URI,
  InternalError.NO_MONGO_URI
);
const FRONTEND_ORIGIN = throwIfUndefined(
  process.env.FRONTEND_ORIGIN,
  InternalError.NO_FRONTEND_ORIGIN
);

export { FRONTEND_ORIGIN, MONGO_URI, PORT };
