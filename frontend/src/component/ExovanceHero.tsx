import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import LightRays from './LightRays';

export default function ExovanceHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Light Rays Background */}
            <LightRays
                raysColor="#ffffff"
                raysSpeed={0.2}
                pulsating={true}
                className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
                raysOrigin="top-center"
                rayLength={6}
                lightSpread={0.6}
            />

            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4">
                <div className="mb-4 flex items-center justify-center gap-2">
                    <div className="h-[1px] w-12 bg-white/50"></div>
                    <span className="text-white text-sm tracking-[0.5em] font-light uppercase">Innovate The Unseen</span>
                    <div className="h-[1px] w-12 bg-white/50"></div>
                </div>

                <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6 mix-blend-difference">
                    <TextReveal>MEET</TextReveal>
                    <TextReveal delay={0.1}>CODE</TextReveal>
                </h1>

                <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light tracking-wide leading-relaxed">
                    <TextReveal delay={0.2}>
                        Engineering the future of algorithmic mastery.
                    </TextReveal>
                    <TextReveal delay={0.3}>
                        Where intelligence meets execution.
                    </TextReveal>
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-12"
                >
                    <div className="scroll-icon w-[1px] h-24 bg-gradient-to-b from-white to-transparent mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-rain-drop" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating UI Elements */}
            <div className="absolute bottom-10 left-10 hidden md:block z-20">
                <div className="flex gap-4 text-xs font-mono text-gray-500 tracking-widest">
                    <span>LOC: CHENNAI, IN</span>
                    <span>//</span>
                    <span>SYS: ONLINE</span>
                </div>
            </div>
        </div>
    );
}
