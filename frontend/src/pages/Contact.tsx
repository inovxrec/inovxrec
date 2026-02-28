import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Phone, Globe, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function Contact() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <ScrollReveal>
                        <h1 className="text-2xl xs:text-4xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter mb-6 leading-none">
                            GET_IN_<span className="text-primary italic">TOUCH</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Have questions or want to collaborate? We'd love to hear from you. Our team is ready to help you navigate the intersection of tech and business.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Information & Map-like area */}
                    <div className="lg:col-span-5 space-y-8">
                        <ScrollReveal direction="left">
                            <div className="p-10 rounded-[2.5rem] bg-[#070707] border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 text-primary/5 -mr-4 -mt-4 group-hover:text-primary/10 transition-colors">
                                    <MessageSquare size={160} />
                                </div>

                                <h2 className="text-3xl font-display font-bold mb-10 relative z-10">CONTACT_INFO</h2>

                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-start gap-6 group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-white/5 group-hover/item:border-primary/50 transition-all duration-500">
                                            <Mail className="text-primary w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Email_Us</p>
                                            <p className="text-lg text-white font-light group-hover/item:text-primary transition-colors cursor-pointer">invox@rajalakshmi.edu.in</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-white/5 group-hover/item:border-secondary/50 transition-all duration-500">
                                            <MapPin className="text-secondary w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Our_Location</p>
                                            <p className="text-lg text-white font-light leading-relaxed group-hover/item:text-secondary transition-colors cursor-pointer">
                                                Rajalakshmi Engineering College,<br />
                                                Thandalam, Chennai - 602105
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-white/5 group-hover/item:border-accent/50 transition-all duration-500">
                                            <Phone className="text-accent w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Call_Us</p>
                                            <p className="text-lg text-white font-light group-hover/item:text-accent transition-colors cursor-pointer">+91 044 6718 1111</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 gap-4 relative z-10">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-center cursor-pointer">
                                        <Globe className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Website</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-center cursor-pointer">
                                        <div className="w-5 h-5 mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-lg font-bold text-gray-400">𝕏</span>
                                        </div>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Platform</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className="p-10 rounded-[2.5rem] bg-[#070707] border border-white/5 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <h2 className="text-3xl font-display font-bold mb-10 relative z-10">SEND_MESSAGE</h2>

                                <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] ml-1">Full_Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-gray-700 font-light"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] ml-1">Email_Address</label>
                                            <input
                                                type="email"
                                                placeholder="email@example.com"
                                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-gray-700 font-light"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] ml-1">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="What is this regarding?"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-gray-700 font-light"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] ml-1">Your_Message</label>
                                        <textarea
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-gray-700 font-light resize-none"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button className="w-full md:w-auto px-10 py-7 rounded-2xl bg-white text-black hover:bg-white/90 group/btn transition-all duration-300 relative overflow-hidden h-auto">
                                            <div className="flex items-center gap-3 relative z-10 transition-transform group-hover/btn:translate-x-1 duration-300">
                                                <span className="font-bold tracking-tight">SEND_ENQUIRY</span>
                                                <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                            </div>
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(13,7,22,0.8)_0%,transparent_100%)] opacity-30" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 blur-[180px] rounded-full" />
            </div>
        </div>
    );
}
