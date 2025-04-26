# run.py

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from routes.auth_routes import auth_routes
from routes.product_routes import product_routes
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# JWT Setup
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# MongoDB Setup
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)

# ❗ Choose database manually
db = client["Grocery_Website"]  # Use your correct database name here

# Save db in app config
app.config['DB'] = db

# Register Blueprints
app.register_blueprint(auth_routes)
app.register_blueprint(product_routes)

if __name__ == "__main__":
    app.run(debug=True)
