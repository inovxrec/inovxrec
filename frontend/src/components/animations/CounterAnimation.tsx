import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  once?: boolean;
}

export default function CounterAnimation({
  from,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
  once = true
}: CounterAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [springValue]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    } else if (!once) {
      motionValue.set(from);
    }
  }, [isInView, from, to, motionValue, once]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}