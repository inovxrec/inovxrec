import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface UseScrollAnimationOptions {
  target?: RefObject<HTMLElement>;
  offset?: [string, string];
}

interface ScrollAnimationReturn {
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  x: MotionValue<number>;
  rotate: MotionValue<number>;
}

export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): ScrollAnimationReturn {
  const { target, offset = ["start end", "end start"] } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset
  });

  // Common transformations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return {
    scrollYProgress,
    opacity,
    scale,
    y,
    x,
    rotate
  };
}

// Parallax hook for background elements
export function useParallax(speed: number = 0.5) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);
  return y;
}