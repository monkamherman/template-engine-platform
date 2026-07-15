import type { Locale } from "@/src/i18n/locales"

export type RouteBuilder = (locale: Locale) => string

const localized = (path = ""): RouteBuilder => {
  return (locale) => `/${locale}${path}`
}

export const routes = {
  home: localized(),
  designSystem: localized("/design-system"),
  devInterfaces: localized("/dev/interfaces"),
  marketing: {
    product: localized("/product"),
    features: localized("/features"),
    demos: localized("/demos"),
    demoDetail: (locale: Locale, slug: string) => `/${locale}/demos/${slug}`,
    useCases: localized("/use-cases"),
    useCase: (locale: Locale, slug: string) => `/${locale}/use-cases/${slug}`,
    pricing: localized("/pricing"),
    offer: (locale: Locale, slug: string) => `/${locale}/offers/${slug}`,
    faq: localized("/faq"),
    contact: localized("/contact"),
    legal: (locale: Locale, slug: string) => `/${locale}/legal/${slug}`,
  },
  auth: {
    login: localized("/login"),
    register: localized("/register"),
    forgotPassword: localized("/forgot-password"),
    resetPassword: localized("/reset-password"),
    verifyEmail: localized("/verify-email"),
  },
  account: {
    dashboard: localized("/account"),
    orders: localized("/account/orders"),
    orderDetail: (locale: Locale, orderId: string) => `/${locale}/account/orders/${orderId}`,
    entitlements: localized("/account/entitlements"),
    entitlementDetail: (locale: Locale, entitlementId: string) =>
      `/${locale}/account/entitlements/${entitlementId}`,
    licenses: localized("/account/licenses"),
    licenseDetail: (locale: Locale, licenseId: string) => `/${locale}/account/licenses/${licenseId}`,
    downloads: localized("/account/downloads"),
    releases: localized("/account/releases"),
    onboarding: localized("/account/onboarding"),
    onboardingDetail: (locale: Locale, requestId: string) =>
      `/${locale}/account/onboarding/${requestId}`,
    support: localized("/account/support"),
    supportNew: localized("/account/support/new"),
    supportDetail: (locale: Locale, ticketId: string) => `/${locale}/account/support/${ticketId}`,
    profile: localized("/account/settings/profile"),
    security: localized("/account/settings/security"),
  },
  admin: {
    dashboard: localized("/admin"),
    customers: localized("/admin/customers"),
    customerDetail: (locale: Locale, customerId: string) => `/${locale}/admin/customers/${customerId}`,
    products: localized("/admin/catalog/products"),
    productNew: localized("/admin/catalog/products/new"),
    productDetail: (locale: Locale, productId: string) => `/${locale}/admin/catalog/products/${productId}`,
    offers: localized("/admin/catalog/offers"),
    offerDetail: (locale: Locale, offerId: string) => `/${locale}/admin/catalog/offers/${offerId}`,
    prices: localized("/admin/catalog/prices"),
    orders: localized("/admin/orders"),
    orderDetail: (locale: Locale, orderId: string) => `/${locale}/admin/orders/${orderId}`,
    payments: localized("/admin/payments"),
    paymentDetail: (locale: Locale, paymentId: string) => `/${locale}/admin/payments/${paymentId}`,
    entitlements: localized("/admin/entitlements"),
    entitlementDetail: (locale: Locale, entitlementId: string) =>
      `/${locale}/admin/entitlements/${entitlementId}`,
    licenses: localized("/admin/licenses"),
    licenseDetail: (locale: Locale, licenseId: string) => `/${locale}/admin/licenses/${licenseId}`,
    releases: localized("/admin/releases"),
    releaseNew: localized("/admin/releases/new"),
    releaseDetail: (locale: Locale, releaseId: string) => `/${locale}/admin/releases/${releaseId}`,
    services: localized("/admin/services"),
    serviceDetail: (locale: Locale, requestId: string) => `/${locale}/admin/services/${requestId}`,
    support: localized("/admin/support"),
    supportDetail: (locale: Locale, ticketId: string) => `/${locale}/admin/support/${ticketId}`,
    audit: localized("/admin/audit"),
    settings: localized("/admin/settings"),
  },
} as const

export function joinLocalizedRoute(locale: Locale, segments: string[] = []) {
  return `/${[locale, ...segments].filter(Boolean).join("/")}`
}
