from flask import Blueprint, request, jsonify
from database import get_db
from bson.objectid import ObjectId

product_bp = Blueprint("products", __name__)
db = get_db()
products = db["products"]

@product_bp.route("/", methods=["POST"])
def add_product():
    data = request.json
    result = products.insert_one(data)
    return jsonify({"id": str(result.inserted_id)}), 201

@product_bp.route("/", methods=["GET"])
def get_products():
    all_products = list(products.find())
    for product in all_products:
        product["_id"] = str(product["_id"])
    return jsonify(all_products)

@product_bp.route("/<id>", methods=["GET"])
def get_product(id):
    product = products.find_one({"_id": ObjectId(id)})
    if not product:
        return jsonify({"message": "Not found"}), 404
    product["_id"] = str(product["_id"])
    return jsonify(product)
@product_bp.route("/seed", methods=["POST"])
def seed_products():
    sample_products = [
        {
            "name": "Split AC 1 Ton Inverter",
            "price": 28000,
            "description": "5-Star Energy Efficient Inverter AC",
            "image": "split1.jpg"
        },
        {
            "name": "Split AC 1.5 Ton Inverter",
            "price": 35000,
            "description": "High Cooling Capacity for Medium Rooms",
            "image": "split15.jpg"
        },
        {
            "name": "Window AC 1 Ton",
            "price": 22000,
            "description": "Compact Cooling for Small Spaces",
            "image": "window.jpg"
        },
        {
            "name": "Ceiling Cassette AC",
            "price": 45000,
            "description": "360° Airflow Commercial Cooling",
            "image": "cassette.jpg"
        },
        {
            "name": "VRF Multi-Zone System",
            "price": 250000,
            "description": "Industrial Variable Refrigerant Flow System",
            "image": "vrf.jpg"
        },
        {
            "name": "Tower Air Conditioner",
            "price": 48000,
            "description": "Premium Vertical Cooling Unit",
            "image": "tower.jpg"
        },
        {
            "name": "Ductable AC System",
            "price": 120000,
            "description": "Centralized Cooling for Large Areas",
            "image": "duct.jpg"
        }
    ]

    products.insert_many(sample_products)
    return {"message": "Products seeded successfully ❄️"}