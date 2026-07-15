# Brand Guidelines

## Brand

Working name: Template Engine Platform.

The visual identity follows the approved Sprint 02 direction: premium modular tech. The system uses a black and ivory base activated by a disciplined orange accent.

## Final Logo

The selected logo is Concept A: Monoline continu.

The final symbol is a compact TE monogram built from a uniform rounded stroke. It suggests a controlled engine path, shared foundation and modular configuration flow without using literal ecommerce icons.

Final assets:

- `public/brand/logo-mark.svg`
- `public/brand/logo-lockup-horizontal.svg`
- `public/brand/logo-lockup-stacked.svg`
- `public/brand/logo-mark-white.svg`
- `public/brand/logo-mark-black.svg`
- `public/brand/favicon.svg`

The rejected concepts B and C remain archived under `public/brand/concepts/` as Sprint 02 exploration references.

## Clear Space

Use the logo stroke width as the minimum clear-space unit. In the SVG source, the mark uses a 12 px stroke in a 96 px viewBox. Keep at least one stroke-width of empty space around the mark or lockup.

## Minimum Size

- Logo mark: 24 px minimum.
- Horizontal lockup: 140 px wide minimum.
- Stacked lockup: 96 px wide minimum.

At sizes below these limits, use only the mark.

## Approved Variants

- Black mark on ivory, canvas or white backgrounds.
- White mark on brand ink or very dark backgrounds.
- Horizontal lockup for navigation, headers and standard brand placement.
- Stacked lockup for square or centered placements.
- Favicon only for browser icon and compact app surfaces.

## Backgrounds

Preferred backgrounds:

- `brand-ivory` `#F4F0E7`
- `brand-canvas` `#FAFAF7`
- white
- `brand-ink` `#0B0B0C` with the white mark

Do not place the black mark on dark, low-contrast or visually busy backgrounds.

## Prohibited Uses

- Do not stretch, rotate or skew the logo.
- Do not add gradients, shadows, textures or 3D effects.
- Do not recolor the mark outside the approved black and white variants.
- Do not replace the mark with a cart, robot, cloud, payment or AI symbol.
- Do not place text or badges inside the clear-space area.
- Do not use orange as the dominant logo color.

## Palette

Core tokens:

- `brand-ink`: `#0B0B0C`
- `brand-ivory`: `#F4F0E7`
- `brand-canvas`: `#FAFAF7`
- `brand-slate`: `#3A404C`
- `brand-border`: `#D9DCE2`
- `brand-orange`: `#FF6B00`
- `brand-orange-strong`: `#D94F00`
- `brand-orange-soft`: `#FFF0E5`

Functional colors are separate from brand orange:

- `success`: `#0F7A4F`
- `warning`: `#9A5B00`
- `danger`: `#B42318`
- `info`: `#155EEF`

## Typography

- Manrope for headings, large marketing messages and important numbers.
- Inter for body copy, controls, forms, tables and account/admin interfaces.

Both families are integrated locally through Next font handling and should not be imported separately in components.

## Interface Principles

- Use ivory and canvas as quiet foundations.
- Use orange for primary actions, active states and conversion emphasis only.
- Prefer borders and surface contrast over heavy shadows.
- Keep focus states visible and orange.
- Keep functional state colors distinct from the brand accent.
- Avoid fake metrics, fake customer logos and invented testimonials.
