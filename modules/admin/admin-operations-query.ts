import type { Locale } from "@/src/i18n/locales"

export type AdminEntitlement = {
  id: string
  customerEmail: string
  offer: "Starter" | "Pro" | "Managed"
  status: "active" | "pending" | "suspended" | "expired"
  source: "purchase" | "manual" | "migration"
  startsAt: string
  endsAt?: string
  licenseId?: string
  downloadAccess: "available" | "blocked" | "pending"
  supportAccess: "active" | "blocked" | "pending"
}

export type AdminOperationLicense = {
  id: string
  entitlementId: string
  customerEmail: string
  offer: "Starter" | "Pro" | "Managed"
  maskedKey: string
  keyPrefix: string
  keyLast4: string
  status: "active" | "suspended" | "revoked" | "expired"
  productionLimit: number
  stagingLimit: number
  keyVersion: number
  issuedAt: string
  lastValidatedAt?: string
  activations: Array<{
    id: string
    environment: "PRODUCTION" | "STAGING"
    normalizedDomain: string
    status: "active" | "deactivated" | "blocked"
    lastSeenAt: string
  }>
}

export type AdminRelease = {
  id: string
  version: string
  channel: "stable" | "early_access"
  status: "published" | "draft" | "disabled"
  releasedAt?: string
  checksumSha256?: string
  fileSizeLabel?: string
  docsSlug: string
  notes: string[]
}

export type AdminLegalDocument = {
  id: string
  title: string
  type: "software_license" | "commercial_terms" | "support_policy" | "privacy"
  locale: Locale
  status: "draft" | "review" | "published"
  version: string
  updatedAt: string
}

export type AdminSupportTicket = {
  id: string
  subject: string
  customerEmail: string
  status: "pending" | "in_review" | "needs_customer_action" | "closed"
  category: "license" | "download" | "installation" | "billing"
  updatedAt: string
  messages: Array<{
    id: string
    author: "customer" | "support"
    body: string
    createdAt: string
  }>
}

export type AdminAuditEvent = {
  id: string
  actor: string
  action: string
  target: string
  occurredAt: string
  severity: "info" | "warning" | "danger"
  summary: string
}

export type AdminSystemSetting = {
  id: string
  label: string
  valuePreview: string
  status: "configured" | "missing" | "review"
  secret: boolean
}

export type AdminOperationsData = {
  entitlements: AdminEntitlement[]
  licenses: AdminOperationLicense[]
  releases: AdminRelease[]
  legalDocuments: AdminLegalDocument[]
  supportTickets: AdminSupportTicket[]
  auditEvents: AdminAuditEvent[]
  settings: AdminSystemSetting[]
}

const localized = {
  fr: {
    releaseNotes: ["Changelog client prepare", "Compatibilite non finale hors notes publiees"],
    reviewCopy: "Document en revue: ne pas presenter comme approuve.",
    supportReply: "Le support ne demandera pas de cle complete, mot de passe ou secret.",
    settingPublic: "Configure via variable serveur",
  },
  en: {
    releaseNotes: ["Customer changelog prepared", "Compatibility not final outside published notes"],
    reviewCopy: "Document under review: do not present as approved.",
    supportReply: "Support will not ask for a complete key, password or secret.",
    settingPublic: "Configured through server variable",
  },
} as const

export function getAdminOperationsData(locale: Locale): AdminOperationsData {
  const t = localized[locale]

  return {
    entitlements: [
      {
        id: "ent_preview",
        customerEmail: "client.preview@example.test",
        offer: "Starter",
        status: "active",
        source: "purchase",
        startsAt: "2026-07-18",
        licenseId: "lic_preview",
        downloadAccess: "available",
        supportAccess: "active",
      },
      {
        id: "ent_pending_preview",
        customerEmail: "pro.customer@example.test",
        offer: "Pro",
        status: "pending",
        source: "purchase",
        startsAt: "2026-07-20",
        downloadAccess: "pending",
        supportAccess: "pending",
      },
      {
        id: "ent_suspended_preview",
        customerEmail: "managed.customer@example.test",
        offer: "Managed",
        status: "suspended",
        source: "manual",
        startsAt: "2026-01-12",
        endsAt: "2026-07-12",
        licenseId: "lic_suspended_preview",
        downloadAccess: "blocked",
        supportAccess: "blocked",
      },
    ],
    licenses: [
      {
        id: "lic_preview",
        entitlementId: "ent_preview",
        customerEmail: "client.preview@example.test",
        offer: "Starter",
        maskedKey: "TEP1-PRVW-****-****-****-****-****-8F2C",
        keyPrefix: "TEP1-PRVW",
        keyLast4: "8F2C",
        status: "active",
        productionLimit: 1,
        stagingLimit: 1,
        keyVersion: 1,
        issuedAt: "2026-07-18",
        lastValidatedAt: "2026-07-23",
        activations: [
          { id: "act_prod_preview", environment: "PRODUCTION", normalizedDomain: "shop-preview.example.test", status: "active", lastSeenAt: "2026-07-23" },
          { id: "act_stage_preview", environment: "STAGING", normalizedDomain: "staging-preview.example.test", status: "active", lastSeenAt: "2026-07-22" },
        ],
      },
      {
        id: "lic_suspended_preview",
        entitlementId: "ent_suspended_preview",
        customerEmail: "managed.customer@example.test",
        offer: "Managed",
        maskedKey: "TEP1-SUSP-****-****-****-****-****-41AB",
        keyPrefix: "TEP1-SUSP",
        keyLast4: "41AB",
        status: "suspended",
        productionLimit: 1,
        stagingLimit: 1,
        keyVersion: 1,
        issuedAt: "2026-01-12",
        lastValidatedAt: "2026-07-12",
        activations: [
          { id: "act_blocked_preview", environment: "PRODUCTION", normalizedDomain: "archived-shop.example.test", status: "blocked", lastSeenAt: "2026-07-12" },
        ],
      },
    ],
    releases: [
      {
        id: "rel_preview",
        version: "1.0.0",
        channel: "stable",
        status: "published",
        releasedAt: "2026-07-18",
        checksumSha256: "8f2c0d7b9a4e21f03d9c6b4a5e7f1029384756abcdeffedcba65432100112233",
        fileSizeLabel: "4.8 MB",
        docsSlug: "releases/1.0.0",
        notes: [...t.releaseNotes],
      },
      {
        id: "rel_draft_preview",
        version: "1.1.0-preview",
        channel: "early_access",
        status: "draft",
        docsSlug: "updates",
        notes: [locale === "fr" ? "Checksum en attente de paquet release" : "Checksum pending release package"],
      },
    ],
    legalDocuments: [
      { id: "legal_terms_preview", title: locale === "fr" ? "Conditions commerciales" : "Commercial terms", type: "commercial_terms", locale, status: "review", version: "draft-v1", updatedAt: "2026-07-21" },
      { id: "legal_license_preview", title: locale === "fr" ? "Licence logicielle" : "Software license", type: "software_license", locale, status: "draft", version: "draft-v1", updatedAt: "2026-07-20" },
      { id: "legal_privacy_preview", title: locale === "fr" ? "Confidentialite" : "Privacy", type: "privacy", locale, status: "published", version: "reviewed-v1", updatedAt: "2026-07-18" },
    ],
    supportTickets: [
      {
        id: "sup_preview",
        subject: locale === "fr" ? "Activation staging a verifier" : "Staging activation to review",
        customerEmail: "client.preview@example.test",
        status: "in_review",
        category: "license",
        updatedAt: "2026-07-23",
        messages: [
          { id: "msg_customer", author: "customer", body: locale === "fr" ? "Je veux verifier mon activation staging." : "I want to verify my staging activation.", createdAt: "2026-07-21" },
          { id: "msg_support", author: "support", body: t.supportReply, createdAt: "2026-07-23" },
        ],
      },
      {
        id: "sup_download_preview",
        subject: locale === "fr" ? "Telechargement indisponible" : "Download unavailable",
        customerEmail: "pro.customer@example.test",
        status: "needs_customer_action",
        category: "download",
        updatedAt: "2026-07-22",
        messages: [],
      },
    ],
    auditEvents: [
      {
        id: "audit_license_suspend_preview",
        actor: "admin.preview@example.test",
        action: "license.suspend.preview",
        target: "lic_suspended_preview",
        occurredAt: "2026-07-23",
        severity: "warning",
        summary: locale === "fr" ? "Resume sans cle complete ni payload secret." : "Summary without complete key or secret payload.",
      },
      {
        id: "audit_release_publish_preview",
        actor: "system",
        action: "release.publish.fixture",
        target: "rel_preview",
        occurredAt: "2026-07-18",
        severity: "info",
        summary: locale === "fr" ? "Publication fixture avec checksum public." : "Fixture publication with public checksum.",
      },
    ],
    settings: [
      { id: "app_url", label: "APP_URL", valuePreview: "https://template-engine-platform.example", status: "configured", secret: false },
      { id: "license_hash_pepper", label: "LICENSE_HASH_PEPPER_V1", valuePreview: "server secret configured", status: "review", secret: true },
      { id: "license_private_key", label: "LICENSE_SIGNING_PRIVATE_KEY_PEM", valuePreview: "server secret configured", status: "review", secret: true },
      { id: "storage_bucket", label: "RELEASE_STORAGE_BUCKET", valuePreview: t.settingPublic, status: "missing", secret: false },
    ],
  }
}
