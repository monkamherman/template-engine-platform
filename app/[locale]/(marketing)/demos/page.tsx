import { DemosPageContent } from "@/components/marketing/demos/demos-page"
import type { Locale } from "@/src/i18n/locales"

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <DemosPageContent locale={activeLocale} />
}
