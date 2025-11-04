# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Bijnis landing website - a Next.js 16 application showcasing India's 60-minute factory to retailer supply chain solution. The site features heavy animation work using GSAP, smooth scrolling with Lenis, and is optimized for both desktop and mobile experiences.

## Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## Architecture

### Animation System

The project relies heavily on GSAP for animations. **Critical setup:**

- **GSAP Configuration**: All GSAP imports must come from `@/lib/gsap.ts`, NOT directly from the gsap package
- This file handles SSR-safe plugin registration (ScrollTrigger, Observer)
- GSAP plugins are only registered client-side to avoid Next.js hydration issues
- Default animation settings: `duration: 0.8`, `ease: 'power3.out'`

### Smooth Scrolling Integration

The app uses Lenis for smooth scrolling, integrated at the root level:

- `SmoothScroll` component wraps all content in `layout.tsx`
- Lenis is synchronized with GSAP's ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Animation frame loop runs continuously to update Lenis
- This integration is essential for scroll-based animations to work correctly

### Component Organization

```
src/
├── app/                    # Next.js 16 App Router
├── components/
│   ├── animations/         # Reusable animation wrappers (FadeIn, ScrollReveal, ParallaxSection, etc.)
│   ├── layout/            # Layout components (Header, SmoothScroll)
│   ├── map/               # India map visualization components
│   ├── sections/          # Page sections (Hero, About, Mission, Contact, etc.)
│   └── ui/                # UI primitives (Button, Card, Input, TextArea)
├── hooks/                 # Custom React hooks (useInView, useMousePosition, useReducedMotion, etc.)
├── lib/                   # Library configurations (GSAP setup)
└── utils/                 # Utility functions and animation helpers
```

### Video Playback for iOS

When working with video elements (especially autoplay videos), be aware of iOS restrictions:

- **iOS blocks autoplay** when Low Power Mode is enabled, Reduce Motion is on, or due to autoplay policies
- Videos should have `autoPlay={false}` and use programmatic play with user interaction fallback
- Implement a user interaction handler that triggers play on `touchend` or `click` events
- Example pattern in `LoadingAnimation.tsx`: attempts autoplay first, shows "Tap to Play" overlay if blocked
- Always include video attributes: `muted`, `playsInline`, `webkit-playsinline="true"`, `x5-playsinline="true"`

### Mobile Debugging

The project includes Eruda for mobile debugging:

- Automatically loads in development mode only
- Provides console, network inspector, and DOM viewer on mobile devices
- Initialized in `layout.tsx` via the `<Eruda />` component

### Styling Approach

- **Tailwind CSS 4.1** with PostCSS for styling
- Custom font: Outfit (Google Fonts) loaded in `layout.tsx`
- Color scheme: Dark green theme (`#020D06` background, `#03B044` to `#078236` gradient accents)
- Utility function `cn()` in `src/utils/cn.ts` for conditional class merging (clsx + tailwind-merge)

### Key Technical Considerations

1. **SSR Safety**: All client-side only code (GSAP, Lenis, browser APIs) must be wrapped in `'use client'` directives
2. **Animation Performance**: GSAP is configured with `optimizePackageImports` in `next.config.mjs`
3. **Accessibility**: `useReducedMotion` hook should be used to respect user motion preferences
4. **Video Assets**: Provide both `.webm` and `.mp4` formats for browser compatibility

## Important Patterns

### Creating New Animated Components

1. Import GSAP from `@/lib/gsap` (never from 'gsap' directly)
2. Use `useGSAP` hook from `@gsap/react` for component-scoped animations
3. Check `useReducedMotion()` to conditionally disable animations
4. Use ScrollTrigger for scroll-based animations

### Working with Sections

- Page sections are in `src/components/sections/`
- Each section is a self-contained component with its own animations
- Main page (`src/app/page.tsx`) composes sections in order
- Sections use semantic HTML (`<section>` with `id` attributes for navigation)

### State Management

- No global state management library (Redux, Zustand, etc.)
- Component-local state with `useState`
- Refs (`useRef`) for DOM access and GSAP targets
- Session storage used for first-visit detection in `LoadingAnimation`
