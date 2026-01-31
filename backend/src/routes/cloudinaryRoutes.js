import express from "express";
import { deleteImage } from "../controllers/cloudinaryController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/delete", authenticateToken, deleteImage);

export default router;
