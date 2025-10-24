import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Scriptwriting from '@/components/ScriptwritingNew';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

// Revalidate page every 10 seconds to fetch fresh content from Sanity
export const revalidate = 10;

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Projects />
      <Scriptwriting />
      <Skills />
      <Contact />
    </div>
  );
}
