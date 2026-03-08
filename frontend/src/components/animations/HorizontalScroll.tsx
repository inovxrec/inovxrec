import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
}

export default function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

    return (
        <section ref={targetRef} className={`relative h-[300vh] ${className}`}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-4 md:px-24">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
