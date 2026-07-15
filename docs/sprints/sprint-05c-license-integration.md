# Sprint 05C — Cross-Repository License Integration

## Goal

Validate that the real platform service from Sprint 05A and the WordPress client from Sprint 05B implement the same protocol and behave safely together.

This sprint begins only after both implementation pull requests are merged into their respective integration branches or are available as stable review branches.

## Repositories

```text
monkamherman/template-engine-platform
monkamherman/woo-app-theme
```

## Branches

Platform:

```text
test/sprint-05c-license-integration
```

Theme:

```text
test/sprint-05c-license-integration
```

Create both from the latest stable branches containing 05A and 05B.

## Source of truth

Platform repository:

1. `AGENTS.md`
2. `docs/license-api-contract.md`
3. `docs/license-security-model.md`
4. `docs/sprints/sprint-05a-license-service.md`
5. this sprint

Theme repository:

1. `AGENTS.md`
2. `docs/license-client-contract.md`
3. `docs/sprints/sprint-05b-wordpress-license-client.md`
4. this sprint or its mirrored integration instructions

When implementations disagree, do not patch around the mismatch. Record whether the contract, platform or client is wrong, then change the correct source and update both contract fixtures.

## Included

- shared request/response fixtures;
- shared domain-normalization cases;
- real activation against local/staging platform;
- lease-signature verification in PHP;
- validation and deactivation flows;
- status-change propagation;
- rotation behavior;
- production/staging limit behavior;
- API outage and lease-grace behavior;
- secret/log leakage checks;
- protocol compatibility report;
- repeatable local integration instructions.

## Excluded

- production payment provider;
- automatic update ZIP delivery;
- production object storage;
- customer billing renewal;
- remote storefront disabling;
- load testing at internet scale.

## Deliverable 1 — Contract fixture package

Create identical protocol fixtures in both repositories.

Required fixtures:

```text
activate-request.json
activate-success.json
validate-request.json
validate-success.json
deactivate-request.json
deactivate-success.json
invalid-license.json
limit-reached.json
suspended-license.json
revoked-license.json
lease-valid.txt
lease-expired.txt
lease-tampered.txt
domain-normalization.json
```

Fixtures must contain only test keys and test signing material. Name them clearly as non-production.

The platform generates the signed lease fixtures from a committed test private key located only in test fixtures. The theme commits only the matching test public key unless its tests require generation in a test-only context.

## Deliverable 2 — Local integration environment

Provide a repeatable setup using existing repository tooling.

Expected flow:

1. start disposable PostgreSQL;
2. run platform migrations;
3. start the Next.js platform with explicit test license secrets;
4. seed user, product, offer, entitlement and license;
5. start WordPress/Bedrock environment;
6. configure the theme license endpoint to the local platform;
7. activate through the WordPress admin or test harness;
8. inspect both databases/logs for expected state.

Do not commit real `.env` files. Provide `.env.test.example` or documented variables with placeholders.

## Deliverable 3 — End-to-end scenarios

### Scenario A — First production activation

- issue test license;
- enter key in WordPress;
- activate production installation;
- verify one platform activation exists;
- verify client stores masked key metadata and signed lease;
- verify admin UI shows active state;
- verify public storefront remains unchanged.

### Scenario B — Idempotent reactivation

- repeat activation with same installation ID;
- no second active slot consumed;
- same activation identity returned or safely refreshed;
- audit behavior matches contract.

### Scenario C — Production limit

- activate first production installation;
- attempt second distinct production installation;
- receive `PRODUCTION_LIMIT_REACHED`;
- original site remains valid;
- no partial second activation persists.

### Scenario D — Independent staging limit

- activate staging alongside production;
- confirm separate limit accounting;
- second staging site is rejected when limit is one.

### Scenario E — Validation and lease renewal

- validate active installation;
- timestamps update according to throttling policy;
- new lease verifies in PHP;
- claims match installation, domain and environment.

### Scenario F — Domain mismatch

- reuse installation ID on a different normalized domain;
- validation fails with stable generic behavior;
- no new activation is created silently.

### Scenario G — Deactivation and migration

- deactivate old installation;
- verify historical record remains;
- verify slot becomes available;
- activate new installation successfully.

### Scenario H — Key rotation

- rotate key through privileged platform service;
- old key fails validation;
- new key activates/validates;
- client presents re-entry requirement without breaking storefront;
- audit events exist.

### Scenario I — Suspension and revocation

- suspend active license;
- validation reports suspended service state;
- storefront still renders;
- reactivate only through approved operator action;
- revoke and confirm client cannot restore service locally.

### Scenario J — API outage

- validate and store a good lease;
- stop platform;
- before lease expiry: official state remains available;
- during grace: warning displayed, storefront unaffected;
- after grace: official updates/support unavailable, storefront unaffected;
- client retries with bounded backoff.

### Scenario K — Tampered lease

- alter payload or signature;
- PHP verification fails;
- client attempts online validation when possible;
- no invalid claims are trusted.

### Scenario L — Secret leakage

Search platform logs, WordPress debug logs, rendered HTML, network URLs and test reports.

The complete license key, ciphertext, HMAC, signing private key and lease token must not appear except in explicitly controlled test fixture files and masked test output.

## Deliverable 4 — Automated contract tests

Platform tests must load fixture requests and assert fixture-compatible responses.

Theme tests must load the same logical fixtures and assert:

- request serialization;
- response parsing;
- stable error mapping;
- lease verification;
- domain normalization;
- admin-state mapping;
- fail-safe storefront policy.

Add a fixture-version marker:

```text
protocolVersion: 1
fixtureRevision: 1
```

A contract change requires updating both repositories in one coordinated work item.

## Deliverable 5 — Compatibility matrix

Create `docs/license-integration-report.md` with a table covering:

```text
Platform commit
Theme commit
Protocol version
PHP versions tested
WordPress versions tested
WooCommerce versions tested
Node version
Database version
Activation scenarios
Offline/grace scenarios
Known limitations
Release blockers
```

Do not claim compatibility for untested versions.

## Deliverable 6 — Security verification

Verify:

- HTTPS enforcement outside local test mode;
- protocol header enforcement;
- invalid-key response does not enumerate license existence;
- rate limits trigger predictably;
- installation/domain mismatch cannot steal a slot;
- concurrent activation test remains safe;
- lease signature rejects unknown `kid`, wrong audience and `alg=none`;
- WordPress uses `sslverify=true`;
- no public storefront request invokes license API synchronously;
- no customer order or catalog data is sent to license API.

## Deliverable 7 — Operational runbook

Document:

- how to issue a test license;
- how to reset a test activation;
- how to rotate the test signing key;
- how to diagnose a client/server protocol mismatch;
- how to confirm domain normalization;
- how to inspect safe audit events;
- how to simulate outage, expiry and grace;
- how to clean the disposable environment.

## Required commands

Platform:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Theme:

```bash
composer install
composer test
composer lint
npm ci
npm run build
```

Use the actual repository scripts when names differ and document them.

Run the integration harness command introduced by this sprint.

## Pull requests

Open coordinated draft PRs in both repositories. Each PR must link to the other and record exact head commits tested together.

Do not merge one integration PR while the other still depends on an uncommitted contract change.

## Definition of done

Sprint 05C is complete when:

- shared protocol fixtures pass in TypeScript and PHP;
- all scenarios A through L are executed or explicitly blocked with evidence;
- production/staging limits behave independently;
- WordPress verifies a platform-generated lease;
- storefront remains functional through outage, suspension, expiry and revocation;
- no secret leakage is found;
- integration report and runbook exist;
- both repositories record the tested commit pair;
- no unresolved protocol mismatch remains;
- all required checks pass.

Keep both PRs in draft while a contract fixture differs, a security scenario fails or storefront availability depends on the license platform.