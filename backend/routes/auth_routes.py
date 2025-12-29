# routes/auth_routes.py
from flask import Blueprint, request, jsonify
from utils.db_connection import users_col
from utils.password_hash import hash_password, verify_password
from utils.jwt_handler import create_token

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    if users_col.find_one({"email": data["email"]}):
        return jsonify({"msg": "User already exists"}), 400

    users_col.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hash_password(data["password"]),
        "cart": [],
        "orders": []
    })

    return jsonify({"msg": "Registered Successfully"}), 200


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_col.find_one({"email": data["email"]})
    if not user or not verify_password(user["password"], data["password"]):
        return jsonify({"msg": "Invalid Credentials"}), 401

    token = create_token(str(user["_id"]))
    return jsonify({"token": token, "msg": "Login Success"}), 200

@auth.get("/me")
def me():
    user = verify_token()
    if not user: return jsonify({"msg":"Unauthorized"}),401
    data = users_col.find_one({"_id": ObjectId(user)}, {"password":0})
    return jsonify(data),200

@auth.get("/me")
def me():
    user = verify_token()
    if not user: return jsonify({"msg":"Unauthorized"}),401

    data = users_col.find_one({"_id": ObjectId(user)}, {"password":0})
    return jsonify(data),200

