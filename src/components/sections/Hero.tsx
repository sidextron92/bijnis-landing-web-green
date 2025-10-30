'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import Image from 'next/image';

/**
 * Hero section with parallax background and animated text
 */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isFactoryHovered, setIsFactoryHovered] = useState(false);
  const [isRetailHovered, setIsRetailHovered] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroTexts = ['60 Minute', 'Fastest', 'Most Efficient'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (textRef.current) {
        // Animate out
        gsap.to(textRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            // Change text
            setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);

            // Animate in
            if (textRef.current) {
              gsap.fromTo(
                textRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
              );
            }
          },
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Force video to play on iOS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video properties are set for iOS
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');

    // Force load and play
    video.load();

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video autoplay prevented:', error);
          // Retry after a short delay
          setTimeout(() => {
            video.play().catch((e) => console.log('Video retry failed:', e));
          }, 500);
        });
      }
    };

    // Try to play immediately
    attemptPlay();

    // Also try after video can play
    const handleCanPlay = () => {
      attemptPlay();
    };

    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate hero title
      tl.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      })
        // Animate CTA buttons
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex flex-col overflow-hidden bg-[#020D06]"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlays - Split Left and Right */}
      {/* Left Half Overlay - Fades out on Factory hover */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 z-10 smooth-fade ${isFactoryHovered ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 13, 6, 0.9) 0%, rgba(10, 27, 16, 0.9) 100%)'
        }}
      />

      {/* Right Half Overlay - Fades out on Retail hover */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 z-10 smooth-fade ${isRetailHovered ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: 'linear-gradient(to bottom, rgba(2, 13, 6, 0.9) 0%, rgba(10, 27, 16, 0.9) 100%)'
        }}
      />

      {/* Top Part - 35% - Title */}
      <div className="relative flex items-end justify-center text-center pb-4 z-30" style={{ height: '35%' }}>
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold px-6">
          India's <span className="animated-gradient inline-block relative">
            <span ref={textRef} className="inline-block">
              {heroTexts[currentTextIndex]}
            </span>
          </span>
          <br />
          <span
            className="relative inline-block cursor-pointer group float-subtle"
            onMouseEnter={() => setIsFactoryHovered(true)}
            onMouseLeave={() => setIsFactoryHovered(false)}
          >
            Factory
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 opacity-70 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q10,2 20,5 T40,5 T60,5 T80,5 T100,5 T120,5 T140,5 T160,5 T180,5 T200,5"
                stroke="#078236"
                strokeWidth="2"
                fill="none"
                className="animate-dash"
              />
            </svg>
          </span>
          {' '}to{' '}
          <span
            className="relative inline-block cursor-pointer group float-subtle"
            onMouseEnter={() => setIsRetailHovered(true)}
            onMouseLeave={() => setIsRetailHovered(false)}
          >
            Retail
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 opacity-70 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q10,2 20,5 T40,5 T60,5 T80,5 T100,5 T120,5 T140,5 T160,5 T180,5 T200,5"
                stroke="#078236"
                strokeWidth="2"
                fill="none"
                className="animate-dash"
              />
            </svg>
          </span>
          <br />
          Supply Chain
        </h1>
      </div>

      {/* Bottom Part - 68% - Mascot (overlaps with top by 3%) */}
      <div className="relative flex flex-col items-center justify-end" style={{ height: '68%', marginTop: '-3%' }}>
        {/* Mascot fills bottom part */}
        <div className="relative z-30 h-full w-full">
          <Image
            src="/images/bijnis_mascot.png"
            alt="Bijnis Mascot"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* CTAs */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex justify-center items-center z-40">
          <Button
            size="lg"
            variant="outline"
            magnetic
            className="hero-cta"
            onClick={() => {
              const nextSection = document.getElementById('locations');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 rounded-full mt-2 animate-bounce" style={{ backgroundColor: '#078236' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
