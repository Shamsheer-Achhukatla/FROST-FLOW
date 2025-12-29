from flask import Blueprint, jsonify
from database import products_collection

products = Blueprint("products", __name__)

@products.get("/products/all")
def get_all_products():
    data = list(products_collection.find({}, {"_id": 0}))
    return jsonify(data), 200
