import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 All routes below require authentication via 'protect'

// ✅ Add or update cart item
router.post("/", protect, addToCart);

// ✅ Get all cart items for logged-in user
router.get("/", protect, getCart);

// ✅ Remove a specific item from cart by productId
router.delete("/:productId", protect, removeFromCart);

// ✅ Clear entire cart
router.put("/clear", protect, clearCart);

export default router;
