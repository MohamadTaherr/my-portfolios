import { Router, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { verifyPassword, createSession, verifySession } from '../lib/auth.js';
import { db } from '../lib/db.js';
import { checkAuth } from '../middleware/auth.js';

const router: Router = Router();
router.use(cookieParser());

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (verifyPassword(password)) {
      const sessionToken = createSession();
      res.cookie('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
      return res.json({ success: true });
    }

    return res.status(401).json({ error: 'Invalid password' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify session
router.get('/verify', (req: Request, res: Response) => {
  try {
    const sessionToken = req.cookies?.['admin-session'] || req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({ authenticated: false });
    }

    if (verifySession(sessionToken)) {
      return res.json({ authenticated: true });
    }

    return res.status(401).json({ authenticated: false });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
});

// Site Settings
router.get('/site-settings', async (req: Request, res: Response) => {
  try {
    const settings = await db.getSiteSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/site-settings', checkAuth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateSiteSettings(req.body);
    res.json(updated);
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Page Content
router.get('/page-content', async (req: Request, res: Response) => {
  try {
    const content = await db.getPageContent();
    res.json(content);
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/page-content', checkAuth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updatePageContent(req.body);
    res.json(updated);
  } catch (error) {
    console.error('Error updating page content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Projects
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

router.post('/projects', checkAuth, async (req: Request, res: Response) => {
  try {
    const project = await db.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/projects/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/projects/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    await db.deleteProject(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clients
router.get('/clients', async (req: Request, res: Response) => {
  try {
    const clients = await db.getClients();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/clients/:id', async (req: Request, res: Response) => {
  try {
    const client = await db.getClient(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/clients', checkAuth, async (req: Request, res: Response) => {
  try {
    const client = await db.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/clients/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateClient(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/clients/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    await db.deleteClient(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Skills
router.get('/skills', async (req: Request, res: Response) => {
  try {
    const skills = await db.getSkills();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/skills', checkAuth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateSkills(req.body);
    res.json(updated);
  } catch (error) {
    console.error('Error updating skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// About
router.get('/about', async (req: Request, res: Response) => {
  try {
    const about = await db.getAbout();
    res.json(about);
  } catch (error) {
    console.error('Error fetching about:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/about', checkAuth, async (req: Request, res: Response) => {
  try {
    const updated = await db.updateAbout(req.body);
    res.json(updated);
  } catch (error) {
    console.error('Error updating about:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

