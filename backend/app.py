from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from database import db
import os

from routes.auth_routes import auth
from routes.product_routes import product
from routes.order_routes import order
from routes.service_routes import service


load_dotenv()

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

FRONTEND_URL = os.getenv("FRONTEND_URL")
CORS(app,
     resources={r"/*": {"origins": os.getenv("FRONTEND_URL")}},
     supports_credentials=True)

# Force HTTPS only on Render
@app.before_request
def before_request():
    if not request.is_secure and "render" in request.host:
        url = request.url.replace("http://", "https://", 1)
        return redirect(url, code=301)

JWTManager(app)

# REGISTER ROUTES
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(product, url_prefix="/products")
app.register_blueprint(order, url_prefix="/orders")
app.register_blueprint(service, url_prefix="/service")

# TEST ROUTE
@app.get("/")
def home():
    return jsonify({"message": "Frost & Flow Backend Running"}), 200

@app.route("/test-db")
def test_db():
    try:
        db.command("ping")
        return jsonify({"message": "MongoDB Atlas connected successfully!"})
    except:
        return jsonify({"error": "Connection Failed"}), 500


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=10000)