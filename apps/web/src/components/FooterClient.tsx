'use client';

import Link from 'next/link';

interface SiteSettings {
  name?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    vimeo?: string;
  };
}

interface FooterClientProps {
  settings: SiteSettings;
}

export default function FooterClient({ settings }: FooterClientProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    settings.socialLinks?.linkedin && { href: settings.socialLinks.linkedin, label: 'LinkedIn', icon: 'in' },
    settings.socialLinks?.vimeo && { href: settings.socialLinks.vimeo, label: 'Vimeo', icon: 'Vi' },
    settings.socialLinks?.youtube && { href: settings.socialLinks.youtube, label: 'YouTube', icon: 'Yt' },
    settings.socialLinks?.instagram && { href: settings.socialLinks.instagram, label: 'Instagram', icon: 'Ig' },
    settings.socialLinks?.twitter && { href: settings.socialLinks.twitter, label: 'Twitter/X', icon: 'X' },
  ].filter(Boolean) as { href: string; label: string; icon: string }[];

  return (
    <footer className="relative border-t border-gold/10 bg-black py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="text-3xl font-[family-name:var(--font-playfair)] text-gold tracking-wider">
            {settings.name || 'Edmond Haddad'}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link href="#hero" className="text-ivory/60 hover:text-gold transition-colors tracking-wider uppercase">
              Home
            </Link>
            <Link href="#about" className="text-ivory/60 hover:text-gold transition-colors tracking-wider uppercase">
              About
            </Link>
            <Link href="#portfolio" className="text-ivory/60 hover:text-gold transition-colors tracking-wider uppercase">
              Portfolio
            </Link>
            <Link href="#skills" className="text-ivory/60 hover:text-gold transition-colors tracking-wider uppercase">
              Expertise
            </Link>
            <Link href="#contact" className="text-ivory/60 hover:text-gold transition-colors tracking-wider uppercase">
              Contact
            </Link>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                  aria-label={link.label}
                >
                  <span className="text-xs font-bold">{link.icon}</span>
                </a>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gold/20" />

          {/* Copyright */}
          <div className="text-ivory/40 text-sm text-center">
            <p>&copy; {currentYear} {settings.name || 'Edmond Haddad'}. All rights reserved.</p>
            <p className="mt-2 text-xs">Crafted with cinematic precision</p>
          </div>
        </div>
      </div>

      {/* Film grain */}
      <div className="film-grain absolute inset-0 opacity-10 pointer-events-none" />
    </footer>
  );
}
