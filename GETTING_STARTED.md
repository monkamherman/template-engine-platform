# 🚀 Getting Started with Next.js Fullstack Template

Welcome! This guide will help you get up and running with this Next.js fullstack template in minutes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.12.0 or higher
- **npm**, **yarn**, **pnpm**, or **bun** (bun is recommended)
- **Git**
- **A database** (PostgreSQL, MySQL, SQLite, or MongoDB)

## 🎯 Quick Start (5 minutes)

### Method 1: Using the Development Helper Script (Recommended ⭐)

The easiest way to get started:

```bash
# 1. Clone the repository
git clone https://github.com/Worketyamo-Students/NEXTJS-TEMPLATE-STARTER.git my-awesome-app
cd my-awesome-app

# 2. Make the helper script executable
chmod +x dev-helper.sh

# 3. Run quickstart (does everything for you!)
./dev-helper.sh quickstart
```

That's it! The script will:
- ✅ Install all dependencies
- ✅ Set up environment files
- ✅ Generate Prisma Client
- ✅ Run database migrations
- ✅ Optionally seed the database
- ✅ Start the development server

### Method 2: Manual Setup

If you prefer manual control:

#### 1. Clone the Repository

```bash
git clone https://github.com/Worketyamo-Students/NEXTJS-TEMPLATE-STARTER.git my-awesome-app
cd my-awesome-app
```

#### 2. Install Dependencies

```bash
npm install
# or
bun install
# or
yarn install
```

#### 3. Set Up Environment Variables

```bash
# Copy the template
cp .env.template .env

# Edit .env and add your database connection
nano .env
```

**For quick testing with SQLite** (no database server needed):
```env
DATABASE_URL="file:./dev.db"
```

**For PostgreSQL**:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

#### 4. Initialize the Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# (Optional) Seed with sample data
npm run db:seed
```

#### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

## 🛠️ Development Helper Script

This template includes a powerful bash script to simplify common tasks:

```bash
# View all available commands
./dev-helper.sh help

# Show project information
./dev-helper.sh info

# Common commands
./dev-helper.sh setup              # Initial setup
./dev-helper.sh dev                # Start dev server
./dev-helper.sh db:migrate         # Run migration
./dev-helper.sh db:studio          # Open database GUI
./dev-helper.sh check              # Full project check
./dev-helper.sh add:component      # Install ShadCN component
./dev-helper.sh docker:compose:up  # Start with Docker
```

## 🗄️ Database Setup Options

### Option 1: SQLite (Easiest - No Server Needed)

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:
```env
DATABASE_URL="file:./dev.db"
```

3. Run migrations:
```bash
npm run db:migrate
```

### Option 2: PostgreSQL (Recommended for Production)

#### Using Docker Compose

```bash
# Start PostgreSQL in Docker
docker-compose up -d postgres

# Database will be available at localhost:5432
```

#### Manual Setup

1. Install PostgreSQL
2. Create a database:
```bash
createdb myapp_dev
```

3. Update `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/myapp_dev?schema=public"
```

4. Run migrations:
```bash
npm run db:migrate
```

### Option 3: MySQL

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

3. Run migrations:
```bash
npm run db:migrate
```

## 🎨 Customizing Your Project

### 1. Update Project Metadata

Edit `package.json`:
```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "My awesome Next.js app"
}
```

### 2. Update Database Schema

Edit `prisma/schema.prisma` to add your models:

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

Then run:
```bash
npm run db:migrate
```

### 3. Create API Routes

Create `app/api/products/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse } from '@/lib/api-response';

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(successResponse(products));
}
```

### 4. Add UI Components

```bash
# Install additional shadcn components
npx shadcn@latest add table
npx shadcn@latest add form
npx shadcn@latest add dialog
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Create and run migration |
| `npm run db:push` | Push schema without migration |
| `npm run db:studio` | Open Prisma Studio (GUI) |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:reset` | Reset database (⚠️ dev only) |

## 🐳 Docker Deployment

### Development with Docker

```bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 --env-file .env my-app
```

### Full Stack with Docker Compose

```bash
# Copy docker environment template
cp .env.docker.template .env.docker

# Edit docker environment
nano .env.docker

# Start all services (app + database)
npm run docker:compose:up

# View logs
npm run docker:compose:logs

# Stop all services
npm run docker:compose:down
```

## 🔧 Common Tasks

### Adding a New Model

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Create API routes in `app/api/`
4. Create validation schemas in `lib/validations.ts`

### Adding State Management

State is managed with Zustand. Create a new store:

```typescript
// stores/product-store.ts
import { create } from 'zustand';

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
}));
```

### Adding Authentication

1. Install NextAuth.js:
```bash
npm install next-auth
```

2. Follow the [NextAuth.js documentation](https://next-auth.js.org/getting-started/example)

3. Update your User model in `prisma/schema.prisma` with NextAuth fields

## 🐛 Troubleshooting

### Prisma Client not generated

```bash
npm run db:generate
```

### Database connection issues

- Check your `DATABASE_URL` in `.env`
- Ensure database server is running
- Test connection with Prisma Studio: `npm run db:studio`

### Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- [ ] Read the [full documentation](README.md)
- [ ] Explore the [API routes](app/api/)
- [ ] Check out [Prisma documentation](https://www.prisma.io/docs)
- [ ] Learn about [Next.js App Router](https://nextjs.org/docs)
- [ ] Customize [TailwindCSS](tailwind.config.js)
- [ ] Deploy to [Vercel](https://vercel.com) or [Railway](https://railway.app)

## 💬 Need Help?

- 📖 [Full README](README.md)
- 🐛 [Report Issues](https://github.com/Worketyamo-Students/NEXTJS-TEMPLATE-STARTER/issues)
- 💬 [Discussions](https://github.com/Worketyamo-Students/NEXTJS-TEMPLATE-STARTER/discussions)

---

**Happy Building! 🚀**

Built with ❤️ by [DimitriTedom (SnowDev)](https://github.com/DimitriTedom)
