# Content Update Guide

## How Your Website Updates

Your website uses **Incremental Static Regeneration (ISR)** - a simple, automatic way to update content without webhooks.

### How It Works

1. **Add content** in Sanity Studio (http://localhost:3333)
2. **Publish** it
3. **Wait 10 seconds** - your production site automatically checks for updates
4. **Done!** - next visitor sees the new content

**No webhook needed. No manual deployment needed.**

---

## Quick Start

### Add Video Projects

1. Go to http://localhost:3333
2. Click **"Video Project"** → **"Create"**
3. Fill in the form:
   - Title, Description, Client
   - Category, Duration, Year
   - Upload thumbnail image
   - Add video URL (optional)
   - Add tags
4. Click **"Publish"**
5. Wait 10 seconds, then check your live site!

### Add Scripts

1. Go to http://localhost:3333
2. Click **"Script"** → **"Create"**
3. Fill in:
   - Title, Type, Client
   - Duration, Year, Word Count
   - Description, Script Excerpt
   - Add tags
4. Click **"Publish"**
5. Wait 10 seconds, then check your live site!

---

## Alternative Update Methods

### Option 1: Instant Updates (Already Set Up!)
**Current method - Automatic every 10 seconds**
- No action needed
- Content appears within 10 seconds
- Reliable and simple

### Option 2: Manual Deployment
If you want instant updates, redeploy:
```bash
git add .
git commit -m "update: new content added"
git push
```
Vercel rebuilds automatically in ~2 minutes.

### Option 3: Setup Webhook (Advanced)
See main README for webhook setup instructions if you need instant updates.

---

## Troubleshooting

### "My content isn't showing up"

1. **Check you published** (not just saved as draft)
2. **Wait 10 seconds** and hard refresh (Ctrl+Shift+R)
3. **Check your production site** (not localhost:3000)
4. **Clear your browser cache** if still not showing

### "Content shows on localhost but not production"

Your production site needs to be redeployed:
```bash
git push
```

---

## Environment Setup

### Required Environment Variables (Vercel)

Make sure these are set in Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=tvx7pk8u
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-21
```

---

## Studio Access

**Local Studio:** http://localhost:3333
**Cloud Studio:** https://www.sanity.io/manage (select project: tvx7pk8u)

Run studio locally:
```bash
pnpm dev:studio
```

Run website locally:
```bash
pnpm dev
```

Run both together:
```bash
pnpm dev:all
```

---

## Summary

✅ **ISR updates every 10 seconds automatically**
✅ **No webhooks needed**
✅ **No manual deployment needed**
✅ **Simple and reliable**

Just publish in Sanity Studio and wait 10 seconds! 🚀
