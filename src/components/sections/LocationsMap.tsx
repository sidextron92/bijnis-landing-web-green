'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

/**
 * 18 cities where Bijnis is operational
 * Temporary list - will be replaced with final list later
 */
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Surat', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna'
];

/**
 * Scaling Up Section - India Map with Locations Carousel
 */
export function LocationsMap() {
  const sectionRef = useRef<HTMLElement>(null);
  // Mobile refs
  const mobileRow1Ref = useRef<HTMLDivElement>(null);
  const mobileRow2Ref = useRef<HTMLDivElement>(null);
  const mobileRow3Ref = useRef<HTMLDivElement>(null);
  // Desktop refs
  const desktopRow1Ref = useRef<HTMLDivElement>(null);
  const desktopRow2Ref = useRef<HTMLDivElement>(null);
  const desktopRow3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Animate title
      gsap.from('.scaling-title', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate subtitle
      gsap.from('.scaling-subtitle', {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      // Animate map
      gsap.from('.india-map', {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
      });

      // Animate locations text and carousel
      gsap.from('.locations-text', {
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
        },
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
      });

      // Mobile carousel animations
      if (mobileRow1Ref.current) {
        gsap.to(mobileRow1Ref.current, {
          x: '-33.33%',
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }

      if (mobileRow2Ref.current) {
        gsap.fromTo(
          mobileRow2Ref.current,
          { x: '-33.33%' },
          {
            x: '0%',
            duration: 40,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      if (mobileRow3Ref.current) {
        gsap.to(mobileRow3Ref.current, {
          x: '-33.33%',
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }

      // Desktop carousel animations
      if (desktopRow1Ref.current) {
        gsap.to(desktopRow1Ref.current, {
          x: '-33.33%',
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }

      if (desktopRow2Ref.current) {
        gsap.fromTo(
          desktopRow2Ref.current,
          { x: '-33.33%' },
          {
            x: '0%',
            duration: 40,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      if (desktopRow3Ref.current) {
        gsap.to(desktopRow3Ref.current, {
          x: '-33.33%',
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 bg-[#020D06] overflow-hidden"
    >
      {/* Main Title */}
      <div className="text-center mb-6 max-w-6xl w-full">
        <h2 className="scaling-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          We are <span className="text-[#03B044]">Scaling Up</span>
        </h2>
        <p className="scaling-subtitle text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
          What began as belief is now India's 60-minute supply chain for factories and retailers. For over a decade, we've been building one idea - that factories and retailers deserve freedom. Freedom from middlemen, from waiting, from uncertainty.
        </p>
      </div>

      {/* Map and Carousel Container */}
      <div className="w-full mt-4">
        {/* Title */}
        <h3 className="locations-text text-3xl md:text-4xl font-bold mb-6 text-center px-6 md:px-12">
          Operating in<br />
          <span className="text-[#03B044]">18 locations</span> and counting..
        </h3>

        {/* Mobile: Map then Carousel (stacked) */}
        <div className="md:hidden flex flex-col items-center gap-6">
          {/* India Map */}
          <div className="india-map w-[280px]" style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))' }}>
            <Image
              src="/images/india_map.png"
              alt="India Map"
              width={500}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* 3-Row Carousel */}
          <div className="w-full space-y-4">
            {/* Row 1 */}
            <div className="flex overflow-hidden">
              <div ref={mobileRow1Ref} className="flex gap-6">
                {[...cities.slice(0, 6), ...cities.slice(0, 6), ...cities.slice(0, 6)].map((city, index) => (
                  <div
                    key={`row1-mobile-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A1B10] rounded-lg whitespace-nowrap border border-[#03B044]/30 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="#03B044"/>
                    </svg>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex overflow-hidden">
              <div ref={mobileRow2Ref} className="flex gap-6">
                {[...cities.slice(6, 12), ...cities.slice(6, 12), ...cities.slice(6, 12)].map((city, index) => (
                  <div
                    key={`row2-mobile-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A1B10] rounded-lg whitespace-nowrap border border-[#03B044]/30 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" fill="#03B044"/>
                    </svg>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex overflow-hidden">
              <div ref={mobileRow3Ref} className="flex gap-6">
                {[...cities.slice(12, 18), ...cities.slice(12, 18), ...cities.slice(12, 18)].map((city, index) => (
                  <div
                    key={`row3-mobile-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A1B10] rounded-lg whitespace-nowrap border border-[#03B044]/30 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="16" height="16" rx="3" fill="#03B044"/>
                    </svg>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Map overlaying Carousel */}
        <div className="hidden md:block relative w-full py-8">
          {/* 3-Row Carousel - Full Width */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="flex overflow-hidden">
              <div ref={desktopRow1Ref} className="flex gap-6">
                {[...cities.slice(0, 6), ...cities.slice(0, 6), ...cities.slice(0, 6)].map((city, index) => (
                  <div
                    key={`row1-desktop-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A1B10] rounded-lg whitespace-nowrap border border-[#03B044]/30 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="#03B044"/>
                    </svg>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex overflow-hidden">
              <div ref={desktopRow2Ref} className="flex gap-6">
                {[...cities.slice(6, 12), ...cities.slice(6, 12), ...cities.slice(6, 12)].map((city, index) => (
                  <div
                    key={`row2-desktop-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A1B10] rounded-lg whitespace-nowrap border border-[#03B044]/30 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" fill="#03B044"/>
                    </svg>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex overflow-hidden">
              <div ref={desktopRow3Ref} className="flex gap-6">
                {[...cities.slice(12, 18), ...cities.slice(12, 18), ...cities.slice(12, 18)].map((city, index) => (
                  <div
                    key={`row3-desktop-${index}`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0A1B10] rounded-lg whitespace-nowrap border border-[#03B044]/30 flex-shrink-0"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="16" height="16" rx="3" fill="#03B044"/>
                    </svg>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* India Map - Overlays on Left (Desktop only) */}
          <div className="india-map absolute left-12 -top-16 z-20 w-[455px] pointer-events-none" style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8))' }}>
            <Image
              src="/images/india_map.png"
              alt="India Map"
              width={500}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
