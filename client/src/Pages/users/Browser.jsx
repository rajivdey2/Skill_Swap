import React from "react";
import { sampleSkills } from "../../Constants/Skills.js";
import SkillCard from "../../components/SkillCard.jsx";

const Browse = () => {
  const handleRequest = (id) => {
    alert(`Swap requested for skill ID: ${id}`);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSkills = sampleSkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Skills</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-full"
          placeholder="Search skills..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onRequest={() => handleRequest(skill.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;