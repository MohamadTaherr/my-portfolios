/**
 * Check if a URL is from Backblaze B2
 */
export function isBackblazeUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.includes('backblazeb2.com');
}

/**
 * Get props for Next.js Image component based on URL source
 * Since Backblaze bucket is public, Next.js Image Optimization works fine
 * This function is kept for future use if bucket privacy changes
 */
export function getImageProps(url: string | null | undefined): { unoptimized: boolean } {
  if (!url) return { unoptimized: false };
  
  // Backblaze bucket is public, so Next.js Image Optimization works
  // No need to set unoptimized=true
  // If you make the bucket private in the future, uncomment the line below:
  // if (isBackblazeUrl(url)) return { unoptimized: true };
  
  return { unoptimized: false };
}

