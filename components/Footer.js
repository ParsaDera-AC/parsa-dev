"use client";

import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const { messages, language } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative overflow-hidden pb-8 pt-24">
      {/* Smooth waves background */}
      <div className="absolute inset-0 -z-10">
        {/* This creates the space-like background */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle stars in background */}
        <div className="stars absolute inset-0 opacity-60"></div>
        
        {/* Waves - using SVG for precise control */}
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <svg 
            className="w-full"
            viewBox="0 0 1440 240" 
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,186.7C672,192,768,224,864,213.3C960,203,1056,149,1152,144C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="fill-purple-900/30"
            />
            <path 
              d="M0,160L48,149.3C96,139,192,117,288,133.3C384,149,480,203,576,208C672,213,768,171,864,170.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="fill-pink-900/20"
              style={{ transform: 'translateY(10px)' }}
            />
          </svg>
        </div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Site name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Link href="/" aria-label="Home">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Parsa / Dera
              </h2>
            </Link>
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-md text-base mobile-text-sm mb-8 text-gray-300/80"
          >
            {messages?.footer?.tagline || "Building innovative web experiences with modern technologies and creative solutions."}
          </motion.p>
          
          {/* Navigation links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto mb-10"
          >
            {[
              { href: "#home", label: messages?.nav?.home || "Home" },
              { href: "#about", label: messages?.nav?.about || "About" },
              { href: "#skills", label: messages?.nav?.skills || "Skills" },
              { href: "#projects", label: messages?.nav?.projects || "Projects" },
              { href: "#contact", label: messages?.nav?.contact || "Contact" }
            ].map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
          
          {/* Social icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center space-x-6 mb-10"
          >
            {[
              { href: "https://github.com/ParsaDera-AC", icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/parsa-dera-1360a11b3", icon: FaLinkedin, label: "LinkedIn" },
              { href: "mailto:parsa.derakhshan20@gmail.com", icon: FaEnvelope, label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-touch-target"
                aria-label={social.label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-300">
                  <social.icon size={18} className="text-white" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        {/* Copyright and top button */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-800/50">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs text-gray-500 mb-4 sm:mb-0"
          >
            © {currentYear} Parsa Derakhshan <span className="mx-2">•</span> 
            {messages?.footer?.rights || "All rights reserved"}
          </motion.p>
          
          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-8 h-8 rounded-full bg-purple-600/50 hover:bg-purple-600/70 transition-all duration-300 flex items-center justify-center"
            aria-label="Back to top"
          >
            <FaArrowUp size={12} className="text-white" />
          </motion.button>
        </div>
      </div>
      
      {/* Custom CSS for stars */}
      <style jsx>{`
        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 120px 90px, #eee, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 130px 40px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 