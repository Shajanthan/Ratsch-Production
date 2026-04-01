import express from "express";
import {
  getNavbarCategories,
  addNavbarCategory,
  updateNavbarCategory,
  deleteNavbarCategory,
} from "../controllers/navbarCategoryController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: used by frontend navbar
router.get("/", getNavbarCategories);

// Protected: admin only
router.post("/", authenticateToken, addNavbarCategory);
router.put("/:id", authenticateToken, updateNavbarCategory);
router.delete("/:id", authenticateToken, deleteNavbarCategory);

export default router;

