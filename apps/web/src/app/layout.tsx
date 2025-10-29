import { Inter, EB_Garamond, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { client } from '@/sanity/lib/client';
import { Metadata } from 'next';

// Clean sans-serif for body text
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Elegant serif for headings (A24-style)
const ebGaramond = EB_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Alternative cinematic serif
const cormorant = Cormorant_Garamond({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = inter; // Use same for mono

// Fetch SEO data from Sanity
async function getSEOData() {
  try {
    const query = \`*[_type == "pageContent"][0]{
      seoTitle,
      seoDescription,
      seoKeywords
    }\`;

    const data = await client.fetch(query, {}, { next: { revalidate: 3600 } });
    return data;
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return null;
  }
}

async function getSiteSettings() {
  try {
    const query = \`*[_type == "siteSettings"][0]{ name }\`;
    const data = await client.fetch(query, {}, { next: { revalidate: 3600 } });
    return data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const [seoData, siteSettings] = await Promise.all([
    getSEOData(),
    getSiteSettings()
  ]);

  const siteName = siteSettings?.name || "Edmond Haddad";
  const title = seoData?.seoTitle || \`\${siteName} | Award-Winning Scriptwriter & Creative Producer\`;
  const description = seoData?.seoDescription || "Two decades of crafting compelling stories for Porsche, major films, and global brands. Professional scriptwriting and creative production services.";
  const keywords = seoData?.seoKeywords || [
    "scriptwriter",
    "creative producer",
    "video production",
    "commercial director",
    "documentary filmmaker",
    "content creator",
    siteName,
    "professional scriptwriting",
    "video editing",
    "brand storytelling",
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: \`\${siteName} Portfolio\`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: \`\${siteName} - Scriptwriter & Creative Producer\`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@yourtwitterhandle',
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add these once you verify with search engines
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={\`\${inter.variable} \${ebGaramond.variable} \${cormorant.variable} antialiased\`}
      >
        <GoogleAnalytics />
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
