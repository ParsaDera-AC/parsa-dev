"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaJs, FaReact, FaNode, FaPython, FaHtml5, FaCss3, FaGit } from "react-icons/fa";

const skills = [
  { skill: "JavaScript", level: 90, icon: <FaJs size={28} color="#FFFFFF" /> },
  { skill: "React.js", level: 85, icon: <FaReact size={28} color="#FFFFFF" /> },
  { skill: "Node.js", level: 80, icon: <FaNode size={28} color="#FFFFFF" /> },
  { skill: "Python", level: 75, icon: <FaPython size={28} color="#FFFFFF" /> },
  { skill: "HTML5", level: 95, icon: <FaHtml5 size={28} color="#FFFFFF" /> },
  { skill: "CSS3", level: 90, icon: <FaCss3 size={28} color="#FFFFFF" /> },
  { skill: "Git", level: 85, icon: <FaGit size={28} color="#FFFFFF" /> },
];

const SkillsSection = () => {
  // Snowy background particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const snowParticlesOptions = {
    background: {
      color: {
        value: "#000000", // Background color
      },
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff", // Snow color
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

  return (
    <section id="skills" className="relative min-h-screen py-16 transparent text-white overflow-hidden">
      {/* Snow Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={snowParticlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="container mx-auto px-8 relative z-10">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Skills
        </motion.h2>
        <motion.p
          className="text-center text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A showcase of my technical expertise, spanning frontend, backend, and DevOps.
        </motion.p>

        {/* Skills List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {skills.map(({ skill, level, icon }) => (
            <motion.div
              key={skill}
              className="space-y-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Skill Name and Icon */}
              <div className="flex items-center space-x-3 text-lg font-bold">
                <span>{icon}</span>
                <span>{skill}</span>
              </div>

              {/* Progress Bar */}
              <div className="relative group">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-2 rounded-full"
                    style={{ width: `${level}%` }}
                    whileHover={{ scaleX: 1.05 }}
                  />
                </div>

                {/* Tooltip */}
                <span
                  className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm font-bold 
                             py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {level}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
