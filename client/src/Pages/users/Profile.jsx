import React, { useState } from "react";

const Profile = () => {
  const [offered, setOffered] = useState(["ReactJS"]);
  const [wanted, setWanted] = useState(["UI/UX"]);
  const [availability, setAvailability] = useState("Evenings");
  const [newSkill, setNewSkill] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const handleAdd = (type) => {
    if (newSkill.trim() === "") return;

    if (type === "offered") {
      setOffered([...offered, newSkill]);
    } else {
      setWanted([...wanted, newSkill]);
    }
    setNewSkill("");
  };
  const handleSave = () => {
    // Combine data
    const profileData = {
      skillsOffered: offered,
      skillsWanted: wanted,
      availability,
      isPublic,
    };

    console.log("Updated Profile:", profileData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>

      <div className="mb-4">
        <label className="font-medium">Skills Offered</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {offered.map((skill, i) => (
            <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border px-3 py-1 rounded w-full"
            placeholder="Add a skill..."
          />
          <button
            onClick={() => handleAdd("offered")}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium">Skills Wanted</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {wanted.map((skill, i) => (
            <span key={i} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border px-3 py-1 rounded w-full"
            placeholder="Add a skill..."
          />
          <button
            onClick={() => handleAdd("wanted")}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="font-medium">Availability</label>
        <select
          className="w-full border rounded px-3 py-2 mt-1"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option>Weekends</option>
          <option>Evenings</option>
          <option>Anytime</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium text-gray-700">Profile Visibility:</label>
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-2 text-sm text-gray-600">Private</span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative">
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isPublic ? "translate-x-5" : ""
                }`}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-600">Public</span>
        </label>
      </div>
    </div>
  );
};

export default Profile;