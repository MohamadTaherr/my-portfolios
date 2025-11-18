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

