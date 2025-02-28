"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaServer, FaMobile } from "react-icons/fa";

const Projects = () => {
  const projects = [
    {
      title: "Enterprise Resource Management System",
      description: "Architected and developed a comprehensive web application for managing organizational resources and workflows. Implemented CQRS pattern and modern architectural principles to ensure scalability and maintainability.",
      image: "/enterprise-project.jpg", // You'll need to add this image
      techStack: [".NET/C#", "Vue.js", "SQL", "REST API", "Azure DevOps", "CQRS"],
      type: "Enterprise Application",
      category: "Full Stack",
      links: {
        github: null,
        demo: null,
      }
    },
    {
      title: "Canadian Ski Patrol Rewrite Template",
      description: "Developed a CRUD modern web application templatefor the Canadian Ski Patrol using TypeScript and modern web technologies. Implemented material design components and responsive layouts with SCSS for an optimal user experience.",
      image: "/ski-patrol-project.jpg",
      techStack: ["TypeScript", "Node.js", "LitElements", "SCSS", "Webpack", "Material Design"],
      type: "Web Application",
      category: "Full Stack",
      links: {
        github: "https://github.com/ParsaDera-AC/Basic-Node.js-Project",
        demo: null,
      }
    },
    {
      title: "Telegram Chat Analyzer",
      description: "Built a comprehensive chat analysis tool using Python, featuring advanced data visualization and statistical analysis of conversation patterns, user engagement, and sentiment analysis.",
      image: "/telegram-project.jpg", // You'll need to add this image
      techStack: ["Python", "pandas", "NumPy", "seaborn", "matplotlib"],
      type: "Data Analysis",
      category: "Data Science",
      links: {
        github: "#", // Add your GitHub link
        demo: null,
      }
    },
    {
      title: "Interactive Picross Game",
      description: "Developed a modern implementation of the classic Picross/Nonogram puzzle game with multiplayer support, featuring a sleek GUI and client-server architecture for online play.",
      image: "/picross-project.jpg", // You'll need to add this image
      techStack: ["Java", "Swing", "Socket Programming", "Multi-threading"],
      type: "Game Development",
      category: "Desktop Application",
      links: {
        github: "#", // Add your GitHub link
        demo: null,
      }
    },
    {
      title: "SQO Group Website",
      description: "Designed and developed a professional website for a quantum physics research group, implementing responsive design principles and modern UI/UX practices.",
      image: "/sqogroup.jpg",
      techStack: ["WordPress", "PHP", "CSS", "HTML", "SEO"],
      type: "Web Development",
      category: "Frontend",
      links: {
        github: null,
        demo: "https://sqogroup.ca",
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="projects" className="relative min-h-screen py-20 bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical expertise, featuring enterprise applications, data analysis tools, and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <FaGithub size={16} />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <FaExternalLinkAlt size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
