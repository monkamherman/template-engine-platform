# 03 — Features Page Stitch Prompt

Route: `/{locale}/features`  
Interface ID: `marketing.features`  
Priority: High  
Goal: Explain the platform and template capabilities without turning the page into a technical manual.

## Prompt to paste into Stitch

```text
Build a complete responsive Features page for Template Engine Platform.

Use shadcn/ui as the primary design system. Use 21st.dev components only when they integrate perfectly with shadcn/ui. Do not invent a separate component library. Think in React + TypeScript + Tailwind for a Next.js App Router project.

Product context:
Template Engine Platform is the commercial platform around a modular WooCommerce Template Engine. It helps customers access official downloads, licenses, documentation, onboarding and support for launching ecommerce stores with reusable sections, niche presets, localization and different shop models.

Visual identity:
- premium SaaS
- dark mode first
- background #0B0F19
- cards #111827
- borders #1F2937
- orange accent #F97316
- main text #F8FAFC
- secondary text #94A3B8
- success #22C55E
- warning #F59E0B
- Manrope titles
- Inter body
- rounded-xl
- clean spacing
- subtle professional shadows
- no glassmorphism
- no fake logos
- no fake testimonials
- no irrelevant AI imagery

Page objective:
Show the visitor that the product is not just a theme. It is a commercial template engine system with modular storefront design, shop model adaptation, official licensing, documentation and support paths.

Hero:
- badge: “Features”
- headline: “Everything needed to turn one WooCommerce foundation into several launch-ready store models.”
- subheadline: “Reusable sections, niche presets, localization, official access and support workflows are organized so each launch starts from a system instead of a blank page.”
- primary CTA: “Explore demos”
- secondary CTA: “View pricing”

Hero visual:
Create a modular architecture visual with layered cards:
- WooCommerce core
- Theme sections
- Niche presets
- Market and language
- License access
- Docs and support
The visual should look like a clean product system map, not a network cloud or crypto dashboard.

Feature category section:
Use Tabs with four categories:
1. Storefront engine
2. Commercial access
3. Launch operations
4. Documentation and support

Inside each tab, show 4 to 6 feature cards.

Storefront engine cards:
- Modular landing sections
- Product page blocks
- Checkout-focused structure
- Theme presets for different niches
- WooCommerce-native flow

Commercial access cards:
- Official release access
- License activations
- Production and staging logic
- Account portal
- Protected downloads

Launch operations cards:
- Starter self-install path
- Pro onboarding path
- Managed validation path
- Update and rollback preparation
- Release compatibility notes

Documentation and support cards:
- Getting started guide
- Installation guide
- Activation guide
- Troubleshooting
- Versioned release notes
- Support requests

Use shadcn Card, Badge, Tabs and Button components.

Shop model section:
Title: “Built for several ecommerce models.”
Create four cards or a 2x2 grid:
- Dropshipping
- Stock commerce
- Hybrid commerce
- Digital products
Each card must show what changes in the storefront and operations.

Niche and market section:
Show that the engine supports changing niche, market, language and currency. Use a visual flow:
“Choose niche → Adjust market → Select language → Configure store model → Launch and validate”.
Use Stepper-style cards or Timeline-style cards compatible with shadcn.

License and service boundary section:
Use an Alert and explanatory cards:
- The license key controls official services, updates, downloads and support.
- The storefront must not depend on the license server to render.
- Starter, Pro and Managed define service levels, not magic automation.

Implementation confidence section:
Add a section for technical buyers:
- Next.js platform for commercial operations
- WooCommerce/Sage theme product
- PostgreSQL/Prisma platform data model
- Versioned docs and release workflow
- Security-first license protocol
Keep it accessible; do not overload with code.

Final CTA:
Headline: “Use features as a launch system, not a checklist.”
Buttons: “View pricing” and “Open documentation”.

Responsive requirements:
- Desktop: clear category navigation and rich cards.
- Tablet: feature categories must remain readable.
- Mobile: tabs or sections should stack cleanly without long dense paragraphs.

Accessibility:
- Semantic headings.
- Clear focus states.
- High contrast.
- Icons must be decorative or have proper labels.

Do not include:
- fake automation claims;
- fake metrics;
- fake customer logos;
- exaggerated AI language;
- promise of guaranteed sales;
- confusing SaaS analytics dashboards unrelated to ecommerce.

Output a complete implementation-friendly features page design.
```

## Review criteria

The generated Features page is acceptable only if:

- it explains modularity clearly;
- it separates storefront features from platform/license/service features;
- it is not just a generic grid of icons;
- it remains understandable for entrepreneurs;
- it gives technical buyers confidence without becoming developer documentation.
