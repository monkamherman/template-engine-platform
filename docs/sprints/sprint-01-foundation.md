# Sprint 01 — Foundation and Starter Cleanup

## Goal

Transform the generic SnowDev starter into a clean, testable foundation for the Template Engine commercial platform without implementing real payments, production authentication or automatic WordPress updates.

## Audit context

The starter currently includes Next.js `15.3.3`, React 19, TypeScript/App Router, Tailwind/UI components, Prisma `6.17.x`, generic `User/Profile/Post` models, starter branding, a malformed duplicated README, unverified scripts and no project-specific tests/domain boundaries.

Do not treat starter claims such as “production ready” or “WCAG compliant” as verified facts.

## Deliverables

### 1. Normalize the repository

- use `pnpm` and commit its lockfile;
- rename the package to `template-engine-platform`;
- remove starter author/organization branding and dead external links;
- remove demo-only pages, models, APIs, stores and utilities without approved V1 use;
- keep useful UI primitives only when they compile and are reusable;
- verify `.gitignore` excludes secrets, build output, dumps, storage artifacts and private ZIP files;
- audit Docker support before simplifying or removing it.

### 2. Toolchain and scripts

Provide reliable commands:

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

- use the supported ESLint CLI/configuration;
- typecheck with no output;
- add a lightweight React 19/TypeScript-compatible test runner and real tests;
- remove packages used only by the starter demo;
- isolate intentional major upgrades and prove compatibility.

### 3. Environment validation

Add/normalize `.env.example` and a server-only Zod environment module.

Variables include `NODE_ENV`, `APP_URL`, `DATABASE_URL`, `AUTH_SECRET`, `LICENSE_KEY_PEPPER`, `DOWNLOAD_SIGNING_SECRET`, and development placeholders for payment, email and storage.

Fail clearly for missing production secrets. Do not expose them through `NEXT_PUBLIC_`. Tests may use explicit safe defaults.

### 4. Routing foundation

```text
app/
  page.tsx
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

- validate `fr` and `en`;
- use French initial public copy;
- make English routes functional with minimal copy;
- account/admin authorization placeholders must deny access by default;
- health endpoint must not leak infrastructure details;
- do not implement fake login or client-only role guards.

### 5. Module boundaries

Create `modules/catalog`, `commerce`, `entitlements`, `licensing`, `releases`, `audit`.

Implement pure tested functions for:

- resolving an active server-side price;
- deciding whether a paid order item creates an entitlement;
- license status and activation-limit rules;
- entitlement access to a release.

### 6. Prisma foundation

Replace demo models with the Sprint 01 subset in `docs/database-model.md`:

- User and roles;
- Product, Offer, Price;
- Order, OrderItem, Payment, ProviderEvent;
- Entitlement;
- License, LicenseActivation;
- Release, ReleaseFile;
- AuditEvent.

Requirements:

- proper enums and money minor units;
- unique `(provider, providerEventId)`;
- unique product/release version;
- no full plaintext license key;
- documented cascade/restrict choices;
- migration valid on empty PostgreSQL;
- development seed for Starter, Pro and Managed only;
- remove `Profile` and `Post`.

### 7. Initial product interface

Replace the generic homepage with a restrained reusable foundation that communicates:

- a WooCommerce store foundation is ready to receive products;
- adaptation by niche, country, language and market;
- dropshipping, stock, hybrid and digital models;
- distinct Starter, Pro and Managed paths;
- no invented logos, testimonials, customer counts or conversion claims.

### 8. CI foundation

Add GitHub Actions for pushes/PRs:

1. frozen pnpm install;
2. lint;
3. typecheck;
4. unit tests;
5. production build;
6. Prisma generation.

Use PostgreSQL service migration testing when reliable; otherwise document the exact next CI step. No deployment workflow in Sprint 01.

## Acceptance criteria

Sprint 01 is complete only when:

- starter branding/demo content are removed;
- `pnpm install --frozen-lockfile`, lint, typecheck, tests, build and Prisma generation succeed;
- migration succeeds on fresh PostgreSQL or a precise external blocker is documented;
- `/fr`, `/en`, `/fr/product`, `/fr/pricing`, `/api/health` work;
- account/admin deny unauthenticated access safely;
- tests cover entitlement, license and release-access rules;
- `.env.example` has no secrets;
- docs match implemented structure/commands;
- a draft PR documents removals, retained dependencies, tests, risks and deferred decisions.

## Non-goals

No real payment provider, production auth, customer download, public license endpoint, admin CRUD, support system, email provider, GitHub release sync, final visual identity, marketplace or updater.

## Required Codex report

Report files/architecture changed, starter removals, dependency decisions, database/migration, commands and results, security assumptions, unresolved risks and recommended Sprint 02.
