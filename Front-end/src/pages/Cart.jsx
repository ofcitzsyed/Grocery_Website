import { Minus, Plus } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;
        const userId = user?.id;

        if (!token || !userId) {
          console.error("Missing token or user ID");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/cart?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          console.log("CART ITEMS FROM BACKEND:", data);
          setCartItems(data);
        }


        if (Array.isArray(data)) {
          setCartItems(data);
        } else {
          console.error("Unexpected cart data:", data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === cartItemId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/delete/${cartItemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== cartItemId));
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const savings = (item) => (item.mrp - item.price) * item.quantity;

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  const totalSavings = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + savings(item), 0)
    : 0;

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <Header />
      <div className="p-6 max-w-[1200px] mx-auto text-gray-800">
        <h2 className="text-lg font-semibold mb-4">Your Basket</h2>

        <div className="bg-zinc-900 text-white rounded-xl flex justify-between items-center px-6 py-4 mb-6">
          <div>
            <p className="text-sm">
              Subtotal ({cartItems.length} items):{" "}
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </p>

          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-lg transition-transform hover:scale-105">
            Checkout
          </button>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="grid grid-cols-12 items-center py-4 border-b">
              <div className="col-span-6 flex items-center gap-4">
                {
                  <>
                    <img
                      src={item?.product?.image || "https://vallabhcomponent.com/assets/images/default.jpg"}
                      alt={item?.product?.name || "No name"}
                      onError={(e) => {
                        e.target.src = "https://vallabhcomponent.com/assets/images/default.jpg";
                      }}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item?.product?.name || "Unnamed Product"}</p>
                      <p className="text-sm text-gray-700">
                        ₹{item.price?.toFixed(2) || "0.00"}{" "}
                        <span className="line-through text-xs text-gray-400 ml-1">
                          ₹{item.mrp?.toFixed(2) || "0.00"}
                        </span>
                      </p>
                    </div>
                  </>
                }
              </div>
              <div className="col-span-3 text-center text-lg font-semibold">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="p-2 border rounded-full"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="p-2 border rounded-full"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="col-span-3 text-right font-semibold">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="col-span-12 text-right">
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
