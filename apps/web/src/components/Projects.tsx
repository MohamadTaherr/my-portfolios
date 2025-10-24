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
    <section id="video-production" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
              Video Production{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              From concept to final cut - two decades of creating professional videos that tell compelling stories for global brands
            </p>
          </div>

          {/* Client-side interactive component */}
          <ProjectsClient projects={projectsWithUrls} />
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
}
