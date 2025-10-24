import { client } from '@/sanity/lib/client';
import ScriptwritingClient from './ScriptwritingClient';

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

// Revalidate every 10 seconds (ISR) - updates content quickly
export const revalidate = 10;

export default async function Scriptwriting() {
  // Fetch data on the server
  const query = '*[_type == "script"] | order(order asc, _createdAt desc)';
  const scripts: Script[] = await client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });

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

          {/* Client-side interactive component */}
          <ScriptwritingClient scripts={scripts} />
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
