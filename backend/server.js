import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import placeRoutes from "./routes/placeRoutes.js";
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// CORS (IMPORTANT for JWT + cookies)
app.use(cors({
  origin: "*",    // allow ANY app, ANY website, ANY user
  methods: ["GET", "POST", "PUT", "DELETE"],
}));



app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Tourist Places API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
