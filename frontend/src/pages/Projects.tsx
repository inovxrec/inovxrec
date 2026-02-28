import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, Zap, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useQuery } from '@tanstack/react-query';
import { inovxApi, IProject } from '@/lib/inovxApi';

const CATEGORIES = ["ALL", "AI_&_DATA", "BLOCKCHAIN", "PRODUCT_OPS", "CYBER_SECURITY"];

const STATIC_PROJECTS = [
    {
        id: 'static-1',
        title: "MarketSentry AI",
        category: "AI_&_DATA",
        description: "A high-performance sentiment analysis engine for real-time market prediction. Uses advanced NLP to process global news feeds and social media trends.",
        tech: ["Next.js", "Python", "TensorFlow", "Redis"],
        image: "/marketsentry_ai_project_inovx_1772303830388.png",
        github: "#",
        demo: "#",
        color: "bg-blue-500"
    },
    // ...other static projects from my previous logic if needed, 
    // but I'll mainly use the API now. 
];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("ALL");

    // Fetch from API
    const { data: apiProjects, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: inovxApi.getProjects
    });

    // Use API data or fallback
    const projectsToDisplay = apiProjects && apiProjects.length > 0 ? apiProjects : STATIC_PROJECTS as any;

    const filteredProjects = activeCategory === "ALL"
        ? projectsToDisplay
        : projectsToDisplay.filter((p: any) => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <ScrollReveal>
                        <div className="space-y-6">
                            <h2 className="text-primary font-mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase">Showcasing_Execution</h2>
                            <h1 className="text-2xl xs:text-3xl sm:text-7xl md:text-9xl font-display font-bold tracking-tighter leading-none">
                                SHARP_<span className="text-primary italic">PROJECTS</span>
                            </h1>
                            <p className="text-base md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                                Explore the intersection of technical brilliance and market-ready products. Each project is built with high-octane engineering and strategic product vision.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right" delay={0.2}>
                        <div className="grid grid-cols-2 gap-8 border-l border-white/10 pl-12 h-fit">
                            <div>
                                <p className="text-4xl font-bold font-display">{isLoading ? '..' : projectsToDisplay.length}+</p>
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">LIVE_APPLICATIONS</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold font-display">12k+</p>
                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">USERS_IMPACTED</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Filter Tabs */}
                {/* ...same as before... */}
                <div className="mb-16 border-b border-white/5 pb-8 overflow-x-auto no-scrollbar">
                    <ScrollReveal>
                        <div className="flex gap-4 md:gap-10">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative text-xs font-mono uppercase tracking-[0.2em] px-2 py-1 transition-colors ${activeCategory === cat ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {cat.replace(/_/g, " ")}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-8 left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_#7c3aed]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4 }}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
                                <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden transition-colors hover:border-white/20">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                                        <div className={`absolute top-6 left-6 px-3 py-1.5 rounded-xl border border-white/10 ${project.color} bg-opacity-20 backdrop-blur-xl text-[10px] font-mono font-bold tracking-widest text-white uppercase`}>
                                            {project.category.replace(/_/g, " ")}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold tracking-tight font-display text-white transition-colors group-hover:text-primary">{project.title}</h3>
                                            <p className="text-gray-400 font-light leading-relaxed text-sm h-12 overflow-hidden line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex gap-4">
                                                <button className="text-gray-500 hover:text-white transition-colors">
                                                    <Github className="w-5 h-5" />
                                                </button>
                                                <button className="text-gray-500 hover:text-white transition-colors">
                                                    <ExternalLink className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] group-hover:border-primary/50">
                                                <Zap className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Contribution CTA */}
                <ScrollReveal direction="up">
                    <div className="mt-40 p-12 md:p-20 rounded-[3rem] bg-[#070707] border border-white/5 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.05)_0%,transparent_50%)]" />
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tighter">BUILD_WITH_INOVX</h2>
                        <p className="text-lg text-gray-500 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                            Have a disruptive idea at the intersection of tech and business? Join our next project cycle and turn your vision into a scalable product.
                        </p>
                        <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            SUBMIT_PROPOSAL <ExternalLink size={18} />
                        </button>
                    </div>
                </ScrollReveal>
            </div>

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[200px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-secondary/5 blur-[200px] rounded-full" />
            </div>
        </div>
    );
}
