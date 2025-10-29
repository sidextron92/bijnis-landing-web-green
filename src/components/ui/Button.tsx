'use client';

import { ButtonHTMLAttributes, ReactNode, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
}

/**
 * Animated Button component with micro-interactions
 * Supports magnetic effect and hover animations
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary:
      'bg-[#078236] text-white hover:opacity-90 border-[#078236]',
    secondary:
      'bg-white text-gray-900 hover:bg-gray-100 border-white',
    outline:
      'bg-transparent text-white hover:bg-[#078236] hover:text-white border-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!magnetic) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        gsap.to(button, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      if (magnetic) {
        button.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        if (magnetic) {
          button.removeEventListener('mousemove', handleMouseMove);
        }
      };
    },
    { scope: buttonRef }
  );

  return (
    <button
      ref={buttonRef}
      className={cn(
        'rounded-full font-medium border-2 transition-colors duration-200 cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
