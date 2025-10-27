import { client } from '@/sanity/lib/client';

export const revalidate = 10;

interface SiteSettings {
  name: string;
  bio: string;
  yearsExperience: number;
  projectsCompleted: number;
  industryAwards?: number;
}

export default async function About() {
  // Fetch site settings from Sanity
  const query = '*[_type == "siteSettings"][0]{name, bio, yearsExperience, projectsCompleted, industryAwards}';
  const settings: SiteSettings | null = await client.fetch(query, {}, {
    next: { revalidate: 10 }
  });

  const defaultSettings: SiteSettings = {
    name: 'Edmond Haddad',
    bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands.',
    yearsExperience: 20,
    projectsCompleted: 200,
    industryAwards: 10,
  };

  const data = settings || defaultSettings;

  return (
    <section id="about" className="relative py-32 md:py-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Title - Film Credit Style */}
          <div className="text-center mb-20 animate-fade-in">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
              The Story
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-ivory">
              Behind the Camera
            </h2>
          </div>

          {/* Split Layout - Film Synopsis Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Synopsis Text */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="space-y-6 text-ivory/90 text-lg leading-relaxed">
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
              </div>

              {/* Signature */}
              <div className="pt-8">
                <div className="text-2xl font-[family-name:var(--font-playfair)] text-gold/80 italic">
                  {data.name}
                </div>
                <div className="h-px w-32 bg-gold/30 mt-4" />
              </div>
            </div>

            {/* Right: Stats - Film Credits Style */}
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
                    <div>Porsche</div>
                    <div>Major Film Productions</div>
                    <div>Global Brands</div>
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
