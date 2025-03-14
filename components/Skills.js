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
  { category: "Frameworks", skill: "Bootstrap", icon: <SiBootstrap size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "JavaScript", icon: <FaJs size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "HTML/CSS", icon: <FaHtml5 size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Python", icon: <FaPython size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "Java", icon: <FaJava size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "PHP", icon: <FaPhp size={24} color="#FFFFFF" /> },
  { category: "Languages", skill: "SQL", icon: <SiMysql size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Git/GitHub", icon: <FaGitAlt size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Linux", icon: <SiLinux size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Ubuntu", icon: <SiUbuntu size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "DevOps", icon: <VscAzureDevops size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Docker", icon: <FaDocker size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Wireshark", icon: <SiWireshark size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "VMware", icon: <SiVmware size={24} color="#FFFFFF" /> },
  { category: "Technologies", skill: "Cisco Technologies", icon: <SiCisco size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Visual Studio", icon: <DiVisualstudio size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "VS Code", icon: <FaCode size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "NetBeans", icon: <DiNetbeans size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Terminal", icon: <FaTerminal size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "Jupyter", icon: <SiJupyter size={24} color="#FFFFFF" /> },
  { category: "Tools", skill: "RStudio", icon: <SiRstudioide size={24} color="#FFFFFF" /> },
  { category: "Libraries", skill: "Pandas", icon: <SiPandas size={24} color="#FFFFFF" /> },
  { category: "Libraries", skill: "NumPy", icon: <SiNumpy size={24} color="#FFFFFF" /> },
];

// Lookup object for skill details
const skillDetails = {
  "React.js": {
    description: "I use React.js for building interactive user interfaces with a component-based architecture. Experienced with hooks, context API, and state management libraries.",
    experience: 90,
    projects: ["Enterprise dashboards", "E-commerce sites", "Portfolio websites"],
    related: ["JavaScript", "Redux", "Next.js"],
  },
  "Vue.js": {
    description: "Vue.js is my go-to framework for rapid development of reactive web interfaces. Proficient with Vue CLI, Vuex state management, and building single-page applications.",
    experience: 80,
    projects: ["Admin dashboards", "Interactive websites", "Progressive Web Apps"],
    related: ["JavaScript", "Nuxt.js", "Vuex"],
  },
  "Node.js": {
    description: "I'm experienced with server-side JavaScript using Node.js, including building REST APIs, microservices, and real-time applications with WebSockets.",
    experience: 85,
    projects: ["API servers", "Microservices", "Real-time chat applications"],
    related: ["Express.js", "MongoDB", "WebSockets"],
  },
  "Nuxt.js": {
    description: "I leverage Nuxt.js for creating Vue.js applications with server-side rendering, automatic routing, and enhanced SEO capabilities.",
    experience: 75,
    projects: ["E-commerce platforms", "Company websites", "Content-driven sites"],
    related: ["Vue.js", "JavaScript", "Vuex"],
  },
  ".NET": {
    description: "I develop robust, scalable applications using .NET Core and the .NET Framework, with a focus on microservices architecture and clean code practices.",
    experience: 80,
    projects: ["Enterprise applications", "Web APIs", "Government systems"],
    related: ["C#", "SQL Server", "Entity Framework"],
  },
  "Python": {
    description: "Python is my language of choice for data analysis, scripting, and backend development. I'm proficient with various frameworks and libraries including Django, Flask, and data science toolkits.",
    experience: 85,
    projects: ["Data processing pipelines", "Automation scripts", "Web scrapers"],
    related: ["Django", "Flask", "Pandas", "NumPy"],
  },
};

// Mapping skills to categories
const getUniqueCategoriesFromSkills = () => {
  return [...new Set(skills.map(skill => skill.category))];
};

// Colors for skill categories
const categoryColors = {
  Frameworks: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  Languages: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
  Technologies: "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500",
  Tools: "bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500",
  Libraries: "bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500",
};

// Memoized Skill Card Component
const SkillCard = memo(({ skill, onClick, categoryColor }) => (
  <div
    onClick={() => onClick(skill)}
    className={`group cursor-pointer rounded-xl ${categoryColor} shadow-lg hover:shadow-xl transition-transform duration-200 border border-white/20 hover:border-white/30 relative overflow-hidden h-[120px] hover:scale-105 mobile-touch-target`}
  >
    <div className="flex flex-col h-full p-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20">
          {skill.icon}
        </div>
        <span className="text-base font-medium text-white/90 group-hover:text-white mobile-text-base">
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
    className={`px-4 sm:px-6 py-2 rounded-full text-white transition-transform duration-200 mobile-touch-target
      ${isSelected ? color : 'bg-gray-700 hover:bg-gray-600'}
      text-sm sm:text-base mobile-text-sm hover:scale-105 active:scale-95`}
  >
    {category}
  </button>
));

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSkillDetailsOpen, setIsSkillDetailsOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const uniqueCategories = useMemo(() => getUniqueCategoriesFromSkills(), []);

  useEffect(() => {
    if (uniqueCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [uniqueCategories, selectedCategory]);

  const filteredSkills = useMemo(() => {
    return selectedCategory
      ? skills.filter(skill => skill.category === selectedCategory)
      : skills;
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsSkillDetailsOpen(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeSkillDetails = () => {
    setIsSkillDetailsOpen(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="skills" className="relative min-h-screen py-20 sm:py-24 overflow-hidden">
      
      
     
      
      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-4 mobile-text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`max-w-3xl mx-auto text-base sm:text-lg mobile-text-base ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            A comprehensive overview of my technical skillset across various domains.
            Click on any skill to see more details about my experience with it.
          </motion.p>
        </div>

        {/* Category Filter - Scrollable on mobile */}
        <div className="mb-8 overflow-x-auto pb-4 -mx-6 px-6 flex flex-nowrap sm:flex-wrap sm:justify-center gap-3 mobile-smooth-scroll">
          <CategoryButton
            key="all"
            category="All Skills"
            isSelected={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
            color="bg-gradient-to-r from-purple-600 to-indigo-600"
          />
          {uniqueCategories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={handleCategoryClick}
              color={categoryColors[category]}
            />
          ))}
        </div>

        {/* Skills Grid - Responsive for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.skill}
              skill={skill}
              onClick={handleSkillClick}
              categoryColor={categoryColors[skill.category]}
            />
          ))}
        </div>

        {/* Skill Detail Modal - Optimized for mobile */}
        <AnimatePresence>
          {isSkillDetailsOpen && selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
              onClick={closeSkillDetails}
            >
              {/* Backdrop with blur effect */}
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Content */}
              <motion.div
                className={`relative max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden p-0 m-4 z-10 
                  ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with skill name and icon */}
                <div className={`${categoryColors[selectedSkill.category]} p-6 flex items-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  
                  <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm relative z-10">
                    {selectedSkill.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mobile-text-2xl">
                      {selectedSkill.skill}
                    </h3>
                    <div className="text-sm text-white/70 mobile-text-sm">
                      {selectedSkill.category}
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={closeSkillDetails}
                    className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition-colors duration-200 z-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Skill details content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto mobile-smooth-scroll">
                  {skillDetails[selectedSkill.skill] ? (
                    <>
                      <div className="mb-6">
                        <h4 className={`text-lg font-semibold mb-2 mobile-text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          About
                        </h4>
                        <p className={`mobile-text-base ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skillDetails[selectedSkill.skill].description}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className={`text-lg font-semibold mb-2 mobile-text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Proficiency Level
                        </h4>
                        <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${skillDetails[selectedSkill.skill].experience}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${categoryColors[selectedSkill.category]}`}
                          />
                        </div>
                        <div className="text-right text-sm mt-1 mobile-text-sm text-gray-500 dark:text-gray-400">
                          {skillDetails[selectedSkill.skill].experience}% proficiency
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className={`text-lg font-semibold mb-2 mobile-text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Projects Using This Skill
                        </h4>
                        <ul className={`list-disc pl-5 space-y-1 mobile-text-base ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skillDetails[selectedSkill.skill].projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 mobile-text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Related Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skillDetails[selectedSkill.skill].related.map((relatedSkill, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1.5 text-sm rounded-lg mobile-text-sm mobile-touch-target ${
                                isDarkMode
                                  ? 'bg-gray-800 text-gray-300 border border-gray-700'
                                  : 'bg-gray-100 text-gray-800 border border-gray-200'
                              }`}
                            >
                              {relatedSkill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={`text-center py-12 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <p>Detailed information for {selectedSkill.skill} will be coming soon.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default memo(Skills);