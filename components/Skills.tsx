"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  FaReact, FaNodeJs, FaVuejs, FaPython, FaDocker, FaGitAlt,
  FaJs, FaJava, FaCloud
} from "react-icons/fa";
import {
  SiTypescript, SiDotnet, SiMysql, SiMongodb, SiPostgresql,
  SiTailwindcss, SiNextdotjs
} from "react-icons/si";
import { useTheme } from "@/context";

interface SkillCategory {
  name: string;
  description: string;
  skills: { name: string; icon: React.ReactNode }[];
}

const Skills: React.FC = () => {
  const { isDarkMode } = useTheme();

  const categories: SkillCategory[] = [
    {
      name: "Frontend",
      description: "Building beautiful, responsive interfaces",
      skills: [
        { name: "React", icon: <FaReact size={24} /> },
        { name: "Next.js", icon: <SiNextdotjs size={24} /> },
        { name: "Vue.js", icon: <FaVuejs size={24} /> },
        { name: "Tailwind", icon: <SiTailwindcss size={24} /> },
      ]
    },
    {
      name: "Backend",
      description: "Scalable server-side solutions",
      skills: [
        { name: "Node.js", icon: <FaNodeJs size={24} /> },
        { name: ".NET Core", icon: <SiDotnet size={24} /> },
        { name: "Python", icon: <FaPython size={24} /> },
        { name: "Java", icon: <FaJava size={24} /> },
      ]
    },
    {
      name: "Database",
      description: "Data storage & management",
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql size={24} /> },
        { name: "MySQL", icon: <SiMysql size={24} /> },
        { name: "MongoDB", icon: <SiMongodb size={24} /> },
      ]
    },
    {
      name: "DevOps & Cloud",
      description: "Infrastructure & deployment",
      skills: [
        { name: "Docker", icon: <FaDocker size={24} /> },
        { name: "Azure", icon: <FaCloud size={24} /> },
        { name: "Git", icon: <FaGitAlt size={24} /> },
      ]
    },
  ];

  const languages = [
    { name: "TypeScript", icon: <SiTypescript size={20} /> },
    { name: "JavaScript", icon: <FaJs size={20} /> },
    { name: "Python", icon: <FaPython size={20} /> },
    { name: "C#", icon: <SiDotnet size={20} /> },
    { name: "Java", icon: <FaJava size={20} /> },
  ];

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className={`absolute -top-32 left-[20%] w-72 h-72 rounded-full border ${
          isDarkMode ? 'border-cyan-500/10' : 'border-cyan-300/20'
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute bottom-10 -right-20 w-60 h-60 rounded-full border-2 border-dashed ${
          isDarkMode ? 'border-indigo-500/10' : 'border-indigo-300/15'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute top-[40%] left-[8%] w-5 h-5 ${
          isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
        }`}
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: [0, 180, 360], y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bottom-[25%] right-[12%] w-3 h-3 rounded-full ${
          isDarkMode ? 'bg-purple-500/25' : 'bg-purple-400/35'
        }`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className={`absolute top-[15%] right-[25%] w-2 h-2 rounded-full ${
          isDarkMode ? 'bg-indigo-500/30' : 'bg-indigo-400/40'
        }`}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Grid pattern */}
      <div className={`absolute top-20 right-10 w-24 h-24 opacity-20 ${
        isDarkMode ? 'opacity-10' : 'opacity-15'
      }`}>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase mb-4
            ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="w-12 h-px bg-current" />
            Expertise
          </span>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Technical
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Skills</span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A comprehensive toolkit built through years of hands-on experience
              with modern technologies and best practices.
            </p>
          </div>
        </motion.div>

        {/* Languages Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className={`p-6 rounded-2xl border
            ${isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <span className={`text-sm font-medium shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Primary Languages:
              </span>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full
                      ${isDarkMode
                        ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-white border border-gray-700'
                        : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-900 border border-gray-200'}`}
                  >
                    <span className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}>{lang.icon}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`h-full p-8 rounded-3xl border transition-colors
                ${isDarkMode
                  ? 'bg-gray-900/30 border-gray-800 hover:border-gray-700'
                  : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-1
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {category.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-colors
                        ${isDarkMode
                          ? 'bg-gray-800/50 hover:bg-gray-800'
                          : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <div className={`shrink-0 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                        {skill.icon}
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className={`relative p-8 rounded-2xl overflow-hidden
            ${isDarkMode ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30' : 'bg-gradient-to-r from-indigo-50 to-purple-50'}
            border ${isDarkMode ? 'border-indigo-500/20' : 'border-indigo-200'}`}>
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Always Learning
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Currently exploring AI/ML technologies and advanced cloud architecture patterns.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                        ${isDarkMode ? 'border-gray-900 bg-gray-800 text-gray-400' : 'border-white bg-gray-100 text-gray-600'}`}
                    >
                      {['AI', 'ML', 'K8', 'TF'][i]}
                    </div>
                  ))}
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  & more
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);
