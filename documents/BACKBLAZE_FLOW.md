# Backblaze B2 File Upload & Retrieval Flow

## How the System Works

### 1. UPLOAD FLOW (Admin Dashboard)

**Step 1: User uploads file**
- Admin clicks "Upload" button in dashboard
- Frontend calls `uploadFile(file, context)` with:
  - `fileType`: 'logo', 'profile', 'client-logo', 'portfolio-media', etc.
  - `portfolioId`: actual ID if editing, or 'new' if creating new
  - `clientId`: actual ID if editing, or 'new' if creating new

**Step 2: Backend receives upload**
- Backend receives file + context
- Backend uploads to Backblaze B2 with organized path:
  - `site/logo-{timestamp}.png` (for site logos)
  - `clients/{clientId}/logo-{timestamp}.png` (for client logos)
  - `portfolios/{portfolioId}/media/{filename}` (for portfolio media)
  - etc.

**Step 3: Backend returns URL**
- Backend returns full Backblaze URL:
  - `https://f003.backblazeb2.com/file/myportfolioedmond/site/logo-123.png`
- This URL is stored in the database

**Step 4: Frontend stores URL**
- Frontend receives URL and stores it in form state:
  - `portfolioDraft.mediaUrl = "https://f003.backblazeb2.com/file/..."`
  - `clientDraft.logoUrl = "https://f003.backblazeb2.com/file/..."`
  - etc.

**Step 5: User saves form**
- Admin clicks "Publish entry" or "Save"
- Frontend sends payload to backend:
  ```json
  {
    "title": "My Project",
    "mediaUrl": "https://f003.backblazeb2.com/file/...",
    "thumbnailUrl": "https://f003.backblazeb2.com/file/...",
    ...
  }
  ```

**Step 6: Backend saves to database**
- Backend receives payload with URLs
- Backend saves to Prisma database:
  ```sql
  INSERT INTO PortfolioItem (title, mediaUrl, thumbnailUrl, ...)
  VALUES ('My Project', 'https://f003.backblazeb2.com/file/...', ...)
  ```
- Database stores the **full Backblaze URLs**

---

### 2. RETRIEVAL FLOW (Frontend Display)

**Step 1: Frontend requests data**
- Component calls `fetchAPI('/portfolio')` or `fetchAPI('/clients')`
- Example: `Hero` component calls `fetchAPI('/site-settings')`

**Step 2: Backend reads from database**
- Backend calls `db.getPortfolioItems()` or `db.getSiteSettings()`
- Prisma queries database:
  ```sql
  SELECT * FROM PortfolioItem ORDER BY featured DESC, order ASC
  ```
- Returns records with URLs:
  ```json
  {
    "id": "abc123",
    "title": "My Project",
    "mediaUrl": "https://f003.backblazeb2.com/file/myportfolioedmond/portfolios/abc123/media/image.png",
    "thumbnailUrl": "https://f003.backblazeb2.com/file/myportfolioedmond/portfolios/abc123/thumbnails/thumb.png"
  }
  ```

**Step 3: Frontend receives data**
- Frontend gets JSON with URLs from database
- URLs are already complete Backblaze URLs

**Step 4: Frontend displays images**
- Frontend uses Next.js Image component:
  ```tsx
  <Image 
    src={item.thumbnailUrl}  // URL from database
    alt={item.title}
    {...getImageProps(item.thumbnailUrl)}  // Adds unoptimized for Backblaze
  />
  ```
- Image loads directly from Backblaze using the URL stored in database

---

## Key Points

1. **Folder structure is for organization only** - It doesn't affect retrieval
2. **Database stores full URLs** - The complete Backblaze URL is saved in the database
3. **Retrieval uses database URLs** - We don't reconstruct paths, we use stored URLs
4. **Files are always accessible** - As long as the URL is correct, the file loads

---

## File Organization Structure

```
Backblaze B2 Bucket: myportfolioedmond
├── site/
│   ├── logo-1763823069546-960852755.png
│   └── profile-1763823069547-123456789.png
├── clients/
│   ├── client-abc123/
│   │   └── logo-1763823069548-987654321.png
│   └── client-xyz789/
│       └── logo-1763823069549-456789123.png
└── portfolios/
    ├── portfolio-001/
    │   ├── media/
    │   │   └── project-image-1763823069550-789123456.png
    │   ├── thumbnails/
    │   │   └── thumb-1763823069551-321654987.png
    │   ├── gallery/
    │   │   ├── gallery1-1763823069552-654987321.png
    │   │   └── gallery2-1763823069553-147258369.png
    │   └── documents/
    │       └── deck-1763823069554-258369147.pdf
    └── portfolio-002/
        └── ...
```

---

## Example: Creating a New Portfolio

1. Admin opens "Add Portfolio" form
2. Admin uploads thumbnail → File goes to `portfolios/new/thumbnails/thumb-123.png`
3. Backend returns: `https://f003.backblazeb2.com/file/myportfolioedmond/portfolios/new/thumbnails/thumb-123.png`
4. Frontend stores URL in `portfolioDraft.thumbnailUrl`
5. Admin fills form and clicks "Publish"
6. Backend creates portfolio → Gets ID: `portfolio-abc123`
7. Backend saves to database:
   ```json
   {
     "id": "portfolio-abc123",
     "thumbnailUrl": "https://f003.backblazeb2.com/file/myportfolioedmond/portfolios/new/thumbnails/thumb-123.png"
   }
   ```
8. When displaying: Frontend reads from database → Gets URL → Displays image
9. **Note**: File stays in `portfolios/new/` folder, but URL works fine!

---

## Why This Works

- **URLs are absolute** - The full Backblaze URL is stored, not a relative path
- **Database is source of truth** - We read URLs from database, not reconstruct paths
- **Folder structure is cosmetic** - It helps organize files in Backblaze console, but doesn't affect functionality
- **Files are always accessible** - As long as bucket is public (or using unoptimized images), URLs work

