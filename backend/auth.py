from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import users

auth = Blueprint("auth", __name__)

# ------------------ REGISTER ------------------
@auth.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "Missing fields"}), 400

        if users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400
        
        hashed = generate_password_hash(password)
        users.insert_one({"name": name, "email": email, "password": hashed})

        return jsonify({"message": "User Registered"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------ LOGIN ------------------
@auth.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = users.find_one({"email": email})
        if not user:
            return jsonify({"message": "User not found"}), 404

        # FIX: verify hashed password
        if not check_password_hash(user["password"], password):
            return jsonify({"message": "Invalid credentials"}), 401

        token = create_access_token(identity=email)

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "email": user["email"],
                "name": user["name"],
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
