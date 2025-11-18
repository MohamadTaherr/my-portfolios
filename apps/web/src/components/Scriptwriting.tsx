'use client';

import { useState, useEffect } from 'react';

interface Script {
  id: string;
  title: string;
  type: string;
  client: string | null;
  duration: string | null;
  year: string | null;
  description: string | null;
  excerpt: string | null;
  tags: string[];
  wordCount: string | null;
  featured: boolean;
}

// Note: Scripts can be added via the admin panel
// For now, this component shows a message if no scripts are found
const scriptTypes = ['All', 'Commercial Script', 'Documentary Script', 'Social Media Scripts', 'Short Film Script', 'Corporate Script', 'E-Learning Script'];

export default function Scriptwriting() {
  const [activeType, setActiveType] = useState('All');
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scripts can be managed via projects in the admin panel
    // For now, we'll show an empty state with instructions
    setLoading(false);
  }, []);

  const filteredScripts =
    activeType === 'All'
      ? scripts
      : scripts.filter((script) => script.type === activeType);

  if (loading) {
    return (
      <section id="scriptwriting" className="relative py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg text-muted-foreground">Loading scripts...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="scriptwriting" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)]">
              Scriptwriting{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Two decades of crafting compelling narratives that engage audiences and deliver powerful messages for premium brands
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
            {filteredScripts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No scripts found. Add scripts via the admin panel!</p>
              </div>
            ) : (
              filteredScripts.map((script) => (
              <div
                key={script.id}
                className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-8 space-y-5">
                  {/* Type Badge & Year */}
                  <div className="flex items-center justify-between">
                    {script.type && (
                      <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                        {script.type}
                      </span>
                    )}
                    {script.year && (
                      <span className="text-sm text-muted-foreground">{script.year}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {script.title}
                  </h3>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {script.client && (
                      <div>
                        <span className="text-muted-foreground">Client:</span>
                        <p className="font-semibold">{script.client}</p>
                      </div>
                    )}
                    {script.duration && (
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-semibold">{script.duration}</p>
                      </div>
                    )}
                    {script.wordCount && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Word Count:</span>
                        <p className="font-semibold">{script.wordCount} words</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {script.description && (
                    <p className="text-muted-foreground/90 leading-relaxed">
                      {script.description}
                    </p>
                  )}

                  {/* Script Excerpt */}
                  {script.excerpt && (
                    <div className="relative">
                      <div
                        className={`bg-muted/50 rounded-lg p-4 border border-border/50 font-[family-name:var(--font-courier)] text-sm leading-relaxed transition-all duration-300 ${
                          expandedScript === script.id ? 'max-h-96' : 'max-h-32'
                        } overflow-hidden`}
                      >
                        <pre className="whitespace-pre-wrap text-muted-foreground font-[family-name:var(--font-courier)]">
                          {script.excerpt}
                        </pre>
                      </div>

                      {/* Gradient fade for collapsed state */}
                      {expandedScript !== script.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                      )}
                    </div>
                  )}

                  {/* Expand/Collapse Button */}
                  {script.excerpt && (
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
                  )}

                  {/* Tags */}
                  {script.tags && script.tags.length > 0 && (
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
                  )}

                  {/* Contact CTA */}
                  <button className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold hover:from-primary hover:to-secondary hover:text-white transition-all">
                    Request Full Script
                  </button>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
            )}
          </div>

          {/* Writing Process Section */}
          <div className="mt-24 pt-16 border-t border-border/50">
            <h3 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-playfair)]">
              My Writing <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Process</span>
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
