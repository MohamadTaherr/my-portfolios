'use client';

import { useState } from 'react';

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

interface HeroClientProps {
  settings: SiteSettings;
}

export default function HeroClient({ settings }: HeroClientProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        {/* Cinematic Portrait Background with Camera Pan */}
        <div className="absolute inset-0">
          {settings.profileImageUrl ? (
            <div className="w-full h-full relative">
              <img
                src={settings.profileImageUrl}
                alt={`${settings.name} - Award-winning scriptwriter and creative producer`}
                className="w-full h-full object-cover animate-camera-pan"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black via-navy to-black" />
          )}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl animate-fade-in-up">
            {/* Tagline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] text-ivory leading-tight tracking-wide">
              I tell stories
              <br />
              <span className="text-gold animate-flicker">that move people</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-ivory/80 font-light tracking-wide">
              {settings.name}
            </p>

            {/* Watch Showreel Button */}
            <div className="pt-8">
              <button
                onClick={() => setShowModal(true)}
                className="group relative inline-flex items-center gap-3 px-10 py-5 border border-gold/60 text-gold hover:bg-gold hover:text-black transition-all duration-500 cinematic-hover"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-lg font-[family-name:var(--font-playfair)] tracking-wider">
                  Watch Showreel
                </span>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <a href="#about" className="block">
              <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
              </div>
            </a>
          </div>
        </div>

        {/* Film grain overlay */}
        <div className="film-grain absolute inset-0 pointer-events-none" />
      </section>

      {/* Showreel Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-full max-w-6xl aspect-video bg-black">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-gold hover:text-ivory text-4xl transition-colors"
            >
              ×
            </button>
            {/* Video Player */}
            {settings.showreelUrl ? (
              settings.showreelUrl.includes('youtube.com') || settings.showreelUrl.includes('youtu.be') ? (
                <iframe
                  src={settings.showreelUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : settings.showreelUrl.includes('vimeo.com') ? (
                <iframe
                  src={settings.showreelUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  src={settings.showreelUrl}
                >
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ivory/50">
                <div className="text-center space-y-4">
                  <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-lg">Add your showreel video URL in Sanity CMS</p>
                  <p className="text-sm">Site Settings → Showreel URL</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
