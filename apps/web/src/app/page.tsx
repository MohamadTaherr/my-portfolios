import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Scriptwriting from '@/components/ScriptwritingNew';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

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
