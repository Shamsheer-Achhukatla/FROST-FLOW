# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
from service import service      # FIXED IMPORT
from products import product     # FIXED IMPORT
from database import orders, bookings
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

# JWT Key
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# CORS FIX 🔥
CORS(app,
     resources={r"/*": {"origins": [
         "https://frost-flow.vercel.app",
         "http://localhost:3000"
     ]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"]
)

JWTManager(app)

# ROUTES
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")


@app.route("/")
def home():
    return jsonify({"message": "Backend live and ready ✔"}), 200


# Orders
@app.route("/save-order", methods=["POST"])
def save_order():
    data = request.json
    orders.insert_one(data)
    return jsonify({"message": "Order saved"}), 200

# Bookings
@app.route("/save-booking", methods=["POST"])
def save_booking():
    data = request.json
    bookings.insert_one(data)
    return jsonify({"message": "Booking saved"}), 200


if __name__ == "__main__":
    app.run(debug=False)
