import type { DocumentationContentDocument } from "@/content/shared/document-types"
import { getDocumentationDocument, listDocumentationDocuments } from "@/modules/content/documents"
import type { Locale } from "@/src/i18n/locales"

export type DocumentationDownload = {
  body: string
  filename: string
  documentCount: number
}

const downloadCopy = {
  fr: {
    bundleTitle: "Documentation Template Engine Platform",
    exported: "Export Markdown public",
    versionScope: "Portee version",
    reviewStatus: "Etat de revue",
    lastReviewedAt: "Derniere revue",
    releaseVersion: "Release",
    guidePath: "Route du guide",
    reviewNotice:
      "Ce fichier est un export de documentation publique. Les compatibilites, engagements support et textes juridiques restent soumis a leur etat de revue.",
  },
  en: {
    bundleTitle: "Template Engine Platform Documentation",
    exported: "Public Markdown export",
    versionScope: "Version scope",
    reviewStatus: "Review state",
    lastReviewedAt: "Last reviewed",
    releaseVersion: "Release",
    guidePath: "Guide path",
    reviewNotice:
      "This file is an export of public documentation. Compatibility, support commitments and legal text remain subject to their review state.",
  },
} as const

export function buildDocumentationDownload(locale: Locale, slug?: string): DocumentationDownload | null {
  const normalizedSlug = normalizeSlug(slug)
  const documents = normalizedSlug
    ? [getDocumentationDocument(locale, normalizedSlug)].filter(Boolean)
    : listDocumentationDocuments(locale)

  if (documents.length === 0) {
    return null
  }

  const typedDocuments = documents as DocumentationContentDocument[]
  const body = [buildDownloadHeader(locale, typedDocuments, normalizedSlug), ...typedDocuments.map(formatDocument)].join("\n\n---\n\n")
  const filename = normalizedSlug
    ? `template-engine-docs-${locale}-${filenameSlug(normalizedSlug)}.md`
    : `template-engine-docs-${locale}.md`

  return {
    body: `${body}\n`,
    documentCount: typedDocuments.length,
    filename,
  }
}

function buildDownloadHeader(locale: Locale, documents: DocumentationContentDocument[], slug?: string) {
  const t = downloadCopy[locale]
  const title = slug ? documents[0]?.title : t.bundleTitle

  return [
    `# ${title}`,
    "",
    `> ${t.exported}`,
    "",
    `- Locale: ${locale}`,
    `- Documents: ${documents.length}`,
    `- ${t.reviewNotice}`,
  ].join("\n")
}

function formatDocument(document: DocumentationContentDocument) {
  const t = downloadCopy[document.locale]
  const metadata = [
    `- ${t.guidePath}: /${document.locale}/docs${document.slug ? `/${document.slug}` : ""}`,
    `- ${t.versionScope}: ${document.productVersionRange}`,
    `- ${t.reviewStatus}: ${document.reviewStatus}`,
    `- ${t.lastReviewedAt}: ${document.lastReviewedAt}`,
    document.releaseVersion ? `- ${t.releaseVersion}: ${document.releaseVersion}` : null,
  ].filter(Boolean)

  return [
    `# ${document.title}`,
    "",
    document.summary,
    "",
    ...metadata,
    "",
    ...document.sections.flatMap((section) => [
      `## ${section.title}`,
      "",
      ...section.body.flatMap((paragraph) => [paragraph, ""]),
    ]),
    document.relatedLinks.length > 0 ? "## Related links" : null,
    document.relatedLinks.length > 0 ? "" : null,
    ...document.relatedLinks.map((href) => `- ${href}`),
  ]
    .filter((line): line is string => line !== null)
    .join("\n")
}

function normalizeSlug(slug?: string) {
  const trimmed = slug?.trim().replace(/^\/+|\/+$/g, "")
  return trimmed || undefined
}

function filenameSlug(slug: string) {
  return slug.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}
