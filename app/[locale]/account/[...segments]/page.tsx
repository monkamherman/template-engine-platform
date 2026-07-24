import { LicenseKeyPreview } from "@/components/account/license-key-preview"
import { AccountCorePage } from "@/components/account/account-core-pages"
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
  const [section, resourceId] = segments

  if (section === "orders") {
    return resourceId ? (
      <AccountCorePage kind="order-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AccountCorePage kind="orders" locale={locale} />
    )
  }

  if (section === "entitlements") {
    return resourceId ? (
      <AccountCorePage kind="entitlement-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AccountCorePage kind="entitlements" locale={locale} />
    )
  }

  if (section === "downloads") {
    return <AccountCorePage kind="downloads" locale={locale} />
  }

  if (section === "releases") {
    return <AccountCorePage kind="releases" locale={locale} />
  }

  if (section === "licenses") {
    return <LicenseKeyPreview locale={locale} />
  }

  const preview = getInterfacePreviewByPath(locale, ["account", ...segments])

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  const routes = [
    ["orders"],
    ["orders", "ord_preview"],
    ["orders", "ord_pending_preview"],
    ["entitlements"],
    ["entitlements", "ent_preview"],
    ["entitlements", "ent_pending_preview"],
    ["entitlements", "ent_expired_preview"],
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
