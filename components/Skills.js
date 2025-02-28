"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  FaReact,
  FaPhp,
  FaJava,
} from "react-icons/fa";
import {
  SiNuxtdotjs,
  SiDotnet,
  SiPandas,
  SiNumpy,
  SiRstudioide ,
  SiJupyter,
  SiBootstrap,
  SiMysql,
  SiLinux,
  SiUbuntu,
  SiWireshark,
  SiVmware,
  SiCisco,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { DiVisualstudio } from "react-icons/di";
import { DiNetbeans } from "react-icons/di";
import { useState } from "react";

// Skills array with validated icons
const skills = [
  { category: "Frameworks", skill: "React.js", icon: <FaReact size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Node.js", icon: <FaNodeJs size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Vue.js", icon: <FaVuejs size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Nuxt.js", icon: <SiNuxtdotjs size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: ".NET", icon: <SiDotnet size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Blazor", icon: <SiDotnet size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Frameworks", skill: "Razor", icon: <SiDotnet size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Frameworks", skill: "Bootstrap", icon: <SiBootstrap size={24} color="#FFFFFF" /> },
  
  { category: "Languages", skill: "C#", icon: <SiDotnet size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "JavaScript", icon: <FaJs size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Python", icon: <FaPython size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "R", icon: <SiRstudioide size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Languages", skill: "Java", icon: <FaJava size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "C/C++", icon: <FaCode size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Languages", skill: "SQL", icon: <FaDatabase size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "PHP", icon: <FaPhp size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "CSS", icon: <FaCss3 size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "HTML", icon: <FaHtml5 size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "TypeScript", icon: <FaTerminal size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Bash", icon: <FaTerminal size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Unix Shell", icon: <FaTerminal size={24} color="#FFFFFF" /> },

  { category: "Technologies", skill: "Git", icon: <FaGitAlt size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "REST API", icon: <FaEnvelope size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "CQRS", icon: <FaCogs size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Technologies", skill: "Pandas", icon: <SiPandas size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "NumPy", icon: <SiNumpy size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "ggplot2", icon: <SiRstudioide size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Tools", skill: "Docker", icon: <FaDocker size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "MongoDB", icon: <FaDatabase size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "MySQL", icon: <SiMysql size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "PostgreSQL", icon: <FaDatabase size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Azure DevOps", icon: <VscAzureDevops size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Tools", skill: "Azure Cloud", icon: <FaCloud size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Visual Studio Code", icon: <DiVisualstudio  size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Microsoft Visual Studio", icon: <DiVisualstudio  size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Tools", skill: "Jupyter Notebook", icon: <SiJupyter size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "RStudio", icon: <SiRstudioide size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "GitBash", icon: <FaGitAlt size={24} color="#FFFFFF" /> }, // Proxy
  { category: "Tools", skill: "Cisco Packet Tracer", icon: <SiCisco size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Wireshark", icon: <SiWireshark size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "VMware", icon: <SiVmware size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Ubuntu", icon: <SiUbuntu size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Linux", icon: <SiLinux size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "NetBeans", icon: <DiNetbeans size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Postman", icon: <FaEnvelope size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Electron", icon: <FaTerminal size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Beaver", icon: <FaTerminal size={24} color="#FFFFFF" /> },
];

// Update category colors to use gradients matching the site theme
const categoryColors = {
  All: "bg-gradient-to-r from-gray-500 via-slate-500 to-zinc-500",
  Frameworks: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  Languages: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
  Technologies: "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500",
  Tools: "bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500",
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] || []), skill];
    return acc;
  }, {});

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory === category ? null : category);
    }
  };

  return (
    <section id="skills" className="relative min-h-screen py-16 text-white">
      <div className="container mx-auto px-8 relative z-20">
        <motion.div
          className="bg-black/60 backdrop-blur-md rounded-xl p-12 shadow-lg border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            A comprehensive showcase of my technical expertise across various domains. 
            Click on categories to explore my skills in detail.
          </motion.p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', ...Object.keys(categoryColors).filter(cat => cat !== 'All')].map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-300
                  ${categoryColors[category]} 
                  ${(category === 'All' && !selectedCategory) || selectedCategory === category 
                    ? 'scale-110 shadow-lg shadow-purple-500/50' 
                    : 'hover:scale-105'}
                  backdrop-blur-sm`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className={`${
            selectedCategory 
              ? 'flex flex-wrap gap-4 justify-center' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'
          }`}>
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                className={`${
                  !selectedCategory || selectedCategory === category 
                    ? selectedCategory 
                      ? 'w-full' 
                      : 'block' 
                    : 'hidden'
                }`}
                initial={false}
              >
                <motion.h3
                  className={`text-xl font-semibold mb-4 text-transparent bg-clip-text ${categoryColors[category]}`}
                >
                  {category}
                </motion.h3>
                <div className={`${
                  selectedCategory 
                    ? 'flex flex-wrap gap-3 justify-center' 
                    : 'grid grid-cols-1 gap-3'
                }`}>
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.skill}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: (!selectedCategory || selectedCategory === category) ? 1 : 0,
                        x: (!selectedCategory || selectedCategory === category) ? 0 : -20,
                      }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    >
                      <motion.div
                        className={`group cursor-pointer flex items-center justify-start px-4 py-2.5 rounded-full
                          ${categoryColors[category]}
                          shadow-lg hover:shadow-xl transition-all duration-300
                          backdrop-blur-sm border border-gray-700/30
                          w-[200px]`}
                        onMouseEnter={() => setHoveredSkill(skill.skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, -1, 1, 0],
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="flex-shrink-0">
                            {skill.icon || <FaCode size={20} color="#FFFFFF" />}
                          </span>
                          <span className="text-base font-medium truncate">
                            {skill.skill}
                          </span>
                        </div>
                      </motion.div>

                      {/* Skill Tooltip */}
                      <AnimatePresence>
                        {hoveredSkill === skill.skill && (
                          <motion.div
                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                              bg-black/90 text-white px-4 py-2 rounded-lg text-sm
                              border border-gray-700 shadow-lg z-50 whitespace-nowrap"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {skill.skill}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                              border-l-8 border-r-8 border-t-8 
                              border-l-transparent border-r-transparent border-t-black/90">
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;