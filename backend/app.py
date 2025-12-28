# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
import os

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

CORS(app, 
     origins=["https://frost-flow.vercel.app"], 
     supports_credentials=True)

JWTManager(app)
app.register_blueprint(auth, url_prefix="/auth")

@app.route("/")
def home():
    return jsonify({"status": "Backend Live"}), 200



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
