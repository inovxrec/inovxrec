import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    stagger?: boolean;
    once?: boolean;
}

export default function TextReveal({ 
    children, 
    className = "", 
    delay = 0,
    duration = 0.8,
    direction = 'up',
    stagger = false,
    once = true
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once, 
        margin: "-50px",
        amount: 0.3
    });

    const getInitialTransform = () => {
        switch (direction) {
            case 'up':
                return { y: "100%", opacity: 0 };
            case 'down':
                return { y: "-100%", opacity: 0 };
            case 'left':
                return { x: "100%", opacity: 0 };
            case 'right':
                return { x: "-100%", opacity: 0 };
            default:
                return { y: "100%", opacity: 0 };
        }
    };

    const getAnimateTransform = () => {
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

    if (stagger && typeof children === 'string') {
        const words = children.split(' ');
        return (
            <div ref={ref} className={`overflow-hidden ${className}`}>
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        className="inline-block mr-2"
                        initial={getInitialTransform()}
                        animate={isInView ? getAnimateTransform() : getInitialTransform()}
                        transition={{ 
                            duration, 
                            ease: [0.25, 0.46, 0.45, 0.94], 
                            delay: delay + (index * 0.1) 
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        );
    }

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={getInitialTransform()}
                animate={isInView ? getAnimateTransform() : getInitialTransform()}
                transition={{ 
                    duration, 
                    ease: [0.25, 0.46, 0.45, 0.94], 
                    delay 
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
