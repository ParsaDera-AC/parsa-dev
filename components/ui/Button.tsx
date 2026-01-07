"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "type"> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  type?: ButtonType;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  animated = true,
  className = "",
  onClick,
  href,
  type = "button",
  isActive = false,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  // Determine size classes
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-2.5 text-lg",
    xl: "px-8 py-3 text-xl"
  };

  // Determine variant classes
  const getVariantClasses = (): string => {
    const baseClasses = "font-medium rounded-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
    const hoverClasses = animated ? "hover:-translate-y-0.5 active:translate-y-0" : "";

    // Disabled state overrides all variants
    if (disabled) {
      return `${baseClasses} bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed`;
    }

    // Different variants
    switch (variant) {
      case "primary":
        return `${baseClasses} ${hoverClasses} bg-primary-600 hover:bg-primary-700 text-white focus-visible:outline-primary-600 shadow-md hover:shadow-lg`;
      case "secondary":
        return `${baseClasses} ${hoverClasses} bg-secondary-500 hover:bg-secondary-600 text-white focus-visible:outline-secondary-500 shadow-md hover:shadow-lg`;
      case "accent":
        return `${baseClasses} ${hoverClasses} bg-accent-500 hover:bg-accent-600 text-white focus-visible:outline-accent-500 shadow-md hover:shadow-lg`;
      case "outline":
        return `${baseClasses} ${hoverClasses} bg-transparent border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus-visible:outline-primary-500`;
      case "ghost":
        return `${baseClasses} ${hoverClasses} bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus-visible:outline-neutral-400`;
      case "link":
        return `${baseClasses} text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline underline-offset-4 px-0 py-0 focus-visible:outline-primary-500`;
      default:
        return `${baseClasses} ${hoverClasses} bg-primary-600 hover:bg-primary-700 text-white focus-visible:outline-primary-600 shadow-md hover:shadow-lg`;
    }
  };

  // Combine all classes
  const buttonClasses = `
    ${getVariantClasses()}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${isActive ? 'ring-2 ring-primary-500 ring-offset-1 dark:ring-primary-400' : ''}
    ${className}
    inline-flex items-center justify-center gap-2
  `;

  // Define loading spinner
  const loadingSpinner = (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Create motion variants
  const variants = {
    hover: animated ? { y: -2, boxShadow: isDarkMode ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" } : {},
    tap: animated ? { y: 0, boxShadow: isDarkMode ? "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)" } : {},
    initial: { y: 0 }
  };

  // Render as anchor if href is provided
  if (href) {
    return (
      <motion.a
        href={disabled ? undefined : href}
        className={buttonClasses}
        initial="initial"
        whileHover={disabled ? {} : "hover"}
        whileTap={disabled ? {} : "tap"}
        variants={variants}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...(props as HTMLMotionProps<"a">)}
      >
        {loading && loadingSpinner}
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </motion.a>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      initial="initial"
      whileHover={disabled ? {} : "hover"}
      whileTap={disabled ? {} : "tap"}
      variants={variants}
      {...props}
    >
      {loading && loadingSpinner}
      {leftIcon && !loading && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </motion.button>
  );
};

export default Button;
