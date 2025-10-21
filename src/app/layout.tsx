import { Geist, Geist_Mono, Playfair_Display, Courier_Prime } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import StructuredData from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Edmond Haddad | Award-Winning Scriptwriter & Creative Producer",
  description: "Two decades of crafting compelling stories for Porsche, major films, and global brands. Professional scriptwriting and creative production services.",
  keywords: [
    "scriptwriter",
    "creative producer",
    "video production",
    "commercial director",
    "documentary filmmaker",
    "content creator",
    "Edmond Haddad",
    "professional scriptwriting",
    "video editing",
    "brand storytelling",
  ],
  authors: [{ name: "Edmond Haddad" }],
  creator: "Edmond Haddad",
  publisher: "Edmond Haddad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Edmond Haddad | Award-Winning Scriptwriter & Creative Producer",
    description: "Two decades of crafting compelling stories for Porsche, major films, and global brands. Professional scriptwriting and creative production services.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    siteName: "Edmond Haddad Portfolio",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Edmond Haddad - Scriptwriter & Creative Producer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Edmond Haddad | Award-Winning Scriptwriter & Creative Producer",
    description: "Two decades of crafting compelling stories for Porsche, major films, and global brands.",
    creator: '@yourtwitterhandle', // Replace with actual Twitter handle
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${courierPrime.variable} antialiased`}
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
