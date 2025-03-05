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
import { useDocuments } from '@/context/DocumentContext';

const AboutMe = () => {
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();
  const { getSecureDocumentUrl } = useDocuments();

  const getTagStyles = (baseColor) => {
    if (isDarkMode) {
      return `bg-${baseColor}-500/10 text-${baseColor}-400 border-${baseColor}-500/30 
              hover:bg-${baseColor}-500/20 hover:border-${baseColor}-500/50`;
    }
    // Special handling for indigo and yellow in light mode
    if (baseColor === 'indigo') {
      return `bg-indigo-100 text-indigo-700 border-indigo-200
              hover:bg-indigo-200 hover:border-indigo-300`;
    }
    if (baseColor === 'yellow') {
      return `bg-yellow-100 text-yellow-800 border-yellow-200
              hover:bg-yellow-200 hover:border-yellow-300`;
    }
    if (baseColor === 'pink') {
      return `bg-pink-100 text-pink-700 border-pink-200
              hover:bg-pink-200 hover:border-pink-300`;
    }
    return `bg-${baseColor}-100 text-${baseColor}-600 border-${baseColor}-200
            hover:bg-${baseColor}-200 hover:border-${baseColor}-300`;
  };

  const cards = [
    {
      title: messages?.about?.cards?.education?.title || "Education",
      description: messages?.about?.cards?.education?.description || 
        "Advanced Diploma in Computer Engineering Technology from Algonquin College with Honours (2023).",
      icon: <FaGraduationCap size={40} className="text-pink-500" />,
      color: "pink",
      stats: messages?.about?.cards?.education?.stats || ["Honours Graduate", "3.7 GPA", "Dean's List"],
    },
    {
      title: messages?.about?.cards?.experience?.title || "Experience",
      description: messages?.about?.cards?.experience?.description ||
        "Full-Stack Programmer Analyst at the Canadian Coast Guard, specializing in critical applications.",
      icon: <FaBriefcase size={40} className="text-purple-500" />,
      color: "purple",
      stats: messages?.about?.cards?.experience?.stats || ["3+ Years", "Enterprise Apps", "Agile Teams"],
    },
    {
      title: messages?.about?.cards?.expertise?.title || "Technical Expertise",
      description: messages?.about?.cards?.expertise?.description ||
        "Proficient in modern full-stack development with expertise in cloud solutions and microservices architecture.",
      icon: <FaLaptopCode size={40} className="text-indigo-500" />,
      color: "indigo",
      stats: messages?.about?.cards?.expertise?.stats || ["Cloud Native", "CI/CD", "DevOps"],
    },
    {
      title: messages?.about?.cards?.achievements?.title || "Achievements",
      description: messages?.about?.cards?.achievements?.description ||
        "Consistently recognized for technical excellence and innovative problem-solving in enterprise environments.",
      icon: <FaMedal size={40} className="text-yellow-500" />,
      color: "yellow",
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

  const handleDownloadCV = () => {
    const cvUrl = getSecureDocumentUrl('cv', currentLanguage);
    window.open(cvUrl, '_blank');
  };

  return (
    <section id="about" className="relative py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`} />
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`
                  relative overflow-hidden rounded-xl backdrop-blur-md p-6
                  border-2 transition-all duration-300 h-full min-w-[300px]
                  before:absolute before:inset-0 before:bg-gradient-to-br 
                  before:from-${card.color}/5 before:to-transparent before:opacity-50
                  after:absolute after:inset-0 after:bg-gradient-to-tl 
                  after:from-${card.color}/5 after:to-transparent after:opacity-50
                  ${isDarkMode 
                    ? `bg-black/40 border-gray-800/50 hover:border-${card.color} hover:shadow-lg hover:shadow-${card.color}/20` 
                    : `bg-white/90 border-gray-200/50 hover:border-${card.color} hover:shadow-lg hover:shadow-${card.color}/20`
                  }
                `}>
                  <div className="flex flex-col items-start gap-4 h-full relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 w-full">
                      <div className={`
                        flex-shrink-0 p-3 rounded-xl
                        bg-gradient-to-br from-${card.color} to-${card.color}/50
                        shadow-lg shadow-${card.color}/20
                        transform group-hover:scale-110 transition-transform duration-300
                      `}>
                        {card.icon}
                      </div>
                      <h3 className={`text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      } group-hover:text-${card.color} transition-colors duration-300`}>
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`text-base leading-relaxed flex-grow ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {card.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-2">
                      {card.stats.map((stat, statIndex) => (
                        <span
                          key={statIndex}
                          className={`
                            text-center px-3 py-1.5 text-sm rounded-lg font-medium border
                            ${getTagStyles(card.color.split('-')[0])}
                            transform hover:scale-105 transition-all duration-200
                            whitespace-nowrap
                          `}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Hover Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-transparent 
                      via-${isDarkMode ? 'white/10' : card.color + '/5'} to-transparent 
                      transform -skew-x-12 translate-x-full 
                      group-hover:translate-x-[-200%] transition-transform duration-1500
                    `}></div>
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