import express from "express";
import {
  login,
  verifyUser,
  refreshToken,
  getUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/verify", verifyUser);
router.post("/refresh", refreshToken);

// Protected routes (require authentication)
router.get("/user/:uid", authenticateToken, getUser);

export default router;
