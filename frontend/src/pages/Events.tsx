import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Users, Rocket, Trophy, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

import { useQuery } from '@tanstack/react-query';
import { inovxApi, IEvent } from '@/lib/inovxApi';

const STATIC_EVENTS: any[] = [
    {
        id: 1,
        date: "March 15, 2025",
        title: "InovX Launchpad",
        description: "The official kickoff event for the new semester. Meet the core team, learn about our upcoming projects, and join the most innovative community on campus.",
        location: "Main Auditorium",
        category: "Community",
        icon: <Rocket className="w-6 h-6" />,
        color: "bg-blue-500",
        image: "/launchpad_event_inovx_1772302454467.png"
    },
    {
        id: 2,
        date: "April 2-4, 2025",
        title: "Code-to-Commerce Hackathon",
        description: "A 48-hour challenge where technical brilliance meets business strategy. Build a working prototype and pitch your business model to industry judges.",
        location: "Innovation Lab",
        category: "Competition",
        icon: <Trophy className="w-6 h-6" />,
        color: "bg-purple-500",
        image: "/hackathon_event_1772289703083.png"
    }
];

export default function Events() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress as any, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Fetch from API
    const { data: apiEvents, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: inovxApi.getEvents
    });

    const eventsToDisplay = apiEvents && apiEvents.length > 0 ? apiEvents : STATIC_EVENTS;

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="mb-20">
                    <ScrollReveal>
                        <h1 className="text-2xl xs:text-3xl sm:text-7xl md:text-9xl font-display font-bold mb-6 tracking-tighter leading-none">
                            TIMELINE_<span className="text-primary italic">EVENTS</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
                            Tracking our journey across the intersection of technology and enterprise. Join us for our upcoming sessions, hackathons, and networking events.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative py-10">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 overflow-visible">
                        <motion.div
                            style={{ scaleY: scaleY as any }}
                            className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent origin-top relative"
                        >
                            {/* Scroll Spark */}
                            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '100%' }}>
                                <div className="relative">
                                    <div className="w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_15px_#fff]" />
                                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
                                    <div className="absolute inset-0 bg-secondary rounded-full blur-xl opacity-40 scale-150" />
                                    {/* Trail particles */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-white to-transparent opacity-20" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Event Items */}
                    <div className="space-y-32 md:space-y-48">
                        {eventsToDisplay.map((event: any, index: number) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={event._id || event.id} className="relative grid md:grid-cols-2 gap-8 md:gap-24 items-center">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-20">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                                            className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-black ${event.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                                        >
                                            <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${event.color}`} />
                                        </motion.div>
                                    </div>

                                    {/* Image Side */}
                                    <div className={`${isEven ? 'md:order-1' : 'md:order-2'} order-1 pl-12 md:pl-0`}>
                                        <ScrollReveal direction={isEven ? "left" : "right"}>
                                            <div className="group relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 hover:border-primary/40 hover:shadow-primary/10">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                                <div className={`absolute top-4 md:top-6 ${isEven ? 'right-4 md:right-6' : 'left-4 md:left-6'} p-3 md:p-4 rounded-xl md:rounded-2xl ${event.color} bg-opacity-20 backdrop-blur-xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110`}>
                                                    {event.icon}
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`${isEven ? 'md:order-2' : 'md:order-1'} order-2 pl-12 md:pl-0 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                                        <ScrollReveal direction={isEven ? "right" : "left"}>
                                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase mb-4 md:mb-6 ${event.color} bg-opacity-20 text-white border border-white/10 inline-block`}>
                                                {event.category}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tighter font-display text-white group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md font-light">
                                                {event.description}
                                            </p>
                                            <div className={`flex flex-col gap-3 md:gap-4 text-xs md:text-sm text-gray-400 font-mono ${isEven ? '' : 'md:items-end'}`}>
                                                <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-xl border border-white/5 w-fit">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    <span className="text-gray-300">{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-xl border border-white/5 w-fit">
                                                    <MapPin className="w-4 h-4 text-secondary" />
                                                    <span className="text-gray-300">{event.location}</span>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-32 text-center">
                    <ScrollReveal>
                        <div className="inline-block relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <button className="relative px-8 py-4 bg-black rounded-full leading-none flex items-center divide-x divide-gray-600">
                                <span className="flex items-center space-x-5">
                                    <span className="pr-4 text-gray-100">Want to propose an event?</span>
                                </span>
                                <span className="pl-6 text-primary group-hover:text-gray-100 transition duration-200">Get in touch &rarr;</span>
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
