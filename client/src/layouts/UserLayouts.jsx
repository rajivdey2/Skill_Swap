import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const UserLayout = () => {
  return (
    <div>
      <Navbar role="user" />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;