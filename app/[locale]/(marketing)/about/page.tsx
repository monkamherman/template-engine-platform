import { AboutPageContent } from "@/components/marketing/support/support-pages"
import type { Locale } from "@/src/i18n/locales"

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <AboutPageContent locale={activeLocale} />
}
