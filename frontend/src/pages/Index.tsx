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

export default function Index() {
  const { isAuthenticated } = useAuthStore();

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
      <CursorFollower />
      <FloatingElements count={15} />

      <main className="scroll-optimized">
        <ExovanceHero />

        {/* Global Announcement / Ticker */}


        {/* Philosophy / About Section */}
        <section id="about" className="py-32 px-4 relative z-10 bg-black scroll-optimized">
          <div className="container mx-auto">
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
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.8} once={true}>
                    <div className="mt-12 flex gap-4">
                      {isAuthenticated ? (
                        <Link to="/auth?mode=signup">
                          <MagneticHover>
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300">
                              Explore InovX <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </MagneticHover>
                        </Link>
                      ) : (
                        <Link to="/auth?mode=signup">
                          <MagneticHover>
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300">
                              Join Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </MagneticHover>
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              <div className="space-y-32 pt-20">
                <div className="group">
                  <TextReveal direction="left" delay={0.2} once={true}>
                    <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                  </TextReveal>
                  <ScrollReveal delay={0.4} direction="right" once={true}>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Bridging the gap between code and commerce. We focus on teaching the business logic behind every technical innovation.
                    </p>
                  </ScrollReveal>
                </div>

                <div className="group">
                  <TextReveal direction="left" delay={0.2} once={true}>
                    <h3 className="text-2xl font-bold mb-4">Performance</h3>
                  </TextReveal>
                  <ScrollReveal delay={0.4} direction="right" once={true}>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      From operational efficiency to financial strategy, we equip you with the tools to turn your ideas into viable, scaling enterprises.
                    </p>
                  </ScrollReveal>
                </div>

                <div className="group">
                  <TextReveal direction="left" delay={0.2} once={true}>
                    <h3 className="text-2xl font-bold mb-4">Community</h3>
                  </TextReveal>
                  <ScrollReveal delay={0.4} direction="right" once={true}>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Join a global network of elite developers. Share solutions, optimize approaches, and grow together in an ecosystem designed for excellence.
                    </p>
                  </ScrollReveal>
                </div>
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
                  We are a student-led departmental club <span className="text-gray-500">bridging the gap between</span> <span className="text-white">technical skills</span> and <span className="text-white">business acumen</span>, preparing the next generation of tech entrepreneurs.
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

                    <div className="mt-auto border-l-2 border-primary/30 pl-4 py-3 bg-white/[0.02] rounded-r-lg">
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
        <section id="events" className="py-32 px-4 relative z-10 bg-black overflow-hidden">
          <div className="container mx-auto">
            <ScrollReveal delay={0.2} once={true}>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                  <h2 className="text-sm font-mono text-primary mb-4 tracking-[0.3em] uppercase">Club Life</h2>
                  <h3 className="text-3xl xs:text-4xl md:text-6xl font-display font-bold tracking-tighter">
                    VIBRANT_<span className="text-primary">EVENTS</span>
                  </h3>
                </div>
                <p className="max-w-md text-gray-500 text-lg font-light leading-relaxed">
                  Glimpses into our high-octane hackathons, strategic boardrooms, and exclusive networking mixers.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} once={true}>
              <div className="relative px-12">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {[
                      {
                        title: "InovX Hackathon 2025",
                        desc: "48 hours of intense coding and product building.",
                        img: "/hackathon_event_1772289703083.png"
                      },
                      {
                        title: "Strategy Spotlight",
                        desc: "Mastering the art of business scaling and financial modeling.",
                        img: "/business_strategy_event_1772289721670.png"
                      },
                      {
                        title: "Leaders Connect",
                        desc: "Exclusive networking with tech founders and industry titans.",
                        img: "/networking_event_inovx_1772289739248.png"
                      }
                    ].map((event, index) => (
                      <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a]">
                          <img
                            src={event.img}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                          <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 className="text-xl font-bold mb-2 tracking-tight text-white">{event.title}</h4>
                            <p className="text-gray-400 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {event.desc}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-6 bg-black/50 border-white/10 hover:bg-primary hover:border-primary text-white" />
                  <CarouselNext className="hidden md:flex -right-6 bg-black/50 border-white/10 hover:bg-primary hover:border-primary text-white" />
                </Carousel>
              </div>
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

        {/* Statistics Section */}
        <section className="py-32 bg-black relative z-10">
          <div className="container mx-auto px-4">
            <ScrollReveal delay={0.2}>
              <h2 className="text-center text-3xl xs:text-4xl md:text-6xl font-bold text-white mb-16">
                Our Growing Community
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <StaggeredReveal staggerDelay={0.2}>
                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={500}
                    duration={2.5}
                    suffix="+"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Members</p>
                </div>

                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={50}
                    duration={2.5}
                    suffix="+"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Projects Launched</p>
                </div>

                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={200}
                    duration={2.5}
                    suffix="+"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Events Hosted</p>
                </div>

                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={12}
                    duration={2.5}
                    suffix="+"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Industry Partners</p>
                </div>
              </StaggeredReveal>
            </div>
          </div>
        </section>

        {/* Footer Minimalist */}
        <footer id="contact" className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <ParallaxSection speed={0.2}>
              <ScrollReveal delay={0.2}>
                <h2 className="font-display text-[12vw] font-bold leading-none tracking-tighter text-white/10 select-none pointer-events-none">
                  INOVX
                </h2>
              </ScrollReveal>
            </ParallaxSection>

            <ScrollReveal delay={0.4}>
              <div className="flex justify-between items-end mt-12 text-gray-500 text-sm font-mono uppercase tracking-widest">
                <div>© 2025 InovX Club.</div>
                <div className="flex gap-8">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </main>
    </div >
  );
}
