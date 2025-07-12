import React from "react";

const SkillCard = ({ skill, onRequest }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
      <p className="text-sm text-gray-500">By: {skill.user}</p>
      <p className="text-sm text-gray-400 mb-3">
        Availability: {skill.availability}
      </p>
      <button
        onClick={() => onRequest(skill.id)}
        className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Request Swap
      </button>
    </div>
  );
};

export default SkillCard;