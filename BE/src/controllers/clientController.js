import admin from "../config/firebase.js";
import cloudinary from "../config/cloudinary.js";

const db = admin.firestore();
const COLLECTION = "clients";
const CLOUDINARY_CLIENTS_PREFIX = "clients";

/**
 * GET /api/clients - Get all clients (public)
 */
export const getClients = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const clients = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() ?? null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.() ?? null,
    }));
    res.json({ success: true, data: clients });
  } catch (error) {
    console.error("getClients error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get clients",
    });
  }
};

/**
 * POST /api/clients - Add a client logo (protected).
 * Body: { imageUrl, imagePublicId? }
 */
export const addClient = async (req, res) => {
  try {
    const { imageUrl = "", imagePublicId = "" } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: imageUrl",
      });
    }

    const docRef = await db.collection(COLLECTION).add({
      imageUrl,
      imagePublicId: imagePublicId || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Client added",
    });
  } catch (error) {
    console.error("addClient error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add client",
    });
  }
};

/**
 * DELETE /api/clients/:id - Delete a client (protected).
 * Deletes image from Cloudinary then deletes Firestore doc.
 */
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }
    const data = doc.data();
    const publicId =
      data.imagePublicId || `${CLOUDINARY_CLIENTS_PREFIX}/${id}`;
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === "not found") {
        console.warn(
          "Cloudinary destroy: image not found, publicId=",
          publicId,
        );
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
      message: "Client deleted",
    });
  } catch (error) {
    console.error("deleteClient error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete client",
    });
  }
};
