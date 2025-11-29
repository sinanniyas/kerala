import express from "express";
import Place from "../models/Place.js";
import { normalizeCategory } from "../utils/normalizeCategory.js";


const router = express.Router();

// POST /api/places - add new place
router.post("/", async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json({ message: "Place added successfully", place: newPlace });
  } catch (error) {
    console.error("Error adding place:", error);
    res.status(500).json({ message: "Failed to add place", error });
  }
});

// GET /api/places - list all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Failed to fetch places" });
  }
});

router.post("/", async (req, res) => {
  try {
    const normalized = normalizeCategory(req.body.category);

    const newPlace = new Place({
      ...req.body,
      category: normalized,  // <-- replace raw category
    });

    await newPlace.save();

    res.status(201).json({ 
      message: "Place added successfully", 
      place: newPlace 
    });

  } catch (error) {
    console.error("Error adding place:", error);
    res.status(500).json({ message: "Failed to add place", error });
  }
});

router.put("/fix-categories", async (req, res) => {
  try {
    const places = await Place.find();

    for (let place of places) {
      place.category = normalizeCategory(place.category);
      await place.save();
    }

    res.json({ message: "All categories normalized!" });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});


export default router;
