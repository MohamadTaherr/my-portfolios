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
  return !!(
    process.env.BACKBLAZE_KEY_ID &&
    process.env.BACKBLAZE_APPLICATION_KEY &&
    process.env.BACKBLAZE_BUCKET_ID &&
    process.env.BACKBLAZE_BUCKET_NAME
  );
};

export interface UploadResult {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
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
  file: Express.Multer.File
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
  const fileName = `portfolio-uploads/${baseName}-${uniqueSuffix}.${ext}`;

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

