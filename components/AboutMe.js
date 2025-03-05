"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaMedal,
  FaCode,
  FaServer,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const AboutMe = () => {
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

  const cards = [
    {
      title: messages?.about?.cards?.education?.title || "Education",
      description: messages?.about?.cards?.education?.description || 
        "Advanced Diploma in Computer Engineering Technology from Algonquin College with Honours (2023).",
      icon: <FaGraduationCap size={40} className="text-pink-500" />,
      color: "pink-500",
      stats: messages?.about?.cards?.education?.stats || ["Honours Graduate", "3.7 GPA", "Dean's List"],
    },
    {
      title: messages?.about?.cards?.experience?.title || "Experience",
      description: messages?.about?.cards?.experience?.description ||
        "Full-Stack Programmer Analyst at the Canadian Coast Guard, specializing in critical applications.",
      icon: <FaBriefcase size={40} className="text-purple-500" />,
      color: "purple-500",
      stats: messages?.about?.cards?.experience?.stats || ["3+ Years", "Enterprise Apps", "Agile Teams"],
    },
    {
      title: messages?.about?.cards?.expertise?.title || "Technical Expertise",
      description: messages?.about?.cards?.expertise?.description ||
        "Proficient in modern full-stack development with expertise in cloud solutions and microservices architecture.",
      icon: <FaLaptopCode size={40} className="text-indigo-500" />,
      color: "indigo-500",
      stats: messages?.about?.cards?.expertise?.stats || ["Cloud Native", "CI/CD", "DevOps"],
    },
    {
      title: messages?.about?.cards?.achievements?.title || "Achievements",
      description: messages?.about?.cards?.achievements?.description ||
        "Consistently recognized for technical excellence and innovative problem-solving in enterprise environments.",
      icon: <FaMedal size={40} className="text-yellow-500" />,
      color: "yellow-500",
      stats: messages?.about?.cards?.achievements?.stats || ["Dean's List", "Innovation", "Leadership"],
    },
  ];

  const skills = [
    { icon: <FaCode size={24} />, label: messages?.about?.skills?.frontend || "Frontend" },
    { icon: <FaServer size={24} />, label: messages?.about?.skills?.backend || "Backend" },
    { icon: <FaDatabase size={24} />, label: messages?.about?.skills?.database || "Database" },
    { icon: <FaCloud size={24} />, label: messages?.about?.skills?.cloud || "Cloud" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="about" className="relative py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`} />
      </div>

      {/* Subtle top border/divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-6 relative z-10">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: { duration: 3, repeat: Infinity, repeatType: "reverse" },
              }}
            >
              {messages?.about?.title || "About Me"}
            </motion.h2>

            <motion.div
              className={`max-w-3xl mx-auto leading-relaxed space-y-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg">
                {messages?.about?.description || 
                  "As a seasoned Full-Stack Developer, I blend technical expertise with creative problem-solving to build robust, scalable applications. My journey in software development is driven by a passion for creating elegant solutions that make a real impact."}
              </p>
            </motion.div>
          </motion.div>

          {/* Tech Stack Indicators */}
          <motion.div
            className="flex justify-center gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skills.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`
                  relative overflow-hidden rounded-xl backdrop-blur-sm
                  border transition-all duration-300 hover:shadow-lg
                  ${isDarkMode 
                    ? `bg-black/40 border-gray-800 hover:border-${card.color} hover:shadow-${card.color}/20` 
                    : `bg-white/80 border-gray-200 hover:border-${card.color} hover:shadow-${card.color}/20`
                  }
                `}>
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-${card.color} to-${card.color}/50`}>
                      {card.icon}
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {card.title}
                    </h3>
                  </div>

                  {/* Card Content */}
                  <p className={`text-sm mb-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {card.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2">
                    {card.stats.map((stat, statIndex) => (
                      <span
                        key={statIndex}
                        className={`
                          px-3 py-1 text-xs rounded-full
                          bg-${card.color}/10 text-${card.color}
                          border border-${card.color}/20
                        `}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${
                      isDarkMode ? 'white/5' : 'black/5'
                    } to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000`}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;