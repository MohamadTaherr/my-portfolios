#!/usr/bin/env node

/**
 * Sanity Data Cleanup Script
 *
 * This script removes old/test data from Sanity
 * Run with: node cleanup-old-data.js
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, 'apps', 'web', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-10-21',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function listVideoProjects() {
  console.log('🔍 Fetching all video projects...\n');

  const query = '*[_type == "videoProject"] | order(_createdAt desc) {_id, title, client, category, _createdAt}';
  const projects = await client.fetch(query);

  if (projects.length === 0) {
    console.log('No video projects found.');
    return [];
  }

  console.log(`Found ${projects.length} video project(s):\n`);
  projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.title}`);
    console.log(`   Client: ${project.client}`);
    console.log(`   Category: ${project.category}`);
    console.log(`   Created: ${new Date(project._createdAt).toLocaleDateString()}`);
    console.log(`   ID: ${project._id}\n`);
  });

  return projects;
}

async function deleteProjects(projectIds) {
  console.log(`\n🗑️  Deleting ${projectIds.length} project(s)...\n`);

  for (const id of projectIds) {
    try {
      await client.delete(id);
      console.log(`✅ Deleted: ${id}`);
    } catch (error) {
      console.error(`❌ Failed to delete ${id}:`, error.message);
    }
  }
}

async function main() {
  console.log('🧹 Sanity Data Cleanup Tool\n');
  console.log('═'.repeat(50) + '\n');

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN not found');
    console.error('Please add it to apps/web/.env.local\n');
    rl.close();
    process.exit(1);
  }

  const projects = await listVideoProjects();

  if (projects.length === 0) {
    rl.close();
    return;
  }

  console.log('═'.repeat(50) + '\n');
  console.log('Options:');
  console.log('1. Delete ALL video projects');
  console.log('2. Delete specific projects (by number)');
  console.log('3. Cancel\n');

  const choice = await question('Your choice (1-3): ');

  if (choice === '1') {
    const confirm = await question('\n⚠️  Are you sure you want to delete ALL video projects? (yes/no): ');
    if (confirm.toLowerCase() === 'yes') {
      await deleteProjects(projects.map(p => p._id));
      console.log('\n✅ All video projects deleted!');
    } else {
      console.log('\n❌ Cancelled');
    }
  } else if (choice === '2') {
    const numbers = await question('\nEnter project numbers to delete (comma-separated, e.g., 1,3,5): ');
    const indices = numbers.split(',').map(n => parseInt(n.trim()) - 1);
    const toDelete = indices
      .filter(i => i >= 0 && i < projects.length)
      .map(i => projects[i]._id);

    if (toDelete.length > 0) {
      const confirm = await question(`\n⚠️  Delete ${toDelete.length} project(s)? (yes/no): `);
      if (confirm.toLowerCase() === 'yes') {
        await deleteProjects(toDelete);
        console.log('\n✅ Selected projects deleted!');
      } else {
        console.log('\n❌ Cancelled');
      }
    } else {
      console.log('\n❌ No valid project numbers provided');
    }
  } else {
    console.log('\n❌ Cancelled');
  }

  console.log('\n💡 Tip: Run "node seed-sanity-data.js" to add fresh initial data\n');
  rl.close();
}

main().catch(error => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
