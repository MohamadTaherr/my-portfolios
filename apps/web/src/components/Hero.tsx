import { fetchAPI } from '@/lib/api';
import HeroClient from './HeroClient';

export const revalidate = 60;

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

export default async function Hero() {
  const [rawSettings, pageContent] = await Promise.all([
    fetchAPI('/site-settings').catch(() => null),
    fetchAPI('/page-content').catch(() => null)
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
    name: rawSettings.name || defaultSettings.name,
    tagline: rawSettings.tagline || defaultSettings.tagline,
    bio: rawSettings.bio || defaultSettings.bio,
    profileImageUrl: rawSettings.profileImageUrl || undefined,
    showreelUrl: rawSettings.showreelUrl || undefined,
    welcomeMessage: rawSettings.welcomeMessage || defaultSettings.welcomeMessage,
    yearsExperience: rawSettings.yearsExperience || defaultSettings.yearsExperience,
    projectsCompleted: rawSettings.projectsCompleted || defaultSettings.projectsCompleted,
    clientsServed: rawSettings.clientsServed || defaultSettings.clientsServed,
    industryAwards: rawSettings.industryAwards,
  } : defaultSettings;

  return <HeroClient settings={settings} pageContent={pageContent || undefined} />;
}
