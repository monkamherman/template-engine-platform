import { DemosPageContent } from "@/components/marketing/demos/demos-page"
import { routes } from "@/config/routes"
import { buildPublicPageMetadata } from "@/config/seo"
import type { Locale } from "@/src/i18n/locales"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return buildPublicPageMetadata(activeLocale, "demos", routes.marketing.demos(activeLocale))
}

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <DemosPageContent locale={activeLocale} />
}
