import { Router, type Request, type Response } from 'express';
import { db } from '../lib/db.js';

const router: Router = Router();

// Site Settings (public read)
router.get('/site-settings', async (req: Request, res: Response) => {
  try {
    const settings = await db.getSiteSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Page Content (public read)
router.get('/page-content', async (req: Request, res: Response) => {
  try {
    const content = await db.getPageContent();
    res.json({
      contactTitle: content.contactTitle,
      contactSubtitle: content.contactSubtitle,
      contactDescription: content.contactDescription,
    });
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Navigation (public read)
router.get('/navigation', async (req: Request, res: Response) => {
  try {
    const navigation = await db.getNavigation();
    res.json({
      mainNavigation: navigation.links || [],
      logoText: navigation.logoText || '',
    });
  } catch (error) {
    console.error('Error fetching navigation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Footer (public read)
router.get('/footer', async (req: Request, res: Response) => {
  try {
    const footer = await db.getFooter();
    res.json({
      footerNavigation: footer.links || [],
      copyrightText: footer.copyrightText || `© ${new Date().getFullYear()} ${footer.name || 'Portfolio'}`,
      tagline: footer.tagline || '',
      showSocialLinks: footer.showSocialLinks !== false,
    });
  } catch (error) {
    console.error('Error fetching footer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Projects (public read)
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await db.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/projects/:id', async (req: Request, res: Response) => {
  try {
    const project = await db.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clients (public read)
router.get('/clients', async (req: Request, res: Response) => {
  try {
    const clients = await db.getClients();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Skills (public read)
router.get('/skills', async (req: Request, res: Response) => {
  try {
    const skills = await db.getSkills();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// About (public read)
router.get('/about', async (req: Request, res: Response) => {
  try {
    const about = await db.getAbout();
    res.json(about);
  } catch (error) {
    console.error('Error fetching about:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

