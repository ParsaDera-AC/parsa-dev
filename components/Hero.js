"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaPlay, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// Memoized components
const FloatingGradient = memo(({ position, color, mousePosition }) => (
  <motion.div
    className={`absolute ${position} ${color} rounded-full blur-xl opacity-60`}
    style={{
      transform: `translate(${mousePosition.x * (position.includes('left') ? 0.02 : -0.02)}px, ${mousePosition.y * (position.includes('top') ? 0.02 : -0.02)}px)`,
      transition: 'transform 0.7s ease-out',
    }}
  />
));

const SocialIcon = memo(({ href, icon: Icon, isDarkMode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`transition-colors duration-200 ${
      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
    }`}
    whileHover={{ scale: 1.2 }}
  >
    <Icon size={24} />
  </motion.a>
));

const Hero = () => {
  const [isCodeVisible, setIsCodeVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

  // Throttle mouse movement for better performance
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          timeoutId = null;
        }, 50); // Throttle to 50ms
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const pythonCode = useMemo(() => `#!/usr/bin/env python3
# Full-Stack Developer Portfolio

class Developer:
    def __init__(self):
        self.name = "Parsa Derakhshan"
        self.role = "Full-Stack Developer"
        self.skills = [
            "Vue.js", ".NET", "React",
            "Node.js", "TypeScript",
            "Python", "Next.js"
        ]
        self.passion = "Building Beautiful Web Apps"
        
    def introduce(self):
        return f"Hi, I'm {self.name}"`, []);

  const lineNumbers = useMemo(() => 
    Array.from({ length: pythonCode.split('\n').length }, (_, i) => i + 1),
    [pythonCode]
  );

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-24 overflow-hidden">
      {/* Floating Elements - Absolute positioned */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingGradient 
          position="top-1/4 left-1/4 w-32 h-32" 
          color="bg-gradient-to-r from-purple-500/20 to-pink-500/20" 
          mousePosition={mousePosition} 
        />
        <FloatingGradient 
          position="bottom-1/4 right-1/4 w-40 h-40" 
          color="bg-gradient-to-r from-blue-500/20 to-indigo-500/20" 
          mousePosition={mousePosition} 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mb-12"
        >
          <div className="relative bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">developer.py</span>
                <button 
                  onClick={() => setIsCodeVisible(!isCodeVisible)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <FaPlay size={12} className="text-green-400" />
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="relative">
              {/* Line Numbers */}
              <div className="absolute left-0 top-0 h-full w-12 bg-gray-900 text-gray-600 text-sm font-mono flex flex-col items-end pr-2 pt-4">
                {lineNumbers.map((num) => (
                  <div key={num} className="h-6 leading-6">
                    {num}
                  </div>
                ))}
              </div>

              {/* Code with Typing Effect */}
              <div className="pl-12 pr-4 pt-4 pb-4 overflow-x-auto">
                <AnimatePresence mode="wait">
                  {isCodeVisible && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TypeAnimation
                        sequence={[pythonCode]}
                        wrapper="pre"
                        speed={80} // Increased for better performance
                        className="text-sm font-mono text-gray-100 leading-6"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pulse-subtle">
            {messages?.hero?.greeting || "Hi, I'm Parsa Derakhshan"}
          </h1>

          <p className={`text-xl sm:text-2xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {messages?.hero?.role || "A passionate"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {messages?.hero?.title || "Full-Stack Developer"}
            </span>
            {" "}{messages?.hero?.description || "crafting beautiful digital experiences"}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up">
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {messages?.hero?.viewWork || "View My Work"}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 rounded-full border-2 border-purple-500 text-purple-400 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {messages?.hero?.contact || "Get In Touch"}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-8 animate-fade-in-up">
            <SocialIcon 
              href="https://github.com/ParsaDera-AC" 
              icon={FaGithub} 
              isDarkMode={isDarkMode} 
            />
            <SocialIcon 
              href="https://www.linkedin.com/in/parsa-dera-1360a11b3" 
              icon={FaLinkedin} 
              isDarkMode={isDarkMode} 
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <FiArrowDown className={`text-2xl ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`} />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
