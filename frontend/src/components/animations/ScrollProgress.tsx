import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export default function ScrollProgress({ 
  className = "", 
  color = "#ffffff",
  height = 2 
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 origin-left ${className}`}
      style={{
        scaleX,
        height: `${height}px`,
        backgroundColor: color
      }}
    />
  );
}