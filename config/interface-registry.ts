import { routes } from "@/config/routes"
import { documentationSlugs, legalSlugs } from "@/modules/content/documents"
import type { Locale } from "@/src/i18n/locales"

export type InterfaceAudience = "public" | "auth" | "account" | "admin" | "api" | "system"
export type InterfaceMaturity =
  | "SKELETON"
  | "WIREFRAME"
  | "BRANDED"
  | "CONNECTED"
  | "VALIDATED"
  | "RELEASED"
  | "DEFERRED"
export type InterfaceDataMode =
  | "content"
  | "fixture"
  | "preview"
  | "query"
  | "adapter"
  | "contract"
  | "local"

export type InterfaceEntry = {
  id: string
  title: string
  routePattern: string
  buildPath?: (locale: Locale) => string
  audience: InterfaceAudience
  owner: string
  maturity: InterfaceMaturity
  dataMode: InterfaceDataMode
  notes: string
}

const p = (pattern: string) => `/{locale}${pattern}`

type InterfaceSeed = readonly [id: string, title: string, buildPath: (locale: Locale) => string, routePattern: string]

const authInterfaceSeeds = [
  ["auth.login", "Login", routes.auth.login, p("/login")],
  ["auth.register", "Registration", routes.auth.register, p("/register")],
  ["auth.forgot-password", "Password recovery request", routes.auth.forgotPassword, p("/forgot-password")],
  ["auth.reset-password", "Password reset", routes.auth.resetPassword, p("/reset-password")],
  ["auth.verify-email", "Email verification", routes.auth.verifyEmail, p("/verify-email")],
] satisfies readonly InterfaceSeed[]

const accountInterfaceSeeds = [
  ["account.dashboard", "Account dashboard", routes.account.dashboard, p("/account")],
  ["account.orders", "Order history", routes.account.orders, p("/account/orders")],
  ["account.order-detail", "Order detail", (locale: Locale) => routes.account.orderDetail(locale, "ord_preview"), p("/account/orders/{orderId}")],
  ["account.entitlements", "Entitlements", routes.account.entitlements, p("/account/entitlements")],
  [
    "account.entitlement-detail",
    "Entitlement detail",
    (locale: Locale) => routes.account.entitlementDetail(locale, "ent_preview"),
    p("/account/entitlements/{entitlementId}"),
  ],
  ["account.licenses", "Licenses", routes.account.licenses, p("/account/licenses")],
  ["account.license-detail", "License detail", (locale: Locale) => routes.account.licenseDetail(locale, "lic_preview"), p("/account/licenses/{licenseId}")],
  ["account.downloads", "Protected downloads", routes.account.downloads, p("/account/downloads")],
  ["account.releases", "Release history", routes.account.releases, p("/account/releases")],
  ["account.onboarding", "Onboarding requests", routes.account.onboarding, p("/account/onboarding")],
  [
    "account.onboarding-detail",
    "Onboarding detail",
    (locale: Locale) => routes.account.onboardingDetail(locale, "svc_preview"),
    p("/account/onboarding/{requestId}"),
  ],
  ["account.support", "Support requests", routes.account.support, p("/account/support")],
  ["account.support-new", "New support request", routes.account.supportNew, p("/account/support/new")],
  ["account.support-detail", "Support request detail", (locale: Locale) => routes.account.supportDetail(locale, "sup_preview"), p("/account/support/{ticketId}")],
  ["account.settings-profile", "Profile settings", routes.account.profile, p("/account/settings/profile")],
  ["account.settings-security", "Security settings", routes.account.security, p("/account/settings/security")],
] satisfies readonly InterfaceSeed[]

const adminInterfaceSeeds = [
  ["admin.dashboard", "Operations dashboard", routes.admin.dashboard, p("/admin")],
  ["admin.customers", "Customer list", routes.admin.customers, p("/admin/customers")],
  ["admin.customer-detail", "Customer detail", (locale: Locale) => routes.admin.customerDetail(locale, "cus_preview"), p("/admin/customers/{customerId}")],
  ["admin.products", "Product list", routes.admin.products, p("/admin/catalog/products")],
  ["admin.product-new", "New product", routes.admin.productNew, p("/admin/catalog/products/new")],
  ["admin.product-detail", "Product detail", (locale: Locale) => routes.admin.productDetail(locale, "prd_preview"), p("/admin/catalog/products/{productId}")],
  ["admin.offers", "Offer list", routes.admin.offers, p("/admin/catalog/offers")],
  ["admin.offer-detail", "Offer detail", (locale: Locale) => routes.admin.offerDetail(locale, "off_preview"), p("/admin/catalog/offers/{offerId}")],
  ["admin.prices", "Price list", routes.admin.prices, p("/admin/catalog/prices")],
  ["admin.orders", "Order list", routes.admin.orders, p("/admin/orders")],
  ["admin.order-detail", "Order detail", (locale: Locale) => routes.admin.orderDetail(locale, "ord_preview"), p("/admin/orders/{orderId}")],
  ["admin.payments", "Payment list", routes.admin.payments, p("/admin/payments")],
  ["admin.payment-detail", "Payment detail", (locale: Locale) => routes.admin.paymentDetail(locale, "pay_preview"), p("/admin/payments/{paymentId}")],
  ["admin.entitlements", "Entitlement list", routes.admin.entitlements, p("/admin/entitlements")],
  [
    "admin.entitlement-detail",
    "Entitlement detail",
    (locale: Locale) => routes.admin.entitlementDetail(locale, "ent_preview"),
    p("/admin/entitlements/{entitlementId}"),
  ],
  ["admin.licenses", "License list", routes.admin.licenses, p("/admin/licenses")],
  ["admin.license-detail", "License detail", (locale: Locale) => routes.admin.licenseDetail(locale, "lic_preview"), p("/admin/licenses/{licenseId}")],
  ["admin.releases", "Release list", routes.admin.releases, p("/admin/releases")],
  ["admin.release-new", "New release", routes.admin.releaseNew, p("/admin/releases/new")],
  ["admin.release-detail", "Release detail", (locale: Locale) => routes.admin.releaseDetail(locale, "rel_preview"), p("/admin/releases/{releaseId}")],
  ["admin.legal-documents", "Legal documents", routes.admin.legal, p("/admin/legal")],
  ["admin.legal-document-detail", "Legal document detail", (locale: Locale) => routes.admin.legalDetail(locale, "legal_preview"), p("/admin/legal/{documentId}")],
  ["admin.documentation", "Documentation overview", routes.admin.documentation, p("/admin/documentation")],
  [
    "admin.documentation-detail",
    "Documentation detail",
    (locale: Locale) => routes.admin.documentationDetail(locale, "docs_preview"),
    p("/admin/documentation/{documentId}"),
  ],
  ["admin.services", "Service request list", routes.admin.services, p("/admin/services")],
  ["admin.service-detail", "Service request detail", (locale: Locale) => routes.admin.serviceDetail(locale, "svc_preview"), p("/admin/services/{requestId}")],
  ["admin.support", "Support queue", routes.admin.support, p("/admin/support")],
  ["admin.support-detail", "Support detail", (locale: Locale) => routes.admin.supportDetail(locale, "sup_preview"), p("/admin/support/{ticketId}")],
  ["admin.audit", "Audit log", routes.admin.audit, p("/admin/audit")],
  ["admin.settings", "Platform settings", routes.admin.settings, p("/admin/settings")],
] satisfies readonly InterfaceSeed[]

const sprint08AccountInterfaces = new Set([
  "account.dashboard",
  "account.orders",
  "account.order-detail",
  "account.entitlements",
  "account.entitlement-detail",
  "account.downloads",
  "account.releases",
  "account.licenses",
  "account.license-detail",
  "account.onboarding",
  "account.onboarding-detail",
  "account.support",
  "account.support-new",
  "account.support-detail",
  "account.settings-profile",
  "account.settings-security",
])

const sprint08bPreviewInterfaces = new Set([
  "account.support-new",
  "account.settings-profile",
  "account.settings-security",
])

const sprint11aAdminInterfaces = new Set([
  "admin.dashboard",
  "admin.customers",
  "admin.customer-detail",
  "admin.products",
  "admin.product-new",
  "admin.product-detail",
  "admin.offers",
  "admin.offer-detail",
  "admin.prices",
  "admin.orders",
  "admin.order-detail",
  "admin.payments",
  "admin.payment-detail",
])

const sprint11aAdminPreviewInterfaces = new Set(["admin.product-new"])

const sprint11bAdminInterfaces = new Set([
  "admin.entitlements",
  "admin.entitlement-detail",
  "admin.license-detail",
  "admin.releases",
  "admin.release-new",
  "admin.release-detail",
  "admin.legal-documents",
  "admin.support",
  "admin.support-detail",
  "admin.audit",
  "admin.settings",
])

const sprint11bAdminPreviewInterfaces = new Set(["admin.release-new", "admin.settings"])

export const interfaceRegistry = [
  {
    id: "marketing.home",
    title: "Home",
    routePattern: "/{locale}",
    buildPath: routes.home,
    audience: "public",
    owner: "marketing/catalog",
    maturity: "BRANDED",
    dataMode: "content",
    notes: "Sprint 06A branded landing page with hero, product visual, value strip, shop-model tabs, features, offers, documentation preview and final CTA.",
  },
  {
    id: "marketing.product",
    title: "Product overview",
    routePattern: p("/product"),
    buildPath: routes.marketing.product,
    audience: "public",
    owner: "catalog",
    maturity: "BRANDED",
    dataMode: "content",
    notes: "Branded starter page with product positioning.",
  },
  {
    id: "marketing.features",
    title: "Features",
    routePattern: p("/features"),
    buildPath: routes.marketing.features,
    audience: "public",
    owner: "catalog",
    maturity: "BRANDED",
    dataMode: "content",
    notes: "Sprint 06C branded features page with category tabs, shop-model grid, workflow, license/service boundary, technical confidence section and final CTA.",
  },
  {
    id: "marketing.demos",
    title: "Demonstration index",
    routePattern: p("/demos"),
    buildPath: routes.marketing.demos,
    audience: "public",
    owner: "catalog",
    maturity: "BRANDED",
    dataMode: "fixture",
    notes: "Sprint 06D branded demos index with illustrative shop scenarios, filters, model comparison, educational cards, validation alert and final CTA; no customer claims.",
  },
  {
    id: "marketing.demo-detail",
    title: "Demonstration detail",
    routePattern: p("/demos/{slug}"),
    buildPath: (locale) => routes.marketing.demoDetail(locale, "dropshipping-modele"),
    audience: "public",
    owner: "catalog",
    maturity: "WIREFRAME",
    dataMode: "fixture",
    notes: "Dynamic detail route renders representative scenario structure.",
  },
  {
    id: "marketing.use-cases",
    title: "Use-case index",
    routePattern: p("/use-cases"),
    buildPath: routes.marketing.useCases,
    audience: "public",
    owner: "catalog",
    maturity: "WIREFRAME",
    dataMode: "content",
    notes: "Shop model comparison wireframe.",
  },
  ...["dropshipping", "stock", "hybrid", "digital"].map((slug) => ({
    id: `marketing.use-case-${slug}`,
    title: `Use case ${slug}`,
    routePattern: p(`/use-cases/${slug}`),
    buildPath: (locale: Locale) => routes.marketing.useCase(locale, slug),
    audience: "public" as const,
    owner: "catalog",
    maturity: "WIREFRAME" as const,
    dataMode: "content" as const,
    notes: "Model-specific explanatory wireframe.",
  })),
  {
    id: "marketing.pricing",
    title: "Pricing",
    routePattern: p("/pricing"),
    buildPath: routes.marketing.pricing,
    audience: "public",
    owner: "catalog",
    maturity: "BRANDED",
    dataMode: "content",
    notes: "Sprint 06B branded pricing page with plan cards, license clarification, comparison, decision helper, FAQ and final CTA; final prices remain outside this interface.",
  },
  ...["starter", "pro", "managed"].map((slug) => ({
    id: `marketing.offer-${slug}`,
    title: `${slug} offer`,
    routePattern: p(`/offers/${slug}`),
    buildPath: (locale: Locale) => routes.marketing.offer(locale, slug),
    audience: "public" as const,
    owner: slug === "starter" ? "catalog" : "catalog/services",
    maturity: "WIREFRAME" as const,
    dataMode: "query" as const,
    notes: "Offer detail route with inclusions, exclusions and preview CTA.",
  })),
  {
    id: "marketing.faq",
    title: "FAQ",
    routePattern: p("/faq"),
    buildPath: routes.marketing.faq,
    audience: "public",
    owner: "marketing/support",
    maturity: "WIREFRAME",
    dataMode: "content",
    notes: "Grouped question structure with non-binding answers.",
  },
  {
    id: "marketing.contact",
    title: "Contact",
    routePattern: p("/contact"),
    buildPath: routes.marketing.contact,
    audience: "public",
    owner: "support",
    maturity: "WIREFRAME",
    dataMode: "preview",
    notes: "Contact form is disabled preview until provider is connected.",
  },
  ...legalSlugs.map((slug) => ({
    id: `legal.${slug}`,
    title: `Legal ${slug.replaceAll("-", " ")}`,
    routePattern: p(`/legal/${slug}`),
    buildPath: (locale: Locale) => routes.legal.document(locale, slug),
    audience: "public" as const,
    owner: "legal",
    maturity: "WIREFRAME" as const,
    dataMode: "content" as const,
    notes: "Explicit legal-review placeholder; no invented binding terms.",
  })),
  ...documentationSlugs.map((slug) => ({
    id: slug ? `docs.${slug.replaceAll("/", ".")}` : "docs.home",
    title: slug ? `Documentation ${slug.replaceAll("/", " ")}` : "Documentation index",
    routePattern: p(slug ? `/docs/${slug.replace("1.0.0", "{version}")}` : "/docs"),
    buildPath: (locale: Locale) => routes.docs.article(locale, slug),
    audience: "public" as const,
    owner: "documentation",
    maturity: (slug ? "WIREFRAME" : "BRANDED") as InterfaceMaturity,
    dataMode: "content" as const,
    notes: slug
      ? "Reviewed draft documentation structure backed by typed content."
      : "Sprint 06D branded documentation home with search preview, customer paths, category grid, highlighted guides, support bridge, review notice and non-final version card.",
  })),
  ...authInterfaceSeeds.map(([id, title, buildPath, routePattern]) => ({
    id,
    title,
    routePattern,
    buildPath,
    audience: "auth" as const,
    owner: "auth",
    maturity: "CONNECTED" as const,
    dataMode: "adapter" as const,
    notes:
      "Sprint 07 auth adapter integration with Auth.js, encrypted JWT sessions, Prisma-persisted users/accounts/passwords, Google OAuth, email/password and magic-link verification; requires filled Google/SMTP env before validation.",
  })),
  ...accountInterfaceSeeds.map(([id, title, buildPath, routePattern]) => ({
    id,
    title,
    routePattern,
    buildPath,
    audience: "account" as const,
    owner: "account",
    maturity: (sprint08AccountInterfaces.has(id) ? "BRANDED" : "WIREFRAME") as InterfaceMaturity,
    dataMode: (sprint08bPreviewInterfaces.has(id) ? "preview" : "fixture") as InterfaceDataMode,
    notes: sprint08AccountInterfaces.has(id)
      ? "Sprint 08 account UI backed by centralized fixture/query data; license keys are masked, sensitive actions are disabled until backend authorization/audit exists, preview forms do not persist, and storefront rendering is not made dependent on license-service availability."
      : "Development fixture identity and repository-backed preview data.",
  })),
  ...adminInterfaceSeeds.map(([id, title, buildPath, routePattern]) => ({
    id,
    title,
    routePattern,
    buildPath,
    audience: "admin" as const,
    owner: "operations",
    maturity: (id === "admin.licenses" ? "CONNECTED" : sprint11aAdminInterfaces.has(id) || sprint11bAdminInterfaces.has(id) ? "BRANDED" : "WIREFRAME") as InterfaceMaturity,
    dataMode: (id === "admin.licenses" ? "query" : sprint11aAdminPreviewInterfaces.has(id) || sprint11bAdminPreviewInterfaces.has(id) ? "preview" : "fixture") as InterfaceDataMode,
    notes:
      id === "admin.licenses"
        ? "Operator view reads issued licenses and activations through the licensing query layer; API workbench remains for protocol testing."
        : sprint11aAdminInterfaces.has(id)
          ? "Sprint 11A branded admin commerce UI backed by centralized fixtures; provider references are masked, write/refund/delete actions are disabled until backend authorization and audit services are connected, and browser values are not treated as commercial truth."
          : sprint11bAdminInterfaces.has(id)
            ? "Sprint 11B branded admin operations UI backed by centralized fixtures/query data; complete license keys, private keys, peppers, ciphertext, tokens, provider secrets and signed URLs are not exposed, sensitive actions are disabled until backend authorization/audit exists, and draft/review legal content is not presented as approved."
        : "Role-protected development guard with disabled preview actions.",
  })),
  {
    id: "system.interface-map",
    title: "Interface registry viewer",
    routePattern: p("/dev/interfaces"),
    buildPath: routes.devInterfaces,
    audience: "system",
    owner: "platform",
    maturity: "WIREFRAME",
    dataMode: "local",
    notes: "Development-only registry map; hidden in production.",
  },
] satisfies InterfaceEntry[]

export function findInterfaceById(id: string) {
  return interfaceRegistry.find((entry) => entry.id === id)
}

export function findInterfaceByPath(locale: Locale, pathname: string) {
  return interfaceRegistry.find((entry) => entry.buildPath?.(locale) === pathname)
}
