import { notFound } from "next/navigation"

import { DocsHomeContent } from "@/components/marketing/docs/docs-home"
import { routes } from "@/config/routes"
import { buildDocumentMetadata, buildPublicPageMetadata } from "@/config/seo"
import { getDocumentationDocument } from "@/modules/content/documents"
import { isLocale, type Locale } from "@/src/i18n/locales"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return buildPublicPageMetadata("fr", "docs", routes.docs.index("fr"))

  const document = getDocumentationDocument(rawLocale, "")

  if (!document) {
    return buildPublicPageMetadata(rawLocale, "docs", routes.docs.index(rawLocale))
  }

  return buildDocumentMetadata({
    locale: rawLocale,
    path: routes.docs.index(rawLocale),
    title: document.title,
    description: document.summary,
  })
}

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
    <DocsHomeContent
      locale={locale}
      metadata={{
        lastReviewedAt: document.lastReviewedAt,
        productVersionRange: document.productVersionRange,
        reviewStatus: document.reviewStatus,
      }}
    />
  )
}
