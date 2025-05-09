from flask import Blueprint, request, jsonify
from models.cart_model import Cart
from flask_jwt_extended import jwt_required, get_jwt_identity

cart_routes = Blueprint('cart_routes', __name__)

@cart_routes.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    product = data.get("product")
    price = data.get("price", 0)
    mrp = data.get("mrp", 0)

    if not user_id or not product_id:
        return jsonify({"error": "User ID and Product ID are required"}), 400

    cart_item = Cart.add_to_cart(user_id, product_id, quantity, product, price, mrp)
    return jsonify({"message": "Item added to cart", "cart_item": cart_item}), 201

@cart_routes.route('/api/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    cart_items = Cart.get_cart(user_id)
    return jsonify(cart_items), 200

@cart_routes.route('/api/cart/update/<cart_item_id>', methods=['PUT'])
def update_cart_item(cart_item_id):
    data = request.get_json()
    quantity = data.get('quantity')

    if quantity is None:
        return jsonify({"error": "Quantity is required"}), 400

    success = Cart.update_quantity(cart_item_id, quantity)
    if success:
        return jsonify({"message": "Cart item updated successfully"}), 200
    return jsonify({"error": "Cart item not found"}), 404

@cart_routes.route('/api/cart/delete/<cart_item_id>', methods=['DELETE'])
def delete_cart_item(cart_item_id):
    success = Cart.delete_cart_item(cart_item_id)
    if success:
        return jsonify({"message": "Cart item deleted successfully"}), 200
    return jsonify({"error": "Cart item not found"}), 404


# In cart_routes.py or a similar file
# @cart_routes.route('/api/cart', methods=['GET'])
# @jwt_required()
# def get_cart():
#     user_id = get_jwt_identity()  # Get user ID from the token
#     cart = db.cart.find_one({"user_id": ObjectId(user_id)})
    
#     if cart:
#         return jsonify({
#             "cart": cart["items"],  # Example field "items" in the cart collection
#             "total": cart["total"]
#         })
#     else:
#         return jsonify({"error": "Cart not found"}), 404
