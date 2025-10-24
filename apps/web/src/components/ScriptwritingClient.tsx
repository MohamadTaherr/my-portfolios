'use client';

import { useState } from 'react';

interface Script {
  _id: string;
  title: string;
  type: string;
  client: string;
  duration: string;
  year: string;
  description: string;
  excerpt: string;
  tags: string[];
  wordCount: string;
  featured: boolean;
}

interface ScriptwritingClientProps {
  scripts: Script[];
}

const scriptTypes = [
  'All',
  'Commercial Script',
  'Documentary Script',
  'Social Media Scripts',
  'Short Film Script',
  'Corporate Script',
  'E-Learning Script',
];

export default function ScriptwritingClient({ scripts }: ScriptwritingClientProps) {
  const [activeType, setActiveType] = useState('All');
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  const filteredScripts =
    activeType === 'All'
      ? scripts
      : scripts.filter((script) => script.type === activeType);

  return (
    <>
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
            {type}
          </button>
        ))}
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScripts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No scripts found in this category. Add some in Sanity Studio at http://localhost:3333
            </p>
          </div>
        ) : (
          filteredScripts.map((script) => (
            <div
              key={script._id}
              className="group relative rounded-2xl border border-border/50 bg-card backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              {/* Header with icon */}
              <div className="relative p-6 space-y-4 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                    {script.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {script.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Client</p>
                    <p className="font-semibold">{script.client}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Year</p>
                    <p className="font-semibold">{script.year}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold">{script.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Word Count</p>
                    <p className="font-semibold">{script.wordCount}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  {script.description}
                </p>

                {/* Script Excerpt */}
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setExpandedScript(expandedScript === script._id ? null : script._id)
                    }
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedScript === script._id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {expandedScript === script._id ? 'Hide' : 'Read'} Excerpt
                  </button>

                  {expandedScript === script._id && (
                    <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                        {script.excerpt}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {script.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
