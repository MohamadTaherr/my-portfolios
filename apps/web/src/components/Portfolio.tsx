import { fetchAPI } from '@/lib/api';
import type { PortfolioItem, PortfolioMediaType } from '@/types/portfolio';
import PortfolioClient from './PortfolioClient';

export const revalidate = 60;

type Category = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  order: number;
};

export default async function Portfolio() {
  const [items, categoriesData]: [PortfolioItem[], Category[]] = await Promise.all([
    fetchAPI('/portfolio').catch(() => []),
    fetchAPI('/categories').catch(() => []),
  ]);

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

  // Use categories from API if available, otherwise extract from items
  const categories =
    categoriesData.length > 0
      ? categoriesData.map((cat) => cat.name).sort()
      : categorySet.size > 0
      ? Array.from(categorySet).sort()
      : [];

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
          <div className="inline-flex items-center justify-center gap-3 text-xs tracking-[0.4em] uppercase font-semibold text-primary/80 mb-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-primary/60 to-primary/40 animate-pulse" />
            <span className="relative">
              <span className="absolute inset-0 blur-sm bg-primary/20"></span>
              <span className="relative">Featured Work</span>
            </span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent via-primary/60 to-primary/40 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-balance leading-tight">
            <span className="inline-block bg-gradient-to-r from-foreground via-primary/90 to-foreground bg-clip-text text-transparent">
              A living gallery of films, essays, decks, and visual diaries
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Every medium is a different instrument. Explore treatments, brand films, photo essays, and documents crafted for premium studios,
            streamers, and fearless founders.
          </p>
        </div>

        <PortfolioClient items={items} categories={categories} mediaTypes={mediaTypes} />
      </div>
    </section>
  );
}
