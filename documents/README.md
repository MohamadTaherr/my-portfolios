# Documentation

This folder contains all technical documentation for the portfolio website project.

## Documents

### [ARCHITECTURE.md](./ARCHITECTURE.md)
Complete system architecture documentation including:
- Docker architecture (docker-compose.yml, Dockerfiles)
- Application architecture (Frontend, Backend, Database, Storage)
- Technology stack
- Data flow diagrams
- Deployment architecture
- Design decisions and performance optimizations

### [BACKBLAZE_FLOW.md](./BACKBLAZE_FLOW.md)
Detailed documentation of the Backblaze B2 file storage integration:
- Upload flow (Admin → Backend → Backblaze)
- Retrieval flow (Database → Frontend → Backblaze)
- File organization structure
- Example workflows
- Key implementation details

## Quick Reference

**For deployment**: See [ARCHITECTURE.md](./ARCHITECTURE.md) → Deployment Architecture

**For file uploads**: See [BACKBLAZE_FLOW.md](./BACKBLAZE_FLOW.md)

**For Docker setup**: See [ARCHITECTURE.md](./ARCHITECTURE.md) → Docker Architecture

**For development**: See root [README.md](../README.md)

