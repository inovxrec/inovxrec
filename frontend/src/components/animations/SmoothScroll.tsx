import { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Enhanced smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add CSS for better scroll performance
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 2rem;
      }
      
      * {
        scroll-behavior: inherit;
      }
      
      /* Smooth momentum scrolling for webkit browsers */
      body {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
      
      /* Better scroll performance */
      .scroll-smooth {
        scroll-behavior: smooth;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
        
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    // Add smooth scroll class to body
    document.body.classList.add('scroll-smooth');
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.classList.remove('scroll-smooth');
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return <>{children}</>;
}