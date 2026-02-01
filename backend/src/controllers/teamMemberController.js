import admin from "../config/firebase.js";

const db = admin.firestore();
const COLLECTION = "teamMembers";

/**
 * GET /api/team-members - Get all team members (public)
 */
export const getTeamMembers = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).get();
    const members = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() ?? null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.() ?? null,
    }));
    res.json({ success: true, data: members });
  } catch (error) {
    console.error("getTeamMembers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get team members",
    });
  }
};

/**
 * POST /api/team-members - Add a team member (protected).
 * Body: { imageUrl, fullName, position }
 */
export const addTeamMember = async (req, res) => {
  try {
    const { imageUrl = "", fullName = "", position = "" } = req.body;

    if (!fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: fullName",
      });
    }

    const docRef = await db.collection(COLLECTION).add({
      imageUrl: String(imageUrl),
      fullName: String(fullName).trim(),
      position: String(position).trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: { id: docRef.id },
      message: "Team member added",
    });
  } catch (error) {
    console.error("addTeamMember error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add team member",
    });
  }
};

/**
 * PUT /api/team-members/:id - Update a team member (protected).
 * Body: { imageUrl?, fullName?, position? }
 */
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, fullName, position } = req.body;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    const updates = { updatedAt: new Date() };
    if (imageUrl !== undefined) updates.imageUrl = String(imageUrl);
    if (fullName !== undefined) updates.fullName = String(fullName).trim();
    if (position !== undefined) updates.position = String(position).trim();

    await docRef.update(updates);

    res.json({
      success: true,
      message: "Team member updated",
    });
  } catch (error) {
    console.error("updateTeamMember error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update team member",
    });
  }
};

/**
 * DELETE /api/team-members/:id - Delete a team member (protected).
 */
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }
    await docRef.delete();
    res.json({
      success: true,
      message: "Team member deleted",
    });
  } catch (error) {
    console.error("deleteTeamMember error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
    });
  }
};
