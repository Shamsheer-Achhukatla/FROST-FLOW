# routes/product_routes.py
from flask import Blueprint, request, jsonify
from utils.db_connection import products_col, users_col
from utils.jwt_handler import verify_token

product = Blueprint("product", __name__)

@product.route("/products", methods=["GET"])
def get_products():
    data = list(products_col.find({}, {"_id": 0}))
    return jsonify(data), 200

@product.route("/cart/add", methods=["POST"])
def add_to_cart():
    user = verify_token()
    if not user: return jsonify({"msg": "Unauthorized"}), 401
    products_col.update_one

    data = request.json
    users_col.update_one({"_id": user}, {"$push": {"cart": data}})
    return jsonify({"msg": "Added to cart"}), 200

@product.route("/cart/remove", methods=["POST"])
def remove_from_cart():
    user = verify_token()
    if not user: return jsonify({"msg": "Unauthorized"}), 401

    data = request.json
    users_col.update_one({"_id": user}, {"$pull": {"cart": data}})
    return jsonify({"msg": "Removed"}), 200
