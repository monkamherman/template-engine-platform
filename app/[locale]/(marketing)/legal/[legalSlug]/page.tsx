import { notFound } from "next/navigation"

import { DocumentSections, DocumentShell } from "@/components/layout/document-shell"
import { routes } from "@/config/routes"
import { getLegalDocument, legalSlugs } from "@/modules/content/documents"
import { isLocale, type Locale } from "@/src/i18n/locales"

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ locale: string; legalSlug: string }>
}) {
  const { locale: rawLocale, legalSlug } = await params
  if (!isLocale(rawLocale)) notFound()

  const locale: Locale = rawLocale
  const document = getLegalDocument(locale, legalSlug)
  if (!document) notFound()

  return (
    <DocumentShell
      breadcrumbs={[
        { label: "Legal", href: routes.legal.document(locale, document.slug) },
        { label: document.title, href: routes.legal.document(locale, document.slug) },
      ]}
      lastReviewedAt={document.lastReviewedAt}
      locale={locale}
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
  return ["fr", "en"].flatMap((locale) => legalSlugs.map((legalSlug) => ({ locale, legalSlug })))
}
