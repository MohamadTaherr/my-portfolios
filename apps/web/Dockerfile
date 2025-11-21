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

# CRITICAL: Unset NODE_ENV completely, then install with development mode
# Coolify injects ARG NODE_ENV=production which breaks dependency installation
RUN unset NODE_ENV && NODE_ENV=development pnpm install --frozen-lockfile

# Build stage
FROM node:20-alpine AS builder

# Install pnpm fresh in builder stage
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy everything from base stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/turbo.json ./
COPY --from=base /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=base /app/apps/web/package.json ./apps/web/

# Copy env file and web source
COPY .env.production .env.production
COPY apps/web ./apps/web

# Build Next.js app with explicit env vars (bypass any Coolify ARG injection)
RUN unset NODE_ENV && \
    export NODE_ENV=development && \
    export $(grep -v '^#' .env.production | grep 'NEXT_PUBLIC_' | xargs) && \
    pnpm --filter web run build

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

