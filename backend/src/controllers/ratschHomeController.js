import admin from "../config/firebase.js";

const db = admin.firestore();
const DOC_PATH = "settings/ratsch-homepage";

/**
 * GET /api/ratsch-homepage/settings - Get Ratsch homepage banner settings (public)
 */
export const getRatschHomeSettings = async (req, res) => {
  try {
    const doc = await db.doc(DOC_PATH).get();
    const data = doc.exists ? doc.data() : {};

    res.json({
      success: true,
      data: {
        bannerImageUrl: data.bannerImageUrl || "",
        bannerImagePublicId: data.bannerImagePublicId || "",
      },
    });
  } catch (error) {
    console.error("getRatschHomeSettings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get Ratsch homepage settings",
    });
  }
};

/**
 * PUT /api/ratsch-homepage/settings - Update Ratsch homepage banner settings (protected)
 * Body: { bannerImageUrl?, bannerImagePublicId? }
 */
export const updateRatschHomeSettings = async (req, res) => {
  try {
    const {
      bannerImageUrl = "",
      bannerImagePublicId = "",
    } = req.body || {};

    const ref = db.doc(DOC_PATH);
    await ref.set(
      {
        bannerImageUrl: String(bannerImageUrl),
        bannerImagePublicId: String(bannerImagePublicId),
        updatedAt: new Date(),
      },
      { merge: true },
    );

    res.json({
      success: true,
      message: "Ratsch homepage settings updated",
      data: {
        bannerImageUrl,
        bannerImagePublicId,
      },
    });
  } catch (error) {
    console.error("updateRatschHomeSettings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Ratsch homepage settings",
    });
  }
};

