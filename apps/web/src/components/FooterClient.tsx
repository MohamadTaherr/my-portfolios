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
    settings.socialLinks?.linkedin && { href: settings.socialLinks.linkedin, label: 'LinkedIn' },
    settings.socialLinks?.twitter && { href: settings.socialLinks.twitter, label: 'Twitter/X' },
    settings.socialLinks?.instagram && { href: settings.socialLinks.instagram, label: 'Instagram' },
    settings.socialLinks?.youtube && { href: settings.socialLinks.youtube, label: 'YouTube' },
    settings.socialLinks?.vimeo && { href: settings.socialLinks.vimeo, label: 'Vimeo' },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} {settings.name || 'Your Name'}. All rights reserved.
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center space-x-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Quick Links */}
          <div className="flex items-center space-x-4 text-sm">
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
