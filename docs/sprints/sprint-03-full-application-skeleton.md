# Sprint 03 — Full V1 Application Skeleton

## Goal

Generate the complete navigable V1 application structure before progressively recustomizing and connecting each interface family.

At the end of this sprint, all approved V1 routes must exist, use the correct layout shell, render meaningful interface structure, support French and English routing, and honestly distinguish fixture-backed previews from connected functionality.

This sprint creates breadth and consistency. It does not claim production completion.

## Required reading

Read in this order before implementation:

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/architecture.md`
4. `docs/database-model.md`
5. `docs/project-structure.md`
6. `docs/interface-inventory.md`
7. `docs/implementation-roadmap.md`
8. `docs/sprints/sprint-02-brand-identity-and-ui-foundation.md`
9. this sprint document.

## Target branch

```text
feat/sprint-03-application-skeleton
```

Create the branch from the latest stable `main` after required documentation and prerequisite implementation work are merged.

## Prerequisites

Before implementation:

- Sprint 01 must provide a clean and buildable Next.js foundation;
- package manager and lockfile must be stable;
- lint, typecheck, test and build commands must exist;
- localized routing decisions must be confirmed;
- Prisma generation must not fail;
- Sprint 02 must provide at least stable design tokens and reusable baseline primitives, even if the final logo refinement continues later.

If these prerequisites are not present in the actual repository, stop and document the gap instead of creating a second parallel architecture.

## Core principle

Generate the full product structure now, then improve interfaces progressively.

Each interface created in this sprint must start at `SKELETON` or `WIREFRAME`. It may reach `BRANDED` only when approved design-system components are applied consistently.

Do not mark an interface `CONNECTED` unless it uses a real approved service or adapter. Do not mark it `VALIDATED` unless tests and manual checks support that claim.

## Non-goals

Do not implement during this sprint:

- a real production authentication provider;
- a real payment provider;
- real webhook processing;
- real transactional email;
- private object-storage delivery;
- production license issuance or validation;
- automatic WordPress updates;
- final legal terms;
- a marketplace, affiliate system, page builder or CRM;
- pixel-perfect final customization of every page.

Safe mock adapters, fixture repositories and contract-level route handlers are allowed.

## Deliverables

### 1. Audit the implementation base

Before changing code, report:

- actual Next.js, React, Prisma and Tailwind versions;
- whether the repository uses root folders or `src/`;
- current route tree;
- current design-system components;
- current localization implementation;
- existing auth or session stubs;
- existing domain modules and Prisma models;
- current test and CI configuration;
- stale starter code still present.

Do not restructure the whole repository only to match this document. Align the blueprint with the actual stable foundation and document justified deviations.

### 2. Central route configuration

Create or normalize:

```text
config/routes.ts
config/navigation.ts
config/interface-registry.ts
```

Requirements:

- canonical route builders for localized public, account and admin routes;
- no scattered hard-coded internal URLs in major navigation components;
- navigation items include stable IDs, labels, route builders and access metadata;
- account/admin navigation does not appear in the public shell;
- interface registry records route, audience, module, maturity and data mode;
- registry entries correspond to `docs/interface-inventory.md`.

### 3. Global and localized boundaries

Implement appropriate boundaries for:

- root redirect or locale resolution;
- localized not-found pages;
- route-segment loading states;
- safe error boundaries;
- forbidden state for protected areas;
- responsive mobile navigation;
- unsupported locale handling.

Do not leak stack traces, provider payloads, secrets or internal IDs in public errors.

### 4. Marketing shell

Create a reusable public shell with:

- brand area using the approved logo or an explicitly temporary brand mark;
- desktop and mobile navigation;
- locale switcher;
- primary conversion action placeholder;
- footer with product, support and legal groups;
- consistent container, spacing and section primitives;
- localized metadata defaults.

Generate every public and legal route in `docs/interface-inventory.md`.

Each route must contain a meaningful wireframe, not only a title and “coming soon”. Examples:

- home: hero, problem/value, modular capabilities, shop models, offer overview, process and CTA;
- product: product model, modules, delivery boundary and audience;
- features: categorized feature groups;
- demos: demonstration cards and detail structure;
- use cases: comparison and model-specific pages;
- pricing: offer comparison and responsibility differences;
- offer details: inclusions, exclusions, process, audience and CTA;
- FAQ: grouped questions;
- contact: channels and disabled/preview form when not connected;
- legal: explicit review placeholders without invented binding terms.

### 5. Authentication shell

Generate all authentication routes from the inventory.

Requirements:

- consistent compact shell;
- accessible labeled form structure;
- client-side convenience validation may exist, but server validation boundaries remain required later;
- preview forms must not pretend to persist data;
- clear state for unavailable provider integration;
- links among login, registration and recovery flows;
- localized copy.

### 6. Customer account shell

Generate the complete account navigation and all account routes from the inventory.

Requirements:

- development-only fixture identity through an explicit session adapter;
- server-side protected boundary or clearly isolated development guard;
- responsive sidebar/drawer navigation;
- dashboard summary;
- list and detail patterns for orders, entitlements, licenses, onboarding and support;
- download and release views;
- profile and security settings previews;
- contextual loading, empty, error and restricted states.

The account must not expose admin actions or cross-customer fixture data.

### 7. Administration shell

Generate the complete admin navigation and all admin routes from the inventory.

Requirements:

- role-protected boundary or isolated development admin guard;
- environment indicator;
- search/filter/table shells;
- list/detail/create-preview patterns where specified;
- high-risk action components with confirmation and disabled preview behavior;
- audit context panels on commercially sensitive resources;
- responsive behavior for tables and dense data.

Do not implement fake destructive mutations. Preview actions must be disabled or handled by development-only mock services with obvious labeling.

### 8. Fixture repositories and page queries

Create representative fixtures behind module interfaces.

Recommended pattern:

```text
Page -> page query -> repository interface -> fixture repository
```

Create sufficient fictional records to demonstrate:

- paid, pending, failed and refunded order/payment states;
- active, suspended, expired and revoked entitlements/licenses;
- zero, partial and full activation usage;
- available and disabled releases;
- Starter, Pro and Managed offers;
- onboarding statuses;
- open, waiting and resolved support requests;
- audit events.

Rules:

- do not import fixture JSON directly into pages;
- do not use real people, companies, domains, testimonials or sales metrics;
- make fixture mode impossible to confuse with production data;
- prepare repository interfaces for later Prisma implementations;
- avoid creating duplicate domain types in page folders.

### 9. Reusable application patterns

Implement or normalize shared composed components needed across the skeleton:

- page header;
- breadcrumb;
- section header;
- statistic/summary card without fabricated marketing claims;
- data table shell;
- filter bar;
- pagination shell;
- status badge mapping;
- timeline;
- detail list;
- tabs;
- empty state;
- contextual skeleton loader;
- error panel;
- forbidden panel;
- confirmation dialog;
- responsive resource list alternative for narrow screens.

Use existing reliable primitives instead of duplicating them.

### 10. Internationalization

Requirements:

- all inventory routes resolve under `/fr` and `/en`;
- French is the source editorial locale;
- English copy may be reviewed translation or clearly identified placeholder copy;
- internal route builders preserve locale;
- navigation labels are localized;
- dates, money and status labels use locale-aware formatting;
- no locale-less internal navigation should accidentally leave the localized tree.

### 11. Development interface map

Create a development-only interface map, for example:

```text
/{locale}/dev/interfaces
```

Requirements:

- available only outside production or behind a strict development guard;
- generated from `config/interface-registry.ts`;
- lists interface ID, route, audience, module, maturity, data mode and notes;
- provides links to generated routes when safe;
- visually distinguishes deferred and disconnected interfaces;
- never appears in public production navigation.

This becomes the operational dashboard for progressive recustomization.

### 12. Documentation updates

At the end of implementation:

- update `docs/interface-inventory.md` with achieved maturity states;
- document actual folder structure and deviations;
- document fixture activation and safety boundaries;
- document routes intentionally deferred;
- add a short guide for selecting the next interface customization wave;
- update README setup and navigation references when necessary.

## Route-generation quality rules

A generated route is acceptable only when:

- it uses the correct shell;
- it has localized metadata/title;
- it has meaningful structure for its purpose;
- it uses shared components where appropriate;
- it defines relevant loading, empty, error or forbidden states;
- fixture data is isolated behind a query/repository boundary;
- responsive behavior is considered;
- it does not claim that disconnected features work.

A page containing only a heading, lorem ipsum or generic “coming soon” message does not satisfy this sprint.

## Testing requirements

At minimum, add or update tests for:

- route builders and locale preservation;
- navigation visibility by shell and role;
- interface registry uniqueness and inventory alignment;
- status-label mapping;
- fixture repository isolation;
- protected account/admin boundaries;
- localized public route smoke tests;
- representative account and admin route rendering;
- development interface-map production guard;
- production build.

Recommended commands:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:generate
```

Run any repository-specific integration or E2E command established by Sprint 01.

## Accessibility and responsive checks

Verify at minimum:

- keyboard navigation for global, account and admin menus;
- visible focus states;
- landmark structure;
- heading hierarchy;
- form labels and error associations;
- table alternatives or horizontal behavior on mobile;
- dialog focus management;
- contrast using approved tokens;
- reduced-motion behavior;
- no critical action available only by color or hover.

Check representative widths around 360, 768, 1024 and 1440 pixels.

## Suggested commit plan

```text
chore: audit application skeleton baseline
feat: add central route navigation and interface registry
feat: add localized global boundaries and shells
feat: generate marketing and legal wireframes
feat: generate authentication wireframes
feat: generate customer account interfaces
feat: generate administration interfaces
feat: add fixture repositories and page queries
feat: add development interface map
 test: cover route registry shells and representative pages
 docs: report Sprint 03 interface maturity
```

Keep commits coherent. Adjust the exact sequence to the actual repository.

## Acceptance criteria

Sprint 03 is complete when:

- every non-deferred V1 interface in the inventory has a route;
- public, auth, account and admin shells are distinct and consistent;
- French and English route trees build successfully;
- navigation comes from central configuration;
- the interface registry contains unique stable IDs;
- all data-driven routes use fixture repositories or real page queries, not direct mock imports;
- representative success, loading, empty, error and forbidden states exist;
- unfinished forms and actions do not simulate production success;
- protected areas enforce an explicit server-side or development-isolated boundary;
- the development interface map reflects implementation state;
- documentation records actual maturity and deviations;
- lint, typecheck, tests and production build pass.

## Pull request requirements

Open a draft pull request that includes:

- baseline audit;
- route count by shell;
- interfaces generated;
- maturity summary;
- fixture architecture;
- access-boundary approach;
- screenshots or review notes for representative desktop and mobile pages;
- test evidence;
- known limitations;
- recommended first progressive customization wave.

Keep the PR in draft while any required command fails or while disconnected functionality is presented as operational.
