import React from "react";

export default function AdminDashboard() {
  const orders = [
    {
      id: "67540ced3376121b361a0ed0",
      user: "Admin User",
      total: "$199.96",
      status: "Delivered",
    },
    {
      id: "67540d3ca67b4a70e434e092",
      user: "Admin User",
      total: "$40",
      status: "Processing",
    },
    {
      id: "675bf2c6ca77bd83eefd7a18",
      user: "Admin User",
      total: "$39.99",
      status: "Processing",
    },
    {
      id: "675c24b09b88827304bd5cc1",
      user: "Admin User",
      total: "$39.99",
      status: "Processing",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold mt-2">$319.94</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Orders
          </h3>
          <p className="text-3xl font-bold mt-2">4</p>
          <button className="text-blue-500 text-sm mt-2 hover:underline">
            Manage Orders
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Products
          </h3>
          <p className="text-3xl font-bold mt-2">40</p>
          <button className="text-blue-500 text-sm mt-2 hover:underline">
            Manage Products
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4 text-sm font-semibold">ORDER ID</th>
                <th className="p-4 text-sm font-semibold">USER</th>
                <th className="p-4 text-sm font-semibold">TOTAL PRICE</th>
                <th className="p-4 text-sm font-semibold">STATUS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-sm">{order.id}</td>
                  <td className="p-4 text-sm">{order.user}</td>
                  <td className="p-4 text-sm font-medium">
                    {order.total}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}