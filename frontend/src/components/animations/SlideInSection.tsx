import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SlideInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right';
  distance?: string;
  once?: boolean;
}

export default function SlideInSection({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = 'left',
  distance = '100%',
  once = true
}: SlideInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const slideVariants = {
    hidden: {
      x: direction === 'left' ? `-${distance}` : distance,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={slideVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}