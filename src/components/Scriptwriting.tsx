'use client';

import { useState } from 'react';

// Scriptwriting portfolio - replace with your actual scripts
const scripts = [
  {
    id: 1,
    title: 'The Future is Now',
    type: 'Commercial Script',
    client: 'Tech Corporation',
    duration: '60 seconds',
    year: '2024',
    description: 'A powerful 60-second commercial script for a tech company launching their new AI product. Focuses on emotional storytelling and brand values.',
    excerpt: 'FADE IN:\n\nINT. MODERN OFFICE - DAY\n\nA young professional stares at her screen, overwhelmed by data. Suddenly, the AI assistant appears...',
    tags: ['Commercial', 'Tech', 'B2B'],
    wordCount: '145',
    featured: true,
  },
  {
    id: 2,
    title: 'Voices of Change',
    type: 'Documentary Script',
    client: 'Non-Profit Organization',
    duration: '12 minutes',
    year: '2024',
    description: 'Documentary script featuring interviews with community leaders, exploring themes of resilience and social change.',
    excerpt: 'NARRATOR (V.O.)\nIn every community, there are voices that echo beyond their streets. Voices that inspire. Voices that change...',
    tags: ['Documentary', 'Social Impact', 'Interview'],
    wordCount: '2,400',
    featured: true,
  },
  {
    id: 3,
    title: 'Quick Bites Series',
    type: 'Social Media Scripts',
    client: 'Food Delivery App',
    duration: '15-30 seconds',
    year: '2024',
    description: 'A series of short, punchy scripts for TikTok and Instagram Reels. Fast-paced, engaging, and optimized for mobile viewing.',
    excerpt: 'SCENE: Kitchen chaos. Timer beeping. Phone buzzes.\n\nTEXT OVERLAY: "When hunger strikes..."\n\nQUICK CUT to app interface...',
    tags: ['Social Media', 'Short-Form', 'Brand'],
    wordCount: '50 per script',
    featured: true,
  },
  {
    id: 4,
    title: 'Journey Home',
    type: 'Short Film Script',
    client: 'Personal Project',
    duration: '18 minutes',
    year: '2023',
    description: 'A heartfelt short film script about family, memory, and finding your way back. Character-driven narrative with emotional depth.',
    excerpt: 'EXT. COUNTRY ROAD - SUNSET\n\nSARAH (30s) walks alone, suitcase in hand. Each step heavier than the last. In the distance, the old farmhouse waits...',
    tags: ['Drama', 'Short Film', 'Character-Driven'],
    wordCount: '3,200',
    featured: true,
  },
  {
    id: 5,
    title: 'Product Launch Keynote',
    type: 'Corporate Script',
    client: 'E-commerce Platform',
    duration: '8 minutes',
    year: '2023',
    description: 'Executive keynote script for a product launch event. Balances technical details with inspirational messaging.',
    excerpt: 'Good morning. Today, we\'re not just launching a product. We\'re launching a revolution in how people connect with what they love...',
    tags: ['Corporate', 'Keynote', 'Product Launch'],
    wordCount: '1,800',
    featured: true,
  },
  {
    id: 6,
    title: 'Educational Series',
    type: 'E-Learning Script',
    client: 'Online Learning Platform',
    duration: '5 minutes per episode',
    year: '2023',
    description: 'Engaging educational scripts that make complex topics accessible. Conversational tone with clear learning objectives.',
    excerpt: 'Have you ever wondered how the internet actually works? Today, we\'re going to break it down in a way that makes sense...',
    tags: ['Education', 'Explainer', 'Series'],
    wordCount: '750 per episode',
    featured: true,
  },
];

const scriptTypes = ['All', 'Commercial Script', 'Documentary Script', 'Social Media Scripts', 'Short Film Script', 'Corporate Script', 'E-Learning Script'];

export default function Scriptwriting() {
  const [activeType, setActiveType] = useState('All');
  const [expandedScript, setExpandedScript] = useState<number | null>(null);

  const filteredScripts =
    activeType === 'All'
      ? scripts
      : scripts.filter((script) => script.type === activeType);

  return (
    <section id="scriptwriting" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold">
              Scriptwriting{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Crafting compelling narratives that engage audiences and deliver powerful messages
            </p>
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {scriptTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeType === type
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-105'
                    : 'bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {type === 'All' ? 'All Scripts' : type}
              </button>
            ))}
          </div>

          {/* Scripts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredScripts.map((script) => (
              <div
                key={script.id}
                className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 space-y-5">
                  {/* Type Badge & Year */}
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                      {script.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{script.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {script.title}
                  </h3>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Client:</span>
                      <p className="font-semibold">{script.client}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-semibold">{script.duration}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Word Count:</span>
                      <p className="font-semibold">{script.wordCount} words</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground/90 leading-relaxed">
                    {script.description}
                  </p>

                  {/* Script Excerpt */}
                  <div className="relative">
                    <div
                      className={`bg-muted/50 rounded-lg p-4 border border-border/50 font-mono text-sm leading-relaxed transition-all duration-300 ${
                        expandedScript === script.id ? 'max-h-96' : 'max-h-32'
                      } overflow-hidden`}
                    >
                      <pre className="whitespace-pre-wrap text-muted-foreground">
                        {script.excerpt}
                      </pre>
                    </div>

                    {/* Gradient fade for collapsed state */}
                    {expandedScript !== script.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedScript(expandedScript === script.id ? null : script.id)}
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-2"
                  >
                    {expandedScript === script.id ? (
                      <>
                        Show Less
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Read Excerpt
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    {script.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Contact CTA */}
                  <button className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold hover:from-primary hover:to-secondary hover:text-white transition-all">
                    Request Full Script
                  </button>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Writing Process Section */}
          <div className="mt-24 pt-16 border-t border-border/50">
            <h3 className="text-3xl font-bold text-center mb-12">
              My Writing <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Process</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h4 className="text-xl font-bold">Research & Discovery</h4>
                <p className="text-sm text-muted-foreground">
                  Understanding your brand, audience, and goals through detailed research
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h4 className="text-xl font-bold">Concept Development</h4>
                <p className="text-sm text-muted-foreground">
                  Crafting compelling concepts and narrative structures that resonate
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h4 className="text-xl font-bold">Script Writing</h4>
                <p className="text-sm text-muted-foreground">
                  Writing engaging scripts with attention to pacing, dialogue, and visuals
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h4 className="text-xl font-bold">Refinement</h4>
                <p className="text-sm text-muted-foreground">
                  Collaborating with you to polish and perfect the final script
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
