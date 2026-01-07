"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "@/context";

interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

const AboutMe: React.FC = () => {
  const { isDarkMode } = useTheme();

  const journey: JourneyItem[] = [
    {
      year: "2021",
      title: "The Beginning",
      subtitle: "Algonquin College",
      description: "Started my journey in Computer Engineering, diving deep into algorithms and software architecture.",
    },
    {
      year: "2022",
      title: "First Steps",
      subtitle: "Learning & Growing",
      description: "Built my first full-stack applications, discovered my passion for creating seamless user experiences.",
    },
    {
      year: "2023",
      title: "Going Professional",
      subtitle: "Canadian Coast Guard",
      description: "Joined as a Full-Stack Developer, working on enterprise applications that serve critical operations.",
    },
    {
      year: "Now",
      title: "Crafting Excellence",
      subtitle: "Present Day",
      description: "Building innovative solutions with modern technologies, always pushing boundaries.",
    },
  ];

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "10+", label: "Technologies" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className={`absolute -top-20 -right-20 w-80 h-80 rounded-full border ${
          isDarkMode ? 'border-indigo-500/10' : 'border-indigo-300/20'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute top-1/3 -left-32 w-64 h-64 rounded-full border-2 border-dashed ${
          isDarkMode ? 'border-purple-500/10' : 'border-purple-300/15'
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute bottom-20 right-[15%] w-4 h-4 rounded-full ${
          isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-400/30'
        }`}
        animate={{ y: [-15, 15, -15], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`absolute top-[20%] right-[10%] w-3 h-3 rounded-full ${
          isDarkMode ? 'bg-purple-500/25' : 'bg-purple-400/35'
        }`}
        animate={{ y: [10, -10, 10], x: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bottom-1/3 left-[5%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] ${
          isDarkMode ? 'border-b-indigo-500/15' : 'border-b-indigo-400/25'
        }`}
        animate={{ rotate: [0, 360], y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header - Asymmetric */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase mb-4
              ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              <span className="w-12 h-px bg-current" />
              My Story
            </span>
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Turning Ideas Into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Reality</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:pt-8"
          >
            <p className={`text-lg lg:text-xl leading-relaxed mb-6
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              I'm a Full-Stack Developer with a passion for creating elegant,
              high-performance applications. My journey from curious student to
              professional developer has been driven by an insatiable appetite
              for learning and building.
            </p>
            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <FaMapMarkerAlt size={14} />
              <span className="text-sm">Ottawa, Canada</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 max-w-2xl mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className={`text-4xl lg:text-5xl font-bold mb-1
                ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-0 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2
            ${isDarkMode ? 'bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent' : 'bg-gradient-to-b from-indigo-400/50 via-purple-400/50 to-transparent'}`}
          />

          {journey.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 last:mb-0
                ${index % 2 === 1 ? 'lg:text-right' : ''}`}
            >
              {/* Year marker */}
              <div className={`absolute left-0 lg:left-1/2 top-0 w-3 h-3 rounded-full -translate-x-1/2 ring-4
                ${isDarkMode ? 'bg-indigo-500 ring-[#0a0a0b]' : 'bg-indigo-500 ring-[#fafafa]'}`}
              />

              {/* Content */}
              <div className={`pl-8 lg:pl-0 ${index % 2 === 1 ? 'lg:order-1 lg:pr-16' : 'lg:pr-16'}`}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                  ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                  {item.year}
                </span>
                <h3 className={`text-xl lg:text-2xl font-bold mb-1
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm font-medium mb-2
                  ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {item.subtitle}
                </p>
                <p className={`leading-relaxed
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>

              {/* Empty column for alternating layout */}
              <div className={`hidden lg:block ${index % 2 === 1 ? 'lg:order-0 lg:pl-16' : 'lg:pl-16'}`} />
            </motion.div>
          ))}
        </div>

        {/* Philosophy Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className={`relative p-8 lg:p-12 rounded-3xl overflow-hidden
            ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'}
            backdrop-blur-xl border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className={`text-2xl lg:text-3xl font-bold mb-4
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  My Philosophy
                </h3>
                <p className={`text-lg leading-relaxed
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  "Code is poetry written for machines, but great code is poetry that humans can read too.
                  I believe in building software that's not just functional, but elegant, maintainable,
                  and a joy to work with."
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                {['Clean Code', 'User-First', 'Continuous Learning', 'Team Player'].map((value) => (
                  <span
                    key={value}
                    className={`px-4 py-2 rounded-full text-sm font-medium
                      ${isDarkMode
                        ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-gray-300 border border-gray-800'
                        : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-700 border border-gray-200'}`}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutMe);
