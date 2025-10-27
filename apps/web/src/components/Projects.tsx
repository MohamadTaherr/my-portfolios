import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import ProjectsClient from './ProjectsClient';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Revalidate every 10 seconds (ISR) - updates content quickly
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
  // Fetch data on the server
  const query = '*[_type == "videoProject"] | order(order asc, _createdAt desc)';
  const videoProjects: VideoProject[] = await client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });

  // Generate image URLs on the server
  const projectsWithUrls: VideoProjectWithUrls[] = videoProjects.map(project => ({
    ...project,
    thumbnailUrl: project.thumbnail ? urlFor(project.thumbnail).width(800).height(450).url() : undefined,
    thumbnail: undefined as any, // Remove the raw thumbnail object
  }));

  return (
    <section id="portfolio" className="relative py-32 md:py-40 overflow-hidden bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header - Cinematic Style */}
          <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in">
            <p className="text-gold/60 text-sm tracking-[0.3em] uppercase">
              Selected Works
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] text-ivory leading-tight">
              Portfolio
            </h2>
            <p className="text-xl text-ivory/60 max-w-2xl mx-auto leading-relaxed">
              Two decades of visual storytelling — from intimate documentaries to global brand narratives
            </p>
          </div>

          {/* Client-side interactive component */}
          <ProjectsClient projects={projectsWithUrls} />
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="film-grain absolute inset-0 opacity-20 pointer-events-none" />
    </section>
  );
}
