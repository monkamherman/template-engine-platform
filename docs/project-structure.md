# Project Structure — Full Application Blueprint

## Purpose

This document defines how the complete Template Engine Platform is generated as a coherent application before each interface is progressively customized and connected to real business services.

The strategy is:

1. create the complete route, layout and navigation skeleton;
2. render every required interface with meaningful fixture data and states;
3. apply the approved design system consistently;
4. customize one interface family at a time;
5. replace fixtures with real domain services progressively;
6. validate accessibility, security and business behavior before release.

Generating the full skeleton does not mean pretending that every feature is operational. Every interface must expose an explicit maturity state.

## Interface maturity states

Use the following states in documentation and the internal interface registry:

| State | Meaning |
|---|---|
| `SKELETON` | Route, shell, navigation and page structure exist. Content is structural and may use fixtures. |
| `WIREFRAME` | Information hierarchy, sections, tables, forms and empty/error/loading states are represented. |
| `BRANDED` | Approved tokens, typography, spacing, icons and visual components are applied. |
| `CONNECTED` | The interface reads or writes through a real domain service or approved adapter. |
| `VALIDATED` | Functional, responsive, accessibility and authorization tests pass. |
| `RELEASED` | The interface is approved for the target production release. |

A page may not be described as complete before reaching `VALIDATED`.

## Repository shape

Keep the current root-based Next.js structure unless a dedicated migration proves that `src/` provides a concrete benefit.

```text
app/
  [locale]/
    (marketing)/
      layout.tsx
      page.tsx
      product/
      features/
      demos/
      use-cases/
      pricing/
      offers/
      faq/
      contact/
      legal/
    (auth)/
      layout.tsx
      login/
      register/
      forgot-password/
      reset-password/
      verify-email/
    account/
      layout.tsx
      page.tsx
      orders/
      entitlements/
      licenses/
      downloads/
      releases/
      onboarding/
      support/
      settings/
    admin/
      layout.tsx
      page.tsx
      customers/
      catalog/
      orders/
      payments/
      entitlements/
      licenses/
      releases/
      services/
      support/
      audit/
      settings/
  api/
    health/
    checkout/
    webhooks/
    licenses/
    downloads/
    releases/

components/
  brand/
  design-system/
  layout/
  navigation/
  marketing/
  auth/
  account/
  admin/
  data-display/
  feedback/
  forms/

config/
  app.ts
  locales.ts
  navigation.ts
  routes.ts
  interface-registry.ts

content/
  fr/
  en/

lib/
  auth/
  env/
  errors/
  formatting/
  logging/
  permissions/
  validation/

modules/
  auth/
  catalog/
  commerce/
  entitlements/
  licensing/
  releases/
  services/
  support/
  audit/

prisma/
  schema.prisma
  migrations/
  seed.ts

tests/
  unit/
  integration/
  routes/
  e2e/
```

## Route groups and shells

### Marketing shell

Owns:

- public header and mobile navigation;
- locale switcher;
- product navigation;
- footer and legal navigation;
- public SEO metadata defaults;
- public announcements when approved.

It must not include account or admin navigation logic.

### Authentication shell

Owns:

- compact brand header;
- authentication panel layout;
- security and privacy context;
- links back to public product pages.

It must not simulate successful authentication when no provider is connected.

### Customer account shell

Owns:

- account sidebar or responsive navigation;
- customer identity summary;
- entitlement-aware navigation;
- global account alerts;
- protected route boundary.

A fixture session may be used only in development and test environments through an explicit adapter.

### Administration shell

Owns:

- role-protected navigation;
- operational search and filters;
- environment indicator;
- audit-aware action patterns;
- high-risk action confirmations.

Admin pages must never rely on hidden navigation as authorization. Authorization is enforced server-side.

## Component boundaries

### `components/design-system`

Contains reusable visual primitives and composed components that are independent from a specific domain:

- button;
- link;
- badge;
- card;
- input, textarea, select, checkbox and radio;
- dialog and drawer;
- table shell;
- tabs;
- alert;
- skeleton loader;
- pagination;
- empty state;
- status indicator.

### `components/marketing`

Contains reusable public-site sections:

- hero;
- proof or trust section using verified content only;
- feature grid;
- use-case cards;
- offer comparison;
- FAQ list;
- calls to action;
- product demonstration frames.

### `components/account` and `components/admin`

Contain interface composition components, not business rules. Examples:

- account summary cards;
- order timeline;
- entitlement summary;
- license activation table;
- release list;
- onboarding progress;
- admin resource tables;
- audit event viewer.

## Page contract

Every `page.tsx` should primarily:

1. resolve locale and route parameters;
2. enforce the required access boundary;
3. call one application service or page-query function;
4. map the result to view data;
5. compose page sections;
6. provide loading, empty, error and unauthorized states where relevant.

Pages and route handlers must not contain pricing rules, entitlement rules, activation-limit logic or payment-event processing.

## Module contract

Each business module should expose a small public surface and keep implementation details private.

Recommended module shape:

```text
modules/catalog/
  index.ts
  types.ts
  schemas.ts
  services/
  repositories/
  adapters/
  queries/
  fixtures/
  tests/
```

Rules:

- `index.ts` exports only the supported public API;
- schemas validate external and persistence-bound input;
- services implement business use cases;
- repositories abstract persistence;
- adapters translate external providers;
- queries prepare read models for interfaces;
- fixtures are development/test-only;
- tests stay close to business behavior or in the central test folders according to scope.

## Fixture and real-data strategy

The complete application skeleton may use fixtures, but fixture usage must be isolated behind the same interfaces later used by real services.

Correct flow:

```text
Page -> page query -> repository interface -> fixture repository or Prisma repository
```

Incorrect flow:

```text
Page -> import mock JSON directly
```

Requirements:

- fixture records use clearly fictional names and domains;
- no fake testimonials, fake logos or fabricated sales metrics;
- fixtures never run in production unless explicitly required for a demo environment;
- production configuration must fail safely if a required real adapter is missing;
- forms that are not connected must use a disabled or clearly marked preview mode rather than pretending to save data.

## Central configuration

### `config/routes.ts`

Defines canonical route builders. Avoid scattering string URLs throughout components.

### `config/navigation.ts`

Defines public, account and admin navigation using route builders and permission metadata.

### `config/interface-registry.ts`

Tracks each interface with:

- stable identifier;
- route pattern;
- audience;
- maturity state;
- owning module;
- data mode (`fixture`, `database`, `provider`);
- implementation notes.

The registry supports an internal interface map in development and keeps the progressive customization plan visible.

## Content architecture

Keep editorial content separate from page layout when practical.

```text
content/fr/marketing.ts
content/fr/offers.ts
content/fr/legal.ts
content/en/marketing.ts
content/en/offers.ts
content/en/legal.ts
```

French remains the initial editorial source. English files may contain reviewed translations or explicit translation placeholders, but routes must exist from the skeleton stage.

## Loading, empty, error and permission states

Every data-driven interface must define:

- loading state;
- empty state;
- recoverable error state;
- unauthorized or forbidden state when applicable;
- destructive-action confirmation when applicable.

Do not use one generic spinner or one generic error page for all business contexts.

## Progressive customization waves

After the complete skeleton exists, customize in this order:

1. global brand, navigation and layout shells;
2. home, product, use cases and pricing;
3. offer detail and conversion pages;
4. authentication interfaces;
5. customer account dashboard and core resources;
6. Pro/Managed onboarding and support;
7. administration dashboards and resource management;
8. commerce, entitlement, licensing and release integrations;
9. legal, accessibility, performance and launch polish.

Each wave updates `docs/interface-inventory.md` and the runtime interface registry.

## Definition of structural completion

The project skeleton is structurally complete when:

- every V1 interface has a route or is explicitly marked deferred;
- every route belongs to the correct shell;
- navigation is generated from central configuration;
- French and English routes resolve;
- data-driven pages render representative loading, empty, success and error states;
- fixtures are isolated behind repository/query interfaces;
- protected pages enforce server-side boundaries;
- the project passes lint, typecheck, tests and production build;
- no page claims operational functionality that has not been connected and validated.
