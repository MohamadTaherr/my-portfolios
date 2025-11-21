import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { checkAuth } from '../middleware/auth.js';
import { isBackblazeConfigured, uploadToBackblaze, deleteFromBackblaze } from '../lib/backblaze.js';

const router: Router = Router();

// Ensure uploads directory exists (for local fallback)
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Use memory storage if Backblaze is configured (to get buffer), otherwise use disk storage
const storage = isBackblazeConfigured()
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
      },
    });

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|mp4|mov|avi|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image, video, and PDF files are allowed'));
  },
});

// Helper function to handle file upload (Backblaze or local)
async function handleFileUpload(file: Express.Multer.File): Promise<{
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}> {
  if (isBackblazeConfigured()) {
    // Upload to Backblaze B2
    try {
      const result = await uploadToBackblaze(file);
      return result;
    } catch (error) {
      console.error('Backblaze upload failed, falling back to local storage:', error);
      // Fallback to local storage if Backblaze fails
    }
  }

  // Local storage fallback
  if (!file.filename) {
    // If using memory storage, save to disk first
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `${baseName}-${uniqueSuffix}${ext}`;
    const filepath = path.join(uploadsDir, filename);
    
    fs.writeFileSync(filepath, file.buffer);
    file.filename = filename;
  }

  const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 10000}`;
  return {
    url: `${baseUrl}/uploads/${file.filename}`,
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
  };
}

// Upload single file
router.post('/single', checkAuth, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await handleFileUpload(req.file);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Upload multiple files
router.post('/multiple', checkAuth, upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = await Promise.all(
      req.files.map((file) => handleFileUpload(file))
    );

    res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Delete file
router.delete('/:filename', checkAuth, async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;

    // Try Backblaze first if configured
    if (isBackblazeConfigured()) {
      try {
        // Extract filename from URL if it's a full URL
        let fileName = filename;
        if (filename.includes('/file/')) {
          const parts = filename.split('/file/');
          if (parts.length > 1) {
            fileName = parts[1];
          }
        }
        
        await deleteFromBackblaze(fileName);
        return res.json({ success: true, message: 'File deleted from Backblaze B2' });
      } catch (error) {
        console.error('Backblaze delete failed, trying local:', error);
        // Fall through to local deletion
      }
    }

    // Local file deletion
    const filepath = path.join(uploadsDir, filename);
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    fs.unlinkSync(filepath);
    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'File deletion failed' });
  }
});

export default router;
