import { Outlet, useLocation } from 'react-router-dom';
import CardNav from '@/component/CardNav';
import logo from '@/assets/logo.svg';

export function MainLayout() {
  const items = [
    {
      label: "Explore",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Problems", ariaLabel: "Browse Problems", href: "/problems" },
        { label: "Dashboard", ariaLabel: "User Dashboard", href: "/dashboard" }
      ]
    },
    {
      label: "Account",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Profile", ariaLabel: "My Profile", href: "/profile" },
        { label: "Login / Register", ariaLabel: "Authentcation", href: "/auth" }
      ]
    }
  ];

  const location = useLocation();
  const isProblemPage = location.pathname.startsWith('/problem/');

  return (
    <div className="min-h-screen bg-background cyber-grid relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      {!isProblemPage && (
        <div className="relative z-50">
          <CardNav
            logo={logo}
            logoAlt="Company Logo"
            items={items}
            baseColor="#00000000"
            menuColor="#fff"
            buttonBgColor="#2A2A2A"
            buttonTextColor="#fff"
            ease="power3.out"
          />
        </div>
      )}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
