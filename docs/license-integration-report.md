# License Integration Report

## Status

Sprint 05C is open for cross-repository validation.

This report records tested compatibility between `template-engine-platform` and `woo-app-theme`. Do not mark a scenario as passed until it has been executed against the exact commits listed below.

## Compatibility Matrix

| Field | Value |
| --- | --- |
| Platform commit | `3bc76e3` |
| Theme commit | Pending |
| Protocol version | `1` |
| Fixture revision | `1` |
| PHP versions tested | Pending |
| WordPress versions tested | Pending |
| WooCommerce versions tested | Pending |
| Node version | `v20.19.4` |
| Database version | Pending |
| Activation scenarios | Pending |
| Offline/grace scenarios | Pending |
| Known limitations | Integration branch opened; cross-repository execution not started. |
| Release blockers | Theme commit, disposable database run, WordPress run and security leakage checks pending. |

## Scenario Checklist

| Scenario | Status | Evidence |
| --- | --- | --- |
| A - First production activation | Pending |  |
| B - Idempotent reactivation | Pending |  |
| C - Production limit | Pending |  |
| D - Independent staging limit | Pending |  |
| E - Validation and lease renewal | Pending |  |
| F - Domain mismatch | Pending |  |
| G - Deactivation and migration | Pending |  |
| H - Key rotation | Pending |  |
| I - Suspension and revocation | Pending |  |
| J - API outage | Pending |  |
| K - Tampered lease | Pending |  |
| L - Secret leakage | Pending |  |

## Local Integration Setup

1. Start disposable PostgreSQL for the platform.
2. Run platform migrations.
3. Start the Next.js platform with explicit test license secrets.
4. Seed user, product, offer, entitlement and development license.
5. Start the WordPress environment with the Sprint 05B theme branch.
6. Configure the theme license endpoint to the local platform.
7. Activate through the WordPress admin or test harness.
8. Record platform database state, WordPress state and sanitized logs in this report.

## Security Checks

- Complete license keys must not appear in URLs, logs, rendered HTML, analytics, audit summaries or client-visible errors.
- License ciphertext, HMAC, nonce, auth tag and signing private key must not appear outside controlled test fixture files.
- Lease tokens must not appear in public rendered HTML or URL query strings.
- Invalid-key responses must not reveal whether a key prefix, customer or license exists.
- Storefront rendering must remain available during license API outage and after license denial.
