"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi"; // Icons for light/dark toggle
import { motion } from "framer-motion"; // For animations

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all ${
        isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-black"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a className="btn btn-ghost normal-case text-xl">My Portfolio</a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-4 items-center">
          <a
            href="#about"
            className="btn btn-ghost hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            About
          </a>
          <a
            href="#projects"
            className="btn btn-ghost hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition-transform duration-300"
          >
            Contact
          </a>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="btn btn-ghost"
            aria-label="Toggle Language"
          >
            {language === "en" ? "FR" : "EN"}
          </button>

          {/* Social Icons */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="btn btn-ghost"
            aria-label="Toggle Dark Mode"
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>
        </nav>

        {/* Mobile Menu Placeholder */}
        <button className="btn btn-ghost lg:hidden">Menu</button>
      </div>
    </motion.header>
  );
}
