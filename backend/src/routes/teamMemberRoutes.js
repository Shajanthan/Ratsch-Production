import express from "express";
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamMemberController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTeamMembers);
router.post("/", authenticateToken, addTeamMember);
router.put("/:id", authenticateToken, updateTeamMember);
router.delete("/:id", authenticateToken, deleteTeamMember);

export default router;
