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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/>
          </svg>
        );
      case 'vimeo':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.011 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const socialLinks = [
    settings.socialLinks?.linkedin && { href: settings.socialLinks.linkedin, label: 'LinkedIn', platform: 'linkedin' },
    settings.socialLinks?.vimeo && { href: settings.socialLinks.vimeo, label: 'Vimeo', platform: 'vimeo' },
    settings.socialLinks?.youtube && { href: settings.socialLinks.youtube, label: 'YouTube', platform: 'youtube' },
    settings.socialLinks?.instagram && { href: settings.socialLinks.instagram, label: 'Instagram', platform: 'instagram' },
    settings.socialLinks?.twitter && { href: settings.socialLinks.twitter, label: 'Twitter/X', platform: 'twitter' },
  ].filter(Boolean) as { href: string; label: string; platform: string }[];

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
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/80 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.platform)}
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
