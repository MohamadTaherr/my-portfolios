#!/usr/bin/env node

/**
 * Cache Clearing Utility
 *
 * This script helps clear Next.js ISR cache by calling the revalidate API
 * for all important pages on your website.
 */

const REVALIDATE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-portfolios-studio.vercel.app';
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

if (!REVALIDATE_SECRET) {
  console.error('❌ Error: SANITY_REVALIDATE_SECRET not found in environment variables');
  console.error('Please set it in your .env.local file');
  process.exit(1);
}

async function clearCache() {
  console.log('🧹 Starting cache clear...\n');

  const contentTypes = [
    { _type: 'siteSettings', description: 'Site Settings' },
    { _type: 'pageContent', description: 'Page Content' },
    { _type: 'aboutSection', description: 'About Section' },
    { _type: 'skillsSection', description: 'Skills Section' },
    { _type: 'videoProject', description: 'Video Projects' },
    { _type: 'portfolioWork', description: 'Portfolio Work' },
    { _type: 'post', description: 'Blog Posts' },
  ];

  for (const content of contentTypes) {
    try {
      console.log(`🔄 Revalidating ${content.description}...`);

      const response = await fetch(`${REVALIDATE_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REVALIDATE_SECRET}`,
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${content.description}: Success`);
        if (data.paths) {
          console.log(`   Cleared: ${data.paths.join(', ')}`);
        }
      } else {
        const error = await response.text();
        console.error(`❌ ${content.description}: Failed - ${response.status}`);
        console.error(`   ${error}`);
      }
    } catch (error) {
      console.error(`❌ ${content.description}: Error - ${error.message}`);
    }

    console.log(''); // Empty line for readability
  }

  console.log('✨ Cache clear complete!');
  console.log('📝 Note: It may take a few seconds for changes to appear');
  console.log('💡 Tip: Try opening your site in incognito mode to bypass browser cache');
}

clearCache().catch(console.error);
