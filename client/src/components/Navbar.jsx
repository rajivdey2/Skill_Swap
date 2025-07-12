
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SkillSwap</h1>

      <div className="flex gap-4 items-center text-sm text-gray-700">
        {role === "user" && (
          <>
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/user/browse">Browse</Link>
            <Link to="/user/requests">Requests</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin/dashboard">Admin</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/swaps">Swaps</Link>
          </>
        )}

        <Link
          to="/"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;