# LOCAL-01 - Platform/theme local license connection

Issue: <https://github.com/monkamherman/template-engine-platform/issues/59>

Date: 2026-07-28

## Scope

This report records the local platform-side license connection test for `template-engine-platform` against a local WordPress/WooCommerce server for `woo-app-theme`.

The test uses only development data. No production payment provider, production object storage, real customer data, real secrets, complete license keys or lease tokens are included in this report.

## Revisions

| Repository | Branch | Commit |
|---|---|---|
| `monkamherman/template-engine-platform` | `test/local-01-platform-theme-license-connection` | `8f12bcaf693ee6560cea9f93d279c988549fd578` |
| `monkamherman/woo-app-theme` | `docs/sprint-05-license-client` | `9a3592e0d2d17b57745a67adda1f205bef8ff0ac` |

## Local URLs

| Service | URL | Result |
|---|---|---|
| Platform Next.js | `http://127.0.0.1:3000` | Available during endpoint tests |
| Platform health | `http://127.0.0.1:3000/api/health` | `200`, body `{"status":"ok"}` before outage test |
| WordPress/WooCommerce | `http://127.0.0.1:8000` | `200` during outage test |

## Local variables

Required platform variable names:

```text
DATABASE_URL
SEED_DEV_LICENSE
APP_URL
AUTH_SECRET
AUTH_TRUST_HOST
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
AUTH_MAGIC_LINK_SECRET
AUTH_EMAIL_VERIFICATION_TTL_MINUTES
AUTH_PASSWORD_RESET_TTL_MINUTES
AUTH_SESSION_MAX_AGE_SECONDS
EMAIL_PROVIDER
EMAIL_FROM
EMAIL_REPLY_TO
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_SECURE
LICENSE_HASH_PEPPER_V1
LICENSE_ENCRYPTION_KEY_V1
LICENSE_SIGNING_KEY_ID
LICENSE_LEASE_TTL_SECONDS
LICENSE_GRACE_PERIOD_SECONDS
LICENSE_RATE_LIMIT_MODE
LICENSE_SIGNING_PRIVATE_KEY_PEM
LICENSE_SIGNING_PUBLIC_KEY_PEM
```

The values were loaded from local environment files and are intentionally omitted.

## Commands

Platform setup and test commands:

```bash
pnpm db:migrate:deploy
pnpm dev
curl http://127.0.0.1:3000/api/health
SEED_DEV_LICENSE=true pnpm db:seed
curl -X POST http://127.0.0.1:3000/api/licenses/activate
curl -X POST http://127.0.0.1:3000/api/licenses/validate
curl -X POST http://127.0.0.1:3000/api/licenses/deactivate
curl http://127.0.0.1:8000
```

All license API requests included:

```text
Content-Type: application/json
Accept: application/json
X-TEP-Protocol: 1
```

The tested request metadata used:

```json
{
  "installationId": "22222222-3333-4444-8555-666666666666",
  "siteUrl": "http://127.0.0.1:8000",
  "environment": "PRODUCTION",
  "productSlug": "woo-app-theme",
  "themeVersion": "1.0.0-local"
}
```

The `licenseKey` field was populated with a generated development key and is intentionally omitted.

## Platform endpoint evidence

| Check | HTTP | Safe response summary | Result |
|---|---:|---|---|
| Health | `200` | `{"status":"ok"}` | PASS |
| Activation | `200` | `ok=true`, `normalizedDomain=127.0.0.1:8000`, `activationStatus=ACTIVE`, `hasLease=true`, `protocolVersion=1` | PASS |
| Idempotent reactivation | `200` | `ok=true`, same normalized domain, `activationStatus=ACTIVE`, `hasLease=true`, `protocolVersion=1` | PASS |
| Validation | `200` | `ok=true`, same normalized domain, `activationStatus=ACTIVE`, `hasLease=true`, `protocolVersion=1` | PASS |
| Domain mismatch | `409` | `ok=false`, `code=DOMAIN_MISMATCH`, `hasLease=false`, `protocolVersion=1` | PASS |
| Deactivation | `200` | `ok=true`, `activationStatus=DEACTIVATED`, `hasLease=false`, `protocolVersion=1` | PASS |
| Invalid license | `401` | `ok=false`, `code=INVALID_LICENSE`, `hasLease=false`, `protocolVersion=1` | PASS |

## Scenario results

| Scenario | Status | Evidence |
|---|---|---|
| A - Activation valide | PASS | Platform issued a development license, `/api/licenses/activate` returned `200`, an active activation and a lease. |
| B - Activation idempotente | PASS | Repeating activation with the same installation ID returned `200` and did not reject the existing activation. |
| C - Licence invalide | PASS | Invalid test key returned `401 INVALID_LICENSE` with a generic public message. |
| D - Limites production/staging | PARTIAL | Production activation path was exercised. Separate staging limit was not exercised in this local pass. |
| E - API plateforme indisponible | PASS | After stopping Next.js, `/api/health` no longer responded and WordPress public root still returned `200`. |
| F - Désactivation | PASS | `/api/licenses/deactivate` returned `200` and `activationStatus=DEACTIVATED`. |
| G - Bail falsifié ou expiré | BLOCKED | Platform issued a lease, but PHP theme-side tampered/expired lease verification was not executed from this platform shell. |

## WordPress-side status

The WordPress local server was reachable at `http://127.0.0.1:8000` and returned `200`.

The following checks remain blocked until the theme admin/test harness is driven directly:

- entering the generated key in the WordPress admin;
- verifying the admin status copy;
- verifying PHP-side lease signature validation;
- verifying local storage of masked key metadata;
- verifying scheduled validation/renewal from the theme;
- verifying tampered and expired leases in the theme client.

The outage check did confirm the minimum storefront safety condition available from this shell: when the platform server was stopped, the WordPress public root still returned `200`.

## Logs and leakage check

Observed platform logs included route status lines such as:

```text
POST /api/licenses/activate 200
POST /api/licenses/validate 200
POST /api/licenses/validate 409
POST /api/licenses/deactivate 200
POST /api/licenses/activate 401
```

Observed Prisma debug output printed SQL query text and column names, including sensitive-field column names such as `secretHash`, `secretCiphertext`, `secretNonce` and `secretAuthTag`. The output did not print bound values, the complete development license key, ciphertext values, HMAC values, private signing key or lease token.

Before staging, Prisma query logging should be disabled or reduced in environments where operational logs may be retained or shared.

## Problems found

1. The sandboxed shell could not reach the configured PostgreSQL host. Running `pnpm db:migrate:deploy` with network permission succeeded.
2. Prisma reports the `package.json#prisma` configuration deprecation. This is not blocking on Prisma 6, but it should be migrated to `prisma.config.ts` before Prisma 7.
3. Full theme-admin execution is not yet covered by this platform-only report.
4. The local seed command prints the complete development license key to stderr by design. This is useful for manual local setup, but reports and logs must continue to omit or redact it.

## Actions before server/staging test

- Run the matching theme test harness against `http://127.0.0.1:3000`.
- Capture WordPress admin activation, validation, deactivation and error states without exposing complete keys.
- Execute PHP lease verification tests for valid, expired and tampered leases.
- Exercise independent `PRODUCTION` and `STAGING` activation limits end to end.
- Disable noisy Prisma query logging for shared QA/staging logs.
- Keep the PR as draft until the theme-side blocked checks are completed.

## Conclusion

Not ready for staging as a complete platform/theme integration.

The platform local license endpoints are ready for theme-side local testing: activation, idempotent reactivation, validation, domain mismatch, deactivation and invalid-license behavior all returned the expected protocol responses. The storefront independence baseline passed for the WordPress public root while the platform was unavailable.

The remaining blocker is theme-side execution through the WordPress admin or test harness, especially lease verification and admin state handling.
