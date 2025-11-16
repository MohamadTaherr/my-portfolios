# Vercel Dashboard Configuration Guide

## Complete Step-by-Step Setup

### Step 1: Import Your Repository

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository from GitHub/GitLab/Bitbucket
4. Click "Import"

---

## Step 2: Configure Project Settings

### Framework Preset
```
Next.js
```
*Vercel will auto-detect this, but confirm it's set to Next.js*

---

### Root Directory
```
apps/web
```
**IMPORTANT**: Set this to `apps/web` - this tells Vercel where your Next.js app is located in the monorepo.

---

### Build and Output Settings

#### Build Command
```
cd ../.. && pnpm turbo build --filter=web
```
*This is already in vercel.json, but you can override here if needed*

OR simply leave as **default** and let vercel.json handle it.

#### Output Directory
```
.next
```
*Relative to Root Directory (apps/web), so the full path is apps/web/.next*

#### Install Command
```
pnpm install --frozen-lockfile
```
*This is already in vercel.json*

---

### Node.js Version
```
20.x
```
*Use the latest LTS version*

---

## Step 3: Environment Variables

Click "Environment Variables" and add the following:

### Required Variables

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `tvx7pk8u` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-10-21` | Production, Preview, Development |
| `RESEND_API_KEY` | `re_gWVYE7BF_Gxz4cMUXc27pvgk8J33kSEvc` | Production, Preview, Development |
| `CONTACT_EMAIL` | `mohamad7taher@gmail.com` | Production, Preview, Development |
| `SANITY_REVALIDATE_SECRET` | `my-super-secret-revalidate-token-12345` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production, Preview, Development |

**Note**: After deployment, update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL.

### Optional Variables

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production |
| `SANITY_API_TOKEN` | (if needed for auth) | Production |

---

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. You'll get a deployment URL like `https://your-project.vercel.app`

---

## Step 5: Post-Deployment Configuration

### Update Site URL
1. Copy your deployment URL from Vercel
2. Go to Project Settings → Environment Variables
3. Update `NEXT_PUBLIC_SITE_URL` to your actual URL
4. Redeploy the project

### Configure Sanity CORS
1. Go to https://www.sanity.io/manage
2. Select your project `tvx7pk8u`
3. Navigate to **API** → **CORS Origins**
4. Click **"Add CORS Origin"**
5. Add your Vercel URL: `https://your-project.vercel.app`
6. Check: "Allow credentials"
7. Save

### Configure Custom Domain (Optional)
1. In Vercel project settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable
5. Update Sanity CORS origins with new domain

---

## Alternative: Deploy via Vercel CLI

If you prefer command-line deployment:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to project root
cd /path/to/my-portfolios

# Link to Vercel project (first time only)
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add NEXT_PUBLIC_SANITY_API_VERSION
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel env add SANITY_REVALIDATE_SECRET
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy to production
vercel --prod
```

---

## Troubleshooting

### Build Fails with "Module not found"
**Solution**: Ensure Root Directory is set to `apps/web`

### "Missing environment variable" error
**Solution**: Double-check all environment variables are added in Vercel dashboard

### CSS not loading
**Solution**: Clear deployment cache and redeploy
```bash
vercel --prod --force
```

### Contact form not working
**Solution**:
1. Verify `RESEND_API_KEY` is correct
2. Check Resend dashboard for error logs
3. Ensure `CONTACT_EMAIL` is valid

### Videos not playing
**Solution**:
1. Check video privacy settings on Vimeo/YouTube
2. Ensure URLs are publicly accessible
3. Verify CORS settings

---

## Verification Checklist

After deployment, verify:

- [ ] Home page loads correctly
- [ ] Navigation works (all sections scroll)
- [ ] Contact form submits successfully
- [ ] Video projects display with thumbnails
- [ ] Video player works (click to play)
- [ ] Project detail pages load
- [ ] OG images appear when shared on social media
- [ ] Responsive design works on mobile
- [ ] Sanity Studio is accessible at https://your-studio-name.sanity.studio

---

## Monorepo Structure Summary

Your project structure:
```
my-portfolios/                    ← Git repository root
├── apps/
│   ├── web/                     ← Root Directory in Vercel
│   │   ├── .next/              ← Output Directory
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── next.config.ts
│   └── studio/                  ← Separate Sanity deployment
├── packages/
│   └── sanity-client/
├── package.json                 ← Workspace root
├── pnpm-workspace.yaml
├── turbo.json                   ← Build orchestration
└── vercel.json                  ← Vercel configuration
```

**Key Point**: Vercel deploys only the `apps/web` app, while the studio is deployed separately to Sanity.

---

## Quick Reference: Vercel Dashboard Settings

```
Framework Preset:     Next.js
Root Directory:       apps/web
Build Command:        (use vercel.json default)
Output Directory:     .next
Install Command:      (use vercel.json default)
Node.js Version:      20.x
```

**Environment Variables**: Add all 7 variables listed above

---

## Expected Build Output

A successful build should show:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (11/11)
✓ Finalizing page optimization
✓ Collecting build traces

Build completed in ~2-3 minutes
```

---

## Production URL

After deployment, your site will be available at:
- `https://[project-name].vercel.app` (auto-generated)
- `https://[custom-domain]` (if configured)

Sanity Studio remains at:
- `https://[studio-name].sanity.studio`

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review this guide
3. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
4. Vercel Support: https://vercel.com/support

---

**Ready to Deploy!** 🚀

Follow the steps above and your portfolio will be live in minutes.
