import { MetadataRoute } from 'next';
import { fetchAPI } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  // Fetch all portfolio entries from database for dynamic sitemap entries
  let portfolioItems: Array<{ id: string; updatedAt: Date }> = [];
  try {
    const allItems = await fetchAPI('/portfolio');
    portfolioItems = allItems.map((p: any) => ({
      id: p.id,
      updatedAt: p.updatedAt || p.createdAt || new Date(),
    }));
  } catch (error) {
    console.error('Error fetching portfolio items for sitemap:', error);
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // Dynamic portfolio pages
  const portfolioPages: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
    url: `${baseUrl}/portfolio/${item.id}`,
    lastModified: item.updatedAt instanceof Date ? item.updatedAt : new Date(item.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...portfolioPages];
}
