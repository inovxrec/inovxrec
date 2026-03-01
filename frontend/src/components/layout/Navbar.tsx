import { Link } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/in.png" alt="InovX Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/projects" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Projects</Link>
            <Link to="/events" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Events</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Contact</Link>

            <div className="h-6 w-px bg-white/10 mx-2" />

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-gray-300">{user?.username}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={logout} className="hover:bg-red-500/10 hover:text-red-500">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth?mode=login">
                  <Button variant="ghost" className="text-gray-400 hover:text-white">Login</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="neon" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-lg px-4 py-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-lg px-4 py-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/projects" className="text-lg px-4 py-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <Link to="/events" className="text-lg px-4 py-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Events</Link>
              <Link to="/contact" className="text-lg px-4 py-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

              <div className="h-px bg-white/5 my-2" />

              {isAuthenticated ? (
                <div className="flex flex-col gap-4 px-4 pt-2">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <span className="text-gray-300 font-medium">{user?.username}</span>
                  </div>
                  <Button variant="ghost" onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 px-4 pt-2">
                  <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="neon" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
