# Quick Start: Docker Deployment

This is a quick reference for deploying your portfolio app with Docker and Coolify.

## ✅ What's Already Set Up

- ✅ `.env.production` file created with your Render/Vercel values
- ✅ `docker-compose.yml` configured to load from `.env.production`
- ✅ Dockerfiles for backend and web services
- ✅ All environment variables from your existing deployment

## 🚀 Deploy to Coolify

### Step 1: Commit .env.production (Optional)

If you want environment variables in code (your preference):

1. Uncomment this line in `.gitignore`:
   ```
   !.env.production
   ```

2. Commit the file:
   ```bash
   git add .env.production .gitignore
   git commit -m "Add production environment variables"
   git push
   ```

**OR** keep it gitignored and create it manually on Coolify.

### Step 2: Deploy in Coolify

**Option A: Docker Compose (Recommended)**

1. In Coolify, create a new **Docker Compose** resource
2. Connect your GitHub repository
3. Set compose file: `docker-compose.yml`
4. If using external database (Render), also add: `docker-compose.external-db.yml`
5. Deploy!

**Option B: Individual Services**

1. **Backend:**
   - Create new application
   - Dockerfile: `apps/backend/Dockerfile`
   - Build context: `.` (root)
   - Port: `10000`

2. **Web:**
   - Create new application  
   - Dockerfile: `apps/web/Dockerfile`
   - Build context: `.` (root)
   - Port: `3000`

## 📋 Your Environment Variables

All variables are in `.env.production`:

- **Database:** Your Render PostgreSQL (already configured)
- **Backend:** Port 10000, admin password: `admin`
- **Frontend:** Points to Render backend
- **Email:** Resend API key configured

## 🔧 Using External Database (Your Current Setup)

Since you're using Render's database, use:

```bash
docker-compose -f docker-compose.yml -f docker-compose.external-db.yml up -d
```

This skips the local postgres service and uses your Render database.

## 🧪 Test Locally First

```bash
# Start services
docker-compose -f docker-compose.yml -f docker-compose.external-db.yml up -d

# Check logs
docker-compose logs -f

# Check health
curl http://localhost:10000/health  # Backend
curl http://localhost:3000          # Web
```

## 📝 Next Steps

1. ✅ `.env.production` is ready
2. ✅ Docker files are configured
3. ⏭️ Push to GitHub
4. ⏭️ Deploy in Coolify
5. ⏭️ Update domain URLs if needed

## 🔗 Important URLs

- **Backend API:** `https://portfolio-backend-9i6h.onrender.com`
- **Frontend:** `https://my-portfolios-studio.vercel.app`
- **Database:** Render PostgreSQL (external)

## ❓ Need Help?

- See [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) for detailed guide
- See [ENV_SETUP.md](./ENV_SETUP.md) for environment variable details

