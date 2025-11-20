import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('🔍 Testing database connection...\n');

  console.log('Environment variables:');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Not set ✗');
  console.log('Database URL (partial):', process.env.DATABASE_URL?.split('@')[1] || 'N/A');
  console.log('');

  try {
    console.log('Attempting to connect to database...');
    await prisma.$connect();
    console.log('✅ Successfully connected to database!\n');

    console.log('Testing queries...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query executed successfully:', result);
    console.log('');

    // Try to count site settings
    console.log('Checking if tables exist...');
    try {
      const siteSettingsCount = await prisma.siteSettings.count();
      console.log('✅ SiteSettings table exists. Count:', siteSettingsCount);
    } catch (error: any) {
      console.log('⚠ SiteSettings table does not exist yet.');
      console.log('   Run `pnpm db:push` to create tables.');
    }

    console.log('\n🎉 Database connection is working!');
    console.log('You can now run:');
    console.log('  - pnpm db:push (to create/update tables)');
    console.log('  - pnpm cleanup (to clean data)');

  } catch (error: any) {
    console.error('\n❌ Failed to connect to database\n');
    console.error('Error details:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    console.error('');

    if (error.code === 'P1001') {
      console.error('🔧 Troubleshooting steps:');
      console.error('1. Check your DATABASE_URL in apps/backend/.env');
      console.error('2. Get the correct URL from Render:');
      console.error('   - Go to Render Dashboard → Your Database');
      console.error('   - Copy "External Database URL"');
      console.error('   - It should look like:');
      console.error('     postgresql://user:pass@dpg-xxx.region.render.com/dbname');
      console.error('');
      console.error('3. Common formats:');
      console.error('   - .render.com');
      console.error('   - .oregon-postgres.render.com');
      console.error('   - .frankfurt-postgres.render.com');
      console.error('   - .singapore-postgres.render.com');
      console.error('');
      console.error('4. Make sure:');
      console.error('   - "Allow External Connections" is enabled in Render');
      console.error('   - Your IP is not blocked (check Render firewall settings)');
      console.error('   - Database is not sleeping (on free tier)');
    } else if (error.code === 'P1017') {
      console.error('🔧 The server has closed the connection.');
      console.error('This might be because:');
      console.error('- Database is sleeping (free tier)');
      console.error('- Connection timeout');
      console.error('- Network issues');
    }

    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then(() => {
    console.log('\n✨ Test complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed');
    process.exit(1);
  });
