import admin from "../config/firebase.js";
import cloudinary from "../config/cloudinary.js";

const db = admin.firestore();
const COLLECTION = "services";
const CLOUDINARY_PREFIX = "services";
const MAX_SERVICE_IMAGES = 10;
const MAX_BRAND_IMAGES = 5;

const toDoc = (doc) => {
  const d = doc.data();
  return {
    id: doc.id,
    ...d,
    tags: Array.isArray(d.tags) ? d.tags : [],
    serviceImageUrls: Array.isArray(d.serviceImageUrls) ? d.serviceImageUrls : [],
    serviceImagePublicIds: Array.isArray(d.serviceImagePublicIds)
      ? d.serviceImagePublicIds
      : [],
    brandImageUrls: Array.isArray(d.brandImageUrls) ? d.brandImageUrls : [],
    brandImagePublicIds: Array.isArray(d.brandImagePublicIds)
      ? d.brandImagePublicIds
      : [],
    createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? null,
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? null,
  };
};

/**
 * GET /api/services - Get all services (public)
 */
export const getServices = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const services = snapshot.docs.map(toDoc);
    res.json({ success: true, data: services });
  } catch (error) {
    console.error("getServices error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get services",
    });
  }
};

/**
 * GET /api/services/:id - Get one service by id (public)
 */
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    res.json({ success: true, data: toDoc(doc) });
  } catch (error) {
    console.error("getServiceById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get service",
    });
  }
};

/**
 * POST /api/services - Add a service (protected).
 * Body: mainImageUrl, mainImagePublicId, title, tagLine, aboutDescription, deliverables,
 *       tagColor?, textColor?, tags[], serviceImageUrls[], ..., brandImagePublicIds[]
 */
export const addService = async (req, res) => {
  try {
    const {
      mainImageUrl = "",
      mainImagePublicId = "",
      title = "",
      tagLine = "",
      aboutDescription = "",
      deliverables = "",
      tagColor = "",
      textColor = "",
      tags = [],
      serviceImageUrls = [],
      serviceImagePublicIds = [],
      brandImageUrls = [],
      brandImagePublicIds = [],
    } = req.body;

    if (!title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: title",
      });
    }

    const docRef = await db.collection(COLLECTION).add({
      mainImageUrl: mainImageUrl || "",
      mainImagePublicId: mainImagePublicId || "",
      title: title.trim(),
      tagLine: (tagLine || "").trim(),
      aboutDescription: (aboutDescription || "").trim(),
      deliverables: (deliverables || "").trim(),
      tagColor: String(tagColor || ""),
      textColor: String(textColor || ""),
      tags: Array.isArray(tags) ? tags.filter((t) => typeof t === "string" && t.trim()) : [],
      serviceImageUrls: Array.isArray(serviceImageUrls)
        ? serviceImageUrls.slice(0, MAX_SERVICE_IMAGES)
        : [],
      serviceImagePublicIds: Array.isArray(serviceImagePublicIds)
        ? serviceImagePublicIds.slice(0, MAX_SERVICE_IMAGES)
        : [],
      brandImageUrls: Array.isArray(brandImageUrls)
        ? brandImageUrls.slice(0, MAX_BRAND_IMAGES)
        : [],
      brandImagePublicIds: Array.isArray(brandImagePublicIds)
        ? brandImagePublicIds.slice(0, MAX_BRAND_IMAGES)
        : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Service added",
    });
  } catch (error) {
    console.error("addService error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add service",
    });
  }
};

/**
 * PUT /api/services/:id - Update a service (protected)
 */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      mainImageUrl,
      mainImagePublicId,
      title,
      tagLine,
      aboutDescription,
      deliverables,
      tagColor,
      textColor,
      tags,
      serviceImageUrls,
      serviceImagePublicIds,
      brandImageUrls,
      brandImagePublicIds,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: title",
      });
    }

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await docRef.update({
      mainImageUrl: mainImageUrl ?? "",
      mainImagePublicId: mainImagePublicId ?? "",
      title: title.trim(),
      tagLine: (tagLine ?? "").trim(),
      aboutDescription: (aboutDescription ?? "").trim(),
      deliverables: (deliverables ?? "").trim(),
      tagColor: String(tagColor ?? ""),
      textColor: String(textColor ?? ""),
      tags: Array.isArray(tags) ? tags.filter((t) => typeof t === "string" && t.trim()) : [],
      serviceImageUrls: Array.isArray(serviceImageUrls)
        ? serviceImageUrls.slice(0, MAX_SERVICE_IMAGES)
        : [],
      serviceImagePublicIds: Array.isArray(serviceImagePublicIds)
        ? serviceImagePublicIds.slice(0, MAX_SERVICE_IMAGES)
        : [],
      brandImageUrls: Array.isArray(brandImageUrls)
        ? brandImageUrls.slice(0, MAX_BRAND_IMAGES)
        : [],
      brandImagePublicIds: Array.isArray(brandImagePublicIds)
        ? brandImagePublicIds.slice(0, MAX_BRAND_IMAGES)
        : [],
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Service updated",
    });
  } catch (error) {
    console.error("updateService error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

/**
 * DELETE /api/services/:id - Delete a service (protected).
 * Deletes all images from Cloudinary then deletes Firestore doc.
 */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    const data = doc.data();

    const destroyIds = [
      data.mainImagePublicId,
      ...(Array.isArray(data.serviceImagePublicIds)
        ? data.serviceImagePublicIds
        : []),
      ...(Array.isArray(data.brandImagePublicIds)
        ? data.brandImagePublicIds
        : []),
    ].filter(Boolean);

    for (const publicId of destroyIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryErr) {
        console.error(
          "Cloudinary destroy failed, publicId=",
          publicId,
          "error:",
          cloudinaryErr?.message || cloudinaryErr,
        );
      }
    }

    await docRef.delete();
    res.json({
      success: true,
      message: "Service deleted",
    });
  } catch (error) {
    console.error("deleteService error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};
