import { client } from '@/sanity/lib/client';

interface Stat {
  number: string;
  label: string;
  icon: string;
  order: number;
}

interface SkillsData {
  stats: Stat[];
  competencies: string[];
  _id: string;
}

interface PageContentData {
  skillsTitle?: string;
  skillsSubtitle?: string;
}

async function getSkillsData(): Promise<SkillsData | null> {
  try {
    const query = \`*[_type == "skillsSection"][0]{
      _id,
      stats[]{ number, label, icon, order } | order(order asc),
      competencies
    }\`;

    const data = await client.fetch<SkillsData>(query, {}, {
      next: { revalidate: 60 }
    });

    return data;
  } catch (error) {
    console.error('Error fetching skills data:', error);
    return null;
  }
}

async function getPageContent(): Promise<PageContentData | null> {
  try {
    const query = \`*[_type == "pageContent"][0]{
      skillsTitle,
      skillsSubtitle
    }\`;

    const data = await client.fetch<PageContentData>(query, {}, {
      next: { revalidate: 60 }
    });

    return data;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

export default async function Skills() {
  const [skillsData, pageContent] = await Promise.all([
    getSkillsData(),
    getPageContent()
  ]);

  // Fallback data if Sanity data is not available
  const defaultStats = [
    { number: '20+', label: 'Years in Industry', icon: '🎬', order: 0 },
    { number: '200+', label: 'Scripts Produced', icon: '✍️', order: 1 },
    { number: '10+', label: 'Awards', icon: '🏆', order: 2 },
    { number: '100+', label: 'Global Brands', icon: '🌍', order: 3 },
    { number: '50+', label: 'Documentaries', icon: '📽️', order: 4 },
    { number: '1000+', label: 'Hours of Content', icon: '⏱️', order: 5 },
  ];

  const defaultCompetencies = [
    'Scriptwriting',
    'Video Production',
    'Documentary Filmmaking',
    'Commercial Direction',
    'Color Grading',
    'Sound Design',
    'Post-Production',
    'Creative Direction',
  ];

  const cinematicStats = skillsData?.stats && skillsData.stats.length > 0
    ? skillsData.stats
    : defaultStats;

  const expertise = skillsData?.competencies && skillsData.competencies.length > 0
    ? skillsData.competencies
    : defaultCompetencies;

  const skillsTitle = pageContent?.skillsTitle || 'By the Numbers';
  const skillsSubtitle = pageContent?.skillsSubtitle || 'Expertise';

  return (
    <section id="skills" className="relative py-32 md:py-40 overflow-hidden bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">
            {skillsSubtitle}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] text-ivory">
            {skillsTitle}
          </h2>
        </div>

        {/* Cinematic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
          {cinematicStats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass p-8 text-center group cinematic-hover animate-fade-in-up"
              style={{ animationDelay: \`\${index * 0.1}s\` }}
            >
              <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>
              <div className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] text-gold mb-3 animate-flicker">
                {stat.number}
              </div>
              <div className="text-ivory/60 tracking-wider uppercase text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Expertise Tags */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-ivory text-center mb-12">
            Core Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {expertise.map((skill, index) => (
              <div
                key={skill}
                className="px-6 py-3 border border-gold/30 text-ivory/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-500 cursor-default animate-fade-in"
                style={{ animationDelay: \`\${index * 0.05}s\` }}
              >
                <span className="tracking-wider text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="film-grain absolute inset-0 opacity-20 pointer-events-none" />
    </section>
  );
}
