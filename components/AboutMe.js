"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  FaPeopleArrows,
  FaBrain,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaMedal,
} from "react-icons/fa";

const AboutMe = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const snowParticlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "bottom",
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    retina_detect: true,
  };

  const cards = [
    {
      title: "Education",
      description:
        "Advanced Diploma in Computer Engineering Technology from Algonquin College with Honours (2023).",
      icon: (
        <FaGraduationCap size={40} className="text-pink-500 mb-4 mx-auto" />
      ),
      tooltip: "GPA: 3.7/4.0",
      borderHoverColor: "hover:border-pink-500",
    },
    {
      title: "Experience",
      description:
        "Full-Stack Programmer Analyst at the Canadian Coast Guard, specializing in critical applications.",
      icon: <FaBriefcase size={40} className="text-purple-500 mb-4 mx-auto" />,
      tooltip: "3+ Years of Experience",
      borderHoverColor: "hover:border-purple-500",
    },
    {
      title: "Skills",
      description:
        "Proficient in C#, React, Python, SQL, and REST APIs, with expertise in full-stack development.",
      icon: <FaLaptopCode size={40} className="text-indigo-500 mb-4 mx-auto" />,
      tooltip: "10+ Technologies",
      borderHoverColor: "hover:border-indigo-500",
    },
    {
      title: "Achievements",
      description:
        "Dean’s Honour List for three consecutive years and numerous innovative projects.",
      icon: <FaMedal size={40} className="text-yellow-500 mb-4 mx-auto" />,
      tooltip: "Dean's Honour List",
      borderHoverColor: "hover:border-yellow-500",
    },
  ];

  const softSkills = [
    {
      icon: <FaPeopleArrows size={28} className="text-pink-500" />,
      label: "Effective Communication",
    },
    {
      icon: <FaBrain size={28} className="text-purple-500" />,
      label: "Critical Thinking",
    },
    {
      icon: <FaHandsHelping size={28} className="text-indigo-500" />,
      label: "Team Collaboration",
    },
    {
      icon: <FaChalkboardTeacher size={28} className="text-yellow-500" />,
      label: "Mentorship & Leadership",
    },
    {
      icon: <FaBrain size={28} className="text-green-500" />,
      label: "Adaptability",
    },
    {
      icon: <FaHandsHelping size={28} className="text-red-500" />,
      label: "Problem Solving",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-16 transparent text-white overflow-hidden"
    >
      {/* Snowy Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={snowParticlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.h2
          className="text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`group relative bg-zinc-800 border border-gray-600 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${card.borderHoverColor}`}
              whileHover={{ scale: 1.05 }}
            >
              {card.icon}
              <h3 className="text-xl font-bold text-center">{card.title}</h3>
              <p className="text-sm text-gray-400 mt-2 text-center">
                {card.description}
              </p>
              {/* Tooltip */}
              <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.tooltip}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills Section */}
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg mt-12">
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            Soft Skills
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <li key={index} className="flex items-center space-x-4">
                {skill.icon}
                <span className="text-gray-400">{skill.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
