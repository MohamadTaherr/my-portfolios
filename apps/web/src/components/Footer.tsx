import { client } from '@/sanity/lib/client';
import FooterClient from './FooterClient';

// Revalidate every 10 seconds (ISR) - updates content quickly
export const revalidate = 10;

interface SiteSettings {
  name?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    vimeo?: string;
  };
}

export default async function Footer() {
  // Fetch site settings from Sanity
  const query = '*[_type == "siteSettings"][0]{name, socialLinks}';
  const settings: SiteSettings = await client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  }) || {};

  return <FooterClient settings={settings} />;
}
