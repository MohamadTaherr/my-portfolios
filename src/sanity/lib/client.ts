import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for development to avoid caching issues
  perspective: 'published', // Only fetch published documents
  token: process.env.SANITY_API_TOKEN, // Optional: for authenticated requests
})
