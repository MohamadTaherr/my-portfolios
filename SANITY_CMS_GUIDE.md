# Complete Guide: Managing Your Website with Sanity CMS

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Content Types Overview](#content-types-overview)
4. [Editing Content](#editing-content)
5. [Publishing Changes](#publishing-changes)
6. [Tips & Best Practices](#tips--best-practices)

---

## Introduction

Your website is now fully manageable through **Sanity CMS** - a user-friendly content management system. You can edit **everything** on your website without any technical knowledge:

- ✅ All text content (titles, descriptions, paragraphs)
- ✅ Navigation menu items
- ✅ Footer content and links
- ✅ Hero section headlines
- ✅ Skills and statistics
- ✅ About section text and featured brands
- ✅ Projects and portfolio items
- ✅ Scripts and writing samples
- ✅ Contact information
- ✅ Social media links
- ✅ SEO metadata (titles, descriptions, keywords)

---

## Getting Started

### Accessing Sanity Studio

1. **Open your terminal** in the project directory
2. **Run the command:**
   ```bash
   pnpm dev:studio
   ```
3. **Open your browser** and go to: `http://localhost:3333`
4. **Log in** with your Sanity credentials

### Understanding the Interface

When you open Sanity Studio, you'll see a sidebar with different content types organized into sections:

**Site-Wide Settings** (Singleton documents - one per site):
- 🏠 Site Settings
- 📄 Page Content & Copy
- 🧭 Navigation Settings
- 🦶 Footer Settings

**Section-Specific Content**:
- 👤 About Section
- ⚡ Skills & Expertise

**Collections** (Multiple items):
- 🎬 Video Projects
- ✍️ Scripts
- 👥 Clients/Testimonials

---

## Content Types Overview

### 1. **Site Settings** 🏠
**What it controls:** Basic information about you and your business

**Fields you can edit:**
- **Full Name** - Your professional name
- **Tagline** - Your professional title/subtitle
- **Bio** - A brief description of your work
- **Profile Image** - Your profile photo (drag & drop to upload)
- **Showreel URL** - Link to your demo reel video (YouTube, Vimeo, or direct link)
- **Welcome Message** - Badge text shown on homepage
- **Years of Experience** - Number of years in the industry
- **Projects Completed** - Total number of projects
- **Clients Served** - Number of clients you've worked with
- **Industry Awards** - Number of awards won
- **Contact Information:**
  - Email address
  - Phone number
  - Location
- **Social Media Links:**
  - LinkedIn URL
  - Twitter/X URL
  - Instagram URL
  - YouTube URL
  - Vimeo URL

**How to edit:**
1. Click "Site Settings" in the sidebar
2. Make your changes
3. Click "Publish" (green button at the bottom)

---

### 2. **Page Content & Copy** 📄
**What it controls:** All headlines, section titles, and text across your website

**Fields you can edit:**

**SEO (Search Engine Optimization):**
- **SEO Title** - Title that appears in Google search results (max 60 characters)
- **SEO Description** - Description in search results (max 160 characters)
- **SEO Keywords** - Keywords for search engines (press Enter after each keyword)

**Hero Section:**
- **Hero Headline** - Main headline on homepage (e.g., "I tell stories that move people")
- **Hero Subheadline** - Supporting text under headline

**About Section:**
- **About Section Title** - Main title (e.g., "Behind the Camera")
- **About Section Subtitle** - Small text above title (e.g., "The Story")

**Skills Section:**
- **Skills Section Title** - Main title (e.g., "By the Numbers")
- **Skills Section Subtitle** - Small text above title (e.g., "Expertise")

**Projects Section:**
- **Projects Section Title** - Main title (e.g., "Selected Works")
- **Projects Section Subtitle** - Small text above title
- **Projects Description** - Intro text for portfolio section

**Contact Section:**
- **Contact Section Title** - Main title (e.g., "Start a Conversation")
- **Contact Section Subtitle** - Small text above title (e.g., "Let's Connect")
- **Contact Description** - Intro text for contact section

**Footer:**
- **Footer Copyright Text** - Copyright message (e.g., "All rights reserved")
- **Footer Tagline** - Tagline/motto in footer

**How to edit:**
1. Click "Page Content & Copy" in the sidebar
2. Edit any text you want to change
3. Click "Publish"

---

### 3. **Navigation Settings** 🧭
**What it controls:** The menu items at the top of your website

**Fields you can edit:**
- **Main Navigation Items** - List of menu links
  - **Label** - Text shown in menu (e.g., "Home", "About")
  - **Link URL** - Where it links to (e.g., "#hero", "#about", "#contact")
  - **Display Order** - Lower numbers appear first (0, 1, 2, 3...)
  - **Open in New Tab** - Check if link should open in new window

- **Logo Text** - Text shown as logo (leave empty to use your name from Site Settings)

- **CTA Button** (Optional) - A highlighted button in navigation
  - **Enable** - Turn button on/off
  - **Button Label** - Text on button
  - **Button Link** - Where button goes

**How to edit:**
1. Click "Navigation Settings"
2. To add a menu item: Click "+ Add item"
3. To remove a menu item: Click the trash icon
4. To reorder: Change the "Display Order" numbers
5. Click "Publish"

**Example Navigation Setup:**
```
Home      - Link: #hero      - Order: 0
About     - Link: #about     - Order: 1
Portfolio - Link: #portfolio - Order: 2
Expertise - Link: #skills    - Order: 3
Contact   - Link: #contact   - Order: 4
```

---

### 4. **Footer Settings** 🦶
**What it controls:** Footer navigation and content at bottom of website

**Fields you can edit:**
- **Footer Navigation Links** - Links shown in footer
  - **Label** - Link text
  - **Link URL** - Where it goes
  - **Display Order** - Order of appearance

- **Copyright Text** - Copyright message (e.g., "All rights reserved")
- **Footer Tagline** - Your motto or tagline
- **Show Social Links** - Toggle social media icons on/off

- **Additional Footer Sections** (Optional) - Extra content columns
  - **Section Title** - Column heading
  - **Content** - Text content
  - **Links** - List of additional links

**How to edit:**
1. Click "Footer Settings"
2. Edit the text and links
3. Click "Publish"

---

### 5. **Skills & Expertise** ⚡
**What it controls:** Your skills, statistics, and achievements

**Fields you can edit:**

**Statistics & Achievements:**
- Click "+ Add item" to add a new stat
- For each stat:
  - **Number/Value** - The number (e.g., "20+", "200+", "100%")
  - **Label** - Description (e.g., "Years of Experience", "Scripts Written")
  - **Icon (Emoji)** - An emoji icon (e.g., 📊, 🎬, ✍️)
  - **Display Order** - Order it appears (0, 1, 2...)

**Core Competencies:**
- Type a skill and press **Enter** to add
- Examples: "Scriptwriting", "Video Production", "Color Grading"
- Click the × to remove a skill

**How to edit:**
1. Click "Skills & Expertise"
2. Add, edit, or remove stats and skills
3. Recommended: 4-8 stats, 6-12 competencies
4. Click "Publish"

**Example Stats:**
```
20+ Years       🎬  Order: 0
200+ Scripts    ✍️  Order: 1
10+ Awards      🏆  Order: 2
100+ Brands     🌍  Order: 3
```

---

### 6. **About Section** 👤
**What it controls:** Extended about page content

**Fields you can edit:**

**About Body Text:**
- Rich text editor for detailed paragraphs
- You can format text (bold, italic, lists, links)
- Write multiple paragraphs about your story and journey

**Featured Brands/Clients:**
- List of notable brands you've worked with
- For each brand:
  - **Brand/Client Name** - Company name
  - **Logo** (Optional) - Upload brand logo
  - **Description** (Optional) - Brief description of work
  - **Display Order** - Order it appears

**Signature Name:**
- Leave empty to use your name from Site Settings
- Or enter a custom signature

**Philosophy/Approach** (Optional):
- **Section Title** - Heading (e.g., "My Philosophy")
- **Content** - Your creative philosophy statement

**Key Achievements** (Optional):
- List of major accomplishments
- For each achievement:
  - **Achievement** - Description
  - **Year** - When it happened
  - **Icon** - Optional emoji

**How to edit:**
1. Click "About Section"
2. Write or edit your story
3. Add featured brands
4. Click "Publish"

---

### 7. **Video Projects** 🎬
**What it controls:** Your portfolio/projects section

**How to add a new project:**
1. Click "Video Projects" in sidebar
2. Click "+ Create new" button
3. Fill in the fields:
   - **Title** - Project name
   - **Description** - What the project is about
   - **Client** - Who you made it for
   - **Category** - Type (Commercial, Documentary, etc.)
   - **Duration** - Video length (e.g., "2:30")
   - **Year** - When it was made
   - **Tags** - Keywords (press Enter after each)
   - **Video URL** - Link to video (YouTube, Vimeo, etc.)
   - **Thumbnail** - Upload preview image
   - **Featured** - Toggle to show on homepage
   - **Order** - Display order (0, 1, 2...)
4. Click "Publish"

**Available Categories:**
- Commercial
- Short Film
- Documentary
- Script
- Social Media
- Event
- Music Video

**To edit existing project:**
1. Click "Video Projects"
2. Click on the project you want to edit
3. Make changes
4. Click "Publish"

**To delete a project:**
1. Open the project
2. Click the three dots ⋮ menu
3. Select "Delete"
4. Confirm deletion

---

### 8. **Scripts** ✍️
**What it controls:** Your scriptwriting portfolio

**How to add a new script:**
1. Click "Scripts" in sidebar
2. Click "+ Create new"
3. Fill in:
   - **Title** - Script title
   - **Type** - Category (Commercial Script, Documentary, etc.)
   - **Client** - Who commissioned it
   - **Duration** - Length
   - **Year** - When written
   - **Description** - Full details
   - **Excerpt** - Short preview/logline
   - **Tags** - Keywords
   - **Word Count** - Approximate length
   - **Featured** - Show on featured list
   - **Order** - Display order
4. Click "Publish"

**Available Script Types:**
- Commercial Script
- Documentary Script
- Social Media Scripts
- Short Film Script
- Corporate Script
- E-Learning Script

---

### 9. **Clients/Testimonials** 👥
**What it controls:** Client logos and testimonials

**How to add a client:**
1. Click "Clients" in sidebar
2. Click "+ Create new"
3. Fill in:
   - **Name** - Client/company name
   - **Logo** - Upload company logo
   - **Project** - What you did for them
   - **Category** - Type of work (Video Production, Scriptwriting, Both)
   - **Description** - Project details
   - **Testimonial** - Their quote/review
   - **Client Name** - Person who gave testimonial
   - **Year** - When you worked together
   - **Rating** - 1-5 stars
   - **Featured** - Show prominently
   - **Order** - Display order
4. Click "Publish"

---

## Publishing Changes

### How Publishing Works

1. **Draft Mode** - Your changes are saved but NOT live on the website
2. **Published** - Changes go live on the website

### Publishing Steps

1. Make your changes
2. Click the **"Publish"** button (green button at bottom of screen)
3. Wait a few moments
4. Refresh your website to see changes

### Auto-Saving

- Sanity auto-saves your drafts every few seconds
- You'll see "Saving..." indicator at top
- Don't close the browser until you see "Published"

---

## Tips & Best Practices

### Writing Content

**SEO (Search Engine Optimization):**
- Keep titles under 60 characters
- Keep descriptions under 160 characters
- Use relevant keywords naturally
- Don't keyword stuff

**Headlines:**
- Be clear and compelling
- Focus on benefits to your clients
- Use action words
- Test different versions

**Descriptions:**
- Start with the most important information
- Keep paragraphs short (2-3 sentences)
- Use bullet points for lists
- Write in active voice

### Images

**Optimal Image Sizes:**
- **Profile Photo:** Square, at least 800×800px
- **Project Thumbnails:** 1920×1080px (16:9 ratio)
- **Brand Logos:** PNG with transparent background
- **Max File Size:** Under 2MB for best performance

**Image Tips:**
- Use high-quality, professional photos
- Compress images before uploading (use tinypng.com)
- Use descriptive file names (e.g., "porsche-commercial-2024.jpg")

### Videos

**Supported Platforms:**
- YouTube
- Vimeo
- Direct video URLs

**Video URL Format:**
- **YouTube:** Copy the full URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
- **Vimeo:** Copy the full URL (e.g., `https://vimeo.com/VIDEO_ID`)
- **Direct:** Full URL to .mp4 file

### Navigation & Links

**Internal Links** (within your website):
- Use hashtags: `#hero`, `#about`, `#portfolio`, `#skills`, `#contact`

**External Links** (to other websites):
- Use full URLs: `https://example.com`
- Consider enabling "Open in New Tab"

**Social Media Links:**
- Always use full URLs: `https://linkedin.com/in/yourprofile`

### Organization Tips

**Project Order:**
- Use 0, 10, 20, 30... (leaves room to insert items later)
- Featured projects appear first automatically

**Regular Updates:**
- Update portfolio monthly with new work
- Refresh testimonials quarterly
- Review SEO keywords every 6 months

**Content Strategy:**
- Focus on your best work (quality over quantity)
- Keep 8-12 projects in portfolio
- Feature 3-5 projects on homepage

---

## Common Tasks

### How to Change Your Homepage Headline

1. Go to "Page Content & Copy"
2. Find "Hero Headline"
3. Type new headline
4. Click "Publish"

### How to Add a New Portfolio Project

1. Click "Video Projects"
2. Click "+ Create new"
3. Fill in all fields
4. Upload thumbnail
5. Toggle "Featured" if you want it on homepage
6. Click "Publish"

### How to Update Your Skills/Stats

1. Click "Skills & Expertise"
2. Click on a stat to edit it, or click "+ Add item" for new one
3. Update number, label, emoji, and order
4. Click "Publish"

### How to Change Footer Links

1. Click "Footer Settings"
2. Edit the "Footer Navigation Links" section
3. Add, remove, or reorder links
4. Click "Publish"

### How to Update Contact Information

1. Click "Site Settings"
2. Scroll to "Contact" section
3. Update email, phone, or location
4. Click "Publish"

### How to Add a Client Testimonial

1. Click "Clients"
2. Click "+ Create new"
3. Fill in client name, testimonial text, and details
4. Upload logo if available
5. Set rating (1-5 stars)
6. Toggle "Featured" to show prominently
7. Click "Publish"

---

## Troubleshooting

### Changes Not Showing Up?

1. **Wait 1-2 minutes** - The website caches content
2. **Hard refresh** your browser:
   - Windows: `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
3. **Clear cache** in your browser settings
4. **Check if published** - Make sure you clicked "Publish", not just saved

### Can't Upload Image?

1. Check file size (must be under 10MB)
2. Check format (JPG, PNG, GIF, WebP supported)
3. Try compressing the image first
4. Make sure you have a stable internet connection

### Video Not Playing?

1. Verify the video URL is correct
2. Make sure video is set to "Public" or "Unlisted" on YouTube/Vimeo
3. Test the URL in a new browser tab first

### Lost Your Changes?

- Sanity auto-saves drafts
- Check if there's an unpublished draft (you'll see a "Draft" label)
- Click "Publish" to make it live

---

## Getting Help

### Resources

- **Sanity Documentation:** https://www.sanity.io/docs
- **Video Tutorials:** https://www.sanity.io/guides

### Common Questions

**Q: How often does the website update?**
A: Changes appear within 1-2 minutes after publishing.

**Q: Can I preview changes before publishing?**
A: Currently, changes go live when you click "Publish". Test changes during low-traffic times.

**Q: Can multiple people edit at once?**
A: Yes! Sanity supports real-time collaboration. You'll see other editors' cursors.

**Q: How do I undo changes?**
A: Click the history icon (clock) to see previous versions and restore them.

**Q: What if I delete something by mistake?**
A: Use the history feature to restore deleted content. Act quickly!

---

## Content Checklist

Use this checklist when starting with Sanity:

### Initial Setup
- [ ] Fill in Site Settings (name, bio, contact info)
- [ ] Upload profile image
- [ ] Add social media links
- [ ] Set up navigation menu
- [ ] Configure footer settings

### Content Population
- [ ] Write Hero headline and subheadline
- [ ] Fill in About section with your story
- [ ] Add 6-8 statistics to Skills section
- [ ] List 8-12 core competencies
- [ ] Add 5-10 portfolio projects
- [ ] Include 3-5 client testimonials

### SEO Optimization
- [ ] Set SEO title and description
- [ ] Add relevant keywords
- [ ] Ensure all images have descriptions
- [ ] Check all links work
- [ ] Test on mobile device

### Regular Maintenance
- [ ] Add new projects monthly
- [ ] Update stats quarterly
- [ ] Refresh testimonials every 6 months
- [ ] Review and update SEO annually

---

## Final Notes

**Congratulations!** You now have complete control over your website content. No more waiting for developers or technical assistance. You can:

✅ Edit any text in seconds
✅ Add new projects immediately
✅ Update your portfolio anytime
✅ Manage SEO yourself
✅ Keep content fresh and current

**Remember:**
- Changes are instant (within 1-2 minutes)
- Always click "Publish" to make changes live
- Keep backups of important content
- Don't be afraid to experiment!

**Need More Help?**
Contact your developer or refer to Sanity's official documentation at https://www.sanity.io/docs

---

**Last Updated:** January 2025
**Website:** Built with Next.js & Sanity CMS
