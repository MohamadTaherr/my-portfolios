# Portfolio Website

A modern, full-stack portfolio website built with Next.js and Express.js, deployed on Coolify.

## Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:10000
- Admin: http://localhost:3000/admin

### Deployment

1. Connect GitHub repo to Coolify
2. Set Docker Compose location: `/docker-compose.yml`
3. Add environment variables (see below)
4. Deploy

Database migrations run automatically on backend startup.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS 4 |
| Backend | Express.js 4, Prisma 5 |
| Database | PostgreSQL 16 |
| Storage | Backblaze B2 |
| Deployment | Docker Compose on Coolify |

## Project Structure

```
my-portfolios/
├── apps/
│   ├── backend/        # Express API (port 10000)
│   └── web/            # Next.js frontend (port 3000)
├── documents/          # Architecture and documentation
├── docker-compose.yml   # Docker orchestration
└── pnpm-workspace.yaml # Monorepo configuration
```

## Environment Variables

Required environment variables for Coolify deployment:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# App Configuration
NODE_ENV=production
PORT=10000
ADMIN_PASSWORD=your-secure-password
FRONTEND_URL=https://your-frontend-domain

# Frontend URLs (build-time)
NEXT_PUBLIC_API_URL=https://your-backend-domain
NEXT_PUBLIC_SITE_URL=https://your-frontend-domain

# Backblaze B2 Storage
BACKBLAZE_KEY_ID=your-key-id
BACKBLAZE_APPLICATION_KEY=your-application-key
BACKBLAZE_BUCKET_ID=your-bucket-id
BACKBLAZE_BUCKET_NAME=your-bucket-name

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Documentation

- **[Architecture Documentation](./documents/ARCHITECTURE.md)** - Complete system architecture, Docker setup, and design decisions
- **[Backblaze B2 Integration](./documents/BACKBLAZE_FLOW.md)** - File upload and retrieval flow

## Features

- ✅ Modern, responsive portfolio design
- ✅ Admin dashboard for content management
- ✅ File uploads to Backblaze B2
- ✅ Portfolio projects with media galleries
- ✅ Client testimonials and logos
- ✅ SEO optimized with structured data
- ✅ Analytics integration (Google Analytics)
- ✅ Docker containerization
- ✅ Automated database migrations

## License

Private project - All rights reserved
