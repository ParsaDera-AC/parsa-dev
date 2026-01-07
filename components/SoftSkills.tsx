"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaComments, FaClock, FaChartLine, FaHandshake } from "react-icons/fa";
import { useTheme } from "@/context";

interface SoftSkill {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const SoftSkills: React.FC = () => {
  const { isDarkMode } = useTheme();

  const skills: SoftSkill[] = [
    {
      icon: <FaUsers size={22} />,
      title: "Team Collaboration",
      description: "Thriving in agile environments with cross-functional teams to deliver exceptional results.",
      highlight: "Agile Expert"
    },
    {
      icon: <FaLightbulb size={22} />,
      title: "Problem Solving",
      description: "Analytical mindset for breaking down complex challenges into actionable solutions.",
      highlight: "Strategic Thinker"
    },
    {
      icon: <FaComments size={22} />,
      title: "Communication",
      description: "Bridging the gap between technical complexity and stakeholder understanding.",
      highlight: "Clear & Concise"
    },
    {
      icon: <FaClock size={22} />,
      title: "Time Management",
      description: "Expert prioritization ensuring projects are delivered on time without compromising quality.",
      highlight: "Deadline Driven"
    },
    {
      icon: <FaChartLine size={22} />,
      title: "Adaptability",
      description: "Embracing new technologies and methodologies with enthusiasm and quick mastery.",
      highlight: "Quick Learner"
    },
    {
      icon: <FaHandshake size={22} />,
      title: "Leadership",
      description: "Mentoring team members and taking initiative on complex project challenges.",
      highlight: "Team Mentor"
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className={`absolute -top-24 right-[30%] w-56 h-56 rounded-full border ${
          isDarkMode ? 'border-pink-500/10' : 'border-pink-300/20'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute bottom-20 -left-16 w-48 h-48 rounded-full border-2 border-dashed ${
          isDarkMode ? 'border-purple-500/10' : 'border-purple-300/15'
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute top-[30%] right-[5%] w-4 h-4 rounded-full ${
          isDarkMode ? 'bg-pink-500/20' : 'bg-pink-400/30'
        }`}
        animate={{ y: [-12, 12, -12], x: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bottom-[40%] left-[10%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] ${
          isDarkMode ? 'border-b-purple-500/15' : 'border-b-purple-400/25'
        }`}
        animate={{ rotate: [-15, 15, -15], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`absolute top-[60%] right-[20%] w-2 h-2 rounded-full ${
          isDarkMode ? 'bg-indigo-500/25' : 'bg-indigo-400/35'
        }`}
        animate={{ scale: [1, 1.8, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase mb-4
            ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="w-8 h-px bg-current" />
            Beyond Code
            <span className="w-8 h-px bg-current" />
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Soft
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Skills</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The human skills that transform good developers into great collaborators.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group h-full p-6 rounded-2xl border transition-all
                  ${isDarkMode
                    ? 'bg-gray-900/30 border-gray-800 hover:border-indigo-500/30 hover:bg-gray-900/50'
                    : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-white'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl transition-colors
                    ${isDarkMode
                      ? 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20'
                      : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'}`}>
                    {skill.icon}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                    ${isDarkMode
                      ? 'bg-purple-500/10 text-purple-400'
                      : 'bg-purple-100 text-purple-600'}`}>
                    {skill.highlight}
                  </span>
                </div>

                <h3 className={`text-lg font-semibold mb-2 transition-colors
                  ${isDarkMode ? 'text-white group-hover:text-indigo-300' : 'text-gray-900 group-hover:text-indigo-600'}`}>
                  {skill.title}
                </h3>
                <p className={`text-sm leading-relaxed
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {skill.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(SoftSkills);
