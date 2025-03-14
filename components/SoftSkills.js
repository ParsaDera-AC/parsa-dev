"use client";

import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaComments, FaClock, FaChartBar, FaRocket } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const SoftSkills = () => {
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

  const skills = [
    {
      icon: <FaUsers className="text-purple-400" size={24} />,
      title: messages?.softSkills?.leadership?.title || "Leadership & Collaboration",
      description: messages?.softSkills?.leadership?.description || 
        "Proven track record of leading technical initiatives and collaborating across government agencies",
      tags: messages?.softSkills?.leadership?.skills || [
        "Technical Coaching",
        "Cross-Agency Collaboration",
        "Team Leadership"
      ]
    },
    {
      icon: <FaLightbulb className="text-yellow-400" size={24} />,
      title: messages?.softSkills?.problemSolving?.title || "Problem Solving",
      description: messages?.softSkills?.problemSolving?.description ||
        "Strong analytical mindset demonstrated through complex application development and automation",
      tags: messages?.softSkills?.problemSolving?.skills || [
        "Technical Analysis",
        "Process Automation",
        "Innovation"
      ]
    },
    {
      icon: <FaComments className="text-green-400" size={24} />,
      title: messages?.softSkills?.communication?.title || "Technical Communication",
      description: messages?.softSkills?.communication?.description ||
        "Expert at translating complex technical concepts and writing comprehensive documentation",
      tags: messages?.softSkills?.communication?.skills || [
        "Technical Documentation",
        "Client Relations",
        "Knowledge Transfer"
      ]
    },
    {
      icon: <FaClock className="text-blue-400" size={24} />,
      title: messages?.softSkills?.projectManagement?.title || "Project Management",
      description: messages?.softSkills?.projectManagement?.description ||
        "Experienced in Agile methodologies and managing multiple critical applications",
      tags: messages?.softSkills?.projectManagement?.skills || [
        "Agile/Scrum",
        "Resource Planning",
        "Risk Management"
      ]
    },
    {
      icon: <FaChartBar className="text-red-400" size={24} />,
      title: messages?.softSkills?.analytics?.title || "Data Analytics",
      description: messages?.softSkills?.analytics?.description ||
        "Skilled at extracting actionable insights from complex datasets to drive development decisions",
      tags: messages?.softSkills?.analytics?.skills || [
        "Statistical Analysis",
        "Data Visualization",
        "Insight Generation"
      ]
    },
    {
      icon: <FaRocket className="text-indigo-400" size={24} />,
      title: messages?.softSkills?.adaptability?.title || "Adaptability & Growth",
      description: messages?.softSkills?.adaptability?.description ||
        "Quick to learn new technologies and methodologies to meet changing project requirements",
      tags: messages?.softSkills?.adaptability?.skills || [
        "Rapid Learning",
        "Technology Adoption",
        "Continuous Improvement"
      ]
    }
  ];

  return (
    <section id="softskills" className="relative py-20 sm:py-24 ">
      {/* Decorative border effects */}
      
      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-4 mobile-text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
          >
            {messages?.softSkills?.title || "Professional Skills"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`max-w-2xl mx-auto text-base sm:text-lg mobile-text-base ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {messages?.softSkills?.subtitle || "Beyond technical expertise, my professional skills enable effective collaboration and project success."}
          </motion.p>
        </div>

        {/* Skills Grid - Responsive for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-6 sm:p-8 shadow-lg border transition-all duration-300 hover:shadow-xl mobile-touch-target ${
                isDarkMode 
                  ? 'bg-gray-800/70 border-gray-700/50 hover:border-purple-500/50' 
                  : 'bg-white border-gray-100 hover:border-purple-300'
              }`}
            >
              {/* Icon header with gradient background */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${
                  index % 3 === 0 ? 'from-purple-500/20 to-pink-500/20' :
                  index % 3 === 1 ? 'from-blue-500/20 to-indigo-500/20' :
                  'from-green-500/20 to-teal-500/20'
                }`}>
                  {skill.icon}
                </div>
                <h3 className={`text-xl font-semibold mobile-text-lg ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {skill.title}
                </h3>
              </div>
              
              <p className={`mb-5 text-base mobile-text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {skill.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`px-3 py-1 text-xs mobile-text-xs rounded-full border ${
                      isDarkMode 
                        ? 'border-gray-700 bg-gray-700/50 text-gray-300' 
                        : 'border-gray-200 bg-gray-50 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional highlight box - Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-12 sm:mt-16 p-6 sm:p-8 rounded-xl border max-w-3xl mx-auto text-center ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/30' 
              : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-4 mobile-text-lg ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {messages?.softSkills?.highlightTitle || "My Collaborative Approach"}
          </h3>
          <p className={`text-base mobile-text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {messages?.softSkills?.highlightDescription || 
              "I believe that the best software solutions emerge from combining technical excellence with effective communication and collaborative problem-solving. My approach emphasizes not just what we build, but how we work together to create value."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftSkills; 