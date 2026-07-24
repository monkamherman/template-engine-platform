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

export type AccountCoreData = {
  orders: AccountOrder[]
  entitlements: AccountEntitlement[]
  downloads: AccountDownload[]
  releases: AccountRelease[]
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
  }
}

export function findAccountOrder(locale: Locale, id: string) {
  return getAccountCoreData(locale).orders.find((order) => order.id === id)
}

export function findAccountEntitlement(locale: Locale, id: string) {
  return getAccountCoreData(locale).entitlements.find((entitlement) => entitlement.id === id)
}
