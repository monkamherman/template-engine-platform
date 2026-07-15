import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container, Section } from "@/components/ui/layout"
import { listInterfaces } from "@/modules/platform/interface-query"
import type { Locale } from "@/src/i18n/locales"

export default async function InterfaceMapPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  if (process.env.NODE_ENV === "production") {
    notFound()
  }

  const { locale: rawLocale } = await params
  const locale = rawLocale as Locale
  const interfaces = listInterfaces()

  return (
    <main className="min-h-screen bg-brand-canvas">
      <Section>
        <Container wide>
          <header>
            <Badge variant="orange">Development only</Badge>
            <h1 className="mt-4 font-heading text-4xl font-extrabold">Interface registry</h1>
            <p className="mt-3 max-w-3xl text-brand-slate">
              Generated from `config/interface-registry.ts`. It tracks route, owner, maturity and data mode for progressive customization.
            </p>
          </header>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>V1 interfaces</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full min-w-[64rem] text-left text-sm">
                <thead className="border-b border-brand-border text-brand-slate">
                  <tr>
                    <th className="py-3 pr-4">ID</th>
                    <th className="py-3 pr-4">Route</th>
                    <th className="py-3 pr-4">Audience</th>
                    <th className="py-3 pr-4">Owner</th>
                    <th className="py-3 pr-4">Maturity</th>
                    <th className="py-3 pr-4">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {interfaces.map((entry) => {
                    const href = entry.buildPath?.(locale)

                    return (
                      <tr key={entry.id} className="border-b border-brand-border last:border-0">
                        <td className="py-3 pr-4 font-mono text-xs">{entry.id}</td>
                        <td className="py-3 pr-4">
                          {href ? (
                            <Link className="font-semibold text-brand-orange-strong hover:underline" href={href}>
                              {entry.routePattern}
                            </Link>
                          ) : (
                            entry.routePattern
                          )}
                        </td>
                        <td className="py-3 pr-4">{entry.audience}</td>
                        <td className="py-3 pr-4">{entry.owner}</td>
                        <td className="py-3 pr-4">
                          <Badge variant={entry.maturity === "BRANDED" ? "orange" : "secondary"}>{entry.maturity}</Badge>
                        </td>
                        <td className="py-3 pr-4">{entry.dataMode}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  )
}
