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
 * Compress and convert image to WebP format before upload
 * @param file - Original image file
 * @param maxWidth - Maximum width (default: 1920)
 * @param maxHeight - Maximum height (default: 1920)
 * @param quality - WebP quality 0-1 (default: 0.85)
 * @returns Compressed WebP File
 */
async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1920,
  quality: number = 0.85,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        // Draw image with high quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format (with fallback to JPEG if WebP not supported)
        const tryWebP = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                // Fallback to JPEG if WebP fails
                canvas.toBlob(
                  (jpegBlob) => {
                    if (!jpegBlob) {
                      reject(new Error("Failed to convert image"));
                      return;
                    }
                    const fileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
                    const compressedFile = new File(
                      [jpegBlob],
                      fileName,
                      { type: "image/jpeg", lastModified: Date.now() }
                    );
                    resolve(compressedFile);
                  },
                  "image/jpeg",
                  quality,
                );
                return;
              }
              // Create new File with WebP format
              const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
              const compressedFile = new File(
                [blob],
                fileName,
                { type: "image/webp", lastModified: Date.now() }
              );
              resolve(compressedFile);
            },
            "image/webp",
            quality,
          );
        };
        
        tryWebP();
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image to Cloudinary and return the secure URL and public_id.
 * Images are automatically compressed and optimized before upload.
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

  // Compress and convert to WebP format before upload
  let optimizedFile = file;
  try {
    // Convert all images to WebP format for better compression
    optimizedFile = await compressImage(file);
  } catch (error) {
    console.warn("WebP conversion failed, uploading original:", error);
    // Continue with original file if conversion fails
  }

  const formData = new FormData();
  formData.append("file", optimizedFile);
  formData.append("upload_preset", UPLOAD_PRESET);
  // Note: format and quality parameters are not allowed in unsigned uploads
  // The file is already converted to WebP client-side before upload
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
