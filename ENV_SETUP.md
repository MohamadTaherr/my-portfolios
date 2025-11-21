# Environment Variables Setup

This guide explains how to set up environment variables for Docker deployment with Coolify.

## Quick Setup

### Option 1: Use the Setup Script (Recommended)

**On Windows (PowerShell):**
```powershell
.\setup-env.ps1
```

**On Linux/Mac (Bash):**
```bash
chmod +x setup-env.sh
./setup-env.sh
```

This will create a `.env.production` file with your existing Render and Vercel environment variables.

### Option 2: Manual Setup

1. Copy the example file:
   ```bash
   cp .env.production.example .env.production
   ```

2. Edit `.env.production` and update with your values:
   ```env
   DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a/portfolio_db_efx6
   ADMIN_PASSWORD=admin
   NEXT_PUBLIC_API_URL=https://portfolio-backend-9i6h.onrender.com
   NEXT_PUBLIC_SITE_URL=https://my-portfolios-studio.vercel.app
   RESEND_API_KEY=re_gWVYE7BF_Gxz4cMUXc27pvgk8J33kSEvc
   CONTACT_EMAIL=anthonybechay1@gmail.com
   FRONTEND_URL=http://localhost:3000,https://my-portfolios-studio.vercel.app
   ```

## Your Current Environment Variables

Based on your Render and Vercel setup, here are your production values:

### Backend (Render)
- `DATABASE_URL`: `postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a/portfolio_db_efx6`
- `ADMIN_PASSWORD`: `admin`
- `FRONTEND_URL`: `http://localhost:3000,https://my-portfolios-studio.vercel.app`
- `PORT`: `10000`
- `NODE_ENV`: `production`
- `BACKEND_URL`: `https://portfolio-backend-9i6h.onrender.com`

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`: `https://portfolio-backend-9i6h.onrender.com`
- `NEXT_PUBLIC_SITE_URL`: `https://my-portfolios-studio.vercel.app`
- `RESEND_API_KEY`: `re_gWVYE7BF_Gxz4cMUXc27pvgk8J33kSEvc`
- `CONTACT_EMAIL`: `anthonybechay1@gmail.com`

## Using .env.production with Docker Compose

The `docker-compose.yml` file is configured to automatically load variables from `.env.production`:

```yaml
services:
  backend:
    env_file:
      - .env.production
  web:
    env_file:
      - .env.production
```

This means all variables in `.env.production` will be available to your containers.

## Git Strategy

### Option A: Commit .env.production (Your Preference)

If you want to commit `.env.production` to git:

1. Uncomment this line in `.gitignore`:
   ```
   !.env.production
   ```

2. Commit the file:
   ```bash
   git add .env.production
   git commit -m "Add production environment variables"
   ```

**Pros:**
- ✅ Variables are in code (as you prefer)
- ✅ Easy to track changes
- ✅ Works seamlessly with Coolify

**Cons:**
- ⚠️ Secrets are in git history (consider using a private repo)
- ⚠️ Anyone with repo access can see credentials

### Option B: Keep .env.production Gitignored

1. Keep `.env.production` in `.gitignore` (default)
2. Create the file on your server/Coolify
3. Or use Coolify's environment variable UI (but you prefer code)

**Pros:**
- ✅ More secure
- ✅ Secrets not in git

**Cons:**
- ❌ Need to manage separately on each deployment
- ❌ Not in code (doesn't match your preference)

## Coolify Deployment

### Method 1: Docker Compose with .env.production

1. **If committing .env.production:**
   - Push to GitHub
   - Coolify will pull the file automatically
   - Deploy using `docker-compose.yml`

2. **If NOT committing .env.production:**
   - Create `.env.production` file on your server
   - Or use Coolify's file manager to create it
   - Place it in the repository root
   - Deploy using `docker-compose.yml`

### Method 2: Individual Services

If deploying services separately in Coolify:

1. **Backend Service:**
   - Dockerfile: `apps/backend/Dockerfile`
   - Build context: `.` (root)
   - Environment: Load from `.env.production` or set in Coolify UI

2. **Web Service:**
   - Dockerfile: `apps/web/Dockerfile`
   - Build context: `.` (root)
   - Environment: Load from `.env.production` or set in Coolify UI

## Updating Environment Variables

To update variables:

1. Edit `.env.production`
2. If committed: `git commit -m "Update env vars" && git push`
3. If not committed: Update on server/Coolify
4. Restart services: `docker-compose restart` or redeploy in Coolify

## Database Configuration

You have two options for the database:

### Option 1: Use Your Existing Render Database (Current Setup)
```env
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a/portfolio_db_efx6
```

**Pros:**
- ✅ Keep existing data
- ✅ No migration needed
- ✅ Single source of truth

**Cons:**
- ⚠️ External dependency on Render
- ⚠️ Network latency

### Option 2: Use Docker Compose PostgreSQL
```env
DATABASE_URL=postgresql://portfolio:portfolio_password@postgres:5432/portfolio_db
```

**Pros:**
- ✅ Everything in one place
- ✅ Faster local network
- ✅ Full control

**Cons:**
- ❌ Need to migrate data
- ❌ Separate database instance

**Recommendation:** Start with Option 1 (existing Render DB), then migrate to Option 2 if you want everything self-contained.

## Security Best Practices

1. **If committing .env.production:**
   - Use a private GitHub repository
   - Rotate secrets periodically
   - Use different values for dev/staging/prod if possible

2. **Review access:**
   - Limit who can access the repository
   - Use branch protection rules
   - Consider using GitHub Secrets for CI/CD

3. **Monitor:**
   - Check git history for accidental commits
   - Use tools like `git-secrets` to prevent leaks

## Troubleshooting

### Variables Not Loading

Check that:
- `.env.production` exists in repository root
- File has correct format (no spaces around `=`)
- Docker Compose can read the file

### Database Connection Issues

If using Render database:
- Ensure your Hetzner server can reach Render (network/firewall)
- Check database credentials are correct
- Verify database is accessible from external IPs

### Frontend Can't Reach Backend

Update `NEXT_PUBLIC_API_URL` to match your deployment:
- If backend is on same server: `http://backend:10000` (internal) or `https://api.yourdomain.com` (external)
- If using Render backend: `https://portfolio-backend-9i6h.onrender.com`

## Next Steps

1. Run the setup script to create `.env.production`
2. Review and adjust values as needed
3. Decide on git strategy (commit or ignore)
4. Deploy to Coolify
5. Test the deployment
6. Update domain URLs if needed

