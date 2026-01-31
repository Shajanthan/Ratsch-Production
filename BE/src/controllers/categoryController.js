import admin from "../config/firebase.js";

const db = admin.firestore();
const COLLECTION = "categories";
const PROJECTS_COLLECTION = "projects";

const toDoc = (doc) => {
  const d = doc.data();
  return {
    id: doc.id,
    name: d.name ?? "",
    description: d.description ?? "",
  };
};

/**
 * Get or create a category by name. Returns the category document id (existing or newly created).
 * Use when adding/updating a project so we store category id.
 */
export const getOrCreateCategoryByName = async (name) => {
  const trimmed = String(name).trim();
  if (!trimmed) return null;
  const snapshot = await db
    .collection(COLLECTION)
    .where("name", "==", trimmed)
    .limit(1)
    .get();
  if (!snapshot.empty) {
    return snapshot.docs[0].id;
  }
  const ref = await db.collection(COLLECTION).add({
    name: trimmed,
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return ref.id;
};

/**
 * Ensure a category exists in the DB. If not, create it with empty description.
 * @deprecated Prefer getOrCreateCategoryByName when linking projects.
 */
export const ensureCategoryExists = async (name) => {
  await getOrCreateCategoryByName(name);
};

/**
 * GET /api/categories - Get all categories (public, for Projects page; admin uses too)
 */
export const getCategories = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const categories = snapshot.docs.map(toDoc);
    categories.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("getCategories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get categories",
    });
  }
};

/**
 * PUT /api/categories/:id - Update a category (protected). Body: description (optional), name (optional)
 */
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, name } = req.body;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const updates = { updatedAt: new Date() };
    if (typeof description !== "undefined") updates.description = String(description);
    if (typeof name !== "undefined" && String(name).trim()) updates.name = String(name).trim();
    await docRef.update(updates);
    res.json({
      success: true,
      message: "Category updated",
    });
  } catch (error) {
    console.error("updateCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

/**
 * DELETE /api/categories/:id - Delete a category (protected).
 * Only allowed if no project has projectCategoryId === this category id.
 */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const inUse = await db
      .collection(PROJECTS_COLLECTION)
      .where("projectCategoryId", "==", id)
      .limit(1)
      .get();
    if (!inUse.empty) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category: it is used by one or more projects.",
      });
    }
    await docRef.delete();
    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.error("deleteCategory error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};
