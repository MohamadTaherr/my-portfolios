/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.onrender.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'http', hostname: 'localhost', port: '10000' },
      { protocol: 'https', hostname: '**.vercel.app' },
      // Coolify/Hetzner - allow any subdomain pattern
      { protocol: 'https', hostname: '**.coolify.io' },
      { protocol: 'https', hostname: '**.hetzner.cloud' },
      { protocol: 'https', hostname: '**.hetzner.com' },
      // Backblaze B2 storage
      { protocol: 'https', hostname: 'f*.backblazeb2.com' },
      { protocol: 'https', hostname: '**.backblazeb2.com' },
      // Allow any HTTPS hostname for flexibility with custom domains
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
