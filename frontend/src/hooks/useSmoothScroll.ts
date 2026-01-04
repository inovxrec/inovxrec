import { useCallback } from 'react';

interface ScrollToOptions {
  top?: number;
  left?: number;
  behavior?: 'auto' | 'smooth';
  duration?: number;
}

export function useSmoothScroll() {
  const scrollTo = useCallback((options: ScrollToOptions) => {
    const {
      top = 0,
      left = 0,
      behavior = 'smooth',
      duration = 800
    } = options;

    // Use native smooth scroll if supported and no custom duration
    if (behavior === 'smooth' && duration === 800) {
      window.scrollTo({
        top,
        left,
        behavior: 'smooth'
      });
      return;
    }

    // Custom smooth scroll with easing
    const startTime = performance.now();
    const startTop = window.pageYOffset;
    const startLeft = window.pageXOffset;
    const distanceTop = top - startTop;
    const distanceLeft = left - startLeft;

    // Easing function (ease-out-cubic)
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(
        startLeft + distanceLeft * easedProgress,
        startTop + distanceTop * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const scrollToElement = useCallback((
    element: HTMLElement | string,
    options: Omit<ScrollToOptions, 'top' | 'left'> & { offset?: number } = {}
  ) => {
    const { offset = 0, ...scrollOptions } = options;
    
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;

    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const top = window.pageYOffset + rect.top - offset;

    scrollTo({
      top,
      ...scrollOptions
    });
  }, [scrollTo]);

  return {
    scrollTo,
    scrollToElement
  };
}