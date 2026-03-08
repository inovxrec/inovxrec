import { User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagneticHover from '@/components/animations/MagneticHover';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 py-1"
          : "bg-transparent py-4"
      )}
    >
      <div className="noise-overlay opacity-[0.02] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Fixed width for balance */}
          <div className="flex-1 flex justify-start">
            <MagneticHover>
              <Link to="/" className="flex items-center gap-2 group relative">
                <div className="absolute -inset-2 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/in.png"
                  alt="InovX Logo"
                  className="h-10 w-auto relative z-10 transition-all duration-500 group-hover:brightness-125"
                />
              </Link>
            </MagneticHover>
          </div>

          {/* Desktop Nav - Centered pill */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-full p-1.5 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-[13px] font-medium px-6 py-2.5 rounded-full transition-all duration-300 relative group overflow-hidden",
                    isActive(link.path)
                      ? "text-white bg-white/10"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive(link.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white/10 to-primary/10 opacity-50" />
                  )}
                  {!isActive(link.path) && (
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className={cn(
                    "text-[13px] font-bold px-6 py-2.5 rounded-full transition-all duration-300 relative text-primary hover:text-white italic",
                    isActive('/admin') && "bg-primary/20"
                  )}
                >
                  ADMIN_PANEL
                </Link>
              )}
            </div>
          </div>

          {/* Auth Section - Fixed width for balance */}
          <div className="flex-1 hidden md:flex items-center justify-end gap-2">
            <div className="h-6 w-px bg-white/10 mx-2" />

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <MagneticHover>
                  <div className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.08] py-1.5 pl-2 pr-4 rounded-full border border-white/10 group cursor-pointer transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/50 transition-colors">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-[12px] font-bold leading-tight">{user?.username}</span>
                      <span className="text-gray-500 text-[10px] uppercase tracking-tighter">Member</span>
                    </div>
                    <ChevronDown className="h-3 w-3 text-gray-500 group-hover:text-white transition-colors ml-1" />
                  </div>
                </MagneticHover>

                <MagneticHover>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="rounded-full bg-white/5 hover:bg-red-500/10 hover:text-red-500 border border-white/5"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </MagneticHover>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Link to="/auth?mode=login">
                  <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-6 transition-all">Login</Button>
                </Link>
                <MagneticHover>
                  <Link to="/auth?mode=signup">
                    <Button variant="default" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all">
                      Join Elite
                    </Button>
                  </Link>
                </MagneticHover>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/5 border border-white/5 hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>



        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-8 border-t border-white/5 animate-in fade-in slide-in-from-top-10 duration-500 ease-out bg-black/95 backdrop-blur-xl fixed inset-x-0 top-[64px] bottom-0 z-40">
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-2xl font-bold px-4 py-4 rounded-2xl transition-all duration-300",
                    isActive(link.path)
                      ? "text-primary bg-white/5"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="tracking-tighter uppercase">{link.name}</span>
                </Link>
              ))}

              {isAuthenticated && (
                <Link
                  to="/admin"
                  className="text-2xl font-bold px-4 py-4 text-primary italic border-t border-white/5 mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ADMIN_PANEL
                </Link>
              )}

              <div className="mt-8 space-y-4">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-lg font-bold">{user?.username}</span>
                        <span className="text-gray-500 text-xs uppercase tracking-widest">Premium Member</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full justify-start text-red-500 hover:bg-red-500/10 h-14 rounded-2xl text-lg"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full h-16 rounded-2xl text-lg">Login</Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full h-16 rounded-2xl text-lg bg-white text-black font-bold">Join Elite</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
