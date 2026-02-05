import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import type { FirebaseOptions } from "firebase/app";

export const initFirebase = () => {
  if (!process.env.NEXT_PUBLIC_FIREBASE_APP_CONFIG) {
    throw new Error("Firebase configuration not found.");
  }

  const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_APP_CONFIG) as FirebaseOptions;

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return { app, auth, storage };
};

const { app, auth, storage } = initFirebase();

export { app, auth, storage };
