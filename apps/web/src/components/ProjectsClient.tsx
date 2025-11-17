'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';

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
  thumbnailUrl?: string;
  featured: boolean;
}

interface ProjectsClientProps {
  projects: VideoProject[];
  categories: string[];
}

export default function ProjectsClient({ projects, categories }: ProjectsClientProps) {
  const allCategories = ['All', ...categories];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={
              'px-6 py-3 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 ' +
              (activeCategory === category
                ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30'
                : 'glass text-foreground-muted hover:text-foreground hover:border-primary/50')
            }
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-ivory/40 text-lg">No projects in this category yet.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <div
              key={project._id}
              className="group relative aspect-[16/10] overflow-hidden cursor-pointer rounded-2xl hover-lift animate-fade-in-up"
              onClick={() => setSelectedProject(project)}
              style={{ animationDelay: (index * 0.1).toString() + 's' }}
            >
              {/* Glass card background */}
              <div className="absolute inset-0 glass-card transition-all duration-500">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={`${project.title} - ${project.category} project for ${project.client}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                )}

                {/* Modern gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-primary text-xs tracking-widest uppercase font-semibold px-3 py-1 rounded-full glass">
                    {project.category}
                  </span>
                  <span className="text-foreground-muted text-xs">{project.year}</span>
                </div>

                <h3 className="text-2xl font-[family-name:var(--font-playfair)] text-foreground mb-2 font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h3>

                <p className="text-foreground-muted text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.client}
                </p>

                {/* Play button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/50 animate-glow-pulse">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{background: 'rgba(15, 12, 41, 0.95)'}} onClick={() => setSelectedProject(null)}>
          <div className="relative w-full max-w-7xl glass-card p-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-light hover:scale-110 transition-transform flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/30 z-10"
            >
              ×
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="relative aspect-video bg-background-light rounded-xl overflow-hidden">
                  {selectedProject.videoUrl ? (
                    <VideoPlayer
                      url={selectedProject.videoUrl}
                      title={`${selectedProject.title} - ${selectedProject.client}`}
                      autoPlay={true}
                      controls={true}
                      posterImage={selectedProject.thumbnailUrl}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {selectedProject.thumbnailUrl ? (
                        <img
                          src={selectedProject.thumbnailUrl}
                          alt={`${selectedProject.title} - ${selectedProject.category} project for ${selectedProject.client}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-ivory/40">
                          <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <p>Video preview coming soon</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-2 rounded-full glass text-primary text-xs tracking-widest uppercase font-semibold">
                      {selectedProject.category}
                    </span>
                    <span className="text-foreground-muted text-sm font-medium">{selectedProject.year}</span>
                  </div>
                  <h2 className="text-4xl font-[family-name:var(--font-playfair)] gradient-text mb-3 font-bold">
                    {selectedProject.title}
                  </h2>
                  <p className="text-primary/90 text-lg font-semibold">{selectedProject.client}</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div>
                  <p className="text-foreground-muted leading-relaxed">{selectedProject.description}</p>
                </div>
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-4 py-2 text-xs glass rounded-full text-foreground-muted hover:text-primary transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                <div className="pt-4">
                  <div className="glass rounded-lg p-4">
                    <span className="text-primary font-semibold">Duration:</span>{' '}
                    <span className="text-foreground-muted">{selectedProject.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
