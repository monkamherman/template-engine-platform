import { InterfacePage } from "@/components/layout/interface-page"
import { getInterfacePreviewByPath } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export default async function MarketingGeneratedPage({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>
}) {
  const { locale: rawLocale, segments = [] } = await params
  const locale = rawLocale as Locale
  const preview = getInterfacePreviewByPath(locale, segments)

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  const routes = [
    ["features"],
    ["demos"],
    ["demos", "dropshipping-modele"],
    ["use-cases"],
    ["use-cases", "dropshipping"],
    ["use-cases", "stock"],
    ["use-cases", "hybrid"],
    ["use-cases", "digital"],
    ["offers", "starter"],
    ["offers", "pro"],
    ["offers", "managed"],
    ["faq"],
    ["contact"],
    ["legal", "license"],
    ["legal", "terms"],
    ["legal", "privacy"],
    ["legal", "refunds"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
