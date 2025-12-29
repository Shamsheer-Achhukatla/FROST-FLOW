from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

from auth import auth
from products import products
from orders import orders
from service import service

load_dotenv()

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

FRONTEND_URL = os.getenv("FRONTEND_URL")
CORS(app, resources={r"*": {"origins": FRONTEND_URL}}, supports_credentials=True)

JWTManager(app)

# REGISTER ROUTES
app.register_blueprint(auth)
app.register_blueprint(products)
app.register_blueprint(orders)
app.register_blueprint(service)

# TEST ROUTE
@app.get("/")
def home():
    return jsonify({"message": "Frost & Flow Backend Running"}), 200


if __name__ == "__main__":
    app.run(port=5000)
