from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# DB + ROUTES
from database import db
from routes.auth_routes import auth
from routes.product_routes import product
from routes.order_routes import order
from routes.service_routes import service

load_dotenv()
app = Flask(__name__)

# CONFIG
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
JWTManager(app)

# CORS / FRONTEND CONNECTION
CORS(app,
 resources={r"/*": {"origins": os.getenv("FRONTEND_URL")}},
 supports_credentials=True,
 allow_headers=["Content-Type", "Authorization"]
)

# HTTPS REDIRECT FOR RENDER
@app.before_request
def before_request():
    if not request.is_secure and "render" in request.host:
        return redirect(request.url.replace("http://", "https://", 1), 301)

# ROUTES
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(product, url_prefix="/products")
app.register_blueprint(order, url_prefix="/orders")
app.register_blueprint(service, url_prefix="/service")

@app.get("/")
def home():
    return jsonify({"message": "Frost & Flow Backend Running"}), 200

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=10000)
