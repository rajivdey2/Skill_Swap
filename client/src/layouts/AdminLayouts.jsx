import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const AdminLayout = () => {
  return (
    <div>
      <Navbar role="admin" />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;