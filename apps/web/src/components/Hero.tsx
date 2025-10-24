import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import HeroClient from './HeroClient';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Revalidate every 10 seconds (ISR) - updates content quickly
export const revalidate = 10;

interface SiteSettingsRaw {
  name: string;
  tagline: string;
  bio: string;
  profileImage?: any;
  welcomeMessage: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsServed: number;
  industryAwards?: number;
}

interface SiteSettings {
  name: string;
  tagline: string;
  bio: string;
  profileImageUrl?: string;
  welcomeMessage: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsServed: number;
  industryAwards?: number;
}

export default async function Hero() {
  // Fetch site settings from Sanity
  const query = '*[_type == "siteSettings"][0]';
  const rawSettings: SiteSettingsRaw | null = await client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });

  // Default fallback data
  const defaultSettings: SiteSettings = {
    name: 'Edmond Haddad',
    tagline: 'Award-Winning Scriptwriter & Creative Producer',
    bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands. From concept to final cut, I create stories that captivate audiences and drive results.',
    welcomeMessage: 'Welcome to my portfolio',
    yearsExperience: 20,
    projectsCompleted: 200,
    clientsServed: 100,
  };

  // Prepare settings with pre-generated image URL
  const settings: SiteSettings = rawSettings ? {
    ...rawSettings,
    profileImageUrl: rawSettings.profileImage
      ? urlFor(rawSettings.profileImage).width(800).height(800).url()
      : undefined,
  } : defaultSettings;

  return <HeroClient settings={settings} />;
}
