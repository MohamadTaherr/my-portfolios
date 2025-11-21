type SocialLinks = Record<string, string | null | undefined>;

type SiteSettings = {
  name?: string;
  tagline?: string;
  bio?: string;
  location?: string;
  socialLinks?: SocialLinks;
};

type PageContent = {
  seoTitle?: string;
  seoDescription?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
};

interface StructuredDataProps {
  siteSettings?: SiteSettings | null;
  pageContent?: PageContent | null;
}

const defaultName = 'Edmond Haddad';
const fallbackDescription = 'Award-winning scriptwriter and creative producer with two decades of experience crafting compelling stories for Porsche, major films, and global brands.';

export default function StructuredData({ siteSettings, pageContent }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const name = siteSettings?.name || defaultName;
  const tagline = pageContent?.heroHeadline || siteSettings?.tagline || 'I tell stories that move people';
  const description = pageContent?.seoDescription || siteSettings?.bio || fallbackDescription;
  const socialLinks = Object.values(siteSettings?.socialLinks || {}).filter(Boolean) as string[];
  const location = siteSettings?.location || 'Global';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: 'Scriptwriter & Creative Producer',
    description,
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    sameAs: socialLinks.length > 0 ? socialLinks : undefined,
    knowsAbout: [
      'Scriptwriting',
      'Video Production',
      'Creative Direction',
      'Documentary Filmmaking',
      'Commercial Production',
      'Content Strategy',
      'Brand Storytelling',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Scriptwriter',
      occupationLocation: {
        '@type': 'City',
        name: location,
      },
    },
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${name} Creative Services`,
    description,
    url: siteUrl,
    slogan: tagline,
    founder: {
      '@type': 'Person',
      name,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressCountry: 'Worldwide',
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Scriptwriting',
      'Video Production',
      'Creative Direction',
      'Content Strategy',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
    </>
  );
}
