"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

type CardVariant = "default" | "elevated" | "flat" | "glass";
type CardColor = "primary" | "secondary" | "accent" | "purple" | "pink" | "indigo" | "blue" | "green" | "yellow" | "red";

interface CardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  compact?: boolean;
  variant?: CardVariant;
  color?: CardColor;
  fullWidth?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  title,
  subtitle,
  hoverable = true,
  bordered = true,
  className = "",
  onClick,
  compact = false,
  variant = "default",
  color,
  fullWidth = false,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  // Get variant-specific classes
  const getVariantClasses = (): string => {
    const baseClasses = "rounded-xl overflow-hidden";

    switch (variant) {
      case "elevated":
        return isDarkMode
          ? `${baseClasses} bg-neutral-900 shadow-lg shadow-black/30`
          : `${baseClasses} bg-white shadow-lg shadow-neutral-200/80`;
      case "flat":
        return isDarkMode
          ? `${baseClasses} bg-neutral-900`
          : `${baseClasses} bg-neutral-50`;
      case "glass":
        return isDarkMode
          ? `${baseClasses} glass-dark backdrop-blur-md`
          : `${baseClasses} glass backdrop-blur-md`;
      default:
        return isDarkMode
          ? `${baseClasses} bg-neutral-900 shadow-md shadow-black/20`
          : `${baseClasses} bg-white shadow-md shadow-neutral-200/60`;
    }
  };

  // Get border classes
  const getBorderClasses = (): string => {
    if (!bordered) return '';

    if (color) {
      // Use safe, non-interpolated class names
      const colorMap: Record<CardColor, string> = {
        primary: isDarkMode ? 'border-primary-600/30' : 'border-primary-500/20',
        secondary: isDarkMode ? 'border-secondary-600/30' : 'border-secondary-500/20',
        accent: isDarkMode ? 'border-accent-600/30' : 'border-accent-500/20',
        purple: isDarkMode ? 'border-purple-600/30' : 'border-purple-500/20',
        pink: isDarkMode ? 'border-pink-600/30' : 'border-pink-500/20',
        indigo: isDarkMode ? 'border-indigo-600/30' : 'border-indigo-500/20',
        blue: isDarkMode ? 'border-blue-600/30' : 'border-blue-500/20',
        green: isDarkMode ? 'border-green-600/30' : 'border-green-500/20',
        yellow: isDarkMode ? 'border-yellow-600/30' : 'border-yellow-500/20',
        red: isDarkMode ? 'border-red-600/30' : 'border-red-500/20',
      };

      return `border ${colorMap[color] || (isDarkMode ? 'border-neutral-800' : 'border-neutral-200')}`;
    }

    return `border ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`;
  };

  // Set padding based on compact prop
  const paddingClasses = compact
    ? 'p-3'
    : 'p-5';

  // Combine all classes
  const cardClasses = `
    ${getVariantClasses()}
    ${getBorderClasses()}
    ${onClick ? 'cursor-pointer' : ''}
    ${fullWidth ? 'w-full' : ''}
    transition-all duration-300
    ${className}
  `;

  // Card header component (if provided)
  const CardHeader = header || (title || subtitle) ? (
    <div className={`${compact ? 'mb-2' : 'mb-4'}`}>
      {header || (
        <>
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {subtitle && <div className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{subtitle}</div>}
        </>
      )}
    </div>
  ) : null;

  // Card footer component (if provided)
  const CardFooter = footer ? (
    <div className={`${compact ? 'mt-2' : 'mt-4'} ${isDarkMode ? 'border-t border-neutral-800' : 'border-t border-neutral-200'} pt-4`}>
      {footer}
    </div>
  ) : null;

  // Hover animation variants
  const hoverVariants = {
    hover: hoverable ? {
      y: -5,
      boxShadow: isDarkMode
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.2)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)"
    } : {},
    tap: hoverable ? {
      y: -2,
      boxShadow: isDarkMode
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)"
    } : {},
    initial: {}
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      whileHover="hover"
      whileTap={onClick ? "tap" : ""}
      initial="initial"
      variants={hoverVariants}
      {...props}
    >
      <div className={paddingClasses}>
        {CardHeader}
        <div className="card-body">
          {children}
        </div>
        {CardFooter}
      </div>
    </motion.div>
  );
};

export default Card;
