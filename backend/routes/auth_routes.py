const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Mongoose User model
const { ObjectId } = require("mongoose").Types;

// 🔹 Helper response function
const response = (success = true, msg = "", data = null, code = 200) => {
  return [code, { success, message: msg, data }];
};

// 🔹 REGISTER
router.post("/register", async (req, res) => {
  try {
    const data = req.body;

    // Validate input
    if (!data || !data.name || !data.email || !data.password) {
      const [code, resp] = response(false, "Missing required fields", null, 400);
      return res.status(code).json(resp);
    }

    const email = data.email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const [code, resp] = response(false, "User already exists", null, 409);
      return res.status(code).json(resp);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name.trim(),
      email,
      password: hashedPassword,
      cart: [],
      orders: [],
      createdAt: new Date(),
    });

    await user.save();

    const [code, resp] = response(true, "Registered successfully");
    res.status(code).json(resp);
  } catch (err) {
    const [code, resp] = response(false, "Registration failed", err.message, 500);
    res.status(code).json(resp);
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.email || !data.password) {
      const [code, resp] = response(false, "Email and password required", null, 400);
      return res.status(code).json(resp);
    }

    const email = data.email.toLowerCase().trim();
    const user = await User.findOne({ email });

    if (!user) {
      const [code, resp] = response(false, "Invalid credentials", null, 401);
      return res.status(code).json(resp);
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      const [code, resp] = response(false, "Invalid credentials", null, 401);
      return res.status(code).json(resp);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const [code, resp] = response(true, "Login successful", {
      token,
      user_id: user._id.toString(),
      name: user.name,
    });

    res.status(code).json(resp);
  } catch (err) {
    const [code, resp] = response(false, "Login failed", err.message, 500);
    res.status(code).json(resp);
  }
});

// 🔹 CURRENT USER
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const [code, resp] = response(false, "Unauthorized", null, 401);
      return res.status(code).json(resp);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      const [code, resp] = response(false, "Unauthorized", null, 401);
      return res.status(code).json(resp);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      const [code, resp] = response(false, "Invalid token", null, 401);
      return res.status(code).json(resp);
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const [code, resp] = response(false, "User not found", null, 404);
      return res.status(code).json(resp);
    }

    const [code, resp] = response(true, "User fetched", user);
    res.status(code).json(resp);
  } catch (err) {
    const [code, resp] = response(false, "Failed to fetch user", err.message, 500);
    res.status(code).json(resp);
  }
});

module.exports = router;