import type { ReactNode } from "react"

import { AuthShell } from "@/components/layout/shells"
import type { Locale } from "@/src/i18n/locales"

export default async function AuthLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale

  return <AuthShell locale={locale}>{children}</AuthShell>
}
