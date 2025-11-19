# Admin Dashboard Quick Reference Guide

## Accessing the Admin Dashboard

1. Navigate to `/admin` on your website
2. Enter your admin password
3. You'll see the Admin Studio dashboard

## Managing Portfolio Items

### Creating a New Portfolio Item

1. Go to the **Portfolio** tab
2. Fill in the required fields:
   - **Title** (required)
   - **Category** (required) - Select from dropdown
   - **Media Type** - Choose: VIDEO, ARTICLE, GALLERY, IMAGE, DOCUMENT, or TEXT

3. **Uploading Images/Videos:**
   - **Media URL**: Click "Upload" button to select a file from your computer
   - **Thumbnail**: Click "Upload" button for thumbnail image
   - **Gallery**: Click "Upload Gallery Images" to select multiple images at once
   - You can also paste URLs directly if you have files hosted elsewhere

4. Optional fields:
   - **Client/Collaborator**: Name of client or collaborator
   - **Video Provider**: YouTube, Vimeo, etc.
   - **Video ID**: The video ID from the provider
   - **Summary**: Brief description
   - **Tags**: Comma-separated tags
   - **Featured**: Check to show on homepage
   - **Order**: Number for manual sorting (0 = first)

5. Click **"Publish entry"** to save

### Editing an Existing Item

1. Scroll down to "Current entries"
2. Click **Edit** on the item you want to modify
3. Make your changes
4. Click **"Update entry"**

### Deleting an Item

1. Find the item in "Current entries"
2. Click **Delete**
3. Confirm the deletion

## Managing Categories

### Creating a New Category

1. Go to the **Categories** tab
2. Fill in the fields:
   - **Name** (required) - e.g., "Commercial"
   - **Icon** - An emoji like 🎬 📺 🎥
   - **Color** - Click the color picker to choose a color
   - **Order** - Number for sorting (lower = appears first)
   - **Description** - Brief description of what this category includes

3. Click **"Add Category"**

### Deleting a Category

1. Find the category in "Existing Categories"
2. Click **Delete**
3. Confirm the deletion

**Note**: You cannot delete a category that's being used by portfolio items. Remove the category from those items first.

## Managing Clients & Testimonials

### Adding a Client

1. Go to the **Clients** tab
2. Fill in the client information:
   - **Name**: Client or company name
   - **Logo URL**: Click "Upload" to upload client logo
   - **Project**: Project name
   - **Category**: Project category
   - **Description**: Project description
   - **Testimonial**: Client's testimonial
   - **Client Name**: Name of person giving testimonial
   - **Year**: Year of project
   - **Rating**: 1-5 stars

3. Click **"Add client"**

## Editing Site Settings

### Brand Voice (Site Settings)

1. Go to the **Brand Voice** tab
2. Update:
   - Your name
   - Tagline
   - Bio
   - Welcome message
   - Showreel URL
   - Contact information (email, phone, location)
   - Stats (years experience, projects completed, etc.)

3. Click **"Save site settings"**

### Section Copy (Page Content)

1. Go to the **Section Copy** tab
2. Edit headlines and text for each section:
   - Hero section
   - About section
   - Skills section
   - Contact section

3. Click **"Save page copy"**

### Navigation & Footer

1. Go to the **Navigation & Footer** tab
2. Edit the JSON structure for:
   - Main navigation links
   - Footer links
   - Social media links

3. Click **"Save navigation"** or **"Save footer"**

**JSON Format Example:**
```json
{
  "links": [
    { "label": "Home", "href": "#home" },
    { "label": "About", "href": "#about" },
    { "label": "Portfolio", "href": "#portfolio" }
  ],
  "logoText": "Your Name"
}
```

## File Upload Best Practices

### Image Guidelines
- **Format**: JPG, PNG, WebP recommended
- **Size**: Max 10MB per file
- **Resolution**:
  - Portfolio images: 1920x1080px or higher
  - Thumbnails: 800x600px minimum
  - Client logos: 400x400px (transparent PNG preferred)

### Video Guidelines
- **Upload**: For video files, upload to YouTube/Vimeo first
- **Link**: Use Video Provider + Video ID fields
- **Thumbnail**: Always upload a custom thumbnail for better appearance

### Gallery Images
- Select multiple images at once using the "Upload Gallery Images" button
- Images will be added to the gallery URLs list
- You can reorder by editing the URLs directly (one per line)

## Tips & Tricks

### 1. Featured Items
- Check "Feature on homepage" to highlight important work
- Featured items appear first in the portfolio

### 2. Ordering
- Use the Order field to control the sequence
- Lower numbers appear first (0, 1, 2, ...)
- Items with the same order are sorted by creation date

### 3. Categories
- Create categories before adding many portfolio items
- Use descriptive names that match your work
- Icons and colors make the site more visually appealing

### 4. File Organization
- Upload files with descriptive names
- Keep track of what you've uploaded
- Delete unused files to save space

### 5. Content Updates
- Changes appear immediately on the live site
- No need to "publish" - everything is live after saving
- Review your changes by visiting the public site

## Common Issues & Solutions

### "Category is required"
- You must select a category when creating a portfolio item
- If no categories exist, go to Categories tab and create one first

### "File upload failed"
- Check file size (must be under 10MB)
- Verify file type (images, videos, PDFs only)
- Ensure you're logged in as admin

### "Invalid JSON"
- When editing Navigation or Footer, ensure JSON is properly formatted
- Use quotes around text: `"text"` not `'text'`
- Include commas between items
- Check for missing brackets `{}` or `[]`

### Changes not showing
- Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Wait 10-60 seconds for cache to update

## Keyboard Shortcuts

- **Ctrl/Cmd + S**: Save current form (when focused on a field)
- **Esc**: Close video player modal
- **Tab**: Navigate between fields

## Need Help?

If you encounter issues:
1. Check the browser console for errors (F12 → Console tab)
2. Verify you're logged in as admin
3. Try refreshing the page
4. Contact your developer with screenshots of any errors
