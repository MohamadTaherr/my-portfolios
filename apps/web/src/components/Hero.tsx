'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface SiteSettings {
  name: string;
  tagline: string;
  bio: string;
  profileImage?: any;
  welcomeMessage: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsServed: number;
  industryAwards?: number;
}

export default function Hero() {
  const [useVideo] = useState(false); // Toggle this to switch between video and image
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = '*[_type == "siteSettings"][0]';
        const data = await client.fetch(query);
        setSettings(data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Default fallback data
  const displayData = settings || {
    name: 'Edmond Haddad',
    tagline: 'Award-Winning Scriptwriter & Creative Producer',
    bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands. From concept to final cut, I create stories that captivate audiences and drive results.',
    welcomeMessage: 'Welcome to my portfolio',
    yearsExperience: 20,
    projectsCompleted: 200,
    clientsServed: 100,
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        {useVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
            {/* Fallback to image if video doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-background to-blue-600/20">
            {/* You can replace this with an actual background image */}
            {/* <Image src="/images/hero-bg.jpg" alt="Hero background" fill className="object-cover" /> */}
          </div>
        )}

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Photo - Left Side */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative group">
              {/* Main Photo Container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                {/* Photo with border and shadow */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary/30 group-hover:scale-[1.02]">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-secondary p-1">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-background">
                      {/* Placeholder - Replace with your actual photo */}
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-purple-500/20 to-secondary/20 flex items-center justify-center">
                        {settings?.profileImage ? (
                          <img
                            src={urlFor(settings.profileImage).width(800).height(800).url()}
                            alt={displayData.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center space-y-4 p-8">
                            <div className="text-7xl md:text-8xl font-bold text-white/40 font-[family-name:var(--font-playfair)]">
                              {displayData.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <p className="text-white/50 text-sm md:text-base">
                              Upload profile photo in<br />
                              Sanity Studio → Site Settings
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full lg:w-7/12 space-y-8 text-center lg:text-left">
            {/* Main Heading */}
            <div className="space-y-4 animate-fade-in">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <p className="text-sm font-semibold text-primary">{displayData.welcomeMessage}</p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight font-[family-name:var(--font-playfair)]">
                Hi, I&apos;m{' '}
                <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {displayData.name}
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground">
                {displayData.tagline}
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {displayData.bio}
            </p>

            {/* Stats/Highlights */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">{displayData.yearsExperience}+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">{displayData.projectsCompleted}+</div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">{displayData.clientsServed}+</div>
                <p className="text-sm text-muted-foreground">Premium Brands</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href="#video-production"
                className="group relative rounded-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 font-semibold text-base transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a
                href="#contact"
                className="rounded-full border-2 border-primary/50 backdrop-blur-sm bg-background/50 text-foreground px-8 py-4 font-semibold text-base transition-all hover:border-primary hover:bg-primary hover:text-white hover:scale-105"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Centered at bottom */}
        <div className="pt-16 md:pt-24 animate-bounce flex justify-center">
          <a href="#video-production" className="block">
            <svg
              className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
}
