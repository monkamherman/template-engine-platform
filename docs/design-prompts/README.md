# Design Prompt Book — Template Engine Platform

## Purpose

This directory is the source of truth for generating high-quality interface designs with Stitch or another AI design tool before implementation inside `template-engine-platform`.

The application skeleton already defines the route map and page responsibilities. This prompt book starts the first vertical finishing wave: each important page receives a precise design prompt, then the accepted output is translated into Next.js, Tailwind and shadcn/ui components.

## Design generation rule

Every generated page must preserve the same product identity:

- premium SaaS;
- modular ecommerce technology;
- trustworthy and commercial;
- fast to understand for non-technical entrepreneurs;
- dark mode first;
- precise spacing and high readability;
- production-ready, not placeholder-looking.

## Required design system

All prompts must instruct the design tool to use:

1. `shadcn/ui` as the primary component system;
2. `21st.dev` components only when they integrate cleanly with shadcn/ui and do not break the visual identity;
3. React + TypeScript component thinking;
4. Tailwind utility classes;
5. accessible semantic structure.

Do not accept outputs that invent a full custom UI kit when shadcn/ui primitives would solve the interface.

## Shared visual identity

Use the project identity consistently:

- background: `#0B0F19`;
- elevated cards: `#111827`;
- deep slate: `#334155`;
- borders: `#1F2937`;
- orange accent: `#F97316`;
- success: `#22C55E`;
- warning: `#F59E0B`;
- danger: `#EF4444`;
- main text: `#F8FAFC`;
- secondary text: `#94A3B8`;
- titles: Manrope;
- body: Inter;
- shape language: `rounded-xl`, clean cards, no excessive glow;
- animation: subtle, fast, professional.

## Workflow

1. Select one prompt from this directory.
2. Paste it into Stitch.
3. Generate the page.
4. Export screenshots and code when available.
5. Review visual quality, UX hierarchy, mobile behavior and component realism.
6. Create a refinement prompt if needed.
7. Only after validation, translate the result into the Next.js implementation.

## Page priority

The first wave focuses on the pages that sell and explain the product:

1. `01-marketing-home.md` — public landing page;
2. `02-pricing.md` — offer comparison;
3. `03-features.md` — product capabilities;
4. `04-demos.md` — demo index;
5. `05-docs-home.md` — documentation entry point.

Later waves should cover authentication, customer account, checkout, documentation detail pages and admin operations.

## Acceptance checklist for every Stitch output

A generated interface is not ready unless it satisfies all of the following:

- The page clearly communicates its main purpose within five seconds.
- The layout is responsive across desktop, tablet and mobile.
- The output uses shadcn/ui-compatible components such as Card, Button, Badge, Tabs, Accordion, Table, Dialog, Sheet, Command, Alert or Breadcrumb where relevant.
- Primary and secondary calls to action are visually distinct.
- The orange accent is used sparingly for action and focus, not as decorative noise.
- The page avoids fake testimonials, fake customer logos and invented performance metrics.
- Text remains credible and does not overpromise legal, financial, supplier or technical guarantees.
- The design can realistically be implemented inside the current Next.js app without rewriting the architecture.

## Integration note

These prompts are design instructions only. They do not replace the runtime source of truth in `config/interface-registry.ts`, nor the route definitions and product rules documented in `docs/interface-inventory.md`, `docs/product-scope.md` and `AGENTS.md`.
