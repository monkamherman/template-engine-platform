# 01 — Marketing Home Page Stitch Prompt

Route: `/{locale}`  
Interface ID: `marketing.home`  
Priority: Critical  
Goal: Convert a first-time visitor into someone who understands the product and clicks pricing, demo or documentation.

## Prompt to paste into Stitch

```text
Build a complete responsive landing page for Template Engine Platform.

Use shadcn/ui as the primary design system. Use 21st.dev components only when they integrate perfectly with shadcn/ui. Do not invent a separate component library. Think in React + TypeScript + Tailwind for a Next.js App Router project.

Product context:
Template Engine Platform is the commercial platform for a modular WooCommerce Template Engine. It helps entrepreneurs, agencies and technical operators launch ecommerce stores faster by using a reusable WooCommerce theme foundation that can adapt to niche, market, language and shop model.

The platform sells access, official downloads, licenses, documentation, onboarding and support for the WooCommerce Template Engine.

The page must be clear for non-technical entrepreneurs while still credible for technical users.

Visual identity:
- premium SaaS
- modular ecommerce technology
- dark mode first
- background #0B0F19
- elevated cards #111827
- border #1F2937
- orange accent #F97316
- main text #F8FAFC
- secondary text #94A3B8
- success #22C55E
- warning #F59E0B
- titles Manrope
- body Inter
- rounded-xl cards
- clean spacing
- subtle professional shadows
- no glassmorphism
- no fake logos
- no fake testimonials
- no invented statistics

Page objective:
Explain in less than five seconds that the product is a ready commercial system for launching WooCommerce stores faster with reusable templates, official license access, documentation and optional support.

Top navigation:
- Logo placeholder: Template Engine
- Links: Product, Features, Demos, Pricing, Docs
- Secondary action: Sign in
- Primary action: View pricing
- Mobile: use shadcn Sheet navigation

Hero section:
Create a strong hero with:
- small badge: “WooCommerce Template Engine”
- headline: “Launch niche WooCommerce stores faster with one modular commercial engine.”
- subheadline: “Use a reusable storefront foundation, official downloads, license access, documentation and optional onboarding to test products, markets and shop models without rebuilding from zero.”
- primary CTA: “View plans”
- secondary CTA: “Explore demos”
- third text link: “Read the documentation”

Hero visual:
Create a premium dashboard-style product visual, not a generic illustration. It should show:
- a central store template preview card;
- modules around it: Niche, Language, Market, Store model, License, Documentation;
- a small license status chip;
- a mini offer selector with Starter, Pro, Managed;
- subtle orange highlights.

Do not make it look like crypto, AI chatbot, generic analytics or random ecommerce mockup. It must communicate modular ecommerce setup.

Trust/value strip:
Use three or four compact cards:
- Change niche faster
- Adapt language and market
- Support dropshipping, stock, hybrid and digital models
- Keep updates and support under official access

Main explanation section:
Title: “One engine, several ecommerce paths.”
Use Tabs or segmented cards for four shop models:
- Dropshipping: supplier-ready catalog logic
- Stock: inventory-managed commerce
- Hybrid: physical offer plus digital bonus or supplier support
- Digital: downloads, bundles, templates or online products

Each model must have a concise explanation and a small visual marker.

Feature grid:
Use shadcn Cards with icons and short text:
- WooCommerce-native foundation
- Modular landing sections
- Multi-niche presets
- Market and language adaptation
- Official license access
- Documentation and onboarding
- Release and update workflow
- Support paths for Pro and Managed

Offer preview section:
Show three pricing preview cards without final prices if needed:
- Starter: self-install, official download, license, documentation
- Pro: accompanied setup and onboarding
- Managed: validation, maintenance and operational support

Use badges to distinguish “Self-install”, “Guided”, “Operational support”.
Primary action: “Compare plans”.

Documentation preview:
Add a section showing the product is documented, with cards:
- Getting started
- Installation
- Activation
- Shop models
- Updates and rollback

Use a Command/Search visual or documentation sidebar preview if useful.

Final CTA:
Headline: “Prepare your next ecommerce launch with a system, not a blank page.”
Buttons: “View pricing” and “Open documentation”.

Footer:
Simple footer with Product, Docs, Legal, Account.

Responsive requirements:
- Desktop layout must feel premium and spacious.
- Tablet must keep the hero visual readable.
- Mobile must prioritize headline, CTAs and explanation, then collapse modules into cards.
- Avoid tiny unreadable dashboard details on mobile.

Accessibility:
- High contrast.
- Visible focus states.
- Semantic headings.
- Buttons must have clear labels.

Do not include:
- fake customer logos;
- fake testimonials;
- fake revenue claims;
- “guaranteed sales” language;
- legal claims about license rights;
- overly flashy gradients;
- irrelevant AI/robot imagery.

Output a complete page design with clear sections and implementation-friendly component structure.
```

## Review criteria

The generated home page is acceptable only if:

- the product can be understood without technical explanation;
- the hero visual communicates modular ecommerce, not generic SaaS analytics;
- Starter, Pro and Managed appear as commercial paths;
- shadcn/ui primitives are visible in the structure;
- mobile is not an afterthought;
- no fake proof or overpromise is present.
