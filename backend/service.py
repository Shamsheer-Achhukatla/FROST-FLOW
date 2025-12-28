from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import services
from datetime import datetime

service = Blueprint("service", __name__)

@service.route("/book", methods=["POST"])
@jwt_required()
def book_service():
    data = request.get_json()
    user_id = get_jwt_identity()

    booking = {
        "user_id": user_id,
        "name": data.get("name"),
        "address": data.get("address"),
        "date": data.get("date"),
        "problem": data.get("problem"),
        "created": datetime.now()
    }

    services.insert_one(booking)
    return jsonify({"message": "Service booked successfully!"}), 201
