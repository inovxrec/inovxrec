import { useQuery } from '@tanstack/react-query';
import { inovxApi } from '@/lib/inovxApi';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function GallerySection() {
    const { data: galleryItems } = useQuery({
        queryKey: ["gallery"],
        queryFn: inovxApi.getGallery,
    });

    const localGallery = [
        {
            image: '/gallery_team_working_1772987205704.png',
            title: 'Collaborative Innovation',
            category: 'Teamwork',
            className: 'col-span-1 row-span-2 md:col-span-2 md:row-span-2',
        },
        {
            image: '/gallery_event_audience_1772987222518.png',
            title: 'Elite Keynotes',
            category: 'Events',
            className: 'col-span-1 row-span-1 md:col-span-2 md:row-span-1',
        },
        {
            image: '/gallery_student_presentation_1772987240374.png',
            title: 'Pitch Perfection',
            category: 'Presentation',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
        },
        {
            image: '/gallery_coding_session_1772987258487.png',
            title: 'Late Night Sessions',
            category: 'Development',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
        },
        {
            image: '/gallery_networking_mixer_1772987275932.png',
            title: 'Strategic Ties',
            category: 'Networking',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
        },
        {
            image: '/gallery_achievement_trophy_1772987293728.png',
            title: 'Global Recognition',
            category: 'Awards',
            className: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
        },
    ];

    // Always use local gallery as base; API items are merged only if they have valid local/upload paths
    const displayImages = localGallery.map((local, i) => {
        const apiItem = galleryItems?.[i];
        if (apiItem && apiItem.image && (apiItem.image.startsWith('/uploads/') || apiItem.image.startsWith('/gallery'))) {
            return { ...local, ...apiItem, className: local.className };
        }
        return local;
    });

    return (
        <section id="gallery" className="py-32 px-4 relative z-10 bg-black overflow-hidden">
            <div className="container mx-auto">
                <ScrollReveal delay={0.2} once={true}>
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-primary font-mono text-sm tracking-[0.5em] uppercase italic">Visual Journey</h2>
                        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                            CAPTURE_THE_<span className="italic text-primary">MOMENT</span>
                        </h3>
                        <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed">
                            Experience the heartbeat of InovX through our curated collection of memories and milestones.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 auto-rows-[300px]">
                    {displayImages.map((image: any, index: number) => (
                        <ScrollReveal
                            key={index}
                            delay={0.1 * index}
                            once={true}
                            className={image.className || ""}
                        >
                            <div className="group relative w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-700 hover:border-white/30 cursor-crosshair">
                                <img
                                    src={image.image}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-[1px] bg-primary/50 group-hover:w-12 transition-all duration-500" />
                                        <span className="text-primary font-mono text-[10px] tracking-widest uppercase">
                                            {image.category}
                                        </span>
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                        {image.title}
                                    </h4>

                                    {/* Decorative corner */}
                                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-700 delay-200" />
                                    <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-700 delay-200" />
                                </div>

                                {/* Scanline effect on hover */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-5 transition-opacity duration-500 [background:linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_2px,3px_100%]" />

                                {/* Noise overlay specific to card */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
