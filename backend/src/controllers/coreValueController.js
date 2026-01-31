import admin from "../config/firebase.js";
import cloudinary from "../config/cloudinary.js";

const db = admin.firestore();
const COLLECTION = "coreValues";
const CLOUDINARY_PREFIX = "core-values";

/**
 * GET /api/core-values - Get all core values (public)
 */
export const getCoreValues = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const coreValues = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() ?? null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.() ?? null,
    }));
    res.json({ success: true, data: coreValues });
  } catch (error) {
    console.error("getCoreValues error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get core values",
    });
  }
};

/**
 * POST /api/core-values - Add a core value (protected).
 * Body: { title, description, imageUrl, imagePublicId? }
 */
export const addCoreValue = async (req, res) => {
  try {
    const { title = "", description = "", imageUrl = "", imagePublicId = "" } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, description, imageUrl",
      });
    }

    const docRef = await db.collection(COLLECTION).add({
      title,
      description,
      imageUrl,
      imagePublicId: imagePublicId || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Core value added",
    });
  } catch (error) {
    console.error("addCoreValue error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add core value",
    });
  }
};

/**
 * PUT /api/core-values/:id - Update a core value (protected)
 */
export const updateCoreValue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, imagePublicId } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, description, imageUrl",
      });
    }

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Core value not found",
      });
    }

    const updateData = {
      title,
      description,
      imageUrl,
      imagePublicId: imagePublicId ?? "",
      updatedAt: new Date(),
    };
    await docRef.update(updateData);

    res.json({
      success: true,
      message: "Core value updated",
    });
  } catch (error) {
    console.error("updateCoreValue error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update core value",
    });
  }
};

/**
 * DELETE /api/core-values/:id - Delete a core value (protected).
 * Deletes image from Cloudinary then deletes Firestore doc.
 */
export const deleteCoreValue = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Core value not found",
      });
    }
    const data = doc.data();
    const publicId = data.imagePublicId || `${CLOUDINARY_PREFIX}/${id}`;
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === "not found") {
        console.warn("Cloudinary destroy: image not found, publicId=", publicId);
      }
    } catch (cloudinaryErr) {
      console.error(
        "Cloudinary destroy failed, publicId=",
        publicId,
        "error:",
        cloudinaryErr?.message || cloudinaryErr,
      );
    }
    await docRef.delete();
    res.json({
      success: true,
      message: "Core value deleted",
    });
  } catch (error) {
    console.error("deleteCoreValue error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete core value",
    });
  }
};
