from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth
from service import service
from products import product
from database import users, orders, bookings
import os

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

CORS(app, supports_credentials=True,
     origins=["https://frost-flow.vercel.app", "http://localhost:3000"],
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

JWTManager(app)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(service, url_prefix="/service")
app.register_blueprint(product, url_prefix="/products")

@app.route("/")
def home():
    return jsonify({"message": "Backend running ✔"}), 200

if __name__ == "__main__":
    app.run()
