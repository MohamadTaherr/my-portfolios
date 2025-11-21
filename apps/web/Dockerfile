# Web (Next.js) Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy web package.json
COPY apps/web/package.json ./apps/web/

# IMPORTANT: Always install ALL dependencies (including devDependencies)
# Coolify passes NODE_ENV=production as build arg which would skip devDependencies
# We explicitly ignore the ARG and force development mode for install
RUN NODE_ENV=development pnpm install --frozen-lockfile

# Build stage
FROM base AS builder

# Force development mode for build (ignore any NODE_ENV build arg from Coolify)
ENV NODE_ENV=development

# Copy env file first for build-time variables
COPY .env.production .env.production

# Copy web source
COPY apps/web ./apps/web

# Build Next.js app (source env file to get NEXT_PUBLIC_* variables)
RUN set -a && . ./.env.production && set +a && pnpm --filter web run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built Next.js app from standalone output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

# Set correct permissions
RUN chown -R node:node /app
USER node

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Next.js (standalone creates server.js in the root)
CMD ["node", "server.js"]

