# routes/order_routes.py
from flask import Blueprint, request, jsonify
from utils.db_connection import users_col, orders_col
from utils.jwt_handler import verify_token

order = Blueprint("order", __name__)

@order.route("/order/place", methods=["POST"])
def place_order():
    user = verify_token()
    if not user: return jsonify({"msg": "Unauthorized"}), 401

    data = request.json
    orders_col.insert_one({"user": user, "items": data, "status": "Pending"})
    users_col.update_one({"_id": user}, {"$push": {"orders": data}, "$set": {"cart": []}})

    return jsonify({"msg": "Order Placed"}), 200

@order.route("/orders", methods=["GET"])
def get_orders():
    user = verify_token()
    if not user: return jsonify({"msg": "Unauthorized"}), 401

    data = list(orders_col.find({"user": user}, {"_id": 0}))
    return jsonify(data), 200
