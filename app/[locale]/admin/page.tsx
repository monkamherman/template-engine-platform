import { AdminCommercePage } from "@/components/admin/admin-commerce-pages"
import type { Locale } from "@/src/i18n/locales"

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return <AdminCommercePage kind="dashboard" locale={locale} />
}
