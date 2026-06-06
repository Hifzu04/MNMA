import React from "react";

export default function Profile() {
  const user = {
     // this info will come from backend in real application, hardcoded for now
    name: "Faizur Rahman Khan",
    email: "faiz@example.com",
    phone: "+91 1234567890",
    address: "123, Main Street, City, Country",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-10 px-4">
      <div className="max-w-6xl mx-auto">
    

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Section */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500"
            />

            <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>

            <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full mt-1 border rounded-lg p-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full mt-1 border rounded-lg p-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <input
                    type="text"
                    value={user.phone}
                    readOnly
                    className="w-full mt-1 border rounded-lg p-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <input
                    type="text"
                    value={user.address}
                    readOnly
                    className="w-full mt-1 border rounded-lg p-2 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-600">12</h3>
                <p className="text-gray-600 mt-2">Orders</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-green-600">5</h3>
                <p className="text-gray-600 mt-2">Wishlist Items</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-purple-600">₹8,450</h3>
                <p className="text-gray-600 mt-2">Total Savings</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Recent Orders
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Order ID</th>
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Amount</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">#ORD1234</td>
                      <td>05 Jun 2026</td>
                      <td>₹1,999</td>
                      <td>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Delivered
                        </span>
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3">#ORD1235</td>
                      <td>28 May 2026</td>
                      <td>₹899</td>
                      <td>
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                          Processing
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3">#ORD1236</td>
                      <td>20 May 2026</td>
                      <td>₹2,499</td>
                      <td>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          Shipped
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Logout */}
            <div className="flex justify-end">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}