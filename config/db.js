import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      "Mongo URI from env:",
      process.env.MONGO_URI || process.env.MONGODB_URI
    );

    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error("MongoDB URI not found in environment variables");

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected to: ${conn.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
