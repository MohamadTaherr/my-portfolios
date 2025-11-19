# Portfolio Website Monorepo

A modern portfolio website with a monorepo structure:
- **Frontend** (Next.js) - Deploys on Vercel
- **Backend** (Express + Prisma) - Deploys on Render

## Structure

```
my-portfolios/
├── apps/
│   ├── web/          # Next.js frontend (Vercel)
│   └── backend/      # Express API (Render)
├── packages/         # Shared packages (if needed)
└── package.json      # Root workspace config
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Express, Prisma, PostgreSQL
- **Package Manager**: pnpm
- **Monorepo**: Turborepo

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Backend Setup

```bash
cd apps/backend

# Set up environment variables
cp .env.example .env
# Edit .env and add:
# - DATABASE_URL (PostgreSQL connection string)
# - ADMIN_PASSWORD (for admin panel)
# - FRONTEND_URL (your Vercel frontend URL)

# Generate Prisma Client
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 3. Frontend Setup

```bash
cd apps/web

# Set up environment variables
# In Vercel dashboard, add:
# - NEXT_PUBLIC_API_URL (your Render backend URL)
# - NEXT_PUBLIC_SITE_URL (your Vercel frontend URL)
```

## Development

### Run Both Frontend and Backend

```bash
# From root
pnpm dev
```

### Run Separately

```bash
# Backend (port 10000)
cd apps/backend
pnpm dev

# Frontend (port 3000)
cd apps/web
pnpm dev
```

## Deployment

### Backend (Render)

1. Connect your GitHub repository to Render
2. Render will auto-detect `apps/backend/render.yaml`
3. Set environment variables in Render dashboard:
   - `DATABASE_URL` (from Render PostgreSQL)
   - `ADMIN_PASSWORD`
   - `FRONTEND_URL` (your Vercel URL)
   - `PORT` (10000)

> The Render build/start commands run `pnpm --filter backend run db:push` before generating Prisma Client or starting the server, so your PostgreSQL schema is created automatically on each deploy. If you deploy elsewhere, run `pnpm db:push` manually first.

### Frontend (Vercel)

1. Connect the repo to Vercel (root directory can remain `/` because `vercel.json` already builds `apps/web`).
2. Keep the build command `pnpm --filter web run build` and output directory `apps/web/.next`.
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` → your Render backend URL
   - `NEXT_PUBLIC_SITE_URL` → your public Vercel domain
   - (Optional) configure Vercel secrets `backend_url` / `frontend_url` referenced in `vercel.json`.
4. Pushes to `main` now trigger Vercel automatically—no manual retargeting after the Sanity removal.

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="your-secure-password"
FRONTEND_URL="https://your-frontend.vercel.app"
PORT=10000
NODE_ENV=production
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL="https://your-backend.onrender.com"
NEXT_PUBLIC_SITE_URL="https://your-frontend.vercel.app"
```

## API Endpoints

### Public Endpoints
- `GET /api/site-settings` - Get site settings
- `GET /api/page-content` - Get page content
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/clients` - Get all clients
- `GET /api/skills` - Get skills data
- `GET /api/about` - Get about section
- `GET /api/navigation` - Get navigation
- `GET /api/footer` - Get footer

### Admin Endpoints (require authentication)
- `POST /api/admin/login` - Login
- `GET /api/admin/verify` - Verify session
- `PUT /api/admin/site-settings` - Update site settings
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- Similar for clients, skills, about, etc.

## Database Management

```bash
cd apps/backend

# View data in Prisma Studio
pnpm db:studio

# Create migration
pnpm db:migrate

# Push schema changes (dev only)
pnpm db:push
```

## Prisma Model Strategy

- Prisma schema lives at `apps/backend/prisma/schema.prisma`; run `pnpm --filter backend run db:generate` any time you change it.
- `Project` and `Client` are strongly typed tables with indexes for `category`/`featured` so portfolio and client grids stay fast.
- Content-heavy sections (`SiteSettings`, `PageContent`, `Skills`, `About`, `Navigation`, `Footer`) use JSON columns so you can add or remove fields without a migration.
- `initDatabase()` seeds sensible defaults during boot so a fresh deployment always has data to render.
- Keep migrations alongside the schema to evolve the data model in a controlled way, then redeploy to Render (build step now regenerates the Prisma client automatically).

## Admin Panel

Visit `/admin` to open the password-protected studio (it uses the `ADMIN_PASSWORD` env var from Render). The dashboard runs on the Next.js frontend and talks directly to the Express API, so content updates go live instantly.

What you can do now:
- Update hero voice, contact info, metrics, and welcome badges.
- Edit per-section copy (about, skills, contact) plus navigation/footer JSON.
- Manage every schema-less block (skills, about, navigation, footer) via JSON editors when you need total flexibility.
- Add, edit, or delete portfolio entries across any medium—video (YouTube/Vimeo/direct), articles, galleries, documents, stills, or pure text.
- Maintain client testimonials with quick add/remove actions.

> Tip: keep `FRONTEND_URL` on Render set to your live Vercel domain so the admin cookies stay valid across origins.
