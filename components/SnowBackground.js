"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const SnowBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const colorfulParticlesOptions = {
    background: {
      color: { value: "#000000" },
    },
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"], // Red, Green, Blue, Yellow, Magenta
        animation: {
          enable: true,
          speed: 20,
          sync: true,
        },
      },
      shape: { type: "circle" },
      opacity: { value: 0.7, random: true },
      size: { value: 4, random: true },
      move: { enable: true, speed: 1, direction: "bottom", out_mode: "out", random: true },
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    retina_detect: true,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={colorfulParticlesOptions}
        className="absolute inset-0 z-0"
      />
      {/* Scrolling Horizontal Line Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-scroll-lines"></div>
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-scroll-lines delay-1000"></div>
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-scroll-lines delay-2000"></div>
        </div>
      </div>
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

export default SnowBackground;