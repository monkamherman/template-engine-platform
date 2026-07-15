import type { ReactNode } from "react"

import { WorkspaceShell } from "@/components/layout/shells"
import { adminNavigation } from "@/config/navigation"
import { getAdminSession } from "@/lib/auth/dev-session"
import type { Locale } from "@/src/i18n/locales"

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  const session = await getAdminSession()

  if (!session) {
    return (
      <WorkspaceShell locale={locale} navigation={[]} title="Admin" tone="admin">
        <div className="rounded-lg border border-brand-border bg-white p-6">
          <h1 className="font-heading text-2xl font-bold">Forbidden</h1>
          <p className="mt-3 text-brand-slate">Administrator role is required.</p>
        </div>
      </WorkspaceShell>
    )
  }

  return (
    <WorkspaceShell locale={locale} navigation={adminNavigation} title="Admin preview" tone="admin">
      {children}
    </WorkspaceShell>
  )
}
