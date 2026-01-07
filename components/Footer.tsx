"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa";
import { PiCodeSimpleFill } from "react-icons/pi";
import { useTheme } from "@/context";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ParsaDera-AC';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/parsa-dera-1360a11b3';
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'contact@parsaderakhshan.com';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: <FaGithub size={18} />, url: GITHUB_URL, label: "GitHub" },
    { icon: <FaLinkedin size={18} />, url: LINKEDIN_URL, label: "LinkedIn" },
    { icon: <FaEnvelope size={18} />, url: `mailto:${EMAIL}`, label: "Email" },
  ];

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-3 mb-4 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
              >
                <PiCodeSimpleFill
                  size={28}
                  className={`transition-colors ${isDarkMode
                    ? 'text-white group-hover:text-indigo-400'
                    : 'text-gray-900 group-hover:text-indigo-600'}`}
                />
              </motion.div>
              <div className="flex items-center">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Parsa
                </span>
                <span className={`text-lg font-light mx-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>/</span>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Dera
                </span>
              </div>
            </a>
            <p className={`text-sm leading-relaxed max-w-xs
              ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Full-Stack Developer crafting exceptional digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick Links
            </h4>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-colors
                    ${isDarkMode
                      ? 'text-gray-500 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`p-3 rounded-xl transition-colors
                    ${isDarkMode
                      ? 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                      : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'}`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4
          border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm flex items-center gap-1.5
            ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} Parsa Derakhshan. Built with
            <FaHeart size={12} className="text-red-500" />
            and lots of coffee.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isDarkMode
                ? 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
                : 'bg-gray-50 text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'}`}
          >
            Back to top
            <FaArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
