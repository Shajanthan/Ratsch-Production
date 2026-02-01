import express from "express";
import { getCeoSection, updateCeoSection } from "../controllers/aboutUsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/ceo", getCeoSection);
router.put("/ceo", authenticateToken, updateCeoSection);

export default router;
