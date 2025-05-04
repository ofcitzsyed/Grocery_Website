import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart, ShoppingCart, Search } from 'lucide-react';
import { FaFire, FaPhoneAlt, FaPercentage, FaPaperPlane, FaHome } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import profileImg from '../assets/profile.jpg'; // Default image
import logo from '../assets/logo.png';

const Header = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch user data and cart data from the backend
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Fetch user data
      fetch('/api/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            console.error('User not found');
            setUser(null); // Set user to null if not found
          }
        })
        .catch((err) => console.error('Error fetching user data:', err));

      // Fetch cart data
      fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.cart) {
            setCart(data.cart);
          } else {
            console.error('Cart not found');
            setCart(null); // Set cart to null if not found
          }
        })
        .catch((err) => console.error('Error fetching cart data:', err));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null); // Clear user state
    setCart(null); // Clear cart state
    // Redirect to login page (or home page)
    window.location.href = '/login'; 
  };

  return (
    <div className="w-full shadow-sm bg-white sticky top-0 z-50">
      {/* TopBar Section */}
      <div className="flex items-center justify-between px-12 py-2">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </div>

        {/* Middle: Search */}
        <div className="flex w-[450px] bg-gray-100 rounded overflow-hidden">
          <div className="px-3 flex items-center gap-1 text-sm font-medium text-gray-700 whitespace-nowrap border-r">
            All Categories
            <ChevronDown className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search for items..."
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
          />
          <button className="bg-green-500 text-white px-4 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 text-sm text-gray-800">
            <div className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1">4</span>
            </div>
            <span>Wishlist</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-800">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1">{cart ? cart.length : 0}</span>
            </div>
            <div>
              <p className='px-2'>My cart</p>
              <span className="text-green-600 text-xs px-2">${cart ? cart.total : 0}</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={user.profileImg || profileImg} // Use the user's profile image or default
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-orange-400"
                />
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg border w-48">
                  <ul className="py-2 text-sm text-gray-800">
                    <li className="px-4 py-2 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-800">Login</p>
          )}
        </div>
      </div>

      {/* MainNav Section */}
      <nav className="w-full flex items-center justify-between px-12 py-3 bg-white">
        {/* Left - Browse Categories Button */}
        <button className="bg-green-500 text-white font-medium px-5 py-2 rounded-md flex items-center gap-1 shadow-sm">
          Browse All Categories
          <MdArrowDropDown size={20} />
        </button>

        {/* Center Links */}
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li className="flex items-center gap-1 text-green-500">
            <FaHome size={14} />
            <span>Home</span>
          </li>
          <li className="flex items-center gap-1 text-gray-700 hover:text-green-500 transition">
            <FaFire size={14} />
            <span>Hot deals</span>
          </li>
          <li className="flex items-center gap-1 text-gray-700 hover:text-green-500 transition">
            <FaPercentage size={14} />
            <span>Promotions</span>
          </li>
          <li className="flex items-center gap-1 text-gray-700 hover:text-green-500 transition">
            <FaPaperPlane size={14} />
            <span>New products</span>
          </li>
        </ul>

        {/* Right - Phone Support */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaPhoneAlt className="text-green-500" size={14} />
          <span className="text-green-500 font-medium">83838382829</span>
          <span className="text-gray-500">24/7 support center</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
