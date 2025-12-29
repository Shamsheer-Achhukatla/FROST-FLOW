from flask import Blueprint, request, jsonify
from database import orders_collection

orders = Blueprint("orders", __name__)

# SAVE ORDER (From Cart Checkout)
@orders.post("/cart/save-order")
def save_order():
    data = request.json
    orders_collection.insert_one(data)
    return jsonify({"message": "Order placed successfully"}), 201


# GET ALL ORDERS BY EMAIL
@orders.get("/orders/get/<email>")
def get_orders(email):
    result = list(orders_collection.find({"email": email}, {"_id": 0}))
    return jsonify(result), 200
