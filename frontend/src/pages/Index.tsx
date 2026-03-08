import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import CursorFollower from '@/component/CursorFollower';
import ExovanceHero from '@/component/ExovanceHero';
import TextReveal from '@/component/TextReveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CardSwap, { Card } from '@/component/CardSwap';
import { TerminalDemo } from '@/components/TerminalDemo';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';
import TypewriterText from '@/components/animations/TypewriterText';
import ParallaxSection from '@/components/animations/ParallaxSection';
import SlideInSection from '@/components/animations/SlideInSection';
import CounterAnimation from '@/components/animations/CounterAnimation';
import FloatingElements from '@/components/animations/FloatingElements';
import MagneticHover from '@/components/animations/MagneticHover';
import TextType from '@/component/TextType';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from '@tanstack/react-query';
import { inovxApi } from '@/lib/inovxApi';
import { ExternalLink, Radio, TrendingUp, Cpu } from 'lucide-react';
import HorizontalScroll from '@/components/animations/HorizontalScroll';



import GallerySection from '@/component/GallerySection';




export default function Index() {
  const { isAuthenticated } = useAuthStore();

  const { data: liveEvent, isLoading: liveLoading } = useQuery({
    queryKey: ['liveEvent'],
    queryFn: inovxApi.getLiveEvent,
    refetchInterval: 60000, // Poll every minute
  });

  const SAMPLE_LIVE_EVENT = {
    _id: "sample-1",
    title: "Workshop: Building Scalable Startups",
    description: "Join us live for an elite session on transforming technical prototypes into multi-million dollar business models. Featuring industry leaders from top tech titans.",
    image: "/business_strategy_event_1772289721670.png",
    liveLink: "#",
    isLive: true
  };

  const activeLiveEvent = liveEvent || SAMPLE_LIVE_EVENT;

  const { data: statsData } = useQuery({
    queryKey: ['statistics'],
    queryFn: inovxApi.getStatistics,
  });

  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: inovxApi.getConfig,
  });

  const displayStats = statsData?.length ? statsData : [
    { label: "Members", value: 500, suffix: "+" },
    { label: "Projects Launched", value: 50, suffix: "+" },
    { label: "Events Hosted", value: 200, suffix: "+" },
    { label: "Industry Partners", value: 12, suffix: "+" },
  ];
  const CARDS = [
    {
      id: 0,
      name: "Tech Mastery",
      designation: "Skill Development",
      content: (
        <p>
          Master the latest technologies through <span className="font-bold text-white">intensive coding workshops</span> and hands-on projects. Stay ahead in the digital race.
        </p>
      ),
    },
    {
      id: 1,
      name: "Business Strategy",
      designation: "Strategic Growth",
      content: (
        <p>
          Bridge the gap between product and market with <span className="font-bold text-white">marketing, operations, and finance</span> knowledge. Build sustainable models.
        </p>
      ),
    },
    {
      id: 2,
      name: "Innovation Hub",
      designation: "Entrepreneurship",
      content: (
        <p>
          Foster an <span className="font-bold text-white">entrepreneurial mindset</span>. Develop solutions that address real-world challenges through creative problem-solving.
        </p>
      ),
    },
    {
      id: 3,
      name: "Networking",
      designation: "Career Growth",
      content: (
        <p>
          Connect with industry leaders, alumni, and <span className="font-bold text-white">like-minded peers</span>. Build a community that grows together for mutual success.
        </p>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white/30 selection:text-white scroll-optimized">
      <div className="noise-overlay" />
      <CursorFollower />
      <FloatingElements count={15} />

      <main className="scroll-optimized">
        <ExovanceHero />

        {/* Live Event Section */}
        {activeLiveEvent && (
          <section className="relative z-20 -mt-20 mb-32 px-4 group">
            <div className="container mx-auto max-w-6xl">
              <ScrollReveal delay={0.1} once={true}>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-1 shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
                  {/* Glowing background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50" />

                  {/* Cyber dots background */}
                  <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]" />

                  <div className="relative flex flex-col lg:flex-row items-stretch gap-0 rounded-[2.4rem] overflow-hidden bg-black/40">
                    {/* Image Section */}
                    <div className="w-full lg:w-2/5 relative overflow-hidden group/img min-h-[300px]">
                      {activeLiveEvent.image ? (
                        <img
                          src={activeLiveEvent.image}
                          alt={activeLiveEvent.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <Radio className="w-12 h-12 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent lg:from-black/60" />

                      {/* Live Badge */}
                      <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono tracking-[0.2em] uppercase backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Live Now
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6 relative">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-[1px] w-8 bg-white/30" />
                          <h4 className="text-white/40 font-mono text-[10px] tracking-[0.4em] uppercase">Featured Broadcast</h4>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.1]">
                          {activeLiveEvent.title}
                        </h3>
                      </div>

                      <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl border-l-2 border-white/10 pl-6 italic">
                        "{activeLiveEvent.description}"
                      </p>

                      <div className="flex flex-wrap gap-6 pt-6">
                        {activeLiveEvent.liveLink && (
                          <a
                            href={activeLiveEvent.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MagneticHover>
                              <Button className="rounded-full bg-white text-black hover:bg-gray-200 px-10 py-7 h-auto text-lg font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-95">
                                Join Session <ExternalLink className="ml-2 h-5 w-5" />
                              </Button>
                            </MagneticHover>
                          </a>
                        )}
                        <Link to="/events">
                          <MagneticHover>
                            <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 hover:border-white/30 px-10 py-7 h-auto text-lg font-medium transition-all">
                              Archives
                            </Button>
                          </MagneticHover>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Global Announcement / Ticker */}


        {/* Philosophy / About Section */}
        <section id="about" className="py-40 px-4 relative z-10 bg-black overflow-hidden scroll-optimized">
          {/* Background Video */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale"
            >
              <source src="https://res.cloudinary.com/domzonhmn/video/upload/v1772988439/0223_xwacoq.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
          </div>

          <div className="container mx-auto relative z-10">
            {/* HUD Callouts */}
            <div className="absolute top-0 right-0 hidden lg:block text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">
              // PHIL_STRAT_0x1
            </div>
            <div className="absolute bottom-0 left-0 hidden lg:block text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">
              // CORE_VALUES_v4.2
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-start">

              <div>
                <ScrollReveal delay={0.2} once={true}>
                  <h2 className="text-sm font-mono text-gray-500 mb-8 tracking-widest uppercase">
                    Our Philosophy
                  </h2>
                </ScrollReveal>
                <div className="sticky top-32">
                  <ScrollReveal delay={0.4} once={true}>
                    <p className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight">
                      {config?.philosophy_msg ? (
                        <span className="text-white">{config.philosophy_msg}</span>
                      ) : (
                        <>
                          <span className="text-gray-500">We believe in</span>{' '}
                          <TypewriterText
                            text="the synergy"
                            className="text-white font-medium"
                            delay={1000}
                            speed={80}
                            once={true}
                          />{' '}
                          <span className="text-gray-500">between</span>{' '}
                          <span className="text-white">Business and Technology</span>.
                        </>
                      )}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.8} once={true}>
                    <div className="mt-12 flex gap-4">
                      {isAuthenticated ? (
                        <Link to="/auth?mode=signup">
                          <MagneticHover>
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-500 px-10 py-7 h-auto text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] group">
                              Explore InovX <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Button>
                          </MagneticHover>
                        </Link>
                      ) : (
                        <Link to="/auth?mode=signup">
                          <MagneticHover>
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-500 px-10 py-7 h-auto text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] group">
                              Join Us <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Button>
                          </MagneticHover>
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>

                </div>
              </div>

              <div className="space-y-12 pt-20">
                {[
                  {
                    title: "Innovation",
                    desc: "Bridging the gap between code and commerce. We focus on teaching the business logic behind every technical innovation.",
                    icon: <Cpu className="w-5 h-5 text-primary" />,
                    index: "01"
                  },
                  {
                    title: "Performance",
                    desc: "From operational efficiency to financial strategy, we equip you with the tools to turn your ideas into viable, scaling enterprises.",
                    icon: <TrendingUp className="w-5 h-5 text-primary" />,
                    index: "02"
                  },
                  {
                    title: "Community",
                    desc: "Join a global network of elite developers. Share solutions, optimize approaches, and grow together in an ecosystem designed for excellence.",
                    icon: <Radio className="w-5 h-5 text-primary" />,
                    index: "03"
                  }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={0.2 * i} direction={i % 2 === 0 ? "right" : "left"} once={true}>
                    <div className="group relative p-10 rounded-[2rem] bg-white/[0.01] border border-white/5 backdrop-blur-xl hover:bg-white/[0.03] transition-all duration-700 hover:-translate-y-2">
                      {/* Industrial Corner Accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-primary/30 transition-colors rounded-tl-[2rem]" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 group-hover:border-primary/30 transition-colors rounded-br-[2rem]" />

                      <div className="relative flex gap-8 items-start">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-500 transform group-hover:rotate-12">
                            {item.icon}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-primary/40 tracking-[0.3em] font-bold">{item.index}</span>
                            <div className="h-[1px] w-8 bg-white/10" />
                            <h3 className="text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                          </div>
                          <p className="text-gray-400 leading-relaxed text-lg font-light max-w-lg">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Hover Scanline */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_4px)]" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Mission & Vision Section */}
        <section id="vision-mission" className="py-24 px-4 relative z-10 bg-black scroll-optimized">
          <div className="container mx-auto max-w-5xl">
            <ScrollReveal delay={0.1} once={true}>
              <div className="mb-16 max-w-4xl">
                <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-6">Who We Are</h2>
                <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug tracking-tight text-white/90">
                  {config?.vision_statement || (
                    <>
                      We are a student-led departmental club <span className="text-gray-500">bridging the gap between</span> <span className="text-white">technical skills</span> and <span className="text-white">business acumen</span>, preparing the next generation of tech entrepreneurs.
                    </>
                  )}
                </p>
              </div>
            </ScrollReveal>


            <div className="grid md:grid-cols-2 gap-8">

              <ScrollReveal direction="right" once={true} delay={0.2}>
                <div className="group relative p-8 h-full bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-primary/20 transition-all duration-500 overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />
                  <div className="absolute top-4 left-4 text-[10px] text-white/10 font-mono">+</div>
                  <div className="absolute top-4 right-4 text-[10px] text-white/10 font-mono">+</div>
                  <div className="absolute bottom-4 left-4 text-[10px] text-white/10 font-mono">+</div>
                  <div className="absolute bottom-4 right-4 text-[10px] text-white/10 font-mono">+</div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                  <div className="relative flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-4 tracking-widest text-white font-display border-b border-white/5 pb-2">OUR MISSION</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                      To foster innovation and entrepreneurship by providing students with the technical skills, business knowledge, and networking opportunities needed to succeed in today's competitive tech industry.
                    </p>

                    <div className="mt-auto relative rounded-lg bg-black/40 p-4 font-mono text-[11px] border border-white/5 backdrop-blur-md">
                      <pre className="text-gray-400 leading-tight overflow-x-auto scrollbar-hide">
                        <code>
                          <span className="text-blue-400">function</span> <span className="text-yellow-300">innovate</span>() {'{'}
                          <br />
                          {"  "}<span className="text-purple-400">return</span> community.<span className="text-yellow-300">impact</span>();
                          <br />
                          {'}'}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" once={true} delay={0.4}>
                <div className="group relative p-8 h-full bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-secondary/20 transition-all duration-500 overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />
                  <div className="absolute top-4 left-4 text-[10px] text-white/10 font-mono">+</div>
                  <div className="absolute top-4 right-4 text-[10px] text-white/10 font-mono">+</div>
                  <div className="absolute bottom-4 left-4 text-[10px] text-white/10 font-mono">+</div>
                  <div className="absolute bottom-4 right-4 text-[10px] text-white/10 font-mono">+</div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-secondary/10 transition-colors" />

                  <div className="relative flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-4 tracking-widest text-white font-display border-b border-white/5 pb-2">OUR VISION</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                      To become the premier platform for nurturing technical and entrepreneurial talent, empowering students to create innovative solutions.
                    </p>

                    <div className="mt-auto border-l-2 border-primary/30 magnification-pr-4 magnification-py-3 bg-white/[0.02] rounded-r-lg pl-4 py-3">
                      <p className="italic text-gray-300 text-xs leading-relaxed font-light">
                        "Transforming ideas into impactful solutions for a better tomorrow."
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Events Carousel Section */}
        <section id="events" className="relative z-10 bg-black overflow-hidden">

          {/* Section Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/[0.02] blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="container mx-auto relative z-10">
            <ScrollReveal delay={0.2} once={true}>
              <div className="relative mb-24">
                {/* Massive background text */}
                <div className="absolute -top-12 -left-8 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap">
                  VIBRANCE
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-[1px] bg-primary" />
                      <h2 className="text-xs font-mono text-primary tracking-[0.5em] uppercase font-bold">InovX Experiences</h2>
                    </div>
                    <h3 className="text-4xl xs:text-5xl md:text-8xl font-display font-black tracking-tighter leading-none">
                      VIBRANT_<span className="text-primary italic">EVENTS</span>
                    </h3>
                  </div>
                  <div className="max-w-md border-l-2 border-white/10 pl-8 py-2">
                    <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed italic">
                      "Glimpses into our high-octane hackathons, strategic boardrooms, and exclusive networking mixers."
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} once={true}>
              <HorizontalScroll>
                {[
                  {
                    title: "InovX Hackathon 2025",
                    category: "HACKATHON",
                    desc: "48 hours of intense coding and product building. Where prototypes transition into viable startups.",
                    img: "/hackathon_event_1772289703083.png",
                    date: "MAR 2025",
                    tags: ["Code", "Build", "Scale"]
                  },
                  {
                    title: "Strategy Spotlight",
                    category: "WORKSHOP",
                    desc: "Mastering the art of business scaling, financial modeling, and venture capital acquisition.",
                    img: "/business_strategy_event_1772289721670.png",
                    date: "APR 2025",
                    tags: ["Scale", "VC", "Growth"]
                  },
                  {
                    title: "Leaders Connect",
                    category: "MEETUP",
                    desc: "Exclusive networking with tech founders and industry titans in an elite environment.",
                    img: "/networking_event_inovx_1772289739248.png",
                    date: "JUN 2025",
                    tags: ["Network", "Elite", "Connect"]
                  },
                  {
                    title: "DevQuest 1.0",
                    category: "HACKATHON",
                    desc: "A search for the most innovative software solutions to real-world industrial problems.",
                    img: "/gallery_coding_session_1772987258487.png",
                    date: "JUL 2025",
                    tags: ["Innovate", "Solve", "Win"]
                  },
                  {
                    title: "Venture Summit",
                    category: "CONFERENCE",
                    desc: "Bridging the gap between student innovators and seasoned venture capitalists and angel investors.",
                    img: "/gallery_networking_mixer_1772987275932.png",
                    date: "AUG 2025",
                    tags: ["Venture", "Pitch", "Network"]
                  }
                ].map((event, index) => (
                  <div key={index} className="w-[85vw] md:w-[45vw] lg:w-[32vw] flex-shrink-0 px-4">
                    <div className="group/card relative h-[600px] overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#050505] transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                      {/* Image Container */}
                      <div className="absolute inset-0">
                        <img
                          src={event.img}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 grayscale-[0.5] group-hover/card:grayscale-0 opacity-40 group-hover/card:opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      </div>

                      {/* Top Metadata */}
                      <div className="absolute top-10 left-10 right-10 flex justify-between items-start z-20">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-primary tracking-[0.3em] font-bold uppercase">EVENT_LOG</span>
                          <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{event.date}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md group-hover/card:bg-primary group-hover/card:text-black transition-all duration-500">
                          <ArrowRight className="w-4 h-4 transform -rotate-45 group-hover/card:rotate-0 transition-transform duration-500" />
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="absolute bottom-0 left-0 p-10 w-full space-y-6 z-20">
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono tracking-[0.2em] text-primary uppercase font-bold">
                            {event.category}
                          </span>
                          <div className="h-[1px] flex-1 bg-white/10" />
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-3xl font-bold tracking-tight text-white leading-tight">
                            {event.title}
                          </h4>
                          <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2 transform transition-all duration-500 delay-100 opacity-80 group-hover/card:opacity-100">
                            {event.desc}
                          </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                          {event.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-mono text-white/30 tracking-widest uppercase py-1 px-2 border border-white/5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover Industrial Accent */}
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-white/20 transform scale-0 group-hover/card:scale-100 transition-transform duration-700" />
                    </div>
                  </div>
                ))}
              </HorizontalScroll>
            </ScrollReveal>
          </div>
        </section>




        {/* Selected Works / Features */}
        <section id="projects" className="py-32 bg-black relative z-10 overflow-hidden min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Text Content */}
              <div className="relative z-20 flex flex-col justify-center h-full">
                <div className="space-y-8 text-lg text-gray-400 max-w-xl">
                  <ScrollReveal delay={0.1} once={true}>
                    <div>
                      <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
                        Why InovX?
                      </h2>
                      <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-display">
                        Bridging The Gap Between Ideas and Execution
                      </h3>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2} once={true}>
                    <p className="text-xl leading-relaxed text-gray-300">
                      InovX is a premier student organization dedicated to fostering the next generation of
                      leaders who are as comfortable with code as they are with cash flows and marketing strategies.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3} once={true}>
                    <div className="space-y-8">
                      <div className="flex gap-4 group">
                        <div className="mt-1">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white text-lg font-semibold mb-2">Technical Projects</h4>
                          <p className="text-gray-400 leading-relaxed text-base">
                            Work on real-world projects that solve business problems using modern
                            technologies like AI, Web Development, and Cybersecurity.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 group">
                        <div className="mt-1">
                          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                            <div className="w-2 h-2 bg-secondary rounded-full" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white text-lg font-semibold mb-2">Business Hackathons</h4>
                          <p className="text-gray-400 leading-relaxed text-base">
                            Participate in events where strategy meets code. Build business models,
                            pitch to investors, and showcase your product vision.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 group">
                        <div className="mt-1">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white text-lg font-semibold mb-2">Exclusive Networking</h4>
                          <p className="text-gray-400 leading-relaxed text-base">
                            Gain access to a network of industry professionals, startup founders,
                            and mentors who are shaping the future of global industries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.4} once={true}>
                    <div className="pt-8">
                      <Link to="/auth?mode=signup">
                        <MagneticHover>
                          <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300 px-8 py-6 text-lg font-semibold h-auto">
                            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </MagneticHover>
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* Right Side: Card Swap */}
              <div className="relative flex items-center justify-center lg:justify-end h-full">
                <ParallaxSection speed={0.3}>
                  <div className="relative h-[600px] w-full flex items-center justify-center">
                    <ScrollReveal delay={0.8} direction="right">
                      <CardSwap pauseOnHover={true} width={380} height={480}>
                        {CARDS.map((card) => (
                          <Card key={card.id} className="p-8 flex flex-col justify-between bg-black border border-white/20 shadow-2xl">
                            <div className="font-normal text-gray-300 text-lg leading-relaxed">
                              {card.content}
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-2xl font-medium text-white font-display">
                                  {card.name}
                                </p>
                              </div>

                              <p className="text-gray-500 font-mono text-sm uppercase tracking-wider">
                                {card.designation}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </CardSwap>
                    </ScrollReveal>
                  </div>
                </ParallaxSection>
              </div>
            </div>
          </div>
        </section>
        <div className='flex justify-center items-center py-20 px-4'>
          <ScrollReveal delay={0.3}>
            <TerminalDemo />
          </ScrollReveal>
        </div>

        {/* Gallery Section */}
        <GallerySection />

        {/* Statistics Section */}
        <section className="py-40 bg-black relative z-10 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal delay={0.2}>
              <div className="text-center mb-24 space-y-4">
                <h2 className="text-primary font-mono text-sm tracking-[0.5em] uppercase">Impact Metrics</h2>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                  THE_POWER_OF_<span className="italic text-primary">COMMUNITY</span>
                </h3>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <StaggeredReveal staggerDelay={0.1}>
                {displayStats.map((stat: any, i: number) => (
                  <div key={i} className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div className="text-[10px] font-mono text-white/20 tracking-widest">0{i + 1}</div>
                      </div>
                      <div>
                        <CounterAnimation
                          from={0}
                          to={stat.value}
                          duration={2.5}
                          suffix={stat.suffix || "+"}
                          className="text-5xl md:text-6xl font-bold text-white block tracking-tighter"
                        />
                        <p className="text-gray-500 mt-2 text-xs uppercase tracking-[0.2em] font-medium group-hover:text-gray-300 transition-colors">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggeredReveal>
            </div>
          </div>
        </section>

      </main>
    </div>

  );
}
