import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';

interface StaggeredRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function StaggeredReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  once = true
}: StaggeredRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-50px",
    amount: 0.2
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  // Convert children to array if it's not already
  const childrenArray = React.Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={getInitialPosition()}
          animate={isInView ? getAnimatePosition() : getInitialPosition()}
          transition={{
            duration,
            delay: index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94] // Smoother easing
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}