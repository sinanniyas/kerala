import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import placeRoutes from "./routes/placeRoutes.js";
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// CORS (IMPORTANT for JWT + cookies)
app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true                 // allow cookies to be sent
}));


app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// 🔥 Check login status for Navbar
app.get("/api/auth/check", authMiddleware, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

app.get("/", (req, res) => {
  res.send("Tourist Places API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
