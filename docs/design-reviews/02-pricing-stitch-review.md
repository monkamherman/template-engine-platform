# 02 — Pricing Page Stitch Review

Route: `/{locale}/pricing`  
Interface ID: `marketing.pricing`  
Source: second Stitch generation pasted by the project owner  
Status: approved as UX direction, not approved as implementation source

## Verdict

The generated pricing page has a strong structure and can become the implementation reference for the vertical finishing of the pricing route.

It must not be copied as raw HTML. It uses Tailwind CDN, generated Material Symbols, inline JavaScript, generated one-off CSS and a non-canonical color palette. Codex must translate the accepted structure into existing Next.js, Tailwind and shadcn/ui components.

## What to keep

Keep the overall page rhythm:

1. Hero section focused on plan selection.
2. Three offer cards: Starter, Pro and Managed.
3. License clarification alert.
4. Feature comparison section.
5. Decision helper section.
6. FAQ section.
7. Final conversion CTA.

Keep the commercial positioning:

- Starter = self-install and official access.
- Pro = guided launch and onboarding.
- Managed = operational support and update/validation assistance.

Keep the idea of making Pro visually recommended, but avoid making Starter look weak or incomplete.

## What to reject

Do not reuse:

- the raw HTML document structure;
- `tailwind.config` embedded in the HTML;
- Tailwind CDN;
- Google Fonts links;
- Material Symbols links or icon font dependency;
- inline `<style>` blocks;
- inline `<script>` blocks;
- `onclick` accordion behavior;
- generated palette names such as `surface-container-highest`, `on-primary-fixed`, `primary-fixed-dim`;
- any global `body` styling from Stitch;
- any header or footer assumptions.

The implementation must be built from the current application shell and page content only.

## Color normalization

The Stitch output uses a material-like generated palette. It should be mapped to the project tokens.

Approved mapping:

| Stitch color / concept | Use instead |
| --- | --- |
| `#051424`, `background`, `surface`, `surface-dim` | project background `#0B0F19` |
| `#010f1f`, `surface-container-lowest` | project deeper background / subtle section, preferably tokenized |
| `#122131`, `.glass-card`, `surface-container` | project card `#111827` |
| `#0d1c2d`, `surface-container-low` | project card subtle `#0F172A` |
| `#1c2b3c`, `surface-container-high` | project border/surface mix; avoid as raw hex |
| `#273647`, `surface-variant`, `surface-container-highest` | project slate surface `#334155` or border `#1F2937` depending on use |
| `#f97316`, `primary-container` | project accent orange `#F97316` |
| `#ffb690`, `primary`, `surface-tint` | avoid as primary accent; use orange accent or a tokenized muted orange only when necessary |
| `#d4e4fa`, `on-background`, `on-surface` | project main text `#F8FAFC` |
| `#e0c0b1`, `on-surface-variant` | project secondary text `#94A3B8` |
| `#a78b7d`, `outline` | project border `#1F2937` or muted border token |
| `#584237`, `outline-variant` | project border `#1F2937` |

Codex must not scatter literal hex values inside page components. If the existing Tailwind/shadcn theme tokens are insufficient, the mapping must be corrected centrally.

## Copywriting corrections

The page contains useful positioning, but several claims are too specific or risky.

Replace invented or unapproved prices:

- `$199/year`
- `$499/year`
- `Custom/monthly`

with approved placeholders until pricing is validated:

- `Launch price to confirm`
- `Guided launch scope`
- `Custom managed scope`

Remove or rewrite unapproved claims:

- `fully-managed setup and operational guidance` → `guided setup or managed operational support depending on the offer`.
- `automatic updates` → `official updates` unless automatic updater behavior is implemented.
- `security patches` → `official release updates` unless a security patch SLA is approved.
- `Priority Support Hotline` → `priority support path`.
- `Dedicated/Slack` → `dedicated support channel` only if approved later.
- `guarantee zero downtime` → `reduce update risk through validation and rollback planning`.
- `native integrations with common AliExpress and Spocket connectors` → remove unless those integrations are actually implemented and supported.
- `prorate the cost` → remove until billing rules are approved.

Keep the license clarification, but rewrite it carefully:

> The license key controls official services such as downloads, update access, activation records and support. It does not disable the storefront, cart or checkout.

## Component translation

Use these shadcn-compatible primitives:

- `Card` for pricing cards, decision helper cards and FAQ containers.
- `Badge` for plan labels and recommended state.
- `Button` for CTAs.
- `Separator` for pricing card structure and comparison sections.
- `Alert` for license clarification.
- `Accordion` for FAQ.
- `Table` for desktop comparison.
- mobile comparison cards for small screens if the table becomes unreadable.

Do not implement custom accordions with JavaScript. Use shadcn Accordion.

## Page structure to implement

Recommended component split:

```text
components/marketing/pricing/pricing-hero.tsx
components/marketing/pricing/pricing-cards.tsx
components/marketing/pricing/license-clarification.tsx
components/marketing/pricing/pricing-comparison.tsx
components/marketing/pricing/plan-decision-helper.tsx
components/marketing/pricing/pricing-faq.tsx
components/marketing/pricing/pricing-final-cta.tsx
```

If the current repository already has a preferred component convention, follow it instead, but keep pricing-specific components separated from generic UI primitives.

## Header and footer rule

Do not design, duplicate or modify the global header or footer.

The page implementation must start below the existing platform header and end before the existing footer. The pricing page may include only page-specific content navigation, such as anchors or comparison controls.

## Responsive review

Desktop direction is good: three pricing cards and a comparison table are clear.

Required changes:

- avoid `scale-105` on the recommended card if it breaks alignment or causes overflow;
- ensure mobile card CTAs remain visible and readable;
- transform comparison table into stacked comparison cards on mobile if horizontal scrolling feels poor;
- keep the license alert readable on mobile with icon and text stacked if necessary;
- ensure FAQ touch targets are at least comfortable tap size.

## Accessibility requirements

- Use semantic headings in order.
- Use real buttons for plan actions.
- Use accessible Accordion semantics.
- Do not rely on color alone for plan differences.
- Ensure focus states are visible.
- Ensure orange text on dark backgrounds has sufficient contrast.
- Use accessible icons from the project's chosen icon set, not remote icon fonts.

## Acceptance criteria

The pricing page is acceptable only if:

- the difference between Starter, Pro and Managed is immediately clear;
- no final price is invented;
- no unapproved support, integration, billing or uptime claim remains;
- the license clarification is legally careful;
- colors are normalized through project tokens;
- shadcn/ui primitives are used;
- header and footer are not duplicated;
- desktop, tablet and mobile layouts are reviewed;
- `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` pass or failures are documented.
