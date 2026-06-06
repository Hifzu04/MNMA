import React from "react";

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
    <div className="min-h-screen bg-[#f8f5f0] py-10 px-4">
      <div className="max-w-7xl mx-auto">
       

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Address
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                />

                <textarea
                  placeholder="Full Address"
                  rows="4"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                ></textarea>

                <input
                  type="text"
                  placeholder="City"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked />
                  Cash on Delivery (COD)
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" />
                  UPI Payment
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="payment" />
                  Credit / Debit Card
                </label>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
            <h2 className="text-xl font-semibold mb-5">
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
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}