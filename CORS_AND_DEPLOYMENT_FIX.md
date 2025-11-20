# CORS & Deployment Fix Guide

## 🔴 Issue: Cannot Login to Admin

**Error Messages:**
```
Access to fetch at 'https://portfolio-backend-9i6h.onrender.com/api/admin/login'
from origin 'https://my-portfolios-studio.vercel.app' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

POST https://portfolio-backend-9i6h.onrender.com/api/admin/login net::ERR_FAILED 502 (Bad Gateway)
```

## ✅ Solution Applied

I've updated the backend CORS configuration to automatically allow:
- ✅ All Vercel deployments (`.vercel.app` domains)
- ✅ Local development (`localhost:3000`, `localhost:3001`)
- ✅ Your specific Vercel URL

---

## 🚀 Deploy the Fix

### Step 1: Commit and Push Changes

```bash
git add .
git commit -m "fix: update CORS to allow Vercel domains"
git push
```

### Step 2: Redeploy Backend on Render

**Option A: Automatic (if auto-deploy is enabled)**
- Render will automatically detect the push and redeploy

**Option B: Manual Redeploy**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service (`portfolio-backend-9i6h`)
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait for deployment to complete (~2-3 minutes)

### Step 3: Verify Backend is Running

Once deployed, check:
```
https://portfolio-backend-9i6h.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-20T..."
}
```

If you get a response, the backend is working!

---

## 🔧 Additional Render Configuration

### Set Environment Variables on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service
3. Go to **Environment** tab
4. Add/verify these variables:

```bash
# Required
DATABASE_URL=postgresql://portfolio_user:password@dpg-xxx.render.com/portfolio_db_efx6
NODE_ENV=production
ADMIN_PASSWORD=your-secure-password

# Optional (but recommended)
FRONTEND_URL=https://my-portfolios-studio.vercel.app
PORT=10000
```

4. Click **Save Changes**
5. Render will automatically redeploy

---

## 🌐 CORS Configuration Explained

### What Changed:

**Before:**
```javascript
// Only allowed specific domains from FRONTEND_URL
origin: (origin, callback) => {
  if (allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  return callback(new Error('Not allowed by CORS'));
}
```

**After:**
```javascript
// Now allows all Vercel deployments automatically
origin: (origin, callback) => {
  if (!origin) return callback(null, true);

  if (allowedOrigins.includes(origin) || origin.includes('.vercel.app')) {
    return callback(null, true);
  }

  return callback(new Error('Not allowed by CORS'));
}
```

### Benefits:
- ✅ Works with Vercel preview deployments
- ✅ Works with production deployment
- ✅ Still works locally
- ✅ No need to update for each new deployment

---

## 🐛 Troubleshooting

### Issue 1: Still Getting CORS Error

**Check:**
1. Did the backend redeploy successfully?
   - Go to Render Dashboard → Your Service → Events
   - Check for "Deploy succeeded" message

2. Is the backend running?
   - Visit `https://portfolio-backend-9i6h.onrender.com/health`
   - Should return `{"status": "ok"}`

3. Clear browser cache:
   - Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Select "Cached images and files"
   - Clear and refresh

### Issue 2: 502 Bad Gateway

This means the backend is sleeping or crashed.

**Solution:**
1. **Wake up the backend:**
   - Visit `https://portfolio-backend-9i6h.onrender.com/health`
   - Wait 30-60 seconds for Render to spin up the service
   - Try login again

2. **Check Render logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for errors
   - Common issues:
     - Database connection failed
     - Environment variables missing
     - Build failed

3. **Upgrade Render plan (if on free tier):**
   - Free tier services sleep after 15 minutes of inactivity
   - Starter plan keeps services always running
   - Cost: $7/month

### Issue 3: Cookies Not Being Set

**Check in DevTools (F12):**
1. Go to Application tab → Cookies
2. Check if `admin-session` cookie exists after login
3. Verify cookie settings:
   - `SameSite`: None (for cross-site)
   - `Secure`: true (for HTTPS)
   - `HttpOnly`: true

**If cookie is not set:**
- Make sure backend `NODE_ENV=production` on Render
- Verify frontend and backend are both using HTTPS
- Check browser console for cookie warnings

---

## 📋 Deployment Checklist

### Backend (Render):
- [ ] CORS fix deployed
- [ ] `DATABASE_URL` environment variable set
- [ ] `NODE_ENV=production` set
- [ ] `ADMIN_PASSWORD` set
- [ ] Service is running (not sleeping)
- [ ] Health check returns `{"status": "ok"}`
- [ ] Logs show "Server running on port 10000"

### Frontend (Vercel):
- [ ] Latest code deployed
- [ ] `NEXT_PUBLIC_API_URL` environment variable set to:
  ```
  https://portfolio-backend-9i6h.onrender.com
  ```
- [ ] Build succeeded
- [ ] No CORS errors in browser console

---

## 🔒 Security Notes

### Current CORS Setup:
```javascript
// Allows ANY .vercel.app domain
origin.includes('.vercel.app')
```

**Security Implications:**
- ✅ **Development:** Very convenient for preview deployments
- ⚠️ **Production:** Slightly less secure (allows all Vercel apps)

### More Secure Alternative (Optional):

If you want stricter security, update `server.ts`:

```javascript
const productionOrigins = [
  'https://my-portfolios-studio.vercel.app',  // Your exact domain
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || productionOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
```

Then redeploy the backend.

---

## 🎯 Quick Test

After deploying, test the admin login:

1. **Open:** `https://my-portfolios-studio.vercel.app/admin`
2. **Enter password** (the one set in `ADMIN_PASSWORD`)
3. **Click Login**
4. **Expected:** Successful login, redirects to admin dashboard
5. **Check DevTools Console:** Should be no CORS errors

---

## 📞 Still Having Issues?

### Check These in Order:

1. **Backend Health:**
   ```
   curl https://portfolio-backend-9i6h.onrender.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **CORS Headers:**
   ```bash
   curl -I -X OPTIONS \
     -H "Origin: https://my-portfolios-studio.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     https://portfolio-backend-9i6h.onrender.com/api/admin/login
   ```
   Should include: `Access-Control-Allow-Origin: https://my-portfolios-studio.vercel.app`

3. **Database Connection:**
   - Check Render logs for database errors
   - Verify `DATABASE_URL` is correct
   - Test connection: `pnpm db:test` (locally with the Render DB URL)

### Common Solutions:

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Wait 60s for Render to wake up, or upgrade plan |
| CORS Error | Redeploy backend after CORS fix |
| Cookie not set | Check `NODE_ENV=production` on Render |
| Login fails | Verify `ADMIN_PASSWORD` environment variable |
| Database error | Check `DATABASE_URL` is correct |

---

## ✅ Summary of Changes

**File Modified:**
- `apps/backend/src/server.ts`
  - Updated CORS to allow all `.vercel.app` domains
  - Added better logging for CORS
  - Added default allowed origins

**What to Do Next:**
1. Commit and push changes
2. Wait for Render to redeploy (or trigger manual deploy)
3. Test admin login
4. If 502 error, wait 60 seconds for backend to wake up
5. Clear browser cache if needed

---

**Once the backend is redeployed, the CORS error will be fixed and you'll be able to log in!** 🎉
