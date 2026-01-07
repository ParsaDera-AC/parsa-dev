"use client";

import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUnlock, FaDownload, FaFileAlt } from 'react-icons/fa';
import { useLanguage, useTheme } from '@/context';

const RESUME_ACCESS_CODE = process.env.NEXT_PUBLIC_RESUME_ACCESS_CODE ?? '';

const Resume: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (accessCode === RESUME_ACCESS_CODE) {
      setIsUnlocked(true);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAccessCode(e.target.value);
    if (isError) setIsError(false);
  };

  if (!messages) {
    return null;
  }

  return (
    <section id="resume" className="relative py-32 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className={`absolute -top-16 right-[25%] w-52 h-52 rounded-full border ${
          isDarkMode ? 'border-amber-500/10' : 'border-amber-300/20'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute bottom-10 -left-20 w-60 h-60 rounded-full border-2 border-dashed ${
          isDarkMode ? 'border-indigo-500/10' : 'border-indigo-300/15'
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute top-[40%] left-[8%] w-4 h-4 rounded-full ${
          isDarkMode ? 'bg-amber-500/20' : 'bg-amber-400/30'
        }`}
        animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bottom-[30%] right-[10%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] ${
          isDarkMode ? 'border-b-purple-500/15' : 'border-b-purple-400/25'
        }`}
        animate={{ rotate: [0, 180, 360], y: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className={`absolute top-[20%] right-[15%] w-2 h-2 rounded-full ${
          isDarkMode ? 'bg-indigo-500/25' : 'bg-indigo-400/35'
        }`}
        animate={{ x: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase mb-4
            ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="w-8 h-px bg-current" />
            Exclusive Access
            <span className="w-8 h-px bg-current" />
          </span>
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Unlock My
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Resume</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {messages?.resume?.subtitle || "Enter the special access code to download my resume instantly."}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className={`relative p-8 rounded-3xl border overflow-hidden
            ${isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>

            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={isUnlocked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-2xl ${isUnlocked
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : isDarkMode
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'bg-indigo-100 text-indigo-600'}`}
              >
                {isUnlocked ? <FaUnlock size={28} /> : <FaFileAlt size={28} />}
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Input */}
              <div>
                <label className={`block text-sm font-medium mb-2
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Access Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={accessCode}
                    onChange={handleInputChange}
                    placeholder={messages?.resume?.placeholder || "Enter your code"}
                    disabled={isUnlocked}
                    className={`w-full px-4 py-3.5 pr-12 rounded-xl transition-all outline-none
                      ${isError
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : isUnlocked
                          ? isDarkMode
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-emerald-50 border border-emerald-300 text-emerald-600'
                          : isDarkMode
                            ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isUnlocked ? (
                      <FaUnlock className="text-emerald-400" size={16} />
                    ) : (
                      <FaLock className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={16} />
                    )}
                  </div>
                </div>
              </div>

              {/* Error message */}
              {isError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  Invalid access code. Please try again.
                </motion.p>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading || (isUnlocked && !accessCode)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
                  ${isUnlocked
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying...
                  </span>
                ) : isUnlocked ? (
                  <>
                    <FaDownload size={16} />
                    Download Resume
                  </>
                ) : (
                  <>
                    <FaLock size={14} />
                    Unlock Resume
                  </>
                )}
              </motion.button>
            </form>

            {/* Helper text */}
            <p className={`mt-6 text-sm text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {messages?.resume?.noCode || "Don't have the access code?"}{" "}
              <a
                href="#contact"
                className={`font-medium transition-colors
                  ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'}`}
              >
                {messages?.resume?.contactMe || "Contact me"}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Resume);
