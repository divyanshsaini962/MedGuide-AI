// config/db.js (ESM, lean)
import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongoose connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
