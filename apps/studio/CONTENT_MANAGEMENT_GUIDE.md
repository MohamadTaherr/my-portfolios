# Sanity CMS Content Management Guide

## Quick Start

Your Sanity Studio is accessible at: `https://edmond-portfolio.sanity.studio`

This guide will help you easily manage all content on your portfolio website.

---

## 📋 Table of Contents

1. [Site Settings](#site-settings)
2. [Managing Projects](#managing-projects)
3. [Managing Categories](#managing-categories)
4. [Page Content](#page-content)
5. [About Section](#about-section)
6. [Skills](#skills)
7. [Scripts](#scripts)
8. [Clients](#clients)
9. [Navigation & Footer](#navigation--footer)

---

## Site Settings

**Location:** Settings → Site Settings

This is where you configure your basic site information:

### Fields:
- **Name**: Your full name (appears in header and hero)
- **Tagline**: Your professional tagline
- **Bio**: Short professional biography
- **Profile Image**: Upload your professional photo
- **Showreel URL**: Link to your video showreel (Vimeo/YouTube)
- **Welcome Message**: Badge text shown on homepage
- **Statistics**:
  - Years of Experience
  - Projects Completed
  - Clients Served
  - Industry Awards (optional)

**Tip:** This is a singleton document - there's only one instance.

---

## Managing Projects

**Location:** Content → Video Projects

Video projects are the core of your portfolio. Each project showcases your work.

### How to Add a New Project:

1. Click **"Create"** → **"Video Project"**
2. Fill in the required fields:
   - **Title**: Project name
   - **Description**: Detailed description of the project
   - **Client**: Client or company name
   - **Category**: Select from available categories
   - **Duration**: Video length (e.g., "3:24")
   - **Year**: Production year
   - **Tags**: Optional keywords (e.g., "commercial", "cinematic")
   - **Video URL**:
     - Vimeo: `https://vimeo.com/123456789`
     - YouTube: `https://youtube.com/watch?v=xxxxx`
     - Direct MP4: `https://your-cdn.com/video.mp4`
   - **Thumbnail**: Upload a preview image
   - **Featured**: Toggle if this should be prominently displayed
   - **Display Order**: Lower numbers appear first

3. Click **Publish** when done

### Editing Projects:
- Click on any project to edit
- Remember to click **Publish** to save changes

### Deleting Projects:
- Click the project → Options menu (three dots) → Delete → Confirm

---

## Managing Categories

**Location:** Settings → Project Categories

Categories help organize your projects. This is a centralized system so you only need to manage categories in one place.

### How Categories Work:
- Define categories once in "Project Categories"
- They automatically appear as options when creating projects
- They show as filter buttons on your portfolio page

### Adding a New Category:

1. Go to **Settings** → **Project Categories**
2. Click **"Add Category"**
3. Fill in:
   - **Category Name**: Display name (e.g., "Commercial")
   - **Category Value**: Internal value (use lowercase, e.g., "commercial")
   - **Description**: Optional description
   - **Display Order**: Lower numbers appear first
4. Click **Publish**

### Example Categories:
- Commercial
- Short Film
- Documentary
- Music Video
- Social Media
- Event
- Corporate

**Tip:** Keep category values simple and consistent (lowercase, no special characters).

---

## Page Content

**Location:** Settings → Page Content

Control the text that appears on various pages.

### Editable Content:
- **SEO Settings**:
  - SEO Title
  - SEO Description
  - SEO Keywords
- **Hero Section**:
  - Hero Headline (main tagline)
  - Hero Subheadline
- **Contact Section**:
  - Contact Heading
  - Contact Description

**Tip:** Good SEO helps your site rank better in search engines!

---

## About Section

**Location:** Settings → About Section

Tell your story and share your background.

### Fields:
- **Heading**: Section title (e.g., "About Me")
- **Subheading**: Section subtitle
- **About Content**:
  - Rich text editor
  - Supports:
    - Paragraphs
    - Bold/Italic text
    - Lists (bulleted/numbered)
    - Headings (H2, H3, H4)
- **Experience Highlights**: List of key achievements
- **About Image**: Upload a professional photo

**Tip:** Keep it personal yet professional. Share your passion and unique story.

---

## Skills

**Location:** Settings → Skills Section

Showcase your professional skills and expertise.

### Fields:
- **Heading**: Section title
- **Subheading**: Section description
- **Skills List**: Add multiple skills
  - Each skill has:
    - **Name**: Skill name (e.g., "Scriptwriting")
    - **Description**: Brief description
    - **Icon**: Emoji or icon (e.g., "✍️")
    - **Proficiency**: 1-100 (shows as progress bar)

### Adding Skills:

1. Open **Skills Section**
2. Click **"Add Skill"**
3. Fill in the skill details
4. Click **Publish**

**Tip:** Organize skills by importance or category.

---

## Scripts

**Location:** Content → Scripts

Showcase your scriptwriting portfolio.

### Fields:
- **Title**: Script title
- **Type**: Select script type (Commercial, Feature Film, etc.)
- **Synopsis**: Brief summary
- **Client**: Who it was written for
- **Year**: Year written
- **Status**: Draft / Produced / In Production
- **Script File**: Upload PDF
- **Featured**: Toggle to highlight

### Script Types:
Manage script types in **Settings → Script Types** (same process as project categories).

---

## Clients

**Location:** Content → Clients

Display logos of clients you've worked with.

### Fields:
- **Name**: Client name
- **Logo**: Upload client logo (PNG/SVG recommended)
- **Website URL**: Optional client website
- **Display Order**: Order of appearance

**Tip:** Use high-quality, transparent background logos for best results.

---

## Navigation & Footer

### Navigation Settings
**Location:** Settings → Navigation Settings

- **Logo Text**: Site logo text
- **Navigation Links**: Add/edit menu items
  - Link Text
  - Link URL (use # for sections, e.g., #portfolio)
  - Display Order

### Footer Settings
**Location:** Settings → Footer Settings

- **Footer Text**: Copyright text
- **Social Media Links**:
  - Platform (LinkedIn, Twitter, Instagram, etc.)
  - URL
  - Display Order
- **Quick Links**: Footer menu items
- **Contact Information**:
  - Email
  - Phone
  - Location

---

## 💡 Best Practices

### Content Management

1. **Regular Updates**: Keep content fresh and current
2. **Image Optimization**:
   - Use appropriate image sizes
   - Compress images before uploading
   - Recommended: 1200x630px for thumbnails
3. **SEO**:
   - Write descriptive titles
   - Include relevant keywords
   - Keep descriptions concise but informative
4. **Consistency**:
   - Use consistent naming conventions
   - Maintain consistent tone and style
   - Keep categories organized

### Publishing Workflow

1. **Draft**: Create content as draft
2. **Review**: Check all fields are filled correctly
3. **Publish**: Click "Publish" to make live
4. **Update**: Website updates within ~10 seconds

---

## 🆘 Troubleshooting

### Content Not Showing on Website?

1. Make sure you clicked **"Publish"** (not just "Save")
2. Check that required fields are filled
3. Wait 10-30 seconds for cache to refresh
4. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Categories Not Appearing?

1. Go to **Settings → Project Categories**
2. Ensure categories are published
3. Check that category values are properly formatted (lowercase, no spaces)

### Images Not Loading?

1. Check image file size (max 10MB recommended)
2. Use supported formats: JPG, PNG, WebP, SVG
3. Ensure images are published along with the document

### Video Not Playing?

1. Ensure video URL is publicly accessible
2. Supported platforms:
   - Vimeo (public or unlisted)
   - YouTube (public or unlisted)
   - Direct MP4 URL
3. Check video privacy settings on the platform

---

## 🚀 Quick Tips

- **Keyboard Shortcuts**:
  - `Ctrl+S` / `Cmd+S`: Save draft
  - `Ctrl+Alt+P` / `Cmd+Alt+P`: Publish

- **Bulk Operations**:
  - Select multiple items with checkboxes
  - Use action menu for bulk publish/delete

- **Preview**:
  - Click "Open Preview" to see changes before publishing

- **Search**:
  - Use the search bar to quickly find content
  - Search works across all document types

---

## 📞 Need Help?

If you encounter any issues or need assistance:

1. Check this guide first
2. Review the [Sanity Documentation](https://www.sanity.io/docs)
3. Contact your developer for technical support

---

**Last Updated:** 2025

**Version:** 1.0
