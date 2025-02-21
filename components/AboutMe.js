"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For dynamic animations
import {
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaMedal,
} from "react-icons/fa";

const AboutMe = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      title: "Education",
      description:
        "Advanced Diploma in Computer Engineering Technology from Algonquin College with Honours (2023).",
      icon: <FaGraduationCap size={40} className="text-pink-500" />,
      tooltip: "GPA: 3.7/4.0",
      color: "pink-500",
    },
    {
      title: "Experience",
      description:
        "Full-Stack Programmer Analyst at the Canadian Coast Guard, specializing in critical applications.",
      icon: <FaBriefcase size={40} className="text-purple-500" />,
      tooltip: "3+ Years of Experience",
      color: "purple-500",
    },
    {
      title: "Skills",
      description:
        "Proficient in C#, React, Python, SQL, and REST APIs, with expertise in full-stack development.",
      icon: <FaLaptopCode size={40} className="text-indigo-500" />,
      tooltip: "10+ Technologies",
      color: "indigo-500",
    },
    {
      title: "Achievements",
      description:
        "Dean’s Honour List for three consecutive years and numerous innovative projects.",
      icon: <FaMedal size={40} className="text-yellow-500" />,
      tooltip: "Dean's Honour List",
      color: "yellow-500",
    },
  ];

  // Function to generate quantum variants with index
  const getQuantumVariants = (index, color) => ({
    initial: { opacity: 0, x: -50, scale: 0.8 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        delay: index * 0.2,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: `0 0 20px #${color === "pink-500" ? "ec4899" : color === "purple-500" ? "8b5cf6" : color === "indigo-500" ? "4f46e5" : color === "yellow-500" ? "e6db74" : color === "green-500" ? "22c55e" : "ef4444"}`,
      transition: { duration: 0.3 },
    },
    glitch: {
      x: [index * 2, -(index * 2), 0],
      color: [
        `#${color === "pink-500" ? "ec4899" : color === "purple-500" ? "8b5cf6" : color === "indigo-500" ? "4f46e5" : color === "yellow-500" ? "e6db74" : color === "green-500" ? "22c55e" : "ef4444"}`,
        "#ffffff",
        `#${color === "pink-500" ? "ec4899" : color === "purple-500" ? "8b5cf6" : color === "indigo-500" ? "4f46e5" : color === "yellow-500" ? "e6db74" : color === "green-500" ? "22c55e" : "ef4444"}`,
      ],
      transition: { duration: 0.1, repeat: 2, repeatType: "mirror" },
    },
  });

  // Pulsing title with digital noise
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-16 bg-transparent overflow-hidden"
    >

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Pulsating Title with Digital Noise */}
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          About Me
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.1, 0],
              transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            <span className="text-green-400 text-xs font-mono absolute -top-4 left-1/2 -translate-x-1/2 animate-matrix">
              01010101...
            </span>
          </motion.div>
        </motion.h2>

        {/* Quantum-Tunneling Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`relative bg-black/80 border-2 border-${card.color} rounded-lg p-6 shadow-lg`}
              custom={index}
              variants={getQuantumVariants(index, card.color)}
              initial="initial"
              animate={["animate", "glitch"]}
              whileHover="hover"
              onMouseEnter={() => {
                setHoveredCard(index);
                // Trigger glitch on hover
                document.getElementById(`card-${index}`).classList.add("glitch");
                setTimeout(() => document.getElementById(`card-${index}`).classList.remove("glitch"), 300);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              id={`card-${index}`}
            >
              <div className="flex flex-col items-center">
                {card.icon}
                <h3 className="text-xl font-bold text-white mt-2">{card.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{card.description}</p>
              </div>
              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 rounded-lg p-2 text-white text-sm shadow-lg"
                  >
                    {card.tooltip}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.05, 0],
                  transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
                }}
              >
                <span className="text-green-400 text-xs font-mono absolute animate-matrix">
                  01010101...
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CSS for matrix and glitch animations
const styles = `
  @keyframes matrix {
    0% { opacity: 0; transform: translateY(100%); }
    20% { opacity: 0.5; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-100%); }
  }

  @keyframes glitch {
    0% { transform: translate(0, 0) scale(1); color: inherit; }
    50% { transform: translate(2px, -2px) scale(1.02); color: #ffffff; }
    100% { transform: translate(0, 0) scale(1); color: inherit; }
  }

  .animate-matrix {
    animation: matrix 3s infinite;
    position: absolute;
    white-space: nowrap;
  }

  .glitch {
    animation: glitch 0.3s ease-in-out;
  }
`;

export default AboutMe;