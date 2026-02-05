import * as firebaseAdmin from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";

import { SERVICE_ACCOUNT_KEY } from "../config";

import type { ServiceAccount } from "firebase-admin/app";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.cert(JSON.parse(SERVICE_ACCOUNT_KEY) as ServiceAccount),
});

const firebaseAdminAuth = getAdminAuth();
export { firebaseAdminAuth };
