# routes/product_routes.py

from flask import Blueprint, jsonify, current_app
from models.product_model import Product, Category

product_routes = Blueprint('product_routes', __name__)

# Get all products
@product_routes.route('/api/products', methods=['GET'])
def get_products():
    db = current_app.config['DB']
    products = Product.get_all_products(db)
    return jsonify(products), 200

# Get single product by ID
@product_routes.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    db = current_app.config['DB']
    product = Product.get_product_by_id(db, product_id)
    if product:
        return jsonify(product), 200
    return jsonify({"error": "Product not found"}), 404

# Get featured products
@product_routes.route('/api/featured_products', methods=['GET'])
def get_featured_products():
    db = current_app.config['DB']
    products = Product.get_featured_products(db)
    return jsonify(products), 200

# Get daily best sells
@product_routes.route('/api/daily_best_sells', methods=['GET'])
def get_daily_best_sells():
    db = current_app.config['DB']
    products = Product.get_daily_best_sells(db)
    return jsonify(products), 200

# Get categories
@product_routes.route('/api/categories', methods=['GET'])
def get_categories():
    db = current_app.config['DB']
    categories = Category.get_all_categories(db)
    return jsonify(categories), 200
