# Design Review — 01 Marketing Home Stitch Output

Source page: `docs/design-prompts/01-marketing-home.md`

Route: `/{locale}`

Interface ID: `marketing.home`

Status: `REVIEWED_FOR_IMPLEMENTATION_WITH_COLOR_NORMALIZATION`

## Review decision

The first Stitch output is usable as a structural direction, but it must not be implemented as-is.

Codex may use the section order, hierarchy and several layout ideas, but must normalize colors, remove generated implementation artifacts, replace placeholder images, and rebuild the page with repository-approved React, Tailwind and shadcn/ui primitives.

## What to keep

Keep the following UX structure:

1. Hero section with badge, headline, paragraph and three actions.
2. Modular ecommerce visual in the hero.
3. Compact value strip with four benefits.
4. Shop model explanation using local tabs.
5. Feature grid.
6. Offer preview for Starter, Pro and Managed.
7. Documentation preview.
8. Final conversion CTA.

This structure matches the commercial objective of the home page: explain the product quickly, prove modularity, clarify store models, introduce the offers and route visitors toward pricing, demos or documentation.

## What to reject

Do not copy these parts from the raw Stitch export:

- the Tailwind CDN configuration;
- the external Google font links;
- Material Symbols imports;
- inline JavaScript tab behavior;
- raw `<button onclick>` interactions;
- external `googleusercontent.com` images;
- generated `gradient-mesh` or undefined helper classes;
- one-off token names such as `primary-container`, `on-primary-fixed`, `surface-container-lowest` unless mapped through the project token layer;
- any HTML `<main>` wrapper that duplicates the app shell responsibilities.

Codex must rebuild the page inside the existing Next.js route/component structure.

## Header and footer rule

Do not design, implement, duplicate or modify the global header or footer in this sprint.

The generated page must start below the existing shell header and end before the existing shell footer.

Allowed page-level navigation:

- local tabs;
- section anchors if useful;
- local cards and links;
- documentation/search preview inside the page content.

## Color review

The generated output does not fully follow the approved project palette.

### Approved palette

| Semantic token | Approved value | Usage |
| --- | --- | --- |
| `background` | `#0B0F19` | page background |
| `card` | `#111827` | elevated sections and cards |
| `cardSubtle` | `#0F172A` | quieter card/background panels |
| `border` | `#1F2937` | standard border |
| `muted` | `#334155` | muted slate surfaces |
| `accent` | `#F97316` | primary CTA, focus, highlights |
| `accentSoft` | `rgba(249, 115, 22, 0.12)` | badges, soft accent backgrounds |
| `success` | `#22C55E` | positive status |
| `warning` | `#F59E0B` | caution status |
| `danger` | `#EF4444` | destructive/error status |
| `foreground` | `#F8FAFC` | main text |
| `mutedForeground` | `#94A3B8` | secondary text |

### Stitch colors to replace

| Stitch output | Problem | Replace with |
| --- | --- | --- |
| `#051424` | too blue, drifts away from approved near-black SaaS background | `#0B0F19` |
| `#122131` | acceptable but too blue for main cards | `#111827` or `#0F172A` |
| `#273647` | too bright for large surfaces | `#1F2937` or `#334155` depending on usage |
| `#a78b7d` | brown outline, weak brand fit | `#1F2937` or `rgba(148,163,184,0.22)` |
| `#e0c0b1` | warm pink secondary text, inconsistent | `#94A3B8` |
| `#d4e4fa` | blue-tinted foreground | `#F8FAFC` |
| `#ffb690` | salmon tone, dilutes orange accent | reserve only as optional soft highlight; prefer `#F97316` |
| `#f97316` | correct orange | keep as accent only |

## Color implementation rule for Codex

Codex must not hardcode the Stitch palette directly inside components.

Use the project design tokens through Tailwind/shadcn variables. If missing, add or adjust a central token mapping once, then consume semantic classes from the component.

Preferred implementation style:

```tsx
<Card className="border-border/70 bg-card text-card-foreground">
  <Badge className="border-orange-500/20 bg-orange-500/10 text-orange-400">
    WooCommerce Template Engine
  </Badge>
</Card>
```

Avoid:

```tsx
<div className="bg-[#051424] text-[#d4e4fa] border-[#a78b7d]">
```

Use raw hex values only in a central theme/token file when absolutely necessary.

## Copy review

Some generated copy must be corrected before implementation.

### Keep or adapt

- “Launch niche WooCommerce stores faster with one modular engine.”
- “Use a reusable storefront foundation, official downloads, license access, documentation and optional onboarding...”
- “One engine, several ecommerce paths.”
- Starter, Pro and Managed commercial paths.

### Replace or avoid

| Generated copy | Reason | Replacement direction |
| --- | --- | --- |
| “integrates with major supplier APIs” | not approved; overclaims integrations | “supplier-ready catalog logic and WooCommerce-compatible workflows” |
| “automated order routing” | may imply automation not implemented | “prepared supplier and fulfillment boundaries” |
| “Direct access to ecommerce experts for scaling” | support promise not approved | “support paths for Pro and Managed customers” |
| “zero security risk” | absolute claim | “official access to verified release files” |
| “Geo-aware settings for taxation” | tax automation claim not approved | “market, language and currency adaptation boundaries” |
| “Enterprise-grade maintenance” | too strong for current offer | “managed validation and operational support” |

Do not add final pricing, guaranteed results, customer testimonials, fake logos or fake metrics.

## Component mapping

Codex should map sections to reusable components:

| Section | Suggested component |
| --- | --- |
| Hero | `MarketingHomeHero` |
| Value strip | `MarketingValueStrip` |
| Shop models | `ShopModelTabs` |
| Feature grid | `MarketingFeatureGrid` |
| Offer preview | `OfferPreviewCards` |
| Docs preview | `DocumentationPreviewCard` |
| Final CTA | `MarketingFinalCta` |

Use shadcn/ui primitives where appropriate:

- `Button`
- `Card`
- `Badge`
- `Tabs`
- `Separator`
- `Alert` if a licensing boundary notice is included

## Interaction review

Replace inline JavaScript tabs with React state or shadcn `Tabs`.

The shop model tabs must be keyboard accessible and must work without custom DOM manipulation.

## Asset review

Do not use remote Stitch-generated images.

For the first implementation pass, use a CSS/HTML product visual made from cards, badges and mock panels. Later, this can be replaced by approved product screenshots.

The hero visual should show:

- storefront preview card;
- module chips: niche, market, language, store model, license, docs;
- mini offer selector: Starter, Pro, Managed;
- license/status chip.

## Responsive review

Codex must implement and test:

- desktop wide layout;
- tablet hero stacking;
- mobile CTA stacking;
- mobile tabs scroll or stacked card fallback;
- offer cards single-column on mobile;
- no unreadable dashboard microtext on small screens.

## Accessibility requirements

- Use semantic sections and headings.
- Buttons and links must have clear labels.
- Tabs must be keyboard accessible.
- Icon-only content must have text labels or be decorative.
- Focus states must be visible.
- Do not communicate important status by color alone.

## Acceptance checklist

The implementation is accepted only if:

- no header or footer is implemented in the page component;
- no Tailwind CDN, external runtime script or inline DOM JavaScript is used;
- no generated remote images remain;
- no raw Stitch palette is copied into page components;
- colors use central project tokens/classes;
- copy avoids unapproved automation, supplier, tax, support and security claims;
- shadcn/ui primitives are used for cards, buttons, badges and tabs;
- route works for both locales;
- lint, typecheck, tests and build pass.
