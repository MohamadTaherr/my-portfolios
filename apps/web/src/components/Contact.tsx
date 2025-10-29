import { client } from '@/sanity/lib/client';
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
  const query = \`*[_type == "siteSettings"][0]{
    email,
    phone,
    location,
    socialLinks
  }\`;

  const contactInfo: ContactInfo | null = await client.fetch(query, {}, {
    next: { revalidate: 60 }
  });

  const defaultContactInfo: ContactInfo = {
    email: 'contact@example.com',
    phone: '+1 (234) 567-8900',
    location: 'Los Angeles, CA',
  };

  return <ContactClient contactInfo={contactInfo || defaultContactInfo} />;
}
