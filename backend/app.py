from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
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

# 🔐 SECRET KEY
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# 🌍 FRONTEND URL (from .env)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# 🌐 CORS (Frontend ↔ Backend connection)
CORS(
    app,
    resources={r"/*": {"origins": [FRONTEND_URL, "http://localhost:5173"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"]
)

# 🔒 FORCE HTTPS (for Render / production)
@app.before_request
def force_https():
    if request.headers.get("X-Forwarded-Proto") == "http":
        return redirect(request.url.replace("http://", "https://"))


# 🧩 ROUTES
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(product, url_prefix="/products")
app.register_blueprint(order, url_prefix="/orders")
app.register_blueprint(service, url_prefix="/service")


# 🏠 HEALTH CHECK
@app.get("/")
def home():
    return jsonify({
        "status": "ok",
        "message": "Frost & Flow Backend Running 🚀"
    }), 200


# 🚀 RUN SERVER
if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))