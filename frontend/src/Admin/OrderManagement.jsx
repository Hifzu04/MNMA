import React, { useState } from "react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "#67540ced3376121b361a0ed0",
      customer: "Admin User",
      totalPrice: 199.96,
      status: "Processing",
    },
    {
      id: "#67540d3ca67b4a70e434e092",
      customer: "Ali Khan",
      totalPrice: 40,
      status: "Processing",
    },
    {
      id: "#675bf2c6ca77bd83eefd7a18",
      customer: "Sara Ahmed",
      totalPrice: 39.99,
      status: "Shipped",
    },
    {
      id: "#675c24b09b88827304bd5cc1",
      customer: "John Doe",
      totalPrice: 59.99,
      status: "Delivered",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const markAsDelivered = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: "Delivered" }
          : order
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">
            Order Management
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ORDER ID</th>
                <th className="text-left p-4">CUSTOMER</th>
                <th className="text-left p-4">TOTAL PRICE</th>
                <th className="text-left p-4">STATUS</th>
                <th className="text-center p-4">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {order.id}
                  </td>

                  <td className="p-4">
                    {order.customer}
                  </td>

                  <td className="p-4 font-semibold">
                    ${order.totalPrice}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className={`border rounded-lg px-3 py-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option value="Processing">
                        Processing
                      </option>
                      <option value="Shipped">
                        Shipped
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        markAsDelivered(order.id)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
                    >
                      Mark as Delivered
                    </button>
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