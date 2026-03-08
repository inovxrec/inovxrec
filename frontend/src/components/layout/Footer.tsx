import { Link } from 'react-router-dom';
import {
    Instagram,
    Twitter,
    Linkedin,
    Github,
    Mail,
    MapPin,
    ArrowUpRight
} from 'lucide-react';
import MagneticHover from '@/components/animations/MagneticHover';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useQuery } from '@tanstack/react-query';
import { inovxApi } from '@/lib/inovxApi';

export function Footer() {
    const { data: config } = useQuery({
        queryKey: ['config'],
        queryFn: inovxApi.getConfig,
    });

    const socialLinks = [
        { icon: <Instagram className="w-5 h-5" />, href: config?.instagram_url || "#", name: "Instagram" },
        { icon: <Twitter className="w-5 h-5" />, href: config?.twitter_url || "#", name: "Twitter" },
        { icon: <Linkedin className="w-5 h-5" />, href: config?.linkedin_url || "#", name: "LinkedIn" },
        { icon: <Github className="w-5 h-5" />, href: config?.github_url || "#", name: "GitHub" },
    ];

    const footerLinks = [
        {
            title: "Platform",
            links: [
                { name: "Laboratory", href: "/" },
                { name: "Projects", href: "/projects" },
                { name: "Events", href: "/events" },
                { name: "Admin", href: "/admin" },
            ],
        },
        {
            title: "Club",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Hierarchy", href: "#" },
                { name: "Archives", href: "#" },
            ],
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Protocol", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" },
            ],
        },
    ];

    return (
        <footer className="relative bg-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
            <div className="noise-overlay opacity-[0.02] pointer-events-none" />

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -ml-64 -mb-64" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    {/* Logo & Info Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <ScrollReveal delay={0.1}>
                            <Link to="/" className="flex items-center gap-3 group w-fit">
                                <img src="/in.png" alt="InovX Logo" className="h-10 w-auto transition-transform duration-500 group-hover:scale-110" />
                                <span className="font-display text-2xl font-black tracking-tighter text-white">INOVX</span>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm">
                                Engineering the nexus of technical supremacy and market dominance.
                                Join the elite community of tech entrepreneurs.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="flex gap-4">
                                {socialLinks.map((social, i) => (
                                    <MagneticHover key={i}>
                                        <a
                                            href={social.href}
                                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    </MagneticHover>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {footerLinks.map((section, i) => (
                            <div key={i} className="space-y-6">
                                <ScrollReveal delay={0.1 * i}>
                                    <h4 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-primary/60">
                                        {section.title}
                                    </h4>
                                </ScrollReveal>
                                <ul className="space-y-4">
                                    {section.links.map((link, j) => (
                                        <ScrollReveal key={j} delay={0.1 * i + 0.05 * j}>
                                            <li>
                                                <Link
                                                    to={link.href}
                                                    className="text-gray-400 hover:text-white transition-colors text-[15px] font-medium flex items-center group"
                                                >
                                                    {link.name}
                                                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                                </Link>
                                            </li>
                                        </ScrollReveal>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-3 space-y-8">
                        <ScrollReveal delay={0.4}>
                            <h4 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-primary/60">
                                HQ_LOCATIONS
                            </h4>
                        </ScrollReveal>

                        <ScrollReveal delay={0.5}>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-sm mb-1 uppercase">Main Laboratory</h5>
                                        <p className="text-gray-500 text-sm font-light">Chennai, Tamil Nadu<br />India — Sector 01</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                        <Mail className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <h5 className="text-white font-bold text-sm mb-1 uppercase">Transmission</h5>
                                        <p className="text-gray-500 text-sm font-light">hq@inovx.club</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Bottom Bar Section */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <ScrollReveal delay={0.1}>
                        <div className="text-gray-600 text-[10px] font-mono tracking-[0.4em] uppercase">
                            © 2025 INOVX_INDUSTRIAL_COUNCIL // ALL_PROTOCOLS_RESERVED
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">System: Operational</span>
                            </div>
                            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                                LAT: 13.0827° N // LON: 80.2707° E
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Decorative Text background */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-[0.02] pointer-events-none select-none translate-y-1/2">
                <h2 className="text-[25vw] font-black tracking-tighter leading-none whitespace-nowrap">
                    INOVX INDUSTRIAL
                </h2>
            </div>
        </footer>
    );
}
