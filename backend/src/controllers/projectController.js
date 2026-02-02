import admin from "../config/firebase.js";
import cloudinary from "../config/cloudinary.js";
import {
  getOrCreateCategoryByName,
} from "./categoryController.js";

const db = admin.firestore();
const COLLECTION = "projects";
const CATEGORIES_COLLECTION = "categories";
const CLOUDINARY_PREFIX = "projects";

const toDoc = (doc) => {
  const d = doc.data();
  return {
    id: doc.id,
    ...d,
    imageUrls: Array.isArray(d.imageUrls) ? d.imageUrls : [],
    imagePublicIds: Array.isArray(d.imagePublicIds) ? d.imagePublicIds : [],
    bannerImageUrl: d.bannerImageUrl ?? "",
    bannerImagePublicId: d.bannerImagePublicId ?? "",
    createdAt: d.createdAt?.toDate?.()?.toISOString?.() ?? null,
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() ?? null,
  };
};

async function getCategoryNameMap() {
  const snapshot = await db.collection(CATEGORIES_COLLECTION).get();
  const map = {};
  snapshot.docs.forEach((doc) => {
    map[doc.id] = doc.data().name ?? "";
  });
  return map;
}

function resolveProjectCategory(project, nameMap) {
  const id = project.projectCategoryId;
  if (id && nameMap[id] !== undefined) {
    return { ...project, projectCategory: nameMap[id] || project.projectCategory || "" };
  }
  return { ...project, projectCategory: project.projectCategory ?? "" };
}

/**
 * GET /api/projects - Get all projects (public). Resolves projectCategory from category id.
 */
export const getProjects = async (req, res) => {
  try {
    const [projectsSnapshot, nameMap] = await Promise.all([
      db.collection(COLLECTION).get(),
      getCategoryNameMap(),
    ]);
    const projects = projectsSnapshot.docs
      .map(toDoc)
      .map((p) => resolveProjectCategory(p, nameMap));
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("getProjects error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get projects",
    });
  }
};

/**
 * GET /api/projects/:id - Get one project by id (public). Resolves projectCategory from category id.
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    const nameMap = await getCategoryNameMap();
    const project = resolveProjectCategory(toDoc(doc), nameMap);
    res.json({ success: true, data: project });
  } catch (error) {
    console.error("getProjectById error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get project",
    });
  }
};

/**
 * POST /api/projects - Add a project (protected).
 * Body: titleLine1, titleLine2, projectCategoryId (or projectCategory name), smallDescription, date, type, client, overview, results, imageUrls[], imagePublicIds[]
 */
export const addProject = async (req, res) => {
  try {
    const {
      titleLine1 = "",
      titleLine2 = "",
      projectCategoryId = "",
      projectCategory = "",
      smallDescription = "",
      date = "",
      type = "",
      client = "",
      overview = "",
      results = "",
      coverImageUrl = "",
      coverImagePublicId = "",
      bannerImageUrl = "",
      bannerImagePublicId = "",
      imageUrls = [],
      imagePublicIds = [],
    } = req.body;

    if (!titleLine1 || !titleLine2) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: titleLine1, titleLine2",
      });
    }

    let categoryId = (projectCategoryId && String(projectCategoryId).trim()) || null;
    if (!categoryId) {
      const name = (projectCategory && String(projectCategory).trim()) || "";
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Missing required field: projectCategoryId or projectCategory",
        });
      }
      categoryId = await getOrCreateCategoryByName(name);
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: "Invalid projectCategory",
        });
      }
    } else {
      const catRef = db.collection(CATEGORIES_COLLECTION).doc(categoryId);
      const catDoc = await catRef.get();
      if (!catDoc.exists) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const docRef = await db.collection(COLLECTION).add({
      titleLine1,
      titleLine2,
      projectCategoryId: categoryId,
      smallDescription: smallDescription || "",
      date: date || "",
      type: type || "",
      client: client || "",
      overview: overview || "",
      results: results || "",
      coverImageUrl: coverImageUrl || "",
      coverImagePublicId: coverImagePublicId || "",
      bannerImageUrl: bannerImageUrl || "",
      bannerImagePublicId: bannerImagePublicId || "",
      imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
      imagePublicIds: Array.isArray(imagePublicIds) ? imagePublicIds : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Project added",
    });
  } catch (error) {
    console.error("addProject error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add project",
    });
  }
};

/**
 * PUT /api/projects/:id - Update a project (protected). Uses projectCategoryId (or projectCategory name).
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titleLine1,
      titleLine2,
      projectCategoryId: bodyCategoryId,
      projectCategory,
      smallDescription,
      date,
      type,
      client,
      overview,
      results,
      coverImageUrl,
      coverImagePublicId,
      bannerImageUrl,
      bannerImagePublicId,
      imageUrls,
      imagePublicIds,
    } = req.body;

    if (!titleLine1 || !titleLine2) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: titleLine1, titleLine2",
      });
    }

    let categoryId = (bodyCategoryId && String(bodyCategoryId).trim()) || null;
    if (!categoryId) {
      const name = (projectCategory && String(projectCategory).trim()) || "";
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Missing required field: projectCategoryId or projectCategory",
        });
      }
      categoryId = await getOrCreateCategoryByName(name);
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: "Invalid projectCategory",
        });
      }
    } else {
      const catRef = db.collection(CATEGORIES_COLLECTION).doc(categoryId);
      const catDoc = await catRef.get();
      if (!catDoc.exists) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await docRef.update({
      titleLine1,
      titleLine2,
      projectCategoryId: categoryId,
      smallDescription: smallDescription ?? "",
      date: date ?? "",
      type: type ?? "",
      client: client ?? "",
      overview: overview ?? "",
      results: results ?? "",
      coverImageUrl: coverImageUrl ?? "",
      coverImagePublicId: coverImagePublicId ?? "",
      bannerImageUrl: bannerImageUrl ?? "",
      bannerImagePublicId: bannerImagePublicId ?? "",
      imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
      imagePublicIds: Array.isArray(imagePublicIds) ? imagePublicIds : [],
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: "Project updated",
    });
  } catch (error) {
    console.error("updateProject error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

/**
 * DELETE /api/projects/:id - Delete a project (protected).
 * Deletes all images from Cloudinary then deletes Firestore doc.
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    const data = doc.data();
    const publicIds = Array.isArray(data.imagePublicIds)
      ? data.imagePublicIds
      : [];
    for (const publicId of publicIds) {
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
    const coverId = data.coverImagePublicId || `${CLOUDINARY_PREFIX}/${id}_cover`;
    try {
      await cloudinary.uploader.destroy(coverId);
    } catch {
      // ignore
    }
    const bannerId = data.bannerImagePublicId || `${CLOUDINARY_PREFIX}/${id}_banner`;
    try {
      await cloudinary.uploader.destroy(bannerId);
    } catch {
      // ignore
    }
    const singleId = data.imagePublicId || `${CLOUDINARY_PREFIX}/${id}`;
    if (!publicIds.length) {
      try {
        await cloudinary.uploader.destroy(singleId);
      } catch {
        // ignore
      }
    }
    await docRef.delete();
    res.json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.error("deleteProject error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
