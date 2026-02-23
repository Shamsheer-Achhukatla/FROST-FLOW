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