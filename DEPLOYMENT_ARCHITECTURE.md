# Deployment Architecture

## Infrastructure Overview

Your creative director portfolio uses a modern, scalable architecture with separate deployments for the frontend and CMS.

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOUR USERS                               │
│                    (Global Audience)                             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                           │
│                  (CDN + Edge Functions)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           Next.js App (apps/web)                       │    │
│  │                                                         │    │
│  │  • Static pages (SSG)                                  │    │
│  │  • Dynamic pages (SSR)                                 │    │
│  │  • API Routes                                          │    │
│  │  • Edge Runtime (OG Images)                            │    │
│  │  • Incremental Static Regeneration (10s)              │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────┬───────────────────────────┬────────────────────┬─┘
               │                           │                    │
               ▼                           ▼                    ▼
┌──────────────────────┐    ┌─────────────────────┐  ┌────────────────┐
│   SANITY.IO CMS      │    │   RESEND EMAIL API  │  │ VIMEO/YOUTUBE  │
│   (Content Lake)     │    │   (Contact Form)    │  │ (Video CDN)    │
│                      │    │                     │  │                │
│  • Projects          │    │  • Send emails      │  │  • Video       │
│  • Site Settings     │    │  • Contact form     │  │    embeds      │
│  • Images (CDN)      │    │                     │  │  • Streaming   │
│  • Scripts           │    │                     │  │                │
└──────────┬───────────┘    └─────────────────────┘  └────────────────┘
           │
           ▼
┌──────────────────────┐
│   SANITY STUDIO      │
│ (CMS Admin Panel)    │
│                      │
│  your-name.sanity    │
│     .studio          │
└──────────────────────┘
           ▲
           │
           │
┌──────────┴───────────┐
│   CONTENT EDITORS    │
│  (You / Your Team)   │
└──────────────────────┘
```

## Deployment Flow

### 1. Code Deployment (Vercel)

```
┌─────────────────┐
│  GitHub Repo    │
│  (git push)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel CI/CD   │
│                 │
│  1. Detect      │──► Root: apps/web
│     Push        │
│                 │
│  2. Install     │──► pnpm install --frozen-lockfile
│     Dependencies│
│                 │
│  3. Build       │──► pnpm turbo build --filter=web
│     Project     │
│                 │
│  4. Deploy      │──► Upload to Edge Network
│     to Edge     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Live Website   │
│  ✓ Deployed     │
└─────────────────┘
```

### 2. Content Deployment (Sanity)

```
┌─────────────────┐
│  Content Editor │
│  (Sanity Studio)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sanity API     │
│  (Content Lake) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel Site    │
│  (Auto Refresh) │──► ISR: 10 seconds
│  via ISR        │
└─────────────────┘
```

## File Structure in Deployment

### Monorepo Structure
```
my-portfolios/                      ← Git Repository Root
├── apps/
│   ├── web/                       ← Vercel deploys THIS
│   │   ├── .next/                ← Build output (git ignored)
│   │   ├── src/
│   │   │   ├── app/              ← Next.js App Router
│   │   │   ├── components/       ← React components
│   │   │   └── sanity/           ← Sanity integration
│   │   ├── public/               ← Static assets
│   │   ├── package.json
│   │   └── .env.local            ← Local dev only (git ignored)
│   │
│   └── studio/                    ← Deployed to Sanity separately
│       ├── schemaTypes/
│       ├── sanity.config.ts
│       └── package.json
│
├── packages/
│   └── sanity-client/            ← Shared code
│
├── package.json                   ← Root workspace config
├── pnpm-workspace.yaml           ← Defines workspaces
├── turbo.json                    ← Build orchestration
└── vercel.json                   ← Vercel config
```

### What Gets Deployed to Vercel

```
Deployed to Vercel Edge:
✓ apps/web/.next/              (optimized build)
✓ apps/web/public/             (static assets)
✓ Environment variables         (from dashboard)

NOT deployed:
✗ apps/studio/                 (separate deployment)
✗ .git/                        (source control only)
✗ node_modules/                (rebuilt on server)
✗ .env.local                   (use Vercel env vars)
```

## Data Flow

### Page Request Flow

```
User visits your-site.vercel.app
         │
         ▼
   ┌──────────┐
   │  Vercel  │
   │   Edge   │
   └────┬─────┘
        │
        ├─► Static page cached? ──Yes──► Serve from cache
        │                                 (instant)
        └─► No ──┐
                 │
                 ▼
           ┌──────────┐
           │ Next.js  │
           │  Server  │
           └────┬─────┘
                │
                ├─► Fetch from Sanity API
                │   (projects, content, images)
                │
                ├─► Generate page
                │
                ├─► Cache for 10 seconds (ISR)
                │
                └─► Return to user
```

### Content Update Flow

```
Editor updates content in Sanity Studio
         │
         ▼
    ┌─────────┐
    │ Sanity  │
    │   API   │
    └────┬────┘
         │
         ▼
    Wait max 10 seconds (ISR revalidation)
         │
         ▼
    ┌─────────┐
    │ Vercel  │
    │ detects │
    │ stale   │
    └────┬────┘
         │
         ▼
    Rebuild page on next request
         │
         ▼
    Updated content live!
```

## Environment Variables Flow

### Development (Local)
```
.env.local (apps/web/)
      │
      ▼
Next.js reads at build time
      │
      ▼
Available in app via process.env
```

### Production (Vercel)
```
Vercel Dashboard → Environment Variables
      │
      ▼
Injected at build time
      │
      ▼
Available in app via process.env
```

## Build Process Details

### Turbo Build Pipeline

```
pnpm turbo build --filter=web
         │
         ▼
    ┌─────────────────┐
    │  Turborepo      │
    │  Orchestrator   │
    └────┬────────────┘
         │
         ├─► 1. Check workspace dependencies
         │      (sanity-client package)
         │
         ├─► 2. Build dependencies first
         │      (if needed)
         │
         └─► 3. Build web app
                │
                ▼
           ┌────────────┐
           │  Next.js   │
           │   Build    │
           └─────┬──────┘
                 │
                 ├─► Compile TypeScript
                 │
                 ├─► Bundle JavaScript
                 │
                 ├─► Optimize images
                 │
                 ├─► Generate static pages
                 │
                 ├─► Create API routes
                 │
                 └─► Output to .next/
                         │
                         ▼
                    ✓ Build Complete
```

## Performance Optimizations

### Edge Network Caching

```
┌──────────────────────────────────────────────┐
│  Vercel Edge Network (Global CDN)           │
│                                              │
│  ┌────────────┐  ┌────────────┐            │
│  │ US East    │  │ EU West    │  ...        │
│  └────────────┘  └────────────┘            │
│                                              │
│  Cached Assets:                             │
│  • Static pages (1 year)                    │
│  • Images (optimized, auto-webp)            │
│  • JavaScript bundles                        │
│  • CSS files                                 │
│  • ISR pages (10 seconds)                   │
└──────────────────────────────────────────────┘
```

### ISR (Incremental Static Regeneration)

```
export const revalidate = 10; // seconds

┌─────────────────────────────────────┐
│  Time: 0s - Page generated         │
│  Cached for 10 seconds             │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Time: 0-10s - Serve from cache    │
│  (instant response)                 │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Time: 10s+ - First request:       │
│  • Serve stale cache               │
│  • Rebuild in background           │
│  • Update cache                     │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  New content now cached             │
│  Cycle repeats                      │
└─────────────────────────────────────┘
```

## Security Architecture

### API Protection

```
Public Routes (no auth needed):
  ✓ Homepage (/)
  ✓ Projects (/projects/[id])
  ✓ Static assets (/public/*)

Protected API Routes:
  ✓ /api/contact      → Rate limited
  ✓ /api/revalidate   → Secret token required
  ✓ /api/navigation   → Public (cached)

External APIs:
  ✓ Sanity API        → Project ID scoped
  ✓ Resend API        → API key secured
```

### Environment Security

```
Secrets Management:
  ✓ API keys → Vercel environment variables (encrypted)
  ✓ Tokens → Never in git repository
  ✓ CORS → Configured in Sanity dashboard
  ✓ Rate limiting → Contact form protected
```

## Monitoring & Analytics

### Built-in Analytics

```
┌─────────────────────────────────────┐
│  Vercel Analytics (automatic)      │
│  • Page views                       │
│  • Performance metrics              │
│  • Web Vitals                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Google Analytics (optional)       │
│  • Custom events                    │
│  • User behavior                    │
│  • Conversion tracking              │
└─────────────────────────────────────┘
```

## Scalability

### Auto-Scaling

```
Traffic: 10 users/min    → 1 instance
Traffic: 100 users/min   → Auto-scale up
Traffic: 1000 users/min  → Edge caching + multiple instances
Traffic: 10000 users/min → Full CDN distribution
```

### Cost Efficiency

```
Free Tier (Vercel):
  ✓ 100 GB bandwidth
  ✓ Unlimited sites
  ✓ Auto-scaling
  ✓ SSL certificates

Your Usage (estimated):
  ~1-5 GB/month (low traffic)
  Well within free tier
```

## Disaster Recovery

### Rollback Strategy

```
Deploy fails?
  → Automatic rollback to previous version
  → Zero downtime

Want to rollback manually?
  → Vercel Dashboard → Deployments
  → Click previous deployment
  → "Promote to Production"
```

### Data Backup

```
Sanity Content:
  ✓ Automatic versioning
  ✓ Full history
  ✓ One-click restore

Code:
  ✓ Git version control
  ✓ GitHub backup
  ✓ Vercel deployment history
```

---

## Summary

**Infrastructure**: Modern JAMstack architecture
**Hosting**: Vercel Edge Network (global CDN)
**CMS**: Sanity.io (headless CMS)
**Build**: Turborepo + Next.js 15
**Performance**: ISR + Edge caching
**Security**: Environment variables + CORS
**Scalability**: Auto-scaling serverless
**Cost**: Free tier (sufficient for portfolio)

**Status**: ✅ Production-Ready
