# Sprint 05A — Platform License Service

## Goal

Implement the real server-side license engine in `template-engine-platform`.

At the end of this sprint the platform can securely issue, reveal, rotate, activate, validate, deactivate, suspend and revoke V1 licenses through tested domain services and API routes.

The WordPress theme client is a separate Sprint 05B. Real payment-triggered issuance is deferred until the verified commerce webhook sprint.

## Required reading

Read in this order before changing code:

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/architecture.md`
4. `docs/database-model.md`
5. `docs/project-structure.md`
6. `docs/interface-inventory.md`
7. `docs/licensing-strategy.md`
8. `docs/license-api-contract.md`
9. `docs/license-security-model.md`
10. this sprint

## Branch

```text
feat/sprint-05a-license-service
```

Create it from the latest buildable `main` after the documentation PR containing this sprint is merged.

## Current repository reality

The Prisma schema already contains `License` and `LicenseActivation`, but the account and administration interfaces remain fixture-backed previews. Do not create a second competing license model or a parallel API.

Audit existing files before implementation and preserve working domain conventions.

## Non-negotiable rules

- One current V1 license per entitlement.
- License issuance requires an active eligible entitlement.
- Complete license keys are never stored in plaintext.
- Complete keys never appear in logs, audit summaries, URLs or error responses.
- Verification uses HMAC and constant-time comparison, not decryption.
- Activation limits are enforced transactionally and safely under concurrency.
- Production and staging limits are independent.
- Public API errors do not reveal whether a key prefix or customer exists.
- Automatic issuance must not trust browser redirects or unverified payment state.
- A license failure controls official services only; it never disables customer storefront code.
- No production fallback cryptographic secrets.

## Scope

### Included

- license schema migration;
- key generation, canonicalization, hashing and encryption;
- license issuance and one-time privileged result;
- privileged redisplay when secure and authorized;
- key rotation;
- activation, validation and deactivation services;
- status changes: suspend, reactivate and revoke;
- production/staging limits;
- domain normalization;
- signed offline leases;
- API routes defined by protocol V1;
- audit events;
- rate-limiter abstraction and development/test adapter;
- customer and admin license queries;
- connection of the existing license pages to real repositories where authorization permits;
- tests and migration notes;
- safe development seed path for a test entitlement and license.

### Excluded

- real payment provider integration;
- automatic license issuance from an unverified checkout redirect;
- WordPress client implementation;
- automatic WordPress update delivery;
- private release file delivery;
- changing legal terms;
- disabling the storefront for license reasons;
- production deployment of a shared rate limiter if no provider is approved.

## Deliverable 1 — Audit and architecture note

Before implementation, add a short sprint audit to the PR description covering:

- current license-related schema and migrations;
- existing module and repository patterns;
- existing auth/authorization abstractions;
- current API route placeholders;
- current test runner and database-test setup;
- current account/admin license page data mode;
- risks requiring a migration or decision.

Do not replace Prisma, authentication or test infrastructure merely for preference.

## Deliverable 2 — Prisma migration

Update the existing schema instead of adding duplicate models.

### License requirements

The V1 model must support:

```text
entitlementId unique
keyPrefix
keyLast4
secretHash
secretCiphertext
secretNonce
secretAuthTag
encryptionKeyVersion
hashVersion
keyVersion
status
productionLimit
stagingLimit
issuedAt
expiresAt
lastValidatedAt
revokedAt
```

Use appropriate lengths and indexes. Ciphertext fields may use strings containing base64url data.

`Entitlement` becomes one-to-one with the current V1 `License` unless an existing approved business rule requires otherwise. Document any migration of existing fixture data.

### Activation requirements

Add an environment enum:

```text
PRODUCTION
STAGING
```

Activation fields must support:

```text
licenseId
installationId
environment
normalizedDomain
siteUrl
status
environmentMetadata
activatedAt
lastSeenAt
deactivatedAt
```

Required constraints:

- unique license plus installation ID;
- indexes for active activations and environment counts;
- non-negative limits;
- migration rollback note;
- no data-destructive shortcut.

If Prisma cannot express a required concurrency constraint, add explicit SQL in the migration and explain it.

## Deliverable 3 — Environment validation

Add typed server-only environment validation for:

```text
LICENSE_HASH_PEPPER_V1
LICENSE_ENCRYPTION_KEY_V1
LICENSE_SIGNING_PRIVATE_KEY_PEM
LICENSE_SIGNING_PUBLIC_KEY_PEM
LICENSE_SIGNING_KEY_ID
LICENSE_LEASE_TTL_SECONDS
LICENSE_GRACE_PERIOD_SECONDS
LICENSE_RATE_LIMIT_MODE
```

Update `.env.example` with placeholders and comments only.

Production behavior:

- malformed or missing cryptographic secrets fail startup or license-service initialization;
- development tests may inject deterministic test keys through explicit test configuration;
- never silently generate a new production signing or encryption key at runtime.

## Deliverable 4 — Licensing module structure

Follow the repository's existing module conventions. A suggested shape is:

```text
modules/licensing/
  index.ts
  types.ts
  schemas.ts
  errors.ts
  constants.ts
  crypto/
    key-format.ts
    key-hash.ts
    key-encryption.ts
    lease-signer.ts
  domain/
    license-policy.ts
    domain-normalization.ts
  repositories/
    license-repository.ts
    prisma-license-repository.ts
  services/
    issue-license.ts
    reveal-license-key.ts
    rotate-license-key.ts
    activate-license.ts
    validate-license.ts
    deactivate-license.ts
    change-license-status.ts
  queries/
    get-customer-license.ts
    list-customer-licenses.ts
    get-admin-license.ts
    list-admin-licenses.ts
  rate-limit/
    license-rate-limiter.ts
    memory-license-rate-limiter.ts
  tests/
```

Adapt names to current conventions rather than creating needless wrappers.

The module exports only a small supported public API from `index.ts`.

## Deliverable 5 — Key service

Implement protocol V1 exactly as defined in `docs/license-api-contract.md`.

### Generation

- use Node cryptographic randomness;
- generate 20 random bytes;
- encode uppercase Crockford Base32;
- format as `TEP1-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`;
- canonicalize consistently;
- derive searchable prefix and last four characters;
- HMAC-SHA-256 with versioned pepper;
- encrypt with AES-256-GCM and fresh nonce;
- store authentication tag and key version metadata.

### Verification

- reject malformed keys before database lookup;
- retrieve candidates by prefix;
- calculate the versioned HMAC;
- compare with a timing-safe primitive;
- never decrypt for normal verification;
- return domain-specific errors that routes map to generic public codes.

### Issuance

Implement:

```text
issueLicenseForEntitlement(entitlementId, actor, reason?)
```

Rules:

- active eligible entitlement required;
- limits snapshot from the offer or approved manual override;
- exactly one V1 license per entitlement;
- idempotent concurrent calls return the existing license without generating multiple records;
- complete key appears only in the privileged service result;
- audit `LICENSE_ISSUED` without secret material.

### Redisplay

Implement only through server-only authorized service code.

- decrypt on demand;
- do not cache complete key;
- audit `LICENSE_KEY_REVEALED`;
- return only to authorized account owner or approved operator;
- if current auth cannot provide production-safe recent-auth checks, keep the UI action non-released and document the limitation.

### Rotation

Implement:

```text
rotateLicenseKey(licenseId, actor, reason)
```

- reason mandatory;
- new random key material;
- increment `keyVersion`;
- old key immediately invalid;
- existing activation records remain but require fresh validation/lease;
- audit `LICENSE_KEY_ROTATED`;
- complete new key returned only once.

## Deliverable 6 — Activation policy

Implement domain services from the API contract.

### Activate

- Zod-validate input;
- canonicalize key and normalize domain;
- validate product, license and entitlement;
- return existing activation idempotently for the same installation ID;
- lock or serialize the license decision;
- count only active activations for the requested environment;
- enforce `productionLimit` or `stagingLimit`;
- persist activation and audit event atomically;
- issue signed lease.

### Validate

- never creates an activation;
- exact license plus installation ID plus environment plus normalized domain must match;
- update last-seen timestamps through a bounded/throttled strategy;
- return current service rights and new signed lease;
- expired, suspended and revoked behavior follows the security model.

### Deactivate

- idempotent;
- retain record and history;
- set `DEACTIVATED` and timestamp;
- free slot only after transaction commits;
- audit event required.

### Status changes

Create privileged services for:

```text
suspendLicense
reactivateLicense
revokeLicense
changeLicenseLimits
```

Rules:

- operator reason mandatory;
- server-side authorization mandatory;
- audit event mandatory;
- revocation is not silently reversed;
- limit changes cannot produce negative values;
- reducing a limit below current active count requires explicit handling and must not arbitrarily delete activations.

## Deliverable 7 — Signed leases

Implement compact JWS-compatible RS256 leases.

Requirements:

- RSA 3072-bit minimum test/production key expectations;
- strict header `alg`, `typ` and `kid`;
- claims from `docs/license-api-contract.md`;
- default TTL and grace from validated environment;
- stable issuer and audience;
- deterministic verification fixtures committed without private production material;
- tests for signature tampering, wrong audience, wrong installation, expiry and grace behavior.

Expose a pure verification helper for tests and cross-repository fixtures, but the platform remains the only signer.

## Deliverable 8 — API routes

Implement:

```text
POST /api/licenses/activate
POST /api/licenses/validate
POST /api/licenses/deactivate
```

Route responsibilities:

1. require protocol header;
2. establish/generate request ID;
3. apply rate limiter;
4. parse bounded JSON body;
5. validate with Zod;
6. call one domain service;
7. map errors to stable codes and HTTP statuses;
8. return protocol header and JSON envelope;
9. emit safe structured logs.

Routes must not contain activation business rules.

Do not expose issuance, reveal, rotation, suspension or revocation through unauthenticated public endpoints.

## Deliverable 9 — Rate limiter

Create an interface and deterministic memory implementation for development/tests.

Keys combine:

- endpoint;
- source address;
- license prefix when format is valid;
- installation ID when valid.

Production requirements:

- memory mode cannot be marked `RELEASED` for multi-instance deployment;
- document the expected shared-backend adapter;
- route response remains generic;
- limiter logs do not contain full keys.

## Deliverable 10 — Customer and admin interfaces

Replace fixture data only for license interfaces actually backed by real services.

### Customer

Connect:

- license list;
- license detail;
- masked key metadata;
- activation list;
- service dates;
- secure reveal action when authorization is adequate;
- deactivation action only when implemented and authorized.

### Admin

Connect:

- license list and detail;
- issue for eligible entitlement;
- reveal metadata, not automatic full-key display;
- rotate;
- suspend/reactivate;
- revoke;
- change limits;
- activation inspection and operator deactivation.

Rules:

- server-side authorization, not hidden navigation;
- confirmation and mandatory reason for high-risk actions;
- no action claims success when persistence fails;
- update interface maturity and data mode honestly;
- if production authentication is not ready, keep privileged UI maturity below `RELEASED` while domain services and tests may be complete.

## Deliverable 11 — Development seed and operator workflow

Provide a safe documented way to create:

- test user;
- product and eligible offer;
- active entitlement;
- test license.

Test keys must be generated at seed runtime, not committed. Output may show the key only in an explicit local development command and must warn against production use.

Do not create a default production admin credential.

## Deliverable 12 — Tests

### Unit tests

- key format and canonicalization;
- at least 160 bits of generated entropy by construction;
- HMAC verification and wrong-key rejection;
- constant-time comparison path;
- encryption round trip;
- ciphertext/tag tamper rejection;
- domain normalization cases;
- license status/date policy;
- lease signing and verification;
- rate limiter decisions.

### Database integration tests

- issuance from active entitlement;
- rejection for inactive entitlement;
- one license per entitlement;
- concurrent issuance idempotency;
- activation idempotency;
- production limit;
- staging limit;
- concurrent activation safety;
- deactivation frees a slot;
- wrong domain/installation validation rejection;
- rotation invalidates old key;
- suspend/reactivate/revoke behavior;
- audit events;
- limit reduction edge case.

### Route tests

- malformed JSON and schema errors;
- protocol header missing/unsupported;
- generic invalid-key response;
- stable error-code mapping;
- rate limiting;
- request ID response;
- no complete key or lease in logs;
- no activation creation during validation.

### UI/query tests

- customer sees only owned licenses;
- admin boundary enforced;
- masked display never leaks full key in HTML by default;
- fixture registry entries updated only for connected interfaces.

## Deliverable 13 — Documentation and operational notes

Update:

- `docs/database-model.md`;
- `docs/architecture.md` if composition changes;
- `docs/interface-inventory.md` with achieved maturity/data mode;
- `.env.example`;
- migration notes;
- API examples if implementation requires a non-breaking clarification;
- PR description with exact commands and evidence.

Do not silently change protocol V1. A breaking change requires an explicit decision and protocol V2 document.

## Required commands

Run the repository-defined equivalents of:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:generate
pnpm db:migrate
```

Run integration/E2E commands defined by the repository. Use a disposable test database.

## Pull request requirements

Open a draft PR containing:

- audit summary;
- schema and migration explanation;
- API route summary;
- cryptographic design summary;
- test evidence;
- concurrency evidence;
- screenshots of connected license interfaces where applicable;
- known deployment blockers, especially shared rate limiting and production auth;
- exact follow-up for Sprint 05B.

## Definition of done

Sprint 05A is complete when:

- all three public license routes implement protocol V1;
- real keys can be issued from active entitlements;
- no complete key is stored in plaintext;
- verification does not require decryption;
- activation concurrency cannot exceed limits in tests;
- production and staging limits are separate;
- signed lease fixtures are available for the WordPress client;
- rotation, suspension and revocation are audited;
- required tests pass;
- lint, typecheck, test and build pass;
- migration and rollback notes exist;
- interface maturity is honest;
- no production secret or generated test key is committed.

Keep the PR in draft when any required command fails or any release blocker from `docs/license-security-model.md` remains.