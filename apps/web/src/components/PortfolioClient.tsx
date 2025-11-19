'use client';

import { useMemo, useState, type ReactElement } from 'react';
import Link from 'next/link';
import VideoPlayer from './VideoPlayer';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';

type ActiveMediaFilter = PortfolioMediaType | 'ALL';

interface PortfolioClientProps {
  items: PortfolioItem[];
  categories: string[];
  mediaTypes: PortfolioMediaType[];
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
  VIDEO: 'from-primary to-primary/70',
  IMAGE: 'from-pink-500 to-rose-500',
  ARTICLE: 'from-amber-500 to-orange-500',
  DOCUMENT: 'from-slate-500 to-slate-700',
  GALLERY: 'from-emerald-500 to-teal-500',
  TEXT: 'from-violet-500 to-indigo-500',
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

export default function PortfolioClient({ items, categories, mediaTypes }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeMediaType, setActiveMediaType] = useState<ActiveMediaFilter>('ALL');
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
      const mediaMatch = activeMediaType === 'ALL' || item.mediaType === activeMediaType;
      return categoryMatch && mediaMatch;
    });
  }, [orderedItems, activeCategory, activeMediaType]);

  const handleSelect = (item: PortfolioItem) => setSelected(item);
  const closeModal = () => setSelected(null);

  const renderPreview = (item: PortfolioItem) => {
    if (item.mediaType === 'VIDEO' && item.mediaUrl) {
      return (
        <div className="relative rounded-3xl overflow-hidden bg-black/60">
          <VideoPlayer url={item.mediaUrl} title={item.title} posterImage={item.thumbnailUrl ?? undefined} />
        </div>
      );
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
      <div className="space-y-10">
        <div className="flex flex-wrap justify-center gap-3">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {(['ALL', ...mediaTypes] as ActiveMediaFilter[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveMediaType(type)}
              className={`px-4 py-2 text-xs tracking-[0.3em] uppercase rounded-full transition-all ${
                activeMediaType === type
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-primary/40'
              }`}
            >
              {type === 'ALL' ? 'All Media' : mediaTypeCopy[type]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center text-white/60 py-16 border border-dashed border-white/10 rounded-3xl">
              No work in this filter yet — add an entry from the admin studio.
            </div>
          )}

          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/40 transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item.thumbnailUrl ? (
                <img src={item.thumbnailUrl} alt={item.title} className="h-64 w-full object-cover" />
              ) : (
                <div className="h-64 w-full bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center text-5xl text-white/20 font-[family-name:var(--font-playfair)]">
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-6" onClick={closeModal}>
          <div
            className="relative w-full max-w-6xl bg-[#07070d] rounded-3xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close portfolio modal"
            >
              ×
            </button>

            <div className="grid gap-8 lg:grid-cols-2 p-8">
              <div>{renderPreview(selected)}</div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-[0.4em] text-white/60">
                    {iconForType[selected.mediaType]}
                    {mediaTypeCopy[selected.mediaType]}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-white">
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

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/portfolio/${selected.id}`}
                    className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-semibold py-3"
                  >
                    Open Case Study
                  </Link>
                  {selected.externalUrl && (
                    <a
                      href={selected.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white/80 py-3 hover:border-white/60 transition"
                    >
                      Visit External Link
                    </a>
                  )}
                  {selected.documentUrl && (
                    <a
                      href={selected.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white/80 py-3 hover:border-white/60 transition"
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
