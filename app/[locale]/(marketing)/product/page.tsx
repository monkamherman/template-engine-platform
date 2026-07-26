import { ProductPageContent } from "@/components/marketing/product/product-page"
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

  return buildPublicPageMetadata(activeLocale, "product", routes.marketing.product(activeLocale))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <ProductPageContent locale={activeLocale} />
}
