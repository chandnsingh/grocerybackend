import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, // Ensures 10-digit number
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Better than string
          ref: "Product", // optional, if you have it
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        selectedUnit: {
          type: String,
          default: null,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export default mongoose.model("Order", orderSchema);
