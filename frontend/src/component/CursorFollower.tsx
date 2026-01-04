import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-white/20 rounded-full pointer-events-none z-50 backdrop-blur-sm border border-white/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.06)_0%,transparent_15%)] transition-opacity duration-300"
        ref={(el) => {
          if (el) {
            document.addEventListener('mousemove', (e) => {
              el.style.setProperty('--x', `${e.clientX}px`);
              el.style.setProperty('--y', `${e.clientY}px`);
            });
          }
        }}
      />
    </>
  );
}
