# License Security Model — V1

## Security objective

Protect official-service access without making the public WooCommerce storefront depend on continuous availability of the licensing platform.

The system protects:

- official releases and downloads;
- update access;
- support eligibility;
- activation limits;
- administrative license operations;
- customer license secrets.

It does not attempt to make GPL-covered PHP code impossible to inspect, modify or redistribute.

## Trust boundaries

```text
Customer browser
      |
      v
WordPress admin + theme client
      |
      | HTTPS JSON
      v
Next.js license routes
      |
      v
Licensing domain services
      |
      +------> PostgreSQL
      +------> signing key provider
      +------> rate limiter
      +------> audit log
```

The browser is never trusted to decide license state. WordPress may display locally cached state, but the platform is authoritative for issuance, activation and current service rights.

## Secret classes

### Customer license key

- generated from at least 160 bits of cryptographic randomness;
- canonicalized before hashing;
- never logged;
- never sent in query strings;
- masked in UI by default;
- transmitted only over HTTPS;
- stored in the platform as an HMAC lookup value plus authenticated ciphertext when redisplay is required;
- stored in WordPress using an encrypted option when supported, with a documented re-entry path if local encryption material changes.

### License hash pepper

- server-only;
- separate from the database;
- used with HMAC-SHA-256 over the canonical key;
- versioned for future rotation;
- never reused as an encryption key or signing key.

### Encryption key

- server-only;
- 256-bit key for AES-256-GCM or an approved KMS envelope key;
- versioned;
- ciphertext stores nonce, authentication tag and key version;
- rotation must support decrypt-old/encrypt-new migration;
- never committed to Git.

### Lease signing private key

- RSA 3072-bit minimum for V1 RS256 leases;
- server-only;
- versioned with `kid`;
- public key may be distributed with the WordPress theme;
- old public keys remain available long enough to validate unexpired leases during rotation.

## Required environment variables

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

`.env.example` contains placeholders only. Startup validation must reject malformed production secrets.

Suggested defaults for non-production documentation only:

```text
LICENSE_LEASE_TTL_SECONDS=259200
LICENSE_GRACE_PERIOD_SECONDS=604800
```

Do not provide development fallback secrets in production builds.

## Platform storage model

V1 requires these license fields in addition to current identifiers and status:

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
productionLimit
stagingLimit
issuedAt
expiresAt
lastValidatedAt
revokedAt
```

Activation fields:

```text
licenseId
installationId
environment
normalizedDomain
siteUrl
status
activatedAt
lastSeenAt
deactivatedAt
environmentMetadata
```

Required constraints:

- one V1 license per entitlement;
- unique license plus installation ID;
- indexes for prefix lookup, license status and active activations;
- environment enum restricted to `PRODUCTION` and `STAGING`;
- non-negative limits;
- no destructive migration without a migration and rollback note.

## Key generation

Use Node's cryptographic random source. Do not use `Math.random`, UUID text, timestamps or database IDs as key material.

Algorithm:

1. generate 20 random bytes;
2. encode with Crockford Base32;
3. format the display key;
4. canonicalize;
5. derive searchable prefix and last four characters;
6. calculate HMAC-SHA-256 with the active pepper;
7. encrypt the canonical key with AES-256-GCM using a fresh random nonce;
8. persist all values in one transaction;
9. return the complete key only in the privileged issuance result.

The complete key must not survive in structured logs, error details, telemetry or audit summaries.

## Key verification

1. validate format and length before database work;
2. canonicalize;
3. select candidate rows by prefix;
4. calculate the keyed hash using the row hash version;
5. use constant-time comparison;
6. continue with entitlement and activation rules only after key verification;
7. use generic public errors to reduce enumeration.

Do not decrypt stored keys for normal verification.

## Key redisplay

Redisplay is a privileged account or admin action and is not required for API validation.

Rules:

- require a server-side authenticated and authorized actor;
- require recent authentication when the production auth provider supports it;
- decrypt only in server-only code;
- never render the key into page source before the reveal action;
- do not cache the complete key;
- audit the reveal event without the key value;
- allow rotation if decryption fails after local key-management changes.

If secure redisplay cannot be guaranteed, replace reveal with one-time issuance plus rotation. Do not silently store plaintext.

## Activation-limit concurrency

Activation decisions must execute in a transaction with a database-level concurrency defense.

Required behavior:

- existing license plus installation ID returns idempotently;
- count only active activations in the requested environment;
- lock the license row or use an equivalent serializable strategy;
- recheck counts inside the transaction;
- create activation and audit event atomically;
- map unique or serialization conflicts to a stable API response;
- concurrent requests must never exceed the configured limit.

## Rate limiting

Apply limits by a combination of:

- source IP or trusted proxy-derived client address;
- license prefix;
- installation ID;
- endpoint.

Requirements:

- adapter interface with deterministic tests;
- in-memory implementation allowed only in development and unit tests;
- production configuration must use a shared durable backend or explicitly remain non-released;
- return `429` with generic `RATE_LIMITED`;
- do not expose whether a key exists;
- do not log complete request bodies.

## Signed lease security

The lease is a cache of a recent server decision, not a permanent license.

Verification requires:

- supported `alg` and `typ` only;
- known `kid`;
- valid RSA SHA-256 signature;
- expected issuer and audience;
- protocol version `1`;
- valid `iat`, `exp` and `graceUntil` ordering;
- matching installation ID;
- matching normalized domain;
- matching environment;
- no acceptance of unsigned or `alg=none` tokens.

The theme must ignore a lease whose signature or claims fail. It may then attempt online validation. Failure must not break public storefront rendering.

## Status behavior

### ACTIVE

- activation and validation allowed within limits;
- services follow entitlement dates;
- signed lease may be issued.

### SUSPENDED

- no new activations;
- validation returns suspended state;
- official updates and protected downloads disabled;
- storefront remains functional;
- operator reason and audit event required.

### EXPIRED

- no new activations unless renewed;
- existing storefront remains functional;
- official service rights follow approved renewal policy;
- do not claim GPL code rights were removed.

### REVOKED

- no activation or validation success;
- no new lease;
- reason and audit event required;
- storefront remains functional;
- reactivation requires a new approved license or explicit policy, not status mutation by the client.

## WordPress fail-safe policy

The licensing client may gate only official services.

It must never:

- disable the active theme;
- block public page rendering;
- block cart or checkout;
- inject customer-facing failure banners;
- delete customer content;
- remotely execute code;
- send customer order data to the licensing API.

When the platform is unavailable:

- a valid unexpired lease remains active;
- during grace, official services may remain temporarily available according to policy and admin shows a warning;
- after grace, official updates/download services become unavailable;
- public storefront functionality continues.

## Logging and audit

Structured logs may contain:

- request ID;
- endpoint;
- result code;
- license record ID after successful internal lookup;
- activation ID;
- duration;
- normalized operational failure category.

Structured logs must not contain:

- complete or partial secret beyond the approved prefix/last-four display;
- request body;
- ciphertext;
- HMAC value;
- private key material;
- signed lease token;
- WordPress salts;
- customer passwords or payment payloads.

Audit events are required for:

```text
LICENSE_ISSUED
LICENSE_KEY_REVEALED
LICENSE_KEY_ROTATED
LICENSE_SUSPENDED
LICENSE_REACTIVATED
LICENSE_REVOKED
LICENSE_LIMIT_CHANGED
ACTIVATION_CREATED
ACTIVATION_DEACTIVATED
ACTIVATION_BLOCKED
```

High-risk events require actor, target, timestamp, reason and safe summary.

## Abuse and privacy boundaries

Collect only operational metadata required for compatibility and support. Do not send WooCommerce orders, customer lists, product catalogs or visitor data through license validation.

Environment metadata must be bounded and sanitized. Do not store arbitrary client-controlled JSON without size and key restrictions.

## Testing requirements

### Unit

- key entropy and format;
- canonicalization;
- HMAC verification;
- ciphertext round-trip and tamper rejection;
- domain normalization;
- lease signing and verification fixtures;
- status and date policy;
- rate-limit decisions.

### Integration

- issuance transaction;
- unique license per entitlement;
- concurrent activation limits;
- idempotent activation;
- environment-specific limits;
- deactivation slot release;
- rotation invalidating old key;
- suspend/revoke behavior;
- audit persistence.

### Route

- malformed input;
- generic invalid-key response;
- unsupported protocol;
- rate limiting;
- no secret in response errors;
- stable error-code mapping;
- request ID propagation.

### Cross-repository

- WordPress client verifies platform-generated lease;
- contract fixtures parse identically in TypeScript and PHP;
- same domain normalization examples pass in both repositories;
- storefront remains functional during API outage.

## Release blockers

The license service may not be marked `RELEASED` while any of these remain:

- plaintext key storage;
- missing production rate limiter;
- untested activation concurrency;
- private key in source control;
- logs containing license secrets;
- unsigned or weakly verified leases;
- storefront behavior coupled to platform availability;
- missing audit events for privileged mutations;
- unresolved migration or rollback risk.