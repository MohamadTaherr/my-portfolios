import { PrismaClient, Prisma, $Enums } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const portfolioMediaTypeValues = new Set((Object.values($Enums.PortfolioMediaType ?? {}) as $Enums.PortfolioMediaType[]));

const coerceMediaType = (value?: string): $Enums.PortfolioMediaType => {
  if (!value) {
    return $Enums.PortfolioMediaType.VIDEO;
  }
  const normalized = value.toUpperCase() as $Enums.PortfolioMediaType;
  return portfolioMediaTypeValues.has(normalized) ? normalized : $Enums.PortfolioMediaType.VIDEO;
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry));
  }
  if (typeof value === 'string') {
    return value.split(',').map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
};

const toJsonObject = (value: unknown) => {
  if (value && typeof value === 'object') {
    return value;
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch {
      return {};
    }
  }
  return {};
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
            clientsTitle: 'Trusted by <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">World-Class Brands</span>',
            clientsSubtitle: 'Two decades of delivering exceptional scriptwriting and creative production for premium global brands',
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

    // Check and initialize portfolio items
    const portfolioCount = await prisma.portfolioItem.count();
    if (portfolioCount === 0) {
      await prisma.portfolioItem.create({
        data: {
          title: 'Cinematic Showreel 2025',
          summary: 'A kinetic montage of commercial, narrative, and documentary work crafted for global brands.',
          client: 'Global Brands',
          category: 'Showreel',
          mediaType: $Enums.PortfolioMediaType.VIDEO,
          videoProvider: 'VIMEO',
          videoId: '923456781',
          mediaUrl: 'https://vimeo.com/923456781',
          thumbnailUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
          tags: ['showreel', 'direction', 'color-grading'],
          featured: true,
          order: 0,
        },
      });

      await prisma.portfolioItem.create({
        data: {
          title: 'The Anatomy of an Unforgettable Brand Film',
          summary: 'An editorial deep-dive breaking down the frameworks I use to architect emotive brand stories.',
          category: 'Editorial',
          mediaType: $Enums.PortfolioMediaType.ARTICLE,
          tags: ['strategy', 'writing', 'narrative'],
          content: {
            body: 'A cinematic manifesto covering discovery, scripting, color psychology, and delivery for premium films.',
            readingTime: '8 min read',
          },
          externalUrl: 'https://medium.com/@edmond/brand-film-blueprint',
          featured: false,
          order: 1,
        },
      });

      await prisma.portfolioItem.create({
        data: {
          title: 'Frames From The Atlas Expedition',
          summary: 'Gallery of stills captured while directing a hybrid documentary across Morocco and Iceland.',
          category: 'Photography',
          mediaType: $Enums.PortfolioMediaType.GALLERY,
          gallery: [
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=80',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
            'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1400&q=80'
          ],
          tags: ['documentary', 'travel', 'cinematography'],
          featured: true,
          order: 2,
        },
      });

      await prisma.portfolioItem.create({
        data: {
          title: 'Immersive Documentary Pitch Deck',
          summary: 'A downloadable treatment and lookbook for an upcoming long-form series.',
          category: 'Pitch Material',
          mediaType: $Enums.PortfolioMediaType.DOCUMENT,
          documentUrl: 'https://example.com/documents/immersion-deck.pdf',
          thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80',
          tags: ['deck', 'strategy'],
          featured: false,
          order: 3,
        },
      });
    }

    // Check and initialize categories
    const categoriesCount = await prisma.category.count();
    if (categoriesCount === 0) {
      const defaultCategories = [
        { name: 'Showreel', description: 'Compilation reels and highlights', color: '#FF6B6B', icon: '🎬', order: 0 },
        { name: 'Commercial', description: 'Brand films and advertisements', color: '#4ECDC4', icon: '📺', order: 1 },
        { name: 'Documentary', description: 'Documentary films and series', color: '#45B7D1', icon: '🎥', order: 2 },
        { name: 'Narrative', description: 'Narrative films and shorts', color: '#96CEB4', icon: '🎭', order: 3 },
        { name: 'Editorial', description: 'Articles and written content', color: '#FFEAA7', icon: '✍️', order: 4 },
        { name: 'Photography', description: 'Photo essays and galleries', color: '#DFE6E9', icon: '📷', order: 5 },
        { name: 'Pitch Material', description: 'Decks and treatments', color: '#A29BFE', icon: '📋', order: 6 },
      ];

      for (const category of defaultCategories) {
        await prisma.category.create({ data: category });
      }
    }

    // Check and initialize analytics settings
    const analyticsCount = await prisma.analyticsSettings.count();
    if (analyticsCount === 0) {
      await prisma.analyticsSettings.create({
        data: {
          enableVercelAnalytics: false,
          enableGoogleAnalytics: false,
          googleAnalyticsId: null,
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

  // Portfolio Items
  getPortfolioItems: async () => {
    return await prisma.portfolioItem.findMany({
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
  },
  getPortfolioItem: async (id: string) => {
    return await prisma.portfolioItem.findUnique({ where: { id } });
  },
  createPortfolioItem: async (item: any) => {
    return await prisma.portfolioItem.create({
      data: {
        title: item.title,
        summary: item.summary,
        client: item.client,
        category: item.category,
        mediaType: coerceMediaType(item.mediaType),
        videoProvider: item.videoProvider,
        videoId: item.videoId,
        mediaUrl: item.mediaUrl,
        thumbnailUrl: item.thumbnailUrl,
        documentUrl: item.documentUrl,
        externalUrl: item.externalUrl,
        content: toJsonObject(item.content),
        gallery: toStringArray(item.gallery),
        tags: toStringArray(item.tags),
        featured: item.featured ?? false,
        order: item.order ?? 0,
      },
    });
  },
  updatePortfolioItem: async (id: string, updates: any) => {
    const data: Prisma.PortfolioItemUpdateInput = {};
    if (updates.title !== undefined) data.title = updates.title;
    if (updates.summary !== undefined) data.summary = updates.summary;
    if (updates.client !== undefined) data.client = updates.client;
    if (updates.category !== undefined) data.category = updates.category;
    if (updates.mediaType !== undefined) data.mediaType = coerceMediaType(updates.mediaType);
    if (updates.videoProvider !== undefined) data.videoProvider = updates.videoProvider;
    if (updates.videoId !== undefined) data.videoId = updates.videoId;
    if (updates.mediaUrl !== undefined) data.mediaUrl = updates.mediaUrl;
    if (updates.thumbnailUrl !== undefined) data.thumbnailUrl = updates.thumbnailUrl;
    if (updates.documentUrl !== undefined) data.documentUrl = updates.documentUrl;
    if (updates.externalUrl !== undefined) data.externalUrl = updates.externalUrl;
    if (updates.content !== undefined) data.content = toJsonObject(updates.content);
    if (updates.gallery !== undefined) data.gallery = toStringArray(updates.gallery);
    if (updates.tags !== undefined) data.tags = toStringArray(updates.tags);
    if (updates.featured !== undefined) data.featured = updates.featured;
    if (updates.order !== undefined) data.order = updates.order;

    return await prisma.portfolioItem.update({
      where: { id },
      data,
    });
  },
  deletePortfolioItem: async (id: string) => {
    await prisma.portfolioItem.delete({ where: { id } });
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

  // Categories
  getCategories: async () => {
    return await prisma.category.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  },
  getCategory: async (id: string) => {
    return await prisma.category.findUnique({ where: { id } });
  },
  createCategory: async (category: any) => {
    return await prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        order: category.order ?? 0,
      },
    });
  },
  updateCategory: async (id: string, updates: any) => {
    return await prisma.category.update({
      where: { id },
      data: {
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.color !== undefined && { color: updates.color }),
        ...(updates.icon !== undefined && { icon: updates.icon }),
        ...(updates.order !== undefined && { order: updates.order }),
      },
    });
  },
  deleteCategory: async (id: string) => {
    await prisma.category.delete({ where: { id } });
    return true;
  },

  // Analytics Settings
  getAnalyticsSettings: async () => {
    const result = await prisma.analyticsSettings.findFirst({
      orderBy: { id: 'desc' },
    });
    return result || {
      enableVercelAnalytics: false,
      enableGoogleAnalytics: false,
      googleAnalyticsId: null,
    };
  },
  updateAnalyticsSettings: async (settings: any) => {
    const existing = await prisma.analyticsSettings.findFirst({
      orderBy: { id: 'desc' },
    });
    if (existing) {
      return await prisma.analyticsSettings.update({
        where: { id: existing.id },
        data: {
          enableVercelAnalytics: settings.enableVercelAnalytics ?? existing.enableVercelAnalytics,
          enableGoogleAnalytics: settings.enableGoogleAnalytics ?? existing.enableGoogleAnalytics,
          googleAnalyticsId: settings.googleAnalyticsId ?? existing.googleAnalyticsId,
        },
      });
    } else {
      return await prisma.analyticsSettings.create({
        data: {
          enableVercelAnalytics: settings.enableVercelAnalytics ?? false,
          enableGoogleAnalytics: settings.enableGoogleAnalytics ?? false,
          googleAnalyticsId: settings.googleAnalyticsId ?? null,
        },
      });
    }
  },
};

