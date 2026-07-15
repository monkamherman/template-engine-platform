# Interface Inventory — V1 Application Map

## Purpose

This inventory is the source of truth for the interfaces that must exist in the complete application skeleton. It prevents route creation from becoming improvised and supports progressive customization.

Initial status for all non-deferred interfaces is `SKELETON` until implementation proves a higher maturity level.

## Sprint 03 implementation status

Runtime source: `config/interface-registry.ts`.

Sprint 03 has introduced the central route builders, navigation lists, interface registry and generated preview renderer for the V1 skeleton. Public home/product/pricing pages remain branded Sprint 02/early Sprint 03 surfaces. The generated marketing, auth, customer account and admin routes are currently `WIREFRAME` unless their runtime registry entry marks a more specific maturity.

All generated preview pages use representative fixture data through `modules/platform/interface-query.ts`; they do not simulate successful checkout, authentication, license activation, download signing or administrative writes. Protected customer and admin areas use an explicit development fixture session only outside production until a real auth provider is approved.

The development interface map lives at `/{locale}/dev/interfaces` and is hidden through `notFound()` in production.

## Status vocabulary

- `SKELETON`: route and shell exist;
- `WIREFRAME`: content hierarchy and interface states exist;
- `BRANDED`: approved design system applied;
- `CONNECTED`: real service or adapter connected;
- `VALIDATED`: functional, responsive, accessibility and authorization checks pass;
- `RELEASED`: approved for production release;
- `DEFERRED`: intentionally outside the current implementation wave.

## Public marketing interfaces

| ID | Route | Interface | Main purpose | Initial data mode | Owner |
|---|---|---|---|---|---|
| `marketing.home` | `/{locale}` | Home | Explain the product, audience, value and primary offers | content | marketing/catalog |
| `marketing.product` | `/{locale}/product` | Product overview | Present the Template Engine and its commercial positioning | content | catalog |
| `marketing.features` | `/{locale}/features` | Features | Explain modularity, localization, shop models and operational benefits | content | catalog |
| `marketing.demos` | `/{locale}/demos` | Demonstration index | Present available shop demonstrations | fixture/query | catalog |
| `marketing.demo-detail` | `/{locale}/demos/{slug}` | Demonstration detail | Show one approved shop configuration or scenario | fixture/query | catalog |
| `marketing.use-cases` | `/{locale}/use-cases` | Use-case index | Help visitors choose a shop model | content | catalog |
| `marketing.use-case-dropshipping` | `/{locale}/use-cases/dropshipping` | Dropshipping | Explain the dropshipping configuration | content | catalog |
| `marketing.use-case-stock` | `/{locale}/use-cases/stock` | Stock commerce | Explain inventory-managed commerce | content | catalog |
| `marketing.use-case-hybrid` | `/{locale}/use-cases/hybrid` | Hybrid commerce | Explain stock plus supplier/dropshipping operations | content | catalog |
| `marketing.use-case-digital` | `/{locale}/use-cases/digital` | Digital products | Explain digital-product support boundaries | content | catalog |
| `marketing.pricing` | `/{locale}/pricing` | Pricing | Compare Starter, Pro and Managed | fixture/query | catalog |
| `marketing.offer-starter` | `/{locale}/offers/starter` | Starter offer | Explain license, download and self-installation responsibilities | content/query | catalog |
| `marketing.offer-pro` | `/{locale}/offers/pro` | Pro offer | Explain accompanied installation and onboarding | content/query | catalog/services |
| `marketing.offer-managed` | `/{locale}/offers/managed` | Managed offer | Explain maintenance, validation and support scope | content/query | catalog/services |
| `marketing.faq` | `/{locale}/faq` | FAQ | Resolve product, licensing, installation and service questions | content | marketing/support |
| `marketing.contact` | `/{locale}/contact` | Contact | Present contact channels and a future contact request form | content/preview | support |

## Legal and trust interfaces

| ID | Route | Interface | Main purpose | Initial data mode | Owner |
|---|---|---|---|---|---|
| `legal.license` | `/{locale}/legal/license` | Commercial license placeholder | Present approved licensing terms when available | content | legal/catalog |
| `legal.terms` | `/{locale}/legal/terms` | Terms | Present commercial terms | content | legal/commerce |
| `legal.privacy` | `/{locale}/legal/privacy` | Privacy | Present privacy information | content | legal/auth |
| `legal.refunds` | `/{locale}/legal/refunds` | Refund policy | Present refund boundaries | content | legal/commerce |

Legal pages may begin with explicit review placeholders. They must never invent binding terms.

## Authentication interfaces

| ID | Route | Interface | Main purpose | Initial data mode | Owner |
|---|---|---|---|---|---|
| `auth.login` | `/{locale}/login` | Login | Authenticate an existing customer or operator | preview/adapter | auth |
| `auth.register` | `/{locale}/register` | Registration | Create a customer identity when provider is connected | preview/adapter | auth |
| `auth.forgot-password` | `/{locale}/forgot-password` | Password recovery request | Request recovery instructions | preview/adapter | auth |
| `auth.reset-password` | `/{locale}/reset-password` | Password reset | Complete password recovery | preview/adapter | auth |
| `auth.verify-email` | `/{locale}/verify-email` | Email verification | Explain or complete identity verification | preview/adapter | auth |

Until a production authentication provider is connected, forms must clearly use development preview behavior and must not simulate persisted success.

## Customer account interfaces

| ID | Route | Interface | Main purpose | Initial data mode | Owner |
|---|---|---|---|---|---|
| `account.dashboard` | `/{locale}/account` | Account dashboard | Summarize orders, access, licenses, downloads and onboarding | fixture/query | account/entitlements |
| `account.orders` | `/{locale}/account/orders` | Order history | List customer orders | fixture/query | commerce |
| `account.order-detail` | `/{locale}/account/orders/{orderId}` | Order detail | Show items, totals, payment state and history | fixture/query | commerce |
| `account.entitlements` | `/{locale}/account/entitlements` | Entitlements | List commercial access rights | fixture/query | entitlements |
| `account.entitlement-detail` | `/{locale}/account/entitlements/{entitlementId}` | Entitlement detail | Explain rights, source order and access state | fixture/query | entitlements |
| `account.licenses` | `/{locale}/account/licenses` | Licenses | List issued licenses and activation limits | fixture/query | licensing |
| `account.license-detail` | `/{locale}/account/licenses/{licenseId}` | License detail | Show status, activations and allowed actions | fixture/query | licensing |
| `account.downloads` | `/{locale}/account/downloads` | Protected downloads | List downloadable releases available through entitlements | fixture/query | releases/entitlements |
| `account.releases` | `/{locale}/account/releases` | Release history | Show versions and customer-visible changelog | fixture/query | releases |
| `account.onboarding` | `/{locale}/account/onboarding` | Onboarding requests | List Pro/Managed service requests | fixture/query | services |
| `account.onboarding-detail` | `/{locale}/account/onboarding/{requestId}` | Onboarding detail | Show questionnaire, milestones, approvals and status | fixture/query | services |
| `account.support` | `/{locale}/account/support` | Support requests | List customer support tickets | fixture/query | support |
| `account.support-new` | `/{locale}/account/support/new` | New support request | Prepare a support request | preview/fixture | support |
| `account.support-detail` | `/{locale}/account/support/{ticketId}` | Support request detail | Show messages, state and allowed responses | fixture/query | support |
| `account.settings-profile` | `/{locale}/account/settings/profile` | Profile settings | Edit identity and locale fields when connected | preview/query | auth |
| `account.settings-security` | `/{locale}/account/settings/security` | Security settings | Manage password/session/security controls when connected | preview/adapter | auth |

## Administration interfaces

| ID | Route | Interface | Main purpose | Initial data mode | Owner |
|---|---|---|---|---|---|
| `admin.dashboard` | `/{locale}/admin` | Operations dashboard | Summarize commercial and operational attention items | fixture/query | audit/commerce |
| `admin.customers` | `/{locale}/admin/customers` | Customer list | Search customers and inspect account state | fixture/query | auth/commerce |
| `admin.customer-detail` | `/{locale}/admin/customers/{customerId}` | Customer detail | Inspect orders, entitlements, licenses and service history | fixture/query | auth/commerce |
| `admin.products` | `/{locale}/admin/catalog/products` | Product list | Manage commercial products | fixture/query | catalog |
| `admin.product-new` | `/{locale}/admin/catalog/products/new` | New product | Prepare product creation | preview/fixture | catalog |
| `admin.product-detail` | `/{locale}/admin/catalog/products/{productId}` | Product detail | Manage product metadata and availability | fixture/query | catalog |
| `admin.offers` | `/{locale}/admin/catalog/offers` | Offer list | Manage Starter, Pro and Managed offers | fixture/query | catalog |
| `admin.offer-detail` | `/{locale}/admin/catalog/offers/{offerId}` | Offer detail | Manage included rights and service behavior | fixture/query | catalog/services |
| `admin.prices` | `/{locale}/admin/catalog/prices` | Price list | Manage currencies, amounts and publication state | fixture/query | catalog |
| `admin.orders` | `/{locale}/admin/orders` | Order list | Search and filter orders | fixture/query | commerce |
| `admin.order-detail` | `/{locale}/admin/orders/{orderId}` | Order detail | Inspect payment, items, entitlements and audit history | fixture/query | commerce/audit |
| `admin.payments` | `/{locale}/admin/payments` | Payment list | Inspect normalized payment records and failures | fixture/query | commerce |
| `admin.payment-detail` | `/{locale}/admin/payments/{paymentId}` | Payment detail | Inspect provider references and safe operational state | fixture/query | commerce |
| `admin.entitlements` | `/{locale}/admin/entitlements` | Entitlement list | Review and manage customer access rights | fixture/query | entitlements |
| `admin.entitlement-detail` | `/{locale}/admin/entitlements/{entitlementId}` | Entitlement detail | Inspect origin, state and audit-sensitive actions | fixture/query | entitlements/audit |
| `admin.licenses` | `/{locale}/admin/licenses` | License list | Search issued licenses | fixture/query | licensing |
| `admin.license-detail` | `/{locale}/admin/licenses/{licenseId}` | License detail | Inspect status, activations, limits and revocation actions | fixture/query | licensing/audit |
| `admin.releases` | `/{locale}/admin/releases` | Release list | Manage release metadata and publication state | fixture/query | releases |
| `admin.release-new` | `/{locale}/admin/releases/new` | New release | Prepare release metadata creation | preview/fixture | releases |
| `admin.release-detail` | `/{locale}/admin/releases/{releaseId}` | Release detail | Manage files, checksum, changelog and availability | fixture/query | releases/audit |
| `admin.services` | `/{locale}/admin/services` | Service request list | Track Pro/Managed onboarding work | fixture/query | services |
| `admin.service-detail` | `/{locale}/admin/services/{requestId}` | Service request detail | Track questionnaire, milestones and approvals | fixture/query | services/audit |
| `admin.support` | `/{locale}/admin/support` | Support queue | Triage and assign support requests | fixture/query | support |
| `admin.support-detail` | `/{locale}/admin/support/{ticketId}` | Support detail | Review messages and update support state | fixture/query | support/audit |
| `admin.audit` | `/{locale}/admin/audit` | Audit log | Investigate privileged and commercial changes | fixture/query | audit |
| `admin.settings` | `/{locale}/admin/settings` | Platform settings | Display approved operational configuration boundaries | preview/query | platform |

## API and machine interfaces

These endpoints belong to the architecture, but Sprint 03 may create only safe route contracts, validation boundaries or explicit `not configured` responses where real integration is not yet approved.

| ID | Route | Purpose | Initial mode | Owner |
|---|---|---|---|---|
| `api.health` | `/api/health` | Health and version information safe for exposure | local | platform |
| `api.checkout` | `/api/checkout` | Create checkout through the configured payment provider | mock/adapter | commerce |
| `api.webhook-provider` | `/api/webhooks/{provider}` | Verify and normalize provider events | mock/adapter | commerce |
| `api.license-activate` | `/api/licenses/activate` | Activate a license for an installation | contract/fixture | licensing |
| `api.license-validate` | `/api/licenses/validate` | Validate license and activation state | contract/fixture | licensing |
| `api.license-deactivate` | `/api/licenses/deactivate` | Deactivate an installation | contract/fixture | licensing |
| `api.download` | `/api/downloads/{grantId}` | Exchange an authorized grant for a short-lived download | contract/fixture | releases/entitlements |
| `api.release-latest` | `/api/releases/latest` | Return the latest entitled release metadata | contract/fixture | releases/licensing |

## Shared system interfaces

| ID | Route or boundary | Interface | Requirement |
|---|---|---|---|
| `system.not-found` | global | Not found | Localized and shell-aware |
| `system.error` | global/segment | Error boundary | Safe error copy and retry path |
| `system.loading` | data segments | Loading states | Contextual skeletons, not one global spinner |
| `system.forbidden` | protected areas | Forbidden | Clear authorization message without leaking data |
| `system.maintenance` | optional controlled state | Maintenance | Must be explicitly enabled, never used to hide broken builds |
| `system.interface-map` | development only | Interface registry viewer | Lists routes, owners, maturity and data mode; excluded from production navigation |

## Deferred interfaces

The following are intentionally excluded from the V1 skeleton unless a later approved sprint changes the scope:

- marketplace and seller portal;
- affiliate dashboard;
- visual page builder;
- mobile application;
- complex organization or team management;
- universal customer-site deployment dashboard;
- AI shop generator;
- public third-party API portal;
- complete CRM;
- automated WordPress updater before licensing and release flows are validated.

## Inventory update rule

Each implementation pull request must update the affected interface entries with:

- achieved maturity state;
- real or fixture data mode;
- known limitations;
- validation evidence;
- follow-up sprint when incomplete.

A route that is removed or renamed must update this inventory and the central route configuration in the same pull request.
