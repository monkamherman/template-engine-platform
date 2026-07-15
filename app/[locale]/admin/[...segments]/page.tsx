import { InterfacePage } from "@/components/layout/interface-page"
import { getInterfacePreviewByPath } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export default async function AdminGeneratedPage({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>
}) {
  const { locale: rawLocale, segments = [] } = await params
  const locale = rawLocale as Locale
  const preview = getInterfacePreviewByPath(locale, ["admin", ...segments])

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  const routes = [
    ["customers"],
    ["customers", "cus_preview"],
    ["catalog", "products"],
    ["catalog", "products", "new"],
    ["catalog", "products", "prd_preview"],
    ["catalog", "offers"],
    ["catalog", "offers", "off_preview"],
    ["catalog", "prices"],
    ["orders"],
    ["orders", "ord_preview"],
    ["payments"],
    ["payments", "pay_preview"],
    ["entitlements"],
    ["entitlements", "ent_preview"],
    ["licenses"],
    ["licenses", "lic_preview"],
    ["releases"],
    ["releases", "new"],
    ["releases", "rel_preview"],
    ["services"],
    ["services", "svc_preview"],
    ["support"],
    ["support", "sup_preview"],
    ["audit"],
    ["settings"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
