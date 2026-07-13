# Database Model — V1

## Principles

- PostgreSQL is the source of truth.
- Prisma owns schema and versioned migrations.
- Use cuid/uuid-style opaque identifiers.
- Store money as integer minor units and ISO currency code.
- Store timestamps in UTC.
- Preserve order and audit history; suspend access instead of rewriting commercial facts.
- Use unique constraints for provider idempotency, license activation limits and release versions.

## Identity

### User

Core fields:

- `id`
- `email` unique and normalized
- `name` nullable
- `emailVerifiedAt` nullable
- `preferredLocale` default `fr`
- `status`: `ACTIVE`, `SUSPENDED`
- `createdAt`, `updatedAt`

### UserRole

A user may hold one or more roles:

- `CUSTOMER`
- `SUPPORT`
- `ADMIN`

Use a join model rather than a client-controlled string field.

### Address

Reusable billing/contact address attached to a user or order snapshot. Order billing data must remain historically stable even if a profile address changes.

## Catalog

### Product

Represents the commercial Template Engine product family.

Fields:

- `id`
- `slug` unique
- `name`
- `description`
- `status`: `DRAFT`, `ACTIVE`, `ARCHIVED`
- timestamps

### Offer

Represents Starter, Pro or Managed.

Fields:

- `id`
- `productId`
- `code` unique
- `name`
- `type`: `STARTER`, `PRO`, `MANAGED`
- `billingMode`: `ONE_TIME`, `RECURRING`, `MANUAL_CONTRACT`
- `activationLimit`
- `updatePolicy`
- `supportPolicy`
- `status`
- timestamps

### Price

Fields:

- `id`
- `offerId`
- `currency`
- `amountMinor`
- `billingInterval` nullable
- `provider`
- `providerPriceId` nullable
- `active`
- validity dates nullable

Do not accept `amountMinor` from checkout browser input. Resolve it from an active server-side price record.

## Commerce

### Order

Fields:

- `id`
- `number` unique human-facing reference
- `userId` nullable until identity reconciliation
- `email`
- `status`: `PENDING`, `PAID`, `FAILED`, `CANCELLED`, `REFUNDED`, `PARTIALLY_REFUNDED`
- totals in minor units: subtotal, discount, tax, total
- `currency`
- billing address snapshot
- `paidAt`, `cancelledAt`, `refundedAt` nullable
- timestamps

### OrderItem

Fields:

- `id`
- `orderId`
- `offerId`
- immutable offer name/code snapshot
- quantity
- unit and total minor amounts
- activation/update/support policy snapshots

### Payment

Fields:

- `id`
- `orderId`
- `provider`
- `providerPaymentId` unique where present
- `status`
- amount and currency
- `paidAt`
- sanitized failure code/message nullable
- timestamps

### Refund

Fields:

- `id`
- `paymentId`
- `providerRefundId` unique where present
- amount and currency
- reason/status
- timestamps

### ProviderEvent

Critical idempotency table.

Fields:

- `id`
- `provider`
- `providerEventId`
- `type`
- `status`: `RECEIVED`, `PROCESSED`, `FAILED`, `IGNORED`
- sanitized payload metadata or encrypted/raw reference according to policy
- error summary nullable
- processed timestamp

Unique constraint: `(provider, providerEventId)`.

## Access rights

### Entitlement

Fields:

- `id`
- `userId`
- `orderItemId` nullable for manual grants
- `offerId`
- `status`: `ACTIVE`, `SUSPENDED`, `EXPIRED`, `REVOKED`
- `startsAt`
- `endsAt` nullable
- `updatesUntil` nullable
- `supportUntil` nullable
- `source`: `PURCHASE`, `MANUAL`, `MIGRATION`, `PROMOTION`
- timestamps

An order item may create one entitlement. Manual grants must include an audit reason.

## Licensing

### License

Fields:

- `id`
- `entitlementId`
- `keyPrefix` indexed
- `keyHash`
- `status`: `ACTIVE`, `SUSPENDED`, `EXPIRED`, `REVOKED`
- `activationLimit`
- `issuedAt`
- `expiresAt` nullable
- `lastValidatedAt` nullable
- timestamps

Do not persist the complete license secret as plaintext. A display/recovery strategy must be explicitly chosen before implementation.

### LicenseActivation

Fields:

- `id`
- `licenseId`
- `installationId`
- `domainNormalized`
- `siteUrl` nullable
- `status`: `ACTIVE`, `DEACTIVATED`, `BLOCKED`
- `activatedAt`
- `lastSeenAt`
- `deactivatedAt` nullable
- metadata such as theme version, WordPress version and environment, with privacy limits

Unique active installation identity per license. Activation-limit checks require a transaction.

## Releases and downloads

### Release

Fields:

- `id`
- `productId`
- `version` unique per product
- `channel`: `STABLE`, `EARLY_ACCESS`
- `status`: `DRAFT`, `PUBLISHED`, `DISABLED`
- `changelog`
- `minimumRequirements` structured data nullable
- `publishedAt` nullable
- timestamps

### ReleaseFile

Fields:

- `id`
- `releaseId`
- `storageProvider`
- `bucket`
- `objectKey`
- `fileName`
- `contentType`
- `sizeBytes`
- `checksumSha256`
- `status`: `ACTIVE`, `DISABLED`
- timestamps

Object URLs must not be stored as public URLs.

### DownloadGrant

Fields:

- `id`
- `userId`
- `entitlementId`
- `releaseFileId`
- `tokenHash` or server-managed grant identifier
- `expiresAt`
- `usedAt` nullable
- `ipHash`/user-agent summary only if legally and operationally justified
- timestamps

### DownloadEvent

Records authorized or denied attempts without storing signed URLs or secrets.

## Service operations

### ServiceRequest

Created for Pro and Managed workflows.

Fields:

- `id`
- `userId`
- `entitlementId`
- `type`: `PRO_SETUP`, `MANAGED_ONBOARDING`, `CHANGE_REQUEST`
- `status`: `NEW`, `WAITING_CUSTOMER`, `PLANNED`, `IN_PROGRESS`, `VALIDATION`, `COMPLETED`, `CANCELLED`
- onboarding data reference
- assigned operator nullable
- timestamps

### Project

Tracks staging/deployment work when a service request becomes an active project.

Never store hosting passwords or real secrets directly in project records. Use an approved secrets-sharing method and store only references/status.

## Support

### SupportTicket

Fields:

- `id`
- `userId`
- `entitlementId` nullable
- `subject`
- `status`
- `priority`
- assigned operator nullable
- timestamps

### SupportMessage

Ticket messages with author, body and attachment metadata. Attachment storage must be private and access-controlled.

## Operations and security

### AuditEvent

Append-oriented record:

- actor user or system identity
- action
- target type/id
- sanitized before/after summary where safe
- reason
- correlation ID
- created timestamp

Audit events are required for manual order changes, entitlement grants/revocations, license changes and release publication.

## Initial implementation sequence

Sprint 01 should not implement the complete model at once. It should:

1. remove demo `Profile` and `Post` models;
2. establish enums and core `User`/role foundations;
3. add catalog, order, provider-event, entitlement, license and release core tables;
4. generate a clean initial migration;
5. add seed data only for Starter, Pro and Managed development offers;
6. verify migration on a fresh PostgreSQL database.

Support and service-detail tables may be introduced in later sprints once their workflows are implemented.
