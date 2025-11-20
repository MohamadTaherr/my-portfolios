import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

async function cleanupData() {
  console.log('🧹 Starting data cleanup...\n');

  try {
    // 1. Delete all clients
    console.log('Deleting all clients...');
    const deletedClients = await prisma.client.deleteMany({});
    console.log(`✓ Deleted ${deletedClients.count} clients\n`);

    // 2. Reset page content titles to defaults
    console.log('Resetting page content titles...');
    const pageContent = await prisma.pageContent.findFirst({
      orderBy: { id: 'desc' },
    });

    if (pageContent) {
      await prisma.pageContent.update({
        where: { id: pageContent.id },
        data: {
          data: {
            ...(pageContent.data as any),
            heroHeadline: 'I tell stories that move people',
            heroSubheadline: '',
            aboutTitle: 'Behind the Camera',
            aboutSubtitle: 'The Story',
            skillsTitle: 'By the Numbers',
            skillsSubtitle: 'Expertise',
            contactTitle: 'Get In Touch',
            contactSubtitle: 'Let\'s Create Something Together',
            contactDescription: 'Ready to bring your vision to life? Let\'s discuss your next project.',
            clientsTitle: 'Trusted by <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">World-Class Brands</span>',
            clientsSubtitle: 'Two decades of delivering exceptional scriptwriting and creative production for premium global brands',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: [],
          },
        },
      });
      console.log('✓ Reset page content titles to defaults\n');
    } else {
      console.log('⚠ No page content found, creating defaults...');
      await prisma.pageContent.create({
        data: {
          data: {
            heroHeadline: 'I tell stories that move people',
            heroSubheadline: '',
            aboutTitle: 'Behind the Camera',
            aboutSubtitle: 'The Story',
            skillsTitle: 'By the Numbers',
            skillsSubtitle: 'Expertise',
            contactTitle: 'Get In Touch',
            contactSubtitle: 'Let\'s Create Something Together',
            contactDescription: 'Ready to bring your vision to life? Let\'s discuss your next project.',
            clientsTitle: 'Trusted by <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">World-Class Brands</span>',
            clientsSubtitle: 'Two decades of delivering exceptional scriptwriting and creative production for premium global brands',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: [],
          },
        },
      });
      console.log('✓ Created default page content\n');
    }

    // 3. Optional: Delete all portfolio items (commented out for safety)
    // Uncomment the following lines if you want to delete portfolio items as well
    /*
    console.log('Deleting all portfolio items...');
    const deletedPortfolio = await prisma.portfolioItem.deleteMany({});
    console.log(`✓ Deleted ${deletedPortfolio.count} portfolio items\n`);
    */

    console.log('✅ Cleanup completed successfully!\n');
    console.log('Summary:');
    console.log(`- Clients deleted: ${deletedClients.count}`);
    console.log('- Page content titles reset to defaults');
    console.log('\nNote: Portfolio items were NOT deleted (uncomment in script if needed)');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanupData()
  .then(() => {
    console.log('\n🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to cleanup data:', error);
    process.exit(1);
  });
