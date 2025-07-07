import express from "express";
import { placeOrder, getOrdersByUser } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 POST /orders - Place a new order (requires auth)
router.post("/", protect, placeOrder);

// 🔐 GET /orders/my-orders - Get orders for logged-in user (requires auth)
router.get("/my-orders", protect, getOrdersByUser);

export default router;
