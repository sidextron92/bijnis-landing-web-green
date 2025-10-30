'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

/**
 * About/Freedom section with carousel
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const freedomRef = useRef<HTMLDivElement>(null);
  const carousel1Ref = useRef<HTMLDivElement>(null);
  const carousel2Ref = useRef<HTMLDivElement>(null);
  const carousel3Ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [particles, setParticles] = useState<Particle[]>([]);
  const [hasExploded, setHasExploded] = useState(false);

  const images = [
    { src: '/images/freedom1.png', alt: 'Dead Stock Problem' },
    { src: '/images/freedom2.png', alt: 'Payment Issues' },
    { src: '/images/freedom3.png', alt: 'Cashflow Problems' },
  ];

  // Particle explosion effect
  useEffect(() => {
    if (!hasExploded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = freedomRef.current?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    let animationFrameId: number;
    let localParticles = [...particles];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      localParticles = localParticles.filter(p => p.life > 0);

      localParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= 0.02;

        ctx.fillStyle = `rgba(3, 176, 68, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (localParticles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particles, hasExploded]);

  const createParticleExplosion = () => {
    if (hasExploded) return;

    const rect = freedomRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newParticles: Particle[] = [];
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 3 + Math.random() * 4;

      newParticles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        size: 3 + Math.random() * 3,
      });
    }

    setParticles(newParticles);
    setHasExploded(true);
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Animate title
      gsap.from('.freedom-title-line1', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Emphasize FREEDOM with scale and color animation + particle explosion
      if (freedomRef.current) {
        gsap.from(freedomRef.current, {
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            onEnter: () => {
              createParticleExplosion();
            },
          },
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: 'back.out(1.7)'
        });
      }

      gsap.from('.freedom-title-line3', {
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

      // Carousel animations - continuous scroll (faster speed)
      if (carousel1Ref.current) {
        gsap.to(carousel1Ref.current, {
          x: '-100%',
          duration: 15,
          ease: 'none',
          repeat: -1,
        });
      }

      if (carousel2Ref.current) {
        gsap.to(carousel2Ref.current, {
          x: '-100%',
          duration: 15,
          ease: 'none',
          repeat: -1,
        });
      }

      if (carousel3Ref.current) {
        gsap.to(carousel3Ref.current, {
          x: '-100%',
          duration: 15,
          ease: 'none',
          repeat: -1,
        });
      }

      // Animate subtext
      gsap.from('.freedom-subtext', {
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 bg-[#020D06] overflow-hidden"
    >
      {/* Title */}
      <div className="text-left mb-12 max-w-6xl w-full px-6">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
          <div className="freedom-title-line1 text-white">Building a new era of</div>
          <div className="relative my-4">
            <div
              ref={freedomRef}
              className="text-5xl md:text-7xl lg:text-8xl freedom-gradient"
            >
              FREEDOM
            </div>
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="freedom-title-line3 text-white">for Factories and Retailers of India</div>
        </h2>
      </div>

      {/* Carousel */}
      <div className="w-full mb-12 overflow-hidden">
        <div className="flex gap-8">
          {/* First set */}
          <div ref={carousel1Ref} className="flex gap-8 flex-shrink-0">
            {images.map((image, index) => (
              <div
                key={`carousel1-${index}`}
                className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] flex-shrink-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Second set for seamless loop */}
          <div ref={carousel2Ref} className="flex gap-8 flex-shrink-0">
            {images.map((image, index) => (
              <div
                key={`carousel2-${index}`}
                className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] flex-shrink-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Third set for seamless loop */}
          <div ref={carousel3Ref} className="flex gap-8 flex-shrink-0">
            {images.map((image, index) => (
              <div
                key={`carousel3-${index}`}
                className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] flex-shrink-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtext */}
      <div className="freedom-subtext text-center max-w-5xl px-6">
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          The slow chain bleeds profit quietly - stock piles up, trust breaks down, and cash gets stuck. bijnis rebuilt the system so that movement itself creates money - connecting factories, traders, and retailers in continuous flow.
        </p>
      </div>
    </section>
  );
}
