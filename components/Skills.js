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
  SiRstudioide,
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
import { DiVisualstudio, DiNetbeans } from "react-icons/di";
import { useState, useEffect, useMemo, memo } from "react";
import { useTheme } from "@/context/ThemeContext";

// Skills array with validated icons
const skills = [
  { category: "Frameworks", skill: "React.js", icon: <FaReact size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Node.js", icon: <FaNodeJs size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Vue.js", icon: <FaVuejs size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Nuxt.js", icon: <SiNuxtdotjs size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: ".NET", icon: <SiDotnet size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Blazor", icon: <SiDotnet size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Razor", icon: <SiDotnet size={24} color="#FFFFFF" /> },
  { category: "Frameworks", skill: "Bootstrap", icon: <SiBootstrap size={24} color="#FFFFFF" /> },
  
  { category: "Languages", skill: "C#", icon: <SiDotnet size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "JavaScript", icon: <FaJs size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Python", icon: <FaPython size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "R", icon: <SiRstudioide size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Java", icon: <FaJava size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "C/C++", icon: <FaCode size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "SQL", icon: <FaDatabase size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "PHP", icon: <FaPhp size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "CSS", icon: <FaCss3 size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "HTML", icon: <FaHtml5 size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "TypeScript", icon: <FaTerminal size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Bash", icon: <FaTerminal size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Unix Shell", icon: <FaTerminal size={24} color="#FFFFFF" /> },

  { category: "Technologies", skill: "Git", icon: <FaGitAlt size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "REST API", icon: <FaEnvelope size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "CQRS", icon: <FaCogs size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Pandas", icon: <SiPandas size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "NumPy", icon: <SiNumpy size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "ggplot2", icon: <SiRstudioide size={24} color="#FFFFFF" /> },

  { category: "Tools", skill: "Docker", icon: <FaDocker size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "MongoDB", icon: <FaDatabase size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "MySQL", icon: <SiMysql size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "PostgreSQL", icon: <FaDatabase size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Azure DevOps", icon: <VscAzureDevops size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Azure Cloud", icon: <FaCloud size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Visual Studio Code", icon: <DiVisualstudio size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Microsoft Visual Studio", icon: <DiVisualstudio size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Jupyter Notebook", icon: <SiJupyter size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "RStudio", icon: <SiRstudioide size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "GitBash", icon: <FaGitAlt size={24} color="#FFFFFF" /> },
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

// Memoized Skill Card Component
const SkillCard = memo(({ skill, onClick, categoryColor }) => (
  <div
    onClick={() => onClick(skill)}
    className={`group cursor-pointer rounded-xl ${categoryColor} shadow-lg hover:shadow-xl transition-transform duration-200 border border-white/20 hover:border-white/30 relative overflow-hidden h-[120px] hover:scale-105`}
  >
    <div className="flex flex-col h-full p-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20">
          {skill.icon}
        </div>
        <span className="text-base font-medium text-white/90 group-hover:text-white">
          {skill.skill}
        </span>
      </div>
    </div>
    
    <div 
      className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
      style={{ 
        width: `${65 + (skill.skill.charCodeAt(0) % 35)}%`,
        transition: 'width 0.5s ease-out'
      }} 
    />
  </div>
));

// Memoized Category Button
const CategoryButton = memo(({ category, isSelected, onClick, color }) => (
  <button
    onClick={() => onClick(category)}
    className={`px-6 py-2 rounded-full text-white transition-transform duration-200 ${
      isSelected ? color : 'bg-gray-700 hover:bg-gray-600'
    } hover:scale-105 active:scale-95`}
  >
    {category}
  </button>
));

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSkillDetailsOpen, setIsSkillDetailsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // Memoize grouped skills
  const skillsByCategory = useMemo(() => {
    return skills.reduce((acc, skill) => {
      acc[skill.category] = [...(acc[skill.category] || []), skill];
      return acc;
    }, {});
  }, []);

  // Memoize filtered skills
  const filteredSkills = useMemo(() => {
    return selectedCategory ? skillsByCategory[selectedCategory] : skills;
  }, [selectedCategory, skillsByCategory]);

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory === category ? null : category);
    }
    setSelectedSkill(null);
    setIsSkillDetailsOpen(false);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsSkillDetailsOpen(true);
  };

  const closeSkillDetails = () => {
    setIsSkillDetailsOpen(false);
    setSelectedSkill(null);
  };

  return (
    <section id="skills" className="relative min-h-screen py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Technical Skills
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <CategoryButton
            category="All"
            isSelected={selectedCategory === null}
            onClick={handleCategoryClick}
            color={categoryColors.All}
          />
          {Object.keys(skillsByCategory).map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={handleCategoryClick}
              color={categoryColors[category]}
            />
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.skill}
              skill={skill}
              onClick={handleSkillClick}
              categoryColor={categoryColors[skill.category]}
            />
          ))}
        </div>

        {/* Skill Details Modal */}
        {isSkillDetailsOpen && selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={closeSkillDetails}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl rounded-2xl p-8 ${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
              } shadow-2xl`}
            >
              {/* Close Button */}
              <button
                onClick={closeSkillDetails}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Skill Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedSkill.skill}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {selectedSkill.category}
                  </p>
                </div>
              </div>

              {/* Mastery Level */}
              <div className="mb-6">
                <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Mastery Level
                </h4>
                <div className="relative h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${65 + (selectedSkill.skill.charCodeAt(0) % 35)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
                <p className={`text-right mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {65 + (selectedSkill.skill.charCodeAt(0) % 35)}% Mastery
                </p>
              </div>

              {/* Rest of the modal content */}
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Experience
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedSkill.description || `I have extensive experience with ${selectedSkill.skill}, having used it in multiple professional projects and personal endeavors.`}
                  </p>
                </div>
                
                <div>
                  <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Related Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter(s => 
                        s.category === selectedSkill.category && 
                        s.skill !== selectedSkill.skill
                      )
                      .slice(0, 5)
                      .map(relatedSkill => (
                        <span 
                          key={relatedSkill.skill}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {relatedSkill.skill}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Skills);