'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { ScaleIn } from '@/components/animations/ScaleIn';

/**
 * About/Story section
 */
export function About() {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: '#030F08' }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-400">
              <p>
                Founded with a vision to revolutionize the business landscape,
                Bijnis has been at the forefront of innovation for years.
              </p>
              <p>
                We believe in empowering businesses with cutting-edge solutions
                that drive real results. Our team of experts works tirelessly
                to understand your unique challenges and deliver tailored
                solutions.
              </p>
              <p>
                From startups to enterprises, we've helped hundreds of
                businesses transform their operations and achieve unprecedented
                growth.
              </p>
            </div>
          </FadeIn>

          <ScaleIn>
            <div className="relative h-[500px] rounded-2xl bg-gradient-to-br from-[#078236] to-[#0a9d45] flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-7xl mb-4">💼</div>
                <p className="text-2xl font-bold">Your Success, Our Mission</p>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
