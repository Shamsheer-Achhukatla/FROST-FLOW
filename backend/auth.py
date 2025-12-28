from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import users

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "Missing fields"}), 400

        if users.find_one({"email": email}):
            return jsonify({"error": "User already exists"}), 400
        
        hashed = generate_password_hash(password)
        users.insert_one({"name": name, "email": email, "password": hashed})
        return jsonify({"message":"User Registered"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@auth.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        email = data.get("email")
        password = data.get("password")

        user = users.find_one({"email": email})
        if not user or not check_password_hash(user["password"], password):
            return jsonify({"error":"Invalid credentials"}), 401

        token = create_access_token(identity=str(user["_id"]))
        return jsonify({"token": token}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
