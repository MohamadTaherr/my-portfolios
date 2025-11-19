'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

interface FooterSettings {
  footerNavigation?: Array<{
    label: string;
    href: string;
    order: number;
  }>;
  copyrightText?: string;
  tagline?: string;
  showSocialLinks?: boolean;
}

interface FooterClientProps {
  settings: SiteSettings;
}

export default function FooterClient({ settings }: FooterClientProps) {
  const currentYear = new Date().getFullYear();
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';
    fetch(`${API_URL}/api/footer`)
      .then(res => res.json())
      .then((data: FooterSettings) => setFooterSettings(data))
      .catch(err => console.error('Error fetching footer settings:', err));
  }, []);

  const defaultNavItems = [
    { href: '#hero', label: 'Home', order: 0 },
    { href: '#about', label: 'About', order: 1 },
    { href: '#portfolio', label: 'Portfolio', order: 2 },
    { href: '#skills', label: 'Expertise', order: 3 },
    { href: '#contact', label: 'Contact', order: 4 },
  ];

  const navItems = footerSettings?.footerNavigation && footerSettings.footerNavigation.length > 0
    ? footerSettings.footerNavigation.sort((a, b) => a.order - b.order)
    : defaultNavItems;

  const copyrightText = footerSettings?.copyrightText || 'All rights reserved';
  const tagline = footerSettings?.tagline || 'Crafted with cinematic precision';
  const showSocialLinks = footerSettings?.showSocialLinks !== false;

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ivory/60 hover:text-gold transition-colors tracking-wider uppercase"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          {showSocialLinks && socialLinks.length > 0 && (
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
            <p>&copy; {currentYear} {settings.name || 'Edmond Haddad'}. {copyrightText}</p>
            <p className="mt-2 text-xs">{tagline}</p>
          </div>
        </div>
      </div>

      {/* Film grain */}
      <div className="film-grain absolute inset-0 opacity-10 pointer-events-none" />
    </footer>
  );
}
