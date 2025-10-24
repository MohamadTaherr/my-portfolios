'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface ProjectsClientProps {
  projects: VideoProject[];
  urlFor: (source: any) => any;
}

const categories = ['All', 'Commercial', 'Documentary', 'Social Media', 'Event', 'Music Video'];

export default function ProjectsClient({ projects, urlFor }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-105'
                : 'bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No video projects found in this category. Add some in Sanity Studio at http://localhost:3333
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              {/* Video Thumbnail / Player */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                {selectedVideo === project._id ? (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    src={project.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer group/thumb"
                    onClick={() => setSelectedVideo(project._id)}
                  >
                    {/* Thumbnail from Sanity */}
                    {project.thumbnail ? (
                      <img
                        src={urlFor(project.thumbnail).width(800).height(450).url()}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/thumb:bg-black/50 transition-colors">
                      <div className="w-20 h-20 rounded-full bg-white/90 group-hover/thumb:bg-white group-hover/thumb:scale-110 transition-all flex items-center justify-center shadow-2xl">
                        <svg
                          className="w-8 h-8 text-primary ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-sm font-semibold">
                      {project.duration}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4">
                {/* Category & Year */}
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                    {project.category}
                  </span>
                  <span className="text-muted-foreground">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Client */}
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Client:</span> {project.client}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      setSelectedVideo(selectedVideo === project._id ? null : project._id)
                    }
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold hover:from-primary hover:to-secondary hover:text-white transition-all"
                  >
                    {selectedVideo === project._id ? 'Close' : 'Play'}
                  </button>
                  <Link
                    href={`/projects/${project._id}`}
                    className="flex-1 py-3 rounded-lg border border-border/50 text-foreground font-semibold hover:border-primary/50 hover:text-primary transition-all text-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
