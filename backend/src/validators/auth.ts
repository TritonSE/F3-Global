import { AuthError } from "../errors/auth";
import { decodeAuthToken } from "../utils/auth";

import type { NextFunction, Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";

export type RequestWithAuth = Request & {
  auth?: {
    uid: string;
    accountType?: string | undefined;
    token: DecodedIdToken;
  };
};

const verifyAuthToken = async (req: RequestWithAuth, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res
      .status(AuthError.TOKEN_NOT_IN_HEADER.status)
      .send(AuthError.TOKEN_NOT_IN_HEADER.displayMessage(true));
    return;
  }

  try {
    const decoded = await decodeAuthToken(token);
    const decodedRecord = decoded as DecodedIdToken & { accountType?: unknown };
    const accountType =
      typeof decodedRecord.accountType === "string" ? decodedRecord.accountType : undefined;

    req.auth = {
      uid: decoded.uid,
      accountType,
      token: decoded,
    };

    next();
  } catch {
    res
      .status(AuthError.INVALID_AUTH_TOKEN.status)
      .send(AuthError.INVALID_AUTH_TOKEN.displayMessage(true));
  }
};

export { verifyAuthToken };
