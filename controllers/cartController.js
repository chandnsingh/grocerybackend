import User from "../models/Users.js";

// 🔹 Add or update cart item
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, selectedUnit, price } = req.body;

    if (!productId || !selectedUnit || price == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.cart.find(
      (item) =>
        item.productId.equals(productId) && item.selectedUnit === selectedUnit
    );

    if (existingItem) {
      if (quantity > 0) {
        existingItem.quantity = quantity;
        existingItem.price = price; // update price if needed
      } else {
        user.cart = user.cart.filter(
          (item) =>
            !(
              item.productId.equals(productId) &&
              item.selectedUnit === selectedUnit
            )
        );
      }
    } else {
      if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
      user.cart.push({ productId, quantity, selectedUnit, price });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add/update cart",
      error: error.message,
    });
  }
};

// 🔹 Get cart with populated products
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 Remove a specific product + unit from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const selectedUnit = req.query.unit;

    if (!selectedUnit) {
      return res
        .status(400)
        .json({ message: "Unit is required in query string" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) =>
        !(
          item.productId.equals(productId) && item.selectedUnit === selectedUnit
        )
    );

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 Clear the entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared", cart: [] });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
