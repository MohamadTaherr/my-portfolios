import { Request, Response, NextFunction } from 'express';
import { verifySession } from '../lib/auth.js';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const sessionToken = req.cookies?.['admin-session'] || req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!verifySession(sessionToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

