import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 px-6 lg:px-26 py-12  mt-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/assets/logo.png" alt="Groceyish" className="h-10 w-auto" />
            <h2 className="text-xl font-bold text-green-600">Groceyish</h2>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <MapPin size={16} /> 1762 School House Road
            </li>
            <li className="flex gap-2">
              <Phone size={16} /> 1233-777
            </li>
            <li className="flex gap-2">
              <Mail size={16} /> groceyish@contact.com
            </li>
            <li className="flex gap-2">
              <Clock size={16} /> 8:00 - 20:00, Sun - Thu
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Wishlist</li>
            <li>Cart</li>
            <li>Track Order</li>
            <li>Shipping Details</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About Us</li>
            <li>Contact</li>
            <li>Hot deals</li>
            <li>Promotions</li>
            <li>New products</li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h3 className="text-lg py-10 font-semibold mb-4">Help Center</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Payments</li>
            <li>Refund</li>
            <li>Checkout</li>
            <li>Shipping</li>
            <li>Q&A</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center mt-10 pt-6 border-t gap-4">
        <p className="text-sm text-gray-500">© 2022, All rights reserved</p>

        {/* Payment Icons */}
        <div className="flex items-center gap-4">
          <img src="/assets/visa.png" alt="Visa" className="h-6 w-auto" />
          <img src="/assets/mastercard.png" alt="Mastercard" className="h-6 w-auto" />
          <img src="/assets/amex.png" alt="Amex" className="h-6 w-auto" />
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#"><Facebook size={18} className="text-green-600" /></a>
          <a href="#"><Linkedin size={18} className="text-green-600" /></a>
          <a href="#"><Instagram size={18} className="text-green-600" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;