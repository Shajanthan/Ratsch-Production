import admin from "../config/firebase.js";

const db = admin.firestore();
const DOC_PATH = "settings/homepage";

/**
 * GET /api/homepage/settings - Get homepage featured project IDs (public)
 */
export const getHomepageSettings = async (req, res) => {
  try {
    const doc = await db.doc(DOC_PATH).get();
    const data = doc.exists ? doc.data() : {};
    res.json({
      success: true,
      data: {
        projectId1: data.projectId1 || "",
        projectId2: data.projectId2 || "",
        projectId3: data.projectId3 || "",
        latestProjectId1: data.latestProjectId1 || "",
        latestProjectId2: data.latestProjectId2 || "",
        latestProjectId3: data.latestProjectId3 || "",
        latestProjectId4: data.latestProjectId4 || "",
        clientId1: data.clientId1 || "",
        clientId2: data.clientId2 || "",
        clientId3: data.clientId3 || "",
        clientId4: data.clientId4 || "",
        coreValueId1: data.coreValueId1 || "",
        coreValueId2: data.coreValueId2 || "",
        coreValueId3: data.coreValueId3 || "",
      },
    });
  } catch (error) {
    console.error("getHomepageSettings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get homepage settings",
    });
  }
};

/**
 * PUT /api/homepage/settings - Update homepage featured project/client IDs (protected)
 * Body: { projectId1?, projectId2?, projectId3?, latestProjectId1-4?, clientId1-4?, coreValueId1-3? }
 */
export const updateHomepageSettings = async (req, res) => {
  try {
    const {
      projectId1 = "",
      projectId2 = "",
      projectId3 = "",
      latestProjectId1 = "",
      latestProjectId2 = "",
      latestProjectId3 = "",
      latestProjectId4 = "",
      clientId1 = "",
      clientId2 = "",
      clientId3 = "",
      clientId4 = "",
      coreValueId1 = "",
      coreValueId2 = "",
      coreValueId3 = "",
    } = req.body;
    const ref = db.doc(DOC_PATH);
    await ref.set(
      {
        projectId1: String(projectId1),
        projectId2: String(projectId2),
        projectId3: String(projectId3),
        latestProjectId1: String(latestProjectId1),
        latestProjectId2: String(latestProjectId2),
        latestProjectId3: String(latestProjectId3),
        latestProjectId4: String(latestProjectId4),
        clientId1: String(clientId1),
        clientId2: String(clientId2),
        clientId3: String(clientId3),
        clientId4: String(clientId4),
        coreValueId1: String(coreValueId1),
        coreValueId2: String(coreValueId2),
        coreValueId3: String(coreValueId3),
        updatedAt: new Date(),
      },
      { merge: true },
    );
    res.json({
      success: true,
      message: "Homepage settings updated",
      data: {
        projectId1,
        projectId2,
        projectId3,
        latestProjectId1,
        latestProjectId2,
        latestProjectId3,
        latestProjectId4,
        clientId1,
        clientId2,
        clientId3,
        clientId4,
        coreValueId1,
        coreValueId2,
        coreValueId3,
      },
    });
  } catch (error) {
    console.error("updateHomepageSettings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update homepage settings",
    });
  }
};
