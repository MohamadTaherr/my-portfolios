# Backend Dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY turbo.json ./

# Copy backend package.json
COPY apps/backend/package.json ./apps/backend/

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
COPY --from=base /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=base /app/apps/backend/package.json ./apps/backend/

# Copy backend source
COPY apps/backend ./apps/backend

# Generate Prisma Client and build (with NODE_ENV unset to avoid Coolify ARG injection)
RUN unset NODE_ENV && NODE_ENV=development pnpm --filter backend run db:generate
RUN unset NODE_ENV && NODE_ENV=development pnpm --filter backend run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Install production dependencies (Prisma is in dependencies)
RUN pnpm install --frozen-lockfile --prod

# Copy built files from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Regenerate Prisma client in production stage (needed for runtime)
RUN pnpm --filter backend run db:generate

# Create uploads directory
RUN mkdir -p /app/apps/backend/uploads

# Expose port
EXPOSE 10000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["node", "apps/backend/dist/server.js"]

