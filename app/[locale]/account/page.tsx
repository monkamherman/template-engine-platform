import { InterfacePage } from "@/components/layout/interface-page"
import { getInterfacePreviewById } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return <InterfacePage preview={getInterfacePreviewById(locale, "account.dashboard")} />
}
