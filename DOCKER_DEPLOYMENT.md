# Docker Deployment Guide

This guide explains how to deploy the portfolio monorepo using Docker and Docker Compose.

## Architecture

The application consists of three main services:

1. **PostgreSQL Database** - Stores all application data
2. **Backend API** - Express.js server with Prisma ORM (Port 10000)
3. **Web Frontend** - Next.js application (Port 3000)

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git (for cloning the repository)

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd my-portfolios
```

### 2. Configure Environment Variables

**Option A: Use the setup script (Recommended)**

On Windows:
```powershell
.\setup-env.ps1
```

On Linux/Mac:
```bash
chmod +x setup-env.sh
./setup-env.sh
```

This creates `.env.production` with your existing Render and Vercel values.

**Option B: Manual setup**

Copy the example and edit:
```bash
cp .env.production.example .env.production
# Edit .env.production with your values
```

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions.

The `.env.production` file contains your production values:

```env
# Database (using your Render database)
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a/portfolio_db_efx6

# Backend
ADMIN_PASSWORD=admin
FRONTEND_URL=http://localhost:3000,https://my-portfolios-studio.vercel.app
BACKEND_URL=https://portfolio-backend-9i6h.onrender.com

# Frontend
NEXT_PUBLIC_API_URL=https://portfolio-backend-9i6h.onrender.com
NEXT_PUBLIC_SITE_URL=https://my-portfolios-studio.vercel.app

# Email (Resend)
RESEND_API_KEY=re_gWVYE7BF_Gxz4cMUXc27pvgk8J33kSEvc
CONTACT_EMAIL=anthonybechay1@gmail.com
```

**Note:** If you want to use a local PostgreSQL instead of Render's database, update `DATABASE_URL` to point to the local postgres service.

### 3. Build and Start Services

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 4. Initialize Database

After the services are running, initialize the database:

```bash
# Run Prisma migrations (if using new database)
docker-compose exec backend pnpm --filter backend run db:push

# Or if you have migrations
docker-compose exec backend pnpm --filter backend run db:migrate
```

**Note:** If you're using your existing Render database (as configured in `.env.production`), the database is already set up and you can skip this step.

## Deployment Options

### Option 1: Docker Compose (Recommended for Single Server)

Perfect for deploying on a single Hetzner server with Coolify.

**Pros:**
- Simple orchestration
- Easy to manage
- All services on one server
- Great for small to medium deployments
- Environment variables loaded from `.env.production` automatically

**Usage:**

**With external database (your current setup - using Render DB):**
```bash
docker-compose -f docker-compose.yml -f docker-compose.external-db.yml up -d
```

**With local PostgreSQL:**
```bash
docker-compose up -d
```

### Option 2: Individual Dockerfiles (For Coolify)

Coolify can deploy each service separately using the individual Dockerfiles:

- `apps/backend/Dockerfile` - Backend service
- `apps/web/Dockerfile` - Frontend service

**Setup in Coolify:**
1. Create a new application
2. Connect your GitHub repository
3. Set the Dockerfile path:
   - Backend: `apps/backend/Dockerfile`
   - Web: `apps/web/Dockerfile`
4. Configure environment variables
5. Set up a PostgreSQL database service separately

## Production Considerations

### 1. Reverse Proxy (Nginx/Traefik)

For production, use a reverse proxy in front of your services:

```nginx
# Example Nginx configuration
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:10000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 2. SSL/TLS Certificates

Use Let's Encrypt with Certbot or Coolify's built-in SSL management.

### 3. Database Backups

Set up regular backups for PostgreSQL:

```bash
# Backup script
docker-compose exec postgres pg_dump -U portfolio portfolio_db > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T postgres psql -U portfolio portfolio_db < backup_20240101.sql
```

### 4. Environment Variables

**Never commit `.env` files!** Use:
- Coolify's environment variable management
- Docker secrets for sensitive data
- External secret management services

### 5. Resource Limits

Add resource limits to `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

## Coolify Deployment Steps

### Method 1: Docker Compose in Coolify

1. In Coolify, create a new "Docker Compose" resource
2. Connect your GitHub repository
3. Set the compose file path: `docker-compose.yml`
4. Configure environment variables in Coolify's UI
5. Deploy!

### Method 2: Separate Services in Coolify

1. **Database Service:**
   - Create PostgreSQL service in Coolify
   - Note the connection string

2. **Backend Service:**
   - Create new application
   - Set Dockerfile path: `apps/backend/Dockerfile`
   - Set build context: `.` (root of repo)
   - Add environment variables
   - Set port: `10000`

3. **Web Service:**
   - Create new application
   - Set Dockerfile path: `apps/web/Dockerfile`
   - Set build context: `.` (root of repo)
   - Add environment variables
   - Set port: `3000`
   - Configure domain

## Monitoring and Maintenance

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f web
docker-compose logs -f postgres
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build
```

### Health Checks

All services include health checks. Monitor them:

```bash
# Check health status
docker-compose ps
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Test connection
docker-compose exec backend pnpm --filter backend run db:test
```

### Build Failures

```bash
# Clean build (no cache)
docker-compose build --no-cache

# Check build logs
docker-compose build backend 2>&1 | tee build.log
```

### Port Conflicts

If ports are already in use, update `.env`:

```env
BACKEND_PORT=10001
WEB_PORT=3001
POSTGRES_PORT=5433
```

## Security Best Practices

1. **Change default passwords** in production
2. **Use strong passwords** for database and admin
3. **Enable SSL/TLS** for all connections
4. **Restrict database access** to backend only
5. **Use secrets management** for sensitive data
6. **Keep images updated** regularly
7. **Monitor logs** for suspicious activity

## Scaling

For high traffic, consider:

1. **Horizontal scaling:** Run multiple backend instances behind a load balancer
2. **Database optimization:** Add read replicas, connection pooling
3. **CDN:** Use Cloudflare or similar for static assets
4. **Caching:** Implement Redis for session and data caching

## Support

For issues or questions:
- Check service logs: `docker-compose logs`
- Verify environment variables: `docker-compose config`
- Test individual services: `docker-compose exec <service> <command>`

