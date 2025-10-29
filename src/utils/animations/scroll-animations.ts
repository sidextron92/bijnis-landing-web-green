/**
 * Reusable GSAP animation configurations for scroll-based animations
 * These can be used across different components for consistency
 */

import { gsap } from '@/lib/gsap';

export const fadeInUp = {
  from: {
    opacity: 0,
    y: 60,
  },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
};

export const fadeInDown = {
  from: {
    opacity: 0,
    y: -60,
  },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
};

export const fadeInLeft = {
  from: {
    opacity: 0,
    x: -60,
  },
  to: {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
};

export const fadeInRight = {
  from: {
    opacity: 0,
    x: 60,
  },
  to: {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
};

export const scaleIn = {
  from: {
    opacity: 0,
    scale: 0.8,
  },
  to: {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out',
  },
};

export const parallaxSettings = {
  speed: 0.5,
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
};

/**
 * Stagger animation for multiple elements
 */
export const staggerReveal = (
  elements: HTMLElement[] | NodeListOf<Element>,
  delay = 0
) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    delay,
    duration: 0.6,
    ease: 'power2.out',
  });
};
