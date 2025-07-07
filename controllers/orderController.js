import Order from "../models/Order.js";

// ✅ Place a new order
export const placeOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { customer, items, totalAmount } = req.body;

    console.log("Incoming order body:", req.body);

    // 🔒 Validate customer details
    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ message: "Invalid customer details" });
    }

    // 🔒 Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "At least one item is required" });
    }

    // 🔍 Validate each item
    for (const item of items) {
      if (
        !item._id ||
        !item.name ||
        !item.unit ||
        typeof item.price !== "number" ||
        typeof item.quantity !== "number"
      ) {
        return res.status(400).json({
          message: "Each item must have _id, name, unit, price, and quantity",
        });
      }
    }

    // 💰 Validate totalAmount
    if (typeof totalAmount !== "number" || totalAmount < 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    // 📝 Create and save order
    const order = new Order({
      user: req.user._id,
      customer,
      items: items.map((item) => ({
        productId: item._id,
        name: item.name,
        selectedUnit: item.unit,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("❌ Order save error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get orders for the logged-in user
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Fetch orders error:", err);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};
