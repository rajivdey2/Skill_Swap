import React from "react";
import { adminStats } from "../../Constants/adminSates.js";

const StatCard = ({ label, value, color }) => (
  <div className={`bg-${color}-100 text-${color}-800 px-4 py-5 rounded shadow`}>
    <p className="text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold">{value}</h3>
  </div>
);

const AdminDashboard = () => {
  const { totalUsers, totalSwaps, activeUsers, rejectedSwaps } = adminStats;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Users" value={totalUsers} color="blue" />
        <StatCard label="Total Swaps" value={totalSwaps} color="green" />
        <StatCard label="Active Users" value={activeUsers} color="purple" />
        <StatCard label="Rejected Swaps" value={rejectedSwaps} color="red" />
      </div>
    </div>
  );
};

export default AdminDashboard;