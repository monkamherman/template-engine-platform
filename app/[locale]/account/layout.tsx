import type { ReactNode } from "react"

import { WorkspaceShell } from "@/components/layout/shells"
import { accountNavigation } from "@/config/navigation"
import { getCustomerSession } from "@/lib/auth/dev-session"
import type { Locale } from "@/src/i18n/locales"

export default async function AccountLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  const session = await getCustomerSession()

  if (!session) {
    return (
      <WorkspaceShell locale={locale} navigation={[]} title="Account">
        <div className="rounded-lg border border-brand-border bg-white p-6">
          <h1 className="font-heading text-2xl font-bold">Forbidden</h1>
          <p className="mt-3 text-brand-slate">Customer session is required.</p>
        </div>
      </WorkspaceShell>
    )
  }

  return (
    <WorkspaceShell locale={locale} navigation={accountNavigation} title="Account preview">
      {children}
    </WorkspaceShell>
  )
}
