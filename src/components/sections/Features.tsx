'use client';

import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { FadeIn } from '@/components/animations/FadeIn';

/**
 * Features/Services section
 */
export function Features() {
  const features = [
    {
      title: 'Innovative Solutions',
      description:
        'Cutting-edge technology solutions tailored to your business needs',
      icon: '🚀',
    },
    {
      title: 'Expert Team',
      description:
        'Experienced professionals dedicated to your success',
      icon: '👥',
    },
    {
      title: 'Data-Driven',
      description:
        'Make informed decisions with powerful analytics and insights',
      icon: '📊',
    },
    {
      title: 'Scalable Growth',
      description:
        'Solutions that grow with your business at every stage',
      icon: '📈',
    },
    {
      title: '24/7 Support',
      description:
        'Round-the-clock support to keep your business running smoothly',
      icon: '⚡',
    },
    {
      title: 'Security First',
      description:
        'Enterprise-grade security to protect your valuable data',
      icon: '🔒',
    },
  ];

  return (
    <section id="features" className="py-24" style={{ backgroundColor: '#020D06' }}>
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Why Choose Bijnis
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to accelerate your business growth
          </p>
        </FadeIn>

        <ScrollReveal
          stagger={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
