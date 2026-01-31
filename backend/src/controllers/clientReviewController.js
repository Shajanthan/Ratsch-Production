import admin from "../config/firebase.js";
import cloudinary from "../config/cloudinary.js";

const db = admin.firestore();
const COLLECTION = "clientReviews";
const CLOUDINARY_REVIEWS_PREFIX = "reviews";

/**
 * GET /api/client-reviews - Get all client reviews (public)
 */
export const getClientReviews = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() ?? null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.() ?? null,
    }));
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error("getClientReviews error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get client reviews",
    });
  }
};

/**
 * POST /api/client-reviews - Add a client review (protected).
 * profilePictureUrl optional on create; frontend saves first then uploads image with doc id as name, then updates.
 */
export const addClientReview = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      position,
      companyName,
      review,
      profilePictureUrl = "",
    } = req.body;

    if (!firstName || !lastName || !position || !review) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: firstName, lastName, position, review",
      });
    }

    const docRef = await db.collection(COLLECTION).add({
      firstName,
      lastName,
      position,
      companyName: companyName ?? "",
      review,
      profilePictureUrl: profilePictureUrl || "",
      profilePicturePublicId: req.body.profilePicturePublicId || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Client review added",
    });
  } catch (error) {
    console.error("addClientReview error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add client review",
    });
  }
};

/**
 * PUT /api/client-reviews/:id - Update a client review (protected)
 */
export const updateClientReview = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      position,
      companyName,
      review,
      profilePictureUrl,
      profilePicturePublicId,
    } = req.body;

    if (!firstName || !lastName || !position || !review) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: firstName, lastName, position, review",
      });
    }

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Client review not found",
      });
    }

    const updateData = {
      firstName,
      lastName,
      position,
      companyName: companyName ?? "",
      review,
      profilePictureUrl: profilePictureUrl ?? "",
      updatedAt: new Date(),
    };
    if (profilePicturePublicId !== undefined) {
      updateData.profilePicturePublicId = profilePicturePublicId;
    }
    await docRef.update(updateData);

    res.json({
      success: true,
      message: "Client review updated",
    });
  } catch (error) {
    console.error("updateClientReview error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update client review",
    });
  }
};

/**
 * DELETE /api/client-reviews/:id - Delete a client review (protected).
 * Deletes image from Cloudinary (reviews/<id>) then deletes Firestore doc.
 */
export const deleteClientReview = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Client review not found",
      });
    }
    const data = doc.data();
    const publicId =
      data.profilePicturePublicId || `${CLOUDINARY_REVIEWS_PREFIX}/${id}`;
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
      // continue; delete Firestore doc anyway so UI stays in sync
    }
    await docRef.delete();
    res.json({
      success: true,
      message: "Client review deleted",
    });
  } catch (error) {
    console.error("deleteClientReview error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete client review",
    });
  }
};
