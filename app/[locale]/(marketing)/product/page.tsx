import { ProductPageContent } from "@/components/marketing/product/product-page"
import type { Locale } from "@/src/i18n/locales"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"

  return <ProductPageContent locale={activeLocale} />
}
