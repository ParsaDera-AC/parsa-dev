"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock, FaArrowRight } from "react-icons/fa";
import { useTheme } from "@/context";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  type: string;
  color: string;
  links: { github: string | null; demo: string | null };
}

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ParsaDera-AC';

const Projects: React.FC = () => {
  const { isDarkMode } = useTheme();

  const projects: Project[] = [
    {
      title: "Enterprise Resource Management",
      description: "Comprehensive web application for managing organizational resources and workflows. Built with CQRS pattern and event sourcing for scalability.",
      image: "/enterprise.jpg",
      techStack: [".NET/C#", "Vue.js", "SQL Server", "Azure"],
      type: "Enterprise",
      color: "from-blue-500 to-cyan-500",
      links: { github: null, demo: null }
    },
    {
      title: "Canadian Ski Patrol Template",
      description: "Modern CRUD web application template with TypeScript and material design principles.",
      image: "/skiPatrol.jpg",
      techStack: ["TypeScript", "Node.js", "LitElements"],
      type: "Web App",
      color: "from-emerald-500 to-teal-500",
      links: { github: "https://github.com/ParsaDera-AC/Basic-Node.js-Project", demo: null }
    },
    {
      title: "Telegram Chat Analyzer",
      description: "Comprehensive chat analysis tool with data visualization and sentiment analysis.",
      image: "/telegram.jpg",
      techStack: ["Python", "pandas", "NumPy"],
      type: "Data Science",
      color: "from-violet-500 to-purple-500",
      links: { github: null, demo: null }
    },
    {
      title: "Interactive Picross Game",
      description: "Modern Picross puzzle game with multiplayer support and real-time collaboration.",
      image: "/piccross.jpg",
      techStack: ["React", "Node.js", "Socket.io"],
      type: "Game Dev",
      color: "from-pink-500 to-rose-500",
      links: { github: null, demo: null }
    },
    {
      title: "SQO Group Website",
      description: "Professional website for a quantum physics research group with publications showcase.",
      image: "/sqogroup.jpg",
      techStack: ["Next.js", "React", "Tailwind"],
      type: "Frontend",
      color: "from-amber-500 to-orange-500",
      links: { github: null, demo: "https://sqogroup.ca" }
    }
  ];

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large rotating ring */}
        <motion.div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full border-2 ${
            isDarkMode ? 'border-purple-500/10' : 'border-purple-300/20'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full border ${
            isDarkMode ? 'border-indigo-500/10' : 'border-indigo-300/15'
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Bottom left shapes */}
        <motion.div
          className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full ${
            isDarkMode ? 'bg-indigo-500/5' : 'bg-indigo-300/10'
          } blur-3xl`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Floating triangles */}
        <motion.div
          className={`absolute top-1/4 left-[10%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] ${
            isDarkMode ? 'border-b-purple-500/20' : 'border-b-purple-400/30'
          }`}
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className={`absolute top-2/3 right-[15%] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[26px] ${
            isDarkMode ? 'border-b-pink-500/20' : 'border-b-pink-400/30'
          }`}
          animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkMode ? 'bg-indigo-400/30' : 'bg-indigo-500/40'
            }`}
            style={{
              top: `${20 + i * 12}%`,
              left: `${5 + i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase mb-4
            ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="w-8 h-px bg-current" />
            Portfolio
            <span className="w-8 h-px bg-current" />
          </span>

          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"> Projects</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A showcase of my work — from enterprise solutions to creative experiments.
            Each project represents a unique challenge conquered.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />

                <div className={`relative h-full rounded-3xl overflow-hidden border-2 transition-colors duration-300
                  ${isDarkMode
                    ? 'bg-gray-900/90 border-gray-800 group-hover:border-gray-700'
                    : 'bg-white/90 border-gray-200 group-hover:border-gray-300'}`}>

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDarkMode ? 'from-gray-900 via-gray-900/60' : 'from-white via-white/60'
                    } to-transparent`} />

                    {/* Colored accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`} />

                    {/* Type badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md
                        bg-gradient-to-r ${project.color} text-white shadow-lg`}>
                        {project.type}
                      </span>
                    </div>

                    {/* Links */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.links.github ? (
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="p-2.5 rounded-full bg-white/90 text-gray-900 shadow-lg hover:bg-white transition-colors"
                        >
                          <FaGithub size={16} />
                        </motion.a>
                      ) : (
                        <span className="p-2.5 rounded-full bg-gray-800/80 text-gray-500">
                          <FaLock size={14} />
                        </span>
                      )}
                      {project.links.demo && (
                        <motion.a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          className="p-2.5 rounded-full bg-white/90 text-gray-900 shadow-lg hover:bg-white transition-colors"
                        >
                          <FaExternalLinkAlt size={14} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 transition-colors
                      ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-5 leading-relaxed
                      ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                            ${isDarkMode
                              ? 'bg-gray-800 text-gray-300 group-hover:bg-gray-700'
                              : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold
              bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white
              shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-shadow"
          >
            <FaGithub size={20} />
            Explore All Projects
            <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Projects);
