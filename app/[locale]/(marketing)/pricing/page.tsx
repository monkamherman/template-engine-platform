import { PricingPageContent } from "@/components/marketing/pricing/pricing-page"
import type { Locale } from "@/src/i18n/locales"

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "en" ? "en" : "fr";

  return <PricingPageContent locale={activeLocale} />;
}
