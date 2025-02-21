"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaPlay } from "react-icons/fa";
import SnowBackground from "./SnowBackground";

const Hero = ({ isDarkMode }) => {
  const pythonCode = `#!/usr/bin/env python3
# Full-Stack Developer Portfolio

# Define developer profile
developer = {
    "name": "Parsa Derakhshan",
    "role": "Full-Stack Developer",
    "skills": [
        "Vue.js",
        ".NET",
        "React",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "Python",
        "Django",
    ],
    "projects": []
}

# Function to display skills
def display_skills():
    for skill in developer["skills"]:
        print(f"Skill: {skill}")

# Display developer profile
print(f"Developer: {developer['name']} - Role: {developer['role']}")
display_skills()

# Example project snippet
class PortfolioProject:
    def __init__(self, name):
        self.name = name
    
    def describe(self):
        return f"Project: {self.name} - Built with {', '.join(developer['skills'][:3])}"

project = PortfolioProject("ParsaDera Portfolio")
print(project.describe())`;

  return (
    <section className="relative min-h-screen bg-transparent flex items-center justify-center overflow-hidden">
      <SnowBackground />
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        {/* Code Snippet Animation (VS Code + GraphQL-inspired, wider fixed size, Python, no syntax highlight) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="relative w-[720px] h-[300px] max-w-full mx-auto bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-700 shadow-md overflow-hidden">
            {/* Line numbers (static, mimicking GraphQL) */}
            <div className="absolute left-0 top-0 h-full w-10 bg-gray-900 text-gray-500 text-sm font-mono flex flex-col items-end pr-2 pt-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="h-6 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code content with typing animation (line by line, no removal, plain white text) */}
            <div className="pl-12 pr-12 w-full h-full">
              <TypeAnimation
                sequence={[pythonCode, 2000]} // Type the entire code once, pause for 2 seconds
                wrapper="pre"
                speed={50}
                className="text-sm font-mono text-gray-100 w-full h-full overflow-auto code-vscode"
              />
            </div>

            {/* Play button (like GraphQL) */}
            <button className="absolute right-4 top-4 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors">
              <FaPlay size={16} />
            </button>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Hi, I'm Parsa Derakhshan
        </motion.h1>

        {/* Static Subheading with Tailwind Classes for Syntax Highlighting */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
            A passionate{" "}
            <span className="text-blue-400">Full-Stack Developer</span>
            <br />
            Specializing in <span className="text-green-400">Vue.js</span>,{" "}
            <span className="text-green-400">.NET</span>, and{" "}
            <span className="text-green-400">React</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary CTA */}
          <motion.a
            href="#projects"
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            animate={{ scale: [1, 1.05, 1] }} // Pulse effect
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View my projects"
          >
            View My Work
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            className="inline-block bg-transparent border-2 border-purple-500 text-purple-500 dark:text-purple-300 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-purple-500 hover:text-white dark:hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get in touch"
          >
            Get In Touch
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
