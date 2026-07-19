import { FeaturesPageContent } from "@/components/marketing/features/features-page"
import type { Locale } from "@/src/i18n/locales"

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <FeaturesPageContent locale={activeLocale} />
}
