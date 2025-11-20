# Logo Upload Feature ✅

## What's New

You can now upload a **logo image** OR use **logo text** for your website header!

### Priority System:
1. If **Logo Image** is uploaded → Shows the image
2. If **No Image** → Shows Logo Text (fallback)

---

## 🎯 How to Use

### Option 1: Upload Logo Image

1. Go to `/admin`
2. Click **Navigation & Footer** tab
3. In the **Logo Settings** section:
   - Click **Upload** button
   - Select your logo image (PNG, JPG, SVG recommended)
   - OR paste a direct URL in the **Logo Image** field
4. You'll see a preview of your logo
5. Click **Save Navigation**
6. Refresh the homepage - your logo appears in the header!

### Option 2: Use Logo Text

1. Go to `/admin`
2. Click **Navigation & Footer** tab
3. In the **Logo Settings** section:
   - Leave **Logo Image** empty
   - Enter your text in **Logo Text** field (e.g., "EH", "JD", "Portfolio")
4. Click **Save Navigation**
5. Refresh the homepage - your text appears in the header!

---

## 💡 Recommendations

### For Logo Images:
- **Format:** PNG with transparent background works best
- **Size:** 120-150px height recommended
- **File size:** Keep under 200KB for fast loading
- **Colors:** Make sure it's visible on dark background

### For Logo Text:
- **Length:** 2-4 characters work best
- **Examples:** Initials like "EH", "JD", or short words like "LOGO"
- **Styling:** Automatically styled with gold color and Playfair font

---

## 📱 Responsive Design

The logo automatically adjusts:
- **Desktop:** Full size (up to 48px height)
- **Mobile:** Scales proportionally
- Always maintains aspect ratio

---

## 🔄 Switching Between Image and Text

You can switch anytime:

**From Text to Image:**
1. Upload an image
2. Save
3. Image will be displayed instead

**From Image to Text:**
1. Clear the Logo Image field
2. Make sure Logo Text is filled in
3. Save
4. Text will be displayed instead

---

## 📊 What Changed

### Files Modified:

1. **apps/web/src/components/admin/AdminDashboard.tsx**
   - Added Logo Image upload field
   - Added preview for uploaded logo
   - Reorganized into "Logo Settings" section

2. **apps/web/src/components/Header.tsx**
   - Added `logoUrl` state
   - Conditional rendering: image if exists, text otherwise
   - Fetches `logoUrl` from navigation API

3. **apps/backend/src/lib/db.ts**
   - Added `logoUrl: ''` to navigation initialization
   - Added `order` field to navigation links

---

## 🎨 Example Configurations

### Minimal (Text Only):
```json
{
  "logoText": "EH",
  "logoUrl": ""
}
```
**Result:** Shows "EH" in gold Playfair font

### Professional (Image):
```json
{
  "logoText": "My Portfolio",
  "logoUrl": "https://example.com/logo.png"
}
```
**Result:** Shows the uploaded logo image

### Safe Fallback (Both):
```json
{
  "logoText": "EH",
  "logoUrl": "https://example.com/logo.png"
}
```
**Result:** Shows image, falls back to "EH" if image fails to load

---

## 🧪 Testing

1. **Test Image Upload:**
   - Upload a logo
   - Check preview appears
   - Save and refresh homepage
   - Verify logo appears in header

2. **Test Text Fallback:**
   - Clear logo image
   - Add logo text
   - Save and refresh
   - Verify text appears in header

3. **Test Priority:**
   - Add both image and text
   - Save and refresh
   - Verify image is shown (not text)

---

## 🐛 Troubleshooting

### Logo image not appearing:
- Check that the URL is correct and accessible
- Try uploading the image instead of using a URL
- Verify the image format is supported (PNG, JPG, SVG)
- Clear browser cache and refresh

### Logo too large/small:
- The logo height is set to 48px (3rem)
- Edit the image before uploading to adjust size
- Or use CSS custom styling in globals.css

### Upload button not working:
- Check that backend is running
- Verify file upload endpoint is working
- Check browser console for errors

---

## 🎯 Best Practices

1. **Optimization:**
   - Compress images before upload
   - Use SVG for crisp logos at any size
   - Keep file size under 200KB

2. **Accessibility:**
   - Logo image has alt="Logo" automatically
   - Works with screen readers
   - Keyboard navigation supported

3. **Consistency:**
   - Use same logo across all platforms
   - Match your brand colors
   - Keep it simple and recognizable

---

## 📸 Visual Example

**Before (Text Only):**
```
┌─────────────────────────────┐
│  EH    Home About Portfolio │  ← Logo Text
└─────────────────────────────┘
```

**After (With Image):**
```
┌─────────────────────────────┐
│  [LOGO]  Home About Portfolio│  ← Logo Image
└─────────────────────────────┘
```

---

## ✨ Summary

- ✅ Upload logo images directly in admin
- ✅ Or use logo text as fallback
- ✅ Image takes priority if both are set
- ✅ Live preview in admin panel
- ✅ Automatic responsive sizing
- ✅ Works with file upload or direct URL

**Your website header is now fully customizable!** 🎉
