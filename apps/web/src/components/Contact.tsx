import { fetchAPI } from '@/lib/api';
import ContactClient from './ContactClient';

export const revalidate = 60;

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    linkedin?: string;
    vimeo?: string;
    instagram?: string;
  };
}

export default async function Contact() {
  const settings = await fetchAPI('/site-settings').catch(() => null);

  const fallbackContact: ContactInfo = {
    email: 'contact@example.com',
    phone: '+1 (234) 567-8900',
    location: 'Los Angeles, CA',
  };

  const dynamicContact: ContactInfo | null = settings
    ? {
        email: settings.email,
        phone: settings.phone,
        location: settings.location,
        socialLinks: settings.socialLinks,
      }
    : null;

  const contactInfo: ContactInfo =
    dynamicContact && (dynamicContact.email || dynamicContact.phone || dynamicContact.location)
      ? dynamicContact
      : fallbackContact;

  return <ContactClient contactInfo={contactInfo} />;
}
