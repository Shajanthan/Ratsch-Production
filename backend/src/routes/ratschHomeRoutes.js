import express from "express";
import {
  getRatschHomeSettings,
  updateRatschHomeSettings,
} from "../controllers/ratschHomeController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: fetch current Ratsch homepage banner settings
router.get("/settings", getRatschHomeSettings);

// Protected: update Ratsch homepage banner settings
router.put("/settings", authenticateToken, updateRatschHomeSettings);

export default router;

