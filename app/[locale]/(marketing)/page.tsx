import { MarketingHome } from "@/components/marketing/home/marketing-home"
import type { Locale } from "@/src/i18n/locales"

export default async function MarketingHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "en" ? "en" : "fr";

  return <MarketingHome locale={activeLocale} />;
}
