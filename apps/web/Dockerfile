# Web (Next.js) Dockerfile - Simplified for Coolify
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/

# Install ALL dependencies (force development to get devDependencies)
RUN NODE_ENV=development pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app

# Accept Coolify's build args for NEXT_PUBLIC_* variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID

# Set them as ENV for Next.js build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID

# Copy source
COPY apps/web ./apps/web

# Build
RUN pnpm --filter web run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy the standalone output (includes server.js at root of standalone)
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

RUN chown -R node:node /app
USER node

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The standalone output creates server.js in apps/web/ for monorepo
CMD ["node", "apps/web/server.js"]
