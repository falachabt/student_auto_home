import { ref } from "firebase/storage";
import { storage } from "../firebase";

/**
 * Download a file from Firebase Storage by its path and return its download URL.
 * @param {string} path - The path to the file in Firebase Storage.
 * @returns {Promise<string>} A Promise that resolves to the download URL of the file.
 */

export function getDownloadUrl(path) {
  const fileRef = ref(path);

  fileRef
    .getDownloadURL()
    .then((url) => {
      console.log("Download URL: ", url);
      return url;
    })
    .catch((error) => {
      console.error("Error getting download URL: ", error);
    });
}
