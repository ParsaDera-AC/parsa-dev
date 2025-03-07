"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const AmbientBackground = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Memoize particle configuration to avoid recreating on each render
  const getParticleConfig = useCallback((isDarkMode) => {
    // Enhanced color palette
    const primaryColor = isDarkMode ? "#a855f7" : "#4f46e5"; // Brighter purple for dark, indigo for light
    const secondaryColor = isDarkMode ? "#ec4899" : "#8b5cf6"; // Pink for dark, purple for light
    const tertiaryColor = isDarkMode ? "#8b5cf6" : "#6366f1"; // Purple for dark, indigo for light
    
    return {
      fullScreen: {
        enable: false,
      },
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      particles: {
        number: { 
          value: 80, // Increased for more visual impact
          density: { enable: true, value_area: 800 } 
        },
        color: {
          value: [primaryColor, secondaryColor, tertiaryColor], // Multiple colors
        },
        shape: { 
          type: ["circle", "triangle", "polygon"], // Multiple shapes
          polygon: { nb_sides: 6 }, // Hexagons
        },
        opacity: { 
          value: isDarkMode ? 0.5 : 0.3, // Increased opacity
          random: true,
          anim: {
            enable: true,
            speed: 0.2,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: { 
          value: { min: 1, max: 5 }, // Varied sizes
          random: true,
          anim: {
            enable: true,
            speed: 1,
            size_min: 0.5,
            sync: false
          }
        },
        links: {
          enable: true,
          distance: 150,
          color: isDarkMode ? "#a855f7" : "#4f46e5",
          opacity: isDarkMode ? 0.3 : 0.2,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 1.2, // Faster movement
          direction: "none",
          random: true,
          straight: false,
          out_mode: "bounce", // Bounce off edges
          bounce: true,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        },
        twinkle: { // Add twinkling effect
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1
          }
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: ["grab", "bubble"]
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
            links: {
              opacity: isDarkMode ? 0.8 : 0.5, // More visible connections
              color: isDarkMode ? "#ec4899" : "#8b5cf6" // Different color for connections
            }
          },
          bubble: {
            distance: 200,
            size: 12,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    };
  }, []);

  // Initialize particles only once
  useEffect(() => {
    const initParticles = async () => {
      await loadFull(tsParticles);
      
      containerRef.current = await tsParticles.load(
        "tsparticles", 
        getParticleConfig(isDarkMode)
      );
      
      setMounted(true);
    };

    initParticles();

    return () => {
      if (containerRef.current) {
        containerRef.current.destroy();
      }
    };
  }, [getParticleConfig, isDarkMode]);

  // Update particles when theme changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const primaryColor = isDarkMode ? "#a855f7" : "#4f46e5";
      const secondaryColor = isDarkMode ? "#ec4899" : "#8b5cf6";
      const tertiaryColor = isDarkMode ? "#8b5cf6" : "#6366f1";
      
      // Safely update options with null checks
      if (container.options.particles?.color) {
        container.options.particles.color.value = [primaryColor, secondaryColor, tertiaryColor];
      }
      
      if (container.options.particles?.links) {
        container.options.particles.links.color = isDarkMode ? "#a855f7" : "#4f46e5";
        container.options.particles.links.opacity = isDarkMode ? 0.3 : 0.2;
      }
      
      if (container.options.particles?.opacity) {
        container.options.particles.opacity.value = isDarkMode ? 0.5 : 0.3;
      }

      if (container.options.interactivity?.modes?.grab?.links) {
        container.options.interactivity.modes.grab.links.opacity = isDarkMode ? 0.8 : 0.5;
        container.options.interactivity.modes.grab.links.color = isDarkMode ? "#ec4899" : "#8b5cf6";
      }

      // Force refresh the particles
      container.refresh();
    } catch (error) {
      console.error("Error updating particles:", error);
    }
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Enhanced gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-700 ${
        isDarkMode 
          ? 'from-black via-purple-950/5 to-black/90'
          : 'from-indigo-50 via-white to-purple-50/30'
      }`} />
      
      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isDarkMode ? 'opacity-30' : 'opacity-10'}`}>
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-radial from-indigo-500/5 via-transparent to-transparent animate-pulse-slower" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Animated mesh grid (only in dark mode) */}
      {isDarkMode && (
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      )}
      
      {/* Floating orbs */}
      {mounted && (
        <>
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/5 blur-3xl"
            animate={{
              x: ['-10%', '5%', '-5%'],
              y: ['-5%', '10%', '-10%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{ top: '20%', left: '15%' }}
          />
          
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600/10 to-purple-600/5 blur-3xl"
            animate={{
              x: ['5%', '-10%', '10%'],
              y: ['10%', '-5%', '5%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{ bottom: '10%', right: '15%' }}
          />
        </>
      )}

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

export default React.memo(AmbientBackground);