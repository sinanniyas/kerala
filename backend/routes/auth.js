import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashed });

    res.json({ message: "User created", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Send token in response body (not cookie)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
router.get("/check", authMiddleware, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

export default router;
