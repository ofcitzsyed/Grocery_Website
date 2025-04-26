from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

# Load environment variables
load_dotenv()

# MongoDB setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client["Grocery_Website"]  # or whatever your DB name is in MongoDB
users = db.users

# Create Blueprint
auth_routes = Blueprint('auth_routes', __name__)

# -------------------------------
# Signup Route
# -------------------------------
@auth_routes.route('/api/auth/signup', methods=['POST'])
@cross_origin()
def signup():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400

    existing_user = users.find_one({"email": email})

    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    hashed_password = generate_password_hash(password).decode('utf-8')

    new_user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }

    result = users.insert_one(new_user)

    access_token = create_access_token(identity=str(result.inserted_id))
    return jsonify({"access_token": access_token}), 201

# -------------------------------
# Login Route
# -------------------------------
@auth_routes.route('/api/auth/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = users.find_one({"email": email})

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user['password'], password):
        return jsonify({"error": "Incorrect password"}), 401

    access_token = create_access_token(identity=str(user['_id']))
    return jsonify({"access_token": access_token}), 200
