"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaServer, FaMobile } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const Projects = () => {
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

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
        github: null,
        demo: null,
      }
    },
    {
      title: "Interactive Picross Game",
      description: "Developed a modern implementation of the classic Picross/Nonogram puzzle game with multiplayer support, featuring a sleek GUI and client-server architecture for online play.",
      image: "/piccross.jpg",
      techStack: ["React", "Node.js", "Socket.io", "Express", "MongoDB"],
      type: "Game Development",
      category: "Full Stack",
      links: {
        github: null,
        demo: null,
      }
    },
    {
      title: "SQO Group Website",
      description: "Designed and developed a professional website for a quantum physics research group, implementing responsive design principles and modern UI/UX practices.",
      image: "/sqogroup.jpg",
      techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      type: "Web Application",
      category: "Frontend",
      links: {
        github: null,
        demo: "https://sqogroup.ca"
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
    <div className="bg-black w-full">
      <section id="projects" className="relative py-24">
        {/* Primary background */}
        <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
        
        
        
        {/* Content container */}
        <div className="container mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              {messages?.projects?.title || "Featured Projects"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`${isDarkMode ? 'text-white' : 'text-black'} max-w-2xl mx-auto`}
            >
              {messages?.projects?.subtitle || "A showcase of my technical expertise, featuring enterprise applications, data analysis tools, and innovative solutions."}
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  isDarkMode 
                    ? 'bg-black border-gray-800/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20' 
                    : 'bg-white border-gray-200/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-gray-900' : 'from-black/40'} to-transparent z-10`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs rounded-full border ${
                      isDarkMode 
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                        : 'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {project.type}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full border ${
                      isDarkMode 
                        ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' 
                        : 'bg-pink-100 text-pink-700 border-pink-200'
                    }`}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-semibold mb-3 ${
                    isDarkMode 
                      ? 'text-white group-hover:text-purple-400' 
                      : 'text-gray-900 group-hover:text-purple-600'
                  } transition-colors duration-300`}>
                    {project.title}
                  </h3>

                  <p className={`text-base mb-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4 mt-auto relative z-20">
                    {project.links.github ? (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.links.github, '_blank');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 text-purple-400 hover:bg-purple-500 hover:text-white' 
                            : 'bg-gray-100 text-purple-600 hover:bg-purple-500 hover:text-white'
                        } cursor-pointer`}
                      >
                        <FaGithub className="text-lg" />
                        <span className="font-medium">
                          {messages?.projects?.viewCode || "View Code"}
                        </span>
                      </a>
                    ) : (
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-800/50 text-gray-500' 
                            : 'bg-gray-100/50 text-gray-400'
                        } cursor-not-allowed opacity-75`}
                      >
                        <FaGithub className="text-lg" />
                        <span className="font-medium">
                          {messages?.projects?.privateRepo || "Private Repository"}
                        </span>
                      </div>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.links.demo, '_blank');
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-800 text-pink-400 hover:bg-pink-500 hover:text-white' 
                            : 'bg-gray-100 text-pink-600 hover:bg-pink-500 hover:text-white'
                        } transition-all duration-300`}
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span className="font-medium">{messages?.projects?.liveDemo || "Live Demo"}</span>
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
    </div>
  );
};

export default Projects;
