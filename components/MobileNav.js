"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope, FaTimes, FaBars } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isDarkMode } = useTheme();
  const { messages } = useLanguage();

  // Set mounted state to handle client-side only initialization
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show the FAB after scrolling down a bit
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Also close the menu if we scroll back to top
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Close menu when clicking a link
  const handleNavClick = (id) => {
    setIsOpen(false);
    
    // Smooth scroll to the section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Only show on mobile devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (!isMounted) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMounted]);

  // Don't render anything on server or until mounted
  if (!isMounted) return null;
  
  // Don't render on desktop
  if (!isMobile) return null;

  const navItems = [
    { id: "home", icon: <FaHome size={18} />, label: messages?.nav?.home || "Home" },
    { id: "about", icon: <FaUser size={18} />, label: messages?.nav?.about || "About" },
    { id: "skills", icon: <FaCode size={18} />, label: messages?.nav?.skills || "Skills" },
    { id: "projects", icon: <FaBriefcase size={18} />, label: messages?.nav?.projects || "Projects" },
    { id: "contact", icon: <FaEnvelope size={18} />, label: messages?.nav?.contact || "Contact" }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Main FAB button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center mobile-touch-target ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            }`}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>

          {/* Navigation items */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-16 right-0 mb-2"
              >
                <div className="flex flex-col-reverse items-end space-y-reverse space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md mobile-touch-target ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      <span className="text-sm whitespace-nowrap">{item.label}</span>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-gray-700' 
                          : 'bg-gray-100'
                      }`}>
                        {item.icon}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav; 