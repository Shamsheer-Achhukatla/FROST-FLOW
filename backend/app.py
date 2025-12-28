from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
from service import service as service_routes
from products import product
from database import orders, bookings
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# 🚀 FULL CORS FIX (FINAL)
CORS(app, origins="*", allow_headers=["Content-Type", "Authorization"], supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Access-Control-Allow-Headers'] = "Content-Type, Authorization"
    response.headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS"
    return response

JWTManager(app)


@app.route("/")
def home():
    return jsonify({"status": "Backend LIVE on Render! 🚀"}), 200

# Save Product Order
@app.route("/save-order", methods=["POST"])
def save_order():
    data = request.json
    orders.insert_one(data)
    return jsonify({"message": "Order saved successfully"}), 200

# Save Booking
@app.route("/save-booking", methods=["POST"])
def save_booking():
    data = request.json
    bookings.insert_one(data)
    return jsonify({"message": "Booking saved successfully"}), 200

# Get Orders (User-specific)
@app.route("/get-orders/<email>", methods=["GET"])
def get_orders(email):
    user_orders = list(orders.find({"user": email}))
    for item in user_orders:
        item["_id"] = str(item["_id"]) # convert for JSON
    return jsonify(user_orders), 200

@app.route("/healthz")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run()