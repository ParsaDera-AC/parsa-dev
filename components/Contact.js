"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCheck,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  // State management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  
  // Context hooks
  const { messages } = useLanguage();
  const { isDarkMode } = useTheme();

  // Memoized form submission handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  }, []);

  // Memoized input change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Memoized social links
  const socialLinks = useMemo(() => [
    {
      name: "GitHub",
      icon: <FaGithub size={20} />,
      url: "https://github.com/ParsaDera-AC",
      color: "hover:text-purple-400",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/in/parsa-dera-1360a11b3",
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      icon: <FaEnvelope size={20} />,
      url: "mailto:your.email@example.com",
      color: "hover:text-pink-400",
    },
  ], []);

  // Memoized theme-dependent styles
  const themeStyles = useMemo(() => ({
    container: isDarkMode
      ? "bg-[#1a1a1a] border-gray-800 shadow-purple-500/10"
      : "bg-white/90 border-gray-200 shadow-purple-100/50",
    text: isDarkMode ? "text-gray-400" : "text-gray-600",
    heading: isDarkMode ? "text-purple-400" : "text-purple-600",
    quickResponseBox: isDarkMode
      ? "bg-[#0f0f0f] border-gray-800 shadow-purple-500/5"
      : "bg-[#f8f5ff] border-gray-200 shadow-purple-100/50",
    input: isDarkMode
      ? "bg-gray-900/50 border-gray-700 focus:border-purple-500 text-white"
      : "bg-white/80 border-gray-300 focus:border-purple-500 text-gray-900",
  }), [isDarkMode]);

  // Early return if messages are not loaded yet
  if (!messages) {
    return null;
  }

  return (
    <section id="contact" className="relative py-24">
      {/* Subtle top border/divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="min-h-[80vh] flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className={`backdrop-blur-xl rounded-2xl p-8 border shadow-2xl ${themeStyles.container}`}
            >
              {/* Title */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-2 mb-4"
                >
                  <HiSparkles
                    className={`${themeStyles.heading} text-2xl`}
                  />
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                    {messages.contact.title}
                  </h2>
                  <HiSparkles
                    className={`${themeStyles.heading} text-2xl`}
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`${themeStyles.text} max-w-2xl mx-auto`}
                >
                  {messages.contact.subtitle}
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Side - Now on the left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col h-full justify-between"
                >
                  {/* Profile Picture */}
                  <div className="flex-none">
                    <motion.div
                      className="relative mb-8 group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Animated Border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden rounded-xl">
                        <img
                          src="/profile.jpg"
                          alt="Parsa Derakhshan"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                          loading="lazy" // Add lazy loading for better performance
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-purple-900/60 transition-colors duration-300" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex-none space-y-6">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {messages.contact.connectTitle}
                    </h3>
                    <p className={`${themeStyles.text} leading-relaxed`}>
                      {messages.contact.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-col space-y-4">
                      {socialLinks.map((link, index) => (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          } ${link.color} transition-colors duration-300`}
                          whileHover={{ x: 10 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          {link.icon}
                          <span>{link.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info - Quick Response Box */}
                  <motion.div
                    className={`mt-8 p-6 rounded-lg border backdrop-blur-sm flex-1 min-h-0 flex flex-col justify-center ${themeStyles.quickResponseBox}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <h4 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
                      {messages.contact.quickResponse}
                    </h4>
                    <p className={`${themeStyles.text} text-sm`}>
                      {messages.contact.responseMessage}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Contact Form - Now on the right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  {/* Background decoration */}
                  <motion.div
                    className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.6 }}
                  />
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.7 }}
                  />

                  <form onSubmit={handleSubmit} className="space-y-8 relative">
                    {/* Name Input */}
                    <div className="relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur transition-opacity duration-300 ${
                          activeField === "name" ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        placeholder={messages.contact.form.name}
                        className={`w-full px-6 py-4 border rounded-lg focus:outline-none focus:border-purple-400 transition-colors duration-300 relative z-10 ${themeStyles.input}`}
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur transition-opacity duration-300 ${
                          activeField === "email" ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        placeholder={messages.contact.form.email}
                        className={`w-full px-6 py-4 border rounded-lg focus:outline-none focus:border-purple-400 transition-colors duration-300 relative z-10 ${themeStyles.input}`}
                        required
                      />
                    </div>

                    {/* Message Input */}
                    <div className="relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur transition-opacity duration-300 ${
                          activeField === "message"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        placeholder={messages.contact.form.message}
                        rows={8}
                        className={`w-full px-6 py-4 border rounded-lg focus:outline-none focus:border-purple-400 transition-colors duration-300 relative z-10 resize-none ${themeStyles.input}`}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold 
                        hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 
                        focus:ring-offset-2 ${
                          isDarkMode
                            ? "focus:ring-offset-[#1a1a1a]"
                            : "focus:ring-offset-white"
                        } 
                        transition-all duration-300 relative overflow-hidden group text-lg`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isSubmitted}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <motion.div
                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        ) : isSubmitted ? (
                          <>
                            <FaCheck className="text-xl" />
                            Sent Successfully!
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="text-xl" />
                            {messages.contact.form.submit}
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
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
