from flask import Blueprint, request, jsonify
from database import services_col
from utils.jwt_handler import verify_token
from bson import ObjectId
from datetime import datetime

service = Blueprint("service", __name__)


# 🔹 helper response format
def response(success=True, msg="", data=None, code=200):
    return jsonify({
        "success": success,
        "message": msg,
        "data": data
    }), code


# 🔹 BOOK A SERVICE
@service.post("/service/book")
def book_service():
    try:
        user_id = verify_token()
        if not user_id:
            return response(False, "Unauthorized", code=401)

        data = request.get_json()

        # Validate required fields
        required_fields = ["service_name", "date", "address"]

        if not data or not all(field in data for field in required_fields):
            return response(False, "Missing required fields", code=400)

        booking = {
            "user": user_id,
            "service_name": data["service_name"],
            "date": data["date"],
            "address": data["address"],
            "notes": data.get("notes", ""),
            "status": "Booked",
            "created_at": datetime.utcnow()
        }

        result = services_col.insert_one(booking)
        booking["_id"] = str(result.inserted_id)

        return response(True, "Service booked successfully", booking, 201)

    except Exception as e:
        return response(False, "Booking failed", str(e), 500)


# 🔹 GET USER BOOKINGS
@service.get("/service/my-bookings")
def get_my_bookings():
    try:
        user_id = verify_token()
        if not user_id:
            return response(False, "Unauthorized", code=401)

        bookings = list(services_col.find({"user": user_id}))

        for b in bookings:
            b["_id"] = str(b["_id"])

        return response(True, "Bookings fetched", bookings)

    except Exception as e:
        return response(False, "Failed to fetch bookings", str(e), 500)