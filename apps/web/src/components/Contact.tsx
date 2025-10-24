import { client } from '@/sanity/lib/client';
import ContactClient from './ContactClient';

// Revalidate every 10 seconds (ISR) - updates content quickly
export const revalidate = 10;

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
}

export default async function Contact() {
  // Fetch contact info from Sanity
  const query = '*[_type == "siteSettings"][0]{email, phone, location}';
  const contactInfo: ContactInfo = await client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  }) || {};

  return <ContactClient contactInfo={contactInfo} />;
}
