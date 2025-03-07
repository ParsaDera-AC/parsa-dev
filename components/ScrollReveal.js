"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/**
 * ScrollReveal - Animate elements when they enter the viewport
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.direction - Direction of animation ("up", "down", "left", "right")
 * @param {number} props.distance - Distance to animate from (pixels)
 * @param {number} props.delay - Delay before animation starts (seconds)
 * @param {number} props.duration - Duration of animation (seconds)
 * @param {boolean} props.once - Whether to animate only once or every time the element enters viewport
 * @param {number} props.threshold - Threshold of element visibility required (0-1)
 * @param {"spring"|"tween"|"inertia"} props.type - Type of animation
 * @param {boolean} props.cascade - Whether to cascade animation to children
 * @param {number} props.staggerChildren - Delay between children animations (seconds)
 * @param {boolean} props.disabled - Disable animations
 */
const ScrollReveal = ({
  children,
  className = "",
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  type = "tween",
  cascade = false,
  staggerChildren = 0.1,
  disabled = false,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { 
    threshold: threshold,
    // If once is false, we need to reset when out of view
    once: once
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Determine the initial and animate values based on direction
  const getDirectionalValues = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      case "scale":
        return { scale: 0.8, opacity: 0 };
      case "fade":
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  // Animation variants
  const variants = {
    hidden: getDirectionalValues(),
    visible: { 
      y: 0, 
      x: 0, 
      scale: 1, 
      opacity: 1,
      transition: {
        type: type,
        duration: duration,
        delay: delay,
        staggerChildren: cascade ? staggerChildren : 0,
        delayChildren: cascade ? delay : 0,
      }
    }
  };

  // Trigger animation when in view
  useEffect(() => {
    if (disabled) return;

    if (inView && (!once || !hasAnimated)) {
      controls.start("visible");
      if (once) setHasAnimated(true);
    } else if (!once && !inView) {
      controls.start("hidden");
    }
  }, [controls, inView, once, hasAnimated, disabled]);

  // Server-side rendering check
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If disabled or not mounted yet, render without animation
  if (disabled || !isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal; 