import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

// ---------------- CATEGORY GROUPING MAP ----------------
const categoryMap = {
  Beaches: ["Beach"],
  "Hill Stations": ["Hill Station", "Hill Region", "Hill Viewpoint"],
  Wildlife: ["Wildlife", "Wildlife Sanctuary", "Forest", "Nature", "Adventure"],
  Heritage: [
    "Cultural Site",
    "Heritage",
    "Temple",
    "Cultural Centre",
    "Museum",
    "Fort"
  ],
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
  ]
};

function mapCategory(originalCategory) {
  for (const main in categoryMap) {
    if (categoryMap[main].includes(originalCategory)) {
      return main;
    }
  }
  return "Other"; // fallback
}

// ------------------- POST: ADD PLACE -------------------
router.post("/", async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json({ message: "Place added successfully", place: newPlace });
  } catch (error) {
    res.status(500).json({ message: "Failed to add place", error });
  }
});

// ------------------- GET ALL PLACES -------------------
router.get("/", async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });

    // Add grouped category before sending response
    const mappedPlaces = places.map((p) => ({
      ...p.toObject(),
      mainCategory: mapCategory(p.category)
    }));

    res.json(mappedPlaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch places" });
  }
});

export default router;
