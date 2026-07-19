# Global Stitch Guidelines

Use this block at the beginning of every Stitch prompt unless a page-specific prompt already includes it.

```text
Build a production-ready responsive web interface for Template Engine Platform, a commercial platform that sells, licenses, documents and supports a modular WooCommerce Template Engine.

Use shadcn/ui as the primary design system. Use 21st.dev components only when they integrate perfectly with shadcn/ui and keep the same visual language. Do not invent a separate component library.

Use React + TypeScript + Tailwind thinking. Design components that can be implemented in a Next.js App Router project.

Visual identity:
- premium SaaS
- modular ecommerce technology
- trustworthy, elegant, technical, fast
- dark mode first
- background #0B0F19
- elevated cards #111827
- border #1F2937
- slate surfaces #334155
- orange accent #F97316
- success #22C55E
- warning #F59E0B
- danger #EF4444
- main text #F8FAFC
- secondary text #94A3B8
- titles in Manrope
- body in Inter
- rounded-xl cards
- generous spacing
- subtle shadows
- no heavy gradients
- no glassmorphism
- no neumorphism
- no fake customer logos
- no fake testimonials
- no invented metrics

The page must feel like a real commercial SaaS/product platform, not a generic template.

All states must be realistic: loading, empty, disabled and error states when relevant.

Prioritize clarity over decoration. Every visual element must help the visitor understand the product or take the next action.
```

## Reusable component expectations

Prefer these component patterns:

- `Button` for primary and secondary actions;
- `Card` for feature, offer, license, documentation and metric groups;
- `Badge` for plan labels, status and categories;
- `Tabs` for comparing store models, plans or implementation paths;
- `Accordion` for FAQ and detailed explanations;
- `Table` or `DataTable` for account/admin lists;
- `Dialog` for confirmation flows;
- `Sheet` for mobile navigation or contextual panels;
- `Alert` for warnings, legal review states or activation problems;
- `Breadcrumb` for documentation and account/admin depths;
- `Command` for documentation search or admin search;
- `Tooltip` for technical labels.

## Layout rules

- Desktop max width should feel premium, usually 1120px to 1280px.
- Use a sticky top navigation when useful, but avoid heavy chrome.
- Keep the first viewport very clear: headline, short explanation, primary CTA, secondary CTA and strong visual proof of the product.
- Use section rhythm: hero, value proof, explanation, comparison, conversion.
- Mobile must be designed intentionally, not simply stacked without hierarchy.

## Content rules

The product should be explained as:

> A commercial platform for launching, licensing and supporting a modular WooCommerce Template Engine that can adapt to niche, market, language and store model.

Use the offers:

- Starter: self-install, license, documentation, official downloads;
- Pro: accompanied setup and onboarding;
- Managed: validation, maintenance and operational support.

Do not claim automatic universal deployment or guaranteed sales. Do not imply that a license key removes rights already granted by the software license. The key controls official services, updates, downloads and support.

## Output expectation

Ask Stitch for a complete page design, not just a hero section. The output should include desktop and mobile considerations, component names and implementation-friendly structure.
