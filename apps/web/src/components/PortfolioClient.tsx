'use client';

import { useMemo, useState, type ReactElement } from 'react';
import Link from 'next/link';
import VideoPlayer from './VideoPlayer';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';

interface PortfolioClientProps {
  items: PortfolioItem[];
  categories: string[];
}

const mediaTypeCopy: Record<PortfolioMediaType, string> = {
  VIDEO: 'Film',
  IMAGE: 'Still',
  ARTICLE: 'Article',
  DOCUMENT: 'Document',
  GALLERY: 'Gallery',
  TEXT: 'Text',
};

const mediaBadgeColor: Record<PortfolioMediaType, string> = {
  VIDEO: 'from-purple-500 via-pink-500 to-red-500',
  IMAGE: 'from-cyan-500 via-blue-500 to-indigo-500',
  ARTICLE: 'from-yellow-400 via-orange-500 to-red-500',
  DOCUMENT: 'from-green-400 via-emerald-500 to-teal-600',
  GALLERY: 'from-pink-400 via-purple-500 to-indigo-600',
  TEXT: 'from-blue-400 via-cyan-500 to-teal-500',
};

const iconForType: Record<PortfolioMediaType, ReactElement> = {
  VIDEO: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  IMAGE: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 5h16v14H4z" />
      <path d="M4 15l4-4 4 4 4-4 4 4" />
    </svg>
  ),
  ARTICLE: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h12v2H6zM6 9h12v2H6zM6 14h8v2H6zM6 19h6v2H6z" />
    </svg>
  ),
  DOCUMENT: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6" className="opacity-50" />
    </svg>
  ),
  GALLERY: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5h13v13H3z" />
      <path d="M8 10h13v13H8z" className="opacity-60" />
    </svg>
  ),
  TEXT: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 5h16v2H4zM4 11h16v2H4zM4 17h10v2H4z" />
    </svg>
  ),
};

const formatBody = (item: PortfolioItem): string => {
  if (item.content && typeof item.content === 'object') {
    const candidate = (item.content as Record<string, unknown>).body;
    if (typeof candidate === 'string') {
      return candidate;
    }
  }
  if (item.summary) return item.summary;
  return 'Additional details coming soon.';
};

export default function PortfolioClient({ items, categories }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const orderedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.order ?? 0) - (b.order ?? 0);
    });
  }, [items]);

  const filteredItems = useMemo(() => {
    return orderedItems.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      return categoryMatch;
    });
  }, [orderedItems, activeCategory]);

  const handleSelect = (item: PortfolioItem) => setSelected(item);
  const closeModal = () => setSelected(null);

  const renderPreview = (item: PortfolioItem) => {
    if (item.mediaType === 'VIDEO') {
      // Construct video URL from provider and ID, or use mediaUrl directly
      let videoUrl = item.mediaUrl || '';

      if (item.videoProvider && item.videoId) {
        const provider = item.videoProvider.toLowerCase();
        if (provider.includes('youtube')) {
          videoUrl = `https://www.youtube.com/watch?v=${item.videoId}`;
        } else if (provider.includes('vimeo')) {
          videoUrl = `https://vimeo.com/${item.videoId}`;
        }
      }

      if (videoUrl) {
        return (
          <div className="relative rounded-3xl overflow-hidden bg-black/60 aspect-video">
            <VideoPlayer url={videoUrl} title={item.title} posterImage={item.thumbnailUrl ?? undefined} />
          </div>
        );
      }
    }

    if (item.mediaType === 'GALLERY' && item.gallery && item.gallery.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-4">
          {item.gallery.slice(0, 4).map((src, index) => (
            <img
              key={src + index}
              src={src}
              alt={`${item.title} frame ${index + 1}`}
              className="h-40 w-full object-cover rounded-xl border border-white/10"
            />
          ))}
        </div>
      );
    }

    if (item.mediaType === 'DOCUMENT') {
      return (
        <div className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur-sm">
          <p className="text-sm text-white/60 mb-2 uppercase tracking-[0.3em]">Document</p>
          <p className="text-2xl font-semibold text-white mb-4">{item.title}</p>
          {item.documentUrl && (
            <a
              href={item.documentUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold"
            >
              Download Deck
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 20h14v-2H5zm7-18l-5 5h3v6h4V7h3z" />
              </svg>
            </a>
          )}
        </div>
      );
    }

    if (item.mediaType === 'ARTICLE' || item.mediaType === 'TEXT') {
      return (
        <div className="rounded-3xl border border-white/10 p-6 bg-black/40 backdrop-blur-sm text-left space-y-4 max-h-[400px] overflow-y-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Excerpt</p>
          <p className="text-lg leading-relaxed text-white/80 whitespace-pre-wrap">{formatBody(item)}</p>
        </div>
      );
    }

    if ((item.mediaType === 'IMAGE' || item.mediaType === 'GALLERY') && item.thumbnailUrl) {
      return (
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full rounded-3xl border border-white/10 object-cover"
        />
      );
    }

    if (item.mediaUrl && item.mediaUrl.endsWith('.mp4')) {
      return (
        <video controls className="rounded-3xl border border-white/10">
          <source src={item.mediaUrl} />
        </video>
      );
    }

    return (
      <div className="rounded-3xl border border-white/10 p-12 bg-black/30 text-center">
        <p className="text-white/40">Media preview coming soon.</p>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-8 sm:space-y-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-[0_10px_40px_rgba(236,72,153,0.5)]'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:border-purple-400/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center text-white/60 py-16 border border-dashed border-white/10 rounded-3xl">
              No work in this filter yet — add an entry from the admin studio.
            </div>
          )}

          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(108,99,255,0.3)] cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              {item.thumbnailUrl ? (
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="h-64 w-full bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-blue-900/40 flex items-center justify-center text-5xl text-white/30 font-[family-name:var(--font-playfair)]">
                  {item.title.charAt(0)}
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white border border-white/20 px-3 py-1 rounded-full bg-gradient-to-r ${mediaBadgeColor[item.mediaType]}`}
                  >
                    {iconForType[item.mediaType]}
                    {mediaTypeCopy[item.mediaType]}
                  </span>
                  {item.category && <span className="text-white/60 text-xs">{item.category}</span>}
                </div>

                <h3 className="text-2xl font-[family-name:var(--font-playfair)] text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {item.summary && <p className="text-sm text-white/70 line-clamp-3">{item.summary}</p>}

                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/40">
                  <span>Explore</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 animate-fade-in overflow-y-auto" onClick={closeModal}>
          <div
            className="relative w-full max-w-6xl my-8 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0c29] rounded-2xl md:rounded-3xl border border-purple-500/30 shadow-[0_40px_120px_rgba(108,99,255,0.4)] overflow-hidden animate-scale-in"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 backdrop-blur-xl border border-white/10 flex items-center justify-center text-xl md:text-2xl hover:scale-110 z-10"
              aria-label="Close portfolio modal"
            >
              ×
            </button>

            <div className="grid gap-6 md:gap-8 lg:grid-cols-2 p-4 sm:p-6 md:p-8">
              <div>{renderPreview(selected)}</div>
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2 md:space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-[0.4em] text-white/60">
                    {iconForType[selected.mediaType]}
                    {mediaTypeCopy[selected.mediaType]}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-white">
                    {selected.title}
                  </h3>
                  {selected.client && (
                    <p className="text-white/60 text-sm uppercase tracking-[0.3em]">
                      For {selected.client}
                    </p>
                  )}
                  {selected.summary && <p className="text-white/70 leading-relaxed">{selected.summary}</p>}
                </div>

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">In Depth</p>
                  <p className="text-white/80 whitespace-pre-line">{formatBody(selected)}</p>
                </div>

                {selected.tags && selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                  <Link
                    href={`/portfolio/${selected.id}`}
                    className="flex-1 sm:min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-semibold py-3 text-sm sm:text-base"
                  >
                    Open Case Study
                  </Link>
                  {selected.externalUrl && (
                    <a
                      href={selected.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white/80 py-3 hover:border-white/60 transition text-sm sm:text-base"
                    >
                      Visit External Link
                    </a>
                  )}
                  {selected.documentUrl && (
                    <a
                      href={selected.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white/80 py-3 hover:border-white/60 transition text-sm sm:text-base"
                    >
                      Download Deck
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
