'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

/**
 * ScrollReveal component
 * Reveals children elements with stagger animation on scroll
 */
export function ScrollReveal({
  children,
  stagger = 0.1,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const elements = ref.current.children;
      if (elements.length === 0) return;

      gsap.from(elements, {
        opacity: 0,
        y: 30,
        stagger,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
