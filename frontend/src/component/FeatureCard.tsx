import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
    title: string;
    category: string;
    description: string;
    number: string;
}

export default function FeatureCard({ title, category, description, number }: FeatureCardProps) {
    return (
        <motion.div
            className="group relative border-t border-white/20 py-12 cursor-pointer transition-colors hover:bg-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="flex flex-col md:flex-row gap-8 items-baseline w-full md:w-1/2">
                    <span className="font-mono text-sm text-cyan-500">0{number}</span>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight group-hover:text-cyan-400 transition-colors">
                        {title}
                    </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start justify-between w-full md:w-1/2">
                    <div className="max-w-sm">
                        <span className="inline-block px-3 py-1 rounded-full border border-white/10 text-xs text-gray-400 mb-4 uppercase tracking-wider">
                            {category}
                        </span>
                        <p className="text-gray-400 leading-relaxed font-light">
                            {description}
                        </p>
                    </div>

                    <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 group-hover:text-black transition-colors" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
