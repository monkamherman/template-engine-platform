# Documentation Plan — Customer Guide and Operational Manuals

## Purpose

Create a complete, versioned mode d’emploi for the Template Engine product and the commercial platform. Documentation is a product deliverable, not an afterthought.

## Documentation audiences

### 1. Prospect

Needs to understand:

- what the Template Engine is;
- supported shop models;
- technical prerequisites;
- differences between Starter, Pro and Managed;
- what is and is not included;
- licensing, update and support principles.

### 2. Starter customer

Needs to complete installation and configuration without developer assistance.

### 3. Pro/Managed customer

Needs to provide onboarding information, review staging work, approve deployment and understand maintenance procedures.

### 4. Support operator

Needs repeatable troubleshooting and escalation procedures.

### 5. Release operator

Needs package, version, documentation and release-checklist procedures.

## Documentation architecture

### Public documentation

Localized routes:

```text
/{locale}/docs
/{locale}/docs/getting-started
/{locale}/docs/requirements
/{locale}/docs/installation
/{locale}/docs/activation
/{locale}/docs/initial-setup
/{locale}/docs/shop-models
/{locale}/docs/niches
/{locale}/docs/localization
/{locale}/docs/products
/{locale}/docs/payments
/{locale}/docs/customization
/{locale}/docs/updates
/{locale}/docs/backup-rollback
/{locale}/docs/troubleshooting
/{locale}/docs/faq
/{locale}/docs/releases/{version}
```

Public pages may explain general setup, while restricted customer-only material may require an entitlement.

### In-account help

The customer portal should provide contextual links from:

- downloads;
- licenses;
- release history;
- onboarding;
- support forms;
- account security.

### Release-package documentation

Every theme ZIP should include:

```text
README.md
QUICKSTART.md
INSTALLATION.md
UPGRADE.md
TROUBLESHOOTING.md
LICENSE.txt
THIRD_PARTY_NOTICES.md
CHANGELOG.md
```

The packaged quick-start must remain useful if the documentation website is unavailable.

### Internal runbooks

Internal-only documentation should cover:

- publishing a release;
- verifying checksums;
- disabling a compromised release;
- rotating signing/storage credentials;
- handling failed webhooks;
- refund and entitlement changes;
- license revocation;
- support escalation;
- backup and rollback;
- incident communication.

Internal runbooks must not be exposed in public routes.

## Customer mode d’emploi structure

### Part 1 — Before installation

- offer and license confirmation;
- supported WordPress, PHP, WooCommerce and browser versions;
- hosting requirements;
- required plugins;
- domain, SSL and email prerequisites;
- backup requirement;
- staging recommendation.

### Part 2 — Download and verification

- sign in to the customer account;
- locate the correct entitlement;
- download the current supported release;
- verify version, checksum and file name;
- distinguish theme ZIP from documentation/source artifacts;
- keep the license key private.

### Part 3 — Installation

- install WordPress and WooCommerce;
- upload and activate the theme;
- handle parent/child-theme requirements when applicable;
- install required or recommended plugins;
- troubleshoot upload-size and PHP-limit errors;
- confirm health checks.

### Part 4 — License activation

- locate the key;
- activate production or staging;
- understand activation limits;
- deactivate an old installation;
- handle domain changes;
- understand what happens when update access expires.

### Part 5 — Initial configuration

- choose language and market;
- configure currency, tax and address settings;
- choose shop model: dropshipping, stock, hybrid or digital;
- select a niche starter configuration;
- import or create required pages;
- configure menus, branding and contact details;
- validate WooCommerce account, cart and checkout pages.

### Part 6 — Catalog and operations

- add products and variations;
- configure stock behavior;
- configure suppliers or dropshipping boundaries;
- configure digital products;
- shipping zones and methods;
- payment methods;
- order emails;
- test purchase procedure.

### Part 7 — Visual customization

- logo and favicon;
- colors and typography;
- homepage sections;
- promotional banners;
- product-card settings;
- mobile navigation;
- safe customization boundaries;
- child-theme or extension recommendations for code changes.

### Part 8 — Updates

- review changelog and compatibility notes;
- create a backup;
- update in staging first;
- validate checkout and account flows;
- deploy to production;
- rollback procedure;
- report a reproducible issue.

### Part 9 — Troubleshooting

- white screen or fatal error;
- broken assets;
- missing WooCommerce pages;
- checkout conflicts;
- cache/CDN issues;
- translation issues;
- license activation errors;
- failed update/download;
- how to collect safe diagnostic information;
- when to contact hosting, payment provider or Template Engine support.

## Content ownership and source of truth

Recommended structure in the platform repository:

```text
content/
  docs/
    fr/
    en/
  legal/
    fr/
    en/
```

Use MDX or another version-controlled text format. Do not hard-code long documentation directly inside page components.

Each document should contain metadata:

```text
id
locale
title
summary
productVersionRange
lastReviewedAt
reviewStatus
visibility
owner
```

## Versioning rules

Documentation must distinguish:

- platform documentation version;
- theme release version;
- minimum/maximum compatible version;
- current supported release;
- archived documentation.

A customer viewing release `1.2.0` must not be silently shown instructions that only apply to `2.0.0`.

Recommended URL model:

```text
/{locale}/docs/current/...
/{locale}/docs/{majorVersion}/...
/{locale}/docs/releases/{version}
```

`current` may redirect to the current stable major version, but historical routes should remain stable.

## Documentation states

Use explicit maturity states:

```text
DRAFT
TECH_REVIEW
PRODUCT_REVIEW
LEGAL_REVIEW
APPROVED
PUBLISHED
ARCHIVED
```

Legal or safety-sensitive instructions cannot be published only on a developer’s assumption.

## Localization workflow

French is the editorial source for the initial market. English is maintained as a real supported locale, not machine-generated filler.

Rules:

- keep matching document IDs across locales;
- track translation freshness;
- show a controlled fallback only when approved;
- never mix languages inside one article;
- flag outdated translations visibly to editors;
- update screenshots or UI labels after interface changes.

## Screenshots and media

- use sanitized demo data;
- never expose real customer domains, keys or emails;
- annotate only when it improves comprehension;
- provide alt text;
- keep screenshots versioned with the related UI release;
- prefer diagrams for stable concepts and screenshots for procedural steps.

## Search and navigation

The documentation experience should provide:

- grouped sidebar navigation;
- breadcrumb trail;
- previous/next article links;
- search;
- version selector;
- locale selector;
- “last reviewed” metadata;
- contextual support CTA;
- copy-link anchors for sections.

## Testing and quality

Automated checks should cover:

- broken internal links;
- duplicate document IDs;
- missing required metadata;
- missing FR/EN navigation entries;
- invalid version ranges;
- orphaned pages;
- code examples that can be tested safely;
- accessibility of documentation navigation.

Manual review should cover:

- installation from a clean environment;
- accuracy against the current release;
- clarity for a non-technical Starter customer;
- mobile readability;
- legal consistency with offer pages and checkout terms.

## Documentation release gate

A theme release cannot be marked customer-ready until:

- quick-start is updated;
- installation and upgrade instructions match the release;
- changelog is complete;
- known breaking changes are documented;
- supported-version metadata is updated;
- FR documentation is reviewed;
- required EN pages are synchronized or explicitly marked pending;
- links from the customer portal point to the correct version;
- support has a troubleshooting note for known issues.

## Success criteria

Documentation is successful when a Starter customer can:

1. identify prerequisites;
2. install the package;
3. activate official access;
4. configure a basic WooCommerce store;
5. run a test order;
6. update safely;
7. understand when and how to request support.
