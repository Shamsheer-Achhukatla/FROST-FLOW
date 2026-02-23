from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.order_routes import order_bp
from routes.service_routes import service_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(product_bp, url_prefix="/api/products")
app.register_blueprint(order_bp, url_prefix="/api/orders")
app.register_blueprint(service_bp, url_prefix="/api/services")

@app.route("/")
def home():
    return {"message": "ICER Backend Running ❄️"}

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)