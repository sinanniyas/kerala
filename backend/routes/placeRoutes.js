import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

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

// ------------------- GET PAGINATED PLACES -------------------
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;
    page = Number(page);
    limit = Number(limit);

    const total = await Place.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const places = await Place.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ places, totalPages });
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- DELETE PLACE -------------------
router.delete("/:id", async (req, res) => {
  try {
    const placeId = req.params.id;

    const deletedPlace = await Place.findByIdAndDelete(placeId);

    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting place:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
