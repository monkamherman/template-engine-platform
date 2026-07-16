# Implementation Roadmap — Generate First, Customize Progressively

## Strategy

The platform will be built in two complementary movements:

1. **Horizontal generation:** create the complete application structure, routes, shells, states and fixture-backed interfaces.
2. **Vertical completion:** take one interface family at a time from skeleton to validated production behavior.

This avoids two common failures:

- polishing one landing page while the rest of the product has no architecture;
- generating many pages that look complete but have no shared rules, authorization boundaries or data contracts.

## Global execution rules

- `main` must remain buildable.
- Every sprint uses a dedicated branch and draft pull request.
- Interface maturity is tracked in `docs/interface-inventory.md` and the runtime interface registry.
- Pages may use fixtures only through repository/query interfaces.
- Real providers are introduced only through approved adapters.
- A visual redesign must not move business rules into page components.
- A backend integration must not silently redesign interfaces outside its scope.
- Every wave must preserve French and English route compatibility.
- Legal and documentation content must have explicit review and publication states.
- No customer release is complete without matching installation, upgrade, troubleshooting and license information.

## Program phases

### Phase 0 — Foundation and cleanup

Primary sprint: Sprint 01.

Goals:

- remove starter branding and demo-only code;
- normalize pnpm, scripts, lint, typecheck, tests and build;
- establish Prisma/PostgreSQL foundations;
- create domain boundaries;
- establish localized routes and access shells;
- provide reliable CI.

Exit condition:

The repository is a clean, reproducible platform foundation rather than a generic starter.

### Phase 1 — Brand and design system

Primary sprint: Sprint 02.

Goals:

- approve the visual identity;
- select the original monogram concept;
- define color, typography, spacing and elevation tokens;
- implement reusable UI primitives;
- validate responsive and accessible component behavior;
- expose a design-system review page.

Exit condition:

The team has a stable visual language that can be applied consistently to all interface families.

### Phase 2 — Complete application skeleton

Primary sprint: Sprint 03.

Current status: in progress on branch `dev`. Central route builders, navigation configuration, runtime interface registry, development interface map, generated wireframe renderer and development-only customer/admin preview guards have been introduced. Remaining Sprint 03 work should keep fixture behavior explicit and continue raising individual interface maturity only when tests and review evidence support it.

Goals:

- create every approved V1 route;
- implement marketing, documentation, auth, account and admin shells;
- centralize route and navigation configuration;
- create an interface registry;
- build meaningful wireframes for all interfaces;
- create fixture repositories and representative states;
- provide localized not-found, loading, error and forbidden boundaries.

Exit condition:

The full V1 product can be navigated end to end in development, all pages compile, and every unfinished capability is honestly identified.

### Phase 3 — Licensing and documentation foundation

Primary sprint: Sprint 04.

Current status: in progress on branch `feat/sprint-04-licensing-documentation`. Localized legal and documentation content foundations, a public documentation shell, typed content validation, release-package documentation checks, legal-document Prisma contracts, license-key account previews, admin review previews and offer legal/support references have been introduced. Remaining work should focus on review, commit/PR evidence and any product-specific copy adjustments before closure.

Goals:

- separate software copyright licensing, commercial access, technical keys and service terms;
- create localized legal routes with explicit review states;
- define versioned legal-document and customer-acceptance contracts;
- create the documentation content architecture;
- implement the public documentation shell;
- create the Starter quick-start and core mode d’emploi drafts;
- define release-package license and documentation requirements;
- add third-party notice inventory rules;
- create honest license-key UX previews;
- validate documentation metadata and internal links.

Exit condition:

The product can be explained legally and operationally without inventing binding terms, and a Starter customer has a usable draft path from prerequisites through installation, test order, update and support.

### Phase 4 — Public website customization

Suggested sprints: Sprint 05 and Sprint 06.

Wave A — positioning and understanding:

- global marketing shell;
- home;
- product overview;
- features;
- use-case index and details;
- demonstrations;
- documentation entry points.

Wave B — conversion and trust:

- pricing;
- Starter, Pro and Managed detail pages;
- FAQ;
- contact;
- approved legal/trust content;
- support and documentation links;
- responsive navigation and conversion paths.

Exit condition:

A visitor can understand the product, compare offers, inspect the applicable license/support principles and reach an approved checkout or contact action without misleading content.

### Phase 5 — Authentication and customer account customization

Suggested sprints: Sprint 07 and Sprint 08.

Wave A — identity and account shell:

- authentication provider decision;
- login, registration, recovery and verification;
- server-side session and role boundaries;
- profile and security settings;
- account dashboard.

Wave B — commercial access:

- orders and accepted-term references;
- entitlements;
- licenses and activations;
- downloads and release history;
- contextual documentation links;
- empty, suspended, expired and revoked official-service states.

Exit condition:

An authenticated customer sees only authorized commercial data and can understand the next valid action and the relevant documentation.

### Phase 6 — Pro/Managed service and support workflows

Suggested sprint: Sprint 09.

Goals:

- onboarding questionnaire;
- service request timeline;
- milestones and approval states;
- support request creation and conversation;
- documentation suggestions before ticket creation;
- operator assignment and status management;
- email notification boundaries.

Exit condition:

Pro and Managed purchases create trackable operational work rather than informal manual follow-up.

### Phase 7 — Administration customization

Suggested sprints: Sprint 10 and Sprint 11.

Wave A — catalog and commerce operations:

- customers;
- products, offers and prices;
- offer-term versions;
- orders and payments;
- filters, search and detail views.

Wave B — access and operations:

- entitlements;
- licenses and activations;
- releases and files;
- release documentation status;
- legal-document review states;
- service requests;
- support queue;
- audit log;
- high-risk action confirmations.

Exit condition:

Operators can investigate and manage the V1 commercial lifecycle with server-side authorization, versioned terms and audit evidence.

### Phase 8 — Real commerce integration

Suggested sprint: Sprint 12.

Goals:

- approve the initial payment provider;
- implement the provider adapter;
- create hosted checkout sessions;
- present applicable document versions before purchase;
- verify webhook signatures;
- enforce event idempotency;
- create orders, payments and entitlements transactionally;
- persist accepted legal/offer versions;
- implement safe refund boundaries;
- add provider failure monitoring.

Exit condition:

A verified payment event creates the correct internal commercial state exactly once and preserves the terms context accepted during purchase.

### Phase 9 — Technical licensing and release delivery

Suggested sprint: Sprint 13.

Goals:

- issue and hash license keys safely;
- activate, validate and deactivate official-service access;
- enforce activation limits transactionally;
- distinguish production and staging activations;
- register releases and checksums;
- require matching changelog and documentation metadata;
- integrate private object storage;
- create download grants and short-lived signed URLs;
- audit privileged changes and downloads.

Exit condition:

An entitled customer can securely receive the correct release, access matching documentation, and an official-service key can be limited, suspended and revoked without falsely claiming to revoke software copyright rights.

### Sprint 05A — License service foundation

Current status: ready for QA handoff on branch `feat/sprint-05a-license-service`.

Audit summary:

- existing schema had `License` and `LicenseActivation`, but only one generic `activationLimit` and no encrypted redisplay storage;
- account/admin license pages are still preview-backed;
- only `/api/health` exists as a real API route; license protocol routes are not connected yet;
- current tests are Node test runner based, with no database integration harness yet;
- auth remains a development fixture, so privileged reveal/rotation UI must stay unreleased until production auth exists.

Implemented foundation:

- V1 schema migration adds one license per entitlement, key last-four, ciphertext/nonce/auth tag, hash/encryption/key versions, production/staging limits and activation environment;
- environment validation covers required license secrets and rate-limit mode;
- licensing module now includes key generation/canonicalization, HMAC verification, AES-GCM encryption, domain normalization, limit policy, signed lease generation/verification, memory rate limiting, issuance, reveal, rotation, status changes and limit changes;
- public protocol routes `/api/licenses/activate`, `/api/licenses/validate` and `/api/licenses/deactivate` exist and delegate to domain services;
- `/admin/licenses` is connected to real license and activation queries and includes the protocol workbench for operator testing;
- protocol fixture files for Sprint 05C are present under `tests/fixtures/license-protocol`;
- development seed can generate a local-only test license when `SEED_DEV_LICENSE=true`;
- unit tests cover the security primitives, route envelope behavior and protocol fixture package.

QA handoff items before Sprint 05A release sign-off:

- database-backed integration tests against disposable PostgreSQL;
- concurrency proof for production/staging activation limits;
- customer account license pages connected to authorized queries;
- exact signed lease fixtures generated from a committed test keypair for cross-repository 05C;
- production shared rate limiter adapter decision.

### Phase 10 — Hardening and launch

Suggested sprints: Sprint 14 and Sprint 15.

Goals:

- complete qualified legal review and approve production copy;
- confirm copyright notices and third-party license inventory;
- complete the customer mode d’emploi against a clean installation;
- accessibility audit;
- responsive/browser/device QA;
- performance and image optimization;
- rate limiting and abuse controls;
- CSP and secure headers;
- structured logging and error monitoring;
- backup, migration and rollback rehearsal;
- production deployment checklist;
- release-package checklist;
- release readiness report.

Exit condition:

All launch-critical interfaces are `VALIDATED`, binding legal content is approved, the release package contains the required license/documentation files, core flows have automated coverage, and operational recovery procedures are documented.

## Progressive customization workflow

For each interface family:

1. confirm route ownership and current maturity;
2. review the wireframe and required states;
3. approve content hierarchy;
4. verify applicable licensing/documentation references;
5. apply or refine visual components;
6. connect the page query or command service;
7. add authorization and validation;
8. test loading, empty, success, error and forbidden states;
9. validate mobile, tablet and desktop behavior;
10. update the inventory and interface registry;
11. merge only when the stated maturity is evidenced.

## Recommended branch naming

```text
feat/sprint-03-application-skeleton
feat/sprint-04-licensing-documentation
feat/marketing-home-product
feat/marketing-pricing-offers
feat/auth-account-shell
feat/account-commercial-access
feat/services-support
feat/admin-catalog-commerce
feat/admin-access-operations
feat/payment-provider-integration
feat/licensing-release-delivery
chore/launch-hardening
```

## Pull request sizing

The full skeleton may be a broad sprint because it intentionally creates route structure. Later customization pull requests should be narrower.

Recommended later PR boundaries:

- one interface family;
- one domain integration;
- one documentation or legal-content family;
- one shared component upgrade used by identified pages;
- one accessibility/performance hardening topic.

Avoid combining a visual redesign, database migration, payment integration and unrelated admin pages in the same PR.

## Progress reporting

At the end of each sprint, report:

- interfaces moved between maturity states;
- routes added, renamed or deferred;
- fixture interfaces replaced by real services;
- legal/documentation states changed;
- release documentation updated;
- tests added and commands executed;
- security or authorization changes;
- unresolved risks;
- exact next customization wave.

## Immediate next step

After Sprint 01 provides a stable implementation base and Sprint 02 supplies usable design tokens, execute Sprint 03 to generate the complete V1 application skeleton. Then execute Sprint 04 to establish licensing and the customer mode d’emploi before completing final conversion pages or real payment/licensing integrations.
