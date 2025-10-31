import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import HeroClient from './HeroClient';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const revalidate = 60;

interface SiteSettingsRaw {
  name: string;
  tagline: string;
  bio: string;
  profileImage?: any;
  showreelUrl?: string;
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
  showreelUrl?: string;
  welcomeMessage: string;
  yearsExperience: number;
  projectsCompleted: number;
  clientsServed: number;
  industryAwards?: number;
}

interface PageContent {
  heroHeadline?: string;
  heroSubheadline?: string;
}

async function getSiteSettings(): Promise<SiteSettingsRaw | null> {
  try {
    const query = `*[_type == "siteSettings"][0]`;
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

async function getPageContent(): Promise<PageContent | null> {
  try {
    const query = `*[_type == "pageContent"][0]{ heroHeadline, heroSubheadline }`;
    return await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

export default async function Hero() {
  const [rawSettings, pageContent] = await Promise.all([
    getSiteSettings(),
    getPageContent()
  ]);

  const defaultSettings: SiteSettings = {
    name: 'Edmond Haddad',
    tagline: 'Award-Winning Scriptwriter & Creative Producer',
    bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands.',
    welcomeMessage: 'Welcome to my portfolio',
    yearsExperience: 20,
    projectsCompleted: 200,
    clientsServed: 100,
  };

  const settings: SiteSettings = rawSettings ? {
    ...rawSettings,
    profileImageUrl: rawSettings.profileImage
      ? urlFor(rawSettings.profileImage).width(800).height(800).url()
      : undefined,
    showreelUrl: rawSettings.showreelUrl,
  } : defaultSettings;

  return <HeroClient settings={settings} pageContent={pageContent || undefined} />;
}
