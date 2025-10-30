'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

/**
 * Mission section with floating logo shader background
 */
export function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [floatingLogos, setFloatingLogos] = useState<any[]>([]);

  // Generate logos only on client side to avoid hydration mismatch
  useEffect(() => {
    const logos = [];
    // Reduce density by 50% on mobile (3 columns instead of 6)
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 3 : 6; // 3 columns on mobile, 6 on desktop
    const rows = 5; // 5 rows = 15 logos on mobile, 30 on desktop

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseLeft = (col / cols) * 100 + (100 / cols / 2); // Center of each column
        const baseTop = (row / rows) * 100 + (100 / rows / 2); // Center of each row

        // Add some randomness to avoid perfect grid
        const randomOffsetX = (Math.random() - 0.5) * 15; // ±7.5% variance
        const randomOffsetY = (Math.random() - 0.5) * 15; // ±7.5% variance

        logos.push({
          id: row * cols + col,
          left: `${baseLeft + randomOffsetX}%`,
          top: `${baseTop + randomOffsetY}%`,
          size: Math.floor(100 + Math.random() * 150), // Random size between 100-250px
          opacity: 0.08 + Math.random() * 0.12, // Random opacity between 0.08-0.2
          duration: 5 + Math.random() * 5, // Random duration between 5-10s (even faster)
          delay: Math.random() * 2, // Random delay up to 2s
          direction: Math.random() > 0.5 ? 1 : -1, // Random direction (left to right or right to left)
        });
      }
    }

    setFloatingLogos(logos);
  }, []);

  // Animate content (title, subtext, image) - runs once
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Animate title
      gsap.from('.mission-title', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate subtext
      gsap.from('.mission-subtext', {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Animate image
      gsap.from('.mission-image', {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
      });
    },
    { scope: sectionRef }
  );

  // Animate floating logos - runs when logos are populated
  useEffect(() => {
    if (floatingLogos.length === 0) return;

    floatingLogos.forEach((logo, index) => {
      const logoEl = logoRefs.current[index];
      if (logoEl) {
        // Slow horizontal drift (left to right or right to left)
        gsap.to(logoEl, {
          x: logo.direction * 100, // Move 100px in random direction
          duration: logo.duration,
          delay: logo.delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // Subtle vertical float
        gsap.to(logoEl, {
          y: 30,
          duration: logo.duration / 2,
          delay: logo.delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });
  }, [floatingLogos]);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative flex flex-col items-center py-12 md:py-24 px-6 bg-[#020D06] overflow-hidden"
    >
      {/* Floating Logo Shader Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingLogos.map((logo, index) => (
          <div
            key={logo.id}
            ref={(el) => { logoRefs.current[index] = el; }}
            className="absolute"
            style={{
              left: logo.left,
              top: logo.top,
              opacity: logo.opacity,
              width: `${logo.size}px`,
              height: `${logo.size}px`,
            }}
          >
            <Image
              src="/images/logo_shader.png"
              alt=""
              width={logo.size}
              height={logo.size}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl w-full">
        {/* Title and Subtext */}
        <h2 className="mission-title text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
          Our Mission
        </h2>
        <p className="mission-subtext text-base md:text-xl lg:text-2xl text-gray-200 leading-relaxed mb-6 md:mb-8 max-w-4xl mx-auto px-4">
          To Build India's fastest Factory to Retailer Supply chain through Real-time demand sensing, Optimised Inventory distribution and super-fast logistics
        </p>

        {/* Image */}
        <div className="mission-image w-full max-w-4xl mx-auto">
          <Image
            src="/images/f2rin60.png"
            alt="Factory to Retail in 60 Minutes"
            width={1200}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
