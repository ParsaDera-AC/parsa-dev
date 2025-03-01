"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AmbientBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: { value: "#000000" },
    },
    particles: {
      number: { value: 10, density: { enable: true, value_area: 800 } },
      color: {
        value: ["#6366f1", "#a855f7", "#ec4899"], // Indigo, Purple, Pink
      },
      shape: { 
        type: "circle",
      },
      opacity: { 
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.2,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: { 
        value: 100,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 50,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      },
      blur: {
        enable: true,
        value: 10
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    retina_detect: true
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black opacity-80" />
      
      {/* Animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10%] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/3 right-1/4 w-full h-full bg-gradient-to-l from-purple-500/10 to-transparent rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-full h-full bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full filter blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
      </div>

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0"
      />
    </div>
  );
};

// CSS for scrolling lines (inlined for simplicity, or add to a global CSS file)
const styles = `
  @keyframes scroll-lines {
    0% { transform: translateY(-100vh); opacity: 0.5; }
    50% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0.5; }
  }

  .animate-scroll-lines {
    animation: scroll-lines 10s linear infinite;
  }

  .delay-1000 {
    animation-delay: 1s;
  }

  .delay-2000 {
    animation-delay: 2s;
  }
`;

export default AmbientBackground;