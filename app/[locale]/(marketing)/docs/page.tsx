import { notFound } from "next/navigation"

import { DocumentSections, DocumentShell } from "@/components/layout/document-shell"
import { routes } from "@/config/routes"
import { getDocumentationDocument, getDocumentationNeighbors } from "@/modules/content/documents"
import { isLocale, type Locale } from "@/src/i18n/locales"

export default async function DocumentationIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const locale: Locale = rawLocale
  const document = getDocumentationDocument(locale, "")
  if (!document) notFound()

  return (
    <DocumentShell
      breadcrumbs={[{ label: "Docs", href: routes.docs.index(locale) }]}
      lastReviewedAt={document.lastReviewedAt}
      locale={locale}
      next={getDocumentationNeighbors(locale, "").next}
      reviewStatus={document.reviewStatus}
      sections={document.sections}
      summary={document.summary}
      title={document.title}
    >
      <DocumentSections document={document} />
    </DocumentShell>
  )
}
