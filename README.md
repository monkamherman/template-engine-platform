# Template Engine Platform

Official commercial platform for the Woo App Commercial Template Engine.

This repository contains the Next.js application used to present, sell, license, deliver and support the commercial WordPress/WooCommerce template engine maintained separately in `monkamherman/woo-app-theme`.

## Current Status

Sprint 01 is transforming the generic starter into a commercial platform foundation. The codebase now uses locale-ready App Router routes, Prisma/PostgreSQL domain models, server-owned pricing rules and pure tests for initial entitlement, license and release-access behavior.

## Product Boundary

- `template-engine-platform`: sales, checkout orchestration, customer portal, licensing, releases and support operations.
- `woo-app-theme`: private WordPress/WooCommerce product source and release packaging.

Do not commit theme source, private ZIP archives, customer secrets, production credentials, database dumps or permanent object-storage URLs.

## Commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Documentation

- [`AGENTS.md`](./AGENTS.md): permanent repository instructions.
- [`docs/product-scope.md`](./docs/product-scope.md): product boundaries and V1 outcomes.
- [`docs/architecture.md`](./docs/architecture.md): target technical architecture.
- [`docs/database-model.md`](./docs/database-model.md): initial domain and data model.
- [`docs/sprints/sprint-01-foundation.md`](./docs/sprints/sprint-01-foundation.md): active sprint.

## Environment

Copy `.env.example` to `.env` for local development and replace every development placeholder before any production deployment.
