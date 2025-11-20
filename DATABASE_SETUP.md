# Database Setup & Troubleshooting Guide

## 🔧 Quick Fix: Test Your Database Connection

Run this first to diagnose the issue:

```bash
cd apps/backend
pnpm db:test
```

This will tell you exactly what's wrong with your database connection.

---

## 📋 Step-by-Step Setup

### Step 1: Get the Correct Database URL

1. Go to **[Render Dashboard](https://dashboard.render.com)**
2. Click on your PostgreSQL database
3. Look for **"Connections"** or **"Connection Information"**
4. Copy the **"External Database URL"** or **"Connection String"**

It should look like one of these:
```
# Format 1: With region
postgresql://portfolio_user:password@dpg-xxx.oregon-postgres.render.com/portfolio_db

# Format 2: Simple .render.com
postgresql://portfolio_user:password@dpg-xxx.render.com/portfolio_db

# Format 3: Other regions
postgresql://portfolio_user:password@dpg-xxx.frankfurt-postgres.render.com/portfolio_db
postgresql://portfolio_user:password@dpg-xxx.singapore-postgres.render.com/portfolio_db
```

### Step 2: Update Your .env File

Open `apps/backend/.env` and replace the DATABASE_URL:

```bash
# Replace this entire line with your Render URL
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@[CORRECT-HOST-HERE]/portfolio_db_efx6

NODE_ENV=development
ADMIN_PASSWORD=your-secure-password-here
PORT=3001
```

### Step 3: Test the Connection

```bash
cd apps/backend
pnpm db:test
```

**If it succeeds**, you'll see:
```
✅ Successfully connected to database!
✅ Query executed successfully
🎉 Database connection is working!
```

**If it fails**, the script will tell you exactly what to fix.

### Step 4: Push the Schema

Once connected:
```bash
pnpm db:push
```

This creates all the tables and initializes default data.

### Step 5: Run Cleanup (Optional)

```bash
pnpm cleanup
```

---

## ❌ Common Issues & Solutions

### Issue 1: "Can't reach database server"

**Error:**
```
Error: P1001: Can't reach database server at `dpg-xxx:5432`
```

**Solutions:**

1. **Check the hostname format in Render:**
   - Go to Render Dashboard → Database → Connections
   - The hostname should include a region suffix
   - Examples:
     - ✅ `dpg-xxx.oregon-postgres.render.com`
     - ✅ `dpg-xxx.render.com`
     - ❌ `dpg-xxx` (incomplete)

2. **Enable External Connections:**
   - In Render Dashboard, go to your database
   - Check if "Allow External Connections" is enabled
   - If not, enable it and save

3. **Check IP Whitelist:**
   - Some Render plans require IP whitelisting
   - Add your IP address to the allowed list
   - Or use "Allow from anywhere" (less secure but works)

4. **Database Sleeping (Free Tier):**
   - Free tier databases sleep after 15 minutes of inactivity
   - Solution: Upgrade plan or wait for it to wake up (can take 30-60 seconds)

### Issue 2: "Environment variable not found: DATABASE_URL"

**Error:**
```
Environment variable not found: DATABASE_URL
```

**Solution:**

1. Make sure `.env` file exists in `apps/backend/`
2. Check the file contains:
   ```bash
   DATABASE_URL=postgresql://...
   ```
3. Restart your terminal/IDE to load new environment variables

### Issue 3: Connection works but tables don't exist

**Symptom:**
```
✅ Successfully connected to database!
⚠ SiteSettings table does not exist yet.
```

**Solution:**
```bash
pnpm db:push
```

This creates all the tables.

### Issue 4: "The server has closed the connection"

**Error:**
```
Error: P1017: Server has closed the connection
```

**Solutions:**

1. **Database is sleeping** - Wait 30 seconds and try again
2. **Connection timeout** - Your network might be slow/unstable
3. **Too many connections** - Close other database connections

---

## 🔍 Manual Verification

### Test 1: Can you ping the server?

```bash
# Windows
ping dpg-d4enqcali9vc73b0g2o0-a.render.com

# Mac/Linux
ping -c 4 dpg-d4enqcali9vc73b0g2o0-a.render.com
```

If this fails, the hostname is wrong.

### Test 2: Can you connect via psql?

If you have PostgreSQL installed:

```bash
psql "postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@[HOST]/portfolio_db_efx6"
```

If this works but Prisma doesn't, there might be a Prisma configuration issue.

### Test 3: Check Render Dashboard

1. Go to your database in Render
2. Check "Status" - should be **"Available"**, not "Sleeping"
3. Check "Connections" - should show connection details
4. Check "Events" - look for any errors or warnings

---

## 📝 Different Database URL Formats

Render databases can have different URL formats depending on:
- Region (Oregon, Frankfurt, Singapore, etc.)
- Account type (Free, Starter, Pro)
- When the database was created

### Try these in order:

```bash
# 1. With .render.com (most common)
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a.render.com/portfolio_db_efx6

# 2. Oregon region
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a.oregon-postgres.render.com/portfolio_db_efx6

# 3. Frankfurt region
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a.frankfurt-postgres.render.com/portfolio_db_efx6

# 4. Singapore region
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a.singapore-postgres.render.com/portfolio_db_efx6
```

**Best approach:** Just copy the entire URL from Render Dashboard!

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
cd apps/backend

# 1. Test connection
pnpm db:test
# Should see: ✅ Successfully connected to database!

# 2. Push schema
pnpm db:push
# Should see: "Your database is now in sync with your Prisma schema"

# 3. Run cleanup (optional)
pnpm cleanup
# Should see: "✅ Cleanup completed successfully!"

# 4. Start the backend
pnpm dev
# Should see: "Server running on http://localhost:3001"
```

---

## 🚀 Once Everything Works

### Development workflow:

```bash
# Terminal 1: Backend
cd apps/backend
pnpm dev

# Terminal 2: Frontend
cd apps/web
pnpm dev
```

Visit:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- Backend API: http://localhost:3001

---

## 🆘 Still Having Issues?

### Get detailed Prisma logs:

Add this to `apps/backend/.env`:
```bash
DEBUG=prisma*
```

Then run:
```bash
pnpm db:test
```

### Check Render Status:

Visit [Render Status Page](https://status.render.com) to see if there are any outages.

### Contact Render Support:

If the database is on Render's side:
1. Go to Render Dashboard
2. Your Database → "Support" tab
3. Open a ticket

---

## 📊 Database Info

Your current setup:
- **Database Name:** `portfolio_db_efx6`
- **User:** `portfolio_user`
- **Host ID:** `dpg-d4enqcali9vc73b0g2o0-a`
- **Provider:** Render PostgreSQL

**Note:** The exact hostname with region suffix needs to be confirmed in your Render Dashboard.

---

**Need more help?** Run `pnpm db:test` and share the output - it will pinpoint the exact issue!
