# Deployment Guide - Creative Director Portfolio

## Prerequisites

Before deploying, ensure you have:

1. **Sanity.io Project**
   - Create a project at https://www.sanity.io/manage
   - Note your Project ID and Dataset name

2. **Resend API Key** (for contact form)
   - Sign up at https://resend.com
   - Create an API key

3. **Vercel Account** (recommended hosting)
   - Sign up at https://vercel.com

## Environment Variables

### Required Variables

Configure these in your Vercel project settings or `.env.local` for local development:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-16

# Email Configuration (Resend)
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your@email.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional Variables

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sanity API Token (optional, for authenticated requests)
SANITY_API_TOKEN=your_token_here

# Revalidation Secret (optional, for on-demand revalidation)
SANITY_REVALIDATE_SECRET=your_secret_here
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build --filter=web`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `pnpm install`

5. Add environment variables in project settings
6. Deploy!

## Sanity Studio Deployment

Deploy your Sanity Studio so you can edit content from anywhere:

```bash
# Navigate to studio directory
cd apps/studio

# Deploy to Sanity
pnpm sanity deploy

# Choose a unique studio hostname (e.g., your-name-portfolio)
# Your studio will be available at https://your-name-portfolio.sanity.studio
```

## Post-Deployment Checklist

- [ ] Verify all environment variables are set correctly
- [ ] Test contact form functionality
- [ ] Upload video projects with Vimeo/YouTube links
- [ ] Check OG images appear correctly on social media
- [ ] Test all navigation and links
- [ ] Verify mobile responsiveness
- [ ] Configure custom domain (if applicable)
- [ ] Set up CORS in Sanity dashboard:
  - Go to https://www.sanity.io/manage
  - Select your project
  - Navigate to API settings
  - Add your domains to CORS origins

## Video Integration

The portfolio now supports multiple video sources:

### Supported Video Formats

1. **Vimeo** (Recommended)
   - Example: `https://vimeo.com/123456789`
   - Example: `https://player.vimeo.com/video/123456789`

2. **YouTube**
   - Example: `https://www.youtube.com/watch?v=xxxxx`
   - Example: `https://youtu.be/xxxxx`

3. **Direct Video Files**
   - Example: `https://your-cdn.com/video.mp4`
   - Supported formats: MP4, WebM

### Adding Videos in Sanity

1. Go to your Sanity Studio
2. Create a new Video Project
3. Fill in all required fields:
   - Title, Description, Client
   - Category (fully customizable via Project Categories)
   - Upload thumbnail image
   - Add video URL (Vimeo, YouTube, or direct link)
4. Publish!

## Managing Categories

Project categories are now fully editable through Sanity:

1. In Sanity Studio, go to "Project Categories"
2. Add, edit, or reorder categories
3. Changes appear immediately in the website

## Troubleshooting

### Build Fails

- Check all environment variables are set
- Ensure Sanity Project ID and Dataset are correct
- Verify Node.js version >= 18

### Contact Form Not Working

- Verify `RESEND_API_KEY` is set correctly
- Check `CONTACT_EMAIL` is a valid email address
- Review Resend dashboard for error logs

### Videos Not Playing

- For Vimeo: Ensure video privacy settings allow embedding
- For YouTube: Check video is not private/restricted
- For direct videos: Verify CORS headers allow your domain

### Content Not Updating

- Check ISR revalidation settings (default: 10 seconds)
- Clear Vercel deployment cache
- Verify Sanity dataset name matches environment variable

## Performance Optimization

The site is already optimized with:

- ✅ Image optimization via Sanity CDN
- ✅ ISR (Incremental Static Regeneration)
- ✅ Turbopack for faster builds
- ✅ Vercel Analytics integration
- ✅ Proper SEO metadata and OG images

## Support

For issues or questions:

1. Check existing documentation files
2. Review Sanity docs: https://www.sanity.io/docs
3. Review Next.js docs: https://nextjs.org/docs
4. Review Vercel docs: https://vercel.com/docs

---

**Built with:**
- Next.js 15.5.6
- Sanity.io v4
- Turborepo
- Vercel Analytics
- Resend Email API
