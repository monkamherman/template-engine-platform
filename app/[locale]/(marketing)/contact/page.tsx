import { ContactPageContent } from "@/components/marketing/support/support-pages"
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

  return buildPublicPageMetadata(activeLocale, "contact", routes.marketing.contact(activeLocale))
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <ContactPageContent locale={activeLocale} />
}
