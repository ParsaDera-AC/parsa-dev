"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi"; // Updated icons for light/dark toggle

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

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

  return (
    <header className="bg-white dark:bg-black text-black dark:text-white shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <a className="btn btn-ghost normal-case text-xl">My Portfolio</a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-4 items-center">
          <a href="#about" className="btn btn-ghost">About</a>
          <a href="#projects" className="btn btn-ghost">Projects</a>
          <a href="#contact" className="btn btn-primary">Contact</a>

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
          <button
            onClick={toggleDarkMode}
            className="btn btn-ghost"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Placeholder */}
        <button className="btn btn-ghost lg:hidden">Menu</button>
      </div>
    </header>
  );
}
