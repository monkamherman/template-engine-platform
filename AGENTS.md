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

Expected structure after the foundation and application-skeleton sprints:

```text
app/
  [locale]/
    (marketing)/
    (auth)/
    account/
    admin/
  api/
components/
config/
content/
lib/
modules/
prisma/
  schema.prisma
  migrations/
styles/
tests/
```

Do not move the repository into `src/` only for preference. A structural migration requires a concrete benefit and must be isolated from business-feature work.

Keep business rules inside `modules`, not inside page components or route handlers. Route handlers validate input, call a domain service and serialize a response.

Use central route, navigation and interface-registry configuration. Do not scatter internal route strings across page components.

## Interface generation workflow

The platform is generated horizontally before interfaces are completed vertically.

Use these maturity states:

- `SKELETON`: route, shell and structure exist;
- `WIREFRAME`: hierarchy and relevant interface states exist;
- `BRANDED`: approved design system is applied;
- `CONNECTED`: real approved service or adapter is connected;
- `VALIDATED`: functional, responsive, accessibility and authorization checks pass;
- `RELEASED`: approved for the target production release.

Rules:

- never describe a skeleton or fixture-backed interface as complete;
- update `docs/interface-inventory.md` and the runtime interface registry when maturity changes;
- fixture data must remain behind repository/query interfaces;
- pages must not import mock JSON directly;
- forms that are not connected must use preview or disabled behavior and must not simulate persistence;
- every data-driven interface must consider loading, empty, error and forbidden states where relevant;
- generated pages containing only a title or generic “coming soon” message are not acceptable.

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
- end-to-end smoke tests for public navigation and authentication boundaries;
- route-registry and interface-registry uniqueness tests;
- protected account and admin boundary tests.

Before completing a task, run the repository-defined lint, typecheck, test and build commands. Report commands that could not run and why.

## Git workflow

- Work on a dedicated branch.
- Make small, intentional commits using Conventional Commit style.
- Do not commit generated secrets, `.env`, database dumps or release ZIP files.
- Update documentation when an architectural decision, route, maturity state or environment variable changes.
- Open a draft pull request with a summary, test evidence, risks and remaining work.

## Source of truth

Read these files before implementation:

1. `docs/product-scope.md`
2. `docs/architecture.md`
3. `docs/database-model.md`
4. `docs/project-structure.md`
5. `docs/interface-inventory.md`
6. `docs/implementation-roadmap.md`
7. the active file under `docs/sprints/`

When documents conflict, the active sprint defines execution scope, `docs/product-scope.md` defines product boundaries, and `docs/interface-inventory.md` defines the approved V1 interface map. Stop and document a decision when a requested change would violate those boundaries.
