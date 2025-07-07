import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    inStock: { type: Boolean, default: true },
    description: { type: String },

    // ⭐️ Use variants instead of flat price/unit/options
    variants: [
      {
        unit: { type: String, required: true }, // e.g., "500g"
        price: { type: Number, required: true }, // e.g., 25
        discount: { type: String, default: "0%" }, // e.g., "10%"
      },
    ],

    reviews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
