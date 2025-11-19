import { fetchAPI } from '@/lib/api';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';
import PortfolioClient from './PortfolioClient';

export const revalidate = 60;

const FALLBACK_CATEGORIES = [
  'Narrative',
  'Commercial',
  'Documentary',
  'Editorial',
  'Photography',
];

export default async function Portfolio() {
  const items: PortfolioItem[] = await fetchAPI('/portfolio').catch(() => []);

  const categorySet = new Set<string>();
  const mediaTypeSet = new Set<PortfolioMediaType>();

  items.forEach((item) => {
    if (item.category) {
      categorySet.add(item.category);
    }
    if (item.mediaType) {
      mediaTypeSet.add(item.mediaType);
    }
  });

  const categories =
    categorySet.size > 0 ? Array.from(categorySet).sort() : FALLBACK_CATEGORIES;
  const mediaTypes: PortfolioMediaType[] =
    mediaTypeSet.size > 0
      ? Array.from(mediaTypeSet)
      : (['VIDEO', 'ARTICLE', 'GALLERY'] as PortfolioMediaType[]);

  return (
    <section id="portfolio" className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-10 w-[32rem] h-[32rem] bg-primary/10 blur-3xl rounded-full animate-float" />
        <div
          className="absolute bottom-0 -left-20 w-[32rem] h-[32rem] bg-secondary/10 blur-3xl rounded-full animate-float"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.4em] uppercase font-semibold text-primary/80">
            <span className="h-px w-12 bg-primary/40" /> Featured Work <span className="h-px w-12 bg-primary/40" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-balance">
            A living gallery of films, essays, decks, and visual diaries
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted">
            Every medium is a different instrument. Explore treatments, brand films, photo essays, and documents crafted for premium studios,
            streamers, and fearless founders.
          </p>
        </div>

        <PortfolioClient items={items} categories={categories} mediaTypes={mediaTypes} />
      </div>
    </section>
  );
}
