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

# ---------------- JWT Secret ----------------
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "default-secret-key")

# ---------------- FULL CORS FIX 🚀 ----------------
CORS(
    app,
    resources={r"/*": {"origins": ["https://frost-flow.vercel.app", "http://localhost:3000"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

JWTManager(app)

# ---------------- ROUTES ----------------
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service_routes, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")

@app.route("/")
def home():
    return jsonify({"message": "Backend Running Successfully ✔"}), 200


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
    app.run(host="0.0.0.0", port=10000)
