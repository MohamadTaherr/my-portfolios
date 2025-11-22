import { fetchAPI } from '@/lib/api';

export const revalidate = 60;

interface Stat {
  id: string;
  number: string;
  label: string;
  icon: string;
  order: number;
}

interface SkillsData {
  stats: Stat[];
  competencies: string[];
}

interface PageContent {
  skillsTitle?: string;
  skillsSubtitle?: string;
}

export default async function Skills() {
  const [skillsData, pageContent] = await Promise.all([
    fetchAPI('/skills').catch(() => null),
    fetchAPI('/page-content').catch(() => null)
  ]);

  // Fallback data if database data is not available
  const defaultStats: Stat[] = [
    { id: '1', number: '20+', label: 'Years in Industry', icon: '🎬', order: 0 },
    { id: '2', number: '200+', label: 'Scripts Produced', icon: '✍️', order: 1 },
    { id: '3', number: '10+', label: 'Awards', icon: '🏆', order: 2 },
    { id: '4', number: '100+', label: 'Global Brands', icon: '🌍', order: 3 },
    { id: '5', number: '50+', label: 'Documentaries', icon: '📽️', order: 4 },
    { id: '6', number: '1000+', label: 'Hours of Content', icon: '⏱️', order: 5 },
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

  const cinematicStats = (skillsData?.stats && Array.isArray(skillsData.stats) && skillsData.stats.length > 0)
    ? skillsData.stats
    : defaultStats;

  const expertise = (skillsData?.competencies && Array.isArray(skillsData.competencies) && skillsData.competencies.length > 0)
    ? skillsData.competencies
    : defaultCompetencies;

  const skillsTitle = pageContent?.skillsTitle || 'By the Numbers';
  const skillsSubtitle = pageContent?.skillsSubtitle || 'Expertise';

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background" style={{ contain: 'layout style paint' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 text-xs tracking-[0.4em] uppercase font-semibold text-primary/80 mb-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-primary/60 to-primary/40 animate-pulse" />
            <span className="relative">
              <span className="absolute inset-0 blur-sm bg-primary/20"></span>
              <span className="relative">{skillsSubtitle}</span>
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-primary/60 to-primary/40 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-balance leading-tight">
            <span className="inline-block bg-gradient-to-r from-foreground via-primary/90 to-foreground bg-clip-text text-transparent">
              {skillsTitle}
            </span>
          </h2>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-6xl mx-auto">
          {cinematicStats.map((stat: Stat, index: number) => (
            <div
              key={stat.id || index}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(108,99,255,0.2)] hover:border-primary/50"
              style={{ minHeight: '200px', contain: 'layout style paint' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
              <div className="relative">
                <div className="text-5xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3 font-bold">
                  {stat.number}
                </div>
                <div className="text-foreground-muted tracking-wider uppercase text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expertise Tags */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-foreground text-center mb-10">
            Core Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {expertise.map((skill: string, index: number) => (
              <div
                key={skill}
                className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-foreground/90 hover:border-primary/60 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-pink-500/10 hover:to-red-500/10 hover:text-white transition-colors duration-200 cursor-default"
              >
                <span className="tracking-wide text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations - static to prevent layout shifts */}
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" 
        style={{ 
          contain: 'layout style paint',
          willChange: 'auto',
          transform: 'translateZ(0)'
        }} 
      />
      <div 
        className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" 
        style={{ 
          contain: 'layout style paint',
          willChange: 'auto',
          transform: 'translateZ(0)'
        }} 
      />
    </section>
  );
}
