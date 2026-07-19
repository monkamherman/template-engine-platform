# Sprint 06C — Features Page UI

## Objective

Implement the vertically finished Features page for:

```text
/{locale}/features
```

This sprint converts the accepted Stitch direction into maintainable Next.js, Tailwind and shadcn/Radix components.

Do not copy the Stitch HTML. Use it only as a UX reference.

## Prerequisites

1. Merge the Design Prompt Book PR containing:
   - `docs/design-prompts/03-features.md`;
   - `docs/design-reviews/03-features-stitch-review.md`;
   - this sprint file.
2. Make sure Sprint 06A and 06B decisions are respected where shared components or tokens already exist.
3. Treat exposed `.env` secrets as a separate release blocker before any external beta or production deployment.
4. Create implementation branch from latest `main`:

```text
feat/sprint-06c-features-page-ui
```

## Required reading

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/interface-inventory.md`
4. `docs/design-prompts/README.md`
5. `docs/design-prompts/00-global-stitch-guidelines.md`
6. `docs/design-prompts/03-features.md`
7. `docs/design-reviews/03-features-stitch-review.md`
8. `docs/sprints/sprint-06c-features-page-ui.md`

## Scope

Implement only the page-specific main content for the Features page.

Do not modify, duplicate or redesign:

- global marketing header;
- global footer;
- language switcher;
- auth/account menu;
- shell-level navigation.

The generated design must start below the existing header and end before the existing footer.

## Required sections

The page must include these sections:

1. Features hero
2. Feature category tabs
3. Shop model grid
4. Niche/market/language workflow
5. License and service boundary alert
6. Technical buyer confidence section
7. Final CTA

## Section requirements

### 1. Features hero

Purpose: explain quickly that the product is not only a theme, but a commercial system around a modular WooCommerce Template Engine.

Recommended copy direction:

```text
Everything needed to turn one WooCommerce foundation into several launch-ready store models.
```

Subcopy should mention reusable sections, niche presets, localization, official access, documentation and support workflows.

CTAs:

- Explore demos
- View pricing

The hero visual should be a lightweight system-map style composition built with cards and tokens, not a remote image.

### 2. Feature category tabs

Use real shadcn/Radix tabs.

Categories:

1. Storefront engine
2. Commercial access
3. Launch operations
4. Documentation and support

Each category should display 4 to 6 feature cards.

Do not implement fake tabs where the active state changes but content remains static.

### 3. Shop model grid

Show four models:

- Dropshipping
- Stock commerce
- Hybrid commerce
- Digital products

Each card should explain what changes in the storefront/operations without claiming unimplemented automation.

Forbidden copy:

- warehouse management system;
- barcode scanning;
- smart order routing;
- instant recurring billing engine;
- guaranteed supplier sync.

### 4. Niche/market/language workflow

Represent the operational path:

```text
Choose niche -> Adjust market -> Select language -> Configure store model -> Launch and validate
```

Desktop may use a horizontal stepper. Mobile must use a vertical timeline/card sequence.

### 5. License and service boundary alert

Use an `Alert`-style section explaining:

```text
The license key controls official services, updates, downloads and support. Public storefront rendering must not depend on the license API.
```

Do not claim SLA numbers such as 99.9% uptime.

### 6. Technical buyer confidence section

Keep this credible and restrained.

Allowed references:

- Next.js App Router commercial platform;
- WooCommerce/Sage theme product;
- Prisma/PostgreSQL data model;
- versioned documentation and release workflow;
- security-first license protocol.

Avoid exact versions in public copy unless deliberately sourced from the project and approved.

### 7. Final CTA

Use copy similar to:

```text
Use features as a launch system, not a checklist.
```

CTAs:

- View pricing
- Open documentation

## Color and visual rules

Color normalization is a blocking criterion.

Use only the approved project palette through central tokens/classes:

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

Do not copy Stitch colors directly:

```text
#051424
#010f1f
#0d1c2d
#122131
#1c2b3c
#273647
#404758
#a78b7d
#e0c0b1
#d4e4fa
#ffb690
```

Do not scatter hex values in page components. Fix the central theme mapping if needed.

Avoid heavy gradients and glassmorphism. A very subtle orange accent glow is acceptable only when it does not dominate the page.

## Component expectations

Use project-compatible shadcn/Radix/lucide patterns:

- `Button`
- `Card`
- `Badge`
- `Tabs`
- `Alert`
- `Separator` when useful
- `lucide-react` icons

Do not use:

- Tailwind CDN;
- Google Fonts links;
- Material Symbols;
- Alpine.js;
- inline CSS;
- inline JavaScript;
- `onclick`, `x-data`, `@click` or external runtime scripts;
- remote generated images from Stitch.

## Copywriting boundaries

Do not claim:

- guaranteed sales;
- guaranteed conversion improvement;
- zero downtime;
- 99.9% uptime;
- barcode scanning;
- recurring billing engine;
- AliExpress/Spocket/native supplier sync;
- full warehouse management;
- production-ready in minutes;
- headless-ready bridges unless implemented and documented;
- enterprise scale without qualification.

Use restrained phrasing such as:

- `launch preparation`;
- `official release access`;
- `update workflow documentation`;
- `storefront structure`;
- `support path`;
- `operational separation`;
- `larger operational setups`.

## Responsive requirements

- Desktop: rich two-column hero and spacious card grids.
- Tablet: two-column card layouts where possible.
- Mobile: hero text first, CTAs visible early, tabs usable or converted into stacked category sections.
- Stepper must become vertical on mobile.
- Avoid tiny unreadable system-map details on small screens.

## Accessibility requirements

- Proper heading hierarchy.
- Keyboard-accessible tabs.
- Visible focus states.
- High contrast after color normalization.
- Icons must be decorative or paired with text.
- Alerts must not rely on color alone.

## Suggested component organization

Follow the repository convention if it already exists. Otherwise, use a structure similar to:

```text
components/marketing/features/features-hero.tsx
components/marketing/features/features-category-tabs.tsx
components/marketing/features/shop-model-grid.tsx
components/marketing/features/niche-market-workflow.tsx
components/marketing/features/license-boundary-alert.tsx
components/marketing/features/technical-confidence-section.tsx
components/marketing/features/features-final-cta.tsx
```

Keep feature data in typed arrays close to the page/component unless the project already centralizes marketing content elsewhere.

## Validation commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If any command fails, keep the PR in draft and document the failure.

## PR requirements

The implementation PR must include:

- summary of delivered sections;
- desktop/tablet/mobile preview notes or screenshots;
- list of shadcn/Radix/lucide primitives used;
- proof that header/footer were not duplicated;
- proof that raw Stitch HTML was not copied;
- explanation of color token usage;
- copywriting changes made to avoid overclaims;
- commands executed and results;
- known limitations.

## Acceptance checklist

This sprint is complete only when:

- `/fr/features` and `/en/features` render correctly;
- the page uses the global app shell without duplicated header/footer;
- all sections listed above are implemented;
- color tokens are normalized centrally;
- copywriting avoids unapproved claims;
- no CDN, Alpine, Material Symbols, inline scripts/styles or generated image URLs remain;
- responsive behavior is validated;
- lint, typecheck, tests and build pass or failures are documented with clear follow-up.
