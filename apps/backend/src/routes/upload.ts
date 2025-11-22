import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { checkAuth } from '../middleware/auth.js';
import { isBackblazeConfigured, uploadToBackblaze, deleteFromBackblaze } from '../lib/backblaze.js';

const router: Router = Router();

// Only use memory storage for Backblaze (we need the buffer)
// Backblaze is REQUIRED - no local storage fallback
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|mp4|mov|avi|pdf/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image, video, and PDF files are allowed'));
  },
});

// Helper function to handle file upload - BACKBLAZE ONLY
async function handleFileUpload(file: Express.Multer.File, context?: {
  fileType?: string;
  portfolioId?: string;
  clientId?: string;
}): Promise<{
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}> {
  // Backblaze is REQUIRED - no fallback
  if (!isBackblazeConfigured()) {
    throw new Error(
      'Backblaze B2 is not configured. Please set the following environment variables: ' +
      'BACKBLAZE_KEY_ID, BACKBLAZE_APPLICATION_KEY, BACKBLAZE_BUCKET_ID, BACKBLAZE_BUCKET_NAME'
    );
  }

  // Upload to Backblaze B2 - THIS IS THE ONLY STORAGE
  console.log('📤 Uploading to Backblaze B2...', context ? `Context: ${JSON.stringify(context)}` : '');
  const result = await uploadToBackblaze(file, context);
  console.log('✅ Backblaze upload successful:', result.url);
  return result;
}

// Upload single file - BACKBLAZE ONLY
router.post('/single', checkAuth, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract context from query parameters or body
    const context = {
      fileType: (req.query.fileType || req.body.fileType) as string | undefined,
      portfolioId: (req.query.portfolioId || req.body.portfolioId) as string | undefined,
      clientId: (req.query.clientId || req.body.clientId) as string | undefined,
    };

    const result = await handleFileUpload(req.file, context);
    
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('❌ Backblaze upload error:', error);
    res.status(500).json({ 
      error: 'File upload to Backblaze B2 failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Upload multiple files - BACKBLAZE ONLY
router.post('/multiple', checkAuth, upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Extract context from query parameters or body
    const context = {
      fileType: (req.query.fileType || req.body.fileType) as string | undefined,
      portfolioId: (req.query.portfolioId || req.body.portfolioId) as string | undefined,
      clientId: (req.query.clientId || req.body.clientId) as string | undefined,
    };

    const files = await Promise.all(
      req.files.map((file) => handleFileUpload(file, context))
    );

    res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error('❌ Backblaze upload error:', error);
    res.status(500).json({ 
      error: 'File upload to Backblaze B2 failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete file - BACKBLAZE ONLY
router.delete('/:filename', checkAuth, async (req: Request, res: Response) => {
  try {
    if (!isBackblazeConfigured()) {
      return res.status(500).json({ 
        error: 'Backblaze B2 is not configured. Cannot delete files.' 
      });
    }

    const filename = req.params.filename;

    // Extract filename from URL if it's a full Backblaze URL
    let fileName = filename;
    if (filename.includes('/file/')) {
      const parts = filename.split('/file/');
      if (parts.length > 1) {
        fileName = parts[1];
      }
    }
    
    await deleteFromBackblaze(fileName);
    res.json({ success: true, message: 'File deleted from Backblaze B2' });
  } catch (error) {
    console.error('❌ Backblaze delete error:', error);
    res.status(500).json({ 
      error: 'File deletion from Backblaze B2 failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
