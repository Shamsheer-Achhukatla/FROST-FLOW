from flask import Blueprint, request, jsonify
from database import service_collection

service = Blueprint("service", __name__)

# BOOK SERVICE REQUEST
@service.post("/service/book")
def service_booking():
    data = request.json
    service_collection.insert_one(data)
    return jsonify({"message": "Service booked successfully"}), 201
