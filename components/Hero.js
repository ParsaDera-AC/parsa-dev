"use client";

import React from "react";
import { motion } from "framer-motion"; // For animations
import Particles from "react-tsparticles"; // For particles (snow effect)
import { loadFull } from "tsparticles";

const Hero = () => {
  const particlesInit = async (main) => {
    // Initialize tsparticles instance
    await loadFull(main);
  };

  const snowParticlesOptions = {
    background: {
      color: {
        value: "#000000", // Black background
      },
    },
    particles: {
      number: {
        value: 100, // Number of snow particles
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff", // White particles
      },
      shape: {
        type: "circle", // Snow particle shape
      },
      opacity: {
        value: 0.8, // Slight transparency for particles
        random: true,
      },
      size: {
        value: 3,
        random: true, // Random sizes for snowflakes
      },
      move: {
        enable: true,
        speed: 1, // Slow falling speed
        direction: "bottom", // Snow falls down
        out_mode: "out", // Disappear when out of bounds
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse", // Particles move away on hover
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
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Snow Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={snowParticlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 -mt-16">
        {/* Heading without Typing Animation */}
        <motion.h1
          className="text-6xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I'm [Your Name]
        </motion.h1>

        {/* Subheading with Fade Animation */}
        <motion.p
          className="text-xl text-gray-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A passionate Full-Stack Developer specializing in Vue.js, .NET, and React.
        </motion.p>

        {/* Button with Hover and Tap Effects */}
        <motion.a
          href="#projects"
          className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
