import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import LightRays from './LightRays';
import TextType from './TextType';

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

            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 md:px-4 max-w-[100vw]">
                <div className="mb-4 flex items-center justify-center gap-2">
                    <div className="h-[1px] w-8 md:w-12 bg-white/50"></div>
                    <span className="text-white text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] font-light uppercase">We Hatch Better</span>
                    <div className="h-[1px] w-8 md:w-12 bg-white/50"></div>
                </div>

                <h1 className="font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6 mix-blend-difference overflow-hidden">
                    <TextReveal delay={0.1}>INOVX</TextReveal>
                </h1>

                <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-xl font-light tracking-wide leading-relaxed px-4">
                    <TextReveal delay={0.4}>
                        Where technology meets business strategy.
                    </TextReveal>
                    <TextReveal delay={0.5}>
                        Empowering the next generation of innovators.
                    </TextReveal>
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 flex flex-col items-center"
                >
                    {/* Futuristic Status Indicator */}
                    <div className="relative flex flex-col items-center gap-4 mb-8">
                        <div className="flex-shrink-0 relative">
                            <div className="w-2 rounded-full bg-primary animate-ping absolute inset-0 opacity-40" />
                            <div className="w-2 h-2 rounded-full bg-primary relative" />
                        </div>

                        <div className="text-base sm:text-lg md:text-2xl font-display text-white/90 tracking-tight text-center px-4 min-h-[3em] flex items-center">
                            <TextType
                                text={[
                                    "Welcome to InovX — Where Tech meets Business Strategy.", "Join the next generation of innovators.", "Engineering the future of enterprise."
                                ]}
                                typingSpeed={50}
                                pauseDuration={2000}
                                showCursor
                                cursorCharacter="▋"
                                className="leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] max-w-sm md:max-w-none"
                            />
                        </div>
                    </div>

                    <div className="scroll-icon w-[1px] h-20 bg-gradient-to-b from-primary/60 via-white/20 to-transparent mx-auto relative overflow-hidden">
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
