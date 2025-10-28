'use client';

import { useState, useEffect } from 'react';
import { client as sanityClient } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

interface Client {
  _id: string;
  name: string;
  logo: any;
  project: string;
  category: string;
  description: string;
  testimonial: string;
  clientName?: string;
  year: string;
  rating: number;
  featured: boolean;
}

// Placeholder client data for fallback
const placeholderClients = [
  {
    id: 1,
    name: 'Porsche',
    logo: '/clients/porsche.png', // Add your client logos to public/clients/
    project: 'Premium Commercial Scripts',
    category: 'Scriptwriting',
    description: 'Crafted high-end commercial scripts that elevated brand storytelling for global automotive excellence',
    testimonial: 'Exceptional storytelling that perfectly captures the essence of performance and luxury.',
    year: '2023',
    featured: true,
  },
  {
    id: 2,
    name: 'Creative Agency Co',
    logo: '/clients/creative-agency.png',
    project: 'Brand Story Script',
    category: 'Scriptwriting',
    description: 'Developed an engaging brand story script that resonated with their target audience',
    testimonial: 'The script was powerful and perfectly aligned with our brand voice.',
    year: '2024',
    featured: true,
  },
  {
    id: 3,
    name: 'E-Learning Platform',
    logo: '/clients/elearning.png',
    project: 'Educational Video Series',
    category: 'Video Production',
    description: 'Produced a 10-part educational video series with professional quality',
    testimonial: 'Professional, creative, and delivered on time. Highly recommend!',
    year: '2023',
    featured: true,
  },
  {
    id: 4,
    name: 'Marketing Solutions Ltd',
    logo: '/clients/marketing.png',
    project: 'Commercial Scripts',
    category: 'Scriptwriting',
    description: 'Wrote compelling commercial scripts for social media and TV campaigns',
    testimonial: 'Creative scripts that converted viewers into customers.',
    year: '2023',
    featured: true,
  },
  {
    id: 5,
    name: 'Healthcare Group',
    logo: '/clients/healthcare.png',
    project: 'Explainer Video',
    category: 'Video Production',
    description: 'Created an explainer video simplifying complex medical procedures',
    testimonial: 'Made complex topics accessible and engaging for our patients.',
    year: '2024',
    featured: true,
  },
  {
    id: 6,
    name: 'Fashion Brand',
    logo: '/clients/fashion.png',
    project: 'Campaign Narrative',
    category: 'Scriptwriting',
    description: 'Crafted a compelling narrative for their seasonal fashion campaign',
    testimonial: 'The narrative elevated our brand and resonated with our audience.',
    year: '2023',
    featured: true,
  },
];

const categories = ['All', 'Video Production', 'Scriptwriting'];

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const query = '*[_type == "client"] | order(order asc, _createdAt desc)';
        const data = await sanityClient.fetch(query);
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
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
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                World-Class Brands
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Two decades of delivering exceptional scriptwriting and creative production for premium global brands
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
                <p className="text-muted-foreground">No clients found. Add some in Sanity Studio!</p>
              </div>
            ) : (
              filteredClients.map((client) => (
              <div
                key={client._id}
                className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 space-y-5">
                  {/* Client Logo & Category Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-20 h-20 rounded-xl bg-card border border-border/50 flex items-center justify-center p-2 overflow-hidden">
                      {client.logo ? (
                        <img
                          src={urlFor(client.logo).width(200).height(200).url()}
                          alt={`${client.name} logo - Client of Edmond Haddad`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary font-[family-name:var(--font-playfair)]">
                          {client.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                      {client.category}
                    </span>
                  </div>

                  {/* Client Name & Year */}
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{client.year}</p>
                  </div>

                  {/* Project Name */}
                  <p className="text-lg font-semibold text-foreground/90">
                    {client.project}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {client.description}
                  </p>

                  {/* Testimonial */}
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

      {/* Decorative background elements */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
}
