import admin from "../config/firebase.js";

const db = admin.firestore();
const COLLECTION = "navbarCategories";

const toDoc = (doc) => {
  const d = doc.data();
  return {
    id: doc.id,
    key: d.key || "",
    title: d.title || "",
    icon: d.icon || "",
    order: typeof d.order === "number" ? d.order : 0,
    items: Array.isArray(d.items)
      ? d.items.filter((v) => typeof v === "string" && v.trim())
      : [],
    createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? null,
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? null,
  };
};

/**
 * GET /api/navbar-categories - Get all navbar categories (public)
 */
export const getNavbarCategories = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const categories = snapshot.docs.map(toDoc).sort((a, b) => a.order - b.order);
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("getNavbarCategories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get navbar categories",
    });
  }
};

/**
 * POST /api/navbar-categories - Add navbar category (protected)
 */
export const addNavbarCategory = async (req, res) => {
  try {
    const { key = "", title = "", icon = "", order = 0, items = [] } = req.body;

    if (!key.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: key",
      });
    }

    const now = new Date();
    const docRef = await db.collection(COLLECTION).add({
      key: key.trim(),
      title: title.trim() || key.trim(),
      icon: icon || "",
      order: Number.isFinite(order) ? order : 0,
      items: Array.isArray(items)
        ? items
            .map((v) => (typeof v === "string" ? v.trim() : ""))
            .filter(Boolean)
        : [],
      createdAt: now,
      updatedAt: now,
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Navbar category added",
    });
  } catch (error) {
    console.error("addNavbarCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add navbar category",
    });
  }
};

/**
 * PUT /api/navbar-categories/:id - Update navbar category (protected)
 */
export const updateNavbarCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, title, icon, order, items } = req.body;

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Navbar category not found",
      });
    }

    const payload = {
      updatedAt: new Date(),
    };

    if (typeof key === "string") payload.key = key.trim();
    if (typeof title === "string") payload.title = title.trim();
    if (typeof icon === "string") payload.icon = icon;
    if (order !== undefined)
      payload.order = Number.isFinite(order) ? order : 0;
    if (Array.isArray(items)) {
      payload.items = items
        .map((v) => (typeof v === "string" ? v.trim() : ""))
        .filter(Boolean);
    }

    await docRef.update(payload);

    res.json({
      success: true,
      message: "Navbar category updated",
    });
  } catch (error) {
    console.error("updateNavbarCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update navbar category",
    });
  }
};

/**
 * DELETE /api/navbar-categories/:id - Delete navbar category (protected)
 */
export const deleteNavbarCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Navbar category not found",
      });
    }

    await docRef.delete();
    res.json({
      success: true,
      message: "Navbar category deleted",
    });
  } catch (error) {
    console.error("deleteNavbarCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete navbar category",
    });
  }
};

