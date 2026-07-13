# ⚡ Quick Reference Cheat Sheet

## �️ Development Helper Script (Recommended)

```bash
# Make executable (first time)
chmod +x dev-helper.sh

# Quick start everything
./dev-helper.sh quickstart

# Common commands
./dev-helper.sh setup           # Initial setup
./dev-helper.sh dev             # Start dev server
./dev-helper.sh db:migrate      # Run migration
./dev-helper.sh db:studio       # Open database GUI
./dev-helper.sh check           # Full project check
./dev-helper.sh add:component   # Install UI component
./dev-helper.sh help            # Show all commands
```

## 🚀 NPM Commands

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database (Prisma)
```bash
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Create & apply migration
npm run db:push          # Push schema changes (no migration)
npm run db:studio        # Open Prisma Studio (GUI)
npm run db:seed          # Seed database with data
npm run db:reset         # Reset database (⚠️ destructive)
```

### Docker
```bash
npm run docker:build           # Build Docker image
npm run docker:run             # Run Docker container
npm run docker:compose:up      # Start all services
npm run docker:compose:down    # Stop all services
npm run docker:compose:logs    # View logs
```

## 📁 Key Files & Locations

### Configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - TailwindCSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - ShadCN/UI configuration
- `prisma/schema.prisma` - Database schema

### Environment
- `.env` - Environment variables (git ignored)
- `.env.template` - Environment template (commit this)
- `.env.docker.template` - Docker environment template

### Important Directories
- `app/` - Next.js pages and API routes
- `app/api/` - API endpoints
- `components/ui/` - UI components (ShadCN)
- `lib/` - Utility functions
- `stores/` - Zustand state stores
- `prisma/` - Database schema & migrations

## 🗄️ Database Quick Reference

### Change Database Provider
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql" // or: mysql, sqlite, mongodb
  url      = env("DATABASE_URL")
}
```

### Connection Strings
```bash
# PostgreSQL
DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"

# MySQL
DATABASE_URL="mysql://user:pass@localhost:3306/db"

# SQLite
DATABASE_URL="file:./dev.db"

# MongoDB
DATABASE_URL="mongodb://localhost:27017/db"
```

### Prisma Commands
```bash
npx prisma init              # Initialize Prisma
npx prisma generate          # Generate client
npx prisma migrate dev       # Create migration
npx prisma migrate deploy    # Apply migrations (production)
npx prisma migrate reset     # Reset database
npx prisma studio            # Open GUI
npx prisma db push           # Push without migration
npx prisma db pull           # Pull from existing DB
npx prisma format            # Format schema file
npx prisma validate          # Validate schema
```

## 🎨 Adding UI Components

```bash
# Browse available components
npx shadcn@latest add

# Add specific components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## 🔧 Common Code Snippets

### 📚 API Documentation (Swagger)
```bash
# Access Swagger UI
http://localhost:3000/api-docs

# Access Swagger JSON
http://localhost:3000/api/docs
```

### Create API Route with Swagger & Logging
```typescript
// app/api/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logRequest } from '@/lib/morgan';

/**
 * @swagger
 * /api/items:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Successful response
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  try {
    const items = await prisma.item.findMany();
    const response = NextResponse.json({ success: true, data: items });
    logRequest(request, 200, Date.now() - startTime);
    return response;
  } catch (error) {
    logRequest(request, 500, Date.now() - startTime);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Add Prisma Model
```prisma
// prisma/schema.prisma
model Item {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("items")
}
```

### Create Zustand Store
```typescript
// stores/item-store.ts
import { create } from 'zustand';

interface ItemStore {
  items: Item[];
  addItem: (item: Item) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
}));
```

### Add Validation Schema
```typescript
// lib/validations.ts
import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name required'),
  description: z.string().optional(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
```

## 🐳 Docker Quick Start

### Single Container
```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env my-app
```

### With Docker Compose
```bash
# Setup
cp .env.docker.template .env.docker
nano .env.docker

# Run
docker-compose up -d

# Logs
docker-compose logs -f app

# Stop
docker-compose down
```

## 🔍 Debugging

### Check Logs
```bash
# Development
npm run dev

# Docker logs
docker-compose logs -f

# Check specific service
docker-compose logs -f app
```

### Database Issues
```bash
# Test connection
npx prisma studio

# Regenerate client
npm run db:generate

# Check migrations
npx prisma migrate status

# Reset if needed (⚠️ development only)
npm run db:reset
```

### Port Issues
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

## 📦 Installation Shortcuts

### Common Packages
```bash
# Authentication
npm install next-auth

# Forms
npm install react-hook-form @hookform/resolvers zod

# Date handling
npm install date-fns

# HTTP client
npm install axios

# UUID
npm install uuid
npm install -D @types/uuid
```

## 🔒 Environment Variables

### Client-side (Exposed to browser)
```env
NEXT_PUBLIC_APP_NAME="My App"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### Server-side (Secure)
```env
DATABASE_URL="..."
JWT_SECRET="..."
API_SECRET="..."
```

## 🚀 Deployment Quick Links

### Vercel
```bash
npm i -g vercel
vercel login
vercel
```

### Railway
1. Connect GitHub repo
2. Add DATABASE_URL env var
3. Deploy!

### Docker
```bash
docker build -t app .
docker run -p 3000:3000 --env-file .env app
```

## 📚 Important Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [ShadCN/UI](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev)

## 💡 Pro Tips

1. Use `npx prisma studio` for quick database inspection
2. Run `npm run db:generate` after changing schema
3. Use TypeScript strict mode for better type safety
4. Keep API routes thin - move logic to lib/
5. Use Server Components by default, Client Components when needed
6. Validate all inputs with Zod schemas
7. Use environment variables for all configs
8. Never commit `.env` file
9. Use Docker Compose for local development
10. Test migrations before deploying

---

**Keep this handy! 📌**
