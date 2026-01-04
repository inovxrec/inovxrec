import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
  once?: boolean;
}

export default function TypewriterText({
  text,
  className = "",
  delay = 0,
  speed = 50,
  cursor = true,
  once = true
}: TypewriterTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || (once && hasAnimated)) {
      if (!once) {
        setDisplayedText('');
        setShowCursor(cursor);
      }
      return;
    }

    setHasAnimated(true);

    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          if (cursor) {
            // Blink cursor for a bit then hide it
            setTimeout(() => setShowCursor(false), 2000);
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, text, delay, speed, cursor, once, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}