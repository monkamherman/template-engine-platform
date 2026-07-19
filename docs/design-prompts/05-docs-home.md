# 05 — Documentation Home Stitch Prompt

Route: `/{locale}/docs`  
Interface ID: `docs.home`  
Priority: High  
Goal: Give customers a calm and useful entry point into setup, activation, launch and support documentation.

## Prompt to paste into Stitch

```text
Build the complete responsive main content for the Template Engine Platform Documentation Home page.

Use shadcn/ui as the primary design system. Use 21st.dev components only when they integrate perfectly with shadcn/ui. Do not invent a separate component library. Think in React + TypeScript + Tailwind for a Next.js App Router project.

Scope boundary:
- Design only the page-specific content between the existing global header and existing global footer.
- Do not design or include a header, navbar, mobile menu, language switcher, account dropdown or footer.
- Do not design the global documentation shell navigation unless it is a page-specific docs sidebar inside the content.
- The page should start with the documentation breadcrumb/search/hero content and end with the support/version section or final docs CTA.

Product context:
Template Engine Platform provides commercial access, official downloads, license activation, documentation, onboarding and support for a modular WooCommerce Template Engine.

The Documentation Home page helps customers find the right setup path: getting started, requirements, installation, activation, shop models, localization, updates, backup, rollback and troubleshooting.

Visual identity:
- premium SaaS documentation
- calm, technical, readable
- dark mode first
- background #0B0F19
- cards #111827
- borders #1F2937
- orange accent #F97316
- main text #F8FAFC
- secondary text #94A3B8
- success #22C55E
- warning #F59E0B
- danger #EF4444
- Manrope titles
- Inter body
- rounded-xl
- high readability
- no flashy marketing visuals
- no fake metrics

Page objective:
Make users feel they can install, configure and maintain the product without being lost.

Docs content layout:
Use a documentation-focused main content layout:
- breadcrumb inside the page content: Home / Docs;
- main search input using shadcn Command style;
- optional right-side “Current version” card;
- optional page-specific docs category sidebar only if it helps the content.

Hero:
- badge: “Documentation”
- headline: “Install, activate and operate your WooCommerce Template Engine with confidence.”
- subheadline: “Find the right guide for self-installation, guided setup, official license access, store model configuration, updates and troubleshooting.”
- search placeholder: “Search installation, activation, shop models...”
- quick action buttons: “Start here”, “Installation”, “Activation”, “Troubleshooting”

Path selector section:
Use Cards or Tabs titled “Choose your path”.

Cards:
1. Starter self-install
- For technical users installing the theme themselves.
- Links: Requirements, Installation, Activation, Initial setup.

2. Pro guided launch
- For customers following onboarding support.
- Links: Getting started, Onboarding checklist, Staging validation, Launch preparation.

3. Managed operations
- For customers using ongoing update and validation support.
- Links: Updates, Backup and rollback, Release notes, Support.

Documentation categories:
Create a grid of category cards:
- Getting started
- Requirements
- Installation
- Activation and licenses
- Initial setup
- Shop models
- Niches
- Localization
- Products
- Payments
- Customization
- Updates
- Backup and rollback
- Troubleshooting
- Release notes

Each card should show:
- icon;
- title;
- short description;
- 2 or 3 small link chips;
- status badge if useful: Essential, Setup, Operations, Support.

Highlighted guide section:
Create a horizontal feature section with three important guides:
- “Install from a clean WordPress environment”
- “Activate official access safely”
- “Prepare backup and rollback before updates”

Use shadcn Card and Button components.

Support bridge:
Add a section titled “Need help after reading?”
Cards:
- Check troubleshooting
- Open account support request
- Compare Pro and Managed support

Legal/review notice:
Use a subtle Alert:
“Documentation is versioned. Compatibility, legal and support claims must match the approved release and review state.”
Do not make this alarming; make it professional.

Version section:
Show a small version selector or card:
- Current docs version
- Compatible theme version
- Last updated placeholder
- Link to release notes

Responsive requirements:
- Desktop: documentation content with search and category grid.
- Tablet: maintain readable cards and search prominence.
- Mobile: search first, then path selector, then category cards.
- Avoid dense multi-column text on mobile.

Accessibility:
- Search input has label.
- Cards have semantic headings.
- Links are clearly visible.
- Focus states visible.
- Do not rely only on icon meaning.

Do not include:
- any global header or navigation;
- any global footer;
- fake version numbers unless marked as placeholder;
- unapproved legal promises;
- generic blog layout;
- unrelated developer docs visuals;
- overly flashy marketing gradients.

Output a complete implementation-friendly documentation home main content design, excluding header and footer.
```

## Review criteria

The generated Documentation Home page is acceptable only if:

- it feels like a real customer documentation portal;
- search is prominent;
- Starter, Pro and Managed support paths are clear;
- activation, installation and troubleshooting are easy to find;
- the layout is calm and readable;
- mobile starts with search and essential paths;
- no header, navbar, mobile menu or footer is generated.