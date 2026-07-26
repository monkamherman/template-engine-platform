# Sprint SEO-01 — Public SEO Foundation

## Scope

Implement the production SEO foundation for public Template Engine Platform routes without changing product claims, legal wording, checkout behavior or authenticated areas.

## Deliverables

- Replace placeholder metadata domain handling with `APP_URL`.
- Add localized canonical and hreflang metadata for public marketing, documentation and legal pages.
- Add a sitemap for public indexable marketing, documentation and legal routes.
- Add robots rules that block API, account, admin, checkout and development routes.
- Mark auth, account, admin and checkout surfaces as `noindex`.
- Keep unapproved legal documents cautious by allowing page-level `noindex`.

## Out of Scope

- Moving the root HTML layout under `[locale]`.
- Adding Open Graph images.
- Writing or approving binding SEO/legal claims.
- Indexing authenticated customer or operator interfaces.

## Validation

Run lint, typecheck, tests and production build before completion.

## Known Follow-Up

The current root layout declares a static `html lang="fr"` because it lives above `[locale]`. A later structural sprint should move locale ownership to the HTML shell or implement an approved equivalent so `/en/*` pages can declare `lang="en"` at the document root.
