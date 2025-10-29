'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SiteSettings {
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl?: string;
  showreelUrl?: string;
  welcomeMessage: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsServed: number;
  industryAwards?: number;
}

interface PageContent {
  heroHeadline?: string;
  heroSubheadline?: string;
}

interface HeroClientProps {
  settings: SiteSettings;
  pageContent?: PageContent;
}

export default function HeroClient({ settings, pageContent }: HeroClientProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const heroHeadline = pageContent?.heroHeadline || 'I tell stories that move people';
  const heroSubheadline = pageContent?.heroSubheadline || settings.tagline;

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Badge */}
            <div className="flex justify-center mb-12 animate-fade-in">
              <span className="inline-block px-6 py-2 border border-gold/40 text-gold/80 text-xs tracking-[0.3em] uppercase backdrop-blur-sm">
                {settings.welcomeMessage}
              </span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8 text-center lg:text-left animate-slide-in-left">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] text-ivory leading-tight">
                  {settings.name}
                </h1>

                <p className="text-xl md:text-2xl text-gold/80 tracking-wide">
                  {heroSubheadline}
                </p>

                <p className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] text-ivory/90 leading-tight italic">
                  {heroHeadline}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
                  <div>
                    <div className="text-4xl font-[family-name:var(--font-playfair)] text-gold">
                      {settings.yearsExperience}+
                    </div>
                    <div className="text-ivory/60 text-sm tracking-wider uppercase">Years</div>
                  </div>
                  <div className="h-16 w-px bg-gold/20" />
                  <div>
                    <div className="text-4xl font-[family-name:var(--font-playfair)] text-gold">
                      {settings.projectsCompleted}+
                    </div>
                    <div className="text-ivory/60 text-sm tracking-wider uppercase">Projects</div>
                  </div>
                  <div className="h-16 w-px bg-gold/20" />
                  <div>
                    <div className="text-4xl font-[family-name:var(--font-playfair)] text-gold">
                      {settings.clientsServed}+
                    </div>
                    <div className="text-ivory/60 text-sm tracking-wider uppercase">Clients</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
                  <a
                    href="#portfolio"
                    className="px-8 py-4 bg-gold text-black hover:bg-gold/90 transition-all duration-300 cinematic-hover"
                  >
                    <span className="font-[family-name:var(--font-playfair)] text-lg tracking-wider">
                      View My Work
                    </span>
                  </a>
                  {settings.showreelUrl && (
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="px-8 py-4 border border-gold/60 text-gold hover:bg-gold/10 transition-all duration-300 cinematic-hover"
                    >
                      <span className="font-[family-name:var(--font-playfair)] text-lg tracking-wider">
                        Watch Showreel
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column - Image/Video */}
              <div className="relative animate-fade-in-up">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl" />
                  {settings.profileImageUrl ? (
                    <div className="relative z-10">
                      <Image
                        src={settings.profileImageUrl}
                        alt={settings.name}
                        width={800}
                        height={800}
                        className="rounded-lg shadow-2xl cinematic-hover"
                        priority
                      />
                      <div className="absolute inset-0 border-2 border-gold/20 rounded-lg pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative z-10 w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg flex items-center justify-center">
                      <span className="text-gold/40 text-8xl font-[family-name:var(--font-playfair)]">
                        {settings.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && settings.showreelUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fade-in"
            onClick={() => setIsVideoOpen(false)}
          >
            <button
              className="absolute top-8 right-8 text-gold hover:text-ivory text-4xl"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="w-full max-w-6xl aspect-video px-4" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={settings.showreelUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>
        <div className="film-grain absolute inset-0 opacity-30 pointer-events-none" />
      </section>
    </>
  );
}
