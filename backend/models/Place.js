import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  district: { type: String, required: true },
  category: { type: String, required: true },
  mapLink: { type: String, required: true },
  shortDescription: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  bestTime: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Cloudinary URL
}, { timestamps: true });

export default mongoose.model("Place", placeSchema);
