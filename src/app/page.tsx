import { Hero } from '@/components/sections/Hero';
import { LocationsMap } from '@/components/sections/LocationsMap';
import { About } from '@/components/sections/About';
import { Mission } from '@/components/sections/Mission';
import { BlogSection } from '@/components/sections/BlogSection';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/layout/Header';
import { LoadingAnimation } from '@/components/LoadingAnimation';

export default function Home() {
  return (
    <>
      <LoadingAnimation />
      <Header />
      <main className="relative">
        <Hero />
        <LocationsMap />
        <About />
        <Mission />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
