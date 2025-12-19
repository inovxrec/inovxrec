import { Outlet } from 'react-router-dom';
import CardNav from '@/component/CardNav';
import logo from '@/assets/logo.svg';

export function MainLayout() {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/" },
        { label: "Careers", ariaLabel: "About Careers", href: "/" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/problems" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/dashboard" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:contact@example.com" },
        { label: "Twitter", ariaLabel: "Twitter", href: "#" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background cyber-grid relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
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
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
