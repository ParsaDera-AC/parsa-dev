"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

/**
 * Direction of the scroll reveal animation
 */
type ScrollRevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

/**
 * Type of animation easing
 */
type ScrollRevealAnimationType = "spring" | "tween" | "inertia";

/**
 * Props for the ScrollReveal component
 */
interface ScrollRevealProps {
  /** Child elements to animate */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Direction of animation */
  direction?: ScrollRevealDirection;
  /** Distance to animate from (pixels) */
  distance?: number;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Duration of animation (seconds) */
  duration?: number;
  /** Whether to animate only once or every time the element enters viewport */
  once?: boolean;
  /** Threshold of element visibility required (0-1) */
  threshold?: number;
  /** Type of animation */
  type?: ScrollRevealAnimationType;
  /** Whether to cascade animation to children */
  cascade?: boolean;
  /** Delay between children animations (seconds) */
  staggerChildren?: number;
  /** Disable animations */
  disabled?: boolean;
}

/**
 * ScrollReveal - Animate elements when they enter the viewport
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: threshold,
    once: once
  });
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // Determine the initial and animate values based on direction
  const getDirectionalValues = (): { x?: number; y?: number; scale?: number; opacity: number } => {
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
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
