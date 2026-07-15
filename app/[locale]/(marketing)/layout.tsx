import type { ReactNode } from "react"

import { MarketingShell } from "@/components/layout/shells"
import type { Locale } from "@/src/i18n/locales"

export default async function MarketingLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return <MarketingShell locale={locale}>{children}</MarketingShell>
}
