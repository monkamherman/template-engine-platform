# Project Structure — Template Engine Platform

## Purpose

Define the application structure used to generate the complete V1 product before progressively customizing and connecting each interface.

The project is a modular monolith deployed as one Next.js application. The structure must support marketing, documentation, legal content, authentication, customer account, administration and machine interfaces without mixing business rules into pages.

## Top-level structure

Sprint 03 implementation note: the current application keeps Sprint 01/02 domain-rule helpers under `src/modules/*` while the new skeleton registry and page-query layer live in root `config/*` and `modules/platform/*`. Do not migrate working files only for cosmetic alignment; move code when an implementation sprint needs a real ownership boundary.

```text
app/
  [locale]/
    (marketing)/
    (docs)/
    (auth)/
    account/
    admin/
  api/
components/
config/
content/
  marketing/
  docs/
    fr/
    en/
  legal/
    fr/
    en/
lib/
modules/
prisma/
  schema.prisma
  migrations/
public/
styles/
tests/
```

Do not move the repository into `src/` only for preference. A structural migration requires a concrete benefit and must be isolated from business-feature work.

## App Router structure

```text
app/
  layout.tsx
  globals.css
  [locale]/
    layout.tsx

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
        software-license/
        commercial-terms/
        support-policy/
        refunds/
        privacy/
        trademark/

    (docs)/
      docs/
        layout.tsx
        page.tsx
        getting-started/
        requirements/
        installation/
        activation/
        initial-setup/
        shop-models/
        niches/
        localization/
        products/
        payments/
        customization/
        updates/
        backup-rollback/
        troubleshooting/
        faq/
        releases/
          [version]/

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
      legal/
      documentation/
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
    docs/
      search/
```

## Shells

### Locale shell

Responsibilities:

- validate locale;
- provide translation/content context;
- set HTML language metadata;
- expose locale-aware route helpers;
- provide common error and not-found behavior.

### Marketing shell

Responsibilities:

- public header and navigation;
- footer and trust links;
- locale switcher;
- documentation entry point;
- global conversion actions;
- legal links.

It must not contain account or admin business logic.

### Documentation shell

Responsibilities:

- documentation sidebar;
- mobile documentation navigation;
- breadcrumbs;
- previous/next article links;
- version and locale indicators;
- article metadata;
- contextual support path;
- accessible heading anchors.

Documentation content belongs in `content/docs`, not in shell components.

### Auth shell

Responsibilities:

- focused identity layout;
- safe provider states;
- links to privacy and applicable terms;
- clear preview behavior before production auth is connected.

### Account shell

Responsibilities:

- authenticated customer navigation;
- entitlement-aware sections;
- contextual documentation links;
- role and session checks;
- mobile account navigation.

### Admin shell

Responsibilities:

- operator navigation;
- role authorization;
- high-risk action affordances;
- operational status and audit links;
- legal/documentation review navigation.

## Components

```text
components/
  brand/
    logo.tsx
    wordmark.tsx
  design-system/
    button.tsx
    card.tsx
    input.tsx
    select.tsx
    badge.tsx
    alert.tsx
    table.tsx
    tabs.tsx
    dialog.tsx
    pagination.tsx
  layout/
    container.tsx
    page-header.tsx
    section.tsx
    stack.tsx
    grid.tsx
  navigation/
    marketing-nav.tsx
    docs-nav.tsx
    account-nav.tsx
    admin-nav.tsx
    locale-switcher.tsx
  documentation/
    docs-sidebar.tsx
    docs-breadcrumbs.tsx
    docs-toc.tsx
    docs-version-badge.tsx
    docs-review-status.tsx
    docs-pagination.tsx
  legal/
    legal-review-banner.tsx
    legal-version-meta.tsx
    acceptance-summary.tsx
  marketing/
  auth/
  account/
  admin/
  system/
    empty-state.tsx
    error-state.tsx
    forbidden-state.tsx
    loading-skeleton.tsx
```

Shared components must remain presentation-focused. Business decisions belong in modules and queries.

## Configuration

```text
config/
  env.ts
  locales.ts
  routes.ts
  navigation.ts
  interface-registry.ts
  offers.ts
  documentation.ts
  legal-documents.ts
```

### `routes.ts`

Owns internal route generation and prevents scattered route strings.

### `navigation.ts`

Defines marketing, documentation, account and administration navigation from approved routes.

### `interface-registry.ts`

Tracks:

- interface ID;
- route;
- area;
- owner;
- maturity;
- data mode;
- visibility;
- known limitations.

### `documentation.ts`

Defines documentation sections, article order, version aliases and visibility rules.

### `legal-documents.ts`

Defines legal document types and allowed review/publication states. It must not contain invented binding legal text.

## Content structure

```text
content/
  marketing/
    fr/
    en/
  docs/
    fr/
      getting-started/
      installation/
      configuration/
      operations/
      troubleshooting/
    en/
      getting-started/
      installation/
      configuration/
      operations/
      troubleshooting/
  legal/
    fr/
    en/
```

Content files should use typed metadata such as:

```text
id
locale
title
summary
status
owner
lastReviewedAt
visibility
productVersionRange
legalVersion
```

Do not hard-code long-form documentation or legal text directly inside page components.

## Domain modules

```text
modules/
  auth/
  catalog/
  commerce/
  entitlements/
  licensing/
  releases/
  services/
  support/
  documentation/
  legal/
  audit/
```

Recommended module shape:

```text
modules/{domain}/
  index.ts
  types.ts
  schemas.ts
  repositories/
  services/
  queries/
  fixtures/
  tests/
```

### Auth

Identity, roles, sessions and authorization policies.

### Catalog

Products, offers, prices, demonstrations and use-case data.

### Commerce

Checkout, orders, payments, refunds and provider events.

### Entitlements

Commercial access created from order items or approved grants.

### Licensing

Official-service key issuance, activation, validation, suspension and revocation rules.

### Releases

Version metadata, checksums, files and download grants.

### Services

Pro/Managed onboarding, milestones and approvals.

### Support

Support requests, messages, assignment and state.

### Documentation

Typed document loading, locale/version resolution, navigation and search contracts.

### Legal

Legal document versions, publication states, offer-term references and customer acceptance records.

### Audit

Privileged and commercial event records.

## Repository and fixture strategy

Every data-driven interface uses a repository or query boundary.

```ts
export interface OrderRepository {
  findForCustomer(customerId: string): Promise<OrderSummary[]>;
  findByIdForCustomer(orderId: string, customerId: string): Promise<OrderDetail | null>;
}
```

A fixture repository may satisfy the interface during skeleton development. Pages must not import mock JSON directly.

Recommended provider selection:

```text
APP_DATA_MODE=fixture | database
```

Provider selection occurs in a server-only composition root, not inside page components.

## Documentation content contract

Documentation loaders must validate:

- stable document ID;
- locale;
- navigation section;
- review state;
- visibility;
- product compatibility range;
- duplicate IDs;
- broken internal links;
- archived/current version behavior.

Documentation search remains behind an adapter so a local index can later be replaced.

## Legal content contract

Legal content requires:

- document type;
- locale;
- immutable version;
- review/publication state;
- effective date when approved;
- content checksum;
- owner;
- links to superseded versions.

Unapproved content must display a review banner and must not be recorded as customer-accepted production terms.

## Server actions and route handlers

Page-level server actions and route handlers must:

1. validate input;
2. authorize the actor;
3. call a module service;
4. serialize a safe result;
5. audit privileged changes when applicable.

Do not place transaction orchestration or provider-specific logic in React components.

## Data model and Prisma

Prisma owns persisted commercial state. Schema changes must use migrations.

Planned entities include:

- users and roles;
- products, offers and prices;
- orders, payments and provider events;
- entitlements;
- licenses and activations;
- releases, files and download grants;
- service requests;
- support tickets and messages;
- legal documents, versions and acceptances;
- documentation metadata when persistence is required;
- audit events.

Content files may remain file-backed while publication and acceptance metadata uses PostgreSQL.

## API boundaries

Machine routes must return explicit configuration states before real providers exist. They must not simulate successful payment, persistent activation or protected download behavior.

Licensing endpoints control official platform services. Their wording and behavior must not claim to revoke software copyright rights already granted with distributed GPL-covered code.

## Tests

```text
tests/
  unit/
  integration/
  routes/
  e2e/
  documentation/
  legal/
```

Required coverage includes:

- route and interface registry uniqueness;
- locale resolution;
- role boundaries;
- repository contracts;
- pricing and entitlement rules;
- licensing rules;
- documentation metadata and broken links;
- legal publication-state safeguards;
- navigation smoke tests;
- build validation.

## Environment boundaries

Use separate development, preview and production configuration.

- never commit `.env`;
- validate environment variables on the server;
- keep fixture mode explicit;
- keep legal draft mode explicit;
- keep private release files outside Git;
- keep internal runbooks outside public content loaders.

## Progressive customization rule

Creating the full route skeleton does not mean every interface is complete.

Each interface moves through:

```text
SKELETON -> WIREFRAME -> BRANDED -> CONNECTED -> VALIDATED -> RELEASED
```

Documentation also tracks editorial state:

```text
DRAFT -> TECH_REVIEW -> PRODUCT_REVIEW -> LEGAL_REVIEW -> APPROVED -> PUBLISHED -> ARCHIVED
```

The interface registry and documentation/legal metadata must show the real state.