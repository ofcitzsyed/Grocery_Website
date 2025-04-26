import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import logo from "../assets/logo.png";
import loginBg from "../assets/login-bg.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        alert("Login successful!");
        console.log("Received token:", data.access_token);
  
        // Save token
        localStorage.setItem("token", data.access_token);
  
        // Save user info
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Redirect to homepage/dashboard
        navigate("/home");
        
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };
  

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="flex w-full h-screen overflow-hidden">
        <img
          src={loginBg}
          alt="Login background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-1">
            <img src={logo} alt="Groceyish Logo" className="h-12" />
          </div>

          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Nice to see you again
          </h2>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">Login</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    remember ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      remember ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></div>
                </div>
                <span className="text-gray-600 text-sm">Remember me</span>
              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-transform hover:scale-105"
            >
              Sign in
            </button>

            {/* OR Separator */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
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

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
