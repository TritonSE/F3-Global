import { AuthError } from "../errors/auth";

import { firebaseAdminAuth } from "./firebase";

/**
 * This function verifies a token and returns a user from firebase.
 * @param token - the auth token of the user
 * @returns the user info from firebase
 */
async function decodeAuthToken(token: string) {
  try {
    const userInfo = await firebaseAdminAuth.verifyIdToken(token);
    return userInfo;
  } catch {
    throw AuthError.DECODE_ERROR;
  }
}

export { decodeAuthToken };
