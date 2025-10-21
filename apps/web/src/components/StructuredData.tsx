export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Edmond Haddad',
    jobTitle: 'Scriptwriter & Creative Producer',
    description: 'Award-winning scriptwriter and creative producer with two decades of experience crafting compelling stories for Porsche, major films, and global brands.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/og-image.jpg`,
    sameAs: [
      // Add your actual social media profiles here
      'https://twitter.com/yourusername',
      'https://linkedin.com/in/yourusername',
      'https://github.com/yourusername',
    ],
    knowsAbout: [
      'Scriptwriting',
      'Video Production',
      'Creative Directing',
      'Documentary Filmmaking',
      'Commercial Production',
      'Content Creation',
      'Brand Storytelling',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Scriptwriter',
      occupationLocation: {
        '@type': 'City',
        name: 'Your City', // Replace with actual city
      },
      estimatedSalary: {
        '@type': 'MonetaryAmountDistribution',
        name: 'Professional',
        currency: 'USD',
      },
    },
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Edmond Haddad Creative Services',
    description: 'Professional scriptwriting, video production, and creative services for brands and filmmakers.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    founder: {
      '@type': 'Person',
      name: 'Edmond Haddad',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Your City', // Replace with actual city
      addressCountry: 'Your Country', // Replace with actual country
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Scriptwriting',
      'Video Production',
      'Creative Directing',
      'Content Strategy',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}
