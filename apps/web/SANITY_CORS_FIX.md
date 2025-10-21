# 🔧 Fix Sanity Studio CORS Error

You're getting a CORS error because your Sanity project needs to allow requests from `localhost`.

## Quick Fix (5 minutes)

### Step 1: Go to Sanity Management Console

1. Open your browser and go to: **https://www.sanity.io/manage**
2. Sign in to your Sanity account
3. Select your project: **tvx7pk8u**

### Step 2: Add CORS Origins

1. In the left sidebar, click **"API"**
2. Scroll down to **"CORS Origins"** section
3. Click **"Add CORS origin"**
4. Add these URLs (one at a time):

   ```
   http://localhost:3000
   ```

   ```
   http://localhost:3002
   ```

   ```
   http://localhost:3001
   ```

5. For each URL:
   - Check ✅ **"Allow credentials"**
   - Click **"Save"**

### Step 3: Restart Your Development Server

After adding the CORS origins:

1. Stop the server (Ctrl+C in terminal)
2. Restart it:
   ```bash
   npm run dev
   ```

### Step 4: Access Sanity Studio

Navigate to: **http://localhost:3002/studio**

You should now be able to access the Studio without CORS errors!

---

## Alternative: Use Sanity Deploy

If you prefer, you can also deploy Sanity Studio separately:

```bash
npm install -g @sanity/cli
sanity login
sanity deploy
```

This will give you a hosted Studio at: `https://your-project.sanity.studio`

---

## Why This Happens

Sanity uses CORS (Cross-Origin Resource Sharing) for security. By default, it only allows requests from authorized domains. Your localhost needs to be explicitly added to the allowed origins list.

---

## Need More Help?

- Sanity CORS Documentation: https://www.sanity.io/docs/cors
- Sanity Manage: https://www.sanity.io/manage
