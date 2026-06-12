import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
//  this concept is similiar to to- do list...
// Tempory i am taking dummy data... 
 
export default function UserManagement() {
  const [users] = useState([
    {
      id: 1,
      name: "Faiz Khan",
      email: "faiz@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Ali Ahmed",
      email: "ali@gmail.com",
      role: "Customer",
      status: "Active",
    },
    {
      id: 3,
      name: "xyz...",
      email: "xyz@gmail.com",
      role: "Manager",
      status: "Inactive",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Add User Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          <h2 className="text-xl font-semibold mb-4">
            Add New User
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
            />

            <select className="w-full border p-3 rounded-lg">
              <option>Customer</option>
              <option>Admin</option>
              <option>Manager</option>
            </select>

            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
              Add User
            </button>
          </form>
        </div>

        {/* User List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">
              User List
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.role}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                        <Edit size={18} />
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
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