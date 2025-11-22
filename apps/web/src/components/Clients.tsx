'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchAPI } from '@/lib/api';
import { getImageProps } from '@/lib/image-utils';

interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  project: string | null;
  category: string | null;
  description: string | null;
  testimonial: string | null;
  clientName: string | null;
  year: string | null;
  rating: number;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
}

interface PageContent {
  clientsTitle?: string;
  clientsSubtitle?: string;
}

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsData, categoriesData, contentData] = await Promise.all([
          fetchAPI('/clients'),
          fetchAPI('/categories'),
          fetchAPI('/page-content'),
        ]);

        setClients(clientsData);

        // Extract unique categories from categories table, but only show those that have clients
        const clientCategories = new Set(clientsData.map((client: Client) => client.category).filter(Boolean));
        const availableCategories = categoriesData
          .filter((cat: Category) => clientCategories.has(cat.name))
          .map((cat: Category) => cat.name);

        setCategories(['All', ...availableCategories]);

        setPageContent(contentData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredClients =
    activeCategory === 'All'
      ? clients
      : clients.filter((client) => client.category === activeCategory);

  if (loading) {
    return (
      <section id="clients" className="relative py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg text-muted-foreground">Loading clients...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white">
              {pageContent.clientsTitle ? (
                <span dangerouslySetInnerHTML={{ __html: pageContent.clientsTitle }} />
              ) : (
                <>
                  Trusted by{' '}
                  <span className="text-white font-bold">
                    World-Class Brands
                  </span>
                </>
              )}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              {pageContent.clientsSubtitle || 'Two decades of delivering exceptional scriptwriting and creative production for premium global brands'}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClients.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No clients found. Add some in the admin panel!</p>
              </div>
            ) : (
              filteredClients.map((client) => (
              <div
                key={client.id}
                className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 space-y-5">
                  {/* Client Logo & Category Badge */}
                  <div className="flex items-start justify-between">
                    <div className="relative w-20 h-20 rounded-xl bg-card border border-border/50 flex items-center justify-center p-2 overflow-hidden">
                      {client.logoUrl ? (
                        <Image
                          src={client.logoUrl}
                          alt={`${client.name} logo - Client of Edmond Haddad`}
                          fill
                          sizes="80px"
                          className="object-contain"
                          loading="lazy"
                          {...getImageProps(client.logoUrl)}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary font-[family-name:var(--font-playfair)]">
                          {client.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    {client.category && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                        {client.category}
                      </span>
                    )}
                  </div>

                  {/* Client Name & Year */}
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {client.name}
                    </h3>
                    {client.year && (
                      <p className="text-sm text-muted-foreground">{client.year}</p>
                    )}
                  </div>

                  {/* Project Name */}
                  {client.project && (
                    <p className="text-lg font-semibold text-foreground/90">
                      {client.project}
                    </p>
                  )}

                  {/* Description */}
                  {client.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {client.description}
                    </p>
                  )}

                  {/* Testimonial */}
                  {client.testimonial && (
                    <div className="pt-4 mt-4 border-t border-border/50">
                      <div className="flex gap-1 mb-2">
                        {[...Array(client.rating || 5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-primary fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm italic text-muted-foreground/80">
                        &ldquo;{client.testimonial}&rdquo;
                      </p>
                      {client.clientName && (
                        <p className="text-xs text-muted-foreground mt-2">— {client.clientName}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              ))
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                200+
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                100+
              </div>
              <p className="text-muted-foreground">Premium Brands</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                20+
              </div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                15+
              </div>
              <p className="text-muted-foreground">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements - fixed to prevent layout shifts */}
      <div 
        className="absolute top-40 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" 
        style={{ 
          contain: 'layout style paint',
          willChange: 'auto',
          transform: 'translateZ(0)'
        }} 
      />
      <div 
        className="absolute bottom-40 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" 
        style={{ 
          contain: 'layout style paint',
          willChange: 'auto',
          transform: 'translateZ(0)'
        }} 
      />
    </section>
  );
}
