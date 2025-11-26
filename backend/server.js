import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import placeRoutes from "./routes/placeRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/places", placeRoutes);

app.get("/", (req, res) => {
  res.send("Tourist Places API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
