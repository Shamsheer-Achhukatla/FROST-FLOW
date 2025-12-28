from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import users

auth = Blueprint("auth", __name__)

# ------------------- CORS PRE-FLIGHT FIX -------------------
@auth.route("/login", methods=["OPTIONS"])
@auth.route("/register", methods=["OPTIONS"])
def handle_options():
    return jsonify({"status": "CORS OK"}), 200


# REGISTER
@auth.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    hashed = generate_password_hash(data["password"])
    users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed
    })
    return jsonify({"message": "Registered"}), 200

# LOGIN
@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = users.find_one({"email": data["email"]})

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=data["email"])
    return jsonify({
        "message": "Login OK",
        "token": token,
        "user": {"name": user["name"], "email": user["email"]}
    }), 200

    