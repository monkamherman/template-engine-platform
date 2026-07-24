import { notFound } from "next/navigation"

import { DocumentSections, DocumentShell } from "@/components/layout/document-shell"
import { routes } from "@/config/routes"
import { documentationSlugs, getDocumentationDocument, getDocumentationNeighbors } from "@/modules/content/documents"
import { isLocale, type Locale } from "@/src/i18n/locales"

export default async function DocumentationArticlePage({
  params,
}: {
  params: Promise<{ locale: string; segments: string[] }>
}) {
  const { locale: rawLocale, segments } = await params
  if (!isLocale(rawLocale)) notFound()

  const locale: Locale = rawLocale
  const slug = segments.join("/")
  const document = getDocumentationDocument(locale, slug)
  if (!document) notFound()

  const neighbors = getDocumentationNeighbors(locale, slug)

  return (
    <DocumentShell
      breadcrumbs={[
        { label: "Docs", href: routes.docs.index(locale) },
        { label: document.title, href: routes.docs.article(locale, document.slug) },
      ]}
      lastReviewedAt={document.lastReviewedAt}
      locale={locale}
      next={neighbors.next}
      previous={neighbors.previous}
      productVersionRange={document.productVersionRange}
      relatedLinks={document.relatedLinks}
      releaseVersion={document.releaseVersion}
      reviewStatus={document.reviewStatus}
      sections={document.sections}
      summary={document.summary}
      title={document.title}
    >
      <DocumentSections document={document} />
    </DocumentShell>
  )
}

export function generateStaticParams() {
  return ["fr", "en"].flatMap((locale) =>
    documentationSlugs
      .filter((slug) => slug !== "")
      .map((slug) => ({
        locale,
        segments: slug.split("/"),
      })),
  )
}
