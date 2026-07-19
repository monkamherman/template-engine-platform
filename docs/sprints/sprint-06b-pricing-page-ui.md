# Sprint 06B — Pricing Page UI

## Objective

Implement the pricing page `/{locale}/pricing` as a vertically finished marketing page based on the approved Stitch direction and the review file.

This sprint converts design direction into clean, maintainable Next.js, Tailwind and shadcn/ui components. It must not copy Stitch HTML.

## Required reading

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/interface-inventory.md`
4. `docs/design-prompts/README.md`
5. `docs/design-prompts/00-global-stitch-guidelines.md`
6. `docs/design-prompts/02-pricing.md`
7. `docs/design-reviews/02-pricing-stitch-review.md`
8. This sprint file

## Branch

```text
feat/sprint-06b-pricing-page-ui
```

Create the branch from the latest `main` after the Design Prompt Book PR is merged.

## Scope

Implement the pricing page content for:

```text
/{locale}/pricing
```

The page must preserve the existing application shell. Do not redesign global navigation or the footer.

## Required sections

1. Pricing hero.
2. Starter / Pro / Managed cards.
3. License clarification alert.
4. Comparison section.
5. Decision helper.
6. FAQ.
7. Final CTA.

## Design system requirements

Use shadcn/ui-compatible components:

- `Button`
- `Card`
- `Badge`
- `Alert`
- `Accordion`
- `Table`
- `Separator`

Use project icon conventions. Do not introduce remote Material Symbols.

## Color requirements

Do not reuse Stitch's generated palette.

Use only project theme tokens/classes mapped to the validated identity:

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

If current tokens do not support the required design, add or correct the token mapping centrally. Do not scatter literal hex values in pricing components.

## Content requirements

Use cautious commercial language.

Do not include final prices unless approved pricing data already exists in the application source of truth.

Use placeholders such as:

- `Launch price to confirm`
- `Guided launch scope`
- `Custom managed scope`

Do not claim:

- guaranteed sales;
- guaranteed uptime;
- automatic updates unless implemented;
- support hotlines unless approved;
- AliExpress, Spocket or other supplier integrations unless implemented;
- prorated upgrades unless billing rules exist.

License message must state:

> The license key controls official services such as downloads, update access, activation records and support. It does not disable the storefront, cart or checkout.

Adapt wording for localization if the app currently uses FR/EN content patterns.

## Implementation guidance

Prefer a section/component split such as:

```text
components/marketing/pricing/pricing-hero.tsx
components/marketing/pricing/pricing-cards.tsx
components/marketing/pricing/license-clarification.tsx
components/marketing/pricing/pricing-comparison.tsx
components/marketing/pricing/plan-decision-helper.tsx
components/marketing/pricing/pricing-faq.tsx
components/marketing/pricing/pricing-final-cta.tsx
```

If the repository already defines another pattern for marketing page components, follow the existing convention.

## Data and localization

Preserve FR/EN routing and avoid hard-coding text in a way that breaks the existing content strategy.

If there is an existing marketing content source, use it. If the current page is still static, organize copy so it can be moved to content dictionaries later.

## Responsive requirements

- Desktop: three pricing cards in a balanced grid.
- Tablet: cards stay readable and the recommended plan remains clear.
- Mobile: cards stack cleanly, CTA buttons remain visible, no horizontal overflow.
- Comparison table must be readable on mobile. Use stacked mobile cards if needed.
- FAQ touch targets must be comfortable.

## Accessibility requirements

- Semantic heading order.
- Accessible Accordion behavior.
- Visible focus states.
- CTA labels must be explicit.
- Plan differences cannot rely on color alone.
- Icons must not be the only source of meaning.

## Explicit exclusions

Do not:

- copy Stitch HTML;
- include Tailwind CDN;
- include Google Fonts links;
- include Material Symbols links;
- add inline styles;
- add inline scripts;
- use `onclick` handlers;
- duplicate the global header or footer;
- introduce final pricing numbers without approved source data.

## Validation commands

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If a command fails for reasons unrelated to this sprint, document the failure and evidence in the PR.

## Pull request requirements

The PR must include:

- summary of delivered sections;
- screenshots or written preview notes for desktop, tablet and mobile;
- list of shadcn/ui components used;
- proof that header/footer were not duplicated;
- proof that Stitch colors were normalized through tokens;
- note about pricing placeholders or approved pricing source;
- tests/checks executed;
- remaining limitations.

The PR must remain draft while colors, responsive behavior, copywriting safety or checks are unresolved.
