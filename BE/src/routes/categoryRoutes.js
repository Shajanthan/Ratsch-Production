import express from "express";
import {
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.put("/:id", authenticateToken, updateCategory);
router.delete("/:id", authenticateToken, deleteCategory);

export default router;
