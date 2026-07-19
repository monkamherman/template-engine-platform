# 03 — Features Page Stitch Review

Route: `/{locale}/features`  
Interface ID: `marketing.features`  
Source: third Stitch export provided for the Features page  
Review status: **Accepted as UX direction, rejected as implementation source**

## Verdict

The Stitch generation provides a useful content structure for the Features page, but the exported HTML must not be copied into the application.

The page should be implemented as clean React/TypeScript components using the existing Next.js App Router, Tailwind tokens and shadcn/Radix primitives already available in the repository.

## Keep from the Stitch direction

The following sections should be preserved, with rewritten implementation and safer copy:

1. Hero section explaining that one WooCommerce foundation can support several launch models.
2. Feature category tabs.
3. Storefront/commercial/operations/documentation feature cards.
4. Shop model cards for Dropshipping, Stock, Hybrid and Digital.
5. Niche/market/language/store-model workflow stepper.
6. License and service boundary alert.
7. Technical buyer confidence section.
8. Final CTA linking Pricing and Documentation.

## Do not reuse from the Stitch export

Do not copy any of the following implementation details:

- Tailwind CDN;
- external Google Fonts links;
- Material Symbols font imports;
- external generated image URLs;
- Alpine.js CDN;
- `x-data`, `@click` or other Alpine attributes;
- inline `<style>` blocks;
- inline `<script>` blocks;
- custom `glass-card` implementation;
- generated Tailwind color config;
- raw HTML structure.

## Color normalization

The Stitch export uses the same generated palette as the previous exports. Do not preserve it directly.

Replace Stitch colors with the approved project palette:

```text
background        #0B0F19
card              #111827
cardSubtle        #0F172A
border            #1F2937
slate surface     #334155
accent orange     #F97316
success           #22C55E
warning           #F59E0B
danger            #EF4444
main text         #F8FAFC
secondary text    #94A3B8
```

Mapping guidance:

```text
#051424  -> background
#010f1f  -> background/cardSubtle depending on elevation
#0d1c2d  -> cardSubtle
#122131  -> card
#1c2b3c  -> border/cardSubtle
#273647  -> border/slate surface
#404758  -> slate surface muted usage only
#a78b7d  -> do not use as border; map to border token
#e0c0b1  -> secondary text
#d4e4fa  -> main text
#ffb690  -> avoid as main accent; map to muted orange only if token exists
#f97316  -> accent orange
```

Codex must not scatter hex values through components. If tokens are missing, update the central Tailwind/shadcn theme mapping rather than hardcoding colors in the page.

## Copywriting corrections

The page contains several overclaims or unapproved technical claims that must be softened.

| Stitch wording | Problem | Replace with |
| --- | --- | --- |
| `Optimized multi-step checkout paths designed for lower abandonment rates.` | conversion claim not proven | `Checkout-aware sections designed to support clear customer flows.` |
| `Automatic updates for official core features and licensed extensions.` | update mechanism not confirmed | `Official release access and update workflow documentation.` |
| `Guided setup flows to get from clean install to production-ready in minutes.` | unrealistic time promise | `Guided setup paths from clean install to launch preparation.` |
| `High Volatility` badge for dropshipping | negative/risky tone | `Supplier-ready` or `Fast testing` |
| `Integrated warehouse management system` | feature not proven | `Inventory-managed storefront structure and stock-oriented content patterns.` |
| `barcode scanning support` | unapproved capability | remove unless implemented |
| `Smart logic routes orders based on product origin and stock levels.` | automation claim not proven | `The model can present owned stock and supplier-supported products with clear operational separation.` |
| `Specialized secure download areas and recurring billing engine.` | unapproved platform/theme feature | `Digital-product positioning and documentation-aware delivery boundaries.` |
| `This ensures 99.9% uptime` | SLA claim not approved | `This prevents public storefront rendering from depending on the license API.` |
| `Next.js 14` | incorrect for current platform | `Next.js App Router platform` |
| `Headless-ready API bridges` | unapproved | remove or rewrite as future-facing only if documented |
| `CI/CD automation support` | unapproved customer feature | `release workflow documentation` |
| `enterprise solutions` | too broad | `larger operational setups` |
| `without hitting technical ceilings` | overpromise | `without rebuilding the commercial platform from scratch` |

## Required implementation structure

Implement the page as page-specific main content only. Do not create, duplicate or restyle global header/footer.

Suggested component split:

```text
components/marketing/features/features-hero.tsx
components/marketing/features/features-category-tabs.tsx
components/marketing/features/shop-model-grid.tsx
components/marketing/features/niche-market-workflow.tsx
components/marketing/features/license-boundary-alert.tsx
components/marketing/features/technical-confidence-section.tsx
components/marketing/features/features-final-cta.tsx
```

If the repository already has a different marketing component convention, follow the existing convention instead of forcing these exact paths.

## shadcn/Radix component expectations

Use project-compatible primitives:

- `Button` for CTAs;
- `Card` for features and shop models;
- `Badge` for categories and statuses;
- `Tabs` for feature categories;
- `Alert` for license/service boundary;
- `Separator` when helpful between dense content sections.

Use `lucide-react` icons already available in the project instead of Material Symbols.

## Feature category tabs

The Stitch export visually suggests tabs but does not implement the real tab content correctly. Codex must implement actual category data.

Required categories:

1. Storefront engine
2. Commercial access
3. Launch operations
4. Documentation and support

Each category should display 4 to 6 cards. Avoid generic icon grids. Each card should explain what the feature changes in the customer journey.

## Technical buyer section

The technical section should be credible but not over-specific.

Allowed points:

- Next.js App Router commercial platform;
- WooCommerce/Sage theme product;
- Prisma/PostgreSQL data model;
- versioned documentation and release workflow;
- security-first license protocol.

Avoid exact versions in marketing copy unless sourced from the runtime package and intentionally exposed.

## Responsive requirements

- Desktop: hero can use a two-column layout with a clean system map visual.
- Tablet: cards should become two columns where possible.
- Mobile: hero text first, CTAs visible early, tabs usable horizontally or converted to stacked category sections.
- Avoid tiny unreadable architecture details on mobile.
- The workflow stepper must become a vertical timeline/card list on mobile.

## Accessibility requirements

- Tabs must be keyboard-accessible through Radix/shadcn tabs.
- Icons must not be the only carrier of meaning.
- All CTAs must have explicit labels.
- Heading order must be semantic.
- Contrast must remain high after color normalization.
- The alert must not rely only on orange color.

## Acceptance criteria

The implementation is acceptable only if:

- the page explains that the product is more than a theme, without becoming developer documentation;
- storefront, commercial access, operations and documentation features are clearly separated;
- the page does not claim unimplemented automation, integrations, SLA, barcode, recurring billing or zero-downtime guarantees;
- all colors use project tokens;
- the global header and footer are untouched;
- no Tailwind CDN, Material Symbols, Google Fonts, Alpine.js, inline script or raw Stitch HTML remains;
- the page is responsive and accessible;
- `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` pass or failures are documented in the PR.
