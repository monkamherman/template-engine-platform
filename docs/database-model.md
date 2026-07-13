# Database Model — V1

## Principles

- PostgreSQL is the source of truth.
- Prisma owns schema and versioned migrations.
- Use opaque cuid/uuid-style IDs.
- Store money as integer minor units plus ISO currency.
- Store timestamps in UTC.
- Preserve order/audit history; suspend access rather than rewriting facts.
- Use unique constraints for provider idempotency and release/licensing concurrency.

## Identity

### User

`id`, normalized unique `email`, optional `name`, optional `emailVerifiedAt`, `preferredLocale` default `fr`, status (`ACTIVE`, `SUSPENDED`), timestamps.

### UserRole

Join model supporting `CUSTOMER`, `SUPPORT`, `ADMIN`. Never trust a client-controlled role string.

### Address

Reusable profile address plus immutable billing snapshots on orders.

## Catalog

### Product

`id`, unique `slug`, name, description, status (`DRAFT`, `ACTIVE`, `ARCHIVED`), timestamps.

### Offer

Represents Starter, Pro or Managed: product, unique code, name, type, billing mode (`ONE_TIME`, `RECURRING`, `MANUAL_CONTRACT`), activation limit, update/support policy, status, timestamps.

### Price

Offer, currency, `amountMinor`, optional billing interval, provider/provider price ID, active flag and validity dates. Checkout must resolve price server-side; never accept browser-submitted totals.

## Commerce

### Order

Human-facing unique number, optional user, email, status (`PENDING`, `PAID`, `FAILED`, `CANCELLED`, `REFUNDED`, `PARTIALLY_REFUNDED`), subtotal/discount/tax/total minor amounts, currency, billing snapshot and lifecycle timestamps.

### OrderItem

Order, offer, immutable offer policy/name snapshots, quantity and unit/total minor amounts.

### Payment

Order, provider, unique provider payment ID where present, status, amount/currency, paid timestamp and sanitized failure information.

### Refund

Payment, unique provider refund ID where present, amount/currency, reason/status and timestamps.

### ProviderEvent

Critical webhook idempotency table: provider, provider event ID, event type, processing status (`RECEIVED`, `PROCESSED`, `FAILED`, `IGNORED`), sanitized metadata/error and timestamps. Unique `(provider, providerEventId)`.

## Access rights

### Entitlement

User, optional source order item, offer, status (`ACTIVE`, `SUSPENDED`, `EXPIRED`, `REVOKED`), starts/ends dates, update/support expiry, source (`PURCHASE`, `MANUAL`, `MIGRATION`, `PROMOTION`) and timestamps. Manual grants require an audit reason.

## Licensing

### License

Entitlement, indexed key prefix, secret hash, status, activation limit, issue/expiry/last-validation timestamps. Do not persist the full license key in plaintext.

### LicenseActivation

License, installation ID, normalized domain, optional site URL, status (`ACTIVE`, `DEACTIVATED`, `BLOCKED`), activation/last-seen/deactivation timestamps and privacy-limited environment metadata. Enforce activation limits transactionally.

## Releases and downloads

### Release

Product, version unique per product, channel (`STABLE`, `EARLY_ACCESS`), status (`DRAFT`, `PUBLISHED`, `DISABLED`), changelog, optional requirements, publication timestamp.

### ReleaseFile

Release, storage provider/bucket/object key, file name/type/size/checksum, status. Never store a public permanent object URL.

### DownloadGrant

User, entitlement, release file, hashed token or server grant ID, expiry/use timestamps and only legally justified request metadata.

### DownloadEvent

Records authorized or denied attempts without storing signed URLs or secrets.

## Service operations

### ServiceRequest

User, entitlement, type (`PRO_SETUP`, `MANAGED_ONBOARDING`, `CHANGE_REQUEST`), workflow status, onboarding reference, optional assignee and timestamps.

### Project

Tracks staging/deployment work. Never store hosting passwords or real secrets directly; keep only approved secret references/status.

## Support

### SupportTicket / SupportMessage

Ticket identity, user/optional entitlement, subject, status, priority, assignee and messages. Attachments must use private controlled storage.

## Operations

### AuditEvent

Append-oriented actor/system identity, action, target, sanitized change summary, reason, correlation ID and timestamp. Required for manual commercial access, license and release changes.

## Sprint 01 subset

Sprint 01 should:

1. remove demo `Profile` and `Post` models;
2. establish User/role foundations;
3. add Product, Offer, Price;
4. add Order, OrderItem, Payment and ProviderEvent;
5. add Entitlement, License and LicenseActivation;
6. add Release, ReleaseFile and AuditEvent;
7. generate a clean migration;
8. seed only development Starter, Pro and Managed offers with clearly non-production prices;
9. verify migration on a fresh PostgreSQL database.

Support and detailed service tables may be introduced when their workflows are implemented.
