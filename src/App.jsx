import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Dashboard from "./Pages/users/Dashbord.jsx";
import Browse from "./Pages/users/Browser.jsx";
import Profile from "./Pages/users/Profile.jsx";
import Requests from "./Pages/users/Requests.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import Users from "./Pages/admin/Users.jsx";
import Swaps from "./Pages/admin/Swaps.jsx";
import UserLayout from "./layouts/UserLayouts.jsx";
import AdminLayout from "./layouts/AdminLayouts.jsx";
const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

     
      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="browse" element={<Browse />} />
        <Route path="profile" element={<Profile />} />
        <Route path="requests" element={<Requests />} />
      </Route>

      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="swaps" element={<Swaps />} />
      </Route>
    </Routes>
  );
};

export default App;