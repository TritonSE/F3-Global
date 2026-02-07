import * as firebaseAdmin from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import "dotenv/config";

import { SERVICE_ACCOUNT_KEY } from "../config";

import type { ServiceAccount } from "firebase-admin/app";

const storageBucket = process.env.STORAGE_BUCKET;
if (!storageBucket) {
  throw new Error("STORAGE_BUCKET is not defined in environment variables");
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.cert(JSON.parse(SERVICE_ACCOUNT_KEY) as ServiceAccount),
  storageBucket,
});

const firebaseAdminAuth = getAdminAuth();
export { firebaseAdminAuth };
