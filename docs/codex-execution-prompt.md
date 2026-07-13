# Codex Execution Prompt — Sprint 01

Use the following mission in Codex after this documentation branch is merged into `main`.

---

Work in `monkamherman/template-engine-platform`.

Your mission is to execute **Sprint 01 — Foundation and Starter Cleanup**.

Before changing code, read in this order:

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/architecture.md`
4. `docs/database-model.md`
5. `docs/sprints/sprint-01-foundation.md`

The repository is based on a generic SnowDev Next.js starter. Do not assume its “production-ready” claims are verified. Audit the real code and dependencies first.

## Required workflow

1. Create a dedicated branch named similar to `feat/sprint-01-foundation`.
2. Inspect the repository tree, package manager artifacts, scripts, configuration, demo routes, Prisma schema and Docker files.
3. Write a short audit summary in the pull request or a temporary task note before broad edits.
4. Execute the sprint in small, coherent commits.
5. Preserve useful working foundations, but remove generic demo models, branding, links and packages that do not serve the approved scope.
6. Keep Prisma/PostgreSQL unless you find a blocking technical incompatibility. Do not switch ORM for preference.
7. Do not implement real payment, authentication, email or storage providers in Sprint 01.
8. Do not add secrets or private theme files.
9. Run all required checks before completion.
10. Open a **draft pull request** against `main`.

## Decision rules

- Prefer the simplest secure implementation that satisfies the sprint.
- Use server components by default.
- Keep business rules in `modules/`, not page components.
- Validate external inputs with Zod.
- Use integer minor units for money.
- Use unique provider event IDs for idempotency.
- Do not store complete license keys in plaintext.
- Deny account/admin access by default until real authentication is implemented.
- Do not invent customer logos, testimonials, conversion rates or production claims.
- Avoid an unreviewed major-version upgrade. If an upgrade is necessary, isolate it and provide test/build evidence.

## Required final checks

Run and report the exact output status of:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:generate
```

Also validate the initial Prisma migration on a fresh PostgreSQL database. A Docker PostgreSQL service is acceptable.

## Required draft PR description

Include:

- summary;
- starter audit findings;
- architecture implemented;
- demo code and dependencies removed;
- database schema and migration summary;
- routes added;
- tests and commands executed;
- screenshots of the French foundation page if browser tooling is available;
- security decisions;
- unresolved risks and deferred decisions;
- recommended Sprint 02.

Do not mark the PR ready for review if lint, typecheck, tests or build fail. Clearly document any external environment blocker instead of hiding it.

---
