import "./firebase";
import { getStorage } from "firebase-admin/storage";

/**
 * Extracts the object path from a Firebase download URL
 * Example:
 *  https://firebasestorage.googleapis.com/v0/b/<bucket>/o/clients%2Flogo.png?alt=media
 * → clients/logo.png
 */
export function getObjectPathFromFirebaseUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split("/o/");
    const encodedPath = parts[1];

    if (!encodedPath) return null;

    return decodeURIComponent(encodedPath);
  } catch {
    return null;
  }
}

export async function deleteImageFromFirebaseStorage(imageUrl: string) {
  const objectPath = getObjectPathFromFirebaseUrl(imageUrl);
  if (!objectPath) {
    throw new Error("Invalid Firebase Storage URL");
  }

  const bucket = getStorage().bucket();
  await bucket.file(objectPath).delete({ ignoreNotFound: true });
}
