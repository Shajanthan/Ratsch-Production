import admin from "../config/firebase.js";

const db = admin.firestore();
const DOC_PATH = "settings/aboutUs";

/**
 * GET /api/about-us/ceo - Get CEO section (public)
 */
export const getCeoSection = async (req, res) => {
  try {
    const doc = await db.doc(DOC_PATH).get();
    const data = doc.exists ? doc.data() : {};
    res.json({
      success: true,
      data: {
        imageUrl: data.ceoImageUrl || "",
        firstName: data.ceoFirstName || "",
        lastName: data.ceoLastName || "",
        position: data.ceoPosition || "",
        companyName: data.ceoCompanyName || "",
        description: data.ceoDescription || "",
      },
    });
  } catch (error) {
    console.error("getCeoSection error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get CEO section",
    });
  }
};

/**
 * PUT /api/about-us/ceo - Update CEO section (protected)
 * Body: { imageUrl?, firstName?, lastName?, position?, companyName?, description? }
 */
export const updateCeoSection = async (req, res) => {
  try {
    const {
      imageUrl = "",
      firstName = "",
      lastName = "",
      position = "",
      companyName = "",
      description = "",
    } = req.body;
    const ref = db.doc(DOC_PATH);
    await ref.set(
      {
        ceoImageUrl: String(imageUrl),
        ceoFirstName: String(firstName),
        ceoLastName: String(lastName),
        ceoPosition: String(position),
        ceoCompanyName: String(companyName),
        ceoDescription: String(description),
        updatedAt: new Date(),
      },
      { merge: true },
    );
    res.json({
      success: true,
      message: "CEO section updated",
      data: {
        imageUrl: String(imageUrl),
        firstName: String(firstName),
        lastName: String(lastName),
        position: String(position),
        companyName: String(companyName),
        description: String(description),
      },
    });
  } catch (error) {
    console.error("updateCeoSection error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update CEO section",
    });
  }
};
