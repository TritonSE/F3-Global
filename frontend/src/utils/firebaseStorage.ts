import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import type { StorageReference } from "firebase/storage";

import { storage } from "@/firebase/firebase";

/**
 * Extracts the Firebase Storage object path from a Firebase Storage download URL.
 * Returns null if the URL is not a valid Firebase Storage URL.
 */
export function getStoragePathFromUrl(url: string): string | null {
  const match = /\/o\/(.*?)\?/.exec(url);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Uploads a file to Firebase Storage at the given path and returns the public download URL.
 * Optionally pushes the StorageReference onto `uploadedRefs` so the caller can roll back on error.
 */
export async function uploadToStorage(
  file: File,
  path: string,
  uploadedRefs?: StorageReference[],
): Promise<string> {
  const fileRef = storageRef(storage, path);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);
  uploadedRefs?.push(snapshot.ref);
  return url;
}

/**
 * Deletes a file from Firebase Storage given its download URL.
 * Silently ignores errors (e.g. file already deleted or URL not a storage URL).
 */
export async function deleteFromStorageUrl(url: string): Promise<void> {
  const path = getStoragePathFromUrl(url);
  if (!path) return;
  await deleteObject(storageRef(storage, path)).catch(() => {});
}

/**
 * Deletes all StorageReferences in the provided array. Used to roll back a failed publish.
 */
export async function rollbackUploads(refs: StorageReference[]): Promise<void> {
  await Promise.all(refs.map((ref) => deleteObject(ref).catch(() => {})));
}
