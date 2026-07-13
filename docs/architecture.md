# Architecture — Commercial Platform V1

## Architectural style

Use a modular monolith deployed as one Next.js application. Domains remain isolated in code and data access, but V1 avoids microservices, message brokers and multiple deployment units.

This keeps the launch architecture affordable and understandable while preserving extraction paths for licensing or release delivery later.

## Existing starter assessment

The selected repository starts from a generic full-stack template containing:

- Next.js App Router;
- React and TypeScript;
- Tailwind and reusable UI primitives;
- Prisma/PostgreSQL support;
- Docker support;
- generic Swagger and demo utilities;
- generic `User`, `Profile` and `Post` models;
- starter branding and demo pages.

Sprint 01 must audit each dependency and keep only what supports the platform. Demo branding, models, links and example API behavior are not product features.

## Target layers

```text
Browser / WordPress client / payment provider
                    |
                    v
Next.js pages, server actions and route handlers
                    |
                    v
Application services in modules/*
                    |
          +---------+----------+
          |                    |
          v                    v
      Prisma/PostgreSQL   Provider adapters
                          payment, email,
                          storage, GitHub/release
```

### Presentation layer

- `app/[locale]/(marketing)`: public website;
- `app/[locale]/(auth)`: login, registration and recovery;
- `app/[locale]/account`: authenticated customer portal;
- `app/[locale]/admin`: role-protected operations;
- `app/api`: machine-to-machine endpoints and webhooks.

Use server components by default. Add client components only for real interaction requirements.

### Application/domain layer

Place domain code under `modules/`:

- `auth`: identities, roles, sessions and authorization policies;
- `catalog`: products, offers, prices and commercial availability;
- `commerce`: checkout, orders, payments, refunds and provider events;
- `entitlements`: customer rights created from paid order items;
- `licensing`: license issue/activation/validation/revocation rules;
- `releases`: versions, files, checksums and download grants;
- `services`: Pro/Managed onboarding and projects;
- `support`: tickets, messages and support policy;
- `audit`: immutable administrative and security events.

Each module should expose a small public service interface. Do not import internal implementation files across domain boundaries.

### Infrastructure layer

Place adapters under `lib` or a module-specific `infrastructure` directory:

- Prisma client;
- payment providers;
- object storage;
- email delivery;
- hashing/signing utilities;
- telemetry;
- time and identifier helpers.

External providers must be replaceable through interfaces and configuration.

## Authentication and authorization

V1 requires:

- email/password or magic-link capable authentication;
- verified email state;
- roles: `CUSTOMER`, `SUPPORT`, `ADMIN`;
- server-side authorization for every account/admin action;
- session cookies with secure production settings;
- no role trust from client-provided data.

The exact authentication library is selected during implementation after compatibility review. The data model must not depend on provider-specific identifiers as primary business identities.

## Internationalization

Use locale-prefixed routes from the beginning:

```text
/fr/...
/en/...
```

French is the default editorial source. Locale negotiation must not make legal or checkout URLs ambiguous. Persist a customer's preferred locale when known.

## Commerce architecture

### Payment provider contract

```ts
export interface PaymentProvider {
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;
  verifyWebhook(request: Request): Promise<NormalizedPaymentEvent>;
  refund(input: RefundInput): Promise<RefundResult>;
  createCustomerPortal?(customerId: string): Promise<string>;
}
```

Provider adapters translate external payloads into internal events. Business code only consumes normalized events.

### Webhook rules

- verify signatures before parsing trusted fields;
- persist the provider event ID;
- enforce a unique constraint for idempotency;
- process events transactionally;
- acknowledge already-processed events safely;
- never create an entitlement from a browser redirect;
- retain sanitized failure information for operations.

## Entitlement architecture

An order is accounting history. Access is represented separately by an entitlement.

```text
Order -> OrderItem -> Entitlement
                        |
              +---------+---------+
              |                   |
           License            Download rights
                                  |
                              Releases
```

This separation allows refunds, manual grants, license changes and service upgrades without rewriting order history.

## Licensing architecture

Public API shape planned for a later sprint:

```text
POST /api/licenses/activate
POST /api/licenses/validate
POST /api/licenses/deactivate
GET  /api/releases/latest
```

License keys must not be stored in plaintext when avoidable. Store a lookup-safe prefix plus a cryptographic hash of the secret portion. Return the full key only at creation and through protected customer access if the chosen recovery strategy supports it.

Normalize domains before enforcing activation limits. Record activations separately so a license can be transferred or deactivated without changing history.

## Release and download architecture

The theme repository owns compilation and packaging. This platform owns commercial release metadata and delivery authorization.

Flow:

1. A tagged theme release creates a ZIP and checksum.
2. An operator or authenticated automation creates release metadata.
3. The archive is stored in a private S3-compatible bucket.
4. A customer requests a download.
5. The platform checks session, entitlement, release availability and policy.
6. The platform creates a short-lived download grant and signed object URL.
7. The request is audited without logging the signed URL.

## Database and transactions

Use PostgreSQL through Prisma migrations.

Use database transactions for:

- payment event -> order/payment/entitlement creation;
- refund -> entitlement suspension when policy requires it;
- license activation limit enforcement;
- release publication changes that affect customer access.

Use unique constraints as the final concurrency defense, not only application-level checks.

## Security baseline

- strict environment validation at startup;
- secrets accessible only in server modules;
- CSRF protection for state-changing browser actions as required by the auth framework;
- rate limiting for authentication, license and download endpoints;
- webhook signature verification;
- signed URLs with short expiry;
- audit events for privileged changes;
- no sensitive payload logging;
- dependency and build checks in CI;
- secure headers and content security policy introduced before production launch.

## Observability

V1 should support structured server logs with request/event correlation IDs. Add error monitoring before real payments. Metrics should cover webhook failures, duplicate events, download authorization failures and license validation errors.

## Deployment

Initial target:

- one Next.js deployment;
- managed PostgreSQL;
- private S3-compatible object storage;
- transactional email provider;
- hosted payment checkout;
- environment-separated development, preview/staging and production.

Production and preview environments must not share payment secrets, webhooks, buckets or databases.

## Architecture decisions deferred

The following remain explicit decisions for later sprints:

- exact authentication library;
- primary payment provider and regional backup;
- object-storage vendor;
- transactional email vendor;
- recurring Managed billing behavior;
- WordPress companion plugin and automatic updater;
- extraction of the licensing service.
