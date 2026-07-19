# Sprint 06A — Marketing Home UI Integration

## Objective

Implement the first vertically finished public page: the marketing home page at `/{locale}`.

This sprint converts the accepted Stitch direction into production-ready Next.js, Tailwind and shadcn/ui components while preserving the existing application shell.

## Branch

```text
feat/sprint-06a-marketing-home-ui
```

## Required reading

Before implementation, read:

1. `AGENTS.md`
2. `docs/product-scope.md`
3. `docs/interface-inventory.md`
4. `docs/design-prompts/README.md`
5. `docs/design-prompts/00-global-stitch-guidelines.md`
6. `docs/design-prompts/01-marketing-home.md`
7. `docs/design-reviews/01-marketing-home-stitch-review.md`

## Scope

Implement only the page-specific main content for `marketing.home`.

Do not implement or modify:

- global marketing header;
- global footer;
- language switcher;
- auth/account dropdown;
- global navigation shell;
- pricing page;
- demos page;
- docs page;
- checkout/auth/account/admin pages.

## Required page sections

The home page must include:

1. Hero section with badge, headline, explanation, primary CTA, secondary CTA and docs link.
2. Modular product visual built from UI cards, not remote generated images.
3. Value strip with four compact benefits.
4. Shop model tabs: Dropshipping, Stock, Hybrid, Digital.
5. Feature grid.
6. Offer preview: Starter, Pro, Managed.
7. Documentation preview.
8. Final CTA.

## Design system requirements

Use shadcn/ui as the component foundation.

Required primitives:

- `Button`
- `Card`
- `Badge`
- `Tabs`
- `Separator` where useful

Optional:

- `Alert` for a short license boundary note;
- `Tooltip` for technical chips only if useful.

Do not create a custom component library when shadcn primitives already solve the need.

## Color requirements

Color normalization is a release blocker.

Do not copy Stitch-generated colors directly into page components.

Rejected values include:

- `#051424`
- `#122131`
- `#273647`
- `#a78b7d`
- `#e0c0b1`
- `#d4e4fa`
- `#ffb690` as a main accent

Use approved semantic tokens/classes from the project theme.

Target palette:

| Semantic usage | Value |
| --- | --- |
| Background | `#0B0F19` |
| Card | `#111827` |
| Card subtle | `#0F172A` |
| Border | `#1F2937` |
| Slate surface | `#334155` |
| Orange accent | `#F97316` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Main text | `#F8FAFC` |
| Secondary text | `#94A3B8` |

If the existing Tailwind/shadcn token layer cannot express this palette, add or adjust tokens centrally and document the change. Do not scatter raw hex values across components.

## Content requirements

Use careful commercial copy.

Approved direction:

- product is a modular WooCommerce Template Engine;
- platform sells official downloads, license access, documentation, onboarding and support;
- customers can adapt niche, market, language and shop model;
- Starter is self-install;
- Pro is guided launch/onboarding;
- Managed is validation, maintenance and operational support.

Do not claim:

- guaranteed sales;
- automatic universal deployment;
- automatic tax compliance;
- live supplier API integration unless already implemented;
- zero security risk;
- final support SLA;
- fake customer proof;
- fake metrics.

## Implementation guidance

Prefer a small set of page-specific components under the existing component conventions, for example:

```text
components/marketing/home/marketing-home-hero.tsx
components/marketing/home/marketing-value-strip.tsx
components/marketing/home/shop-model-tabs.tsx
components/marketing/home/marketing-feature-grid.tsx
components/marketing/home/offer-preview-cards.tsx
components/marketing/home/documentation-preview-card.tsx
components/marketing/home/marketing-final-cta.tsx
```

Adjust paths to match the repository's existing structure.

Business copy and reusable data should not be trapped inside large untestable JSX if the existing project has content/query conventions for marketing pages.

## Interaction requirements

- Use React/shadcn `Tabs`, not inline JavaScript.
- No DOM manipulation through `document.querySelector`.
- No `onclick` attributes.
- CTAs must use the existing route helpers/configuration where available.
- All interactive elements must be keyboard accessible.

## Asset requirements

- No remote `googleusercontent.com` images.
- No generated image dependency for the hero.
- Build the first hero visual from cards, badges, panels and layout primitives.
- Use approved local assets only if they already exist and fit the product.

## Responsive requirements

Validate at least:

- mobile width around 375px;
- tablet width around 768px;
- desktop width around 1280px.

Expected behavior:

- hero stacks cleanly on mobile;
- CTAs wrap without visual clutter;
- tab content remains readable;
- feature grid becomes one column on mobile;
- offer preview cards stack on mobile;
- product visual does not contain unreadable microtext.

## Accessibility requirements

- Semantic `section` elements.
- One clear page `h1`.
- Logical heading order.
- Visible focus states.
- Icons decorative unless paired with text.
- Sufficient color contrast.
- No meaning by color alone.

## Tests and checks

Run repository-defined checks. At minimum:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If a command cannot run, document why in the PR.

## PR requirements

The implementation PR must include:

- summary of implemented sections;
- screenshots or local preview notes for desktop/tablet/mobile;
- color normalization note;
- list of shadcn components used;
- confirmation that header/footer were not duplicated;
- test evidence;
- known limitations.

## Acceptance checklist

The sprint is complete only when:

- the `/{locale}` home page uses the approved section structure;
- color values are normalized through project tokens/classes;
- no Stitch raw implementation artifacts remain;
- no remote generated images remain;
- shadcn/ui primitives are used;
- page copy is commercially careful;
- FR/EN routing is preserved;
- all checks pass or failures are documented as blockers;
- `docs/interface-inventory.md` or the runtime interface registry is updated only if the page maturity legitimately changes.
