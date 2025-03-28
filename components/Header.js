"use client";

import { useState, useEffect, useCallback, memo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaUser,
  FaFolder,
  FaEnvelope,
  FaCode,
  FaFileAlt,
  FaBrain,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { FiMoon, FiSun, FiGlobe } from "react-icons/fi";
import { PiCodeSimpleFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "@/components/AmbientBackground";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// Memoized navigation item component
const NavItem = memo(({ id, icon, label, activeSection, isDarkMode, onClick }) => (
  <motion.a
    href={`#${id}`}
    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300
      ${activeSection === id
        ? isDarkMode 
          ? "text-purple-400 bg-white/10"
          : "text-purple-600 bg-gray-100"
        : isDarkMode
          ? "text-gray-300 hover:text-purple-400 hover:bg-white/5"
          : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
      }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
    <span>{label}</span>
  </motion.a>
));

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { toggleLanguage, messages, language } = useLanguage();

  // Navigation items
  const navItems = [
    { id: "home", label: messages?.nav?.home || "Home", icon: <PiCodeSimpleFill size={16} /> },
    { id: "about", label: messages?.nav?.about || "About", icon: <FaUser size={16} /> },
    { id: "softskills", label: messages?.nav?.softskills || "Soft Skills", icon: <FaBrain size={16} /> },
    { id: "skills", label: messages?.nav?.skills || "Skills", icon: <FaCode size={16} /> },
    { id: "projects", label: messages?.nav?.projects || "Projects", icon: <FaFolder size={16} /> },
    { id: "resume", label: messages?.nav?.resume || "Resume", icon: <FaFileAlt size={16} /> },
    { id: "contact", label: messages?.nav?.contact || "Contact", icon: <FaEnvelope size={16} /> },
  ];

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!window.requestAnimationFrame) {
      checkVisibleSections();
      setIsScrolled(window.scrollY > 50);
      return;
    }

    window.requestAnimationFrame(() => {
      checkVisibleSections();
      setIsScrolled(window.scrollY > 50);
    });
  }, []);

  // Optimized section visibility detection
  const checkVisibleSections = useCallback(() => {
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

    // Check if we're at the top/home section
    if (scrollPosition < (sections[0]?.offsetTop || 500)) {
      setActiveSection("home");
    }
  }, [navItems]);

  // Handle navigation item click
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth"
      });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLangMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Attach scroll listener with passive option for better performance
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <AmbientBackground />
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-transparent backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
              transition={{ duration: 0.3 }}
              onClick={(e) => handleNavClick(e, "home")}
            >
              <div className="relative flex items-center">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
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
                      className={`transition-all duration-300 group-hover:text-purple-400 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] ${
                        isDarkMode ? 'text-white/90' : 'text-gray-800'
                      }`}
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
                    <span className={`text-2xl font-light px-0.5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>/</span>
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

            {/* Desktop Navigation - Using memoized components for better performance */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  label={item.label}
                  activeSection={activeSection}
                  isDarkMode={isDarkMode}
                  onClick={(e) => handleNavClick(e, item.id)}
                />
              ))}
            </nav>

            {/* Right Side Items */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="relative">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangMenuOpen(!isLangMenuOpen);
                  }}
                  className={`p-2 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-purple-400 hover:bg-white/5'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`}
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
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-32 rounded-lg backdrop-blur-md border shadow-lg overflow-hidden z-50 ${
                      isDarkMode 
                        ? 'bg-black/90 border-gray-800'
                        : 'bg-white/90 border-gray-200'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {["en", "fr"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          toggleLanguage(lang);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200
                          ${language === lang 
                            ? isDarkMode
                              ? "text-purple-400 bg-white/10"
                              : "text-purple-600 bg-gray-50"
                            : isDarkMode
                              ? "text-gray-300 hover:text-purple-400 hover:bg-white/5"
                              : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                          }`}
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
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-purple-400'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/parsa-dera-1360a11b3"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-purple-400'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <FaLinkedin size={20} />
              </motion.a>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-purple-400 hover:bg-white/5'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.button>

              {/* Mobile Menu Button - HIGHLY VISIBLE VERSION */}
              <div className="block md:hidden">
                <motion.button
                  className={`flex items-center justify-center p-2 rounded-lg shadow-md
                    ${isDarkMode 
                      ? 'bg-gradient-to-r from-purple-700 to-pink-700 text-white shadow-purple-700/20'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/20'
                    } border ${isDarkMode ? 'border-purple-600' : 'border-pink-400'}`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    transition: { 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <FaTimes size={24} className="text-white" />
                  ) : (
                    <FaBars size={24} className="text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - MUCH MORE VISIBLE VERSION */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-x-0 top-20 z-50 border-t shadow-lg ${
                isDarkMode
                  ? 'bg-gray-900/95 backdrop-blur-md border-gray-800 shadow-black/30'
                  : 'bg-white/95 backdrop-blur-md border-gray-200 shadow-gray-200/30'
              }`}
            >
              <div className="container mx-auto px-6 py-6">
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`px-4 py-4 rounded-lg flex items-center space-x-3 transition-all duration-300
                        ${activeSection === item.id
                          ? isDarkMode 
                            ? "bg-gradient-to-r from-purple-900/70 to-pink-900/70 text-white"
                            : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                          : isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-white/5"
                            : "text-gray-700 hover:text-purple-700 hover:bg-gray-100/70"
                        }`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`p-2 rounded-lg ${
                        isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="font-medium text-base">{item.label}</span>
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
};

export default memo(Header);
