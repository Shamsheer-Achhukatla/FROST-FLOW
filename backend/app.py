from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
from service import service
from products import product
from database import users, orders, bookings
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# CORS FIX 🔥
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app,
     origins=["https://frost-flow.vercel.app", "http://localhost:3000"],
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True)

JWTManager(app)

# ROUTES
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")

@app.route("/")
def home():
    return jsonify({"message": "Backend running ✔"}), 200


# ---------------- API ENDPOINTS ----------------

@app.route("/save-order", methods=["POST"])
def save_order():
    data = request.json
    orders.insert_one(data)
    return jsonify({"message": "Order saved"}), 200

@app.route("/save-booking", methods=["POST"])
def save_booking():
    data = request.json
    bookings.insert_one(data)
    return jsonify({"message": "Booking saved"}), 200

if __name__ == "__main__":
    app.run()
