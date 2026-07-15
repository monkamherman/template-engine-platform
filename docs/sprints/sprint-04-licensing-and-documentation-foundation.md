# Sprint 04 — Licensing and Documentation Foundation

## Goal

Make the product legally understandable and operationally usable before final marketing conversion pages or real commerce integrations are completed.

This sprint establishes the licensing model, legal-document structure, customer documentation architecture and release-package documentation requirements. It does not publish unreviewed binding legal terms or implement production license validation.

## Prerequisites

- Sprint 01 foundation is buildable;
- Sprint 02 design primitives are available;
- Sprint 03 application skeleton provides localized route shells and interface registry;
- `docs/licensing-strategy.md` and `docs/documentation-plan.md` are approved as implementation guidance.

## Required reading

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/architecture.md`
4. `docs/database-model.md`
5. `docs/project-structure.md`
6. `docs/interface-inventory.md`
7. `docs/implementation-roadmap.md`
8. `docs/licensing-strategy.md`
9. `docs/documentation-plan.md`
10. this sprint.

## Branch

```text
feat/sprint-04-licensing-documentation
```

## Deliverables

### 1. Legal and licensing content architecture

Create version-controlled localized content foundations for:

```text
/{locale}/legal/software-license
/{locale}/legal/commercial-terms
/{locale}/legal/support-policy
/{locale}/legal/refunds
/{locale}/legal/privacy
/{locale}/legal/trademark
```

Requirements:

- pages are routed and included in the legal navigation;
- unapproved pages display an explicit review status;
- no invented jurisdiction, company identity, refund promise or liability clause;
- software-license page explains the separation between GPL-covered software rights and official commercial services;
- offer pages link to the relevant legal and support documents;
- content is stored outside page components.

### 2. Legal-document version model

Create the approved foundation for:

```text
LegalDocument
LegalDocumentVersion
OfferTermsVersion
CustomerAcceptance
```

Implementation may be schema-first or repository-contract-first depending on current Sprint 01 database maturity.

Required concepts:

- document type;
- locale;
- semantic or immutable version;
- effective date;
- draft/review/published/archived state;
- content checksum;
- accepted version reference;
- customer/order association;
- acceptance timestamp.

Do not collect IP addresses or user-agent data without explicit privacy approval.

### 3. Documentation route architecture

Create localized documentation foundations for:

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

The initial sprint may use reviewed draft content and fixtures, but pages must have meaningful information architecture rather than generic placeholders.

### 4. Documentation content system

Create or normalize:

```text
content/
  docs/
    fr/
    en/
  legal/
    fr/
    en/
```

Each document must support metadata for:

- stable ID;
- locale;
- title;
- summary;
- product/release compatibility;
- last review date;
- review state;
- visibility;
- owner.

Provide typed loaders and validation. Page components must not import arbitrary raw fixture JSON.

### 5. Documentation shell

Implement a reusable documentation shell containing:

- sidebar navigation;
- mobile navigation;
- breadcrumbs;
- article table of contents when applicable;
- previous/next links;
- locale switcher;
- version indicator or placeholder contract;
- last-reviewed status;
- contextual support link;
- accessible heading and anchor behavior.

Search may be a safe local preview contract if a production index is not approved.

### 6. Customer quick-start content

Create reviewed draft content for at least:

- prerequisites;
- package download and identification;
- installation;
- initial WooCommerce checks;
- official-access activation explanation;
- first configuration;
- test-order checklist;
- update and backup principles;
- troubleshooting and support escalation.

Do not claim compatibility ranges that have not been tested.

### 7. Release-package documentation contract

Document and, where appropriate, automate validation that every commercial theme release contains:

```text
LICENSE.txt
COPYRIGHT.md
THIRD_PARTY_NOTICES.md
README.md
QUICKSTART.md
INSTALLATION.md
UPGRADE.md
TROUBLESHOOTING.md
CHANGELOG.md
```

This platform repository must not copy the private theme source or release ZIP. It may define release metadata requirements and validate a manifest supplied by the theme packaging pipeline.

### 8. Third-party notice inventory contract

Define a structured manifest for release-time legal review:

- dependency or asset name;
- version;
- source URL or package reference;
- license identifier;
- included-in-distribution flag;
- notice requirement;
- review status;
- replacement/blocking note.

Do not automatically approve compatibility based only on a package metadata string.

### 9. License-key user experience preview

Create honest wireframes or branded previews for:

- where a customer finds a key;
- activation limit explanation;
- production versus staging installation;
- activation list;
- deactivation flow;
- expired update-access state;
- suspended/revoked official-service state;
- links to applicable terms and documentation.

No preview may simulate production activation persistence if the licensing service is not connected.

### 10. Quality checks

Add validation for:

- duplicate documentation IDs;
- invalid metadata;
- missing navigation entries;
- broken internal links;
- unavailable localized routes;
- unpublished legal content accidentally shown as approved;
- documentation pages excluded from production when marked internal;
- interface registry entries for all new routes.

## Interface maturity target

By sprint end:

- documentation index and core guides: at least `WIREFRAME`, preferably `BRANDED`;
- legal pages: at least `WIREFRAME`, clearly marked review status;
- license-key UX: `WIREFRAME` or `BRANDED`, fixture-backed only;
- legal acceptance persistence: contract/schema foundation, not falsely `CONNECTED`;
- production legal terms: not `RELEASED` until counsel approval.

## Explicitly out of scope

- final legal advice or counsel approval;
- choosing a jurisdiction without business approval;
- production checkout consent capture;
- production license activation endpoints;
- real automatic theme updates;
- private object-storage delivery;
- final support SLA commitments;
- publishing unverified compatibility claims;
- copying theme source into this repository.

## Verification

Run the repository-defined commands, including at minimum:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Also run documentation-link and metadata validation commands introduced by this sprint.

## Completion criteria

The sprint is complete when:

- licensing layers are clearly represented in product copy and architecture;
- legal routes exist with honest review states;
- the documentation shell and core mode d’emploi routes exist in FR and EN structure;
- customer quick-start content is usable as a reviewed draft;
- release-package documentation requirements are machine-checkable or explicitly contract-defined;
- no page invents binding legal terms;
- no technical key is described as overriding GPL rights;
- tests and build pass;
- the interface inventory and roadmap are updated with achieved maturity.
