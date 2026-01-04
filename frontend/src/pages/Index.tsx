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

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  const CARDS = [
    {
      id: 0,
      name: "Code Execution",
      designation: "Core Engine",
      content: (
        <p>
          Instant, secure, and isolated <span className="font-bold text-white">code execution environment</span> supporting multiple languages. Run your algorithms with confidence.
        </p>
      ),
    },
    {
      id: 1,
      name: "Progress Tracking",
      designation: "Analytics",
      content: (
        <p>
          Detailed insights into your <span className="font-bold text-white">problem-solving journey</span> with visual analytics and history. Track your growth over time.
        </p>
      ),
    },
    {
      id: 2,
      name: "Global Leaderboards",
      designation: "Competition",
      content: (
        <p>
          Compete with developers worldwide and see where you stand in the <span className="font-bold text-white">global rankings</span>. Challenge yourself to reach the top.
        </p>
      ),
    },
    {
      id: 3,
      name: "Community Hub",
      designation: "Social",
      content: (
        <p>
          Discuss problems, share <span className="font-bold text-white">optimized solutions</span>, and learn from the best in the field. Grow together.
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

        {/* Philosophy / About Section */}
        <section className="py-32 px-4 relative z-10 bg-black scroll-optimized">
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
                    <p className="text-4xl md:text-5xl font-light leading-tight tracking-tight">
                      <span className="text-gray-500">We believe in</span>{' '}
                      <TypewriterText
                        text="pushing boundaries"
                        className="text-white font-medium"
                        delay={1000}
                        speed={80}
                        once={true}
                      />{' '}
                      <span className="text-gray-500">of what's possible in</span>{' '}
                      <span className="text-white">code execution</span>.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.8} once={true}>
                    <div className="mt-12 flex gap-4">
                      {isAuthenticated ? (
                        <Link to="/problems">
                          <MagneticHover>
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300">
                              Start Coding <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </MagneticHover>
                        </Link>
                      ) : (
                        <Link to="/auth?mode=signup">
                          <MagneticHover>
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 hover:text-black transition-all duration-300">
                              Get Started <ArrowRight className="ml-2 h-4 w-4" />
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
                      Our platform leverages cutting-edge technology to provide immediate feedback and deeper insights into your code. We don't just run tests; we analyze structure.
                    </p>
                  </ScrollReveal>
                </div>

                <div className="group">
                  <TextReveal direction="left" delay={0.2} once={true}>
                    <h3 className="text-2xl font-bold mb-4">Performance</h3>
                  </TextReveal>
                  <ScrollReveal delay={0.4} direction="right" once={true}>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Speed is of the essence. Our localized execution environment ensures that your algorithms are tested securely and swiftly, matching the pace of your thoughts.
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

        {/* Selected Works / Features */}
        <section className="py-20 bg-black relative z-10 overflow-hidden min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side: Text Content */}
              <div className="relative z-20 flex flex-col justify-center h-full">
                <div className="space-y-8 text-lg text-gray-400 max-w-xl">
                  <ScrollReveal delay={0.1} once={true}>
                    <div>
                      <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
                        Why MeetCode?
                      </h2>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-display">
                        The Future of Technical Interviews
                      </h3>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2} once={true}>
                    <p className="text-xl leading-relaxed text-gray-300">
                      MeetCode revolutionizes how developers showcase their skills. Our platform combines
                      cutting-edge technology with intuitive design to create the most advanced coding
                      interview experience available today.
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
                          <h4 className="text-white text-lg font-semibold mb-2">Instant Execution Environment</h4>
                          <p className="text-gray-400 leading-relaxed text-base">
                            Run your code in real-time with our secure, isolated execution environment.
                            Support for multiple programming languages with instant feedback.
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
                          <h4 className="text-white text-lg font-semibold mb-2">Advanced Code Analysis</h4>
                          <p className="text-gray-400 leading-relaxed text-base">
                            Beyond just running tests, we analyze your code structure, efficiency,
                            and provide detailed insights to help you improve.
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
                          <h4 className="text-white text-lg font-semibold mb-2">Global Developer Community</h4>
                          <p className="text-gray-400 leading-relaxed text-base">
                            Connect with developers worldwide, share solutions, and learn from
                            the best in the field through our collaborative platform.
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
              <h2 className="text-center text-4xl md:text-6xl font-bold text-white mb-16">
                Trusted by Developers Worldwide
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <StaggeredReveal staggerDelay={0.2}>
                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={50000}
                    duration={2.5}
                    suffix="+"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Active Users</p>
                </div>

                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={1200}
                    duration={2.5}
                    suffix="+"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Problems Solved</p>
                </div>

                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={99}
                    duration={2.5}
                    suffix=".9%"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Uptime</p>
                </div>

                <div className="text-center">
                  <CounterAnimation
                    from={0}
                    to={15}
                    duration={2.5}
                    suffix="ms"
                    className="text-4xl md:text-5xl font-bold text-white block"
                  />
                  <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Avg Response</p>
                </div>
              </StaggeredReveal>
            </div>
          </div>
        </section>

        {/* Footer Minimalist */}
        <footer className="py-20 bg-black border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <ParallaxSection speed={0.2}>
              <ScrollReveal delay={0.2}>
                <h2 className="font-display text-[12vw] font-bold leading-none tracking-tighter text-white/10 select-none pointer-events-none">
                  MEETCODE
                </h2>
              </ScrollReveal>
            </ParallaxSection>

            <ScrollReveal delay={0.4}>
              <div className="flex justify-between items-end mt-12 text-gray-500 text-sm font-mono uppercase tracking-widest">
                <div>© 2025 MeetCode Inc.</div>
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
