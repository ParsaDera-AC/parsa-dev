"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUnlock, FaDownload, FaKey } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function Resume() {
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (accessCode === 'your-access-code') { // Replace with your actual access code
      setIsUnlocked(true);
      // Add your resume download logic here
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  // Early return if messages are not loaded yet
  if (!messages) {
    return null;
  }

  return (
    <section id="resume" className="relative py-24">
      {/* Subtle top border/divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="min-h-[80vh] flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${ 'bg-transparent'}`} />
          <div className={`absolute inset-0 ${ 'bg-transparent'}`} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className={`${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-white/80'} backdrop-blur-xl rounded-2xl p-8 border ${isDarkMode ? 'border-purple-500/20' : 'border-purple-300/30'} shadow-2xl ${isDarkMode ? 'shadow-purple-500/10' : 'shadow-purple-300/20'}`}>
              {/* Title with animated gradient */}
              <motion.h2
                className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-300% animate-gradient"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {messages?.resume?.title || "Unlock My Resume"}
              </motion.h2>

              <motion.p
                className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center mb-8`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {messages?.resume?.subtitle || "Enter the special access code to download my resume instantly!"}
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className={`w-full px-4 py-3 ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white/90 text-gray-900'} border ${
                        isError ? 'border-red-500/50' : isDarkMode ? 'border-purple-500/50' : 'border-purple-300/50'
                      } rounded-lg ${isDarkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} focus:outline-none focus:border-purple-400 transition-colors duration-300`}
                      placeholder={messages?.resume?.placeholder || "Enter Access Code"}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <motion.div
                        animate={isUnlocked ? { rotate: [0, 20, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {isUnlocked ? (
                          <FaUnlock className={`${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                        ) : (
                          <FaLock className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    Invalid access code. Please try again.
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        {isUnlocked ? <FaDownload /> : <FaKey />}
                        {isUnlocked ? "Download Resume" : "Submit Code"}
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>

              {/* Additional Info */}
              <motion.p
                className={`mt-6 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} text-center`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {messages?.resume?.noCode || "Don't have the access code?"}{" "}
                <a href="#contact" className={`${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-500 hover:text-purple-600'} transition-colors duration-300`}>
                  {messages?.resume?.contactMe || "Contact me"}
                </a>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
