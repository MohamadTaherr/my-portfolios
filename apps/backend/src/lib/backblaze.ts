import B2 from 'backblaze-b2';
import { Readable } from 'stream';

// Initialize B2 client
let b2Client: B2 | null = null;

const initializeB2 = (): B2 => {
  if (!b2Client) {
    b2Client = new B2({
      applicationKeyId: process.env.BACKBLAZE_KEY_ID || '',
      applicationKey: process.env.BACKBLAZE_APPLICATION_KEY || '',
    });
  }
  return b2Client;
};

export const isBackblazeConfigured = (): boolean => {
  const isConfigured = !!(
    process.env.BACKBLAZE_KEY_ID &&
    process.env.BACKBLAZE_APPLICATION_KEY &&
    process.env.BACKBLAZE_BUCKET_ID &&
    process.env.BACKBLAZE_BUCKET_NAME
  );
  
  if (!isConfigured) {
    console.warn('⚠️ Backblaze B2 is not configured. Missing environment variables:');
    if (!process.env.BACKBLAZE_KEY_ID) console.warn('  - BACKBLAZE_KEY_ID');
    if (!process.env.BACKBLAZE_APPLICATION_KEY) console.warn('  - BACKBLAZE_APPLICATION_KEY');
    if (!process.env.BACKBLAZE_BUCKET_ID) console.warn('  - BACKBLAZE_BUCKET_ID');
    if (!process.env.BACKBLAZE_BUCKET_NAME) console.warn('  - BACKBLAZE_BUCKET_NAME');
  } else {
    console.log('✅ Backblaze B2 is configured');
  }
  
  return isConfigured;
};

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface UploadContext {
  fileType?: 'logo' | 'profile' | 'client-logo' | 'portfolio-media' | 'portfolio-thumbnail' | 'portfolio-gallery' | 'portfolio-document';
  portfolioId?: string;
  clientId?: string;
}

let authData: { authorizationToken: string; downloadUrl: string; apiUrl: string } | null = null;

const authorizeB2 = async (): Promise<void> => {
  if (authData) return;

  const b2 = initializeB2();
  try {
    const response = await b2.authorize();
    authData = {
      authorizationToken: response.data.authorizationToken,
      downloadUrl: response.data.downloadUrl,
      apiUrl: response.data.apiUrl,
    };
  } catch (error) {
    console.error('B2 authorization failed:', error);
    throw new Error('Failed to authorize with Backblaze B2');
  }
};

export const uploadToBackblaze = async (
  file: Express.Multer.File,
  context?: UploadContext
): Promise<UploadResult> => {
  if (!isBackblazeConfigured()) {
    throw new Error('Backblaze B2 is not configured');
  }

  await authorizeB2();
  const b2 = initializeB2();

  const bucketId = process.env.BACKBLAZE_BUCKET_ID!;
  const bucketName = process.env.BACKBLAZE_BUCKET_NAME!;
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = file.originalname.split('.').pop() || '';
  const baseName = file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-');
  
  // Organize files by type and context
  // File structure in Backblaze B2:
  // - site/logo-{timestamp}.{ext} - Site/navigation logos
  // - site/profile-{timestamp}.{ext} - Profile images
  // - clients/{clientId}/logo-{timestamp}.{ext} - Client logos
  // - portfolios/{portfolioId}/media/{filename} - Portfolio media files
  // - portfolios/{portfolioId}/thumbnails/{filename} - Portfolio thumbnails
  // - portfolios/{portfolioId}/gallery/{filename} - Portfolio gallery images
  // - portfolios/{portfolioId}/documents/{filename} - Portfolio documents
  //
  // HOW RETRIEVAL WORKS:
  // 1. Upload: File → Backblaze → Full URL returned → Stored in form state
  // 2. Save: Form submitted → URLs sent to backend → Saved to database (Prisma)
  // 3. Read: Frontend calls API → Backend reads from database → Returns records with URLs
  // 4. Display: Frontend uses URLs from database → Next.js Image loads from Backblaze
  //
  // IMPORTANT: The database stores the FULL Backblaze URLs. The folder structure
  // is just for organization - retrieval uses the URLs stored in the database, not paths.
  
  if (!context?.fileType) {
    throw new Error('File type context is required. Please specify fileType in upload request.');
  }
  
  let fileName: string;
  
  if (context.fileType === 'logo') {
    // Site/navigation logo
    fileName = `site/logo-${uniqueSuffix}.${ext}`;
  } else if (context.fileType === 'profile') {
    // Profile image
    fileName = `site/profile-${uniqueSuffix}.${ext}`;
  } else if (context.fileType === 'client-logo') {
    // Client logo - organized by client ID (use 'new' for new clients, actual ID for existing)
    const clientId = context.clientId || 'new';
    fileName = `clients/${clientId}/logo-${uniqueSuffix}.${ext}`;
  } else if (context.fileType === 'portfolio-media') {
    // Portfolio media - organized by portfolio ID (use 'new' for new portfolios, actual ID for existing)
    const portfolioId = context.portfolioId || 'new';
    fileName = `portfolios/${portfolioId}/media/${baseName}-${uniqueSuffix}.${ext}`;
  } else if (context.fileType === 'portfolio-thumbnail') {
    // Portfolio thumbnail - organized by portfolio ID
    const portfolioId = context.portfolioId || 'new';
    fileName = `portfolios/${portfolioId}/thumbnails/${baseName}-${uniqueSuffix}.${ext}`;
  } else if (context.fileType === 'portfolio-gallery') {
    // Portfolio gallery - organized by portfolio ID
    const portfolioId = context.portfolioId || 'new';
    fileName = `portfolios/${portfolioId}/gallery/${baseName}-${uniqueSuffix}.${ext}`;
  } else if (context.fileType === 'portfolio-document') {
    // Portfolio document - organized by portfolio ID
    const portfolioId = context.portfolioId || 'new';
    fileName = `portfolios/${portfolioId}/documents/${baseName}-${uniqueSuffix}.${ext}`;
  } else {
    throw new Error(`Unknown file type: ${context.fileType}`);
  }

  try {
    // Get upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId,
    });

    const uploadUrl = uploadUrlResponse.data.uploadUrl;
    const uploadAuthToken = uploadUrlResponse.data.authorizationToken;

    // Upload file
    const uploadResponse = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName,
      data: file.buffer,
      contentLength: file.size,
      contentType: file.mimetype,
    });

    // Construct public URL
    // Backblaze B2 URL format: https://f{downloadUrl}/file/{bucketName}/{fileName}
    // The downloadUrl from authorize() is typically like "f000.backblazeb2.com" or "000.backblazeb2.com"
    // For private buckets, you may need to make the bucket public or use signed URLs
    const downloadUrl = authData!.downloadUrl;
    
    // Normalize the download URL
    // Remove protocol if present, remove leading 'f' if present (we'll add it back)
    let cleanDownloadUrl = downloadUrl
      .replace(/^https?:\/\//, '') // Remove http:// or https://
      .replace(/^f/, ''); // Remove leading 'f' if present
    
    // Ensure we have a valid domain (should be like 000.backblazeb2.com or similar)
    if (!cleanDownloadUrl.includes('.')) {
      console.error('Invalid Backblaze download URL format:', downloadUrl);
      throw new Error(`Invalid Backblaze download URL format: ${downloadUrl}`);
    }
    
    // Construct the public URL
    // Format: https://f{downloadUrl}/file/{bucketName}/{fileName}
    const publicUrl = `https://f${cleanDownloadUrl}/file/${bucketName}/${fileName}`;
    
    console.log('Backblaze upload successful:', {
      fileName,
      publicUrl,
      bucketName,
      size: file.size,
    });

    return {
      url: publicUrl,
      filename: fileName,
      size: file.size,
      mimetype: file.mimetype,
    };
  } catch (error) {
    console.error('Backblaze upload error:', error);
    throw error;
  }
};

export const deleteFromBackblaze = async (fileName: string): Promise<void> => {
  if (!isBackblazeConfigured()) {
    throw new Error('Backblaze B2 is not configured');
  }

  await authorizeB2();
  const b2 = initializeB2();

  const bucketName = process.env.BACKBLAZE_BUCKET_NAME!;

  try {
    // Get file ID first
    const listResponse = await b2.listFileNames({
      bucketId: process.env.BACKBLAZE_BUCKET_ID!,
      startFileName: fileName,
      maxFileCount: 1,
    });

    if (listResponse.data.files.length === 0) {
      throw new Error('File not found in Backblaze');
    }

    const fileId = listResponse.data.files[0].fileId;

    // Delete file
    await b2.deleteFileVersion({
      fileId,
      fileName,
    });
  } catch (error) {
    console.error('Backblaze delete error:', error);
    throw error;
  }
};

