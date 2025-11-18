import { fetchAPI } from '@/lib/api';
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
  const [footer, siteSettings] = await Promise.all([
    fetchAPI('/footer').catch(() => null),
    fetchAPI('/site-settings').catch(() => null)
  ]);

  const settings: SiteSettings = {
    name: footer?.name || siteSettings?.name,
    socialLinks: footer?.socialLinks || siteSettings?.socialLinks,
  };

  return <FooterClient settings={settings} />;
}
