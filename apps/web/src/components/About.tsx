import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

interface SiteSettings {
  name: string;
  bio: string;
  yearsExperience: number;
  projectsCompleted: number;
  industryAwards?: number;
}

interface AboutSection {
  bodyParagraphs?: any[];
  featuredBrands?: Array<{
    name: string;
    description?: string;
    order: number;
  }>;
  signingName?: string;
}

interface PageContent {
  aboutTitle?: string;
  aboutSubtitle?: string;
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings"][0]{name, bio, yearsExperience, projectsCompleted, industryAwards}`;
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

async function getAboutSection(): Promise<AboutSection | null> {
  try {
    const query = `*[_type == "aboutSection"][0]{
      bodyParagraphs,
      featuredBrands[]{ name, description, order } | order(order asc),
      signingName
    }`;
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}

async function getPageContent(): Promise<PageContent | null> {
  try {
    const query = `*[_type == "pageContent"][0]{ aboutTitle, aboutSubtitle }`;
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

export default async function About() {
  const [settings, aboutSection, pageContent] = await Promise.all([
    getSiteSettings(),
    getAboutSection(),
    getPageContent()
  ]);

  const defaultSettings: SiteSettings = {
    name: 'Edmond Haddad',
    bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands.',
    yearsExperience: 20,
    projectsCompleted: 200,
    industryAwards: 10,
  };

  const data = settings || defaultSettings;
  const aboutTitle = pageContent?.aboutTitle || 'Behind the Camera';
  const aboutSubtitle = pageContent?.aboutSubtitle || 'The Story';

  const defaultBrands = ['Porsche', 'Major Film Productions', 'Global Brands'];
  const featuredBrands = aboutSection?.featuredBrands && aboutSection.featuredBrands.length > 0
    ? aboutSection.featuredBrands.map(b => b.name)
    : defaultBrands;

  return (
    <section id="about" className="relative py-32 md:py-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20 animate-fade-in">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
              {aboutSubtitle}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-ivory">
              {aboutTitle}
            </h2>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="space-y-6 text-ivory/90 text-lg leading-relaxed">
                {aboutSection?.bodyParagraphs && aboutSection.bodyParagraphs.length > 0 ? (
                  <div className="portable-text">
                    <PortableText value={aboutSection.bodyParagraphs} />
                  </div>
                ) : (
                  <>
                    <p className="first-letter:text-6xl first-letter:font-[family-name:var(--font-playfair)] first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                      {data.bio}
                    </p>
                    <p className="text-ivory/70">
                      From intimate documentaries to high-profile commercials, each project is approached
                      with the same dedication to visual storytelling and emotional authenticity.
                      The craft lies not in what you show, but in what you make the audience feel.
                    </p>
                    <p className="text-ivory/70">
                      Working with global brands and independent filmmakers alike, the focus remains on
                      creating cinematic experiences that resonate long after the final frame.
                    </p>
                  </>
                )}
              </div>

              {/* Signature */}
              <div className="pt-8">
                <div className="text-2xl font-[family-name:var(--font-playfair)] text-gold/80 italic">
                  {aboutSection?.signingName || data.name}
                </div>
                <div className="h-px w-32 bg-gold/30 mt-4" />
              </div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="glass p-10 space-y-10">
                <div className="border-l-2 border-gold/40 pl-8">
                  <div className="text-6xl font-[family-name:var(--font-playfair)] text-gold mb-2">
                    {data.yearsExperience}+
                  </div>
                  <div className="text-ivory/60 tracking-wider uppercase text-sm">
                    Years of Experience
                  </div>
                </div>

                <div className="border-l-2 border-gold/40 pl-8">
                  <div className="text-6xl font-[family-name:var(--font-playfair)] text-gold mb-2">
                    {data.projectsCompleted}+
                  </div>
                  <div className="text-ivory/60 tracking-wider uppercase text-sm">
                    Scripts Produced
                  </div>
                </div>

                {data.industryAwards && data.industryAwards > 0 && (
                  <div className="border-l-2 border-gold/40 pl-8">
                    <div className="text-6xl font-[family-name:var(--font-playfair)] text-gold mb-2">
                      {data.industryAwards}+
                    </div>
                    <div className="text-ivory/60 tracking-wider uppercase text-sm">
                      Awards
                    </div>
                  </div>
                )}

                <div className="border-l-2 border-gold/40 pl-8">
                  <div className="text-ivory/80 tracking-wider uppercase text-xs mb-3">
                    Featured Work With
                  </div>
                  <div className="space-y-2 text-ivory/60">
                    {featuredBrands.map((brand, index) => (
                      <div key={index}>{brand}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="film-grain absolute inset-0 pointer-events-none opacity-30" />
    </section>
  );
}
