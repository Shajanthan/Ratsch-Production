/**
 * Cloudinary unsigned upload from browser.
 * Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env
 * Create an unsigned upload preset in Cloudinary Dashboard: Settings > Upload > Upload presets
 * Delete is done via BE (requires API secret).
 */

import api from "./api";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Upload an image to Cloudinary and return the secure URL and public_id.
 * Use publicId to name the image (e.g. Firebase doc id) so it won't duplicate.
 * @param file - Image file to upload
 * @param folder - Optional folder in Cloudinary (e.g. "reviews", "services")
 * @param publicId - Optional public_id (e.g. Firebase doc id). If provided with folder, stored as "folder/publicId".
 */
export async function uploadImage(
  file: File,
  folder?: string,
  publicId?: string,
): Promise<UploadResult> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Missing Cloudinary config. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (publicId != null && publicId !== "") {
    formData.append("public_id", folder ? `${folder}/${publicId}` : publicId);
  } else if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error("Cloudinary upload error:", err);
    throw new Error(err?.error?.message || "Failed to upload image");
  }

  const data = (await response.json()) as CloudinaryUploadResponse;
  if (!data.secure_url || !data.public_id) {
    throw new Error("Invalid response from Cloudinary");
  }
  return { url: data.secure_url, publicId: data.public_id };
}

/**
 * Delete an image from Cloudinary by public_id (calls BE; auth required).
 * Use when user cancels review creation after uploading an image.
 */
export async function deleteCloudinaryImage(publicId: string): Promise<void> {
  await api.post("/cloudinary/delete", { publicId });
}
