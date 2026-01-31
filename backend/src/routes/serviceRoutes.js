import express from "express";
import {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", authenticateToken, addService);
router.put("/:id", authenticateToken, updateService);
router.delete("/:id", authenticateToken, deleteService);

export default router;
