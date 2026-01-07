"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import { PiCodeSimpleFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ParsaDera-AC';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/parsa-dera-1360a11b3';

interface NavItem {
  id: string;
  label: string;
}

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = navItems.map(item => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5'
              : 'bg-white/80 backdrop-blur-xl border-b border-black/5'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Branded Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Animated code icon */}
              <motion.div
                className="relative"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <PiCodeSimpleFill
                  size={32}
                  className={`relative transition-colors duration-300 ${
                    isDarkMode
                      ? 'text-white group-hover:text-indigo-400'
                      : 'text-gray-900 group-hover:text-indigo-600'
                  }`}
                />
              </motion.div>

              {/* Name with gradient */}
              <div className="flex items-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Parsa
                </span>
                <span className={`text-xl font-light mx-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>/</span>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Dera
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors
                    ${activeSection === item.id
                      ? isDarkMode ? 'text-white' : 'text-gray-900'
                      : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  whileHover={{ y: -1 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Social links */}
              <motion.a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -1 }}
                className={`p-2.5 rounded-full transition-colors
                  ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -1 }}
                className={`p-2.5 rounded-full transition-colors
                  ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <FaLinkedin size={18} />
              </motion.a>

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                className={`p-2.5 rounded-full transition-colors
                  ${isDarkMode ? 'text-gray-400 hover:text-yellow-400 hover:bg-white/5' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                className={`md:hidden p-2.5 rounded-full transition-colors
                  ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden
                ${isDarkMode ? 'bg-[#0a0a0b]/95 backdrop-blur-xl border-white/5' : 'bg-white/95 backdrop-blur-xl border-black/5'}`}
            >
              <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${activeSection === item.id
                        ? isDarkMode
                          ? 'text-white bg-gradient-to-r from-indigo-500/10 to-purple-500/10'
                          : 'text-gray-900 bg-gradient-to-r from-indigo-500/10 to-purple-500/10'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
  );
};

export default memo(Header);
