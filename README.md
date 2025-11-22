# Portfolio Website

Monorepo portfolio with Express backend and Next.js frontend, deployed on Coolify.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS 4 |
| Backend | Express.js 4, Prisma 5 |
| Database | PostgreSQL 16 |
| Storage | Backblaze B2 (optional) |
| Deployment | Docker Compose on Coolify |

## Project Structure

```
my-portfolios/
├── apps/
│   ├── backend/        # Express API (port 10000)
│   └── web/            # Next.js frontend (port 3000)
├── docker-compose.yml
└── pnpm-workspace.yaml
```

## Environment Variables (Coolify)

Copy-paste into Coolify's **Bulk Edit**:

```env
# Database
DATABASE_URL=postgresql://portfolio:portfolio_password@postgres:5432/portfolio_db
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=portfolio_password
POSTGRES_DB=portfolio_db

# App
NODE_ENV=production
PORT=10000
ADMIN_PASSWORD=your-secure-password

# URLs (use your Coolify domains)
NEXT_PUBLIC_API_URL=https://your-backend-domain
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain

# Backblaze B2 (optional)
BACKBLAZE_KEY_ID=
BACKBLAZE_APPLICATION_KEY=
BACKBLAZE_BUCKET_ID=
BACKBLAZE_BUCKET_NAME=

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Deployment

1. Connect GitHub repo to Coolify
2. Set Docker Compose location: `/docker-compose.yml`
3. Add environment variables
4. Deploy

Database migrations run automatically on backend startup.

## Local Development

```bash
pnpm install
pnpm dev
```
