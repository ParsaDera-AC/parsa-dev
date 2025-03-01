"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaServer, FaMobile } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const Projects = () => {
  const { messages } = useLanguage();

  const defaultProjects = [
    {
      title: "Enterprise Resource Management System",
      description: "Architected and developed a comprehensive web application for managing organizational resources and workflows. Implemented CQRS pattern and modern architectural principles to ensure scalability and maintainability.",
      image: "/enterprise.jpg",
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
      description: "Developed a CRUD modern web application template for the Canadian Ski Patrol using TypeScript and modern web technologies. Implemented material design components and responsive layouts with SCSS for an optimal user experience.",
      image: "/skiPatrol.jpg",
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
      image: "/telegram.jpg",
      techStack: ["Python", "pandas", "NumPy", "seaborn", "matplotlib"],
      type: "Data Analysis",
      category: "Data Science",
      links: {
        github: "#",
        demo: null,
      }
    },
    {
      title: "Interactive Picross Game",
      description: "Developed a modern implementation of the classic Picross/Nonogram puzzle game with multiplayer support, featuring a sleek GUI and client-server architecture for online play.",
      image: "/picross.jpg",
      techStack: ["React", "Node.js", "Socket.io", "Express", "MongoDB"],
      type: "Game Development",
      category: "Full Stack",
      links: {
        github: "#",
        demo: null,
      }
    },
    {
      title: "SQO Group Website",
      description: "Designed and developed a professional website for a quantum physics research group, implementing responsive design principles and modern UI/UX practices.",
      image: "/sqo.jpg",
      techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      type: "Web Application",
      category: "Frontend",
      links: {
        github: "#",
        demo: null,
      }
    }
  ];

  const projects = defaultProjects.map((project, index) => {
    const projectKey = Object.keys(messages?.projects?.items || {})[index] || '';
    return {
      title: messages?.projects?.items?.[projectKey]?.title || project.title,
      description: messages?.projects?.items?.[projectKey]?.description || project.description,
      image: project.image,
      techStack: project.techStack,
      type: messages?.projects?.types?.[project.type.toLowerCase().replace(' ', '')] || project.type,
      category: messages?.projects?.categories?.[project.category.toLowerCase().replace(' ', '')] || project.category,
      links: project.links
    };
  });

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {messages?.projects?.title || "Featured Projects"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {messages?.projects?.subtitle || "A showcase of my technical expertise, featuring enterprise applications, data analysis tools, and innovative solutions."}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {project.type}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">
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
                      className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      <FaGithub />
                      {messages?.projects?.viewCode || "View Code"}
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-colors duration-300"
                    >
                      <FaExternalLinkAlt />
                      {messages?.projects?.liveDemo || "Live Demo"}
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
