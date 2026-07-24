import type { Locale } from "@/src/i18n/locales"

export type AdminStatus =
  | "active"
  | "draft"
  | "paused"
  | "paid"
  | "pending"
  | "failed"
  | "refunded"
  | "verified"
  | "needs_review"

export type AdminCustomer = {
  id: string
  name: string
  email: string
  locale: Locale
  status: "verified" | "needs_review"
  createdAt: string
  lastActivityAt: string
  totalOrders: number
  totalSpentMinor: number
  currency: "EUR" | "USD"
  entitlements: string[]
  notes: string[]
}

export type AdminProduct = {
  id: string
  name: string
  slug: string
  type: "software" | "service"
  status: "active" | "draft" | "paused"
  owner: "catalog" | "services"
  updatedAt: string
  offers: string[]
}

export type AdminOffer = {
  id: string
  name: "Starter" | "Pro" | "Managed"
  slug: string
  status: "active" | "draft" | "paused"
  productId: string
  includes: string[]
  limits: string[]
  termsVersion: string
}

export type AdminPrice = {
  id: string
  offerId: string
  label: string
  amountMinor: number
  currency: "EUR" | "USD"
  status: "active" | "draft" | "paused"
  region: "FR/EU" | "US" | "Global"
}

export type AdminOrder = {
  id: string
  number: string
  customerId: string
  status: "paid" | "pending" | "failed" | "refunded"
  placedAt: string
  totalMinor: number
  currency: "EUR" | "USD"
  paymentId: string
  items: Array<{
    id: string
    label: string
    offerId: string
    quantity: number
    unitAmountMinor: number
  }>
  terms: Array<{
    document: string
    version: string
    state: "captured_fixture" | "draft_reference"
  }>
}

export type AdminPayment = {
  id: string
  orderId: string
  provider: "mock_provider" | "stripe_preview"
  providerReferencePreview: string
  status: "paid" | "pending" | "failed" | "refunded"
  amountMinor: number
  currency: "EUR" | "USD"
  receivedAt: string
  eventIdPreview: string
}

export type AdminCommerceData = {
  customers: AdminCustomer[]
  products: AdminProduct[]
  offers: AdminOffer[]
  prices: AdminPrice[]
  orders: AdminOrder[]
  payments: AdminPayment[]
}

const localized = {
  fr: {
    install: "Installation initiale",
    docs: "Documentation client",
    updates: "Acces mises a jour",
    managedOps: "Operations Managed",
    support: "Support selon politique",
    activation: "Activation officielle",
    legal: "Conditions commerciales",
    license: "Licence logicielle",
  },
  en: {
    install: "Initial installation",
    docs: "Customer documentation",
    updates: "Update access",
    managedOps: "Managed operations",
    support: "Support according to policy",
    activation: "Official activation",
    legal: "Commercial terms",
    license: "Software license",
  },
} as const

export function getAdminCommerceData(locale: Locale): AdminCommerceData {
  const t = localized[locale]

  return {
    customers: [
      {
        id: "cus_preview",
        name: locale === "fr" ? "Client Preview" : "Preview Customer",
        email: "client.preview@example.test",
        locale,
        status: "verified",
        createdAt: "2026-07-18",
        lastActivityAt: "2026-07-23",
        totalOrders: 2,
        totalSpentMinor: 49000,
        currency: "EUR",
        entitlements: ["Starter", "Managed review"],
        notes: [t.activation, t.docs],
      },
      {
        id: "cus_pro_preview",
        name: locale === "fr" ? "Client Pro" : "Pro Customer",
        email: "pro.customer@example.test",
        locale: "en",
        status: "needs_review",
        createdAt: "2026-07-20",
        lastActivityAt: "2026-07-22",
        totalOrders: 1,
        totalSpentMinor: 129000,
        currency: "EUR",
        entitlements: ["Pro"],
        notes: [t.install, t.support],
      },
    ],
    products: [
      {
        id: "prd_preview",
        name: "Woo App Commercial Template Engine",
        slug: "woo-app-commercial-template-engine",
        type: "software",
        status: "active",
        owner: "catalog",
        updatedAt: "2026-07-22",
        offers: ["Starter", "Pro", "Managed"],
      },
      {
        id: "prd_service_preview",
        name: locale === "fr" ? "Accompagnement lancement" : "Launch assistance",
        slug: "launch-assistance",
        type: "service",
        status: "draft",
        owner: "services",
        updatedAt: "2026-07-21",
        offers: ["Pro", "Managed"],
      },
    ],
    offers: [
      {
        id: "off_preview",
        name: "Starter",
        slug: "starter",
        status: "active",
        productId: "prd_preview",
        includes: [t.docs, t.updates, t.activation],
        limits: ["Self-installation", "No managed operations"],
        termsVersion: "draft-v1",
      },
      {
        id: "off_pro_preview",
        name: "Pro",
        slug: "pro",
        status: "active",
        productId: "prd_preview",
        includes: [t.install, t.docs, t.support],
        limits: ["Customer approval required", "No unapproved SLA"],
        termsVersion: "draft-v1",
      },
      {
        id: "off_managed_preview",
        name: "Managed",
        slug: "managed",
        status: "draft",
        productId: "prd_service_preview",
        includes: [t.managedOps, t.support, t.updates],
        limits: ["Recurring billing not connected", "Terms under review"],
        termsVersion: "draft-v1",
      },
    ],
    prices: [
      { id: "price_starter_eur", offerId: "off_preview", label: "Starter EUR", amountMinor: 49000, currency: "EUR", status: "active", region: "FR/EU" },
      { id: "price_pro_eur", offerId: "off_pro_preview", label: "Pro EUR", amountMinor: 129000, currency: "EUR", status: "active", region: "FR/EU" },
      { id: "price_managed_preview", offerId: "off_managed_preview", label: "Managed preview", amountMinor: 0, currency: "EUR", status: "draft", region: "Global" },
    ],
    orders: [
      {
        id: "ord_preview",
        number: "TEP-ORD-PREVIEW",
        customerId: "cus_preview",
        status: "paid",
        placedAt: "2026-07-18",
        totalMinor: 49000,
        currency: "EUR",
        paymentId: "pay_preview",
        items: [{ id: "item_starter", label: "Template Engine Starter", offerId: "off_preview", quantity: 1, unitAmountMinor: 49000 }],
        terms: [
          { document: t.legal, version: "draft-v1", state: "draft_reference" },
          { document: t.license, version: "draft-v1", state: "draft_reference" },
        ],
      },
      {
        id: "ord_pro_preview",
        number: "TEP-ORD-PRO",
        customerId: "cus_pro_preview",
        status: "pending",
        placedAt: "2026-07-20",
        totalMinor: 129000,
        currency: "EUR",
        paymentId: "pay_pending_preview",
        items: [{ id: "item_pro", label: "Template Engine Pro", offerId: "off_pro_preview", quantity: 1, unitAmountMinor: 129000 }],
        terms: [{ document: t.legal, version: "draft-v1", state: "draft_reference" }],
      },
    ],
    payments: [
      {
        id: "pay_preview",
        orderId: "ord_preview",
        provider: "mock_provider",
        providerReferencePreview: "mock_pi_****_8f2c",
        status: "paid",
        amountMinor: 49000,
        currency: "EUR",
        receivedAt: "2026-07-18",
        eventIdPreview: "evt_****_paid_8f2c",
      },
      {
        id: "pay_pending_preview",
        orderId: "ord_pro_preview",
        provider: "stripe_preview",
        providerReferencePreview: "pi_****_41ab",
        status: "pending",
        amountMinor: 129000,
        currency: "EUR",
        receivedAt: "2026-07-20",
        eventIdPreview: "evt_****_pending_41ab",
      },
    ],
  }
}

export function findAdminCustomer(locale: Locale, id: string) {
  return getAdminCommerceData(locale).customers.find((customer) => customer.id === id)
}

export function findAdminProduct(locale: Locale, id: string) {
  return getAdminCommerceData(locale).products.find((product) => product.id === id)
}

export function findAdminOffer(locale: Locale, id: string) {
  return getAdminCommerceData(locale).offers.find((offer) => offer.id === id)
}

export function findAdminOrder(locale: Locale, id: string) {
  return getAdminCommerceData(locale).orders.find((order) => order.id === id)
}

export function findAdminPayment(locale: Locale, id: string) {
  return getAdminCommerceData(locale).payments.find((payment) => payment.id === id)
}
