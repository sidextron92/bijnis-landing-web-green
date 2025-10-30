'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

/**
 * Blog section with horizontal cards
 */
export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const blogPosts = [
    {
      id: 1,
      image: '/images/blog1.jpg',
      title: 'The 60-Minute Revolution in Supply Chain',
      summary: 'How real-time demand sensing is transforming factory-to-retail delivery across India, reducing inventory costs and improving cash flow.',
      date: 'March 15, 2024',
    },
    {
      id: 2,
      image: '/images/blog2.jpg',
      title: 'Breaking Free from Middlemen',
      summary: 'The story of how direct connections between factories and retailers are creating a new era of freedom and profitability in Indian commerce.',
      date: 'March 10, 2024',
    },
    {
      id: 3,
      image: '/images/blog3.jpg',
      title: 'Real-Time Economy: The Future is Now',
      summary: 'Exploring how technology and optimized logistics are enabling continuous flow of goods, turning movement itself into money.',
      date: 'March 5, 2024',
    },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Animate title
      gsap.from('.blog-title', {
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
      gsap.from('.blog-subtitle', {
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

      // Animate blog cards
      gsap.fromTo('.blog-card',
        {
          opacity: 0,
          y: 50,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.4,
          ease: 'power3.out',
          immediateRender: false
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-24 px-6 bg-[#020D06]"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="blog-title text-5xl md:text-6xl font-bold mb-4 text-white">
            Blog
          </h2>
          <p className="blog-subtitle text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories, ideas, and signals shaping India's real-time economy.
          </p>
        </div>

        {/* Blog Cards - Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="blog-card group bg-[#0A1B10] rounded-2xl overflow-hidden border-2 border-[#03B044]/30 hover:border-[#03B044] transition-all duration-300 hover:shadow-2xl hover:shadow-[#03B044]/20 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#03B044]/30 to-[#078236]/30">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-7xl opacity-40">📰</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-[280px]">
                {/* Date */}
                <div className="text-sm text-[#03B044] mb-3 font-semibold">
                  {post.date}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#03B044] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  {post.summary}
                </p>

                {/* Read More Link */}
                <div className="mt-auto">
                  <button className="text-[#03B044] font-semibold hover:text-white transition-colors flex items-center gap-2 group/btn">
                    Read More
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="transform group-hover/btn:translate-x-1 transition-transform"
                    >
                      <path
                        d="M7 4L13 10L7 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
