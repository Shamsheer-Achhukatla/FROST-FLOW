from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
from service import service_routes
from products import product
from database import orders, bookings
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# CORS FIX
CORS(app, origins=[
    "https://frost-flow.vercel.app",
    "http://localhost:3000"
], supports_credentials=True)

@app.after_request
def apply_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "https://frost-flow.vercel.app"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    return response

JWTManager(app)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service_routes, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")

@app.route("/")
def home():
    return jsonify({"message": "Backend live ✔"}), 200


# -------- SAVE ORDER --------
@app.route("/save-order", methods=["POST"])
def save_order():
    data = request.get_json()
    orders.insert_one(data)
    return jsonify({"message": "Order saved successfully"}), 200


# -------- SAVE BOOKING --------
@app.route("/save-booking", methods=["POST"])
def save_booking():
    data = request.get_json()
    bookings.insert_one(data)
    return jsonify({"message": "Booking saved successfully"}), 200


# -------- VIEW ORDERS --------
@app.route("/get-orders/<email>", methods=["GET"])
def get_orders(email):
    user_orders = list(orders.find({"user": email}))
    for item in user_orders:
        item["_id"] = str(item["_id"])
    return jsonify(user_orders), 200


# -------- SERVER START --------
if __name__ == "__main__":
    app.run()
