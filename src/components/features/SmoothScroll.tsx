'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    let lenisInstance: InstanceType<typeof import('lenis').default> | null = null;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
