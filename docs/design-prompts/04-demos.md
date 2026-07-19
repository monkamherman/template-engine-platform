# 04 — Demos Page Stitch Prompt

Route: `/{locale}/demos`  
Interface ID: `marketing.demos`  
Priority: High  
Goal: Let visitors see concrete store scenarios and understand how the same engine adapts to niche, market and shop model.

## Prompt to paste into Stitch

```text
Build the complete responsive main content for the Template Engine Platform Demos index page.

Use shadcn/ui as the primary design system. Use 21st.dev components only when they integrate perfectly with shadcn/ui. Do not invent a separate component library. Think in React + TypeScript + Tailwind for a Next.js App Router project.

Scope boundary:
- Design only the page-specific content between the existing global header and existing global footer.
- Do not design or include a header, navbar, mobile menu, language switcher, account dropdown or footer.
- The page should start with the demos hero/content intro and end with the final demos CTA.

Product context:
Template Engine Platform sells commercial access to a modular WooCommerce Template Engine. The Demos page should show example store configurations that can be used as inspiration before choosing Starter, Pro or Managed.

The demos are not fake customer stores. They are product demonstration scenarios.

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
- subtle shadows
- no fake logos
- no fake testimonials
- no exaggerated metrics

Page objective:
Help a visitor understand that the same Template Engine can support different ecommerce launch scenarios: dropshipping, stock, hybrid and digital.

Hero:
- badge: “Store demonstrations”
- headline: “Explore store scenarios built from the same modular WooCommerce engine.”
- subheadline: “Compare niches, markets, languages and shop models before choosing the launch path that fits your project.”
- primary CTA: “View pricing”
- secondary CTA: “Read setup docs”

Hero visual:
Show a clean gallery preview with several storefront cards arranged like a product catalog. Each card should include:
- niche label;
- store model badge;
- market/language chip;
- small screenshot placeholder area;
- activation/support status chip.

Filters section:
Use shadcn Tabs, Select, Badge or Command-compatible design.
Filters should include:
- All
- Dropshipping
- Stock
- Hybrid
- Digital
- English market
- French market

Demo cards:
Create a grid of demo scenario cards. Use these example scenarios:

1. Productivity Remote Workers
- model: Hybrid
- market: US/EU
- language: English
- description: physical productivity product with digital bonus and upsell path
- CTA: “View scenario”

2. Supplier Starter Store
- model: Dropshipping
- market: US
- language: English
- description: supplier-ready physical catalog using WooCommerce as commerce core
- CTA: “View scenario”

3. Local Stock Essentials
- model: Stock
- market: France
- language: French
- description: local inventory commerce with trust-focused product presentation
- CTA: “View scenario”

4. Digital Bundle Studio
- model: Digital
- market: US/EU
- language: English
- description: digital products, templates or bundles with instant-access positioning
- CTA: “View scenario”

Each demo card must include:
- thumbnail placeholder that looks like a storefront preview;
- status badge: Demo scenario;
- model badge;
- market/language chips;
- short feature list;
- CTA button.

Comparison section:
Use a table or card matrix showing how each model differs:
- Product type
- Shipping
- Supplier logic
- Stock handling
- Digital delivery
- Recommended offer

Use clear visual chips instead of dense text.

Educational section:
Add a section titled “What changes between demos?” with 4 explanation cards:
- Niche positioning
- Market and language
- Product and fulfillment model
- Support path and launch operations

Important note:
Use an Alert component to clarify:
“These demos are illustrative configurations. Final store content, supplier claims, payment settings and legal text must be adapted and validated for each launch market.”

Final CTA:
Headline: “Found a model close to your project?”
Buttons: “Compare plans” and “Open documentation”.

Responsive requirements:
- Desktop: demo cards in a polished grid.
- Tablet: 2-column cards.
- Mobile: single-column cards with filter controls at top.
- Filters must not overflow on mobile.

Accessibility:
- Clear card headings.
- Keyboard navigable filters.
- Badges must not be the only source of meaning.
- High contrast.

Do not include:
- any global header or navigation;
- any global footer;
- fake customer logos;
- fake revenue screenshots;
- fake store reviews;
- unrealistic generated storefront thumbnails;
- claims that demos are live customer stores;
- overly decorative backgrounds that hide the cards.

Output a complete implementation-friendly demos index main content design, excluding header and footer.
```

## Review criteria

The generated Demos page is acceptable only if:

- it communicates scenario exploration rather than fake proof;
- filters are practical and shadcn-compatible;
- each demo card shows niche, market, language and model;
- the page helps visitors choose between Starter, Pro and Managed;
- mobile card browsing is clear;
- no header, navbar, mobile menu or footer is generated.