# Codex Execution Prompt — Sprint 01

Work in `monkamherman/template-engine-platform` and execute **Sprint 01 — Foundation and Starter Cleanup**.

Before changing code, read:

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/architecture.md`
4. `docs/database-model.md`
5. `docs/sprints/sprint-01-foundation.md`

The repository uses a generic SnowDev starter. Audit the real code and dependencies; do not trust starter “production-ready” claims.

## Required workflow

1. Create `feat/sprint-01-foundation`.
2. Inspect the tree, package-manager artifacts, scripts, configs, demo routes, Prisma schema and Docker files.
3. Record a short audit before broad edits.
4. Execute the sprint in small coherent Conventional Commits.
5. Preserve useful working foundations; remove generic demo models, branding, links and unused packages.
6. Keep Prisma/PostgreSQL unless a blocking incompatibility is demonstrated. Do not switch ORM for preference.
7. Do not implement real payment, authentication, email or storage providers.
8. Never add secrets, customer data, theme source or release ZIP files.
9. Run all required checks.
10. Open a draft pull request against `main`.

## Decision rules

- Prefer the simplest secure implementation satisfying the sprint.
- Use server components by default.
- Keep business rules in `modules/`.
- Validate external input with Zod.
- Use integer minor units for money.
- Use unique provider event IDs for idempotency.
- Do not store complete license keys in plaintext.
- Deny account/admin access until real authentication exists.
- Do not invent logos, testimonials, performance metrics or production claims.
- Avoid unreviewed major upgrades; isolate necessary upgrades and provide test/build evidence.

## Required checks

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:generate
```

Also validate the initial Prisma migration on a fresh PostgreSQL database; Docker PostgreSQL is acceptable.

## Draft PR description

Include summary, starter audit, architecture, removed code/dependencies, schema/migration, routes, tests/commands, screenshots when browser tooling is available, security decisions, unresolved risks and recommended Sprint 02.

Do not mark the PR ready if lint, typecheck, tests or build fail. Document external blockers transparently.
