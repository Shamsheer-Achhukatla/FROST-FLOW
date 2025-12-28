from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Blueprints
from auth import auth
from service import service
from products import product
from database import orders, bookings

load_dotenv()

app = Flask(__name__)

# SECRET KEY
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "fallbacksecret123")

# FULL CORS FOR FRONTEND
CORS(app, resources={r"/*": {"origins": ["https://frost-flow.vercel.app", "http://localhost:3000"]}},
     supports_credentials=True)

JWTManager(app)

# REGISTER ROUTES
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")

@app.route("/")
def home():
    return jsonify({"message": "Frost & Flow Backend Running"}), 200

# SAVE ORDER
@app.route("/save-order", methods=["POST"])
def save_order():
    from flask import request
    data = request.get_json()
    orders.insert_one(data)
    return jsonify({"message": "Order Saved"}), 200

# SAVE BOOKING
@app.route("/save-booking", methods=["POST"])
def save_booking():
    from flask import request
    data = request.get_json()
    bookings.insert_one(data)
    return jsonify({"message": "Booking Saved"}), 200

# GET ORDERS
@app.route("/get-orders/<email>")
def get_orders(email):
    user_orders = list(orders.find({"user": email}))
    for o in user_orders:
        o["_id"] = str(o["_id"])
    return jsonify(user_orders), 200

if __name__ == "__main__":
    app.run()
