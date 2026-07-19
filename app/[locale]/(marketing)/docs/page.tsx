import { notFound } from "next/navigation"

import { DocsHomeContent } from "@/components/marketing/docs/docs-home"
import { getDocumentationDocument } from "@/modules/content/documents"
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
