'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';

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
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Badge */}
            <div className="flex justify-center mb-12 animate-fade-in">
              <span className="inline-block px-6 py-3 glass rounded-full text-primary text-xs tracking-[0.3em] uppercase font-semibold border border-primary/30">
                {settings.welcomeMessage}
              </span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8 text-center lg:text-left animate-slide-in-left">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] gradient-text leading-tight font-bold">
                  {settings.name}
                </h1>

                <p className="text-xl md:text-2xl text-primary tracking-wide font-semibold">
                  {heroSubheadline}
                </p>

                <p className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-foreground leading-tight italic font-medium">
                  {heroHeadline}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
                  <div className="glass-card px-6 py-4 rounded-xl hover-lift">
                    <div className="text-4xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.yearsExperience}+
                    </div>
                    <div className="text-foreground-muted text-sm tracking-wider uppercase font-medium">Years</div>
                  </div>
                  <div className="glass-card px-6 py-4 rounded-xl hover-lift">
                    <div className="text-4xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.projectsCompleted}+
                    </div>
                    <div className="text-foreground-muted text-sm tracking-wider uppercase font-medium">Projects</div>
                  </div>
                  <div className="glass-card px-6 py-4 rounded-xl hover-lift">
                    <div className="text-4xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.clientsServed}+
                    </div>
                    <div className="text-foreground-muted text-sm tracking-wider uppercase font-medium">Clients</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
                  <a
                    href="#portfolio"
                    className="btn-primary text-center font-semibold text-lg"
                  >
                    View My Work
                  </a>
                  {settings.showreelUrl && (
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="btn-secondary text-center font-semibold text-lg"
                    >
                      Watch Showreel
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column - Image/Video */}
              <div className="relative animate-fade-in-up">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-3xl animate-pulse-slow" />

                  {settings.profileImageUrl ? (
                    <div className="relative z-10 group">
                      <div className="glass-card p-2 rounded-3xl hover-lift">
                        <Image
                          src={settings.profileImageUrl}
                          alt={settings.name}
                          width={800}
                          height={800}
                          className="rounded-2xl"
                          priority
                        />
                      </div>
                      <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 pointer-events-none group-hover:border-primary/40 transition-colors" />
                    </div>
                  ) : (
                    <div className="relative z-10 glass-card w-full h-full rounded-3xl flex items-center justify-center hover-lift">
                      <span className="gradient-text text-8xl font-[family-name:var(--font-playfair)] font-bold">
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
              <VideoPlayer
                url={settings.showreelUrl}
                title={`${settings.name} - Showreel`}
                autoPlay={true}
                controls={true}
              />
            </div>
          </div>
        )}

        {/* Modern floating orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>
    </>
  );
}
