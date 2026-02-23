from flask import Blueprint, request, jsonify
from database import users_col, products_col, orders_col
from utils.jwt_handler import verify_token
from bson import ObjectId
from datetime import datetime

order = Blueprint("order", __name__)


# 🔹 helper response format
def response(success=True, msg="", data=None, code=200):
    return jsonify({
        "success": success,
        "message": msg,
        "data": data
    }), code


# 🔹 SAVE ORDER
@order.post("/save-order")
def save_order():
    try:
        user_id = verify_token()

        if not user_id:
            return response(False, "Unauthorized", code=401)

        data = request.get_json()

        if not data or not isinstance(data, list):
            return response(False, "Order items required", code=400)

        order_items = []

        # Validate each item
        for item in data:
            if "product_id" not in item or "qty" not in item:
                return response(False, "Invalid item format", code=400)

            product = products_col.find_one({"_id": ObjectId(item["product_id"])})

            if not product:
                return response(False, f"Product not found: {item['product_id']}", code=404)

            order_items.append({
                "product_id": str(product["_id"]),
                "name": product["name"],
                "price": product["price"],
                "qty": int(item["qty"]),
                "subtotal": product["price"] * int(item["qty"])
            })

        total_amount = sum(i["subtotal"] for i in order_items)

        order_doc = {
            "user": user_id,
            "items": order_items,
            "total": total_amount,
            "status": "Placed",
            "created_at": datetime.utcnow()
        }

        result = orders_col.insert_one(order_doc)
        order_doc["_id"] = str(result.inserted_id)

        return response(True, "Order placed successfully", order_doc, 201)

    except Exception as e:
        return response(False, "Order failed", str(e), 500)


# 🔹 GET USER ORDERS
@order.get("/")
def get_orders():
    try:
        user_id = verify_token()

        if not user_id:
            return response(False, "Unauthorized", code=401)

        orders = list(orders_col.find({"user": user_id}))

        for o in orders:
            o["_id"] = str(o["_id"])

        return response(True, "Orders fetched", orders)

    except Exception as e:
        return response(False, "Failed to fetch orders", str(e), 500)