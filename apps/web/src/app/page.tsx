import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Clients from '@/components/Clients';
import CinematicIntro from '@/components/CinematicIntro';
import { fetchAPI } from '@/lib/api';

// Revalidate page every 10 seconds to keep backend content fresh
export const revalidate = 10;

export default async function Home() {
  const settings = await fetchAPI('/site-settings').catch(() => null);

  const name = settings?.name || 'Edmond Haddad';
  const tagline = settings?.tagline || 'Creative Producer & Director';

  return (
    <>
      <CinematicIntro name={name} tagline={tagline} />
      <div className="flex flex-col">
        <Hero />
        <About />
        <Portfolio />
        <Clients />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
