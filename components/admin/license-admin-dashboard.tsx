import { unstable_noStore as noStore } from "next/cache"

import prisma from "@/lib/prisma"
import { Alert } from "@/components/ui/alert"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster, Stack } from "@/components/ui/layout"
import { getAdminLicenseOverview, type AdminLicenseOverview } from "@/modules/licensing/queries/admin-license-query"
import type { Locale } from "@/src/i18n/locales"

import { LicenseApiWorkbench } from "./license-api-workbench"

export async function LicenseAdminDashboard({ locale }: { locale: Locale }) {
  noStore()

  const isFrench = locale === "fr"
  const overview = await loadOverview()

  return (
    <main className="grid min-w-0 gap-6">
      <header className="rounded-xl border border-brand-border bg-white p-4 shadow-subtle sm:p-6">
        <Cluster>
          <Badge variant="orange">Sprint 05A</Badge>
          <Badge variant="success">CONNECTED</Badge>
          <Badge variant="outline">Prisma</Badge>
        </Cluster>
        <h1 className="mt-5 font-heading text-2xl font-extrabold sm:text-3xl">
          {isFrench ? "Administration des licences" : "License administration"}
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-brand-slate">
          {isFrench
            ? "Vue operateur connectee a la base pour inspecter les licences emises, les activations et tester le protocole V1."
            : "Operator view connected to the database for inspecting issued licenses, activations and testing the V1 protocol."}
        </p>
      </header>

      {overview ? <LicenseOverview locale={locale} overview={overview} /> : <DatabaseUnavailable locale={locale} />}

      <LicenseApiWorkbench locale={locale} />
    </main>
  )
}

async function loadOverview() {
  try {
    return await getAdminLicenseOverview(prisma)
  } catch {
    return null
  }
}

function LicenseOverview({ locale, overview }: { locale: Locale; overview: AdminLicenseOverview }) {
  const isFrench = locale === "fr"
  const summary = [
    [isFrench ? "Licences" : "Licenses", overview.summary.totalLicenses],
    [isFrench ? "Actives" : "Active", overview.summary.activeLicenses],
    [isFrench ? "Suspendues" : "Suspended", overview.summary.suspendedLicenses],
    [isFrench ? "Revoquees" : "Revoked", overview.summary.revokedLicenses],
    [isFrench ? "Prod actives" : "Active prod", overview.summary.activeProductionActivations],
    [isFrench ? "Staging actives" : "Active staging", overview.summary.activeStagingActivations],
  ] as const

  return (
    <section className="grid min-w-0 gap-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {summary.map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-brand-slate">{label}</div>
              <div className="mt-2 font-heading text-3xl font-extrabold text-brand-ink">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{isFrench ? "Dernieres licences" : "Recent licenses"}</CardTitle>
          </CardHeader>
          <CardContent>
            {overview.licenses.length > 0 ? (
              <>
                <div className="grid gap-3 md:hidden">
                  {overview.licenses.map((license) => (
                    <article className="rounded-md border border-brand-border p-4" key={license.id}>
                      <Cluster className="justify-between">
                        <StatusBadge status={license.status} />
                        <span className="font-mono text-xs text-brand-slate">v{license.keyVersion}</span>
                      </Cluster>
                      <div className="mt-3 break-all font-mono text-xs">
                        {license.keyPrefix}-...-{license.keyLast4}
                      </div>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">{license.productName}</div>
                        <div className="mt-1 break-words text-brand-slate">{license.customerEmail}</div>
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <dt className="text-brand-slate">{isFrench ? "Limites" : "Limits"}</dt>
                          <dd className="mt-1 font-medium">
                            PROD {license.productionLimit} / STG {license.stagingLimit}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-brand-slate">{isFrench ? "Activations" : "Activations"}</dt>
                          <dd className="mt-1 font-medium">{license.activationCount}</dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-brand-slate">{isFrench ? "Derniere validation" : "Last validation"}</dt>
                          <dd className="mt-1 font-medium">{formatDate(license.lastValidatedAt, locale)}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
                <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[56rem] text-left text-sm">
                  <thead className="border-b border-brand-border text-xs uppercase text-brand-slate">
                    <tr>
                      <th className="py-3 pr-4 font-semibold">{isFrench ? "Cle" : "Key"}</th>
                      <th className="py-3 pr-4 font-semibold">Client</th>
                      <th className="py-3 pr-4 font-semibold">Produit</th>
                      <th className="py-3 pr-4 font-semibold">{isFrench ? "Statut" : "Status"}</th>
                      <th className="py-3 pr-4 font-semibold">{isFrench ? "Limites" : "Limits"}</th>
                      <th className="py-3 pr-4 font-semibold">{isFrench ? "Derniere validation" : "Last validation"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {overview.licenses.map((license) => (
                      <tr key={license.id}>
                        <td className="py-4 pr-4 font-mono text-xs">
                          {license.keyPrefix}-...-{license.keyLast4}
                          <div className="mt-1 text-brand-slate">v{license.keyVersion}</div>
                        </td>
                        <td className="py-4 pr-4">{license.customerEmail}</td>
                        <td className="py-4 pr-4">
                          <div className="font-medium">{license.productName}</div>
                          <div className="text-xs text-brand-slate">{license.offerName}</div>
                        </td>
                        <td className="py-4 pr-4">
                          <StatusBadge status={license.status} />
                        </td>
                        <td className="py-4 pr-4">
                          PROD {license.productionLimit} / STG {license.stagingLimit}
                          <div className="mt-1 text-xs text-brand-slate">
                            {license.activationCount} {isFrench ? "activation(s)" : "activation(s)"}
                          </div>
                        </td>
                        <td className="py-4 pr-4">{formatDate(license.lastValidatedAt, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </>
            ) : (
              <EmptyState>{isFrench ? "Aucune licence emise pour le moment." : "No issued licenses yet."}</EmptyState>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isFrench ? "Activations recentes" : "Recent activations"}</CardTitle>
          </CardHeader>
          <CardContent>
            {overview.recentActivations.length > 0 ? (
              <Stack gap="sm">
                {overview.recentActivations.map((activation) => (
                  <div className="rounded-md border border-brand-border p-4" key={activation.id}>
                    <Cluster className="justify-between">
                      <StatusBadge status={activation.status} />
                      <Badge variant="outline">{activation.environment}</Badge>
                    </Cluster>
                    <div className="mt-3 font-medium">{activation.normalizedDomain}</div>
                    <div className="mt-1 text-sm text-brand-slate">{activation.customerEmail}</div>
                    <div className="mt-3 break-all font-mono text-xs text-brand-slate">{activation.installationId}</div>
                    <div className="mt-3 text-xs text-brand-slate">
                      {isFrench ? "Vu" : "Seen"}: {formatDate(activation.lastSeenAt ?? activation.activatedAt, locale)}
                    </div>
                  </div>
                ))}
              </Stack>
            ) : (
              <EmptyState>{isFrench ? "Aucune activation enregistree." : "No recorded activations."}</EmptyState>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function DatabaseUnavailable({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr"

  return (
    <Alert variant="warning">
      {isFrench
        ? "La vue base de donnees n'est pas disponible dans cet environnement. Le workbench API reste accessible pour tester les routes si le serveur est configure."
        : "The database view is not available in this environment. The API workbench remains available for route testing when the server is configured."}
    </Alert>
  )
}

function EmptyState({ children }: { children: string }) {
  return <div className="rounded-md border border-dashed border-brand-border p-6 text-sm text-brand-slate">{children}</div>
}

function StatusBadge({ status }: { status: string }) {
  const variantByStatus: Record<string, BadgeProps["variant"]> = {
    ACTIVE: "success",
    SUSPENDED: "orange",
    EXPIRED: "secondary",
    REVOKED: "destructive",
    DEACTIVATED: "secondary",
    BLOCKED: "destructive",
  }

  return <Badge variant={variantByStatus[status] ?? "outline"}>{status}</Badge>
}

function formatDate(date: Date | null, locale: Locale) {
  if (!date) return "-"
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}
