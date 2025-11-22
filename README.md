# Portfolio Website

A monorepo portfolio website with Express backend and Next.js frontend, deployed on Hetzner using Coolify.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS 4, TypeScript |
| Backend | Express.js 4, Prisma 5, TypeScript |
| Database | PostgreSQL 16 (Coolify managed) |
| Storage | Backblaze B2 (optional) |
| Monorepo | Turborepo, pnpm workspaces |
| Deployment | Docker Compose on Coolify (Hetzner) |

## Project Structure

```
my-portfolios/
├── apps/
│   ├── backend/        # Express API (port 10000)
│   │   ├── src/
│   │   ├── prisma/
│   │   └── Dockerfile
│   └── web/            # Next.js frontend (port 3000)
│       ├── src/
│       └── Dockerfile
├── docker-compose.yml  # Production deployment
├── turbo.json
└── pnpm-workspace.yaml
```

## Environment Variables

All variables are set once in Coolify's **Bulk Edit** panel. Copy-paste the block below:

```env
# Required
DATABASE_URL=postgresql://user:password@db-container:5432/dbname
ADMIN_PASSWORD=your-secure-admin-password
SITE_URL=https://your-frontend-domain.com
API_URL=https://your-backend-domain.com

# Optional - Backblaze B2 Storage
BACKBLAZE_KEY_ID=
BACKBLAZE_APPLICATION_KEY=
BACKBLAZE_BUCKET_ID=
BACKBLAZE_BUCKET_NAME=

# Optional - Google Analytics
GA_MEASUREMENT_ID=
```

### Variable Reference

| Variable | Used By | Description |
|----------|---------|-------------|
| `DATABASE_URL` | Backend | PostgreSQL connection string from Coolify DB service |
| `ADMIN_PASSWORD` | Backend | Password for admin panel authentication |
| `SITE_URL` | Both | Your frontend domain (used for CORS + SEO) |
| `API_URL` | Frontend | Your backend domain (API calls) |
| `BACKBLAZE_*` | Backend | B2 storage credentials (optional, for file uploads) |
| `GA_MEASUREMENT_ID` | Frontend | Google Analytics tracking ID (optional) |

## Deployment (Coolify)

### 1. Create PostgreSQL Database

In Coolify, create a PostgreSQL service. Note the container name for `DATABASE_URL`.

### 2. Create Docker Compose Resource

- **Repository:** Connect your GitHub repo
- **Base Directory:** `/`
- **Docker Compose Location:** `/docker-compose.yml`

### 3. Set Environment Variables

Go to **Environment Variables** → **Bulk Edit** and paste your variables.

### 4. Deploy

Push to GitHub. Coolify builds and deploys automatically.

The backend runs `prisma db push` on every startup—no manual migration needed.

## Local Development

```bash
# Install dependencies
pnpm install

# Start both services
pnpm dev

# Or individually
pnpm dev:web      # Frontend on :3000
pnpm dev:backend  # Backend on :10000
```

## Database Commands

```bash
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Prisma Studio (local only)
```

## Architecture

```
┌─────────────────────────────────────┐
│            Coolify (Hetzner)        │
├─────────────────────────────────────┤
│  ┌─────────┐      ┌─────────────┐   │
│  │   Web   │ ───► │   Backend   │   │
│  │  :3000  │      │   :10000    │   │
│  └─────────┘      └──────┬──────┘   │
│                          │          │
│                   ┌──────▼──────┐   │
│                   │  PostgreSQL │   │
│                   │   (Coolify) │   │
│                   └─────────────┘   │
└─────────────────────────────────────┘
```

## Troubleshooting

**Container fails to start:**
- Check `DATABASE_URL` points to correct Coolify DB container name
- Verify all required env vars are set

**CORS errors:**
- Ensure `SITE_URL` matches your actual frontend domain exactly

**Build fails:**
- Check Coolify build logs for specific errors
- Verify Dockerfiles exist at `apps/backend/Dockerfile` and `apps/web/Dockerfile`

**Database migrations fail:**
- Check PostgreSQL service is running in Coolify
- Verify `DATABASE_URL` credentials are correct
