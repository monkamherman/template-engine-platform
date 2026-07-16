import { LicenseApiWorkbench } from "@/components/admin/license-api-workbench"
import { ReviewWorkspacePreview } from "@/components/admin/review-workspace-preview"
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

  if (segments[0] === "legal") {
    return <ReviewWorkspacePreview kind="legal" locale={locale} />
  }

  if (segments[0] === "documentation") {
    return <ReviewWorkspacePreview kind="documentation" locale={locale} />
  }

  if (segments[0] === "licenses") {
    return <LicenseApiWorkbench locale={locale} />
  }

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
    ["legal"],
    ["legal", "legal_preview"],
    ["documentation"],
    ["documentation", "docs_preview"],
    ["services"],
    ["services", "svc_preview"],
    ["support"],
    ["support", "sup_preview"],
    ["audit"],
    ["settings"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
