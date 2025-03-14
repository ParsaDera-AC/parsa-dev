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
    className={`transition-colors duration-200 mobile-touch-target flex items-center justify-center p-2 ${
      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
    }`}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.95 }}
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Optimization: Memoize TypeAnimation sequence to avoid recreating on every render
  const typeAnimationSequence = useMemo(() => [
    messages?.hero?.typedText1 || "Full Stack Developer",
    2000,
    messages?.hero?.typedText2 || "Back-end Engineer",
    2000,
    messages?.hero?.typedText3 || "Front-end Developer",
    2000,
    messages?.hero?.typedText4 || "Problem Solver",
    2000,
  ], [messages?.hero?.typedText1, messages?.hero?.typedText2, messages?.hero?.typedText3, messages?.hero?.typedText4]);

  const codeSnippet = useMemo(() => {
    return `function Parsa() {
  const skills = [
    "JavaScript", "React", 
    "Node.js", ".NET Core", 
    "Microservices"
  ];
  
  return (
    <Developer
      specializedIn={skills}
      passion="BuildingElegantSolutions"
    />
  );
}`
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center mobile-safe-vh">
      {/* Floating gradients positioned for both desktop and mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingGradient
          position="top-1/4 -left-20 sm:left-[10%] md:left-[20%] w-72 h-72 sm:w-96 sm:h-96"
          color="bg-purple-500/30"
          mousePosition={mousePosition}
        />
        <FloatingGradient
          position="bottom-1/4 -right-20 sm:right-[10%] md:right-[20%] w-72 h-72 sm:w-96 sm:h-96"
          color="bg-pink-500/20"
          mousePosition={mousePosition}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 py-16 sm:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side content */}
          <div className="w-full md:w-1/2 md:pr-8 mb-12 md:mb-0">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative mb-4"
              >
                <motion.span
                  className="inline-block rounded-full text-sm px-4 py-1.5 font-medium mb-2 
                  sm:text-base sm:px-5 sm:py-2
                  bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {messages?.hero?.greeting || "Hello, I'm Parsa Derakhshan"}
                </motion.span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 
                  mobile-text-4xl bg-clip-text text-transparent bg-gradient-to-r
                  from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
              >
                {messages?.hero?.title || "I Build Modern"}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {messages?.hero?.titleHighlight || "Web Experiences"}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex h-12 items-center mb-6 text-xl sm:text-2xl font-semibold"
              >
                <span className={`mr-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {messages?.hero?.iAm || "I'm a"}
                </span>
                <TypeAnimation
                  sequence={typeAnimationSequence}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`text-base sm:text-lg max-w-lg mb-8 sm:mb-10 
                  mobile-text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {messages?.hero?.description || 
                "I specialize in building elegant, performant web applications using modern technologies and best practices. My focus is on creating intuitive user experiences backed by scalable, well-architected systems."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 w-full justify-center md:justify-start"
              >
                <motion.button
                  onClick={handleScrollToProjects}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600
                    text-white font-medium flex items-center space-x-2 shadow-lg shadow-purple-500/20
                    hover:shadow-xl hover:shadow-purple-500/40 transform transition-all duration-300
                    hover:-translate-y-1 mobile-touch-target"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlay className="mr-2" size={16} />
                  <span>{messages?.hero?.projectsButton || "View Projects"}</span>
                </motion.button>

                <div className="flex items-center space-x-4">
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
            </div>
          </div>

          {/* Right side code display - with responsive adjustments for mobile */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative w-full max-w-md"
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                {/* Code window header */}
                <div className={`flex items-center justify-between px-4 py-2 ${
                  isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                }`}>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className={`text-xs font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    parsa.jsx
                  </div>
                  <div className="w-6"></div> {/* Spacer for balance */}
                </div>

                {/* Code content */}
                <pre className={`px-4 py-4 overflow-x-auto text-sm sm:text-base font-mono ${
                  isDarkMode ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-800'
                }`}>
                  <AnimatePresence mode="wait">
                    {isCodeVisible && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="code"
                      >
                        <div className="overflow-x-auto">
                          {codeSnippet.split('\n').map((line, i) => (
                            <div key={i} className="whitespace-pre">
                              <span className={`${
                                isDarkMode ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="ml-4">
                                {renderCodeLine(line, isDarkMode)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator optimized for both desktop and mobile */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 1.2,
              duration: 0.5,
            }
          }}
        >
          <span className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {messages?.hero?.scrollText || "Scroll Down"}
          </span>
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }
            }}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'bg-gray-800 text-purple-400' 
                : 'bg-gray-100 text-purple-600'
            }`}
          >
            <FiArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function for syntax highlighting
const renderCodeLine = (line, isDarkMode) => {
  // Keywords
  const keywords = ['function', 'const', 'return'];
  // Special values
  const values = ['"JavaScript"', '"React"', '"Node.js"', '".NET Core"', '"Microservices"', '"BuildingElegantSolutions"'];
  
  let coloredLine = line;
  
  // Replace keywords
  keywords.forEach(keyword => {
    const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'g');
    const keywordColor = isDarkMode ? 'text-purple-400' : 'text-purple-600';
    coloredLine = coloredLine.replace(
      keywordRegex, 
      `<span class="${keywordColor}">${keyword}</span>`
    );
  });

  // Replace values
  values.forEach(value => {
    const valueRegex = new RegExp(value, 'g');
    const valueColor = isDarkMode ? 'text-green-400' : 'text-green-600';
    coloredLine = coloredLine.replace(
      valueRegex,
      `<span class="${valueColor}">${value}</span>`
    );
  });

  // Replace JSX components
  const jsxRegex = /<([A-Z][a-zA-Z]*)|<\/([A-Z][a-zA-Z]*)|\/>/g;
  const jsxColor = isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
  coloredLine = coloredLine.replace(jsxRegex, (match) => {
    return `<span class="${jsxColor}">${match}</span>`;
  });

  // Replace properties
  const propRegex = /(\w+)=/g;
  const propColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  coloredLine = coloredLine.replace(propRegex, (match, prop) => {
    return `<span class="${propColor}">${prop}</span>=`;
  });
  
  // Return the jsx
  return <span dangerouslySetInnerHTML={{ __html: coloredLine }} />;
};

export default memo(Hero);
