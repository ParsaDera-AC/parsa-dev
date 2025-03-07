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
import { DiVisualstudio } from "react-icons/di";
import { DiNetbeans } from "react-icons/di";
import { useState, useEffect } from "react";
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

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isSkillDetailsOpen, setIsSkillDetailsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { isDarkMode } = useTheme();

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    setSelectedSkill(null);
    setIsSkillDetailsOpen(false);
  };

  // Handle skill selection
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsSkillDetailsOpen(true);
  };

  // Close skill details
  const closeSkillDetails = () => {
    setIsSkillDetailsOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  // Generate a deterministic proficiency level based on skill name
  const getSkillProficiency = (skill) => {
    // Use the first character of the skill name as a seed for consistency
    const seed = skill.skill.charCodeAt(0);
    return 65 + (seed % 35); // Between 65% and 100%
  };

  return (
    <section id="skills" className={`relative min-h-screen py-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Removed the background network effect with purple gradient */}

      <div className="container mx-auto px-4 sm:px-8 relative z-20">
        <motion.div
          className={`backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-xl border ${
            isDarkMode 
              ? 'bg-black/60 border-gray-800' 
              : 'bg-white/80 border-gray-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Creative Header with Interactive Elements */}
          <div className="relative mb-20">
            {/* Main Title with Animated Text */}
            <div className="text-center relative z-10">
              <motion.div
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.h2
                  className="text-5xl sm:text-6xl font-bold mb-6 relative inline-flex"
                >
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    Skills
                  </motion.span>
                  <motion.span 
                    className="mx-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    &
                  </motion.span>
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    Expertise
                  </motion.span>
                </motion.h2>
              </motion.div>
              
              {/* Animated Underline */}
              {isClient && (
                <motion.div 
                  className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 120, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                />
              )}
              
              {/* Description with Typing Effect */}
              <motion.div
                className="mt-6 max-w-2xl mx-auto relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
                  Explore my technical toolkit spanning various domains. 
                  Each skill represents hands-on experience in real-world projects.
                </p>
                
                {/* Animated Cursor */}
                {isClient && (
                  <motion.div
                    className={`absolute -right-4 bottom-0 w-2 h-5 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-600'}`}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>
            
            {/* Interactive 3D Category Navigation */}
            <div className="mt-12 perspective-1000">
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {['All', ...Object.keys(categoryColors).filter(cat => cat !== 'All')].map((category, index) => {
                  const isActive = (category === 'All' && !selectedCategory) || selectedCategory === category;
                  const isHovered = hoveredCategory === category;
                  
                  return (
                    <motion.button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      onMouseEnter={() => setHoveredCategory(category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-300
                        ${categoryColors[category]} 
                        ${isActive 
                          ? 'scale-110 shadow-lg shadow-purple-500/50 ring-2 ring-white/20' 
                          : 'hover:shadow-lg hover:shadow-purple-500/30'}
                        backdrop-blur-sm relative overflow-hidden group`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isActive ? 1.1 : 1,
                        rotateY: isHovered ? 10 : 0,
                        rotateX: isHovered ? -10 : 0,
                        z: isHovered ? 50 : 0
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.2 + index * 0.1,
                        type: 'spring',
                        stiffness: 300
                      }}
                      whileHover={{ 
                        scale: isActive ? 1.15 : 1.05,
                        boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">{category}</span>
                      
                      {/* Animated Background Gradient */}
                      {isClient && (
                        <motion.div
                          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                          initial={false}
                          animate={{ 
                            background: isHovered 
                              ? 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)' 
                              : 'none'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* Animated Particles on Hover */}
                      {isClient && isHovered && (
                        <motion.div className="absolute inset-0 overflow-hidden">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 rounded-full bg-white/40"
                              initial={{ 
                                x: '50%', 
                                y: '50%',
                                opacity: 0
                              }}
                              animate={{ 
                                x: `${Math.random() * 100}%`, 
                                y: `${Math.random() * 100}%`,
                                opacity: [0, 1, 0]
                              }}
                              transition={{ 
                                duration: 1 + Math.random(),
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatType: 'loop'
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Skills Grid with Masonry Layout */}
          <AnimatePresence>
            {!isSkillDetailsOpen && (
              <motion.div 
                className={`grid gap-6 ${
                  selectedCategory 
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {Object.entries(skillsByCategory)
                  .filter(([category]) => !selectedCategory || selectedCategory === category)
                  .map(([category, categorySkills]) => (
                    <motion.div
                      key={category}
                      className={`${!selectedCategory ? 'col-span-1' : 'col-span-full'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {!selectedCategory && (
                        <motion.h3
                          className={`text-xl font-semibold mb-4 text-transparent bg-clip-text ${categoryColors[category]}`}
                        >
                          {category}
                        </motion.h3>
                      )}
                      
                      <div className={`grid grid-cols-1 ${selectedCategory ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : ''} gap-4`}>
                        {categorySkills.map((skill, skillIndex) => {
                          const proficiency = getSkillProficiency(skill);
                          
                          return (
                            <motion.div
                              key={skill.skill}
                              className={`group cursor-pointer rounded-xl
                                ${categoryColors[category]}
                                shadow-lg hover:shadow-xl transition-all duration-300
                                backdrop-blur-sm border border-white/20 hover:border-white/30
                                relative overflow-hidden h-[120px]`}
                              onClick={() => handleSkillClick(skill)}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                              whileHover={{ 
                                scale: 1.05,
                                y: -5,
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Skill Content */}
                              <div className="flex flex-col h-full p-4 relative z-10">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                                    {skill.icon || <FaCode size={20} color="#FFFFFF" />}
                                  </div>
                                  <span className="text-base font-medium text-white/90 group-hover:text-white">
                                    {skill.skill}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Subtle Glow Effect at Bottom - No dots or stars */}
                              {isClient && (
                                <motion.div
                                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
                                  initial={{ scaleX: 0, originX: 0 }}
                                  animate={{ scaleX: proficiency / 100 }}
                                  transition={{ duration: 1, delay: 0.3 + skillIndex * 0.05 }}
                                />
                              )}
                              
                              {/* Animated Background - Only on client */}
                              {isClient && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                                  initial={{ x: '-100%', opacity: 0 }}
                                  whileHover={{ x: '100%', opacity: 1 }}
                                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                                />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skill Details Modal - Only render on client */}
          {isClient && (
            <AnimatePresence>
              {isSkillDetailsOpen && selectedSkill && (
                <motion.div
                  className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeSkillDetails}
                >
                  <motion.div 
                    className={`absolute inset-0 ${isDarkMode ? 'bg-black/70' : 'bg-white/70'} backdrop-blur-md`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  
                  <motion.div
                    className={`relative max-w-2xl w-full rounded-2xl shadow-2xl border overflow-hidden ${
                      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Enhanced Header with gradient background */}
                    <div className={`p-6 ${categoryColors[selectedSkill.category]} relative`}>
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                          {selectedSkill.icon || <FaCode size={32} color="#FFFFFF" />}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{selectedSkill.skill}</h3>
                          <p className="text-white/80">{selectedSkill.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-8">
                        <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Mastery Level
                        </h4>
                        
                        {/* Modern Skill Visualization */}
                        <div className="relative h-24 w-full bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-pink-900/10 rounded-xl overflow-hidden p-6">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-4 bg-gray-200/20 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${categoryColors[selectedSkill.category]}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${getSkillProficiency(selectedSkill)}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              >
                                <div className="w-full h-full relative">
                                  {/* Animated particles inside the progress bar */}
                                  {Array.from({ length: 10 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute top-0 bottom-0 w-1 bg-white/30 rounded-full"
                                      style={{ left: `${i * 10}%` }}
                                      animate={{
                                        opacity: [0.3, 0.8, 0.3],
                                        height: ['60%', '100%', '60%'],
                                        y: ['20%', '0%', '20%']
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                      }}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* Proficiency Text */}
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                              {getSkillProficiency(selectedSkill)}% Mastery
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Experience
                        </h4>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {selectedSkill.description || `I have extensive experience with ${selectedSkill.skill}, having used it in multiple professional projects and personal endeavors.`}
                        </p>
                      </div>
                      
                      <div className="mb-6">
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
                      
                      <div className="flex justify-end">
                        <motion.button
                          className={`px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={closeSkillDetails}
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;