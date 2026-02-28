import { motion } from 'framer-motion';
import { Target, Eye, Users, Code, TrendingUp, Cpu } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const TEAM = [
    {
        name: "Alex Thompson",
        role: "President & Founder",
        image: "https://i.pravatar.cc/150?u=alex",
        bio: "Visionary leader bridging the gap between deep-tech and scaling business models."
    },
    {
        name: "Sarah Chen",
        role: "Technical Lead",
        image: "https://i.pravatar.cc/150?u=sarah",
        bio: "Full-stack architect with a passion for building high-performance AI solutions."
    },
    {
        name: "David Kumar",
        role: "Strategy Director",
        image: "https://i.pravatar.cc/150?u=david",
        bio: "Strategic analyst focused on turning student-led projects into viable startups."
    }
];

export default function About() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
                    <ScrollReveal direction="left">
                        <div className="space-y-8">
                            <h2 className="text-primary font-mono text-sm tracking-[0.4em] uppercase">The Story of InovX</h2>
                            <h1 className="text-2xl xs:text-4xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter leading-[1.1] md:leading-tight">
                                WHERE_<span className="text-primary italic">CODE</span><br />
                                MEETS_<span className="text-white/60">STRATEGY</span>
                            </h1>
                            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
                                We are more than a club. We are a high-performance incubator for the next generation of tech entrepreneurs. At InovX, we believe technical mastery is only half the battle—true innovation happens when it's paired with sharp business acumen.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="right" delay={0.2}>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
                            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/10 shadow-3xl">
                                <img
                                    src="/about_hero_inovx_team_1772303280493.png"
                                    alt="InovX Leadership"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Mission & Vision Section (Grid) */}
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-40 px-2 sm:px-0">
                    <ScrollReveal direction="up" delay={0.1}>
                        <div className="group relative p-6 sm:p-10 bg-[#070707] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 text-primary/10 hidden sm:block">  <Target size={120} /> </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-6 flex items-center gap-3">
                                    <Target className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> OUR_MISSION
                                </h3>
                                <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed mb-8">
                                    To provide a launchpad for student-led innovation by equipping our members with the high-octane technical skills and strategic business insights required to disrupt global markets. We focus on turning prototypes into products and developers into CEOs.
                                </p>
                                <div className="mt-auto flex items-center gap-4 py-4 border-t border-white/5">
                                    <div className="w-10 h-1 h-px bg-primary/40 rounded-full" />
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">DRIVING_IMPACT</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.3}>
                        <div className="group relative p-6 sm:p-10 bg-[#070707] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-secondary/30 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 text-secondary/10 hidden sm:block"> <Eye size={120} /> </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-6 flex items-center gap-3">
                                    <Eye className="text-secondary w-6 h-6 sm:w-8 sm:h-8" /> OUR_VISION
                                </h3>
                                <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed mb-8">
                                    To be recognized as the premier departmental club for engineering leadership, fostering a global ecosystem of elite technical entrepreneurs who solve complex real-world problems through collaborative innovation and strategic execution.
                                </p>
                                <div className="mt-auto flex items-center gap-4 py-4 border-t border-white/5">
                                    <div className="w-10 h-1 h-px bg-secondary/40 rounded-full" />
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">BUILDING_FUTURES</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Core Pillars / Values Section */}
                <div className="mb-40 px-2 sm:px-0">
                    <ScrollReveal>
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">CORE_PILLARS</h2>
                            <p className="text-gray-400 text-base md:text-lg font-light">The foundation of our high-performance culture.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { icon: <Code className="text-blue-400" />, title: "TECH_EXCELLENCE", text: "We push the boundaries of modern stacks, from AI architectures to high-concurrency backend systems." },
                            { icon: <TrendingUp className="text-purple-400" />, title: "BUSINESS_ACUMEN", text: "Product-market fit, financial models, and operational strategy are integral parts of our DNA." },
                            { icon: <Users className="text-rose-400" />, title: "COMMUNITY_SYNERGY", text: "An elite network of developers and strategists growing together through shared excellence." }
                        ].map((pillar, i) => (
                            <ScrollReveal key={i} delay={i * 0.15}>
                                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
                                    <div className="mb-6 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                        {pillar.icon}
                                    </div>
                                    <h4 className="text-xl font-bold mb-4 font-display">{pillar.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">{pillar.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Leadership / Team Section */}
                <div className="mb-20 px-2 sm:px-0">
                    <ScrollReveal>
                        <div className="mb-20">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">THE_LEADERSHIP</h2>
                            <div className="h-[2px] w-24 bg-primary rounded-full mb-4" />
                            <p className="text-gray-400 font-light">Meet the minds steering the INOVX mission.</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {TEAM.map((member, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="group relative">
                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl relative">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                                            <h4 className="text-xl sm:text-2xl font-bold font-display">{member.name}</h4>
                                            <p className="text-primary font-mono text-[10px] uppercase tracking-widest">{member.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-light px-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {member.bio}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Final Call to Action */}
                <ScrollReveal direction="up">
                    <div className="mt-40 p-16 rounded-[3rem] bg-gradient-to-br from-primary/10 via-[#0a0a0a] to-secondary/10 border border-white/10 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">BE_PART_OF_THE_FUTURE</h2>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
                            Join an elite community of student innovators who aren't just waiting for the future—they're building it.
                        </p>
                        <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            JOIN_OUR_MISSION
                        </button>
                    </div>
                </ScrollReveal>
            </div>

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(13,7,22,0.8),transparent_100%)]" />
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full" />
            </div>
        </div>
    );
}
