# 02 — Pricing Page Stitch Prompt

Route: `/{locale}/pricing`  
Interface ID: `marketing.pricing`  
Priority: Critical  
Goal: Help visitors understand Starter, Pro and Managed, then choose the correct commercial path.

## Prompt to paste into Stitch

```text
Build the complete responsive main content for the Template Engine Platform pricing page.

Use shadcn/ui as the primary design system. Use 21st.dev components only when they integrate perfectly with shadcn/ui. Do not invent a custom design system. Think in React + TypeScript + Tailwind for a Next.js App Router project.

Scope boundary:
- Design only the page-specific content between the existing global header and existing global footer.
- Do not design or include a header, navbar, mobile menu, language switcher, account dropdown or footer.
- The page should start with the pricing hero/content intro and end with the final pricing CTA.

Product context:
Template Engine Platform sells commercial access to a modular WooCommerce Template Engine. The offers are Starter, Pro and Managed.

Important: the technical license key controls official services such as downloads, updates, activation records and support. Do not imply that a key removes rights already granted by the software license.

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
- danger #EF4444
- Manrope titles
- Inter body
- rounded-xl cards
- minimal gradients only if very subtle
- no glassmorphism
- no fake logos
- no fake testimonials

Page objective:
Make the visitor understand which offer fits them:
- Starter: technical customer, self-installation;
- Pro: customer wants guided setup;
- Managed: customer wants ongoing validation, maintenance and operational support.

Top content section:
- badge: “Commercial access plans”
- headline: “Choose the level of support behind your WooCommerce Template Engine.”
- subheadline: “Start with the official template package, then add onboarding or managed operational support depending on how much help you want around launch and updates.”
- primary CTA: “Start with Starter”
- secondary CTA: “Compare all features”

Pricing cards:
Create three main cards using shadcn Card, Badge, Button and Separator.

Card 1: Starter
- label: Self-install
- audience: “For technical entrepreneurs and agencies.”
- include:
  - official theme download access
  - license key for official services
  - documentation
  - release notes
  - self-managed installation
- CTA: “Choose Starter”
- visual status: solid but not highlighted as default best option

Card 2: Pro
- label: Guided launch
- audience: “For customers who want help setting up their first store.”
- include:
  - everything in Starter
  - onboarding checklist
  - setup guidance
  - staging validation path
  - launch support boundary
- CTA: “Choose Pro”
- mark as recommended with an orange badge, but keep tasteful

Card 3: Managed
- label: Operational support
- audience: “For customers who want ongoing help around updates, validation and operational continuity.”
- include:
  - everything in Pro
  - managed validation workflow
  - update planning
  - rollback guidance
  - priority operational support boundary
- CTA: “Talk to us”
- include “Custom scope” instead of fake fixed price if exact pricing is unknown

Do not invent final prices if they are not approved. Use placeholders like “Launch price to be confirmed” or “Custom scope” in a polished way.

Comparison section:
Use a shadcn Table or DataTable style comparison with categories:
- Official download access
- License key and activations
- Documentation
- Self-installation
- Guided setup
- Staging validation
- Managed update planning
- Support path
- Best for

Use check icons and short labels, not long paragraphs.

Decision helper:
Use Tabs or Cards titled “Which plan should I choose?”
- “I can install WordPress myself” → Starter
- “I need help launching the first store” → Pro
- “I want ongoing operational help” → Managed

License explanation block:
Use an Alert or Card that explains:
“The key controls official access, updates, downloads, activation records and support services. It does not disable your storefront or checkout.”
Keep it clear and reassuring.

FAQ section:
Use Accordion with questions:
- Can I change niche after purchase?
- Can I use the template for dropshipping and stock?
- Does the license disable my store?
- Is installation included in Starter?
- What is different between Pro and Managed?
- Can I start with Starter and upgrade later?

Final CTA:
Headline: “Start with the path that matches your launch capacity.”
Buttons: “Choose Starter” and “Contact for Managed”.

Responsive requirements:
- On desktop, cards should align in a 3-column grid.
- On tablet, the recommended plan should remain visually clear.
- On mobile, cards must stack with the CTA visible without excessive scrolling.
- The comparison table must become mobile-readable, possibly with grouped cards.

Accessibility:
- High contrast.
- Keyboard focus.
- Clear hierarchy.
- No meaning communicated by color alone.

Do not include:
- any global header or navigation;
- any global footer;
- fake discounts;
- fake countdown timers;
- invented revenue claims;
- fake customer logos;
- binding legal terms presented as final;
- aggressive sales language.

Output a complete implementation-friendly pricing main content design, excluding header and footer.
```

## Review criteria

The generated pricing page is acceptable only if:

- the difference between Starter, Pro and Managed is obvious;
- Pro can be recommended without making Starter look useless;
- Managed feels premium but not vague;
- the license explanation is clear and legally careful;
- the comparison table is mobile-friendly;
- no header, navbar, mobile menu or footer is generated;
- no final prices are invented unless explicitly supplied later.