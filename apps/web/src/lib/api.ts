// API client for backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}/api${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include', // Include cookies for admin routes
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchAdminAPI(endpoint: string, options?: RequestInit) {
  return fetchAPI(`/admin${endpoint}`, options);
}

export async function uploadFile(file: File): Promise<{ url: string; filename: string }> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/api/admin/upload/single`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.details || errorData.error || response.statusText;
    throw new Error(`Backblaze upload failed: ${errorMessage}`);
  }

  const result = await response.json();
  
  // Verify the URL is from Backblaze
  if (result.url && !result.url.includes('backblazeb2.com')) {
    console.warn('⚠️ Uploaded file URL is not from Backblaze:', result.url);
  }
  
  return result;
}

export async function uploadMultipleFiles(files: File[]): Promise<{ files: Array<{ url: string; filename: string }> }> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:10000';
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const response = await fetch(`${API_URL}/api/admin/upload/multiple`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.details || errorData.error || response.statusText;
    throw new Error(`Backblaze upload failed: ${errorMessage}`);
  }

  const result = await response.json();
  
  // Verify all URLs are from Backblaze
  result.files?.forEach((file: { url: string }) => {
    if (file.url && !file.url.includes('backblazeb2.com')) {
      console.warn('⚠️ Uploaded file URL is not from Backblaze:', file.url);
    }
  });
  
  return result;
}

