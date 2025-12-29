# routes/service_routes.py
from flask import Blueprint, request, jsonify
from utils.db_connection import services_col
from utils.jwt_handler import verify_token

service = Blueprint("service", __name__)

@service.route("/service/book", methods=["POST"])
def book_service():
    user = verify_token()
    if not user: return jsonify({"msg": "Unauthorized"}), 401

    data = request.json
    data["user"] = user
    services_col.insert_one(data)
    return jsonify({"msg": "Service Booked"}), 200
