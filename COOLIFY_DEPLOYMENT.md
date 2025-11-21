# Coolify Deployment Guide

This guide is specific to deploying your portfolio app on Coolify with Hetzner.

## ✅ Current Configuration

- **Database:** Coolify PostgreSQL service
- **Connection String:** Configured in `.env.production`
- **Backend:** Express.js API (Port 10000)
- **Frontend:** Next.js (Port 3000)

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit `.env.production`** (if you want variables in code):
   ```bash
   # Uncomment !.env.production in .gitignore if needed
   git add .env.production
   git commit -m "Add production environment variables with Coolify database"
   git push
   ```

2. **Or keep it gitignored** and create it manually in Coolify's file manager.

### Step 2: Deploy in Coolify

#### Option A: Docker Compose (Recommended)

1. In Coolify dashboard, create a new **Docker Compose** resource
2. Connect your GitHub repository
3. Set the compose file path: `docker-compose.yml`
4. **Important:** Also add override file: `docker-compose.external-db.yml`
   - This ensures the local postgres service is disabled
   - Your backend will use the Coolify database from `.env.production`
5. Deploy!

#### Option B: Individual Services

**Backend Service:**
1. Create new application in Coolify
2. Connect GitHub repository
3. Set Dockerfile path: `apps/backend/Dockerfile`
4. Set build context: `.` (root directory)
5. Port: `10000`
6. Environment variables: Will load from `.env.production` if present, or set manually:
   ```
   DATABASE_URL=postgresql://postgres:tOqKMrnDmBd1UQN1Q6c34KZ3FMGJs0FstEATDS7FHJd6BiLyRnrFsfDfq33dPVrs@p4wows8skoks8kkksggg8gwk:5432/skirkportfolio
   NODE_ENV=production
   PORT=10000
   ADMIN_PASSWORD=admin
   FRONTEND_URL=https://yourdomain.com
   ```

**Web Service:**
1. Create new application in Coolify
2. Connect GitHub repository
3. Set Dockerfile path: `apps/web/Dockerfile`
4. Set build context: `.` (root directory)
5. Port: `3000`
6. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   NEXT_PUBLIC_SITE_URL=https://your-frontend-domain.com
   RESEND_API_KEY=re_gWVYE7BF_Gxz4cMUXc27pvgk8J33kSEvc
   CONTACT_EMAIL=anthonybechay1@gmail.com
   ```

### Step 3: Initialize Database

After deployment, initialize the database schema:

```bash
# If using Docker Compose
docker-compose exec backend pnpm --filter backend run db:push

# Or via Coolify's terminal/exec feature
# Navigate to backend container and run:
pnpm --filter backend run db:push
```

This will create all the necessary tables in your Coolify PostgreSQL database.

## 🔧 Database Configuration

Your `.env.production` file contains:

```env
DATABASE_URL=postgresql://postgres:tOqKMrnDmBd1UQN1Q6c34KZ3FMGJs0FstEATDS7FHJd6BiLyRnrFsfDfq33dPVrs@p4wows8skoks8kkksggg8gwk:5432/skirkportfolio
```

This connects to your Coolify PostgreSQL service. The backend will automatically use this connection string.

## 🌐 Domain Configuration

After deployment, update these URLs in `.env.production`:

1. **Backend URL:** Update `BACKEND_URL` to your Coolify backend domain
2. **Frontend URL:** Update `FRONTEND_URL` and `NEXT_PUBLIC_SITE_URL` to your Coolify frontend domain
3. **API URL:** Update `NEXT_PUBLIC_API_URL` to point to your backend domain

Example:
```env
BACKEND_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🔍 Verification

After deployment, verify everything works:

1. **Backend Health Check:**
   ```bash
   curl https://your-backend-domain.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend:**
   Visit your frontend domain - should load the portfolio site

3. **Database Connection:**
   Check backend logs in Coolify for any database connection errors

## 📝 Important Notes

1. **Database:** Using Coolify PostgreSQL service (not local postgres container)
2. **Environment Variables:** All in `.env.production` file
3. **CORS:** Make sure `FRONTEND_URL` includes your actual frontend domain
4. **Ports:** Backend on 10000, Frontend on 3000 (Coolify handles external ports)

## 🐛 Troubleshooting

### Database Connection Issues

- Verify the `DATABASE_URL` is correct in `.env.production`
- Check that the Coolify database service is running
- Ensure network connectivity between services

### Backend Can't Connect to Database

- Check if database hostname is accessible from backend container
- Verify credentials in connection string
- Check Coolify database service logs

### Frontend Can't Reach Backend

- Update `NEXT_PUBLIC_API_URL` to your backend domain
- Check CORS settings in backend (`FRONTEND_URL` env var)
- Verify backend is accessible from browser

### Prisma Schema Not Applied

Run database migration:
```bash
docker-compose exec backend pnpm --filter backend run db:push
```

## 🔄 Updating Environment Variables

1. Edit `.env.production` locally
2. Commit and push (if committed to git)
3. Or update in Coolify's file manager
4. Redeploy services in Coolify

## 📚 Additional Resources

- [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) - General Docker deployment guide
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variable details
- [QUICK_START_DOCKER.md](./QUICK_START_DOCKER.md) - Quick reference

