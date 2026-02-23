from flask import Blueprint, request, jsonify
from database import get_db
from bson.objectid import ObjectId   # IMPORTANT

order_bp = Blueprint("orders", __name__)
db = get_db()
orders = db["orders"]

@order_bp.route("/", methods=["POST"])
def create_order():
    data = request.json
    result = orders.insert_one(data)
    return jsonify({"id": str(result.inserted_id)}), 201

@order_bp.route("/", methods=["GET"])
def get_orders():
    all_orders = list(orders.find())
    for order in all_orders:
        order["_id"] = str(order["_id"])
    return jsonify(all_orders)
@order_bp.route("/<id>", methods=["DELETE"])
def cancel_order(id):
    result = orders.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return {"message": "Order not found"}, 404
    return {"message": "Order cancelled successfully"}