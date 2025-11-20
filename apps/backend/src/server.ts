import express, { type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { initDatabase } from './lib/db.js';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Default allowed origins
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://my-portfolios-studio.vercel.app',
];

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultOrigins;

console.log('🌐 Allowed CORS origins:', allowedOrigins);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in allowed list or is a Vercel preview deployment
    if (allowedOrigins.includes(origin) || origin.includes('.vercel.app')) {
      return callback(null, true);
    }

    console.warn('⚠️ CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Initialize database
if (process.env.DATABASE_URL) {
  initDatabase().catch(console.error);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
