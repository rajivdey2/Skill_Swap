import React, { useState } from "react";
import { allSwaps } from "../../Constants/allSwaps.js";

const Swaps = () => {
  const [swaps, setSwaps] = useState(allSwaps);

  const updateStatus = (id, newStatus) => {
    const updated = swaps.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    );
    setSwaps(updated);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Swap Request Logs
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="px-4 py-2">Skill</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {swaps.map((swap) => (
              <tr key={swap.id} className="border-t">
                <td className="px-4 py-2">{swap.skill}</td>
                <td className="px-4 py-2">{swap.from}</td>
                <td className="px-4 py-2">{swap.to}</td>
                <td className={`px-4 py-2 font-medium ${getStatusColor(swap.status)}`}>
                  {swap.status.toUpperCase()}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => updateStatus(swap.id, "accepted")}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(swap.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
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

export default Swaps;