// Pages/SigninPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/login.webp"; // Ensure you have a relevant image in your assets folder
 import MNMALOGO from "../assets/mnma_logo.png"; // Ensure you have a relevant image in your assets folder
export default function SigninPage() {
  const [formData, setFormData] = useState({
    name: "" , 
    
    email: "",
    password: "",
    confirmPassword: "" ,
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = "backend URL here";

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/SigninPage");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE SECTION */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-gray-900 items-center justify-center">
  <img
    src={logoImg}
    alt="MNMA signin"
    className="w-full h-full object-cover"
  />
</div>
{/* RIGHT SECTION */}
<div className="w-full lg:w-1/2 flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-8 bg-[#f8f5f0]">
      <img src={MNMALOGO} alt="MNMA Logo" className="h-12 w-12 rounded-full object-cover mb-6 mx-auto" />
  <h1 className="text-3xl md:text-4xl font-bold text-gray-900  text-center mb-2">
    Create Your Account
  </h1>

  <p className="text-gray-600 text-center mb-8">
    Sign up to continue
  </p>

  {error && (
    <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-6 text-center">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-4">

    {/* Name */}
    <input
      type="text"
      name="name"
      placeholder="Full Name"
      value={formData.name}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      required
    />

    {/* Email */}
    <input
      type="email"
      name="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={handleChange}
       className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      required
    />

    {/* Mobile */}
    <input
      type="tel"
      name="phone"
      placeholder="Mobile Number"
      value={formData.phone}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      required
    />

    {/* Password */}
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      required
    />

    {/* Confirm Password */}
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      required
    />

    {/* Address */}
    <textarea
      name="address"
      rows="3"
      placeholder="Full Address"
      value={formData.address}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
      required
    />

    {/* City & Pincode */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        required
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        required
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
    >
      {loading ? "Registering..." : "Register"}
    </button>

  </form>

  <p className="text-gray-400 text-center mt-6 text-sm">
    Already have an account?{" "}
    <span
      onClick={() => navigate("/SigninPage")}
      className="text-blue-400 hover:underline cursor-pointer"
    >
      Login here
    </span>
  </p>

</div>

    </div>
  );
}