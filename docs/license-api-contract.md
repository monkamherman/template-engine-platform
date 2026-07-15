# License API Contract — Protocol V1

## Purpose

Define the stable contract between `template-engine-platform` and the WordPress client in `monkamherman/woo-app-theme`.

This contract controls access to official services, updates, downloads and support. It does not remove rights already granted on GPL-covered code delivered to a customer.

The protocol version is `1`.

## Ownership

The platform owns:

- license issuance and rotation;
- license and entitlement status;
- activation limits;
- activation persistence;
- validation decisions;
- signed offline leases;
- audit events;
- rate limiting and abuse controls.

The WordPress client owns:

- installation identity generation and persistence;
- license-key entry and secure local storage;
- API transport through the WordPress HTTP API;
- signed-lease verification;
- scheduled validation;
- admin notices and status display;
- fail-safe storefront behavior.

## Transport requirements

- HTTPS is mandatory outside local automated tests.
- Requests and responses use UTF-8 JSON.
- Send `Content-Type: application/json`.
- Send `Accept: application/json`.
- Send `X-TEP-Protocol: 1`.
- The server returns `X-TEP-Protocol: 1`.
- The server rejects unsupported protocol versions with `426` and `PROTOCOL_UNSUPPORTED`.
- Never place a license key in a URL, query string, log field or analytics event.

## Key format

V1 keys use this display format:

```text
TEP1-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
```

Rules:

- `TEP1` identifies the key format and protocol generation;
- the secret is generated from 20 cryptographically random bytes;
- the secret is encoded with uppercase Crockford Base32;
- ambiguous characters are excluded by the encoder;
- separators are ignored during canonicalization;
- key comparison is case-insensitive after canonicalization;
- the canonical form is `TEP1` followed by 32 Base32 characters;
- the searchable prefix is the format marker plus the first 8 secret characters;
- the UI may show the prefix and last four characters but not the full key by default.

Do not use UUIDs, timestamps, sequential IDs, customer IDs or order IDs as secret material.

## Environments

Persisted remote activations support:

```text
PRODUCTION
STAGING
```

Local development is not a persisted remote activation. The theme may operate without activation when WordPress reports `WP_ENVIRONMENT_TYPE=local`, but official downloads and updates remain unavailable.

A license snapshots separate limits:

```text
productionLimit
stagingLimit
```

The default proposed V1 policy is one production activation and one related staging activation for Starter and Pro. Managed limits remain contract-driven.

## Installation identity

The WordPress client generates a random UUIDv4 named `installationId` once and stores it persistently.

Rules:

- revalidation of the same installation ID is idempotent;
- changing only the site URL does not silently create a new activation;
- a cloned production site must generate a new installation ID before activation;
- reinstalling WordPress may require a customer-initiated deactivation or an operator reset;
- the server never derives installation identity only from domain name.

## Domain normalization

The platform is authoritative for normalization.

Normalization must:

- parse the URL with a standards-compliant URL parser;
- accept only `http` and `https` site URLs;
- lowercase the host;
- convert internationalized host names to ASCII/Punycode;
- remove a trailing dot;
- ignore path, query and fragment;
- preserve meaningful subdomains, including `www`;
- remove the default port for the scheme;
- preserve a non-default port for local tests only;
- reject missing or invalid hosts.

The API returns the normalized domain used for activation decisions.

## Common request metadata

License requests include:

```json
{
  "licenseKey": "TEP1-...",
  "installationId": "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
  "siteUrl": "https://shop.example.com",
  "environment": "PRODUCTION",
  "productSlug": "woo-app-theme",
  "themeVersion": "1.0.0",
  "wordpressVersion": "6.x",
  "woocommerceVersion": "9.x",
  "phpVersion": "8.4.x"
}
```

Only `licenseKey`, `installationId`, `siteUrl`, `environment`, `productSlug` and `themeVersion` are required in V1. Compatibility fields are operational metadata and must not contain secrets.

## Common success envelope

```json
{
  "ok": true,
  "protocolVersion": 1,
  "requestId": "req_...",
  "data": {}
}
```

## Common error envelope

```json
{
  "ok": false,
  "protocolVersion": 1,
  "requestId": "req_...",
  "error": {
    "code": "INVALID_LICENSE",
    "message": "The license could not be validated.",
    "retryable": false
  }
}
```

Public error messages must not reveal whether a prefix, customer, order or entitlement exists.

## Stable error codes

```text
BAD_REQUEST
PROTOCOL_UNSUPPORTED
INVALID_LICENSE
LICENSE_SUSPENDED
LICENSE_REVOKED
LICENSE_EXPIRED
ENTITLEMENT_INACTIVE
PRODUCT_MISMATCH
INSTALLATION_MISMATCH
DOMAIN_MISMATCH
PRODUCTION_LIMIT_REACHED
STAGING_LIMIT_REACHED
ACTIVATION_BLOCKED
RATE_LIMITED
SERVICE_UNAVAILABLE
INTERNAL_ERROR
```

HTTP mapping:

- `400`: malformed input;
- `401`: invalid key or invalid activation credentials;
- `403`: suspended, revoked, inactive entitlement or blocked activation;
- `409`: activation-limit or installation/domain conflict;
- `426`: unsupported protocol;
- `429`: rate limited;
- `503`: temporary service dependency failure;
- `500`: unexpected internal failure.

## Activate endpoint

```text
POST /api/licenses/activate
```

### Behavior

The server:

1. validates and canonicalizes input;
2. retrieves candidate licenses through the searchable prefix;
3. verifies the key using constant-time comparison of a keyed hash;
4. validates license, entitlement and product status;
5. normalizes the domain;
6. returns the existing activation when license plus installation ID already exists;
7. enforces environment-specific limits transactionally;
8. creates the activation and an audit event;
9. issues a signed lease;
10. never logs the complete key or lease.

### Success data

```json
{
  "license": {
    "status": "ACTIVE",
    "keyPrefix": "TEP1-ABCD-EFGH",
    "keyLast4": "WXYZ",
    "expiresAt": null
  },
  "activation": {
    "id": "act_...",
    "installationId": "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
    "environment": "PRODUCTION",
    "normalizedDomain": "shop.example.com",
    "status": "ACTIVE",
    "activatedAt": "2026-07-15T12:00:00.000Z"
  },
  "services": {
    "officialUpdates": true,
    "protectedDownloads": true,
    "support": true,
    "updatesUntil": "2027-07-15T00:00:00.000Z",
    "supportUntil": "2027-01-15T00:00:00.000Z"
  },
  "lease": {
    "token": "<compact-signed-token>",
    "issuedAt": "2026-07-15T12:00:00.000Z",
    "expiresAt": "2026-07-18T12:00:00.000Z",
    "graceUntil": "2026-07-25T12:00:00.000Z",
    "keyId": "license-signing-2026-01"
  }
}
```

## Validate endpoint

```text
POST /api/licenses/validate
```

The request uses the common metadata fields.

The server validates the exact license, installation ID, environment and normalized domain combination. A validation request must not create a new activation.

Successful validation updates `lastValidatedAt` and activation `lastSeenAt` through a throttled write policy so repeated checks do not create unnecessary database load.

The success payload has the same `license`, `activation`, `services` and `lease` shape as activation.

## Deactivate endpoint

```text
POST /api/licenses/deactivate
```

Request:

```json
{
  "licenseKey": "TEP1-...",
  "installationId": "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
  "siteUrl": "https://shop.example.com",
  "environment": "PRODUCTION",
  "productSlug": "woo-app-theme"
}
```

Behavior:

- deactivation is idempotent;
- the activation record is retained;
- status becomes `DEACTIVATED`;
- `deactivatedAt` is recorded;
- the slot becomes available only after the transaction commits;
- an audit event is created;
- a revoked license cannot be used to reactivate through this endpoint.

Success data:

```json
{
  "activation": {
    "installationId": "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
    "status": "DEACTIVATED",
    "deactivatedAt": "2026-07-15T13:00:00.000Z"
  }
}
```

## Signed offline lease

The platform signs a compact JWS-compatible token with `RS256`.

Header:

```json
{
  "alg": "RS256",
  "typ": "TEP-LICENSE-LEASE",
  "kid": "license-signing-2026-01"
}
```

Payload:

```json
{
  "ver": 1,
  "iss": "template-engine-platform",
  "aud": "woo-app-theme",
  "sub": "lic_...",
  "jti": "lease_...",
  "activationId": "act_...",
  "installationId": "6df54c7c-e60a-4e31-8bdc-4ecf3b22bc4b",
  "domain": "shop.example.com",
  "environment": "PRODUCTION",
  "licenseStatus": "ACTIVE",
  "officialUpdates": true,
  "protectedDownloads": true,
  "support": true,
  "updatesUntil": 1818288000,
  "supportUntil": 1807833600,
  "iat": 1784116800,
  "exp": 1784376000,
  "graceUntil": 1784980800
}
```

Rules:

- default lease TTL: 72 hours;
- default grace period: 7 days after `exp`;
- the WordPress client verifies signature, issuer, audience, protocol version, installation ID, domain and environment;
- within grace, the storefront remains unaffected and admin shows a warning;
- after grace, official updates and remote services are disabled until revalidation;
- an expired lease never disables public storefront rendering, cart or checkout;
- private signing keys remain only on the platform;
- the public verification key and `kid` registry may be bundled with the theme.

## License lifecycle

```text
ACTIVE -> SUSPENDED -> ACTIVE
ACTIVE -> EXPIRED
ACTIVE -> REVOKED
SUSPENDED -> REVOKED
EXPIRED -> ACTIVE only after an approved renewal workflow
```

A revoked key remains revoked. Rotation changes the key material and increments `keyVersion`; the previous key becomes invalid immediately while the license business record remains.

## Issuance contract

The domain service is:

```text
issueLicenseForEntitlement(entitlementId, actor, reason?)
```

Rules:

- exactly one current license record per entitlement in V1;
- issuance requires an active entitlement and eligible offer;
- limits are snapshotted from the offer or approved manual policy;
- issuance is idempotent for the same entitlement;
- the complete key is returned only through a privileged result object;
- the complete key is never included in audit summaries;
- automatic issuance from payment is deferred until verified payment webhooks are implemented;
- development seeds may issue clearly marked test licenses.

## Rotation contract

```text
rotateLicenseKey(licenseId, actor, reason)
```

Rules:

- reason is mandatory;
- all active leases and activations remain associated with the license record but require fresh validation;
- old key material is invalid immediately;
- `keyVersion` increments;
- rotation is audited;
- the new complete key is returned only once to the privileged caller.

## Compatibility and change control

A breaking request or response change requires protocol version `2`.

Non-breaking additions may add optional fields. Clients must ignore unknown response fields. The server must not change the meaning of an existing error code within protocol V1.

Both repositories must include contract fixtures and tests using the examples in this document.