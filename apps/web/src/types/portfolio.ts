export type PortfolioMediaType =
  | 'VIDEO'
  | 'IMAGE'
  | 'ARTICLE'
  | 'DOCUMENT'
  | 'GALLERY'
  | 'TEXT';

export interface PortfolioItem {
  id: string;
  title: string;
  summary?: string | null;
  client?: string | null;
  category?: string | null;
  mediaType: PortfolioMediaType;
  videoProvider?: string | null;
  videoId?: string | null;
  mediaUrl?: string | null;
  thumbnailUrl?: string | null;
  documentUrl?: string | null;
  externalUrl?: string | null;
  content?: Record<string, unknown> | null;
  gallery?: string[] | null;
  tags?: string[] | null;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
