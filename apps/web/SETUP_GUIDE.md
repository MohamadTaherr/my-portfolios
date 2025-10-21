# Portfolio Website - Complete Setup Guide

## Overview
This is a professional portfolio website for Edmond Haddad, built with Next.js 15, TypeScript, Tailwind CSS, and Sanity CMS.

**Status:** Fully functional with all critical features implemented ✅

---

## What's Been Implemented

### ✅ Core Features
- **Responsive Portfolio Website** - Works perfectly on mobile, tablet, and desktop
- **Dark/Light Mode** - Complete theme switching with localStorage persistence
- **Video Production Portfolio** - Dynamic gallery with category filtering
- **Scriptwriting Portfolio** - Script showcase with filtering
- **Skills Section** - Visual skill display with progress bars
- **Contact Form** - **FUNCTIONAL** - Sends real emails via Resend
- **Project Detail Pages** - Individual pages for each video project
- **CMS Integration** - Full Sanity CMS backend for easy content management

### ✅ SEO & Analytics
- **robots.txt** - Search engine crawling configuration
- **sitemap.xml** - Dynamic sitemap generation
- **Meta Tags** - Complete Open Graph and Twitter Card support
- **Structured Data** - JSON-LD for better search results
- **Google Analytics** - GA4 integration (optional)
- **Vercel Analytics** - Built-in analytics (works automatically on Vercel)

### ✅ Backend Functionality
- **Email Service** - Contact form sends emails via Resend API
- **API Routes** - `/api/contact` endpoint for form submissions
- **Data Fetching** - Dynamic content from Sanity CMS
- **Error Handling** - Proper error states and user feedback

---

## Required Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Then update the following variables in `.env.local`:

#### **Sanity CMS** (Required)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-21
```

Get these from: https://www.sanity.io/manage

#### **Email Service** (Required for contact form)
```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your@email.com
```

Setup Resend:
1. Sign up at https://resend.com (FREE - 100 emails/day)
2. Get API key from dashboard
3. Add your email where you want to receive messages

See `CONTACT_SETUP.md` for detailed instructions.

#### **Site URL** (Required for SEO)
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

#### **Google Analytics** (Optional)
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Get from: https://analytics.google.com

### 3. Configure Sanity Studio

1. Go to your Sanity project at https://www.sanity.io/manage
2. Add your deployment URL to CORS origins
3. Add content in Sanity Studio:
   - **Site Settings** - Your name, bio, contact info, social links
   - **Video Projects** - Add your video portfolio
   - **Scripts** - Add your scriptwriting work

To run Sanity Studio locally:
```bash
npm run dev
```
Then visit: http://localhost:3000/studio

### 4. Update Content in Sanity

Make sure to add in Sanity Studio:
- ✅ Site Settings (name, email, phone, location, social links)
- ✅ At least one Video Project
- ✅ At least one Script
- ✅ Profile image
- ✅ Stats (years of experience, projects completed, etc.)

### 5. Create Open Graph Image (Optional but recommended)

Create an image at `public/og-image.jpg`:
- Size: 1200x630 pixels
- Use your branding/headshot
- This appears when sharing on social media

---

## Running the Website

### Development Mode
```bash
npm run dev
```
Visit: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - All variables from `.env.local`
5. Deploy!

Vercel Analytics will work automatically (no setup needed).

### Update robots.txt Before Deploying

In `public/robots.txt`, replace `https://yourdomain.com` with your actual domain.

---

## Features Guide

### Contact Form
- **Status:** ✅ FUNCTIONAL
- Sends emails via Resend
- Form validation
- Success/error messages
- Anti-spam protection

**To test:**
1. Make sure `RESEND_API_KEY` and `CONTACT_EMAIL` are set in `.env.local`
2. Fill out the contact form
3. Check your email inbox

### Project Detail Pages
- **Status:** ✅ FUNCTIONAL
- URL: `/projects/[id]`
- Shows full project details
- Video player
- Related projects
- Responsive design

**To access:**
Click "Details" button on any video project card.

### SEO Features
- **Status:** ✅ COMPLETE
- Meta tags for all pages
- Open Graph for social sharing
- Twitter Cards
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt configuration

**To verify:**
- Check page source for meta tags
- Use https://cards-dev.twitter.com/validator for Twitter
- Use https://www.opengraph.xyz for Open Graph
- Check `https://yourdomain.com/sitemap.xml`

### Analytics
- **Google Analytics 4:** Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to enable
- **Vercel Analytics:** Works automatically on Vercel
- **Custom Events:** Use `trackEvent()` function from `Analytics.tsx`

---

## Customization

### Colors
Edit `src/app/globals.css`:
```css
--primary: #d4a633;  /* Gold */
--secondary: #1e3a8a; /* Navy */
--accent: #ea580c;    /* Orange */
```

### Fonts
Configured in `src/app/layout.tsx`:
- Playfair Display (headings)
- Geist Sans (body)
- Courier Prime (code/script excerpts)

### Social Media Links
Update in Sanity Studio → Site Settings → Social Media Links

### Contact Information
Update in Sanity Studio → Site Settings → Contact Information

---

## Troubleshooting

### Contact Form Not Working
1. Check `.env.local` has `RESEND_API_KEY` and `CONTACT_EMAIL`
2. Restart dev server after adding env variables
3. Check browser console for errors
4. Verify API key is valid at https://resend.com/api-keys

### Content Not Showing
1. Make sure Sanity Studio has content added
2. Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
3. Verify CORS origins in Sanity dashboard include your domain

### Build Errors
1. Delete `.next` folder and `node_modules`
2. Run `npm install` again
3. Run `npm run build`

### Analytics Not Tracking
1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Check browser console for errors
3. Use GA4 DebugView to test

---

## File Structure

```
my-portfolios/
├── public/
│   ├── robots.txt              # SEO: Search engine configuration
│   └── og-image.jpg            # Social media preview image (you need to create this)
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts    # Contact form API endpoint
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Individual project pages
│   │   ├── studio/             # Sanity CMS admin
│   │   ├── layout.tsx          # SEO meta tags, analytics
│   │   ├── page.tsx            # Homepage
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── globals.css         # Tailwind + custom styles
│   │
│   ├── components/
│   │   ├── Analytics.tsx       # Google Analytics component
│   │   ├── Contact.tsx         # Contact form (pulls from Sanity)
│   │   ├── Footer.tsx          # Footer (pulls from Sanity)
│   │   ├── Header.tsx          # Navigation
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Projects.tsx        # Video portfolio
│   │   ├── Scriptwriting.tsx   # Script portfolio
│   │   ├── Skills.tsx          # Skills section
│   │   ├── StructuredData.tsx  # SEO structured data
│   │   ├── ThemeProvider.tsx   # Dark mode provider
│   │   └── ThemeToggle.tsx     # Dark mode toggle
│   │
│   └── sanity/
│       ├── schemaTypes/        # Sanity content schemas
│       └── lib/                # Sanity client config
│
├── .env.local.example          # Environment variables template
├── CONTACT_SETUP.md            # Detailed contact form setup
├── SETUP_GUIDE.md              # This file
└── package.json
```

---

## What to Update Before Launch

### Critical
- [ ] Add Resend API key to `.env.local`
- [ ] Add your email to `CONTACT_EMAIL` in `.env.local`
- [ ] Update `NEXT_PUBLIC_SITE_URL` with your actual domain
- [ ] Add content in Sanity Studio (site settings, projects, scripts)
- [ ] Update `public/robots.txt` with your domain
- [ ] Test contact form

### Important
- [ ] Create `public/og-image.jpg` (1200x630px)
- [ ] Update social media links in Sanity
- [ ] Add Google Analytics ID (optional)
- [ ] Update Twitter handle in `layout.tsx` (line 76)
- [ ] Update structured data in `StructuredData.tsx` with actual info

### Nice to Have
- [ ] Verify domain with Google Search Console
- [ ] Set up custom domain email forwarding
- [ ] Add more projects and scripts in Sanity
- [ ] Create custom 404 page
- [ ] Add loading skeletons for better UX

---

## Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **CMS:** Sanity.io
- **Email:** Resend
- **Analytics:** Google Analytics 4 + Vercel Analytics
- **Deployment:** Vercel (recommended)
- **Fonts:** Google Fonts (Playfair Display, Geist, Courier Prime)

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Resend Docs:** https://resend.com/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

## License

All rights reserved. This is a personal portfolio website.

---

**Built with ❤️ by Claude Code**
