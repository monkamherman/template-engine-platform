# Sprint 01 — Foundation and Starter Cleanup

## Goal

Transform the generic SnowDev starter into a clean, testable foundation for the Template Engine commercial platform without implementing real payments, production authentication or automatic WordPress updates.

## Context discovered during audit

The starter currently includes:

- Next.js `15.3.3` and React 19;
- TypeScript and App Router;
- Tailwind/UI components;
- Prisma `6.17.x` with PostgreSQL configuration;
- generic `User`, `Profile` and `Post` demo models;
- generic template landing page and external starter branding;
- a malformed/duplicated starter README;
- scripts that include obsolete or unverified commands such as `next lint`;
- no project-specific tests or domain boundaries.

Do not treat starter claims such as “production ready” or “WCAG compliant” as verified facts.

## Deliverables

### 1. Normalize the repository

- Use `pnpm` as the documented package manager and commit the appropriate lockfile.
- Rename the package to `template-engine-platform`.
- remove starter author/organization branding and dead external links;
- remove demo-only pages, API examples, stores and utilities that have no approved V1 use;
- keep useful UI primitives only when they compile and are actually reusable;
- replace the template README with the project README already present on this branch;
- ensure `.gitignore` excludes `.env`, build output, database dumps, local storage artifacts and private ZIP files.

Do not delete Docker support merely because it is unused locally; first verify whether it can provide a useful PostgreSQL development path. Simplify or remove it only with a documented reason.

### 2. Toolchain and scripts

Create reliable scripts:

```text
dev
build
start
lint
typecheck
test
test:watch (optional)
db:generate
db:migrate
db:migrate:deploy
db:seed
db:studio
```

Requirements:

- `lint` must use the supported ESLint CLI/configuration for the installed Next.js version;
- `typecheck` must run TypeScript with no output;
- introduce a lightweight test runner compatible with React 19 and TypeScript;
- do not add a large testing stack without tests that use it;
- run dependency audit and remove packages that only served the starter demo;
- upgrades must be intentional, compatibility-checked and recorded in the PR.

Do not upgrade major framework versions and restructure business code in the same commit.

### 3. Environment validation

Add `.env.example` and a server-only environment module using Zod.

Sprint 01 variables:

- `NODE_ENV`
- `APP_URL`
- `DATABASE_URL`
- `AUTH_SECRET`
- `LICENSE_KEY_PEPPER`
- `DOWNLOAD_SIGNING_SECRET`
- development placeholders for payment, email and object storage providers.

Requirements:

- fail clearly when required server variables are missing in production;
- never expose secret variables through `NEXT_PUBLIC_`;
- tests may use explicit safe defaults;
- no real secret values in repository files.

### 4. Project routing foundation

Create locale-ready route groups:

```text
app/
  page.tsx                 # redirect or select default locale
  [locale]/
    layout.tsx
    (marketing)/
      page.tsx
      product/page.tsx
      pricing/page.tsx
    (auth)/
      login/page.tsx
    account/
      layout.tsx
      page.tsx
    admin/
      layout.tsx
      page.tsx
  api/
    health/route.ts
```

Requirements:

- support `fr` and `en` locale validation;
- use French content for the initial public page;
- English may use minimal placeholder copy but routes must work;
- account and admin layouts must have server-side authorization placeholders that deny access by default rather than pretending authentication exists;
- health endpoint must not reveal secrets or detailed infrastructure data.

Do not implement fake login or client-only role guards.

### 5. Module boundaries

Create initial module folders and public contracts:

```text
modules/
  catalog/
  commerce/
  entitlements/
  licensing/
  releases/
  audit/
```

At minimum implement pure domain functions and tests for:

- resolving an active offer price by server-side ID/currency;
- deciding whether a paid order item creates an entitlement;
- enforcing license status and activation-limit rules;
- determining whether an entitlement permits access to a release.

These functions must not require a running database and must have unit tests.

### 6. Prisma foundation

Replace generic starter models with the Sprint 01 subset described in `docs/database-model.md`:

- `User` and roles;
- `Product`, `Offer`, `Price`;
- `Order`, `OrderItem`, `Payment`, `ProviderEvent`;
- `Entitlement`;
- `License`, `LicenseActivation`;
- `Release`, `ReleaseFile`;
- `AuditEvent`.

Requirements:

- enums for states and commercial types;
- integer minor-unit money fields plus currency;
- unique `(provider, providerEventId)` constraint;
- unique release version per product;
- no complete license key plaintext column;
- safe cascades/restrict behavior documented;
- generate a migration that succeeds on an empty PostgreSQL database;
- seed only development product and Starter/Pro/Managed offers with clearly non-production prices.

Do not include `Profile` or `Post` demo models.

### 7. Initial product interface

Replace the generic starter homepage with a restrained foundation, not the final marketing design.

The French homepage must communicate:

- a WooCommerce store foundation is already designed and ready to receive products;
- the engine can adapt by niche, country, language and market;
- it supports dropshipping, stock, hybrid and digital-product models;
- Starter, Pro and Managed are distinct paths;
- no invented customer count, conversion claim, testimonial or logo.

Build reusable sections/components rather than one monolithic page.

### 8. CI foundation

Add a GitHub Actions workflow for pull requests and pushes to `main`:

1. install with frozen lockfile;
2. lint;
3. typecheck;
4. unit tests;
5. production build.

Database migration integration testing may use a PostgreSQL service if it remains fast and reliable. Otherwise document it as the immediate next CI task and still validate Prisma generation.

No deployment workflow is required in Sprint 01.

## Acceptance criteria

Sprint 01 is complete only when:

- starter branding and generic demo content are removed;
- `pnpm install --frozen-lockfile` succeeds;
- lint succeeds;
- typecheck succeeds;
- unit tests succeed;
- production build succeeds;
- Prisma client generation succeeds;
- the initial migration succeeds against a fresh PostgreSQL instance, or the PR provides exact reproducible evidence of the environment limitation;
- `/fr`, `/en`, `/fr/product`, `/fr/pricing` and `/api/health` resolve correctly;
- account/admin routes deny unauthenticated access safely;
- unit tests cover entitlement, license and release-access rules;
- `.env.example` contains no secrets;
- README and architecture docs match the implemented commands and structure;
- a draft PR documents removals, retained dependencies, tests, risks and deferred decisions.

## Non-goals

Do not implement in this sprint:

- a real payment provider;
- payment webhooks beyond interfaces/test fixtures;
- production authentication;
- real customer downloads;
- real license HTTP endpoints;
- admin CRUD;
- support tickets;
- email delivery;
- GitHub release synchronization;
- final visual identity;
- marketplace or automatic updater.

## Required Codex report

At completion, Codex must report:

1. files and architecture changed;
2. starter code/dependencies removed and why;
3. dependency upgrades and compatibility evidence;
4. database models and migration created;
5. commands executed with results;
6. security assumptions;
7. unresolved risks;
8. recommended Sprint 02 scope.
