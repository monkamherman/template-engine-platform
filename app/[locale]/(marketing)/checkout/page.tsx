import { CheckoutPage } from "@/components/checkout/checkout-pages"
import type { Locale } from "@/src/i18n/locales"

export default async function CheckoutRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return <CheckoutPage locale={locale} />
}
