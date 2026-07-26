import { MarketingHome } from "@/components/marketing/home/marketing-home"
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

  return buildPublicPageMetadata(activeLocale, "home", routes.home(activeLocale))
}

export default async function MarketingHomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "en" ? "en" : "fr";

  return <MarketingHome locale={activeLocale} />;
}
