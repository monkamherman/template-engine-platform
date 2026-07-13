#!/bin/bash

# Next.js Fullstack Template Development Helper Script
# Created by DimitriTedom (SnowDev)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_db() {
    echo -e "${PURPLE}[DATABASE]${NC} $1"
}

print_docker() {
    echo -e "${CYAN}[DOCKER]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Setup function
setup() {
    print_status "Setting up Next.js Fullstack Template..."
    
    # Check Node.js
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 20+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        print_error "Node.js 20+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) detected"
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm install
    
    # Setup environment
    if [ ! -f .env ]; then
        print_status "Creating .env file from template..."
        cp .env.template .env
        print_warning "Please edit .env file with your database configuration"
    else
        print_warning ".env file already exists"
    fi
    
    # Setup Prisma
    print_db "Setting up Prisma..."
    npm run db:generate
    
    print_success "Setup completed!"
    echo ""
    print_warning "Next steps:"
    echo "  1. Edit .env file with your database connection"
    echo "  2. Run './dev-helper.sh db:migrate' to create database tables"
    echo "  3. Run './dev-helper.sh db:seed' to add sample data (optional)"
    echo "  4. Run './dev-helper.sh dev' to start development server"
}

# Development server
dev() {
    print_status "Starting development server..."
    npm run dev
}

# Build for production
build() {
    print_status "Building for production..."
    npm run build
    print_success "Build completed! Run './dev-helper.sh start' to test production build"
}

# Start production server
start() {
    print_status "Starting production server..."
    npm run start
}

# Lint code
lint() {
    print_status "Running ESLint..."
    npm run lint
    
    if [ $? -eq 0 ]; then
        print_success "No linting errors found!"
    else
        print_warning "Found linting errors."
    fi
}

# Type check
type_check() {
    print_status "Running TypeScript type checking..."
    npx tsc --noEmit
    
    if [ $? -eq 0 ]; then
        print_success "No type errors found!"
    else
        print_error "Type errors found. Please fix them before continuing."
    fi
}

# Prisma generate
db_generate() {
    print_db "Generating Prisma Client..."
    npm run db:generate
    print_success "Prisma Client generated!"
}

# Prisma migrate
db_migrate() {
    print_db "Running database migrations..."
    
    if [ ! -f .env ]; then
        print_error ".env file not found. Run './dev-helper.sh setup' first."
        exit 1
    fi
    
    read -p "Enter migration name: " migration_name
    
    if [ -z "$migration_name" ]; then
        print_error "Migration name cannot be empty"
        exit 1
    fi
    
    npm run db:migrate -- --name "$migration_name"
    print_success "Migration completed!"
}

# Prisma migrate deploy (production)
db_migrate_deploy() {
    print_db "Deploying migrations to production database..."
    npm run db:migrate:deploy
    print_success "Migrations deployed!"
}

# Prisma push
db_push() {
    print_db "Pushing schema changes to database..."
    print_warning "This will push schema changes without creating a migration"
    npm run db:push
    print_success "Schema pushed to database!"
}

# Prisma Studio
db_studio() {
    print_db "Opening Prisma Studio..."
    print_status "Prisma Studio will open at http://localhost:5555"
    npm run db:studio
}

# Database seed
db_seed() {
    print_db "Seeding database with sample data..."
    npm run db:seed
    print_success "Database seeded successfully!"
}

# Database reset
db_reset() {
    print_warning "This will DELETE ALL DATA in your database!"
    read -p "Are you sure? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        print_db "Resetting database..."
        npm run db:reset
        print_success "Database reset completed!"
    else
        print_status "Database reset cancelled"
    fi
}

# Database status
db_status() {
    print_db "Checking database migration status..."
    npx prisma migrate status
}

# Docker build
docker_build() {
    print_docker "Building Docker image..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    npm run docker:build
    print_success "Docker image built successfully!"
}

# Docker run
docker_run() {
    print_docker "Running Docker container..."
    
    if [ ! -f .env ]; then
        print_error ".env file not found. Please create it first."
        exit 1
    fi
    
    npm run docker:run
}

# Docker Compose up
docker_compose_up() {
    print_docker "Starting services with Docker Compose..."
    
    if ! command_exists docker-compose; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check for docker environment file
    if [ ! -f .env.docker ]; then
        print_status "Creating .env.docker from template..."
        cp .env.docker.template .env.docker
        print_warning "Please edit .env.docker file with your configuration"
    fi
    
    npm run docker:compose:up
    print_success "Services started! App: http://localhost:3000"
}

# Docker Compose down
docker_compose_down() {
    print_docker "Stopping Docker Compose services..."
    npm run docker:compose:down
    print_success "Services stopped!"
}

# Docker Compose logs
docker_compose_logs() {
    print_docker "Showing Docker Compose logs..."
    npm run docker:compose:logs
}

# Clean function
clean() {
    print_status "Cleaning project..."
    
    # Remove Next.js build directories
    rm -rf .next
    rm -rf out
    
    # Clear npm cache
    npm cache clean --force
    
    print_success "Project cleaned!"
}

# Deep clean (including node_modules)
clean_deep() {
    print_warning "This will remove node_modules and all build files"
    read -p "Are you sure? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        print_status "Deep cleaning project..."
        
        rm -rf .next
        rm -rf out
        rm -rf node_modules
        rm -rf package-lock.json
        
        print_success "Deep clean completed! Run './dev-helper.sh setup' to reinstall."
    else
        print_status "Deep clean cancelled"
    fi
}

# Full check (lint + type-check + prisma validate + build)
check() {
    print_status "Running full project check..."
    echo ""
    
    # Lint
    print_status "1/4 - Linting..."
    lint
    echo ""
    
    # Type check
    print_status "2/4 - Type checking..."
    type_check
    echo ""
    
    # Prisma validate
    print_status "3/4 - Validating Prisma schema..."
    npx prisma validate
    if [ $? -eq 0 ]; then
        print_success "Prisma schema is valid!"
    fi
    echo ""
    
    # Build
    print_status "4/4 - Building..."
    build
    echo ""
    
    print_success "All checks passed! Project is ready for production."
}

# Update dependencies
update() {
    print_status "Updating dependencies..."
    npm update
    print_status "Running security audit..."
    npm audit
    print_success "Dependencies updated!"
}

# Install ShadCN component
add_component() {
    if [ -z "$2" ]; then
        print_status "Available components: button, card, dialog, dropdown-menu, form, input, label, select, textarea, tooltip, etc."
        read -p "Enter component name: " component_name
    else
        component_name="$2"
    fi
    
    if [ -z "$component_name" ]; then
        print_error "Component name cannot be empty"
        exit 1
    fi
    
    print_status "Installing ShadCN component: $component_name"
    npx shadcn@latest add "$component_name"
    print_success "Component installed!"
}

# Quick start (setup + migrate + seed + dev)
quickstart() {
    print_status "Quick Start: Setting up everything..."
    echo ""
    
    setup
    echo ""
    
    print_db "Setting up database..."
    db_migrate
    echo ""
    
    read -p "Seed database with sample data? (yes/no): " seed_confirm
    if [ "$seed_confirm" = "yes" ]; then
        db_seed
        echo ""
    fi
    
    print_success "Quick start completed!"
    echo ""
    print_status "Starting development server..."
    dev
}

# Show project info
info() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}Next.js Fullstack Template${NC}"
    echo "Created by DimitriTedom (SnowDev)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📦 Tech Stack:"
    echo "  • Next.js 15 + React 19"
    echo "  • TypeScript"
    echo "  • Prisma ORM"
    echo "  • TailwindCSS + ShadCN/UI"
    echo "  • Zustand (State Management)"
    echo "  • Docker Ready"
    echo ""
    echo "📁 Project Structure:"
    echo "  • app/          - Pages & API routes"
    echo "  • components/   - React components"
    echo "  • lib/          - Utilities & Prisma"
    echo "  • prisma/       - Database schema"
    echo "  • stores/       - Zustand stores"
    echo ""
    echo "🔗 Quick Links:"
    echo "  • Docs: README.md"
    echo "  • Getting Started: GETTING_STARTED.md"
    echo "  • Cheat Sheet: CHEATSHEET.md"
    echo ""
    echo "Run './dev-helper.sh help' for available commands"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Show help
help() {
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}Next.js Fullstack Template - Development Helper${NC}"
    echo "Created by DimitriTedom (SnowDev)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Usage: ./dev-helper.sh [command]"
    echo ""
    echo -e "${BLUE}Setup Commands:${NC}"
    echo "  setup              - Initial project setup"
    echo "  quickstart         - Complete setup + database + dev server"
    echo "  info               - Show project information"
    echo ""
    echo -e "${BLUE}Development Commands:${NC}"
    echo "  dev                - Start development server"
    echo "  build              - Build for production"
    echo "  start              - Start production server"
    echo "  lint               - Run ESLint"
    echo "  type-check         - Run TypeScript type checking"
    echo "  check              - Full check (lint + type + prisma + build)"
    echo ""
    echo -e "${PURPLE}Database Commands:${NC}"
    echo "  db:generate        - Generate Prisma Client"
    echo "  db:migrate         - Create and run migration"
    echo "  db:migrate:deploy  - Deploy migrations (production)"
    echo "  db:push            - Push schema changes (no migration)"
    echo "  db:studio          - Open Prisma Studio GUI"
    echo "  db:seed            - Seed database with sample data"
    echo "  db:reset           - Reset database (⚠️  destructive)"
    echo "  db:status          - Check migration status"
    echo ""
    echo -e "${CYAN}Docker Commands:${NC}"
    echo "  docker:build       - Build Docker image"
    echo "  docker:run         - Run Docker container"
    echo "  docker:compose:up  - Start all services (app + database)"
    echo "  docker:compose:down - Stop all services"
    echo "  docker:compose:logs - Show Docker logs"
    echo ""
    echo -e "${BLUE}Utility Commands:${NC}"
    echo "  add:component      - Install ShadCN UI component"
    echo "  clean              - Clean build files"
    echo "  clean:deep         - Deep clean (removes node_modules)"
    echo "  update             - Update dependencies"
    echo "  help               - Show this help message"
    echo ""
    echo -e "${GREEN}Examples:${NC}"
    echo "  ./dev-helper.sh setup"
    echo "  ./dev-helper.sh quickstart"
    echo "  ./dev-helper.sh db:migrate"
    echo "  ./dev-helper.sh dev"
    echo "  ./dev-helper.sh check"
    echo "  ./dev-helper.sh add:component dialog"
    echo ""
    echo -e "${YELLOW}Tip:${NC} Run './dev-helper.sh info' to see project structure"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Main script logic
case "$1" in
    setup)
        setup
        ;;
    quickstart)
        quickstart
        ;;
    info)
        info
        ;;
    dev)
        dev
        ;;
    build)
        build
        ;;
    start)
        start
        ;;
    lint)
        lint
        ;;
    type-check)
        type_check
        ;;
    db:generate)
        db_generate
        ;;
    db:migrate)
        db_migrate
        ;;
    db:migrate:deploy)
        db_migrate_deploy
        ;;
    db:push)
        db_push
        ;;
    db:studio)
        db_studio
        ;;
    db:seed)
        db_seed
        ;;
    db:reset)
        db_reset
        ;;
    db:status)
        db_status
        ;;
    docker:build)
        docker_build
        ;;
    docker:run)
        docker_run
        ;;
    docker:compose:up)
        docker_compose_up
        ;;
    docker:compose:down)
        docker_compose_down
        ;;
    docker:compose:logs)
        docker_compose_logs
        ;;
    add:component)
        add_component "$@"
        ;;
    clean)
        clean
        ;;
    clean:deep)
        clean_deep
        ;;
    check)
        check
        ;;
    update)
        update
        ;;
    help|--help|-h)
        help
        ;;
    "")
        print_warning "No command specified."
        echo ""
        info
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac
