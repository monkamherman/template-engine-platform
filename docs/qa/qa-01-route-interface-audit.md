# QA-01 Route and Interface Audit

Date: 2026-07-26  
Branch: `chore/qa-01-route-interface-audit`  
Scope: post-merge audit of routed UI sprints 06A, 06B, 06C, Demos, Docs Home, 07A, 08A, 08B, 09A, 10A, 11A and 11B.

## Executive Summary

The current application builds successfully and the main FR/EN interface families render in local standalone production mode. The platform is suitable for continued private-beta preparation as an honest fixture/preview product shell, but it is not commercially complete.

Primary readiness:

- Marketing home, pricing, features, demos index, docs home, docs detail, checkout preview, auth, customer account and most admin operations render in both French and English.
- Auth is correctly marked `CONNECTED` / `adapter`, but remains below `VALIDATED` until real Google and SMTP credentials are configured and tested in the target environment.
- Checkout remains `BRANDED` / `preview`; it does not create payment sessions or invent provider success.
- Account/admin customer and operations screens remain fixture/query/preview where appropriate and avoid complete license keys, signed URLs and provider payloads.
- Documentation detail pages are `BRANDED` / `content`, but release compatibility remains explicitly non-final.

Primary blockers before private beta:

- **Blocker:** unknown localized routes such as `/fr/about`, `/en/about`, `/fr/x-nope` and `/en/x-nope` return HTTP `200` soft-404 pages. This can confuse crawlers, users and QA automation. About is also listed in the QA route minimum but is not registered as a real interface.
- **High:** `/{locale}/dev/interfaces` returns HTTP `200` with not-found content in standalone production smoke testing. The registry viewer itself is not visible, but the status code is still wrong for a production-only hidden route.
- **High:** FAQ and Contact render, but only as generic generated wireframes. They should be completed in Sprint 06E-bis before beta if they remain public navigation items.
- **Medium:** `app/layout.tsx` still uses `https://example.com/` for `metadataBase` and Open Graph URL. This should move to the production domain or environment-backed metadata before SEO/public sharing.
- **Medium:** several marketing offer/use-case/demo-detail/legal/admin documentation/service interfaces remain `WIREFRAME`, which is accurate but not beta-ready if they are in primary navigation or customer workflows.

No real provider integration, payment processing, checkout persistence, signed downloads or live release compatibility was added or assumed during this audit.

## Recent Sprint Evidence Reviewed

| PR | Sprint / area | Result used for QA |
|---|---|---|
| #21 | Sprint 06A marketing home | `marketing.home` branded content page; no real connected commerce. |
| #23 / #26 | Sprint 06B pricing | Pricing branded; final prices intentionally not connected to catalog/checkout truth. |
| #27 | Sprint 06C features | Features branded; integration/SLA/performance claims softened. |
| #30 | Demos index | Demos index branded with illustrative scenarios; demo detail remains wireframe. |
| #39 | Docs home | Docs index branded; search remains preview. |
| #40 | Sprint 07A auth UI | Auth pages branded; later auth integration connects adapter. |
| #41 | Sprint 08A account core | Account dashboard/orders/entitlements/downloads/releases branded fixture/query. |
| #42 | Sprint 08B account support/settings | Account licenses/onboarding/support/settings branded fixture/preview. |
| #47 | Sprint 09A checkout | Checkout, success and failed pages branded preview, no provider invented. |
| #48 | Sprint 10A docs detail | Documentation details/release pages branded content with cautious release states. |
| #43 | Sprint 11A admin commerce | Admin commerce routes branded fixture/preview; provider references masked. |
| #45 | Sprint 11B admin operations | Admin operations routes branded fixture/preview/query; sensitive data masked. |
| #46 / #49 | Render deploy fixes | Render service config and standalone host binding fixed in repo. |

## Route Smoke Test

Environment:

- `pnpm build`
- `NODE_ENV=production PORT=3016 pnpm start`
- HTTP smoke tests executed against `http://127.0.0.1:3016`

### Public Marketing

| Route | FR status | EN status | Real maturity | Real dataMode | Shell | Problems found | Recommended action | Priority |
|---|---:|---:|---|---|---|---|---|---|
| `/{locale}` | 200 | 200 | `BRANDED` | `content` | MarketingShell | None blocking. | Continue to real commerce integration later. | low |
| `/{locale}/product` | 200 in build | 200 in build | `BRANDED` | `content` | MarketingShell | Starter-level branded page, not deeply audited visually in this sprint. | Keep as is; revisit in public-site polish pass. | low |
| `/{locale}/pricing` | 200 | 200 | `BRANDED` | `content` | MarketingShell | Final catalog/checkout prices not connected by design. | Keep status; connect catalog price source in commerce sprint. | medium |
| `/{locale}/features` | 200 | 200 | `BRANDED` | `content` | MarketingShell | None blocking. | Keep as is. | low |
| `/{locale}/demos` | 200 | 200 | `BRANDED` | `fixture` | MarketingShell | Scenarios are illustrative, not live stores; status is accurate. | Keep copy explicit. | low |
| `/{locale}/demos/dropshipping-modele` | 200 in build | 200 in build | `WIREFRAME` | `fixture` | MarketingShell | Detail page remains generic generated structure. | Complete demo-detail sprint before presenting as polished demo detail. | medium |
| `/{locale}/use-cases` and model details | 200 in build | 200 in build | `WIREFRAME` | `content` | MarketingShell | Generic generated interfaces. | Complete use-case sprint before beta marketing push. | medium |
| `/{locale}/offers/starter`, `/pro`, `/managed` | 200 in build | 200 in build | `WIREFRAME` | `query` | MarketingShell | Offer details are generic plus legal links, not final offer pages. | Complete offer-detail sprint before production checkout. | high |
| `/{locale}/faq` | 200 | 200 | `WIREFRAME` | `content` | MarketingShell | Public nav link renders generic generated page. | Sprint 06E-bis FAQ page. | high |
| `/{locale}/contact` | 200 | 200 | `WIREFRAME` | `preview` | MarketingShell | Public nav link renders generic generated page. | Sprint 06E-bis contact page with disabled/non-persistent form until provider exists. | high |
| `/{locale}/about` | 200 | 200 | not registered | unknown | Auth not-found shell / soft 404 | Route is not in registry but returns HTTP 200 soft-404 content. | Add explicit about interface or enforce hard 404 for unknown routes. | blocker |
| Unknown route `/{locale}/x-nope` | 200 | 200 | not registered | unknown | Auth not-found shell / soft 404 | Unknown route returns HTTP 200. | Fix catch-all/not-found routing so unknown localized paths return HTTP 404. | blocker |

### Auth

| Route | FR status | EN status | Real maturity | Real dataMode | Shell | Problems found | Recommended action | Priority |
|---|---:|---:|---|---|---|---|---|---|
| `/{locale}/login` | 200 | 200 | `CONNECTED` | `adapter` | AuthShell | Requires real Google/SMTP env verification before `VALIDATED`. | Keep below `VALIDATED`; complete environment QA. | high |
| `/{locale}/register` | 200 | 200 | `CONNECTED` | `adapter` | AuthShell | Same provider/env dependency as login. | Test register + magic-link email in target environment. | high |
| `/{locale}/forgot-password` | 200 | 200 | `CONNECTED` | `adapter` | AuthShell | Same SMTP dependency. | Test email delivery and expiry. | high |
| `/{locale}/reset-password` | 200 | 200 | `CONNECTED` | `adapter` | AuthShell | Requires token-flow validation. | Add E2E auth boundary tests with configured SMTP. | high |
| `/{locale}/verify-email` | 200 | 200 | `CONNECTED` | `adapter` | AuthShell | Requires real magic-link verification validation. | Keep as connected, not validated. | high |

### Customer Account

| Route | FR status | EN status | Real maturity | Real dataMode | Shell | Problems found | Recommended action | Priority |
|---|---:|---:|---|---|---|---|---|---|
| `/{locale}/account` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/account | Fixture-backed; no real customer data. | Keep fixture label visible; connect after commerce/entitlements. | medium |
| `/{locale}/account/orders` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/account | No real orders/invoices. | Connect after verified payment processing. | medium |
| `/{locale}/account/orders/{orderId}` | 200 in build | 200 in build | `BRANDED` | `fixture` | WorkspaceShell/account | Preview IDs only. | Keep fixtures behind query interface. | medium |
| `/{locale}/account/entitlements` | 200 in build | 200 in build | `BRANDED` | `fixture` | WorkspaceShell/account | No real entitlement source yet. | Connect after commerce entitlements. | medium |
| `/{locale}/account/licenses` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/account | Masked fixture licenses only. | Keep masked; connect after license management flow. | medium |
| `/{locale}/account/support` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/account | Support workflow not persistent. | Connect support service later. | medium |
| `/{locale}/account/settings/profile` | 200 in build | 200 in build | `BRANDED` | `preview` | WorkspaceShell/account | Forms disabled/non-persistent. | Keep preview until update actions and audit exist. | medium |
| `/{locale}/account/settings/security` | 200 in build | 200 in build | `BRANDED` | `preview` | WorkspaceShell/account | Security controls preview-only. | Validate auth/session management before enabling. | high |

### Checkout

| Route | FR status | EN status | Real maturity | Real dataMode | Shell | Problems found | Recommended action | Priority |
|---|---:|---:|---|---|---|---|---|---|
| `/{locale}/checkout` | 200 | 200 | `BRANDED` | `preview` | MarketingShell | Payment provider intentionally not connected. | Keep disabled CTA; implement provider adapter + webhook in commerce sprint. | high |
| `/{locale}/checkout/success` | 200 | 200 | `BRANDED` | `preview` | MarketingShell | Success state is preview; no real order created. | Do not use as proof of payment until webhook integration. | high |
| `/{locale}/checkout/failed` | 200 | 200 | `BRANDED` | `preview` | MarketingShell | No sensitive provider errors displayed. | Keep as is until provider failure mapping exists. | medium |

### Documentation and Legal

| Route | FR status | EN status | Real maturity | Real dataMode | Shell | Problems found | Recommended action | Priority |
|---|---:|---:|---|---|---|---|---|---|
| `/{locale}/docs` | 200 | 200 | `BRANDED` | `content` | MarketingShell | Search remains preview. | Connect docs search adapter later. | medium |
| `/{locale}/docs/getting-started` | 200 | 200 | `BRANDED` | `content` | DocumentShell | Content remains technical review. | Keep review state visible. | low |
| `/{locale}/docs/requirements` | 200 | 200 | `BRANDED` | `content` | DocumentShell | No tested compatibility matrix yet. | Publish exact compatibility only after release validation. | high |
| `/{locale}/docs/installation` | 200 | 200 | `BRANDED` | `content` | DocumentShell | Draft mode d'emploi content. | Expand before customer release. | medium |
| `/{locale}/docs/activation` | 200 | 200 | `BRANDED` | `content` | DocumentShell | Describes activation before full account/license UI is connected. | Keep protocol wording aligned with license contract. | medium |
| `/{locale}/docs/releases/1.0.0` | 200 | 200 | `BRANDED` | `content` | DocumentShell | Release is still `theme:unreleased-v1`; no approved compatibility. | Connect approved release metadata before publication claims. | high |
| `/{locale}/legal/*` | 200 in build | 200 in build | `WIREFRAME` | `content` | DocumentShell | Legal documents remain review placeholders. | Legal review required before presenting as approved terms. | blocker |

### Admin

| Route | FR status | EN status | Real maturity | Real dataMode | Shell | Problems found | Recommended action | Priority |
|---|---:|---:|---|---|---|---|---|---|
| `/{locale}/admin` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | Fixture operations overview. | Connect only after authz/audit services are ready. | medium |
| `/{locale}/admin/customers` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | No real customer query yet. | Connect after customer/order data exists. | medium |
| `/{locale}/admin/catalog/products` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | Catalog writes disabled/preview. | Connect catalog backend with audit. | high |
| `/{locale}/admin/orders` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | Orders are fixtures. | Connect after payment webhook processing. | high |
| `/{locale}/admin/licenses` | 200 | 200 | `CONNECTED` | `query` | WorkspaceShell/admin | Connected to license query/workbench, but production authz/env validation still required. | Keep below `VALIDATED`; verify production secrets and role access. | high |
| `/{locale}/admin/releases` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | No private object storage or signed URLs. | Connect release/storage/download audit later. | high |
| `/{locale}/admin/support` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | Support queue fixture-only. | Connect support persistence and assignment. | medium |
| `/{locale}/admin/audit` | 200 | 200 | `BRANDED` | `fixture` | WorkspaceShell/admin | Audit log fixture-only for most actions. | Connect audit writes before enabling admin changes. | blocker |
| `/{locale}/admin/documentation` | 200 in build | 200 in build | `WIREFRAME` | `fixture` | WorkspaceShell/admin | Admin docs review remains generic. | Complete admin documentation review interface if operators need it pre-beta. | medium |
| `/{locale}/admin/services` | 200 in build | 200 in build | `WIREFRAME` | `fixture` | WorkspaceShell/admin | Pro/Managed service workflow remains generic. | Complete Pro/Managed service sprint. | high |

### API and System

| Route | Observed status | Real maturity | Real dataMode | Problems found | Recommended action | Priority |
|---|---:|---|---|---|---|---|
| `/api/health` | 200 HEAD | local | local | Healthy in standalone. | Keep as Render health check. | low |
| `/api/licenses/activate` | 405 HEAD, 400 POST `{}` | contract/fixture | contract | Method behavior is expected; invalid payload rejected. | Continue protocol fixture coverage. | low |
| `/api/licenses/validate` | 405 HEAD, 400 POST `{}` | contract/fixture | contract | Method behavior is expected; invalid payload rejected. | Continue protocol fixture coverage. | low |
| `/api/licenses/deactivate` | 405 HEAD, 400 POST `{}` | contract/fixture | contract | Method behavior is expected; invalid payload rejected. | Continue protocol fixture coverage. | low |
| `/{locale}/dev/interfaces` | 200 HEAD, not-found content | `WIREFRAME` | `local` | Production-hidden route returns soft 404 `200`, not a hard 404. | Fix not-found/status behavior for production-only routes. | high |

## Registry vs Inventory Findings

The runtime registry and interface inventory are broadly aligned. The maturity and `dataMode` values are honest for most delivered screens:

- `BRANDED` pages still correctly use `fixture`, `preview` or `content` where no backend exists.
- `CONNECTED` is limited to auth and `admin.licenses`; both still require environment and authorization validation before `VALIDATED`.
- Legal content remains `WIREFRAME` / `content`, which is appropriate because legal text is not approved.

Findings:

| Finding | Detail | Action | Priority |
|---|---|---|---|
| About absent from registry | `/about` is requested in QA scope but has no `routes.marketing.about`, no registry entry and no inventory row. | Add explicit `marketing.about` or remove route expectation until Sprint 06E-bis. | blocker |
| Soft 404 from unknown routes | Unknown single-segment paths return HTTP 200 with not-found content. | Add route-level hard 404 behavior or constrain dynamic route matching. | blocker |
| Dev interface soft 404 | Production smoke test returns 200 for `/fr/dev/interfaces`, even though content is hidden. | Ensure hidden development route returns HTTP 404 status in production. | high |
| API registry incomplete at runtime | Inventory lists future `/api/checkout`, `/api/webhooks/{provider}`, `/api/downloads/{grantId}`, `/api/releases/latest`, `/api/docs/search`; repo currently implements health and license routes only. | Keep as known future API gaps; do not mark connected. | medium |
| Metadata domain placeholder | `app/layout.tsx` still uses `https://example.com/`. | Replace with approved production domain or env-backed metadata. | medium |

## UI / Shells Findings

| Control | Result | Notes |
|---|---|---|
| Header/footer duplication | Pass | Page-specific components do not duplicate global chrome; MarketingShell owns public header/footer, AuthShell owns focused auth shell, WorkspaceShell owns account/admin shell. |
| Shell coherence | Partial | Marketing/auth/account/admin are coherent. Docs detail uses DocumentShell inside MarketingShell, which is acceptable but creates nested public chrome plus article chrome. |
| Navigation links | Partial | Public nav links all render, but FAQ/Contact are wireframes. About is not in nav but was required by QA scope and is missing from registry. |
| Mobile/tablet/desktop | Partial | Sprints used responsive layouts, but QA-01 did not include browser screenshot diffing. Smoke verified render only. |
| Tailwind CDN / Google Fonts external / Material Symbols | Pass for app code | Fonts are local via `next/font/local` and `@fontsource`. Matches in design review docs are historical guidance, not runtime imports. |
| Inline JS/CSS | Pass with caveat | No custom inline scripts found in app components. Inline `style` appears in shadcn sidebar/progress and design-system color demo only. |
| Raw hex in components | Pass with caveat | Raw hex appears in design-system token display and documentation files. Branded feature pages use tokens/classes. |
| shadcn/Radix/lucide | Pass | Delivered interfaces use repository shadcn-compatible primitives and `lucide-react`. |

## Copywriting and Claims Findings

No blocking overclaim was found in delivered branded commerce/checkout/account/admin UI. Existing guardrail copy correctly avoids:

- guaranteed sales or fake metrics;
- final checkout/payment success without webhook;
- provider-specific payment claims in checkout;
- license language that intentionally disables storefront rendering;
- complete license key exposure;
- signed download URL exposure.

Items to keep under review:

- Legal pages are not approved; they must remain visibly review/draft until qualified legal review.
- Requirements/release documentation must not publish exact compatibility until the theme release matrix is tested.
- Managed/Pro service copy should continue to avoid unapproved SLA commitments.

## Sensitive Data Findings

Runtime component scan found no complete license keys, private keys, provider payloads, customer passwords, fake signed URLs or provider secrets exposed in delivered UI. Matches for secret names are expected in server-only env modules, tests, docs and admin settings previews.

Notable acceptable occurrences:

- `modules/auth/env.ts`, `modules/licensing/env.ts` define required env variables.
- `components/admin/admin-operations-pages.tsx` explicitly states sensitive values are not exposed.
- Test fixtures and protocol tests use safe `.test` domains and request examples.
- `render.yaml` lists secret env var names as `sync: false`, not values.

## Corrections Performed

No code correction is kept in this PR. A small `dynamicParams = false` route guard was tested locally against the auth and marketing dynamic routes, but it did not change the observed soft-404 HTTP status in standalone production, so it was removed rather than committed as a misleading fix.

The only intended deliverable for this branch is this QA report.

## Checks Executed

All checks passed on 2026-07-26:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Additional smoke tests:

- `NODE_ENV=production PORT=3015 pnpm start` before attempted route guard.
- `NODE_ENV=production PORT=3016 pnpm start` after rebuild confirmation.
- Main route smoke test returned `200` for the expected rendered FR/EN pages listed above.
- License API contract smoke returned `405` for HEAD and `400` for invalid POST `{}` payload.

## Proposed Follow-Up Sprints

| Sprint | Goal | Priority |
|---|---|---|
| Sprint Routing-01 | Fix hard 404 behavior for unknown localized routes and production-hidden development routes. | blocker |
| Sprint 06E-bis | Complete FAQ, Contact and decide whether About is required; add registry/inventory rows if delivered. | high |
| Sprint Legal-Review-01 | Move legal pages from review placeholders toward approved publication states with qualified review. | blocker |
| Sprint Commerce-01 | Connect payment provider adapter, hosted checkout, verified webhook and order/entitlement creation. | blocker |
| Sprint Auth-QA-01 | Validate Google OAuth, email/password and magic-link flows with real environment credentials. | high |
| Sprint Release-Delivery-01 | Connect release metadata, private storage, signed download grants and audit events. | high |
| Sprint Services-01 | Complete Pro/Managed service request workflows and operator views. | high |
| Sprint SEO-01 | Replace `example.com` metadata and audit public metadata/robots/canonical values. | medium |

## QA Conclusion

The platform is structurally strong after the UI sprints: routes compile, main interfaces render in both locales, and maturity/data-mode labels are mostly honest. The next beta gate should focus on routing correctness, public FAQ/contact/about completion, legal review state, auth environment validation and the first real commerce flow.
