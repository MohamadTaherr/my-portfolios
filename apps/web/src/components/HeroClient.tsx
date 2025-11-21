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
      <section id="hero" className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <div className="space-y-6 text-center lg:text-left animate-slide-in-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] gradient-text leading-tight font-bold">
                  {settings.name}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-primary tracking-wide font-semibold">
                  {heroSubheadline}
                </p>

                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] text-foreground leading-tight italic font-medium">
                  {heroHeadline}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
                  <div className="glass-card px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover-lift flex-shrink-0">
                    <div className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.yearsExperience}+
                    </div>
                    <div className="text-foreground-muted text-xs sm:text-sm tracking-wider uppercase font-medium">Years</div>
                  </div>
                  <div className="glass-card px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover-lift flex-shrink-0">
                    <div className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.projectsCompleted}+
                    </div>
                    <div className="text-foreground-muted text-xs sm:text-sm tracking-wider uppercase font-medium">Projects</div>
                  </div>
                  <div className="glass-card px-4 sm:px-6 py-3 sm:py-4 rounded-xl hover-lift flex-shrink-0">
                    <div className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] gradient-text-gold font-bold">
                      {settings.clientsServed}+
                    </div>
                    <div className="text-foreground-muted text-xs sm:text-sm tracking-wider uppercase font-medium">Clients</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
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

              {/* Right Column - Creative Visual */}
              <div className="relative animate-fade-in-up">
                <div className="relative aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                  {/* Multiple animated gradient layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-[3rem] blur-3xl animate-pulse-slow" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-[3rem] blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

                  {settings.showreelUrl ? (
                    <div className="relative z-10 group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                      {settings.profileImageUrl ? (
                        <>
                          <div className="relative glass-card p-3 rounded-[2.5rem] hover-lift overflow-hidden">
                            <Image
                              src={settings.profileImageUrl}
                              alt={settings.name}
                              width={800}
                              height={800}
                              className="rounded-[2rem]"
                              priority
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[2rem]">
                              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/40 flex items-center justify-center">
                                <svg className="w-10 h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 pointer-events-none group-hover:border-primary/60 transition-colors" />
                        </>
                      ) : (
                        <div className="relative z-10 glass-card w-full h-full rounded-[2.5rem] p-8 sm:p-10 flex flex-col gap-8 justify-between overflow-hidden hover-lift">
                          <div className="space-y-3 text-center">
                            <p className="text-xs sm:text-sm uppercase tracking-[0.5em] text-white/60">Featured Showreel</p>
                            <h3 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-white">A cinematic snapshot</h3>
                            <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
                              Preview the latest montage - crafted for global campaigns and filmmaker partners.
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="relative aspect-video rounded-2xl border border-white/15 bg-gradient-to-br from-black/70 via-purple-900/40 to-pink-900/30 overflow-hidden shadow-2xl shadow-primary/20">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_60%)]" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 px-6 text-center">
                                <div className="text-xs tracking-[0.6em] uppercase text-white/60">Showreel</div>
                                <div className="text-xl sm:text-2xl font-semibold">Tap play to watch</div>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setIsVideoOpen(true);
                                  }}
                                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition"
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  Play Showreel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : settings.profileImageUrl ? (
                    <div className="relative z-10 group">
                      <div className="glass-card p-3 rounded-[2.5rem] hover-lift">
                        <Image
                          src={settings.profileImageUrl}
                          alt={settings.name}
                          width={800}
                          height={800}
                          className="rounded-[2rem]"
                          priority
                        />
                      </div>
                      <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/20 pointer-events-none group-hover:border-primary/60 transition-colors" />
                    </div>
                  ) : (
                    <div className="relative z-10 glass-card w-full h-full rounded-[2.5rem] flex items-center justify-center hover-lift">
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
