"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

// Stars component for the background
function Stars(props) {
  const ref = useRef();
  const { camera } = useThree();
  const [sphere] = React.useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    // Make stars follow mouse movement slightly
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (mouseY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          style={{
            background: isDarkMode
              ? "radial-gradient(circle at center, #1a1a2e 0%, #0a0a1a 100%)"
              : "radial-gradient(circle at center, #f0f0ff 0%, #ffffff 100%)",
          }}
        >
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-7xl font-bold">
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r ${
                    isDarkMode
                      ? "from-blue-400 via-purple-400 to-pink-400"
                      : "from-blue-600 via-purple-600 to-pink-600"
                  }`}
                >
                  {messages?.hero?.greeting || "Hi, I'm Parsa Derakhshan"}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <p
                className={`text-xl sm:text-2xl ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span>A passionate </span>
                <span
                  className={`font-medium bg-clip-text text-transparent bg-gradient-to-r ${
                    isDarkMode
                      ? "from-blue-400 via-purple-400 to-pink-400"
                      : "from-blue-600 via-purple-600 to-pink-600"
                  }`}
                >
                  Full-Stack Developer
                </span>
                <span> crafting beautiful digital experiences</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <motion.a
                href="#projects"
                className={`px-8 py-3 rounded-full bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-500 via-purple-500 to-pink-500"
                    : "from-blue-600 via-purple-600 to-pink-600"
                } text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {messages?.hero?.viewWork || "View My Work"}
              </motion.a>
              <motion.a
                href="#contact"
                className={`px-8 py-3 rounded-full border-2 transition-all duration-300 ${
                  isDarkMode
                    ? "border-purple-400 text-purple-300 hover:bg-purple-500/20"
                    : "border-purple-600 text-purple-700 hover:bg-purple-500/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {messages?.hero?.contact || "Get In Touch"}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center space-x-6"
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.2, rotate: -5 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:example@example.com"
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <HiMail size={24} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
