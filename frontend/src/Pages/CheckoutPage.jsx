import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart } from "../redux/slices/cartslice";
import { createcheckout } from "../redux/slices/checkoutslice";
import PayPalButton from "../Components/Cart/PayPalButton";
import axios from "axios";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pulling state from slices
  const { cart, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { checkout, loading: checkoutLoading } = useSelector((state) => state.checkout);

  const user = JSON.parse(localStorage.getItem("user"));
  const guestId = localStorage.getItem("guestId");

  // Safely extract checkoutId if checkout object exists from successful thunk response
  const checkoutId = checkout?._id || null;

  useEffect(() => {
    dispatch(
      fetchcart({
        userId: user?._id || null,
        guestId: user ? null : guestId,
      })
    );
  }, [dispatch]);

  const cartItems = cart?.products || [];
  const subtotal = cart?.totalprice || 0;
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();


    if (!formData.email || !formData.firstName || !formData.address || !formData.city) {
      alert("Please fill in all required delivery information fields.");
      return;
    }

    const checkoutData = {
      checkoutItems: cartItems,
      shippingAddress: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
      paymentMode: "PayPal", // Set to PayPal since workflow redirects to PayPal next
      totalPrice: total,
    };

    try {
      await dispatch(
        createcheckout({
          checkoutdata: checkoutData,
        })
      ).unwrap();

      alert("Checkout saved successfully! Proceed to payment.");
    } catch (error) {
      console.error(error);
      alert("Failed to save checkout setup.");
    }
  };

  // Handles logic after PayPal payment completes successfully
  const handlePaymentSuccess = async (paymentDetails) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Extracted real raw string token
        },
      };

      // 1. Update checkout record to paid status
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: paymentDetails,
        },
        config
      );

      // 2. Finalise checkout to generate system Order and flush cart
      const finaliseRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalise`,
        {},
        config
      );

      alert("Order successfully placed!");
      console.log("Order Data:", finaliseRes.data);

      // Redirect your customer to an order confirmation screen
      navigate("/OrderConfirmation", { state: { order: finaliseRes.data.order } });
    } catch (err) {
      console.error("Error finalizing checkout transaction:", err);
      alert("Payment processed, but order saving failed. Please reach out to customer care support.");
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading Checkout Summary...
      </div>
    );
  }

  if (cartError && !cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        {cartError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Delivery & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  disabled={!!checkoutId}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    disabled={!!checkoutId}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    disabled={!!checkoutId}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  disabled={!!checkoutId}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    disabled={!!checkoutId}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    disabled={!!checkoutId}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                </div>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  disabled={!!checkoutId}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  disabled={!!checkoutId}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                />

                <div className="pt-4">
                  {!checkoutId ? (
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition disabled:bg-gray-600"
                    >
                      {checkoutLoading ? "Processing..." : "Continue to Payment"}
                    </button>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg mb-4 font-medium text-gray-800">
                        Pay with PayPal
                      </h3>
                      <PayPalButton
                        amount={total}
                        onSuccess={handlePaymentSuccess}
                        onError={() => alert("Payment failed. Try again.")}
                      />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Cart is empty</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-400">Color: {item.color}</p>}
                    </div>

                    <span className="font-semibold text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3 text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}