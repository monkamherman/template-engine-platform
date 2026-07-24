import { AccountCorePage } from "@/components/account/account-core-pages"
import { AccountSupportSettingsPage } from "@/components/account/account-support-settings-pages"
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
    return resourceId ? (
      <AccountSupportSettingsPage kind="license-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AccountSupportSettingsPage kind="licenses" locale={locale} />
    )
  }

  if (section === "onboarding") {
    return resourceId ? (
      <AccountSupportSettingsPage kind="onboarding-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AccountSupportSettingsPage kind="onboarding" locale={locale} />
    )
  }

  if (section === "support") {
    if (resourceId === "new") {
      return <AccountSupportSettingsPage kind="support-new" locale={locale} />
    }

    return resourceId ? (
      <AccountSupportSettingsPage kind="support-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AccountSupportSettingsPage kind="support" locale={locale} />
    )
  }

  if (section === "settings") {
    if (resourceId === "profile") {
      return <AccountSupportSettingsPage kind="profile" locale={locale} />
    }

    if (resourceId === "security") {
      return <AccountSupportSettingsPage kind="security" locale={locale} />
    }
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
    ["licenses", "lic_suspended_preview"],
    ["downloads"],
    ["releases"],
    ["onboarding"],
    ["onboarding", "svc_preview"],
    ["onboarding", "svc_managed_preview"],
    ["support"],
    ["support", "new"],
    ["support", "sup_preview"],
    ["support", "sup_closed_preview"],
    ["settings", "profile"],
    ["settings", "security"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
