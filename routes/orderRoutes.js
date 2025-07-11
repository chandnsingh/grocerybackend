import express from "express";
import {
  placeOrder,
  getOrdersByUser,
  getOrderById, // ✅ Add this import
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 POST /orders - Place a new order
router.post("/", protect, placeOrder);

// 🔐 GET /orders/my-orders - All orders of logged-in user
router.get("/my-orders", protect, getOrdersByUser);

// 🔐 GET /orders/:id - Single order details
router.get("/:id", protect, getOrderById); // ✅ NEW ROUTE

export default router;
