import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import loginBg from "../assets/signup-bg.png"; // make sure this path & filename are correct
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const [remember, setRemember] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("success");
        // Redirect to login page after successful signup
        window.location.href = "/";
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      {/* Left side with image */}
      <div className="flex w-full h-screen overflow-hidden">
        <img
          src={loginBg}
          alt="Sign Up"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-12 py-12 border-gray-500 shadow-lg rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between">
              <div
                onClick={() => setRemember(!remember)}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div
                  className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                    remember ? "bg-green-500" : ""
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      remember ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">Remember me</span>
              </div>

              <a href="#" className="text-sm text-green-600 hover:underline hover:text-green-700">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
              Log In
            </a>
          </p>

          {/* OR Separator */}
          <div className="py-4 flex items-center gap-2 text-gray-400 text-sm">
            <div className="h-px flex-grow bg-gray-300" />
            <span>Or</span>
            <div className="h-px flex-grow bg-gray-300" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-transform hover:scale-105"
          >
            <FaGoogle className="text-lg" />
            <span>Sign in with Google</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
