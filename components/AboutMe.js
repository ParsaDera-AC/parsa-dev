"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import AmbientBackground from "./SnowBackground";

const AboutMe = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const introTexts = [
    "Transforming ideas into elegant solutions",
    "Building the future, one line at a time",
    "Crafting digital experiences that matter"
  ];

  useEffect(() => {
    const text = introTexts[currentTextIndex];
    let currentIndex = 0;
    let interval;

    const typeText = () => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % introTexts.length);
        }, 2000);
      }
    };

    interval = setInterval(typeText, 50);
    return () => clearInterval(interval);
  }, [currentTextIndex]);

  const cards = [
    {
      title: "Education",
      description:
        "Advanced Diploma in Computer Engineering Technology from Algonquin College with Honours (2023).",
      icon: <FaGraduationCap size={40} className="text-pink-500" />,
      tooltip: "GPA: 3.7/4.0",
      color: "pink-500",
      stats: ["Honours Graduate", "3.7 GPA", "Dean's List"],
    },
    {
      title: "Experience",
      description:
        "Full-Stack Programmer Analyst at the Canadian Coast Guard, specializing in critical applications.",
      icon: <FaBriefcase size={40} className="text-purple-500" />,
      tooltip: "3+ Years of Experience",
      color: "purple-500",
      stats: ["3+ Years", "Enterprise Apps", "Agile Teams"],
    },
    {
      title: "Technical Expertise",
      description:
        "Proficient in modern full-stack development with expertise in cloud solutions and microservices architecture.",
      icon: <FaLaptopCode size={40} className="text-indigo-500" />,
      tooltip: "Full-Stack Development",
      color: "indigo-500",
      stats: ["Cloud Native", "CI/CD", "DevOps"],
    },
    {
      title: "Achievements",
      description:
        "Consistently recognized for technical excellence and innovative problem-solving in enterprise environments.",
      icon: <FaMedal size={40} className="text-yellow-500" />,
      tooltip: "Technical Excellence",
      color: "yellow-500",
      stats: ["Dean's List", "Innovation", "Leadership"],
    },
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
      <AmbientBackground />
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_50%,rgba(168,85,247,0.1),transparent)]" />
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
              About Me
            </motion.h2>

            <motion.div
              className="max-w-3xl mx-auto text-gray-300 leading-relaxed space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg">
                As a seasoned Full-Stack Developer, I blend technical expertise with creative problem-solving 
                to build robust, scalable applications. My journey in software development is driven by a 
                passion for creating elegant solutions that make a real impact.
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
            {[
              { icon: <FaCode size={24} />, label: "Frontend" },
              { icon: <FaServer size={24} />, label: "Backend" },
              { icon: <FaDatabase size={24} />, label: "Database" },
              { icon: <FaCloud size={24} />, label: "Cloud" },
            ].map((item, index) => (
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
                <span className="text-gray-400 text-sm">{item.label}</span>
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
                  relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm
                  border border-gray-800 p-6 hover:border-${card.color}
                  transition-all duration-300 hover:shadow-lg hover:shadow-${card.color}/20
                `}>
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-${card.color} to-${card.color}/50`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>

                  {/* Card Content */}
                  <p className="text-gray-400 text-sm mb-4">{card.description}</p>

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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
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