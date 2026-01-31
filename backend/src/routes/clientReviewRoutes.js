import express from "express";
import {
  getClientReviews,
  addClientReview,
  updateClientReview,
  deleteClientReview,
} from "../controllers/clientReviewController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getClientReviews);
router.post("/", authenticateToken, addClientReview);
router.put("/:id", authenticateToken, updateClientReview);
router.delete("/:id", authenticateToken, deleteClientReview);

export default router;
