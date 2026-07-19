# 05 — Documentation Home Stitch Review

Source page: Stitch export shared during the design filling phase.

Target route: `/{locale}/docs`  
Interface ID: `docs.home`  
Implementation sprint: `docs/sprints/sprint-06d-docs-home-ui.md`

## Verdict

The Stitch output gives a strong direction for the documentation home page, especially the search-first hero, customer path selector, documentation categories, highlighted guides and support bridge.

However, the output must not be implemented directly. It includes full page chrome, a fixed header, a documentation sidebar, a footer, Tailwind CDN setup, Google Fonts, Material Symbols, inline CSS, inline JavaScript and generated design tokens that do not match the project token system.

This output should be treated as UX inspiration only.

## Keep

Keep the following page-level ideas:

1. Search-first documentation hero.
2. Breadcrumb inside docs content.
3. Quick action chips: Start here, Installation, Activation, Troubleshooting.
4. Path selector for Starter, Pro and Managed.
5. Documentation category grid.
6. Highlighted guides section.
7. Support bridge section.
8. Version/release note card.
9. Subtle review/compatibility notice.

## Do not keep

Do not reuse or port:

1. The generated `<header>`.
2. The generated global footer.
3. Tailwind CDN configuration.
4. Google Fonts external links.
5. Material Symbols.
6. Inline CSS.
7. Inline JavaScript for command search.
8. Generated color names such as `surface-container`, `on-surface-variant`, `primary-fixed-dim`.
9. Fixed version labels such as `Engine v2.4` or `v2.4.0 Stable` unless the value comes from approved release data.
10. Fake or unapproved product claims.

## Header, sidebar and footer decision

The generated header and footer are rejected.

The generated docs sidebar can only be used as inspiration for a future reusable docs layout component, not as duplicated page content. For this sprint, implement only the documentation home content within the existing app shell.

Allowed page-level navigation:

- breadcrumb;
- local quick links;
- documentation category cards;
- search command visual;
- version selector/card;
- support/documentation path cards.

Not allowed:

- marketing header;
- account/admin header;
- global footer;
- duplicated legal/footer links;
- separate docs top navbar invented by Stitch.

## Color review

Stitch generated a palette close to Material-style tokens:

```text
#091421
#16202e
#212b39
#2b3544
#ffb690
#e0c0b1
#d9e3f6
#a78b7d
#00a2f4
#93ccff
```

Do not keep this raw palette.

Map to the platform palette:

```text
background        #0B0F19
card              #111827
cardSubtle        #0F172A
border            #1F2937
slate surface     #334155
accent orange     #F97316
success           #22C55E
warning           #F59E0B
danger            #EF4444
main text         #F8FAFC
secondary text    #94A3B8
```

Implementation rule:

- use the existing Tailwind/shadcn tokens when available;
- add or adjust token mapping centrally if required;
- do not scatter raw hex values inside components;
- no per-page color system;
- no generated Material-style color vocabulary.

## Copywriting corrections

Replace or soften these generated claims:

```text
Engine v2.4
v2.4.0 Stable
Technical Docs
View on GitHub
© 2024 Template Engine
Built for WooCommerce developers
free vs premium coverage
dedicated priority support channels
avoid legal non-compliance
validating your purchase code
Stripe / PayPal
B2B / B2C / Marketplace
Theme Compatible v2.4.0+
```

Safer alternatives:

```text
Current documentation
Versioned documentation
Official release notes
Support paths depend on your plan
Official access activation
Store payments
Shop models: dropshipping, stock, hybrid, digital
Compatibility must match the approved release
Documentation is reviewed per release
```

Do not invent current versions, years, compatibility statements, GitHub links, support plans or provider names unless they are already approved in source data.

## Required content structure

The implemented page should include:

1. Breadcrumb: Home / Docs.
2. Hero:
   - badge: Documentation;
   - headline about installing, activating and operating the Template Engine;
   - short explanation;
   - search command visual.
3. Quick actions:
   - Start here;
   - Installation;
   - Activation;
   - Troubleshooting.
4. Path selector:
   - Starter self-install;
   - Pro guided launch;
   - Managed operations.
5. Documentation category grid:
   - Getting started;
   - Requirements;
   - Installation;
   - Activation and licenses;
   - Initial setup;
   - Shop models;
   - Niches;
   - Localization;
   - Products;
   - Payments;
   - Customization;
   - Updates;
   - Backup and rollback;
   - Troubleshooting;
   - Release notes.
6. Highlighted guides:
   - Install from a clean WordPress environment;
   - Activate official access safely;
   - Prepare backup and rollback before updates.
7. Support bridge:
   - Check troubleshooting;
   - Open account support request;
   - Compare Pro and Managed support.
8. Review notice:
   - documentation is versioned;
   - compatibility, legal and support claims must match approved release and review state.
9. Version/release card:
   - current docs version placeholder or approved value;
   - compatible theme version placeholder or approved value;
   - release notes link.

## Component expectations

Use project-compatible components:

- `Button`;
- `Card`;
- `Badge`;
- `Alert`;
- `Separator`;
- `Breadcrumb` if available;
- `Command` or command-style search visual;
- `Input` if available;
- `lucide-react` icons.

Do not use Material Symbols. The project already has `lucide-react` available.

## Responsive rules

Desktop:

- spacious docs landing layout;
- search visible above the fold;
- category grid readable;
- version card and support bridge not buried.

Tablet:

- keep 2-column category grids when comfortable;
- avoid fixed sidebars.

Mobile:

- search first;
- quick links directly under hero;
- path cards stack;
- categories become single-column or compact two-column only if readable;
- no horizontal overflow;
- no fixed sidebar.

## Accessibility rules

- Search input must have an accessible label.
- Cards must use semantic headings.
- Links and buttons must have clear labels.
- Do not rely only on icons.
- Keyboard focus states must remain visible.
- Contrast must follow the platform dark theme.

## Acceptance criteria

The page is acceptable only if:

- no header or footer is duplicated;
- no raw Stitch HTML is copied;
- no Tailwind CDN, Google Fonts, Material Symbols or inline JS remains;
- the content starts below the existing shell header and ends before the existing footer;
- colors are tokenized centrally;
- unsupported claims and fake version numbers are removed;
- the page works in FR and EN;
- search is visually prominent;
- Starter, Pro and Managed documentation paths are clear;
- installation, activation, troubleshooting and release notes are easy to find;
- desktop, tablet and mobile layouts are all intentionally reviewed.
