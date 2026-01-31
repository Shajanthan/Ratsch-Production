import express from "express";
import {
  getHomepageSettings,
  updateHomepageSettings,
} from "../controllers/homepageController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/settings", getHomepageSettings);
router.put("/settings", authenticateToken, updateHomepageSettings);

export default router;
