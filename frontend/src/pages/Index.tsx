import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Zap, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import LightRays from '@/component/LightRays';
import CardSwap, { Card as SwapCard } from '@/component/CardSwap';
import { TerminalDemo } from '@/components/TerminalDemo';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        <div className="container mx-auto text-center py-8 relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">

          </div>
          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            CYBER<span className="text-primary">CODE</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Master algorithms. Crack interviews.
            <span className="text-primary"> Level up your coding skills</span> in the neon-lit arena.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {isAuthenticated ? (
              <>
                <Link to="/problems">
                  <Button size="xl" className="group">
                    Start Coding
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="neon" size="xl">
                    View Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth?mode=signup">
                  <Button size="xl" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth?mode=login">
                  <Button variant="neon" size="xl">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-display text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-display text-accent">50K+</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-display text-secondary">1M+</div>
              <div className="text-sm text-muted-foreground">Submissions</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <div className="text-left space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-wider leading-tight">
                WHY_<span className="text-primary">CYBERCODE</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Card stacks have never looked so good.<br />
                Just look at it go!
              </p>
              <p className="text-muted-foreground max-w-md">
                Built for developers who want to level up fast. Experience the next generation of coding interviews with our cutting-edge platform.
              </p>
            </div>

            {/* Right Column: CardSwap */}
            <div className="flex justify-center items-center">
              <div style={{ height: '500px', position: 'relative', width: '100%', maxWidth: '500px' }}>
                <CardSwap
                  cardDistance={40}
                  verticalDistance={50}
                  delay={4000}
                  pauseOnHover={true}
                >
                  <SwapCard className="overflow-hidden bg-[#0D0716]/90 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl">
                    <div className="px-4 py-3 border-b border-cyan-500/10 flex items-center gap-2 bg-cyan-500/5">
                      <Zap className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-medium text-cyan-400">Lightning Fast</span>
                    </div>
                    <div className="p-8 flex flex-col items-center justify-center text-center h-[300px]">
                      <h3 className="font-display text-3xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Speed</h3>
                      <p className="text-muted-foreground text-lg">
                        Real-time code execution with instant feedback. No waiting, just coding.
                      </p>
                    </div>
                  </SwapCard>

                  <SwapCard className="overflow-hidden bg-[#170D27]/90 backdrop-blur-xl border border-fuchsia-500/20 rounded-xl shadow-2xl">
                    <div className="px-4 py-3 border-b border-fuchsia-500/10 flex items-center gap-2 bg-fuchsia-500/5">
                      <Trophy className="h-4 w-4 text-fuchsia-500" />
                      <span className="text-sm font-medium text-fuchsia-500">Track Progress</span>
                    </div>
                    <div className="p-8 flex flex-col items-center justify-center text-center h-[300px]">
                      <h3 className="font-display text-3xl font-bold mb-4 text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">Rank Up</h3>
                      <p className="text-muted-foreground text-lg">
                        Detailed analytics and progress tracking. Watch yourself improve.
                      </p>
                    </div>
                  </SwapCard>

                  <SwapCard className="overflow-hidden bg-[#271E37]/90 backdrop-blur-xl border border-violet-500/20 rounded-xl shadow-2xl">
                    <div className="px-4 py-3 border-b border-violet-500/10 flex items-center gap-2 bg-violet-500/5">
                      <Users className="h-4 w-4 text-violet-500" />
                      <span className="text-sm font-medium text-violet-500">Community</span>
                    </div>
                    <div className="p-8 flex flex-col items-center justify-center text-center h-[300px]">
                      <h3 className="font-display text-3xl font-bold mb-4 text-violet-500 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">Connect</h3>
                      <p className="text-muted-foreground text-lg">
                        Learn from others. Share solutions. Grow together with fellow coders.
                      </p>
                    </div>
                  </SwapCard>
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <section className="py-20 px-4 relative flex justify-center">
        <div className="container mx-auto flex justify-center">
          <TerminalDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-wider">
            READY_TO_<span className="text-primary">CODE</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of developers sharpening their skills on CyberCode.
          </p>
          <Link to={isAuthenticated ? "/problems" : "/auth?mode=signup"}>
            <Button size="xl" className="group">
              {isAuthenticated ? 'Browse Problems' : 'Start Your Journey'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-display text-sm tracking-wider">CYBERCODE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CyberCode. Built for developers, by developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
