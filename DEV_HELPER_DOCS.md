# 🛠️ Development Helper Script Documentation

## Overview

The `dev-helper.sh` script is a comprehensive bash utility designed to streamline your development workflow. It provides easy-to-use commands for common tasks like setup, database management, Docker operations, and more.

## Installation

The script is already included in your project. Just make it executable:

```bash
chmod +x dev-helper.sh
```

## Quick Reference

### Essential Commands

```bash
./dev-helper.sh quickstart         # Complete setup in one command
./dev-helper.sh dev                # Start development server
./dev-helper.sh db:migrate         # Run database migration
./dev-helper.sh db:studio          # Open Prisma Studio
./dev-helper.sh check              # Run all quality checks
```

## Command Categories

### 🚀 Setup Commands

| Command | Description |
|---------|-------------|
| `setup` | Initial project setup - installs dependencies, creates .env, generates Prisma Client |
| `quickstart` | Complete automated setup including database migration and seeding |
| `info` | Display project information and structure |

**Example:**
```bash
# First-time setup
./dev-helper.sh setup

# Or use quickstart for everything at once
./dev-helper.sh quickstart
```

### 💻 Development Commands

| Command | Description |
|---------|-------------|
| `dev` | Start Next.js development server |
| `build` | Build project for production |
| `start` | Start production server |
| `lint` | Run ESLint code linting |
| `type-check` | Run TypeScript type checking |
| `check` | Full project check (lint + type + prisma + build) |

**Example:**
```bash
# Start development
./dev-helper.sh dev

# Full quality check before committing
./dev-helper.sh check
```

### 🗄️ Database Commands

| Command | Description |
|---------|-------------|
| `db:generate` | Generate Prisma Client from schema |
| `db:migrate` | Create and run a new migration |
| `db:migrate:deploy` | Deploy migrations to production |
| `db:push` | Push schema changes without creating migration |
| `db:studio` | Open Prisma Studio (visual database browser) |
| `db:seed` | Populate database with sample data |
| `db:reset` | ⚠️ Reset database (destructive - removes all data) |
| `db:status` | Check migration status |

**Example:**
```bash
# After modifying schema
./dev-helper.sh db:migrate

# Browse your database
./dev-helper.sh db:studio

# Add sample data
./dev-helper.sh db:seed
```

### 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `docker:build` | Build Docker image |
| `docker:run` | Run Docker container |
| `docker:compose:up` | Start all services (app + database) |
| `docker:compose:down` | Stop all services |
| `docker:compose:logs` | View Docker Compose logs |

**Example:**
```bash
# Full stack with Docker Compose
./dev-helper.sh docker:compose:up

# View logs
./dev-helper.sh docker:compose:logs

# Stop everything
./dev-helper.sh docker:compose:down
```

### 🔧 Utility Commands

| Command | Description |
|---------|-------------|
| `add:component` | Install ShadCN UI component (interactive) |
| `clean` | Clean build files and cache |
| `clean:deep` | Deep clean (removes node_modules) |
| `update` | Update dependencies |
| `help` | Show help message |

**Example:**
```bash
# Add a new UI component
./dev-helper.sh add:component

# Clean build files
./dev-helper.sh clean
```

## Common Workflows

### 1. First Time Setup

```bash
# Clone repository
git clone <repo-url>
cd <project>

# Complete setup
chmod +x dev-helper.sh
./dev-helper.sh quickstart
```

### 2. Daily Development

```bash
# Start coding
./dev-helper.sh dev

# View database
./dev-helper.sh db:studio

# Before committing
./dev-helper.sh check
```

### 3. Database Changes

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
./dev-helper.sh db:migrate

# Or just push changes (development)
./dev-helper.sh db:push
```

### 4. Adding UI Components

```bash
# Interactive component installer
./dev-helper.sh add:component

# Or specify component directly
./dev-helper.sh add:component dialog
```

### 5. Docker Deployment

```bash
# Build image
./dev-helper.sh docker:build

# Run container
./dev-helper.sh docker:run

# Or use Docker Compose
./dev-helper.sh docker:compose:up
```

### 6. Production Deployment

```bash
# Run all checks
./dev-helper.sh check

# Deploy migrations
./dev-helper.sh db:migrate:deploy

# Build production
./dev-helper.sh build

# Start production server
./dev-helper.sh start
```

## Features

### ✅ Color-Coded Output

The script uses colored output for better readability:
- 🔵 **Blue** - Informational messages
- 🟢 **Green** - Success messages
- 🟡 **Yellow** - Warnings
- 🔴 **Red** - Error messages
- 🟣 **Purple** - Database operations
- 🔷 **Cyan** - Docker operations

### ✅ Safety Checks

- **Node.js version check** - Ensures Node.js 20+ is installed
- **Confirmation prompts** - Asks for confirmation on destructive operations
- **Dependency checks** - Verifies Docker/Docker Compose before use
- **File existence checks** - Ensures required files exist

### ✅ Intelligent Defaults

- Automatically creates `.env` from template if missing
- Creates `.env.docker` from template for Docker Compose
- Provides helpful error messages and suggestions
- Shows next steps after operations

## Troubleshooting

### Script not executable

```bash
chmod +x dev-helper.sh
```

### Command not found

Make sure you're in the project directory:
```bash
cd /path/to/project
./dev-helper.sh help
```

### Node.js version error

Upgrade Node.js to version 20 or higher:
```bash
# Using nvm
nvm install 20
nvm use 20
```

### Database connection error

1. Check your `.env` file has correct `DATABASE_URL`
2. Ensure database server is running
3. Test connection: `./dev-helper.sh db:studio`

### Docker not found

Install Docker:
- Ubuntu: `sudo apt install docker.io`
- Mac: Install Docker Desktop
- Windows: Install Docker Desktop

## Advanced Usage

### Chaining Commands

```bash
# Clean, setup, and start
./dev-helper.sh clean && ./dev-helper.sh setup && ./dev-helper.sh dev
```

### Custom Migration Names

The script prompts for migration names:
```bash
./dev-helper.sh db:migrate
# Enter migration name: add_user_roles
```

### Environment-Specific Runs

```bash
# Use different env file
ENV_FILE=.env.staging ./dev-helper.sh dev
```

## Tips & Best Practices

1. **Run `check` before committing** - Catches issues early
2. **Use `quickstart` for new contributors** - Gets them up and running fast
3. **Regular `db:studio`** - Visual database inspection is faster
4. **Keep scripts updated** - Pull latest changes regularly
5. **Customize as needed** - The script is yours to modify

## Contributing

Found a bug or want to add a feature? Edit the script:

```bash
nano dev-helper.sh
```

Common additions:
- Custom deployment commands
- Integration with CI/CD
- Custom linting rules
- Project-specific workflows

## Support

Need help?
- Run: `./dev-helper.sh help`
- Check: `GETTING_STARTED.md`
- Read: `README.md`
- Open: GitHub Issues

---

**Happy Developing! 🚀**

Created with ❤️ by DimitriTedom (SnowDev)
