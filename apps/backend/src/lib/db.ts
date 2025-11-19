import { PrismaClient, Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Initialize default data
export async function initDatabase() {
  try {
    // Check and initialize site settings
    const siteSettingsCount = await prisma.siteSettings.count();
    if (siteSettingsCount === 0) {
      await prisma.siteSettings.create({
        data: {
          data: {
            name: 'Edmond Haddad',
            tagline: 'Award-Winning Scriptwriter & Creative Producer',
            bio: 'Two decades of crafting compelling narratives for Porsche, major film productions, and global brands.',
            profileImageUrl: '',
            showreelUrl: '',
            welcomeMessage: 'Welcome to my portfolio',
            yearsExperience: 20,
            projectsCompleted: 200,
            clientsServed: 100,
            industryAwards: 10,
            email: 'contact@example.com',
            phone: '+1 (234) 567-8900',
            location: 'Los Angeles, CA',
            socialLinks: {
              linkedin: '',
              twitter: '',
              instagram: '',
              youtube: '',
              vimeo: '',
            },
          },
        },
      });
    }

    // Check and initialize page content
    const pageContentCount = await prisma.pageContent.count();
    if (pageContentCount === 0) {
      await prisma.pageContent.create({
        data: {
          data: {
            heroHeadline: '',
            heroSubheadline: '',
            aboutTitle: 'Behind the Camera',
            aboutSubtitle: 'The Story',
            skillsTitle: 'By the Numbers',
            skillsSubtitle: 'Expertise',
            contactTitle: 'Get In Touch',
            contactSubtitle: 'Let\'s Create Something Together',
            contactDescription: 'Ready to bring your vision to life? Let\'s discuss your next project.',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: [],
          },
        },
      });
    }

    // Check and initialize skills
    const skillsCount = await prisma.skills.count();
    if (skillsCount === 0) {
      await prisma.skills.create({
        data: {
          data: {
            stats: [
              { id: '1', number: '20+', label: 'Years in Industry', icon: '🎬', order: 0 },
              { id: '2', number: '200+', label: 'Scripts Produced', icon: '✍️', order: 1 },
              { id: '3', number: '10+', label: 'Awards', icon: '🏆', order: 2 },
              { id: '4', number: '100+', label: 'Global Brands', icon: '🌍', order: 3 },
              { id: '5', number: '50+', label: 'Documentaries', icon: '📽️', order: 4 },
              { id: '6', number: '1000+', label: 'Hours of Content', icon: '⏱️', order: 5 },
            ],
            competencies: [
              'Scriptwriting',
              'Video Production',
              'Documentary Filmmaking',
              'Commercial Direction',
              'Color Grading',
              'Sound Design',
              'Post-Production',
              'Creative Direction',
            ],
          },
        },
      });
    }

    // Check and initialize about
    const aboutCount = await prisma.about.count();
    if (aboutCount === 0) {
      await prisma.about.create({
        data: {
          data: {
            bodyParagraphs: [],
            featuredBrands: [],
            signingName: 'Edmond Haddad',
          },
        },
      });
    }

    // Check and initialize navigation
    const navigationCount = await prisma.navigation.count();
    if (navigationCount === 0) {
      await prisma.navigation.create({
        data: {
          data: {
            links: [
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' },
            ],
          },
        },
      });
    }

    // Check and initialize footer
    const footerCount = await prisma.footer.count();
    if (footerCount === 0) {
      await prisma.footer.create({
        data: {
          data: {
            name: 'Edmond Haddad',
            socialLinks: {
              linkedin: '',
              twitter: '',
              instagram: '',
              youtube: '',
              vimeo: '',
            },
          },
        },
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021') {
      console.error('Database schema missing. Run `pnpm --filter backend run db:push` to create the Prisma tables.');
    } else {
      console.error('Error initializing database:', error);
    }
  }
}

// Initialize database on module load (only if DATABASE_URL is set)
if (process.env.DATABASE_URL) {
  initDatabase().catch(console.error);
}

// Database operations
export const db = {
  // Site Settings
  getSiteSettings: async () => {
    const result = await prisma.siteSettings.findFirst({
      orderBy: { id: 'desc' },
    });
    return (result?.data as any) || {};
  },
  updateSiteSettings: async (data: any) => {
    const existing = await prisma.siteSettings.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      await prisma.siteSettings.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.siteSettings.create({ data: { data } });
    }
    return data;
  },

  // Page Content
  getPageContent: async () => {
    const result = await prisma.pageContent.findFirst({
      orderBy: { id: 'desc' },
    });
    return (result?.data as any) || {};
  },
  updatePageContent: async (data: any) => {
    const existing = await prisma.pageContent.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      await prisma.pageContent.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.pageContent.create({ data: { data } });
    }
    return data;
  },

  // Projects
  getProjects: async () => {
    return await prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  },
  getProject: async (id: string) => {
    return await prisma.project.findUnique({ where: { id } });
  },
  createProject: async (project: any) => {
    return await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        client: project.client,
        category: project.category,
        duration: project.duration,
        year: project.year,
        tags: project.tags || [],
        videoUrl: project.videoUrl || project.video_url,
        thumbnailUrl: project.thumbnailUrl || project.thumbnail_url,
        featured: project.featured || false,
        order: project.order || 0,
      },
    });
  },
  updateProject: async (id: string, updates: any) => {
    return await prisma.project.update({
      where: { id },
      data: {
        ...(updates.title !== undefined && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.client !== undefined && { client: updates.client }),
        ...(updates.category !== undefined && { category: updates.category }),
        ...(updates.duration !== undefined && { duration: updates.duration }),
        ...(updates.year !== undefined && { year: updates.year }),
        ...(updates.tags !== undefined && { tags: updates.tags }),
        ...((updates.videoUrl !== undefined || updates.video_url !== undefined) && {
          videoUrl: updates.videoUrl || updates.video_url,
        }),
        ...((updates.thumbnailUrl !== undefined || updates.thumbnail_url !== undefined) && {
          thumbnailUrl: updates.thumbnailUrl || updates.thumbnail_url,
        }),
        ...(updates.featured !== undefined && { featured: updates.featured }),
        ...(updates.order !== undefined && { order: updates.order }),
      },
    });
  },
  deleteProject: async (id: string) => {
    await prisma.project.delete({ where: { id } });
    return true;
  },

  // Clients
  getClients: async () => {
    return await prisma.client.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  },
  getClient: async (id: string) => {
    return await prisma.client.findUnique({ where: { id } });
  },
  createClient: async (client: any) => {
    return await prisma.client.create({
      data: {
        name: client.name,
        logoUrl: client.logoUrl || client.logo_url,
        project: client.project,
        category: client.category,
        description: client.description,
        testimonial: client.testimonial,
        clientName: client.clientName || client.client_name,
        year: client.year,
        rating: client.rating || 5,
        featured: client.featured || false,
        order: client.order || 0,
      },
    });
  },
  updateClient: async (id: string, updates: any) => {
    return await prisma.client.update({
      where: { id },
      data: {
        ...(updates.name !== undefined && { name: updates.name }),
        ...((updates.logoUrl !== undefined || updates.logo_url !== undefined) && {
          logoUrl: updates.logoUrl || updates.logo_url,
        }),
        ...(updates.project !== undefined && { project: updates.project }),
        ...(updates.category !== undefined && { category: updates.category }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.testimonial !== undefined && { testimonial: updates.testimonial }),
        ...((updates.clientName !== undefined || updates.client_name !== undefined) && {
          clientName: updates.clientName || updates.client_name,
        }),
        ...(updates.year !== undefined && { year: updates.year }),
        ...(updates.rating !== undefined && { rating: updates.rating }),
        ...(updates.featured !== undefined && { featured: updates.featured }),
        ...(updates.order !== undefined && { order: updates.order }),
      },
    });
  },
  deleteClient: async (id: string) => {
    await prisma.client.delete({ where: { id } });
    return true;
  },

  // Skills
  getSkills: async () => {
    const result = await prisma.skills.findFirst({
      orderBy: { id: 'desc' },
    });
    return (result?.data as any) || {};
  },
  updateSkills: async (data: any) => {
    const existing = await prisma.skills.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      await prisma.skills.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.skills.create({ data: { data } });
    }
    return data;
  },

  // About
  getAbout: async () => {
    const result = await prisma.about.findFirst({
      orderBy: { id: 'desc' },
    });
    return (result?.data as any) || {};
  },
  updateAbout: async (data: any) => {
    const existing = await prisma.about.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      await prisma.about.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.about.create({ data: { data } });
    }
    return data;
  },

  // Navigation
  getNavigation: async () => {
    const result = await prisma.navigation.findFirst({
      orderBy: { id: 'desc' },
    });
    return (result?.data as any) || {};
  },
  updateNavigation: async (data: any) => {
    const existing = await prisma.navigation.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      await prisma.navigation.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.navigation.create({ data: { data } });
    }
    return data;
  },

  // Footer
  getFooter: async () => {
    const result = await prisma.footer.findFirst({
      orderBy: { id: 'desc' },
    });
    return (result?.data as any) || {};
  },
  updateFooter: async (data: any) => {
    const existing = await prisma.footer.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      await prisma.footer.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      await prisma.footer.create({ data: { data } });
    }
    return data;
  },
};

