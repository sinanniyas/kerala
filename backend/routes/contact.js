import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST: add new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, travelDate, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const newContact = new Contact({ name, email, phone, travelDate, message });
    await newContact.save();

    res.status(201).json({ message: "Contact submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit contact" });
  }
});

// GET: fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

export default router;
