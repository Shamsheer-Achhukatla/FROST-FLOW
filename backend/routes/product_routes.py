from flask import Blueprint, request, jsonify
from database import users_col, products_col
from utils.jwt_handler import verify_token
from bson import ObjectId

product = Blueprint("product", __name__)


# 🔹 helper response format
def response(success=True, msg="", data=None, code=200):
    return jsonify({
        "success": success,
        "message": msg,
        "data": data
    }), code


# 🔹 GET ALL PRODUCTS
@product.get("/products")
def get_products():
    try:
        products = list(products_col.find())

        for p in products:
            p["_id"] = str(p["_id"])

        return response(True, "Products fetched", products)

    except Exception as e:
        return response(False, "Failed to fetch products", str(e), 500)


# 🔹 ADD TO CART
@product.post("/cart/add")
def add_to_cart():
    try:
        user_id = verify_token()
        if not user_id:
            return response(False, "Unauthorized", code=401)

        data = request.get_json()

        if not data or "product_id" not in data or "qty" not in data:
            return response(False, "product_id and qty required", code=400)

        product_data = products_col.find_one({"_id": ObjectId(data["product_id"])})

        if not product_data:
            return response(False, "Product not found", code=404)

        cart_item = {
            "product_id": str(product_data["_id"]),
            "name": product_data["name"],
            "price": product_data["price"],
            "qty": int(data["qty"])
        }

        users_col.update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"cart": cart_item}}
        )

        return response(True, "Added to cart")

    except Exception as e:
        return response(False, "Failed to add to cart", str(e), 500)


# 🔹 REMOVE FROM CART
@product.post("/cart/remove")
def remove_from_cart():
    try:
        user_id = verify_token()
        if not user_id:
            return response(False, "Unauthorized", code=401)

        data = request.get_json()

        if not data or "product_id" not in data:
            return response(False, "product_id required", code=400)

        users_col.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"cart": {"product_id": data["product_id"]}}}
        )

        return response(True, "Removed from cart")

    except Exception as e:
        return response(False, "Failed to remove item", str(e), 500)


# 🔹 GET CART
@product.get("/cart")
def get_cart():
    try:
        user_id = verify_token()
        if not user_id:
            return response(False, "Unauthorized", code=401)

        user = users_col.find_one(
            {"_id": ObjectId(user_id)},
            {"cart": 1, "_id": 0}
        )

        return response(True, "Cart fetched", user.get("cart", []))

    except Exception as e:
        return response(False, "Failed to fetch cart", str(e), 500)