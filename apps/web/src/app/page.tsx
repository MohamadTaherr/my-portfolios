import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Clients from '@/components/Clients';

// Revalidate page every 10 seconds to keep backend content fresh
export const revalidate = 10;

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Portfolio />
      <Clients />
      <Skills />
      <Contact />
    </div>
  );
}
