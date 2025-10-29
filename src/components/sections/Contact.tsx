'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';

/**
 * Contact section - placeholder
 */
export function Contact() {
  return (
    <section id="contact" className="py-24" style={{ backgroundColor: '#020D06' }}>
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Get In Touch</h2>
        <div className="space-y-4">
          <Input placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
          <TextArea placeholder="Your Message" />
          <Button className="w-full">Send Message</Button>
        </div>
      </div>
    </section>
  );
}
