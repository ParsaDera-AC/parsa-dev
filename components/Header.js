"use client";

import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaUser,
  FaFolder,
  FaEnvelope,
  FaCode,
  FaFileAlt,
  FaBrain,
} from "react-icons/fa";
import { FiMoon, FiSun, FiGlobe } from "react-icons/fi";
import { PiCodeSimpleFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "@/components/AmbientBackground";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { toggleLanguage, messages, language } = useLanguage();

  // Navigation items
  const navItems = [
    { id: "about", label: "About", icon: <FaUser size={16} /> },
    { id: "skills", label: "Skills", icon: <FaCode size={16} /> },
    { id: "softskills", label: "Soft Skills", icon: <FaBrain size={16} /> },
    { id: "projects", label: "Projects", icon: <FaFolder size={16} /> },
    { id: "resume", label: "Resume", icon: <FaFileAlt size={16} /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AmbientBackground />
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-transparent backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center space-x-1 group relative"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative flex items-center">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <div className="flex items-center space-x-2 relative">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative"
                  >
                    <PiCodeSimpleFill
                      size={32}
                      className="text-white/90 transition-all duration-300 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    />
                  </motion.div>
                  <div className="flex items-center space-x-1">
                    <motion.span
                      className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Parsa
                    </motion.span>
                    <span className="text-2xl font-light text-gray-400 px-0.5">/</span>
                    <motion.span
                      className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Dera
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300
                    ${activeSection === item.id
                      ? "text-purple-400 bg-white/10"
                      : "text-gray-300 hover:text-purple-400 hover:bg-white/5"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{messages?.nav?.[item.id] || item.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Right Side Items */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 rounded-lg text-gray-300 hover:text-purple-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGlobe size={20} />
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                </motion.button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-32 rounded-lg bg-black/90 backdrop-blur-md border border-gray-800 shadow-lg overflow-hidden"
                    >
                      {["en", "fr"].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            toggleLanguage();
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200
                            ${language === lang ? "text-purple-400 bg-white/10" : "text-gray-300 hover:text-purple-400 hover:bg-white/5"}`}
                        >
                          {lang === "en" ? "English" : "Français"}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Links */}
              <motion.a
                href="https://github.com/ParsaDera-AC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/parsa-derakhshan-0b0b3b1b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <FaLinkedin size={20} />
              </motion.a>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-300 hover:text-purple-400 hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-purple-400 hover:bg-white/5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800"
            >
              <div className="container mx-auto px-6 py-4">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`px-4 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300
                        ${activeSection === item.id
                          ? "text-purple-400 bg-white/10"
                          : "text-gray-300 hover:text-purple-400 hover:bg-white/5"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ x: 10 }}
                    >
                      {item.icon}
                      <span>{messages?.nav?.[item.id] || item.label}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
