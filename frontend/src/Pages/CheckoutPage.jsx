import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
    // hardcoded cart items for demo, in real application this will come from global state or backend.. d
  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2499,
      quantity: 1,
      image: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 3999,
      quantity: 1,
      image: "https://picsum.photos/200?random=3",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Shipping Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black sm:col-span-2"
                />

                <textarea
                  placeholder="Full Address"
                  rows="3"
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black sm:col-span-2"
                />

                <input
                  type="text"
                  placeholder="City"
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked />
                  Cash on Delivery (COD)
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" />
                  UPI Payment
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" />
                  Credit / Debit Card
                </label>
              </div>
            </div>
          </div>

          {/* Right Section — Order Summary */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow h-fit">
            <h2 className="text-lg sm:text-xl font-semibold mb-5">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm sm:text-base truncate">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold text-sm sm:text-base flex-shrink-0">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Link
              to="/order-confirmation"
              className="block w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold text-center hover:bg-gray-800 transition"
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}