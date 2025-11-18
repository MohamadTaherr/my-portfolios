# Sanity CMS Content Management Guide

This guide explains how your website's content is organized in Sanity CMS and how to manage it.

## 📋 Table of Contents

- [Content Structure](#content-structure)
- [Getting Started](#getting-started)
- [Managing Content](#managing-content)
- [Data Seeding & Cleanup](#data-seeding--cleanup)
- [Deployment](#deployment)

---

## 🏗️ Content Structure

Your website content is organized into the following categories in Sanity:

### 1. **Site Settings** (Singleton)
**Location:** Settings → Site Settings

Controls your personal information and site-wide settings:
- Name, tagline, bio
- Profile image and showreel URL
- Statistics (years of experience, projects completed, etc.)
- Contact information (email, phone, location)
- Social media links (LinkedIn, Vimeo, Instagram, etc.)

**Used in:** Hero section, About section, Footer, Contact section

---

### 2. **Page Content** (Singleton)
**Location:** Settings → Page Content & Copy

Controls all section titles, headlines, and descriptions:
- Hero section headline & subheadline
- About section title & subtitle
- Skills section title & subtitle
- Projects section title, subtitle & description
- Contact section title, subtitle & description
- SEO metadata (title, description, keywords)
- Footer copyright & tagline

**Used in:** All sections across the website

---

### 3. **About Section** (Singleton)
**Location:** Content → About Section

Manages the About section content:
- Body paragraphs (rich text editor)
- Featured brands/clients list
- Signing name

**Used in:** About section

---

### 4. **Skills Section** (Singleton)
**Location:** Content → Skills Section

Manages your expertise showcase:
- Statistics (customizable numbers with icons and labels)
- Core competencies list

**Used in:** Skills section

---

### 5. **Video Projects** (Collection)
**Location:** Content → Video Projects

Your portfolio projects:
- Title, description, client
- Category (Commercial, Documentary, Short Film, etc.)
- Duration, year, tags
- Video URL (Vimeo, YouTube, or direct)
- Thumbnail image
- Featured flag
- Display order

**Used in:** Portfolio/Projects section

---

### 6. **Project Categories** (Singleton)
**Location:** Settings → Project Categories

Controls the filter categories shown in the portfolio:
- Category title and value
- Display order

**Used in:** Portfolio section filters

---

## 🚀 Getting Started

### Step 1: Get Your Sanity API Token

1. Go to [Sanity Management Console](https://sanity.io/manage)
2. Select your project
3. Navigate to **API → Tokens**
4. Click **"Add API token"**
5. Give it a name (e.g., "Data Management")
6. Set permissions to **"Editor"**
7. Copy the token

### Step 2: Add Token to Environment Variables

Open `apps/web/.env.local` and add:

```bash
SANITY_API_TOKEN=your_token_here
```

### Step 3: Seed Initial Data

Run the seeding script to populate Sanity with initial content:

```bash
pnpm sanity:seed
```

This will create:
- Site Settings with your basic information
- Page Content with default section titles
- About Section with sample content
- Skills Section with statistics
- Project Categories

### Step 4: Customize Your Content

1. Open Sanity Studio: https://edmond-portfolio.sanity.studio/
2. Go through each section and customize with your real information
3. Upload images (profile photo, project thumbnails)
4. Add your video projects
5. Update statistics and competencies

---

## 📝 Managing Content

### Adding a New Video Project

1. Go to **Content → Video Projects**
2. Click **"Create"** or the **"+"** button
3. Fill in the required fields:
   - Title, Description, Client
   - Category
   - Duration (e.g., "3:24")
   - Year
   - Tags (optional)
   - Video URL (Vimeo, YouTube, or direct MP4)
   - Thumbnail image
4. Set **"Featured"** to show on the main portfolio
5. Set **"Display Order"** (lower numbers appear first)
6. Click **"Publish & Update Website"** to publish and trigger revalidation

### Updating Site Settings

1. Go to **Settings → Site Settings**
2. Update any field (name, bio, stats, contact info, etc.)
3. Upload/change your profile image
4. Click **"Publish & Update Website"**

### Editing Section Titles

1. Go to **Settings → Page Content & Copy**
2. Find the section you want to edit (Hero, About, Skills, Projects, Contact)
3. Update the title/subtitle/description
4. Click **"Publish & Update Website"**

### Managing About Section

1. Go to **Content → About Section**
2. Edit body paragraphs using the rich text editor
3. Update featured brands list
4. Change signing name
5. Click **"Publish & Update Website"**

### Updating Skills & Stats

1. Go to **Content → Skills Section**
2. Edit statistics:
   - Click into a stat to edit number, label, icon
   - Reorder by changing the "order" field
   - Add/remove stats as needed
3. Edit competencies list
4. Click **"Publish & Update Website"**

---

## 🛠️ Data Seeding & Cleanup

### Seed Fresh Data

Populates Sanity with initial content (won't overwrite existing data, just updates it):

```bash
pnpm sanity:seed
```

### Clean Up Old/Test Data

Interactive script to remove old video projects:

```bash
pnpm sanity:cleanup
```

Options:
- Delete all video projects
- Delete specific projects by number
- Cancel

### Clear Website Cache

Force revalidate all cached pages:

```bash
node clear-cache.js
```

---

## 🚀 Deployment

### Deploy Sanity Studio

After making changes to Sanity schemas or configuration:

```bash
pnpm sanity:deploy
```

Your studio will be deployed to: https://edmond-portfolio.sanity.studio/

### Deploy Website

After updating content in Sanity, you have two options:

**Option 1: Automatic (Manual Trigger)**
1. In Sanity Studio, click **"Publish & Update Website"** button
2. Wait 10-30 seconds
3. Your changes will appear on the website

**Option 2: Time-Based (Automatic)**
- Pages automatically revalidate every 10-60 seconds
- Just wait and your changes will appear

**Option 3: Full Deploy**
```bash
git add .
git commit -m "Update content"
git push
```

Vercel will automatically deploy your changes.

---

## 📊 Content Mapping

Here's what content each website section pulls from Sanity:

### Hero Section
- **Site Settings:** name, tagline, bio, profileImage, showreelUrl, welcomeMessage, stats
- **Page Content:** heroHeadline, heroSubheadline

### About Section
- **Site Settings:** name, bio, yearsExperience, projectsCompleted, industryAwards
- **About Section:** bodyParagraphs, featuredBrands, signingName
- **Page Content:** aboutTitle, aboutSubtitle

### Portfolio Section
- **Video Projects:** all project data
- **Project Categories:** category filters
- **Page Content:** projectsTitle, projectsSubtitle, projectsDescription

### Skills Section
- **Skills Section:** stats, competencies
- **Page Content:** skillsTitle, skillsSubtitle

### Contact Section
- **Site Settings:** email, phone, location, socialLinks
- **Page Content:** contactTitle, contactSubtitle, contactDescription

### Footer
- **Site Settings:** name, socialLinks
- **Page Content:** footerCopyright, footerTagline

---

## 💡 Tips

1. **Always use "Publish & Update Website"** button after making changes for immediate updates
2. **Use meaningful display orders** for projects (0, 10, 20, etc.) to leave room for insertions
3. **Optimize images** before uploading (1920px wide max for thumbnails)
4. **Use high-quality thumbnails** for video projects - they're the first thing visitors see
5. **Keep bio and descriptions concise** - aim for 2-3 paragraphs max
6. **Update stats regularly** to keep your portfolio current
7. **Test video URLs** before publishing to ensure they work
8. **Use categories consistently** to make filtering work well

---

## 🔧 Troubleshooting

**Changes not appearing on website?**
1. Make sure you clicked "Publish & Update Website" in Sanity Studio
2. Wait 10-30 seconds for cache to clear
3. Try opening the site in incognito/private mode
4. Run `node clear-cache.js` to force clear all caches

**Can't run seed/cleanup scripts?**
1. Make sure `SANITY_API_TOKEN` is in `apps/web/.env.local`
2. Verify the token has "Editor" permissions
3. Check that you're in the project root directory

**Revalidation button not working?**
1. Check browser console for errors
2. Verify `SANITY_STUDIO_REVALIDATE_URL` is set correctly in `apps/studio/.env.local`
3. Verify `SANITY_STUDIO_REVALIDATE_SECRET` matches the secret in `apps/web/.env.local`

---

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Review the Sanity schema documentation
3. Check Vercel deployment logs
4. Review this guide for common solutions

---

**Last Updated:** November 2025
