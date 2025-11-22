# Backend Dockerfile - Simplified for Coolify
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/

# Install ALL dependencies (force development to get devDependencies)
RUN NODE_ENV=development pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app

# Copy Prisma schema first (needed for generation)
COPY apps/backend/prisma ./apps/backend/prisma

# Copy source
COPY apps/backend ./apps/backend

# Generate Prisma client (must be before TypeScript build)
RUN pnpm --filter backend run db:generate

# Build TypeScript
RUN pnpm --filter backend run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install OpenSSL for Prisma compatibility
RUN apk add --no-cache openssl

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --frozen-lockfile --prod

# Copy built files
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Regenerate Prisma client for Alpine runtime
RUN pnpm --filter backend run db:generate

# Create uploads directory
RUN mkdir -p /app/apps/backend/uploads

EXPOSE 10000
ENV NODE_ENV=production
ENV PORT=10000

CMD ["node", "apps/backend/dist/server.js"]
