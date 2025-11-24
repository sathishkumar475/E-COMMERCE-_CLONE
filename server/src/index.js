import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB URI from .env (Atlas)
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

// Validate MONGO_URI and provide a local fallback for development
if (!MONGO_URI) {
  console.warn(
    "Warning: MONGO_URI is not set. Falling back to local MongoDB at mongodb://127.0.0.1:27017/sath_db"
  );
}
const mongoUriToUse = MONGO_URI || "mongodb://127.0.0.1:27017/sath_db";

// Connect to MongoDB
mongoose
  .connect(mongoUriToUse)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    // Exit the process when a DB connection can't be established
    process.exit(1);
  });
