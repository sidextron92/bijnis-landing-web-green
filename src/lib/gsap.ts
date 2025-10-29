'use client';

/**
 * GSAP initialization with SSR-safe setup for Next.js
 * All GSAP plugins must be registered here to work properly
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// Register plugins only on client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

// Configure GSAP defaults for consistent animations
gsap.defaults({
  duration: 0.8,
  ease: 'power3.out',
});

// Configure ScrollTrigger defaults
if (typeof window !== 'undefined') {
  ScrollTrigger.defaults({
    markers: process.env.NODE_ENV === 'development' ? false : false, // Set to true for debugging
  });
}

export { gsap, ScrollTrigger, Observer };
