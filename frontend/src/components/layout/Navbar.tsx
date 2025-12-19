import { Link } from 'react-router-dom';
import { Code2, User, LogOut, Menu, X } from 'lucide-react';
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
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary transition-all group-hover:text-glow" />
              <div className="absolute inset-0 blur-lg bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-foreground">
              CYBER<span className="text-primary">CODE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/problems">
                  <Button variant="ghost" className="font-medium">
                    Problems
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" className="font-medium">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{user?.username}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth?mode=login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="neon">Sign Up</Button>
                </Link>
              </>
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
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/problems" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Problems
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm px-4">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{user?.username}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="neon" className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
