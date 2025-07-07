import express from "express";
import { protect, adminOnly } from "../middleware/adminMiddleware.js";
import { getAllUsers, getAllOrders } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/orders", protect, adminOnly, getAllOrders);

export default router;
