import React, { useState } from "react";
import { usersList } from "../../Constants/userList.js";

const Users = () => {
  const [users, setUsers] = useState(usersList);

  const handleBan = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status: "banned" } : u
    );
    setUsers(updated);
  };

  const handleUnban = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status: "active" } : u
    );
    setUsers(updated);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this user?");
    if (confirmed) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Skills</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2 text-sm">{u.email}</td>
                <td className="px-4 py-2 text-sm">
                  {u.skills.join(", ")}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    u.status === "banned"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {u.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {u.status === "active" ? (
                    <button
                      onClick={() => handleBan(u.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnban(u.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Unban
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;