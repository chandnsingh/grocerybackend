import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔒 Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🪪 Token received in middleware:", token);
  console.log("🔑 JWT secret used to verify:", JWT_SECRET);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("❌ JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
