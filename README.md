<<<<<<< HEAD
# Template Engine Platform

Official commercial platform for the Woo App Commercial Template Engine.

This repository contains the Next.js application used to present, sell, license, deliver and support the commercial WordPress/WooCommerce template engine maintained separately in `monkamherman/woo-app-theme`.

## Current status

The repository starts from a generic Next.js full-stack template. Sprint 01 will remove demo code, normalize the toolchain and establish the commercial platform foundation before feature development.

## V1 responsibilities

- public marketing website;
- Starter, Pro and Managed offers;
- customer authentication and account area;
- payment-provider abstraction and verified webhooks;
- orders and entitlements;
- licenses and activations;
- protected release downloads;
- service onboarding and support foundations;
- administrative operations.

## Product separation

- `template-engine-platform`: sales, checkout, customer portal, licensing, releases and support.
- `woo-app-theme`: private WordPress/WooCommerce product source and release packaging.

The theme source and private ZIP archives must never be committed to this repository.

## Documentation

- [`AGENTS.md`](./AGENTS.md): permanent instructions for Codex and contributors.
- [`docs/product-scope.md`](./docs/product-scope.md): product boundaries and V1 outcomes.
- [`docs/architecture.md`](./docs/architecture.md): target technical architecture.
- [`docs/database-model.md`](./docs/database-model.md): initial domain and data model.
- [`docs/sprints/sprint-01-foundation.md`](./docs/sprints/sprint-01-foundation.md): first executable sprint.
- [`docs/codex-execution-prompt.md`](./docs/codex-execution-prompt.md): ready-to-use Codex mission.

## Planned development commands

Sprint 01 must normalize and document the actual commands. The intended interface is:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Security

Never commit `.env`, provider secrets, database credentials, private release archives, license signing secrets or customer data. Use `.env.example` only for documented variable names and safe placeholders.
=======
>>>>>>> 7a3cbb4 (docs: remove GETTING_STARTED.md and README.md)
