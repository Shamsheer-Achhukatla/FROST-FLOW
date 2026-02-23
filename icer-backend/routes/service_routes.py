from flask import Blueprint, request, jsonify
from database import get_db

service_bp = Blueprint("services", __name__)
db = get_db()
services = db["services"]

@service_bp.route("/", methods=["POST"])
def book_service():
    data = request.json
    result = services.insert_one(data)
    return jsonify({"id": str(result.inserted_id)}), 201

@service_bp.route("/", methods=["GET"])
def get_services():
    all_services = list(services.find())
    for service in all_services:
        service["_id"] = str(service["_id"])
    return jsonify(all_services)