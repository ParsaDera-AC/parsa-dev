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
      color: { value: "transparent" },
    },
    particles: {
      number: { value: 70, density: { enable: true, value_area: 800 } },
      color: {
        value: "#a855f7",
      },
      shape: { 
        type: "circle",
      },
      opacity: { 
        value: 0.3,
        random: false,
      },
      size: { 
        value: 2,
        random: true,
        anim: {
          enable: false,
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#a855f7",
        opacity: 0.18,
        width: 2
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,
          line_linked: {
            opacity: 0.5
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-950/10" />
      
      {/* Very subtle vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40" />

      {/* Interactive particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 pointer-events-auto"
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