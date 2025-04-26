import { Minus, Plus } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Cart = () => {
  const cartItem = {
    name: "Strawberry - Premium",
    price: 71.84,
    mrp: 94.52,
    quantity: 1,
    image: "/assets/products/straw1.jpg",
  };

  const similarProducts = [
    "/assets/products/similar1.jpg",
    "/assets/products/similar2.jpg",
    "/assets/products/similar3.jpg",
    "/assets/products/similar4.jpg",
  ];

  const savings = (cartItem.mrp - cartItem.price) * cartItem.quantity;

  return (
    <main>
        <Header />
            <div className="p-6 max-w-[1200px] mx-auto text-gray-800">
        {/* Basket Summary */}
        <h2 className="text-lg font-semibold mb-4">Your Basket</h2>
        <div className="bg-zinc-900 text-white rounded-xl flex justify-between items-center px-6 py-4 mb-6">
            <div>
            <p className="text-sm">
                Subtotal (1 item): <span className="font-semibold">₹ {cartItem.price.toFixed(2)}</span>
            </p>
            <p className="text-green-400 text-sm mt-1">Savings: ₹ {savings.toFixed(2)}</p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-lg transition-transform hover:scale-105">
            Checkout
            </button>
        </div>

        {/* Cart Item */}
        <div className="grid grid-cols-12 text-sm font-medium text-gray-400 mb-3">
            <div className="col-span-6">Items (1 item)</div>
            <div className="col-span-3">Quantity</div>
            <div className="col-span-3 text-right">Sub-total</div>
        </div>

        <div className="grid grid-cols-12 items-center py-4 border-b">
            <div className="col-span-6 flex items-center gap-4">
            <img src={cartItem.image} alt="Strawberry" className="w-20 h-20 object-cover rounded" />
            <div>
                <p className="font-medium">{cartItem.name}</p>
                <p className="text-sm text-gray-700">
                ₹{cartItem.price.toFixed(2)}{" "}
                <span className="line-through text-xs text-gray-400 ml-1">
                    ₹{cartItem.mrp.toFixed(2)}
                </span>
                </p>
            </div>
            </div>
            <div className="col-span-3 text-center text-lg font-semibold">{cartItem.quantity}</div>
            <div className="col-span-3 text-right font-semibold">
            ₹ {(cartItem.price * cartItem.quantity).toFixed(2)}
            </div>
        </div>

        {/* Similar Products */}
        <h3 className="mt-10 text-base font-semibold mb-4">Similar Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((imgSrc, idx) => (
            <div
                key={idx}
                className="border rounded-lg p-3 hover:shadow-md transition-transform hover:-translate-y-1"
            >
                <img
                src={imgSrc}
                alt="Similar product"
                className="w-full h-36 object-cover rounded hover:scale-105 transition-transform"
                />
                <div className="mt-3">
                <h4 className="text-sm font-medium">Strawberry - Ooty</h4>
                <p className="text-xs text-gray-500">200 Grams</p>
                <div className="flex gap-2 text-sm mt-1">
                    <p className="font-semibold">₹163.45</p>
                    <p className="line-through text-gray-400 text-xs">₹215.07</p>
                </div>
                <div className="mt-3 flex justify-between items-center border rounded-md px-2 py-1 text-green-600 text-sm hover:bg-green-50 cursor-pointer transition">
                    <Minus size={14} />
                    <span>Add</span>
                    <Plus size={14} />
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
        <Footer />
    </main>
    
  );
};

export default Cart;
