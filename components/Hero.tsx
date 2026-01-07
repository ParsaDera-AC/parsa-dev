"use client";

import React, { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { useTheme } from "@/context";
import Image from "next/image";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ParsaDera-AC';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/parsa-dera-1360a11b3';

const Hero: React.FC = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen overflow-hidden"
    >

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase
                ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                <span className="w-12 h-px bg-current" />
                Software Engineer
              </span>
            </motion.div>

            {/* Main heading - Large elegant typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className={`block text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight
                ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Crafting
              </span>
              <span className={`block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mt-1
                ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Digital
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"> Experiences</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg lg:text-xl leading-relaxed mb-10 max-w-lg
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              I'm <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Parsa Derakhshan</strong>,
              a full-stack developer specializing in building exceptional digital experiences
              that live at the intersection of design and technology.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white font-medium rounded-full overflow-hidden transition-shadow
                  hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <span className="relative z-10">Explore My Work</span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 font-medium rounded-full border-2 transition-colors
                  ${isDarkMode
                    ? 'border-gray-700 text-white hover:bg-white/5'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'}`}
              >
                Get In Touch
              </motion.a>

              <div className="flex items-center gap-2 ml-4">
                <motion.a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-3 rounded-full transition-colors
                    ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <FaGithub size={22} />
                </motion.a>
                <motion.a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-3 rounded-full transition-colors
                    ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <FaLinkedin size={22} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual element - Avatar + Code card composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main avatar with elegant frame */}
              <div className="relative">
                {/* Decorative ring */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${isDarkMode ? '#4f46e5' : '#818cf8'} 0%, transparent 50%, ${isDarkMode ? '#7c3aed' : '#a78bfa'} 100%)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Avatar container */}
                <div className={`relative rounded-2xl overflow-hidden aspect-[4/5]
                  ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-1`}>
                  <Image
                    src="/Avatar5.jpg"
                    alt="Parsa Derakhshan"
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>

                {/* Floating code card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`absolute -right-4 lg:-right-12 bottom-12 w-72
                    ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}
                    backdrop-blur-xl rounded-xl border shadow-2xl
                    ${isDarkMode ? 'border-gray-800 shadow-black/50' : 'border-gray-200 shadow-gray-200/50'}`}
                >
                  {/* Terminal header */}
                  <div className={`flex items-center gap-2 px-4 py-3 border-b
                    ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className={`ml-2 text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      developer.ts
                    </span>
                  </div>

                  {/* Code content */}
                  <div className="p-4 font-mono text-sm">
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">parsa</span>{' '}
                      <span className="text-pink-400">=</span>{' '}
                      <span className="text-yellow-400">{'{'}</span>
                    </div>
                    <div className={`pl-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-blue-400">role</span>:{' '}
                      <span className="text-green-400">"Full-Stack Dev"</span>,
                    </div>
                    <div className={`pl-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-blue-400">focus</span>:{' '}
                      <span className="text-green-400">"Web & Cloud"</span>,
                    </div>
                    <div className={`pl-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="text-blue-400">coffee</span>:{' '}
                      <span className="text-orange-400">Infinity</span>
                    </div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      <span className="text-yellow-400">{'}'}</span>;
                      <span className="animate-pulse ml-1">|</span>
                    </div>
                  </div>
                </motion.div>

                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className={`absolute -left-4 lg:-left-8 top-12 px-5 py-3 rounded-xl
                    ${isDarkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'}
                    backdrop-blur-xl border shadow-xl`}
                >
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3+</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Exp.</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`flex flex-col items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
        >
          <span className="text-sm font-medium">Scroll</span>
          <FaChevronDown size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default memo(Hero);
