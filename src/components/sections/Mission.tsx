'use client';

import { FadeIn } from '@/components/animations/FadeIn';

/**
 * Mission section
 */
export function Mission() {
  const values = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries to deliver cutting-edge solutions',
    },
    {
      title: 'Integrity',
      description: 'Building trust through transparency and honesty',
    },
    {
      title: 'Excellence',
      description: 'Committed to delivering exceptional quality',
    },
    {
      title: 'Collaboration',
      description: 'Working together to achieve shared success',
    },
  ];

  return (
    <section id="mission" className="py-24 text-white" style={{ backgroundColor: '#020D06' }}>
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            To empower businesses worldwide with innovative solutions that
            drive growth, efficiency, and lasting success
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {values.map((value, index) => (
            <FadeIn key={index} delay={index * 0.1} direction="up">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
