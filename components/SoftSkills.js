"use client";

import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaComments, FaClock, FaChartBar, FaRocket } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const SoftSkills = () => {
  const { messages } = useLanguage();

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
        "Deadline Management"
      ]
    },
    {
      icon: <FaChartBar className="text-pink-400" size={24} />,
      title: messages?.softSkills?.dataAnalysis?.title || "Data Analysis",
      description: messages?.softSkills?.dataAnalysis?.description ||
        "Strong analytical skills in data visualization and statistical analysis",
      tags: messages?.softSkills?.dataAnalysis?.skills || [
        "Risk Analysis",
        "Data Visualization",
        "Statistical Modeling"
      ]
    },
    {
      icon: <FaRocket className="text-indigo-400" size={24} />,
      title: messages?.softSkills?.adaptability?.title || "Technical Adaptability",
      description: messages?.softSkills?.adaptability?.description ||
        "Proven ability to quickly master new technologies and frameworks",
      tags: messages?.softSkills?.adaptability?.skills || [
        "Multi-platform",
        "Quick Learning",
        "Technology Integration"
      ]
    }
  ];

  return (
    <section id="softskills" className="py-24 bg-black relative">
      {/* Section Title */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {messages?.softSkills?.title || "Soft Skills"}
        </motion.h2>
      </div>

      {/* Skills Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Skill Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-white/5">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {skill.title}
                </h3>
              </div>

              {/* Skill Description */}
              <p className="text-gray-400 text-sm mb-4">
                {skill.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills; 