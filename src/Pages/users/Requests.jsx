import React, { useState } from "react";
import { swapRequests as initialSwapRequests } from "../../Constants/request.js";

const Requests = () => {
  const [tab, setTab] = useState("sent");
  const [requests, setRequests] = useState(initialSwapRequests);

  const filtered = requests.filter((req) => req.type === tab);
  const handleStatusUpdate = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    alert(`Swap ${newStatus}`);
  };
  const handleDeleteRequest = (id) => {
    const confirmDelete = window.confirm("Cancel this swap request?");
    if (!confirmDelete) return;

    const updated = requests.filter((req) => req.id !== id);
    setRequests(updated);
    alert("Swap request cancelled!");
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "accepted":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Swap Requests</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setTab("sent")}
          className={`px-4 py-1 rounded ${tab === "sent"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Sent
        </button>
        <button
          onClick={() => setTab("received")}
          className={`px-4 py-1 rounded ${tab === "received"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Received
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No {tab} requests found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((req) => (
            <li
              key={req.id}
              className="bg-white p-4 rounded border shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-md font-medium text-gray-800">
                  Skill: {req.skill}
                </h3>
                <p className="text-sm text-gray-500">
                  {tab === "sent"
                    ? `To: ${req.toUser}`
                    : `From: ${req.fromUser}`}
                </p>
              </div>
              <p className={`text-sm font-medium ${getStatusColor(req.status)}`}>
                {req.status.toUpperCase()}
              </p>
              {tab === "received" && req.status === "pending" && (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(req.id, "accepted")}
                    className="text-sm px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(req.id, "rejected")}
                    className="text-sm px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            {tab === "sent" && req.status === "pending" && (
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-500">
                  To: {req.toUser}
                </p>
                <button
                  onClick={() => handleDeleteRequest(req.id)}
                  className="text-sm px-3 py-1 mt-2 bg-yellow-600 text-white rounded"
                >
                  Cancel Request
                </button>
              </div>
            )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;