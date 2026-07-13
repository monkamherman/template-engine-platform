# AGENTS.md

## Mission

Build the official commercial platform for the Woo App Commercial Template Engine. This repository is the sales, delivery, licensing and customer-operations platform. The WordPress/WooCommerce product itself lives in the separate private repository `monkamherman/woo-app-theme`.

## Product boundary

This repository owns:

- marketing pages and product demonstrations;
- pricing and offer presentation;
- customer authentication and account portal;
- checkout orchestration through an abstract payment-provider layer;
- webhook processing and order state;
- entitlements, licenses, activations and protected downloads;
- release metadata and signed download links;
- Pro and Managed service onboarding;
- support and administrative interfaces.

This repository must not contain:

- the source code of the commercial WordPress theme;
- customer secrets or production credentials;
- a public copy of release ZIP files;
- a universal client-deployment engine in V1;
- a marketplace, page builder or affiliate platform in V1.

## Required architecture

Use a modular Next.js application with:

- Next.js App Router;
- React and TypeScript in strict mode;
- Tailwind CSS;
- PostgreSQL;
- Prisma ORM and versioned migrations;
- server components by default;
- route handlers for webhooks, licenses, downloads and releases;
- a payment-provider interface instead of direct coupling to one vendor;
- object storage compatible with S3/R2 for private release files;
- French and English locale-ready routing from the beginning.

The selected starter already contains Next.js, Prisma and UI utilities. Audit and simplify it rather than replacing working foundations without evidence. Upgrade dependencies only when compatibility is verified by lint, typecheck, tests and production build.

Prefer a single deployable application with clear domain modules. Do not introduce microservices unless an approved architecture decision explicitly requires them.

## Repository conventions

Expected structure after Sprint 01:

```text
app/
  [locale]/
    (marketing)/
    (auth)/
    account/
    admin/
  api/
    checkout/
    webhooks/
    licenses/
    downloads/
    releases/
components/
config/
lib/
modules/
  auth/
  catalog/
  commerce/
  entitlements/
  licensing/
  releases/
  support/
prisma/
  schema.prisma
  migrations/
styles/
tests/
```

Do not move the repository into `src/` only for preference. A structural migration requires a concrete benefit and must be isolated from business-feature work.

Keep business rules inside `modules`, not inside page components or route handlers. Route handlers validate input, call a domain service and serialize a response.

## Coding rules

- Keep TypeScript strict; do not use `any` unless documented at an external integration boundary.
- Validate external inputs with Zod schemas.
- Never trust prices, product identifiers, roles or payment status from the browser.
- Process payment success only from a verified provider webhook.
- Make webhook processing idempotent and persist provider event IDs.
- Store monetary values as integer minor units plus ISO currency code.
- Store timestamps in UTC.
- Do not log passwords, tokens, license keys, payment payload secrets or signed URLs.
- Use server-only modules for secrets and privileged database operations.
- Generate temporary signed download URLs; never expose permanent object-storage URLs.
- Add audit events for administrative changes to orders, licenses and releases.
- Avoid destructive migrations without an explicit migration plan.
- Remove starter demo models, routes, links and branding before implementing product features.

## UI and content rules

- Mobile-first and accessible.
- Use semantic HTML and visible keyboard focus.
- Maintain high contrast and reduced-motion support.
- The visual identity should communicate modularity, speed, ecommerce and trustworthy technology.
- Do not use fake customer logos, fake testimonials or invented performance metrics.
- Keep French copy as the initial content source while preserving English locale support.

## Testing requirements

Every implemented domain must include appropriate tests. At minimum:

- unit tests for pricing, entitlement and license rules;
- integration tests for database-backed services;
- route tests for webhook signature rejection and idempotency;
- end-to-end smoke tests for public navigation and authentication boundaries.

Before completing a task, run the repository-defined lint, typecheck, test and build commands. Report commands that could not run and why.

## Git workflow

- Work on a dedicated branch.
- Make small, intentional commits using Conventional Commit style.
- Do not commit generated secrets, `.env`, database dumps or release ZIP files.
- Update documentation when an architectural decision or environment variable changes.
- Open a draft pull request with a summary, test evidence, risks and remaining work.

## Source of truth

Read these files before implementation:

1. `docs/product-scope.md`
2. `docs/architecture.md`
3. `docs/database-model.md`
4. the active file under `docs/sprints/`

When documents conflict, the active sprint defines execution scope, while `docs/product-scope.md` defines product boundaries. Stop and document a decision when a requested change would violate those boundaries.
