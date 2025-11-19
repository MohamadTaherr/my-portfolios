'use client';

import { useEffect, useState } from 'react';

interface CinematicIntroProps {
  name: string;
  tagline: string;
}

export default function CinematicIntro({ name, tagline }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    // Stage progression
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 3000);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenIntro', 'true');
      document.body.style.overflow = 'auto';
    }, 4500);

    // Prevent scroll during intro
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const skipIntro = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
    document.body.style.overflow = 'auto';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none film-grain" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-cyan-900/20 animate-pulse-slow" />

      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-black border-b border-white/10 animate-slide-down" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black border-t border-white/10 animate-slide-up" />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Film countdown style */}
        <div className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          {/* Circular countdown */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset="0"
                className="animate-countdown"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                {stage >= 2 ? '2' : '3'}
              </div>
            </div>
          </div>

          {/* Name reveal */}
          <div className={`text-center transition-all duration-1000 delay-500 px-4 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] font-bold mb-4 md:mb-6 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-yellow-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                {name}
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-white/60 to-white/30" />
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 tracking-wider uppercase font-light">
                {tagline}
              </p>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent via-white/60 to-white/30" />
            </div>
          </div>

          {/* Loading bar */}
          <div className={`mt-8 md:mt-12 w-48 md:w-64 mx-auto transition-all duration-1000 delay-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-500 via-cyan-500 to-orange-500 rounded-full animate-loading-bar" />
            </div>
            <p className="text-white/40 text-xs text-center mt-3 tracking-widest uppercase">
              Loading Experience
            </p>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={skipIntro}
        className="absolute bottom-8 right-8 px-6 py-3 text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-full text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
      >
        Skip Intro →
      </button>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/60" />

      <style jsx>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes countdown {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 283; }
        }
        @keyframes loading-bar {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-countdown {
          animation: countdown 4s linear;
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
