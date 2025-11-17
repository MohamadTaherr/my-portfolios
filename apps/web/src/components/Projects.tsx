import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import ProjectsClient from './ProjectsClient';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const revalidate = 10;

interface VideoProject {
  _id: string;
  title: string;
  description: string;
  client: string;
  category: string;
  duration: string;
  year: string;
  tags: string[];
  videoUrl?: string;
  thumbnail: any;
  featured: boolean;
}

interface VideoProjectWithUrls extends Omit<VideoProject, 'thumbnail'> {
  thumbnailUrl?: string;
}

export default async function Projects() {
  const projectsQuery = '*[_type == "videoProject"] | order(order asc, _createdAt desc)';
  const videoProjects: VideoProject[] = await client.fetch(projectsQuery, {}, {
    next: { revalidate: 10 }
  });

  const categoriesQuery = '*[_type == "projectCategory"][0].categories[] | order(order asc) {title, value}';
  const availableCategories = await client.fetch(categoriesQuery, {}, {
    next: { revalidate: 10 }
  });

  const categoryList = availableCategories && availableCategories.length > 0
    ? availableCategories.map((cat: any) => cat.value)
    : ['Commercial', 'Short Film', 'Documentary', 'Social Media', 'Event', 'Music Video'];

  const projectsWithUrls: VideoProjectWithUrls[] = videoProjects.map(project => ({
    ...project,
    thumbnailUrl: project.thumbnail ? urlFor(project.thumbnail).width(800).height(450).url() : undefined,
    thumbnail: undefined as any,
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
