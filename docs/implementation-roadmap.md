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

Goals:

- create every approved V1 route;
- implement marketing, auth, account and admin shells;
- centralize route and navigation configuration;
- create an interface registry;
- build meaningful wireframes for all interfaces;
- create fixture repositories and representative states;
- provide localized not-found, loading, error and forbidden boundaries.

Exit condition:

The full V1 product can be navigated end to end in development, all pages compile, and every unfinished capability is honestly identified.

### Phase 3 — Public website customization

Suggested sprints: Sprint 04 and Sprint 05.

Wave A — positioning and understanding:

- global marketing shell;
- home;
- product overview;
- features;
- use-case index and details;
- demonstrations.

Wave B — conversion and trust:

- pricing;
- Starter, Pro and Managed detail pages;
- FAQ;
- contact;
- legal placeholders and trust content;
- responsive navigation and conversion paths.

Exit condition:

A visitor can understand the product, compare offers and reach an approved checkout or contact action without misleading content.

### Phase 4 — Authentication and customer account customization

Suggested sprints: Sprint 06 and Sprint 07.

Wave A — identity and account shell:

- authentication provider decision;
- login, registration, recovery and verification;
- server-side session and role boundaries;
- profile and security settings;
- account dashboard.

Wave B — commercial access:

- orders;
- entitlements;
- licenses and activations;
- downloads and release history;
- empty, suspended, expired and revoked states.

Exit condition:

An authenticated customer sees only authorized commercial data and can understand the next valid action.

### Phase 5 — Pro/Managed service and support workflows

Suggested sprint: Sprint 08.

Goals:

- onboarding questionnaire;
- service request timeline;
- milestones and approval states;
- support request creation and conversation;
- operator assignment and status management;
- email notification boundaries.

Exit condition:

Pro and Managed purchases create trackable operational work rather than informal manual follow-up.

### Phase 6 — Administration customization

Suggested sprints: Sprint 09 and Sprint 10.

Wave A — catalog and commerce operations:

- customers;
- products, offers and prices;
- orders and payments;
- filters, search and detail views.

Wave B — access and operations:

- entitlements;
- licenses and activations;
- releases and files;
- service requests;
- support queue;
- audit log;
- high-risk action confirmations.

Exit condition:

Operators can investigate and manage the V1 commercial lifecycle with server-side authorization and audit evidence.

### Phase 7 — Real commerce integration

Suggested sprint: Sprint 11.

Goals:

- approve the initial payment provider;
- implement the provider adapter;
- create hosted checkout sessions;
- verify webhook signatures;
- enforce event idempotency;
- create orders, payments and entitlements transactionally;
- implement safe refund boundaries;
- add provider failure monitoring.

Exit condition:

A verified payment event creates the correct internal commercial state exactly once.

### Phase 8 — Licensing and release delivery

Suggested sprint: Sprint 12.

Goals:

- issue and hash license keys safely;
- activate, validate and deactivate installations;
- enforce activation limits transactionally;
- register releases and checksums;
- integrate private object storage;
- create download grants and short-lived signed URLs;
- audit privileged changes and downloads.

Exit condition:

An entitled customer can securely receive the correct release, and a license can be limited, suspended and revoked.

### Phase 9 — Hardening and launch

Suggested sprints: Sprint 13 and Sprint 14.

Goals:

- complete legal review and approved production copy;
- accessibility audit;
- responsive/browser/device QA;
- performance and image optimization;
- rate limiting and abuse controls;
- CSP and secure headers;
- structured logging and error monitoring;
- backup, migration and rollback rehearsal;
- production deployment checklist;
- release readiness report.

Exit condition:

All launch-critical interfaces are `VALIDATED`, core flows have automated coverage, and operational recovery procedures are documented.

## Progressive customization workflow

For each interface family:

1. confirm route ownership and current maturity;
2. review the wireframe and required states;
3. approve content hierarchy;
4. apply or refine visual components;
5. connect the page query or command service;
6. add authorization and validation;
7. test loading, empty, success, error and forbidden states;
8. validate mobile, tablet and desktop behavior;
9. update the inventory and interface registry;
10. merge only when the stated maturity is evidenced.

## Recommended branch naming

```text
feat/sprint-03-application-skeleton
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
- one shared component upgrade used by identified pages;
- one accessibility/performance hardening topic.

Avoid combining a visual redesign, database migration, payment integration and unrelated admin pages in the same PR.

## Progress reporting

At the end of each sprint, report:

- interfaces moved between maturity states;
- routes added, renamed or deferred;
- fixture interfaces replaced by real services;
- tests added and commands executed;
- security or authorization changes;
- unresolved risks;
- exact next customization wave.

## Immediate next step

After Sprint 01 provides a stable implementation base and Sprint 02 supplies usable design tokens, execute Sprint 03 to generate the complete V1 application skeleton. Do not begin real payment, production authentication, licensing or storage integrations inside Sprint 03.
