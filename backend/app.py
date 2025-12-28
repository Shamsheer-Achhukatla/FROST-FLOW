from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
from service import service as service_routes
from products import product   # import blueprint
from database import orders, bookings
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Secret Key
app.config['CORS_HEADERS'] = 'Content-Type'

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# FULL CORS FIX 🔥


CORS(app,
     resources={r"/*": {"origins": ["https://frost-flow.vercel.app", "http://localhost:3000"]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     expose_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

JWTManager(app)

# Routes
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service_routes, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")



@app.route("/")
def home():
    return jsonify({"message": "Frost & Flow Backend Running ✔"})

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

if __name__ == "__main__":
    app.run()
