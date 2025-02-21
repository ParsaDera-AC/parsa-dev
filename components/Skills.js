"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaCode,
  FaDocker,
  FaDatabase,
  FaCloud,
  FaCogs,
  FaEnvelope,
  FaTerminal,
} from "react-icons/fa";

const skills = [
  // Frameworks
  { category: "Frameworks", skill: "React.js", icon: <FaVuejs size={60} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Node.js", icon: <FaNodeJs size={60} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Vue.js", icon: <FaVuejs size={60} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Nuxt.js", icon: <FaVuejs size={60} color="#FFFFFF" /> },
  // Languages
  { category: "Languages", skill: "JavaScript", icon: <FaJs size={60} color="#FFFFFF" /> },
  { category: "Languages", skill: "Python", icon: <FaPython size={60} color="#FFFFFF" /> },
  { category: "Languages", skill: "HTML5", icon: <FaHtml5 size={60} color="#FFFFFF" /> },
  { category: "Languages", skill: "CSS3", icon: <FaCss3 size={60} color="#FFFFFF" /> },
  { category: "Languages", skill: "TypeScript", icon: <FaTerminal size={60} color="#FFFFFF" /> },
  { category: "Languages", skill: "C#", icon: <FaTerminal size={60} color="#FFFFFF" /> },
  // Technologies
  { category: "Technologies", skill: "Git", icon: <FaGitAlt size={60} color="#FFFFFF" /> },
  // Tools
  { category: "Tools", skill: "Docker", icon: <FaDocker size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "MongoDB", icon: <FaDatabase size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "SQL", icon: <FaDatabase size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "RESTful API", icon: <FaEnvelope size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "Visual Studio Code", icon: <FaCode size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "Azure DevOps", icon: <FaCogs size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "Azure Cloud", icon: <FaCloud size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "PostgreSQL", icon: <FaDatabase size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "Postman", icon: <FaEnvelope size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "Electron", icon: <FaTerminal size={60} color="#FFFFFF" /> },
  { category: "Tools", skill: "Beaver", icon: <FaTerminal size={60} color="#FFFFFF" /> },
];

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-16 bg-transparent text-white overflow-hidden"
    >
      {/* Content */}
      <div className="container mx-auto px-8 relative z-10">
        {/* Title and Subheading (Outside Container) */}
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Skills
        </motion.h2>
        <motion.p
          className="text-center text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A showcase of my technical expertise, spanning frontend, backend, and DevOps.
        </motion.p>

        {/* Dark Grey Container for Table (Enhanced Vibrancy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto bg-gray-800 rounded-xl p-12 shadow-xl border border-gray-700"
        >
          {/* Enhanced Table with DaisyUI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-white"
          >
            <div className="overflow-x-hidden"> {/* Changed from overflow-x-auto to overflow-x-hidden */}
              <table className="table w-full">
                <thead>
                  <tr className="bg-gray-700 border-b border-white">
                    <th className="py-4 px-6 text-left text-2xl font-bold text-gray-200">Category</th>
                    <th className="py-4 px-6 text-left text-2xl font-bold text-gray-200">Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(
                    skills.reduce((acc, skill) => {
                      acc[skill.category] = [...(acc[skill.category] || []), skill];
                      return acc;
                    }, {})
                  ).map(([category, categorySkills], categoryIndex) => (
                    <motion.tr
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIndex * 0.2, duration: 0.5 }}
                      className="border-b border-gray-600 hover:bg-gray-750"
                    >
                      <td className="py-6 px-6 border-r border-gray-600 text-2xl font-bold text-gray-300">
                        {category}
                      </td>
                      <td className="py-6 px-6 flex flex-wrap gap-16">
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={skill.skill}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (categoryIndex * categorySkills.length + index) * 0.05, duration: 0.3 }}
                            className="group"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.7)" }}
                            onMouseEnter={() => setHoveredSkill(skill.skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex items-center space-x-6 transition-all duration-300">
                              {skill.icon}
                              <span className="text-xl font-medium text-white group-hover:text-pink-400">
                                {skill.skill}
                              </span>
                            </div>
                            <AnimatePresence>
                              {hoveredSkill === skill.skill && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-sm font-bold py-2 px-3 rounded-lg shadow-lg border border-pink-500"
                                >
                                  {skill.skill}
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-15 rounded-lg"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 0.15 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        ))}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;