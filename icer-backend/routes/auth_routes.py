from flask import Blueprint, request, jsonify
from models.user_model import create_user, find_user_by_email
from utils.password_hash import hash_password, check_password
from utils.jwt_handler import generate_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if find_user_by_email(data["email"]):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = hash_password(data["password"])

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed_pw
    }

    result = create_user(user)

    token = generate_token(result.inserted_id)

    return jsonify({"token": token}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = find_user_by_email(data["email"])
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    if not check_password(data["password"], user["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = generate_token(user["_id"])

    return jsonify({"token": token})