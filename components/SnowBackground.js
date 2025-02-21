"use client";

import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const SnowBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
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

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={snowParticlesOptions}
      className="absolute inset-0 z-0"
    />
  );
};

export default SnowBackground;