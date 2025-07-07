import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ import

const router = express.Router();

// 🛍️ Public Routes
router.get("/", getProducts); // GET all products
router.get("/:id", getProductById); // GET product by ID

// 🛠️ Admin Routes (Protected)
router.post("/", protect, addProduct); // POST new product
router.put("/:id", protect, updateProduct); // UPDATE product
router.delete("/:id", protect, deleteProduct); // DELETE product

export default router;
