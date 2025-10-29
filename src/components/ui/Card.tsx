'use client';

import { ReactNode, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Card component with optional hover animation
 */
export function Card({ children, className, hover = true }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!hover) return;
      const card = cardRef.current;
      if (!card) return;

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: cardRef, dependencies: [hover] }
  );

  return (
    <div
      ref={cardRef}
      className={cn(
        'bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-sm',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
