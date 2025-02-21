"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaUser, FaFolder, FaEnvelope } from "react-icons/fa";
import { FiMoon, FiSun, FiGlobe } from "react-icons/fi"; // Icons for light/dark toggle and globe
import { PiCodeSimpleFill } from "react-icons/pi"; // Your selected logo
import { motion } from "framer-motion"; // For animations

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For language dropdown

  // Toggle dark mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Load user preference on initial render
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle language (updated to handle dropdown selection)
  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".language-toggle")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all ${
        isScrolled
          ? "bg-transparent" // Fully transparent when scrolled
          : "bg-transparent" // Fully transparent when not scrolled
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="navbar container mx-auto flex justify-between items-center px-4 sm:px-6">
        {/* Static Logo */}
        <motion.a
          href="#home"
          className="btn btn-ghost normal-case text-xl flex items-center group"
          whileHover={{ scale: 1.05 }} // Subtle scale for interactivity
        >
          <PiCodeSimpleFill
            size={75}
            className="mr-2 text-white transition-all duration-300 group-hover:text-purple-400 group-hover:shadow-purple-500/30 group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
          />
          <span className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold transition-all duration-300 group-hover:shadow-purple-500/30 group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            ParsaDera
          </span>
        </motion.a>

        {/* Navigation Links with Icons (Desktop) */}
        <nav className="hidden lg:flex space-x-4 items-center">
          <motion.a
            href="#about"
            className="btn btn-ghost flex items-center transition-all duration-300 hover:text-purple-400 hover:underline hover:underline-offset-4"
            whileHover={{ scale: 1.05 }} // Subtle scale for interactivity
          >
            <FaUser size={16} className="mr-1 text-white" />
            About
          </motion.a>
          <motion.a
            href="#projects"
            className="btn btn-ghost flex items-center transition-all duration-300 hover:text-purple-400 hover:underline hover:underline-offset-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaFolder size={16} className="mr-1 text-white" />
            Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold flex items-center transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope size={16} className="mr-1" />
            Contact
          </motion.a>

          {/* Language Toggle with Globe (Dropdown) */}
          <div className="relative language-toggle">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn btn-ghost transition-all duration-300 hover:text-purple-400"
              whileHover={{ scale: 1.1 }}
              aria-label="Toggle Language"
            >
              <FiGlobe size={20} color="white" />
            </motion.button>

            {/* Dropdown Menu (Gradient Theme) */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-32 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-lg border border-indigo-500 dark:border-purple-500 shadow-lg"
              >
                <motion.button
                  onClick={() => toggleLanguage("en")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-indigo-700 dark:hover:bg-purple-700 hover:text-purple-400"
                  whileHover={{ scale: 1.05 }}
                >
                  English
                </motion.button>
                <motion.button
                  onClick={() => toggleLanguage("fr")}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-indigo-700 dark:hover:bg-purple-700 hover:text-purple-400"
                  whileHover={{ scale: 1.05 }}
                >
                  Français
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Social Icons */}
          <motion.a
            href="https://github.com" // Replace with your GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost transition-all duration-300 hover:text-purple-400"
            whileHover={{ scale: 1.1 }}
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com" // Replace with your LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost transition-all duration-300 hover:text-purple-400"
            whileHover={{ scale: 1.1 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </motion.a>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="btn btn-ghost transition-all duration-300 hover:text-purple-400"
            whileHover={{ scale: 1.05 }}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </nav>

        {/* Mobile Menu Button and Dropdown */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)} // Reuse dropdown state for mobile
            className="btn btn-ghost"
            aria-label="Toggle Mobile Menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isDropdownOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </motion.svg>
          </button>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 right-0 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg w-48"
            >
              <motion.a
                href="#about"
                className="block py-2 text-gray-900 dark:text-gray-100 hover:text-purple-400 hover:underline flex items-center"
                onClick={() => setIsDropdownOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                <FaUser size={16} className="mr-2 text-white" />
                About
              </motion.a>
              <motion.a
                href="#projects"
                className="block py-2 text-gray-900 dark:text-gray-100 hover:text-purple-400 hover:underline flex items-center"
                onClick={() => setIsDropdownOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                <FaFolder size={16} className="mr-2 text-white" />
                Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="block py-2 text-gray-900 dark:text-gray-100 hover:text-purple-400 hover:underline flex items-center"
                onClick={() => setIsDropdownOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                <FaEnvelope size={16} className="mr-2 text-white" />
                Contact
              </motion.a>
              <div className="relative mt-2">
                <motion.button
                  onClick={() => setIsDropdownOpen(false)} // Close mobile menu before opening language dropdown
                  className="block w-full text-left px-4 py-2 text-gray-900 dark:text-gray-100 hover:text-purple-400 hover:underline flex items-center"
                  whileHover={{ scale: 1.05 }}
                  aria-label="Toggle Language"
                >
                  <FiGlobe size={20} color="white" className="mr-2" />
                  {language === "en" ? "English" : "Français"}
                </motion.button>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-32 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-lg border border-indigo-500 dark:border-purple-500 shadow-lg"
                  >
                    <motion.button
                      onClick={() => toggleLanguage("en")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-indigo-700 dark:hover:bg-purple-700 hover:text-purple-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      English
                    </motion.button>
                    <motion.button
                      onClick={() => toggleLanguage("fr")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-indigo-700 dark:hover:bg-purple-700 hover:text-purple-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      Français
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}