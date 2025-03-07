"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton component for loading states
 * @param {Object} props - Component props
 * @param {string} props.className - Additional classes for the skeleton
 * @param {string} props.type - Type of skeleton (text, circle, rect, card)
 * @param {number} props.width - Width of the skeleton
 * @param {number} props.height - Height of the skeleton
 * @param {number} props.count - Number of skeleton items to render
 * @param {boolean} props.animated - Whether to animate the skeleton
 * @param {string} props.baseColor - Base color of the skeleton
 * @param {string} props.highlightColor - Highlight color for the animation
 */
const Skeleton = ({
  className = '',
  type = 'text',
  width,
  height,
  count = 1,
  animated = true,
  baseColor,
  highlightColor,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add short delay to prevent flashing on fast loads
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate skeleton based on type
  const getSkeletonClasses = () => {
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
  const renderSkeletons = () => {
    const items = [];
    
    for (let i = 0; i < count; i++) {
      const style = {
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