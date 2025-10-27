import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

// Revalidate page every 10 seconds to fetch fresh content from Sanity
export const revalidate = 10;

export default function Home() {
  return (
    <div className="flex flex-col bg-black">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
