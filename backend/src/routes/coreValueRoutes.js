import express from "express";
import {
  getCoreValues,
  addCoreValue,
  updateCoreValue,
  deleteCoreValue,
} from "../controllers/coreValueController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCoreValues);
router.post("/", authenticateToken, addCoreValue);
router.put("/:id", authenticateToken, updateCoreValue);
router.delete("/:id", authenticateToken, deleteCoreValue);

export default router;
