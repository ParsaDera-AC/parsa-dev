"use client";

import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactMe = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dulypfd", // Replace with your EmailJS service ID
        "template_rjm25rd", // Replace with your EmailJS template ID
        formRef.current,
        "HCKDydlJLoxHArG4Z" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log("Message Sent:", result.text);
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error("Error:", error.text);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  const snowParticlesOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "bottom",
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 overflow-hidden flex items-center"
    >
      {/* Snow Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={snowParticlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden shadow-xl 
                     bg-zinc-800 text-white border border-zinc-700 hover:shadow-purple-500/50 transform transition-all duration-500 hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Picture Section */}
          <div className="md:w-1/3 flex items-center justify-center bg-zinc-700 overflow-hidden">
            <img
              src="/profile.jpg"
              alt="ParsaPFP"
              className="w-auto h-full object-cover transform scale-80"
            />
          </div>

          {/* Contact Form Section */}
          <div className="md:w-2/3 p-8 space-y-6">
            {/* Title */}
            <h2 className="text-2xl font-bold text-center">Contact Me</h2>
            <p className="text-sm text-gray-300 text-center">
              Interested in working together or need my resume? Fill out the
              form below!
            </p>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  placeholder="Your Full Name"
                  className="w-full mt-1 p-3 
                             bg-zinc-700 
                             border border-zinc-600 
                             rounded-lg 
                             focus:ring-2 focus:ring-gray-500 
                             focus:outline-none 
                             placeholder-gray-400 
                             text-white"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  placeholder="youremail@example.com"
                  className="w-full mt-1 p-3 
                             bg-zinc-700 
                             border border-zinc-600 
                             rounded-lg 
                             focus:ring-2 focus:ring-gray-500 
                             focus:outline-none 
                             placeholder-gray-400 
                             text-white"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your Message..."
                  className="w-full mt-1 p-3 
                             bg-zinc-700 
                             border border-zinc-600 
                             rounded-lg 
                             focus:ring-2 focus:ring-gray-500 
                             focus:outline-none 
                             placeholder-gray-400 
                             text-white"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  type="submit"
                  className="relative inline-flex items-center justify-center
                             px-8 py-3 font-bold 
                             text-white 
                             bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                             rounded-full shadow-lg
                             hover:opacity-90 transition-opacity 
                             duration-300"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(255, 105, 180, 0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
