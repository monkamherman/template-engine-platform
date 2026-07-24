import { AccountCorePage } from "@/components/account/account-core-pages"
import type { Locale } from "@/src/i18n/locales"

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return <AccountCorePage kind="dashboard" locale={locale} />
}
