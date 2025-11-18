# Portfolio Backend API

Express.js backend API for the portfolio website.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```env
DATABASE_URL="postgresql://..."
ADMIN_PASSWORD="your-secure-password"
FRONTEND_URL="http://localhost:3000"
PORT=10000
```

3. Initialize database:
```bash
pnpm db:generate
pnpm db:push
```

## Development

```bash
pnpm dev
```

Server runs on `http://localhost:10000`

## Deployment on Render

1. Connect GitHub repository
2. Render will auto-detect `render.yaml`
3. Set environment variables in Render dashboard
4. Deploy!

## API Endpoints

See main README.md for full API documentation.

