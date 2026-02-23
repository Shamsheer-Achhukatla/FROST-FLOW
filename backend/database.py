"""
MongoDB Connection Module
-------------------------
Handles secure connection to MongoDB Atlas
and provides access to collections.
"""

from pymongo import MongoClient
from dotenv import load_dotenv
import os
import sys

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("❌ ERROR: MONGO_URI not found in .env file")
    sys.exit(1)

try:
    # Create MongoDB client
    client = MongoClient(
        MONGO_URI,
        tls=True,
        tlsAllowInvalidCertificates=False,  # safer
        serverSelectionTimeoutMS=5000  # fail fast if cannot connect
    )

    # Test connection
    client.server_info()
    print("✅ MongoDB connected successfully")

except Exception as e:
    print("❌ Database connection failed:")
    print(e)
    sys.exit(1)

# Select Database
db = client["frostflow"]

# Collections
users_col = db["users"]
products_col = db["products"]
orders_col = db["orders"]
bookings_col = db["bookings"]
services_col = db["services"]