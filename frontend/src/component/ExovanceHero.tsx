import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import LightRays from './LightRays';
import TextType from './TextType';
import { Shield, Target, Zap, Cpu } from 'lucide-react';

export default function ExovanceHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Grid - Perspective Version */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20"
                style={{ perspective: '1000px', transform: 'rotateX(45deg) scale(2)', transformOrigin: 'top' }} />

            {/* Light Rays Background */}
            <LightRays
                raysColor="#ffffff"
                raysSpeed={0.15}
                pulsating={true}
                className="absolute inset-0 z-0 opacity-50 mix-blend-screen"
                raysOrigin="top-center"
                rayLength={8}
                lightSpread={0.8}
            />

            {/* Scanning Line Effect */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                />
            </div>

            {/* Floating HUD Elements */}
            <HUDElement position="top-1/4 left-10" icon={<Shield className="w-4 h-4" />} label="SECURE_GATEWAY_v2.0" delay={0.2} />
            <HUDElement position="top-1/3 right-10" icon={<Target className="w-4 h-4" />} label="STRAT_FOCUS_INIT" delay={0.5} />
            <HUDElement position="bottom-1/4 left-20" icon={<Zap className="w-4 h-4" />} label="CORE_VELOCITY: 100%" delay={0.8} />
            <HUDElement position="bottom-1/3 right-20" icon={<Cpu className="w-4 h-4" />} label="SYS_STABILITY_ONLINE" delay={1.1} />

            <motion.div style={{ y, opacity, scale }} className="relative z-20 text-center px-6 md:px-4 max-w-[100vw]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 flex flex-col items-center gap-4"
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/50"></div>
                        <span className="text-primary text-[10px] md:text-xs tracking-[0.8em] font-mono uppercase bg-white/5 px-4 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                            HATCHING_FUTURE_GOLIATHS
                        </span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/50"></div>
                    </div>
                </motion.div>

                <h1 className="font-display text-7xl xs:text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tighter leading-none mb-8 mix-blend-difference relative group">
                    <TextReveal delay={0.1}>INOVX</TextReveal>
                    <div className="absolute inset-0 blur-3xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </h1>

                <p className="max-w-3xl mx-auto text-gray-500 text-lg md:text-2xl font-light tracking-wide leading-relaxed px-4 mb-16">
                    <TextReveal delay={0.4}>
                        <span className="text-white font-medium">Where code meets commerce.</span> We engineering the nexus of technical supremacy and market dominance.
                    </TextReveal>
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="flex flex-col items-center"
                >
                    {/* Futuristic Status Indicator */}
                    <div className="relative flex flex-col items-center gap-6 mb-12">
                        <div className="flex-shrink-0 relative">
                            <div className="w-3 h-3 rounded-full bg-primary animate-ping absolute inset-0 opacity-40" />
                            <div className="w-3 h-3 rounded-full bg-primary relative shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                        </div>

                        <div className="text-lg sm:text-xl md:text-3xl font-mono text-white/90 tracking-tighter text-center px-4 min-h-[2em] flex items-center">
                            <TextType
                                text={[
                                    "INIT_COMMUNITY_ENGAGEMENT...",
                                    "BRIDGING_SKILLS_GAP...",
                                    "EXECUTING_STRATEGY_0x1...",
                                    "CORE_SYSTEM_READY."
                                ]}
                                typingSpeed={40}
                                pauseDuration={1500}
                                showCursor
                                cursorCharacter="▊"
                                className="leading-tight text-white/70 tracking-widest uppercase"
                            />
                        </div>
                    </div>

                    <div className="scroll-icon w-[1px] h-24 bg-gradient-to-b from-primary/60 via-white/20 to-transparent mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-rain-drop shadow-[0_0_10px_white]" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Corner UI Accents */}
            <div className="absolute top-10 left-10 p-4 border-l border-t border-white/20 w-32 h-32 pointer-events-none opacity-40" />
            <div className="absolute top-10 right-10 p-4 border-r border-t border-white/20 w-32 h-32 pointer-events-none opacity-40" />
            <div className="absolute bottom-10 left-10 p-4 border-l border-b border-white/20 w-32 h-32 pointer-events-none opacity-40" />
            <div className="absolute bottom-10 right-10 p-4 border-r border-b border-white/20 w-32 h-32 pointer-events-none opacity-40" />

            {/* Floating UI Elements */}
            <div className="absolute bottom-12 left-12 hidden md:block z-20">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase">
                        <span>LOC: CHENNAI_HQ</span>
                        <span>//</span>
                        <span>NET: ESTABLISHED</span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase">
                        <span>SYS: NO_ANOMALIES</span>
                        <span>//</span>
                        <span className="text-primary">CORE_ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HUDElement({ position, icon, label, delay }: { position: string, icon: React.ReactNode, label: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            whileHover={{ opacity: 0.8, scale: 1.05 }}
            transition={{ delay, duration: 1 }}
            className={`absolute ${position} hidden lg:flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm pointer-events-auto cursor-default group`}
        >
            <div className="text-primary group-hover:text-white transition-colors">
                {icon}
            </div>
            <span className="text-[10px] font-mono tracking-widest text-white/40 group-hover:text-white transition-colors uppercase">
                {label}
            </span >
        </motion.div >
    );
}
