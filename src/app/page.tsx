import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { About } from '@/components/sections/About';
import { Mission } from '@/components/sections/Mission';
import { BlogSection } from '@/components/sections/BlogSection';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <Features />
        <About />
        <Mission />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
