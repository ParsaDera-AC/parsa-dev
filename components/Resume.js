"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // Load only necessary modules
import sha256 from "js-sha256";

const Resume = () => {
  const [accessCode, setAccessCode] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [isValidCode, setIsValidCode] = useState(false);
  let timeoutId;

  // Particle Config
  const particlesInit = async (main) => {
    await loadFull(main); // Load a lighter version
  };

  const snowParticlesOptions = {
    background: {
      color: { value: "#000000" },
    },
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.7, random: true },
      size: { value: 3, random: true },
      move: { enable: true, speed: 1, direction: "bottom", out_mode: "out" },
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    retina_detect: true,
  };

  // Securely store this hash on the backend
  const hashedCorrectCode = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd233e6e5a0ef6bfe6e";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sha256(accessCode) === hashedCorrectCode) {
      setIsValidCode(true);
      setFeedbackMessage("✅ Download unlocked! Click below.");
    } else {
      setFeedbackMessage("❌ Incorrect code. Try again.");
      setIsValidCode(false);
    }

    // Clear message after 2 seconds
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setFeedbackMessage(null);
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      {/* Snow Effect */}
      <Particles id="tsparticles" init={particlesInit} options={snowParticlesOptions} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="container mx-auto px-8 relative z-10 text-center">
        <motion.div
          className="bg-zinc-900 rounded-2xl p-10 shadow-2xl border border-gray-800 hover:shadow-purple-500/50 transform transition-all duration-500 hover:scale-105 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Title */}
          <motion.h2
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Unlock My Resume
          </motion.h2>

          <p className="text-gray-400 mb-6">Enter the special access code to download my resume instantly!</p>

          {/* Feedback Message */}
          {feedbackMessage && (
            <motion.p
              className={`text-sm mb-4 ${
                isValidCode ? "text-green-400" : "text-red-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {feedbackMessage}
            </motion.p>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              required
            />
            <motion.button
              type="submit"
              className="w-full px-8 py-3 font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236, 72, 153, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Code
            </motion.button>
          </form>

          {/* Download Button */}
          {isValidCode && (
            <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <a
                href="/Resume.pdf"
                download="ParsaDerakhshan_Resume.pdf"
                className="w-full inline-block px-8 py-3 font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Download Resume
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
