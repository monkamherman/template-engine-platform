import { InterfacePage } from "@/components/layout/interface-page"
import { getInterfacePreviewByPath } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export default async function AuthGeneratedPage({
  params,
}: {
  params: Promise<{ locale: string; authPage: string }>
}) {
  const { locale: rawLocale, authPage } = await params
  const locale = rawLocale as Locale
  const preview = getInterfacePreviewByPath(locale, [authPage])

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  return ["fr", "en"].flatMap((locale) =>
    ["register", "forgot-password", "reset-password", "verify-email"].map((authPage) => ({
      locale,
      authPage,
    })),
  )
}
