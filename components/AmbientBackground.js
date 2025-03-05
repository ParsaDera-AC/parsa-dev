"use client";

import React, { useRef, useEffect } from "react";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useTheme } from "@/context/ThemeContext";

const AmbientBackground = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);

  useEffect(() => {
    const initParticles = async () => {
      await loadFull(tsParticles);
      
      containerRef.current = await tsParticles.load("tsparticles", {
        background: {
          color: { value: "transparent" },
        },
        particles: {
          number: { value: 70, density: { enable: true, value_area: 800 } },
          color: {
            value: isDarkMode ? "#a855f7" : "#1f2937",
          },
          shape: { 
            type: "circle",
          },
          opacity: { 
            value: isDarkMode ? 0.3 : 0.15,
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
            color: isDarkMode ? "#a855f7" : "#1f2937",
            opacity: isDarkMode ? 0.18 : 0.12,
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
                opacity: isDarkMode ? 0.5 : 0.25
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    };

    initParticles();

    return () => {
      if (containerRef.current) {
        containerRef.current.destroy();
      }
    };
  }, []); // Initialize only once

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const color = isDarkMode ? "#a855f7" : "#1f2937";
      
      // Safely update options with null checks
      if (container.options.particles?.color) {
        container.options.particles.color.value = color;
      }
      
      if (container.options.particles?.links) {
        container.options.particles.links.color = color;
        container.options.particles.links.opacity = isDarkMode ? 0.18 : 0.12;
      }
      
      if (container.options.particles?.opacity) {
        container.options.particles.opacity.value = isDarkMode ? 0.3 : 0.15;
      }

      if (container.options.interactivity?.modes?.grab?.links) {
        container.options.interactivity.modes.grab.links.opacity = isDarkMode ? 0.5 : 0.25;
      }

      // Update all existing particles using the proper method
      const particles = container.particles.array || [];
      particles.forEach(particle => {
        if (particle.color) {
          particle.color.value = color;
        }
        if (particle.links) {
          particle.links.color = color;
        }
        if (particle.opacity) {
          particle.opacity.value = isDarkMode ? 0.3 : 0.15;
        }
      });

      // Force refresh the particles
      container.refresh();
    } catch (error) {
      console.error("Error updating particles:", error);
    }
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
        isDarkMode 
          ? 'from-black via-black to-purple-950/10'
          : 'from-white via-white to-gray-50'
      }`} />
      
      {/* Very subtle vignette effect */}
      <div className={`absolute inset-0 bg-radial-gradient transition-opacity duration-300 ${
        isDarkMode ? 'opacity-40' : 'opacity-5'
      }`} />

      {/* Container for particles */}
      <div id="tsparticles" className="absolute inset-0 pointer-events-auto" />
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