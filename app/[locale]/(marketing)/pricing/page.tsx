import { PricingPageContent } from "@/components/marketing/pricing/pricing-page"
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

  return buildPublicPageMetadata(activeLocale, "pricing", routes.marketing.pricing(activeLocale))
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "en" ? "en" : "fr";

  return <PricingPageContent locale={activeLocale} />;
}
