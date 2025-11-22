# System Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [Docker Architecture](#docker-architecture)
3. [Application Architecture](#application-architecture)
4. [Technology Stack](#technology-stack)
5. [Data Flow](#data-flow)
6. [Deployment Architecture](#deployment-architecture)

---

## Overview

This is a full-stack portfolio website built as a monorepo with:
- **Frontend**: Next.js 15 (React 19) - Client-facing portfolio website
- **Backend**: Express.js API - Admin dashboard and data management
- **Database**: PostgreSQL - Stores portfolio items, clients, settings
- **Storage**: Backblaze B2 - File storage for images, videos, documents
- **Deployment**: Docker Compose on Coolify (Hetzner)

---

## Docker Architecture

### Overview

The application uses Docker containers orchestrated by Docker Compose. Each service has its own Dockerfile that defines how to build and run the application.

### 1. `docker-compose.yml` - Orchestrator

**Role**: Orchestrates multiple services (backend and web) to run together as a cohesive application.

**Key Responsibilities:**
- **Service Definition**: Defines `backend` and `web` services
- **Build Configuration**: Specifies which Dockerfile to use for each service
- **Environment Variables**: Injects environment variables from Coolify
- **Networking**: Connects services via the `coolify` network
- **Dependencies**: Ensures `web` waits for `backend` to be healthy
- **Health Checks**: Monitors service health and restarts if needed
- **Volumes**: Creates persistent storage (e.g., `backend_uploads`)

**Service Flow:**
```
┌─────────────┐
│   Coolify   │ (Deployment platform)
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ docker-compose.yml  │ (Orchestrator)
└──────┬──────────────┘
       │
       ├──► Backend Service (Port 10000)
       │    └──► Uses apps/backend/Dockerfile
       │
       └──► Web Service (Port 3000)
            └──► Uses apps/web/Dockerfile
```

**Configuration Details:**
- **Backend**: Exposes port 10000, connects to PostgreSQL, uses Backblaze B2
- **Web**: Exposes port 3000, depends on backend being healthy
- **Network**: Both services on `coolify` network for internal communication
- **Health Checks**: Backend checks `/health` endpoint, Web checks root `/`

---

### 2. `apps/backend/Dockerfile` - Backend Image Builder

**Role**: Builds the Express.js backend Docker image using multi-stage builds.

**Multi-Stage Build Process:**

#### Stage 1: `base` (Lines 2-11)
- **Base Image**: `node:20-alpine` (lightweight Linux)
- **Setup**: Enables pnpm package manager
- **Dependencies**: Installs ALL dependencies (including devDependencies needed for building)

#### Stage 2: `builder` (Lines 14-27)
- **Purpose**: Compiles TypeScript and generates Prisma client
- **Steps**:
  1. Copies Prisma schema first (needed for generation)
  2. Copies source code
  3. Generates Prisma client (`pnpm db:generate`)
  4. Compiles TypeScript to JavaScript (`pnpm build`)
- **Output**: Compiled code in `/app/apps/backend/dist`

#### Stage 3: `runner` (Lines 30-56) - Production Image
- **Base**: Fresh Alpine image (smaller, more secure)
- **Dependencies**: Only production dependencies
- **Files**: Copies built files from `builder` stage
- **Prisma**: Regenerates Prisma client for Alpine Linux runtime
- **Port**: Exposes port 10000
- **Command**: Runs `node apps/backend/dist/server.js`

**Why Multi-Stage?**
- ✅ **Smaller final image** (no dev dependencies, build tools, or source code)
- ✅ **Faster builds** (cached layers)
- ✅ **Better security** (minimal runtime surface)

---

### 3. `apps/web/Dockerfile` - Frontend Image Builder

**Role**: Builds the Next.js frontend Docker image.

**Multi-Stage Build Process:**

#### Stage 1: `base` (Lines 2-11)
- **Base Image**: `node:20-alpine`
- **Setup**: Enables pnpm
- **Dependencies**: Installs all dependencies

#### Stage 2: `builder` (Lines 14-31)
- **Build Args**: Accepts `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Environment**: Sets build-time environment variables (needed for Next.js build)
- **Build**: Runs `pnpm --filter web run build`
- **Output**: Next.js standalone build (optimized server bundle)

#### Stage 3: `runner` (Lines 34-51) - Production Image
- **Base**: Fresh Alpine image
- **Files Copied**:
  - `.next/standalone` (server code)
  - `.next/static` (static assets)
  - `public` (public files)
- **Security**: Runs as non-root user (`node`)
- **Port**: Exposes port 3000
- **Command**: Runs `node apps/web/server.js`

**Next.js Standalone Output:**
- Bundles all dependencies into a single output
- Creates a minimal server that doesn't require `node_modules`
- Significantly reduces image size

---

### How Docker Services Work Together

#### Build Time (Coolify Deployment):
```
1. Coolify reads docker-compose.yml
2. For each service:
   ├── Reads the Dockerfile path
   ├── Builds the Docker image using the Dockerfile
   ├── Passes build arguments (NEXT_PUBLIC_* for web)
   └── Creates the image
3. Images are ready to run
```

#### Runtime (Container Execution):
```
┌─────────────────────────────────────────┐
│         Coolify Network                 │
│                                         │
│  ┌──────────────┐    ┌──────────────┐ │
│  │   Backend    │◄───┤     Web       │ │
│  │  (Port 10000)│    │  (Port 3000)  │ │
│  │              │    │               │ │
│  │ - Express API│    │ - Next.js App │ │
│  │ - Prisma     │    │ - React UI    │ │
│  │ - Backblaze  │    │ - Calls API   │ │
│  └──────────────┘    └──────────────┘ │
│         │                    │          │
│         └────────┬───────────┘          │
│                  │                      │
│         ┌────────▼──────────┐          │
│         │  External Network  │          │
│         │  (Internet)        │          │
│         └───────────────────┘          │
└─────────────────────────────────────────┘
```

#### Service Communication:
1. **Web → Backend**: Frontend calls backend via `NEXT_PUBLIC_API_URL`
2. **Health Checks**: Web waits for backend to be healthy before starting
3. **Shared Network**: Both services on `coolify` network can communicate internally

---

### Key Differences: Backend vs Web Dockerfiles

| Aspect | Backend Dockerfile | Web Dockerfile |
|--------|-------------------|----------------|
| **Build Output** | TypeScript → JavaScript (`dist/`) | Next.js standalone build |
| **Runtime** | Node.js directly | Next.js server |
| **Prisma** | Generates client twice (build + runtime) | N/A |
| **Build Args** | None | `NEXT_PUBLIC_*` variables |
| **Port** | 10000 | 3000 |
| **Volumes** | `backend_uploads` (legacy, not used with Backblaze) | None |

---

## Application Architecture

### Frontend (Next.js)

**Location**: `apps/web/`

**Structure:**
```
apps/web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # Landing page
│   │   ├── admin/        # Admin dashboard
│   │   └── portfolio/    # Portfolio detail pages
│   ├── components/       # React components
│   │   ├── admin/        # Admin components
│   │   └── ...           # Client-facing components
│   └── lib/              # Utilities
│       ├── api.ts        # API client
│       └── image-utils.ts # Image helpers
└── public/               # Static assets
```

**Key Features:**
- **Server-Side Rendering (SSR)**: Pages are pre-rendered on the server
- **Static Generation**: Some pages are statically generated at build time
- **API Integration**: Calls backend API via `lib/api.ts`
- **Image Optimization**: Uses Next.js Image component with Backblaze support
- **Admin Dashboard**: Protected route for content management

**API Client** (`lib/api.ts`):
- Centralized API calls to backend
- Handles authentication cookies
- Upload functions for Backblaze integration

---

### Backend (Express.js)

**Location**: `apps/backend/`

**Structure:**
```
apps/backend/
├── src/
│   ├── server.ts         # Express app entry point
│   ├── routes/          # API routes
│   │   ├── admin.ts     # Admin endpoints
│   │   ├── public.ts    # Public endpoints
│   │   └── upload.ts    # File upload endpoints
│   ├── lib/             # Core libraries
│   │   ├── db.ts        # Prisma database client
│   │   ├── backblaze.ts # Backblaze B2 integration
│   │   └── auth.ts      # Authentication helpers
│   └── middleware/      # Express middleware
│       └── auth.ts      # Auth middleware
└── prisma/
    └── schema.prisma    # Database schema
```

**Key Features:**
- **RESTful API**: Express.js routes for CRUD operations
- **Authentication**: Cookie-based admin authentication
- **File Upload**: Backblaze B2 integration for file storage
- **Database**: Prisma ORM for PostgreSQL
- **CORS**: Configured for frontend communication

**API Routes:**
- `/api/admin/*` - Admin endpoints (protected)
- `/api/public/*` - Public endpoints (portfolio, clients, settings)
- `/api/admin/upload/*` - File upload endpoints

---

### Database (PostgreSQL)

**Schema Models:**
- `SiteSettings` - Site configuration (logo, profile, etc.)
- `PortfolioItem` - Portfolio projects
- `Client` - Client testimonials and logos
- `Category` - Portfolio categories
- `AnalyticsSettings` - Analytics configuration
- `PageContent`, `Skills`, `About`, `Navigation`, `Footer` - Content sections

**Prisma ORM:**
- Type-safe database access
- Migrations for schema changes
- Auto-generated TypeScript types

---

### Storage (Backblaze B2)

**File Organization:**
```
Backblaze B2 Bucket: myportfolioedmond
├── site/
│   ├── logo-{timestamp}.png
│   └── profile-{timestamp}.png
├── clients/
│   └── {clientId}/
│       └── logo-{timestamp}.png
└── portfolios/
    └── {portfolioId}/
        ├── media/
        ├── thumbnails/
        ├── gallery/
        └── documents/
```

**Integration:**
- Files uploaded via `/api/admin/upload/single` or `/multiple`
- URLs stored in database
- Direct access via public URLs (bucket must be public)
- Next.js Image component uses `unoptimized` prop for Backblaze URLs

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend Framework** | Next.js | 15 |
| **UI Library** | React | 19 |
| **Styling** | Tailwind CSS | 4 |
| **Backend Framework** | Express.js | 4 |
| **Database ORM** | Prisma | 5 |
| **Database** | PostgreSQL | 16 |
| **File Storage** | Backblaze B2 | - |
| **Package Manager** | pnpm | 9.15.0 |
| **Runtime** | Node.js | 20 |
| **Containerization** | Docker | - |
| **Orchestration** | Docker Compose | - |
| **Deployment** | Coolify | - |

---

## Data Flow

### 1. Admin Uploads File

```
Admin Dashboard
    ↓ (clicks upload)
Frontend (uploadFile)
    ↓ (POST /api/admin/upload/single)
Backend (upload.ts)
    ↓ (uploadToBackblaze)
Backblaze B2
    ↓ (returns URL)
Backend
    ↓ (returns JSON)
Frontend
    ↓ (stores in form state)
Admin saves form
    ↓ (POST /api/admin/portfolio)
Backend (admin.ts)
    ↓ (saves to database)
PostgreSQL
```

### 2. User Views Portfolio

```
User Browser
    ↓ (visits /portfolio/[id])
Next.js (SSR)
    ↓ (fetchAPI('/portfolio'))
Backend (public.ts)
    ↓ (Prisma query)
PostgreSQL
    ↓ (returns data with URLs)
Backend
    ↓ (returns JSON)
Next.js
    ↓ (renders page)
User Browser
    ↓ (loads images from Backblaze)
Backblaze B2
```

### 3. Authentication Flow

```
Admin Login
    ↓ (POST /api/admin/login)
Backend (auth.ts)
    ↓ (validates password)
Backend
    ↓ (sets HTTP-only cookie)
Frontend
    ↓ (stores in browser)
Subsequent Requests
    ↓ (cookie sent automatically)
Backend (checkAuth middleware)
    ↓ (validates cookie)
Backend
```

---

## Deployment Architecture

### Coolify Deployment

**Platform**: Coolify (self-hosted on Hetzner)

**Services:**
1. **Backend Container**
   - Runs Express.js API
   - Connects to PostgreSQL database
   - Handles file uploads to Backblaze
   - Health check: `/health` endpoint

2. **Web Container**
   - Runs Next.js application
   - Serves static assets
   - Calls backend API
   - Health check: root `/` endpoint

3. **PostgreSQL Database**
   - Managed by Coolify or external
   - Stores all application data
   - Prisma migrations run on backend startup

**Network:**
- Both containers on `coolify` network
- Internal communication via service names
- External access via Coolify reverse proxy

**Environment Variables:**
- Set in Coolify dashboard
- Passed to containers at runtime
- Build args for Next.js public variables

**Deployment Flow:**
```
Git Push
    ↓
Coolify Webhook
    ↓
Docker Build (docker-compose.yml)
    ↓
Image Creation
    ↓
Container Start
    ↓
Health Checks
    ↓
Traffic Routing
```

---

## Key Design Decisions

### 1. Monorepo Structure
- **Why**: Shared code, single deployment, easier development
- **Tools**: pnpm workspaces, Turbo (optional)

### 2. Multi-Stage Docker Builds
- **Why**: Smaller images, faster deployments, better security
- **Result**: Production images ~100-200MB vs ~1GB+ with dev tools

### 3. Backblaze B2 for Storage
- **Why**: Cost-effective, scalable, reliable
- **Alternative Considered**: Local storage (not scalable)

### 4. Prisma ORM
- **Why**: Type safety, migrations, developer experience
- **Alternative Considered**: Raw SQL (less type-safe)

### 5. Next.js Standalone Output
- **Why**: Smaller Docker images, faster cold starts
- **Alternative**: Full Next.js install (larger, slower)

### 6. Cookie-Based Authentication
- **Why**: Simple, secure (HTTP-only), no client-side token management
- **Alternative Considered**: JWT tokens (more complex)

---

## Performance Optimizations

1. **Next.js Image Optimization**: Optimized images with fallback for Backblaze
2. **Static Generation**: Pre-rendered pages where possible
3. **Docker Layer Caching**: Faster rebuilds
4. **Prisma Connection Pooling**: Efficient database connections
5. **Backblaze CDN**: Fast file delivery
6. **Alpine Linux**: Minimal base images for smaller containers

---

## Security Considerations

1. **HTTP-Only Cookies**: Prevents XSS attacks
2. **CORS Configuration**: Restricts API access to allowed origins
3. **Environment Variables**: Secrets stored in Coolify, not in code
4. **Non-Root Containers**: Web container runs as `node` user
5. **Input Validation**: File type checking, size limits
6. **Database Migrations**: Controlled schema changes

---

## Future Improvements

1. **Redis Caching**: Cache frequently accessed data
2. **CDN Integration**: Cloudflare or similar for static assets
3. **Database Replication**: Read replicas for scaling
4. **Monitoring**: Application performance monitoring (APM)
5. **CI/CD Pipeline**: Automated testing and deployment
6. **Backup Strategy**: Automated database and file backups

---

## Related Documentation

- [Backblaze B2 Integration](./BACKBLAZE_FLOW.md) - Detailed file upload/retrieval flow
- [README.md](../README.md) - Quick start and deployment guide

