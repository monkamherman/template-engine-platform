import { AdminCommercePage } from "@/components/admin/admin-commerce-pages"
import { AdminOperationsPage } from "@/components/admin/admin-operations-pages"
import { LicenseAdminDashboard } from "@/components/admin/license-admin-dashboard"
import { ReviewWorkspacePreview } from "@/components/admin/review-workspace-preview"
import { InterfacePage } from "@/components/layout/interface-page"
import { getInterfacePreviewByPath } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export const dynamic = "force-dynamic"

export default async function AdminGeneratedPage({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>
}) {
  const { locale: rawLocale, segments = [] } = await params
  const locale = rawLocale as Locale
  const [section, resourceType, resourceId] = segments

  if (section === "customers") {
    return resourceType ? (
      <AdminCommercePage kind="customer-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <AdminCommercePage kind="customers" locale={locale} />
    )
  }

  if (section === "catalog" && resourceType === "products") {
    if (resourceId === "new") return <AdminCommercePage kind="product-new" locale={locale} />

    return resourceId ? (
      <AdminCommercePage kind="product-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AdminCommercePage kind="products" locale={locale} />
    )
  }

  if (section === "catalog" && resourceType === "offers") {
    return resourceId ? (
      <AdminCommercePage kind="offer-detail" locale={locale} resourceId={resourceId} />
    ) : (
      <AdminCommercePage kind="offers" locale={locale} />
    )
  }

  if (section === "catalog" && resourceType === "prices") {
    return <AdminCommercePage kind="prices" locale={locale} />
  }

  if (section === "orders") {
    return resourceType ? (
      <AdminCommercePage kind="order-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <AdminCommercePage kind="orders" locale={locale} />
    )
  }

  if (section === "payments") {
    return resourceType ? (
      <AdminCommercePage kind="payment-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <AdminCommercePage kind="payments" locale={locale} />
    )
  }

  if (section === "entitlements") {
    return resourceType ? (
      <AdminOperationsPage kind="entitlement-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <AdminOperationsPage kind="entitlements" locale={locale} />
    )
  }

  if (section === "licenses") {
    return resourceType ? (
      <AdminOperationsPage kind="license-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <LicenseAdminDashboard locale={locale} />
    )
  }

  if (section === "releases") {
    if (resourceType === "new") return <AdminOperationsPage kind="release-new" locale={locale} />

    return resourceType ? (
      <AdminOperationsPage kind="release-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <AdminOperationsPage kind="releases" locale={locale} />
    )
  }

  if (section === "legal") {
    return <AdminOperationsPage kind="legal" locale={locale} />
  }

  if (section === "documentation") {
    return <ReviewWorkspacePreview kind="documentation" locale={locale} />
  }

  if (section === "support") {
    return resourceType ? (
      <AdminOperationsPage kind="support-detail" locale={locale} resourceId={resourceType} />
    ) : (
      <AdminOperationsPage kind="support" locale={locale} />
    )
  }

  if (section === "audit") {
    return <AdminOperationsPage kind="audit" locale={locale} />
  }

  if (section === "settings") {
    return <AdminOperationsPage kind="settings" locale={locale} />
  }

  const preview = getInterfacePreviewByPath(locale, ["admin", ...segments])

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  const routes = [
    ["customers"],
    ["customers", "cus_preview"],
    ["customers", "cus_pro_preview"],
    ["catalog", "products"],
    ["catalog", "products", "new"],
    ["catalog", "products", "prd_preview"],
    ["catalog", "products", "prd_service_preview"],
    ["catalog", "offers"],
    ["catalog", "offers", "off_preview"],
    ["catalog", "offers", "off_pro_preview"],
    ["catalog", "offers", "off_managed_preview"],
    ["catalog", "prices"],
    ["orders"],
    ["orders", "ord_preview"],
    ["orders", "ord_pro_preview"],
    ["payments"],
    ["payments", "pay_preview"],
    ["payments", "pay_pending_preview"],
    ["entitlements"],
    ["entitlements", "ent_preview"],
    ["entitlements", "ent_pending_preview"],
    ["entitlements", "ent_suspended_preview"],
    ["licenses"],
    ["licenses", "lic_preview"],
    ["licenses", "lic_suspended_preview"],
    ["releases"],
    ["releases", "new"],
    ["releases", "rel_preview"],
    ["releases", "rel_draft_preview"],
    ["legal"],
    ["legal", "legal_preview"],
    ["documentation"],
    ["documentation", "docs_preview"],
    ["services"],
    ["services", "svc_preview"],
    ["support"],
    ["support", "sup_preview"],
    ["support", "sup_download_preview"],
    ["audit"],
    ["settings"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
