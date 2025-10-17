'use client';

import { useState } from 'react';

// Client data - replace with your actual clients
const clients = [
  {
    id: 1,
    name: 'Tech Startup Inc',
    logo: '/clients/tech-startup.png', // Add your client logos to public/clients/
    project: 'Product Launch Video',
    category: 'Video Production',
    description: 'Created a compelling product launch video that increased pre-orders by 150%',
    testimonial: 'Outstanding work! The video perfectly captured our vision and exceeded all expectations.',
    year: '2024',
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

  const filteredClients =
    activeCategory === 'All'
      ? clients
      : clients.filter((client) => client.category === activeCategory);

  return (
    <section id="clients" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Amazing Clients
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Delivering exceptional video production and scriptwriting services to brands worldwide
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
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 space-y-5">
                  {/* Client Logo Placeholder & Category Badge */}
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      {/* Replace with actual logo: <Image src={client.logo} alt={client.name} width={64} height={64} /> */}
                      <span className="text-2xl font-bold text-primary">
                        {client.name.charAt(0)}
                      </span>
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
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground/80">
                      &ldquo;{client.testimonial}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                50+
              </div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                30+
              </div>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                5+
              </div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                98%
              </div>
              <p className="text-muted-foreground">Client Satisfaction</p>
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
