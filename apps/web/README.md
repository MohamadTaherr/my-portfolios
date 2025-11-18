# Portfolio Website

A modern portfolio website built with Next.js, Prisma, and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 15
- **Database**: PostgreSQL (via Prisma ORM)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

1. Create a PostgreSQL database (locally or on Render)
2. Set your `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

3. Generate Prisma Client and push schema:

```bash
pnpm db:generate
pnpm db:push
```

Or for production migrations:

```bash
pnpm db:migrate
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` - Your PostgreSQL connection string
- `ADMIN_PASSWORD` - Password for admin panel access
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `RESEND_API_KEY` - For contact form (optional)

### 4. Run Development Server

```bash
pnpm dev
```

## Admin Panel

Access the admin panel at `/admin` to manage:
- Site settings
- Projects/Portfolio items
- Clients
- Page content
- Skills
- About section
- Navigation
- Footer

## Deployment on Render

### 1. Create PostgreSQL Database

1. Go to Render Dashboard
2. Create a new PostgreSQL database
3. Copy the Internal Database URL

### 2. Deploy Web Service

1. Connect your GitHub repository
2. Set build command: `pnpm install && pnpm db:generate && pnpm build`
3. Set start command: `pnpm start`
4. Add environment variables:
   - `DATABASE_URL` - Your Render PostgreSQL Internal Database URL
   - `ADMIN_PASSWORD` - Your admin password
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
   - `NODE_ENV` - `production`

### 3. Run Migrations

After first deployment, run migrations:

```bash
pnpm db:migrate
```

Or use Render's shell to run:
```bash
pnpm prisma migrate deploy
```

## Database Management

- View data: `pnpm db:studio` (opens Prisma Studio)
- Create migration: `pnpm db:migrate`
- Push schema changes: `pnpm db:push`

## Project Structure

```
apps/web/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── admin/     # Admin API routes
│   │   └── admin/         # Admin panel UI
│   ├── components/        # React components
│   └── lib/
│       ├── db.ts         # Prisma database client
│       └── auth.ts       # Authentication utilities
```
