import { LicenseKeyPreview } from "@/components/account/license-key-preview"
import { InterfacePage } from "@/components/layout/interface-page"
import { getInterfacePreviewByPath } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export default async function AccountGeneratedPage({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>
}) {
  const { locale: rawLocale, segments = [] } = await params
  const locale = rawLocale as Locale

  if (segments[0] === "licenses") {
    return <LicenseKeyPreview locale={locale} />
  }

  const preview = getInterfacePreviewByPath(locale, ["account", ...segments])

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  const routes = [
    ["orders"],
    ["orders", "ord_preview"],
    ["entitlements"],
    ["entitlements", "ent_preview"],
    ["licenses"],
    ["licenses", "lic_preview"],
    ["downloads"],
    ["releases"],
    ["onboarding"],
    ["onboarding", "svc_preview"],
    ["support"],
    ["support", "new"],
    ["support", "sup_preview"],
    ["settings", "profile"],
    ["settings", "security"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
