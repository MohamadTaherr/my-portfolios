import { fetchAPI } from '@/lib/api';

export const revalidate = 60;

interface SiteSettings {
  name: string;
  bio: string;
  yearsExperience: number;
  projectsCompleted: number;
  industryAwards?: number;
}

interface AboutSection {
  bodyParagraphs?: string[];
  featuredBrands?: string[];
  signingName?: string;
}

interface PageContent {
  aboutTitle?: string;
  aboutSubtitle?: string;
}

export default async function About() {
  const [settings, aboutSection, pageContent] = await Promise.all([
    fetchAPI('/site-settings').catch(() => null),
    fetchAPI('/about').catch(() => null),
    fetchAPI('/page-content').catch(() => null)
  ]);

  const defaultSettings: SiteSettings = {
    name: 'Edmond Haddad',
    bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands.',
    yearsExperience: 20,
    projectsCompleted: 200,
    industryAwards: 10,
  };

  const data = settings ? {
    name: settings.name || defaultSettings.name,
    bio: settings.bio || defaultSettings.bio,
    yearsExperience: settings.yearsExperience || defaultSettings.yearsExperience,
    projectsCompleted: settings.projectsCompleted || defaultSettings.projectsCompleted,
    industryAwards: settings.industryAwards || defaultSettings.industryAwards,
  } : defaultSettings;

  const aboutTitle = pageContent?.aboutTitle || 'Behind the Camera';
  const aboutSubtitle = pageContent?.aboutSubtitle || 'The Story';

  const defaultBrands = ['Porsche', 'Major Film Productions', 'Global Brands'];
  const featuredBrands = aboutSection?.featuredBrands && aboutSection.featuredBrands.length > 0
    ? aboutSection.featuredBrands
    : defaultBrands;

  return (
    <section id="about" className="relative py-32 md:py-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            <p className="text-gold/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">
              {aboutSubtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-ivory">
              {aboutTitle}
            </h2>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 sm:space-y-8 animate-slide-in-right">
              <div className="space-y-4 sm:space-y-6 text-ivory/90 text-base sm:text-lg leading-relaxed">
                {aboutSection?.bodyParagraphs && aboutSection.bodyParagraphs.length > 0 ? (
                  <div className="portable-text">
                    {aboutSection.bodyParagraphs.map((para: string, idx: number) => (
                      <p key={idx} className={idx === 0 ? "first-letter:text-4xl sm:first-letter:text-5xl md:first-letter:text-6xl first-letter:font-[family-name:var(--font-playfair)] first-letter:text-gold first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3 first-letter:leading-none" : ""}>
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="first-letter:text-4xl sm:first-letter:text-5xl md:first-letter:text-6xl first-letter:font-[family-name:var(--font-playfair)] first-letter:text-gold first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3 first-letter:leading-none">
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
              <div className="pt-6 sm:pt-8">
                <div className="text-xl sm:text-2xl font-[family-name:var(--font-playfair)] text-gold/80 italic">
                  {aboutSection?.signingName || data.name}
                </div>
                <div className="h-px w-24 sm:w-32 bg-gold/30 mt-3 sm:mt-4" />
              </div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="glass p-6 sm:p-8 md:p-10 space-y-8 md:space-y-10">
                <div className="border-l-2 border-gold/40 pl-6 sm:pl-8">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] text-gold mb-2">
                    {data.yearsExperience}+
                  </div>
                  <div className="text-ivory/60 tracking-wider uppercase text-xs sm:text-sm">
                    Years of Experience
                  </div>
                </div>

                <div className="border-l-2 border-gold/40 pl-6 sm:pl-8">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] text-gold mb-2">
                    {data.projectsCompleted}+
                  </div>
                  <div className="text-ivory/60 tracking-wider uppercase text-xs sm:text-sm">
                    Scripts Produced
                  </div>
                </div>

                {data.industryAwards && data.industryAwards > 0 && (
                  <div className="border-l-2 border-gold/40 pl-6 sm:pl-8">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] text-gold mb-2">
                      {data.industryAwards}+
                    </div>
                    <div className="text-ivory/60 tracking-wider uppercase text-xs sm:text-sm">
                      Awards
                    </div>
                  </div>
                )}

                <div className="border-l-2 border-gold/40 pl-8">
                  <div className="text-ivory/80 tracking-wider uppercase text-xs mb-3">
                    Featured Work With
                  </div>
                  <div className="space-y-2 text-ivory/60">
                    {featuredBrands.map((brand: string, index: number) => (
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
