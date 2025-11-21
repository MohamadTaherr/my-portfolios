# PowerShell script to create .env.production from your existing values

Write-Host "Setting up .env.production file..." -ForegroundColor Cyan

$envContent = @"
# Production Environment Variables
# Generated from your Render and Vercel configuration

# Database Configuration
# Using your Render PostgreSQL database
DATABASE_URL=postgresql://portfolio_user:l9k0acN5JqqB9KpNTACpHHPsNxiA9xdE@dpg-d4enqcali9vc73b0g2o0-a/portfolio_db_efx6

# PostgreSQL Service Configuration (for Docker Compose - only if using local postgres)
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=portfolio_password
POSTGRES_DB=portfolio_db
POSTGRES_PORT=5432

# Backend Configuration
NODE_ENV=production
PORT=10000
BACKEND_URL=https://portfolio-backend-9i6h.onrender.com
FRONTEND_URL=http://localhost:3000,https://my-portfolios-studio.vercel.app

# Admin Credentials
ADMIN_PASSWORD=admin

# Frontend Configuration
NEXT_PUBLIC_API_URL=https://portfolio-backend-9i6h.onrender.com
NEXT_PUBLIC_SITE_URL=https://my-portfolios-studio.vercel.app

# Email Configuration (Resend)
RESEND_API_KEY=re_gWVYE7BF_Gxz4cMUXc27pvgk8J33kSEvc
CONTACT_EMAIL=anthonybechay1@gmail.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Backblaze B2 Storage (optional - leave empty if not using)
B2_APPLICATION_KEY_ID=
B2_APPLICATION_KEY=
B2_BUCKET_NAME=
B2_BUCKET_ID=

# Docker Port Mappings
BACKEND_PORT=10000
WEB_PORT=3000
"@

$envContent | Out-File -FilePath ".env.production" -Encoding utf8

Write-Host "✅ Created .env.production file" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Security Note: This file contains sensitive credentials." -ForegroundColor Yellow
Write-Host "   If you want to commit it to git, uncomment !.env.production in .gitignore" -ForegroundColor Yellow
Write-Host "   Otherwise, keep it gitignored and manage it through Coolify or your deployment platform." -ForegroundColor Yellow

