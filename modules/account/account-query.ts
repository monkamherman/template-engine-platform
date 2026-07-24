import type { Locale } from "@/src/i18n/locales"

export type AccountStatus = "active" | "pending" | "expired" | "suspended" | "available" | "blocked"

export type AccountOrder = {
  id: string
  number: string
  status: "paid_fixture" | "pending_fixture" | "failed_fixture"
  placedAt: string
  totalMinor: number
  currency: "EUR" | "USD"
  items: Array<{
    id: string
    name: string
    offer: "Starter" | "Pro" | "Managed"
    quantity: number
    unitAmountMinor: number
    totalAmountMinor: number
  }>
  acceptances: Array<{
    document: string
    version: string
    status: "draft_reference" | "captured_fixture"
  }>
}

export type AccountEntitlement = {
  id: string
  offer: "Starter" | "Pro" | "Managed"
  status: "active" | "pending" | "expired" | "suspended"
  sourceOrderId: string
  startsAt: string
  endsAt?: string
  updateAccess: AccountStatus
  supportAccess: AccountStatus
  downloadAccess: AccountStatus
  licensePreview: string
  rights: string[]
}

export type AccountDownload = {
  id: string
  version: string
  channel: "stable" | "early_access"
  fileName: string
  checksumSha256: string
  status: "available" | "requires_active_access" | "disabled"
  entitlementId: string
  releaseDate: string
}

export type AccountRelease = {
  id: string
  version: string
  channel: "stable" | "early_access"
  status: "published_fixture" | "draft_preview"
  releasedAt: string
  changelog: string[]
  docsSlug: string
}

export type AccountLicense = {
  id: string
  entitlementId: string
  offer: "Starter" | "Pro" | "Managed"
  maskedKey: string
  keyPrefix: string
  keyLast4: string
  status: "active" | "suspended" | "revoked" | "expired"
  productionLimit: number
  stagingLimit: number
  issuedAt: string
  expiresAt?: string
  activations: Array<{
    id: string
    environment: "PRODUCTION" | "STAGING"
    normalizedDomain: string
    status: "active" | "deactivated" | "blocked"
    lastSeenAt: string
  }>
}

export type AccountOnboardingRequest = {
  id: string
  offer: "Pro" | "Managed"
  status: "pending" | "in_review" | "needs_customer_action" | "closed"
  title: string
  createdAt: string
  updatedAt: string
  milestones: Array<{
    id: string
    label: string
    status: "pending" | "in_review" | "needs_customer_action" | "closed"
  }>
}

export type AccountSupportTicket = {
  id: string
  subject: string
  status: "pending" | "in_review" | "needs_customer_action" | "closed"
  category: "installation" | "license" | "download" | "billing" | "other"
  createdAt: string
  updatedAt: string
  messages: Array<{
    id: string
    author: "customer" | "support"
    body: string
    createdAt: string
  }>
}

export type AccountSettings = {
  profile: {
    name: string
    email: string
    locale: Locale
    accountStatus: "verified" | "pending_verification"
  }
  security: {
    passwordProvider: "email_password"
    googleLinked: boolean
    emailVerified: boolean
    activeSessions: number
  }
}

export type AccountCoreData = {
  orders: AccountOrder[]
  entitlements: AccountEntitlement[]
  downloads: AccountDownload[]
  releases: AccountRelease[]
  licenses: AccountLicense[]
  onboarding: AccountOnboardingRequest[]
  supportTickets: AccountSupportTicket[]
  settings: AccountSettings
}

const rights = {
  fr: {
    starter: ["Telechargements officiels selon acces actif", "Documentation installation", "Mises a jour pendant la periode d'acces"],
    pro: ["Accompagnement initial", "Checklist onboarding", "Support de lancement selon politique"],
    managed: ["Validation de version", "Support operationnel", "Workflow maintenance lorsque le service est connecte"],
  },
  en: {
    starter: ["Official downloads while access is active", "Installation documentation", "Updates during access period"],
    pro: ["Initial assisted setup", "Onboarding checklist", "Launch support according to policy"],
    managed: ["Version validation", "Operational support", "Maintenance workflow once service is connected"],
  },
} as const

export function getAccountCoreData(locale: Locale): AccountCoreData {
  const localizedRights = rights[locale]

  return {
    orders: [
      {
        id: "ord_preview",
        number: "TEP-ORD-PREVIEW",
        status: "paid_fixture",
        placedAt: "2026-07-18",
        totalMinor: 49000,
        currency: "EUR",
        items: [
          {
            id: "item_starter_preview",
            name: "Template Engine Starter",
            offer: "Starter",
            quantity: 1,
            unitAmountMinor: 49000,
            totalAmountMinor: 49000,
          },
        ],
        acceptances: [
          {
            document: locale === "fr" ? "Conditions commerciales" : "Commercial terms",
            version: "draft-v1",
            status: "draft_reference",
          },
          {
            document: locale === "fr" ? "Licence logicielle" : "Software license",
            version: "draft-v1",
            status: "draft_reference",
          },
        ],
      },
      {
        id: "ord_pending_preview",
        number: "TEP-ORD-PENDING",
        status: "pending_fixture",
        placedAt: "2026-07-20",
        totalMinor: 0,
        currency: "EUR",
        items: [
          {
            id: "item_managed_preview",
            name: "Managed service intake",
            offer: "Managed",
            quantity: 1,
            unitAmountMinor: 0,
            totalAmountMinor: 0,
          },
        ],
        acceptances: [],
      },
    ],
    entitlements: [
      {
        id: "ent_preview",
        offer: "Starter",
        status: "active",
        sourceOrderId: "ord_preview",
        startsAt: "2026-07-18",
        updateAccess: "active",
        supportAccess: "active",
        downloadAccess: "available",
        licensePreview: "TEP-PRVW-****-****-8F2C",
        rights: [...localizedRights.starter],
      },
      {
        id: "ent_pending_preview",
        offer: "Pro",
        status: "pending",
        sourceOrderId: "ord_pending_preview",
        startsAt: "2026-07-20",
        updateAccess: "pending",
        supportAccess: "pending",
        downloadAccess: "blocked",
        licensePreview: "Not issued",
        rights: [...localizedRights.pro],
      },
      {
        id: "ent_expired_preview",
        offer: "Managed",
        status: "expired",
        sourceOrderId: "ord_preview",
        startsAt: "2026-01-12",
        endsAt: "2026-07-12",
        updateAccess: "expired",
        supportAccess: "expired",
        downloadAccess: "blocked",
        licensePreview: "TEP-OLD-****-****-41AB",
        rights: [...localizedRights.managed],
      },
    ],
    downloads: [
      {
        id: "download_stable_preview",
        version: "1.0.0",
        channel: "stable",
        fileName: "woo-app-theme-1.0.0.zip",
        checksumSha256: "8f2c0d7b9a4e21f03d9c6b4a5e7f1029384756abcdeffedcba65432100112233",
        status: "available",
        entitlementId: "ent_preview",
        releaseDate: "2026-07-18",
      },
      {
        id: "download_early_preview",
        version: "1.1.0-preview",
        channel: "early_access",
        fileName: "woo-app-theme-1.1.0-preview.zip",
        checksumSha256: "41ab0d7b9a4e21f03d9c6b4a5e7f1029384756abcdeffedcba65432100998877",
        status: "requires_active_access",
        entitlementId: "ent_pending_preview",
        releaseDate: "2026-07-21",
      },
    ],
    releases: [
      {
        id: "rel_100",
        version: "1.0.0",
        channel: "stable",
        status: "published_fixture",
        releasedAt: "2026-07-18",
        docsSlug: "releases/1.0.0",
        changelog:
          locale === "fr"
            ? ["Fondation du moteur WooCommerce", "Configuration Starter documentee", "Controle d'acces officiel prepare"]
            : ["WooCommerce engine foundation", "Documented Starter configuration", "Official access control prepared"],
      },
      {
        id: "rel_110_preview",
        version: "1.1.0-preview",
        channel: "early_access",
        status: "draft_preview",
        releasedAt: "2026-07-21",
        docsSlug: "updates",
        changelog:
          locale === "fr"
            ? ["Preview operations Managed", "Validation staging a connecter", "Notes de compatibilite non finales"]
            : ["Managed operations preview", "Staging validation to connect", "Non-final compatibility notes"],
      },
    ],
    licenses: [
      {
        id: "lic_preview",
        entitlementId: "ent_preview",
        offer: "Starter",
        maskedKey: "TEP1-PRVW-****-****-****-****-****-8F2C",
        keyPrefix: "TEP1-PRVW",
        keyLast4: "8F2C",
        status: "active",
        productionLimit: 1,
        stagingLimit: 1,
        issuedAt: "2026-07-18",
        activations: [
          {
            id: "act_prod_preview",
            environment: "PRODUCTION",
            normalizedDomain: "shop-preview.example.test",
            status: "active",
            lastSeenAt: "2026-07-21",
          },
          {
            id: "act_stage_preview",
            environment: "STAGING",
            normalizedDomain: "staging-preview.example.test",
            status: "active",
            lastSeenAt: "2026-07-21",
          },
        ],
      },
      {
        id: "lic_suspended_preview",
        entitlementId: "ent_expired_preview",
        offer: "Managed",
        maskedKey: "TEP1-SUSP-****-****-****-****-****-41AB",
        keyPrefix: "TEP1-SUSP",
        keyLast4: "41AB",
        status: "suspended",
        productionLimit: 1,
        stagingLimit: 1,
        issuedAt: "2026-01-12",
        expiresAt: "2026-07-12",
        activations: [
          {
            id: "act_suspended_preview",
            environment: "PRODUCTION",
            normalizedDomain: "archived-shop.example.test",
            status: "blocked",
            lastSeenAt: "2026-07-12",
          },
        ],
      },
    ],
    onboarding: [
      {
        id: "svc_preview",
        offer: "Pro",
        status: "needs_customer_action",
        title: locale === "fr" ? "Preparation installation Pro" : "Pro setup preparation",
        createdAt: "2026-07-20",
        updatedAt: "2026-07-22",
        milestones: [
          { id: "svc_scope", label: locale === "fr" ? "Cadrage boutique" : "Store scope", status: "closed" },
          { id: "svc_assets", label: locale === "fr" ? "Elements client" : "Customer assets", status: "needs_customer_action" },
          { id: "svc_review", label: locale === "fr" ? "Validation initiale" : "Initial review", status: "pending" },
        ],
      },
      {
        id: "svc_managed_preview",
        offer: "Managed",
        status: "in_review",
        title: locale === "fr" ? "Validation maintenance Managed" : "Managed maintenance review",
        createdAt: "2026-07-19",
        updatedAt: "2026-07-23",
        milestones: [
          { id: "svc_backup", label: locale === "fr" ? "Controle backup" : "Backup check", status: "in_review" },
          { id: "svc_staging", label: "Staging", status: "pending" },
        ],
      },
    ],
    supportTickets: [
      {
        id: "sup_preview",
        subject: locale === "fr" ? "Question sur activation staging" : "Question about staging activation",
        status: "in_review",
        category: "license",
        createdAt: "2026-07-21",
        updatedAt: "2026-07-23",
        messages: [
          {
            id: "msg_customer_preview",
            author: "customer",
            body:
              locale === "fr"
                ? "Je veux confirmer la difference entre production et staging avant activation."
                : "I want to confirm the difference between production and staging before activation.",
            createdAt: "2026-07-21",
          },
          {
            id: "msg_support_preview",
            author: "support",
            body:
              locale === "fr"
                ? "Le support repondra sans demander de cle complete ni mot de passe."
                : "Support will respond without asking for a complete key or password.",
            createdAt: "2026-07-23",
          },
        ],
      },
      {
        id: "sup_closed_preview",
        subject: locale === "fr" ? "Acces documentation" : "Documentation access",
        status: "closed",
        category: "download",
        createdAt: "2026-07-18",
        updatedAt: "2026-07-20",
        messages: [],
      },
    ],
    settings: {
      profile: {
        name: locale === "fr" ? "Client Preview" : "Preview Customer",
        email: "client.preview@example.test",
        locale,
        accountStatus: "verified",
      },
      security: {
        passwordProvider: "email_password",
        googleLinked: true,
        emailVerified: true,
        activeSessions: 1,
      },
    },
  }
}

export function findAccountOrder(locale: Locale, id: string) {
  return getAccountCoreData(locale).orders.find((order) => order.id === id)
}

export function findAccountEntitlement(locale: Locale, id: string) {
  return getAccountCoreData(locale).entitlements.find((entitlement) => entitlement.id === id)
}

export function findAccountLicense(locale: Locale, id: string) {
  return getAccountCoreData(locale).licenses.find((license) => license.id === id)
}

export function findAccountOnboardingRequest(locale: Locale, id: string) {
  return getAccountCoreData(locale).onboarding.find((request) => request.id === id)
}

export function findAccountSupportTicket(locale: Locale, id: string) {
  return getAccountCoreData(locale).supportTickets.find((ticket) => ticket.id === id)
}
