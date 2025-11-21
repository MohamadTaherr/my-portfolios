'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  order: number;
}

interface NavigationSettings {
  links?: NavItem[];
  mainNavigation?: NavItem[];
  logoText?: string;
  logoUrl?: string;
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { href: '#home', label: 'Home', order: 0 },
    { href: '#about', label: 'About', order: 1 },
    { href: '#portfolio', label: 'Portfolio', order: 2 },
    { href: '#skills', label: 'Skills', order: 3 },
    { href: '#contact', label: 'Contact', order: 4 },
  ]);
  const [logoText, setLogoText] = useState('EH');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch navigation settings from API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';
    fetch(`${API_URL}/api/navigation`)
      .then(res => res.json())
      .then((data: NavigationSettings) => {
        const links = data.links?.length ? data.links : data.mainNavigation || [];
        if (links.length > 0) {
          const sortedLinks = links
            .map((link, index) => ({ ...link, order: link.order ?? index }))
            .sort((a, b) => a.order - b.order);
          setNavItems(sortedLinks);
        }
        if (typeof data.logoText === 'string' && data.logoText.trim()) {
          setLogoText(data.logoText.trim());
        }
        setLogoUrl(data.logoUrl?.trim() ? data.logoUrl.trim() : null);
      })
      .catch(err => console.error('Error fetching navigation:', err));
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const normalizeHref = (href: string) => {
    if (!href) return '#';
    if (href.startsWith('/#')) {
      return href;
    }
    if (href.startsWith('#')) {
      return pathname === '/' ? href : `/${href}`;
    }
    return href;
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-gold/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Site logo"
                width={160}
                height={48}
                priority
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-[family-name:var(--font-playfair)] text-gold tracking-wider">
                {logoText}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={normalizeHref(item.href)}
                className="text-sm tracking-wider uppercase text-ivory/70 hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ivory/70 hover:text-gold"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={normalizeHref(item.href)}
                  className="text-sm tracking-wider uppercase text-ivory/70 hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
