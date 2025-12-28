from flask import Blueprint, request, jsonify
from database import products
from flask_jwt_extended import jwt_required, get_jwt_identity

product = Blueprint("product", __name__)

# Get all products
@product.route("/", methods=["GET"])
def get_products():
    data = list(products.find({}, {"_id": 0}))
    return jsonify(data), 200

# Add to cart
@product.route("/add", methods=["POST"])
@jwt_required()
def add_to_cart():
    from database import orders
    user_id = get_jwt_identity()
    data = request.get_json()
    
    item = {
        "user_id": user_id,
        "name": data.get("name"),
        "price": data.get("price"),
        "status": "In Cart"
    }

    orders.insert_one(item)
    return jsonify({"message":"Added to Cart"}), 201
