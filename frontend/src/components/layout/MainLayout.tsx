import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';

import { Footer } from './Footer';


export function MainLayout() {
  const location = useLocation();
  const isProblemPage = location.pathname.startsWith('/problem/');

  return (
    <div className="min-h-screen bg-black cyber-grid relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      {!isProblemPage && <Navbar />}

      <main className="relative">
        <Outlet />
      </main>

      {!isProblemPage && <Footer />}
    </div>

  );
}
