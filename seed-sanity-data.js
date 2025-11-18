#!/usr/bin/env node

/**
 * Sanity Content Seeder
 *
 * This script populates your Sanity studio with initial content
 * Run with: node seed-sanity-data.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, 'apps', 'web', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to .env.local
  apiVersion: '2025-10-21',
});

console.log('🌱 Starting Sanity content seeding...\n');

// Helper to create or update document
async function createOrUpdate(doc) {
  const { _id, _type, ...data } = doc;

  try {
    // Check if document exists
    const existing = await client.getDocument(_id).catch(() => null);

    if (existing) {
      console.log(`📝 Updating ${_type}: ${_id}`);
      await client.patch(_id).set(data).commit();
    } else {
      console.log(`✨ Creating ${_type}: ${_id}`);
      await client.create({ _id, _type, ...data });
    }
    return true;
  } catch (error) {
    console.error(`❌ Error with ${_type} (${_id}):`, error.message);
    return false;
  }
}

// 1. Site Settings (Singleton)
const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'Edmond Haddad',
  tagline: 'Award-Winning Scriptwriter & Creative Producer',
  bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands.',
  welcomeMessage: 'Welcome to my portfolio',
  yearsExperience: 20,
  projectsCompleted: 200,
  clientsServed: 100,
  industryAwards: 10,
  email: 'contact@edmondhaddad.com',
  phone: '+961 70 123 456',
  location: 'Beirut, Lebanon',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/edmondhaddad',
    vimeo: 'https://vimeo.com/edmondhaddad',
    instagram: 'https://instagram.com/edmondhaddad',
  },
};

// 2. Page Content (Singleton)
const pageContent = {
  _id: 'pageContent',
  _type: 'pageContent',
  seoTitle: 'Edmond Haddad - Award-Winning Scriptwriter & Creative Producer',
  seoDescription: 'Two decades of visual storytelling experience. From intimate documentaries to high-profile commercials for global brands like Porsche.',
  seoKeywords: ['scriptwriter', 'creative producer', 'video production', 'documentary filmmaker', 'commercial director'],

  heroHeadline: 'Crafting Stories That Move',
  heroSubheadline: 'Award-winning scriptwriter and creative producer with 20+ years of experience',

  aboutTitle: 'Behind the Camera',
  aboutSubtitle: 'The Story',

  skillsTitle: 'By the Numbers',
  skillsSubtitle: 'Expertise',

  projectsTitle: 'Portfolio',
  projectsSubtitle: 'Selected Works',
  projectsDescription: 'Two decades of visual storytelling — from intimate documentaries to global brand narratives',

  contactTitle: 'Let\'s Create Together',
  contactSubtitle: 'Get in Touch',
  contactDescription: 'Have a project in mind? Let\'s discuss how we can bring your vision to life.',

  footerCopyright: 'All rights reserved',
  footerTagline: 'Crafted with cinematic precision',
};

// 3. About Section (Singleton)
const aboutSection = {
  _id: 'aboutSection',
  _type: 'aboutSection',
  bodyParagraphs: [
    {
      _type: 'block',
      _key: 'para1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span1',
          text: 'With over two decades in the industry, I\'ve had the privilege of crafting narratives for some of the world\'s most prestigious brands and productions. From Porsche\'s latest campaigns to intimate documentary storytelling, each project is approached with the same dedication to visual excellence and emotional authenticity.',
          marks: []
        }
      ]
    },
    {
      _type: 'block',
      _key: 'para2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span2',
          text: 'The craft lies not in what you show, but in what you make the audience feel. Every frame, every cut, every word is carefully considered to create experiences that resonate long after the final scene.',
          marks: []
        }
      ]
    }
  ],
  featuredBrands: [
    { name: 'Porsche', description: 'Premium automotive campaigns', order: 0 },
    { name: 'Major Film Productions', description: 'International cinema', order: 1 },
    { name: 'Global Advertising Agencies', description: 'Commercial excellence', order: 2 },
  ],
  signingName: 'Edmond Haddad',
};

// 4. Skills Section (Singleton)
const skillsSection = {
  _id: 'skillsSection',
  _type: 'skillsSection',
  stats: [
    { number: '20+', label: 'Years in Industry', icon: '🎬', order: 0 },
    { number: '200+', label: 'Scripts Produced', icon: '✍️', order: 1 },
    { number: '10+', label: 'Awards', icon: '🏆', order: 2 },
    { number: '100+', label: 'Global Brands', icon: '🌍', order: 3 },
    { number: '50+', label: 'Documentaries', icon: '📽️', order: 4 },
    { number: '1000+', label: 'Hours of Content', icon: '⏱️', order: 5 },
  ],
  competencies: [
    'Scriptwriting',
    'Video Production',
    'Documentary Filmmaking',
    'Commercial Direction',
    'Creative Development',
    'Story Consulting',
    'Post-Production',
    'Creative Direction',
  ],
};

// 5. Project Categories (Singleton)
const projectCategory = {
  _id: 'projectCategory',
  _type: 'projectCategory',
  categories: [
    { title: 'All', value: 'all', order: 0 },
    { title: 'Commercial', value: 'commercial', order: 1 },
    { title: 'Documentary', value: 'documentary', order: 2 },
    { title: 'Short Film', value: 'short-film', order: 3 },
    { title: 'Music Video', value: 'music-video', order: 4 },
  ],
};

// Main seeding function
async function seedData() {
  console.log('📋 Seeding singleton documents...\n');

  const docs = [
    siteSettings,
    pageContent,
    aboutSection,
    skillsSection,
    projectCategory,
  ];

  let successCount = 0;
  for (const doc of docs) {
    const success = await createOrUpdate(doc);
    if (success) successCount++;
    console.log(''); // Empty line for readability
  }

  console.log(`\n✅ Seeding complete! ${successCount}/${docs.length} documents processed`);
  console.log('\n📝 Next steps:');
  console.log('1. Go to your Sanity Studio: https://edmond-portfolio.sanity.studio/');
  console.log('2. Add your video projects, portfolio work, and blog posts');
  console.log('3. Upload images (profile photo, project thumbnails)');
  console.log('4. Customize the content to match your portfolio');
  console.log('\n💡 Tip: Use "Publish & Update Website" button after making changes!\n');
}

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID not found in environment variables');
  console.error('Please set it in apps/web/.env.local');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Error: SANITY_API_TOKEN not found in environment variables');
  console.error('\nTo get a token:');
  console.error('1. Go to https://sanity.io/manage');
  console.error('2. Select your project');
  console.error('3. Go to API → Tokens');
  console.error('4. Create a token with "Editor" permissions');
  console.error('5. Add it to apps/web/.env.local as SANITY_API_TOKEN=...\n');
  process.exit(1);
}

// Run the seeder
seedData().catch(console.error);
