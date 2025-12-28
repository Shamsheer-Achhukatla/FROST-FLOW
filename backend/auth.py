# auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import users

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST", "OPTIONS"])
def register_user():
    if request.method == "OPTIONS": return '', 200
    data = request.json

    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": generate_password_hash(data["password"])
    })

    return jsonify({"message": "Registered ✔"}), 200


@auth.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS": return '', 200
    data = request.json
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
