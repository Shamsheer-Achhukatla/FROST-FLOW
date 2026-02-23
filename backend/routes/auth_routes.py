<<<<<<< HEAD
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
=======
from flask import Blueprint, request, jsonify
from database import users_col
from utils.password_hash import hash_password, verify_password
from utils.jwt_handler import create_token, verify_token
from bson import ObjectId

auth = Blueprint("auth", __name__)


# 🔹 helper response format
def response(success=True, msg="", data=None, code=200):
    return jsonify({
        "success": success,
        "message": msg,
        "data": data
    }), code


# 🔹 REGISTER
@auth.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        # Validate input
        if not data or not all(k in data for k in ("name", "email", "password")):
            return response(False, "Missing required fields", code=400)

        email = data["email"].lower().strip()

        if users_col.find_one({"email": email}):
            return response(False, "User already exists", code=409)

        users_col.insert_one({
            "name": data["name"].strip(),
            "email": email,
            "password": hash_password(data["password"]),
            "cart": [],
            "orders": [],
            "created_at": ObjectId().generation_time
        })

        return response(True, "Registered successfully")

    except Exception as e:
        return response(False, "Registration failed", str(e), 500)


# 🔹 LOGIN
@auth.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        if not data or not all(k in data for k in ("email", "password")):
            return response(False, "Email and password required", code=400)

        email = data["email"].lower().strip()
        user = users_col.find_one({"email": email})

        if not user or not verify_password(user["password"], data["password"]):
            return response(False, "Invalid credentials", code=401)

        token = create_token(str(user["_id"]))

        return response(True, "Login successful", {
            "token": token,
            "user_id": str(user["_id"]),
            "name": user["name"]
        })

    except Exception as e:
        return response(False, "Login failed", str(e), 500)


# 🔹 CURRENT USER
@auth.get("/me")
def me():
    try:
        user_id = verify_token()

        if not user_id:
            return response(False, "Unauthorized", code=401)

        user = users_col.find_one(
            {"_id": ObjectId(user_id)},
            {"password": 0}
        )

        if not user:
            return response(False, "User not found", code=404)

        user["_id"] = str(user["_id"])  # convert ObjectId → string

        return response(True, "User fetched", user)

    except Exception as e:
        return response(False, "Failed to fetch user", str(e), 500)
>>>>>>> 3917b19f969e3e2905b257cd2b7d8ae0594c68f4
