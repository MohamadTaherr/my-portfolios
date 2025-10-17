'use client';

import { useState } from 'react';

// Video production portfolio - replace with your actual projects
const videoProjects = [
  {
    id: 1,
    title: 'Corporate Brand Story',
    description: 'A compelling 3-minute brand story video for a tech startup, featuring interviews, b-roll, and motion graphics.',
    client: 'Tech Innovations Inc.',
    category: 'Commercial',
    duration: '3:24',
    year: '2024',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading'],
    videoUrl: '/videos/brand-story.mp4', // Add your video files to public/videos/
    thumbnail: '/thumbnails/brand-story.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Documentary Short Film',
    description: 'A 15-minute documentary exploring local artisans and their crafts, featuring cinematic storytelling and interviews.',
    client: 'Personal Project',
    category: 'Documentary',
    duration: '15:42',
    year: '2024',
    tags: ['DaVinci Resolve', 'Sound Design', 'Cinematography'],
    videoUrl: '/videos/documentary.mp4',
    thumbnail: '/thumbnails/documentary.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Social Media Campaign',
    description: 'A series of 30-second promotional videos optimized for Instagram and TikTok, driving engagement and conversions.',
    client: 'Fashion Brand Co.',
    category: 'Social Media',
    duration: '0:30',
    year: '2024',
    tags: ['Mobile Editing', 'Fast-Paced', 'Vertical Video'],
    videoUrl: '/videos/social-campaign.mp4',
    thumbnail: '/thumbnails/social.jpg',
    featured: true,
  },
  {
    id: 4,
    title: 'Product Demo Video',
    description: 'Professional product demonstration with smooth transitions, text overlays, and engaging visuals.',
    client: 'E-commerce Platform',
    category: 'Commercial',
    duration: '2:15',
    year: '2023',
    tags: ['Motion Graphics', 'Product Showcase', 'Animation'],
    videoUrl: '/videos/product-demo.mp4',
    thumbnail: '/thumbnails/product.jpg',
    featured: true,
  },
  {
    id: 5,
    title: 'Event Coverage',
    description: 'Multi-camera event coverage with highlights reel, capturing the energy and key moments of a corporate conference.',
    client: 'Annual Business Summit',
    category: 'Event',
    duration: '8:30',
    year: '2023',
    tags: ['Multi-cam', 'Live Editing', 'Event Production'],
    videoUrl: '/videos/event.mp4',
    thumbnail: '/thumbnails/event.jpg',
    featured: true,
  },
  {
    id: 6,
    title: 'Music Video',
    description: 'Creative music video with unique visual effects, color grading, and artistic storytelling.',
    client: 'Independent Artist',
    category: 'Music Video',
    duration: '4:12',
    year: '2023',
    tags: ['Creative Editing', 'VFX', 'Color Grading'],
    videoUrl: '/videos/music-video.mp4',
    thumbnail: '/thumbnails/music.jpg',
    featured: true,
  },
];

const categories = ['All', 'Commercial', 'Documentary', 'Social Media', 'Event', 'Music Video'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? videoProjects
      : videoProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="video-production" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              Video Production{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              From concept to final cut - creating professional videos that tell compelling stories
            </p>
          </div>

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
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                {/* Video Thumbnail / Player */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  {selectedVideo === project.id ? (
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
                      onClick={() => setSelectedVideo(project.id)}
                    >
                      {/* Thumbnail placeholder - replace with actual thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>

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
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Button */}
                  <button
                    onClick={() => setSelectedVideo(selectedVideo === project.id ? null : project.id)}
                    className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold hover:from-primary hover:to-secondary hover:text-white transition-all"
                  >
                    {selectedVideo === project.id ? 'Close Video' : 'Watch Video'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
}
