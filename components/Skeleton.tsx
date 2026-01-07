"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Type of skeleton shape
 */
type SkeletonType = "text" | "circle" | "rect" | "card";

/**
 * Props for the Skeleton component
 */
interface SkeletonProps {
  /** Additional classes for the skeleton */
  className?: string;
  /** Type of skeleton shape */
  type?: SkeletonType;
  /** Width of the skeleton in pixels */
  width?: number;
  /** Height of the skeleton in pixels */
  height?: number;
  /** Number of skeleton items to render */
  count?: number;
  /** Whether to animate the skeleton */
  animated?: boolean;
  /** Base color of the skeleton */
  baseColor?: string;
  /** Highlight color for the animation */
  highlightColor?: string;
}

/**
 * Skeleton component for loading states
 */
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  type = 'text',
  width,
  height,
  count = 1,
  animated = true,
}) => {
  // Generate skeleton based on type
  const getSkeletonClasses = (): string => {
    const baseClasses = 'rounded bg-neutral-200 dark:bg-neutral-700 overflow-hidden';

    switch (type) {
      case 'circle':
        return `${baseClasses} rounded-full`;
      case 'rect':
        return `${baseClasses}`;
      case 'card':
        return `${baseClasses} w-full h-full`;
      case 'text':
      default:
        return `${baseClasses} h-4`;
    }
  };

  // Generate skeleton items
  const renderSkeletons = (): React.ReactNode[] => {
    const items: React.ReactNode[] = [];

    for (let i = 0; i < count; i++) {
      const style: React.CSSProperties = {
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : undefined,
      };

      items.push(
        <div
          key={i}
          className={`${getSkeletonClasses()} ${className} relative`}
          style={style}
        >
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/50 dark:via-neutral-600/50 to-transparent"
              animate={{
                x: ['calc(-100% - 50px)', 'calc(100% + 50px)'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </div>
      );

      // Add margin between multiple items
      if (i < count - 1) {
        items.push(<div key={`spacer-${i}`} className="h-2" />);
      }
    }

    return items;
  };

  return (
    <div className="skeleton-wrapper" aria-label="Loading content" role="status">
      {renderSkeletons()}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;
