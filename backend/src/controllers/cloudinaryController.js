import cloudinary from "../config/cloudinary.js";

/**
 * POST /api/cloudinary/delete - Delete an image from Cloudinary by public_id (protected).
 * Body: { publicId: string }
 * Used when user cancels review creation after uploading an image.
 */
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId || typeof publicId !== "string") {
      return res.status(400).json({
        success: false,
        message: "publicId is required",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "not found") {
      return res.status(404).json({
        success: false,
        message: "Image not found in Cloudinary",
      });
    }

    res.json({
      success: true,
      message: "Image deleted from Cloudinary",
      result: result.result,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image from Cloudinary",
    });
  }
};
