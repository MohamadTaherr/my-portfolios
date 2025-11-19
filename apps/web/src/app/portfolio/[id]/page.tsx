import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import VideoPlayer from '@/components/VideoPlayer';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';

export const revalidate = 30;

async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  try {
    return await fetchAPI(`/portfolio/${id}`);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return null;
  }
}

async function getRelatedPortfolio(category: string | null | undefined, currentId: string): Promise<PortfolioItem[]> {
  if (!category) return [];
  try {
    const allItems: PortfolioItem[] = await fetchAPI('/portfolio');
    return allItems.filter((item) => item.category === category && item.id !== currentId).slice(0, 3);
  } catch (error) {
    console.error('Error fetching related portfolio items:', error);
    return [];
  }
}

const mediaTypeLabel: Record<PortfolioMediaType, string> = {
  VIDEO: 'Film',
  IMAGE: 'Still Image',
  ARTICLE: 'Article',
  DOCUMENT: 'Document',
  GALLERY: 'Gallery',
  TEXT: 'Text Narrative',
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await getPortfolioItem(id);

  if (!item) {
    return {
      title: 'Portfolio Item Not Found | Edmond Haddad',
      description: 'The requested work could not be located.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const thumbnail = item.thumbnailUrl || item.mediaUrl || `${baseUrl}/og-image.jpg`;

  return {
    title: `${item.title} | ${mediaTypeLabel[item.mediaType]} | Edmond Haddad`,
    description: item.summary || 'Creative portfolio entry by Edmond Haddad.',
    openGraph: {
      title: `${item.title} | ${mediaTypeLabel[item.mediaType]}`,
      description: item.summary || '',
      url: `${baseUrl}/portfolio/${id}`,
      images: [{ url: thumbnail }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.title} | ${mediaTypeLabel[item.mediaType]}`,
      description: item.summary || '',
      images: [thumbnail],
    },
    alternates: {
      canonical: `${baseUrl}/portfolio/${id}`,
    },
  };
}

const renderPrimaryMedia = (item: PortfolioItem) => {
  if (item.mediaType === 'VIDEO' && item.mediaUrl) {
    return (
      <div className="rounded-3xl overflow-hidden border border-white/10">
        <VideoPlayer url={item.mediaUrl} title={item.title} posterImage={item.thumbnailUrl ?? undefined} />
      </div>
    );
  }

  if (item.mediaType === 'GALLERY' && item.gallery && item.gallery.length > 0) {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {item.gallery.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`${item.title} still ${index + 1}`}
            className="rounded-2xl object-cover w-full h-64 border border-white/10"
          />
        ))}
      </div>
    );
  }

  if (item.mediaType === 'DOCUMENT' && item.documentUrl) {
    return (
      <div className="rounded-3xl border border-white/10 p-8 bg-white/5 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">Download</p>
        <h3 className="text-2xl text-white mb-2">{item.title}</h3>
        <a
          href={item.documentUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold"
        >
          Access Document
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 20h14v-2H5zm7-18l-5 5h3v6h4V7h3z" />
          </svg>
        </a>
      </div>
    );
  }

  if ((item.mediaType === 'IMAGE' || item.mediaType === 'GALLERY') && item.thumbnailUrl) {
    return (
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="rounded-3xl w-full object-cover border border-white/10"
      />
    );
  }

  if ((item.mediaType === 'ARTICLE' || item.mediaType === 'TEXT') && item.summary) {
    return (
      <div className="rounded-3xl border border-white/10 p-8 bg-white/5 backdrop-blur text-white/80 text-lg leading-relaxed whitespace-pre-line">
        {item.summary}
      </div>
    );
  }

  if (item.mediaUrl && item.mediaUrl.endsWith('.mp4')) {
    return (
      <video controls className="rounded-3xl border border-white/10 w-full">
        <source src={item.mediaUrl} />
      </video>
    );
  }

  return (
    <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center text-white/50">
      Asset coming soon.
    </div>
  );
};

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getPortfolioItem(id);

  if (!item) {
    notFound();
  }

  const related = await getRelatedPortfolio(item.category, item.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#03030a] via-[#050512] to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to portfolio
        </Link>

        <header className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60">
              {mediaTypeLabel[item.mediaType]}
              {item.category && (
                <>
                  <span className="h-px w-6 bg-white/20" />
                  {item.category}
                </>
              )}
            </span>
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] text-white">{item.title}</h1>
            {item.summary && <p className="text-lg text-white/70">{item.summary}</p>}
            <div className="flex flex-wrap gap-4 text-sm text-white/60 uppercase tracking-[0.3em]">
              {item.client && <span>Client: {item.client}</span>}
              {item.tags && item.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
            <div className="flex flex-wrap gap-4">
              {item.externalUrl && (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 text-white hover:border-white/70 transition"
                >
                  Visit live piece
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              )}
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold">
                Start a project
              </a>
            </div>
          </div>

          {renderPrimaryMedia(item)}
        </header>

        {item.gallery && item.gallery.length > 0 && (
          <section className="mt-16 space-y-6">
            <h2 className="text-2xl text-white font-semibold">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((src, index) => (
                <img
                  key={`${item.id}-gallery-${index}`}
                  src={src}
                  alt={`${item.title} gallery frame ${index + 1}`}
                  className="rounded-2xl border border-white/10 object-cover h-64 w-full"
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 grid gap-10 lg:grid-cols-2">
          {item.content && typeof item.content === 'object' && (
            <article className="rounded-3xl border border-white/10 p-8 bg-white/5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-4">Process Notes</p>
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                {typeof (item.content as Record<string, unknown>).body === 'string'
                  ? ((item.content as Record<string, unknown>).body as string)
                  : JSON.stringify(item.content, null, 2)}
              </p>
            </article>
          )}

          {item.documentUrl && (
            <div className="rounded-3xl border border-white/10 p-8 bg-gradient-to-br from-white/10 to-white/0">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-4">Download</p>
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white text-black font-semibold"
              >
                Grab the deck
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 20h14v-2H5zm7-18l-5 5h3v6h4V7h3z" />
                </svg>
              </a>
            </div>
          )}
        </section>

        {related.length > 0 && (
          <section className="mt-20 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl text-white font-semibold">More {item.category} pieces</h3>
              <Link href="/#portfolio" className="text-white/70 hover:text-white text-sm">
                View all
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/portfolio/${relatedItem.id}`}
                  className="rounded-2xl border border-white/10 p-6 bg-white/5 hover:border-white/40 transition"
                >
                  <h4 className="text-xl text-white font-[family-name:var(--font-playfair)] mb-2">
                    {relatedItem.title}
                  </h4>
                  <p className="text-white/60 text-sm line-clamp-3">{relatedItem.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
