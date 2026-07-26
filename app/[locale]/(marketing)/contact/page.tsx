import { ContactPageContent } from "@/components/marketing/support/support-pages"
import type { Locale } from "@/src/i18n/locales"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <ContactPageContent locale={activeLocale} />
}
