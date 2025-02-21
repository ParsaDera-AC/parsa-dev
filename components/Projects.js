"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  // Snowy background particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const snowParticlesOptions = {
    background: {
      color: {
        value: "#000000",
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

  return (
    <section id="projects" className="relative min-h-screen py-16 bg-black text-white overflow-hidden">
      {/* Snow Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={snowParticlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="container mx-auto px-8 relative z-10">
        {/* Section Title */}
        <motion.h2
          className="text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Projects
        </motion.h2>

        {/* Project Card */}
        <motion.div
          className="group bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 hover:shadow-purple-500/50 transform transition-all duration-500 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Project Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src="/sqogroup.jpg" // Replace with an actual thumbnail of the website
              alt="SQO Group Project"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-lg font-bold text-white">Click to Explore</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">SQO Group Website</h3>
            <p className="text-gray-400">
            Designed and launched a professional website for a quantum physics research group using WordPress and the Elementor plugin. The website showcases the team’s research, publications, and collaborations. Leveraged responsive design principles and SEO best practices to ensure accessibility and visibility across devices and search engines.
            </p>
            <div className="flex items-center space-x-4">
              {/* GitHub Link */}
              <a
                href="#" // Replace with GitHub repo link if available
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>

              {/* Live Demo Link */}
              <a
                href="https://sqogroup.ca" // Replace with live website URL
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaExternalLinkAlt size={20} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
