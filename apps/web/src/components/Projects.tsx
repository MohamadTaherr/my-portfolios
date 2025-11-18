import { fetchAPI } from '@/lib/api';
import ProjectsClient from './ProjectsClient';

export const revalidate = 10;

interface VideoProject {
  id: string;
  title: string;
  description: string | null;
  client: string | null;
  category: string | null;
  duration: string | null;
  year: string | null;
  tags: string[];
  videoUrl: string | null;
  thumbnailUrl: string | null;
  featured: boolean;
}

export default async function Projects() {
  const videoProjects: VideoProject[] = await fetchAPI('/projects').catch(() => []);

  // Extract unique categories from projects
  const categorySet = new Set<string>();
  videoProjects.forEach(project => {
    if (project.category) {
      categorySet.add(project.category);
    }
  });
  
  const categoryList = categorySet.size > 0
    ? Array.from(categorySet).sort()
    : ['Commercial', 'Short Film', 'Documentary', 'Social Media', 'Event', 'Music Video'];

  const projectsWithUrls: VideoProject[] = videoProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    client: project.client,
    category: project.category,
    duration: project.duration,
    year: project.year,
    tags: project.tags || [],
    videoUrl: project.videoUrl,
    thumbnailUrl: project.thumbnailUrl,
    featured: project.featured,
  }));

  return (
    <section id="portfolio" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 section-light" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-16">
          <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in-up">
            <p className="text-primary text-sm tracking-[0.3em] uppercase font-semibold">
              Selected Works
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] gradient-text leading-tight font-bold">
              Portfolio
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Two decades of visual storytelling — from intimate documentaries to global brand narratives
            </p>
          </div>
          <ProjectsClient projects={projectsWithUrls} categories={categoryList} />
        </div>
      </div>

      {/* Modern floating orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
    </section>
  );
}
