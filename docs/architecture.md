# Architecture — Commercial Platform V1

## Architectural style

Use a modular monolith deployed as one Next.js application. Domains remain isolated in code and data access, but V1 avoids microservices, message brokers and multiple deployment units.

## Existing starter assessment

The selected repository contains Next.js App Router, React/TypeScript, Tailwind/UI primitives, Prisma/PostgreSQL support, Docker utilities, generic Swagger/demo utilities, generic `User`, `Profile` and `Post` models, and starter branding. Sprint 01 must audit each dependency and keep only what supports the platform.

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
                          storage, release
```

### Presentation layer

- `app/[locale]/(marketing)`: public website;
- `app/[locale]/(auth)`: login, registration and recovery;
- `app/[locale]/account`: authenticated customer portal;
- `app/[locale]/admin`: role-protected operations;
- `app/api`: machine-to-machine endpoints and webhooks.

Use server components by default. Add client components only for real interaction requirements.

### Domain modules

- `auth`: identities, roles, sessions and authorization policies;
- `catalog`: products, offers, prices and availability;
- `commerce`: checkout, orders, payments, refunds and provider events;
- `entitlements`: customer rights created from paid order items;
- `licensing`: issue, activation, validation and revocation rules;
- `releases`: versions, files, checksums and download grants;
- `services`: Pro/Managed onboarding and projects;
- `support`: tickets and support policy;
- `audit`: administrative and security events.

Business rules live in modules, not pages or route handlers. Each module exposes a small public interface.

### Infrastructure adapters

- Prisma client;
- payment providers;
- private object storage;
- transactional email;
- hashing/signing utilities;
- telemetry and structured logging.

External providers must remain replaceable through interfaces and configuration.

## Authentication and authorization

V1 requires verified user identity, roles `CUSTOMER`, `SUPPORT`, `ADMIN`, server-side authorization for every account/admin action, and secure production sessions. The exact authentication library is deferred until compatibility review. Provider-specific IDs must not become primary business identities.

## Internationalization

Use locale-prefixed routes from the beginning:

```text
/fr/...
/en/...
```

French is the default editorial source. Persist customer locale when known.

## Commerce architecture

```ts
export interface PaymentProvider {
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutSession>;
  verifyWebhook(request: Request): Promise<NormalizedPaymentEvent>;
  refund(input: RefundInput): Promise<RefundResult>;
  createCustomerPortal?(customerId: string): Promise<string>;
}
```

Provider adapters translate external payloads into internal events.

Webhook rules:

- verify signatures before trusting fields;
- persist provider event IDs;
- enforce uniqueness for idempotency;
- process events transactionally;
- acknowledge already-processed events safely;
- never create an entitlement from a browser redirect;
- retain only sanitized operational failure data.

## Entitlements

Orders preserve accounting history. Access is represented separately:

```text
Order -> OrderItem -> Entitlement
                        |
              +---------+---------+
              |                   |
           License            Download rights
                                  |
                              Releases
```

This permits refunds, manual grants, access suspension and upgrades without rewriting order history.

## Licensing

Planned later API surface:

```text
POST /api/licenses/activate
POST /api/licenses/validate
POST /api/licenses/deactivate
GET  /api/releases/latest
```

Do not store full license keys in plaintext when avoidable. Store a lookup-safe prefix and cryptographic hash of the secret portion. Normalize domains before enforcing activation limits. Record activations independently from licenses.

## Release delivery

The theme repository owns build and packaging. This platform owns commercial release metadata and delivery authorization.

1. A tagged theme release creates a ZIP and checksum.
2. Release metadata is created by an operator or authenticated automation.
3. The archive is stored in a private S3-compatible bucket.
4. The customer requests a download.
5. The platform checks identity, entitlement, release status and policy.
6. A short-lived grant and signed object URL are created.
7. The event is audited without logging the signed URL.

## Database and transactions

Use PostgreSQL through Prisma migrations. Use transactions for payment event processing, refund/access changes, activation-limit enforcement and release publication changes. Unique constraints are the final concurrency defense.

## Security baseline

- strict server environment validation;
- secrets only in server modules;
- verified webhooks;
- rate limiting for authentication, license and download endpoints;
- short-lived signed URLs;
- no sensitive payload logging;
- privileged action audit events;
- secure headers and content security policy before launch;
- separate development, preview and production secrets/databases/buckets.

## Observability

Use structured logs with correlation IDs. Add error monitoring before real payments. Track webhook failures, duplicates, denied downloads and license validation failures.

## Initial deployment shape

- one Next.js deployment;
- managed PostgreSQL;
- private S3-compatible storage;
- transactional email provider;
- hosted payment checkout;
- separate development, preview/staging and production environments.

## Deferred decisions

- authentication library;
- primary and backup payment providers;
- storage vendor;
- email vendor;
- recurring Managed billing;
- WordPress companion plugin/updater;
- extraction of a licensing service.
