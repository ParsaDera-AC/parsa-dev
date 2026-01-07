"use client";

import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope, FaCheck, FaArrowRight } from "react-icons/fa";
import { useTheme } from "@/context";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ParsaDera-AC';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://linkedin.com/in/parsa-dera-1360a11b3';
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'contact@parsaderakhshan.com';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const socialLinks = [
    { icon: <FaGithub size={22} />, url: GITHUB_URL, label: "GitHub", color: "group-hover:text-white" },
    { icon: <FaLinkedin size={22} />, url: LINKEDIN_URL, label: "LinkedIn", color: "group-hover:text-blue-400" },
    { icon: <FaEnvelope size={22} />, url: `mailto:${EMAIL}`, label: "Email", color: "group-hover:text-indigo-400" },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className={`absolute -top-20 left-[15%] w-64 h-64 rounded-full border ${
          isDarkMode ? 'border-emerald-500/10' : 'border-emerald-300/20'
        }`}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute bottom-32 -right-24 w-80 h-80 rounded-full border-2 border-dashed ${
          isDarkMode ? 'border-indigo-500/10' : 'border-indigo-300/15'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute top-[25%] right-[8%] w-5 h-5 ${
          isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-400/30'
        }`}
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: [0, -180, -360], y: [-10, 10, -10] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bottom-[35%] left-[5%] w-3 h-3 rounded-full ${
          isDarkMode ? 'bg-purple-500/25' : 'bg-purple-400/35'
        }`}
        animate={{ y: [10, -10, 10], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`absolute top-[50%] left-[20%] w-2 h-2 rounded-full ${
          isDarkMode ? 'bg-indigo-500/30' : 'bg-indigo-400/40'
        }`}
        animate={{ x: [-8, 8, -8], y: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase mb-4
            ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="w-8 h-px bg-current" />
            Let's Talk
            <span className="w-8 h-px bg-current" />
          </span>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Touch</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-4
                ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Let's Connect
              </h3>
              <p className={`leading-relaxed mb-6
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm always open to discussing new opportunities, creative ideas,
                or partnerships. Drop me a message and I'll get back to you promptly.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className={`group flex items-center gap-4 p-4 rounded-xl transition-colors
                    ${isDarkMode
                      ? 'bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800'
                      : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
                >
                  <div className={`p-3 rounded-lg transition-colors
                    ${isDarkMode
                      ? 'bg-gray-800 text-gray-400 group-hover:bg-indigo-500/20'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-indigo-100'}`}>
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-medium block
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {link.label}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Click to connect
                    </span>
                  </div>
                  <FaArrowRight className={`text-sm transition-colors
                    ${isDarkMode ? 'text-gray-600 group-hover:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600'}`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className={`p-8 rounded-3xl border
              ${isDarkMode ? 'bg-gray-900/30 border-gray-800' : 'bg-white border-gray-200'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={`w-full px-4 py-3.5 rounded-xl transition-all outline-none
                        ${isDarkMode
                          ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={`w-full px-4 py-3.5 rounded-xl transition-all outline-none
                        ${isDarkMode
                          ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className={`w-full px-4 py-3.5 rounded-xl transition-all outline-none resize-none
                      ${isDarkMode
                        ? 'bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all
                    ${isSubmitted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'}`}
                >
                  {isSubmitted ? (
                    <>
                      <FaCheck size={18} />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <FaPaperPlane size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
