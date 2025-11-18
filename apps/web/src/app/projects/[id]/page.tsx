import { notFound } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';
import { Metadata } from 'next';
import VideoPlayer from '@/components/VideoPlayer';

// Revalidate page every 10 seconds
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

async function getProject(id: string): Promise<VideoProject | null> {
  try {
    return await fetchAPI(`/projects/${id}`);
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Generate dynamic metadata for each project page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: 'Project Not Found | Edmond Haddad',
      description: 'The requested project could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const imageUrl = project.thumbnailUrl
    ? project.thumbnailUrl
    : `${baseUrl}/og-image.jpg`;

  return {
    title: `${project.title} | ${project.client || 'Portfolio'} | Edmond Haddad`,
    description: (project.description || '').substring(0, 160) + ((project.description || '').length > 160 ? '...' : ''),
    keywords: [
      project.title,
      project.client || '',
      project.category || '',
      ...(project.tags || []),
      'scriptwriting',
      'video production',
      'Edmond Haddad',
    ],
    authors: [{ name: 'Edmond Haddad' }],
    openGraph: {
      title: `${project.title} | ${project.client || 'Portfolio'}`,
      description: project.description || '',
      url: `${baseUrl}/projects/${id}`,
      siteName: 'Edmond Haddad Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.client || 'Portfolio'}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${project.client || 'Portfolio'}`,
      description: (project.description || '').substring(0, 200),
      images: [imageUrl],
      creator: '@yourtwitterhandle',
    },
    alternates: {
      canonical: `/projects/${id}`,
    },
  };
}

async function getRelatedProjects(category: string | null, currentId: string): Promise<VideoProject[]> {
  try {
    if (!category) return [];
    const allProjects = await fetchAPI('/projects');
    return allProjects
      .filter((p: VideoProject) => p.category === category && p.id !== currentId)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    return [];
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.category, project.id);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/#portfolio"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title & Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              {project.category && (
                <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  {project.category}
                </span>
              )}
              {project.year && (
                <>
                  <span className="text-muted-foreground">{project.year}</span>
                  {project.duration && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{project.duration}</span>
                    </>
                  )}
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
              {project.title}
            </h1>

            {project.client && (
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">Client:</span> {project.client}
              </p>
            )}
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden shadow-2xl">
            {project.videoUrl ? (
              <VideoPlayer
                url={project.videoUrl}
                title={`${project.title} - ${project.client || 'Portfolio'}`}
                controls={true}
                posterImage={project.thumbnailUrl || undefined}
              />
            ) : project.thumbnailUrl ? (
              <img
                src={project.thumbnailUrl}
                alt={`${project.title} - ${project.category || 'Portfolio'} video project${project.client ? ` for ${project.client}` : ''}${project.year ? ` (${project.year})` : ''}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-6xl font-bold text-white/20">
                  {project.title.charAt(0)}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-muted text-muted-foreground border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="pt-12 border-t border-border/50">
              <h2 className="text-3xl font-bold mb-8">
                More {project.category} Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    href={`/projects/${related.id}`}
                    className="group block rounded-xl border border-border/50 bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                      {related.thumbnailUrl ? (
                        <img
                          src={related.thumbnailUrl}
                          alt={`${related.title} - ${related.category || 'Portfolio'} project${related.client ? ` for ${related.client}` : ''}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-4xl font-bold text-white/20">
                            {related.title.charAt(0)}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      {related.client && (
                        <p className="text-sm text-muted-foreground">{related.client}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex justify-center pt-8">
            <Link
              href="/#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold transition-all hover:scale-105 shadow-lg shadow-primary/30"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
