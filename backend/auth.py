from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import users_collection

auth = Blueprint("auth", __name__)

# REGISTER
@auth.post("/auth/register")
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = generate_password_hash(password)
    users_collection.insert_one({"email": email, "password": hashed_pw})

    return jsonify({"message": "Registration successful"}), 201


# LOGIN
@auth.post("/auth/login")
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid email or password"}), 401

    token = create_access_token(identity=email)
    return jsonify({"token": token, "message": "Login success"}), 200
