import mongoose from "mongoose";
import dotenv from "dotenv";
import Place from "./models/Place.js";

dotenv.config();

// CATEGORY MAPPING
const categoryMap = {
  Beaches: ["Beach"],
  "Hill Stations": ["Hill Station", "Hill Region", "Hill Viewpoint"],
  Wildlife: ["Wildlife", "Wildlife Sanctuary", "Forest", "Nature", "Adventure"],
  Heritage: ["Cultural Site", "Heritage", "Temple", "Cultural Centre", "Museum", "Fort"],
  Backwaters: ["Backwater", "Lake", "Island"],
  Waterfalls: ["Waterfall"],
  Trekking: ["Trekking", "Trekking Spot"],
  "Scenic Spots": [
    "Viewpoint",
    "Scenic Point",
    "Village",
    "Garden & Dam",
    "Garden & Art",
    "Dam",
    "Dam & Garden"
  ],
};

function mapCategory(originalCategory) {
  for (const main in categoryMap) {
    if (categoryMap[main].includes(originalCategory)) return main;
  }
  return "Other";
}

async function updateAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const allPlaces = await Place.find();

    for (const place of allPlaces) {
      const newCategory = mapCategory(place.category);

      // Only update if category changed
      if (place.category !== newCategory) {
        place.category = newCategory;
        await place.save();
        console.log(`Updated: ${place.name} → ${newCategory}`);
      }
    }

    console.log("✔ ALL CATEGORIES UPDATED SUCCESSFULLY");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateAll();
