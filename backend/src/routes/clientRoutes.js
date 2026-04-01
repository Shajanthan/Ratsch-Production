import express from "express";
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getClients);
router.post("/", authenticateToken, addClient);
router.put("/:id", authenticateToken, updateClient);
router.delete("/:id", authenticateToken, deleteClient);

export default router;
