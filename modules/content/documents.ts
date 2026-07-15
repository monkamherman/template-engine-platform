import { englishDocumentationDocuments } from "@/content/docs/en/documents"
import { frenchDocumentationDocuments } from "@/content/docs/fr/documents"
import { englishLegalDocuments } from "@/content/legal/en/documents"
import { frenchLegalDocuments } from "@/content/legal/fr/documents"
import type { DocumentationContentDocument, LegalContentDocument } from "@/content/shared/document-types"
import type { Locale } from "@/src/i18n/locales"

export const legalSlugs = ["software-license", "commercial-terms", "support-policy", "refunds", "privacy", "trademark"] as const
export const documentationSlugs = [
  "",
  "getting-started",
  "requirements",
  "installation",
  "activation",
  "initial-setup",
  "shop-models",
  "niches",
  "localization",
  "products",
  "payments",
  "customization",
  "updates",
  "backup-rollback",
  "troubleshooting",
  "faq",
  "releases/1.0.0",
] as const

export type LegalSlug = (typeof legalSlugs)[number]
export type DocumentationSlug = (typeof documentationSlugs)[number]

const legalByLocale = {
  fr: frenchLegalDocuments,
  en: englishLegalDocuments,
} satisfies Record<Locale, LegalContentDocument[]>

const docsByLocale = {
  fr: frenchDocumentationDocuments,
  en: englishDocumentationDocuments,
} satisfies Record<Locale, DocumentationContentDocument[]>

export function listLegalDocuments(locale: Locale) {
  return legalByLocale[locale].filter((document) => document.visibility === "public")
}

export function getLegalDocument(locale: Locale, slug: string) {
  return listLegalDocuments(locale).find((document) => document.slug === slug)
}

export function listDocumentationDocuments(locale: Locale) {
  return docsByLocale[locale].filter((document) => document.visibility === "public")
}

export function getDocumentationDocument(locale: Locale, slug = "") {
  return listDocumentationDocuments(locale).find((document) => document.slug === slug)
}

export function getDocumentationNeighbors(locale: Locale, slug: string) {
  const documents = listDocumentationDocuments(locale)
  const index = documents.findIndex((document) => document.slug === slug)

  return {
    previous: index > 0 ? documents[index - 1] : null,
    next: index >= 0 && index < documents.length - 1 ? documents[index + 1] : null,
  }
}

export function getDocumentationPath(locale: Locale, slug: string) {
  return `/${locale}/docs${slug ? `/${slug}` : ""}`
}

export function assertContentIntegrity() {
  for (const locale of ["fr", "en"] satisfies Locale[]) {
    assertUniqueIds(listLegalDocuments(locale), `legal:${locale}`)
    assertUniqueIds(listDocumentationDocuments(locale), `docs:${locale}`)
    assertRequiredLegalDocuments(locale)
    assertRequiredDocumentationDocuments(locale)
  }

  assertMatchingLocalizedIds(listLegalDocuments("fr"), listLegalDocuments("en"), "legal")
  assertMatchingLocalizedIds(listDocumentationDocuments("fr"), listDocumentationDocuments("en"), "docs")
}

function assertUniqueIds(documents: Array<{ id: string }>, label: string) {
  const ids = new Set<string>()

  for (const document of documents) {
    if (ids.has(document.id)) {
      throw new Error(`Duplicate ${label} document id: ${document.id}`)
    }

    ids.add(document.id)
  }
}

function assertRequiredLegalDocuments(locale: Locale) {
  const slugs = new Set(listLegalDocuments(locale).map((document) => document.slug))

  for (const slug of legalSlugs) {
    if (!slugs.has(slug)) {
      throw new Error(`Missing ${locale} legal document: ${slug}`)
    }
  }
}

function assertRequiredDocumentationDocuments(locale: Locale) {
  const slugs = new Set(listDocumentationDocuments(locale).map((document) => document.slug))

  for (const slug of documentationSlugs) {
    if (!slugs.has(slug)) {
      throw new Error(`Missing ${locale} documentation document: ${slug}`)
    }
  }
}

function assertMatchingLocalizedIds(
  frenchDocuments: Array<{ id: string }>,
  englishDocuments: Array<{ id: string }>,
  label: string,
) {
  const frIds = frenchDocuments.map((document) => document.id).sort()
  const enIds = englishDocuments.map((document) => document.id).sort()

  if (frIds.join("|") !== enIds.join("|")) {
    throw new Error(`Mismatched ${label} localized document IDs`)
  }
}
