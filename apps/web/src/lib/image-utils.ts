/**
 * Check if a URL is from Backblaze B2
 */
export function isBackblazeUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.includes('backblazeb2.com');
}

/**
 * Get props for Next.js Image component based on URL source
 * Backblaze URLs need unoptimized=true if bucket is private
 */
export function getImageProps(url: string | null | undefined) {
  if (!url) return { unoptimized: false };
  
  // If it's a Backblaze URL, use unoptimized to bypass Next.js Image Optimization
  // This is needed if the bucket is private (401 errors)
  // If you make the bucket public, you can remove unoptimized
  if (isBackblazeUrl(url)) {
    return { unoptimized: true };
  }
  
  return { unoptimized: false };
}

