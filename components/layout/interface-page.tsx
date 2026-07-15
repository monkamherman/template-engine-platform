import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster, Stack } from "@/components/ui/layout"
import type { InterfacePreview } from "@/modules/platform/interface-query"

export function InterfacePage({ preview }: { preview: InterfacePreview }) {
  const { entry, locale } = preview

  return (
    <main className="grid gap-6">
      <header className="rounded-xl border border-brand-border bg-white p-6 shadow-subtle">
        <Cluster>
          <Badge variant={entry.maturity === "BRANDED" ? "orange" : "secondary"}>{entry.maturity}</Badge>
          <Badge variant="outline">{entry.dataMode}</Badge>
          <Badge variant="outline">{entry.owner}</Badge>
        </Cluster>
        <h1 className="mt-5 font-heading text-3xl font-extrabold">{entry.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-brand-slate">{preview.summary}</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card variant="feature">
          <CardHeader>
            <CardTitle>{locale === "fr" ? "Structure de l'interface" : "Interface structure"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {preview.primarySections.map((section) => (
              <div key={section} className="rounded-md border border-brand-border bg-brand-canvas p-4">
                <p className="font-semibold">{section}</p>
                <p className="mt-2 text-sm leading-6 text-brand-slate">
                  {locale === "fr"
                    ? "Section representative creee pour valider la navigation, la hierarchie et les etats."
                    : "Representative section for validating navigation, hierarchy and states."}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Stack>
          <Alert variant="info">
            {locale === "fr"
              ? "Les actions non connectees restent en preview et ne simulent pas de persistance."
              : "Disconnected actions remain preview-only and do not simulate persistence."}
          </Alert>
          <Card>
            <CardHeader>
              <CardTitle>{locale === "fr" ? "Etats requis" : "Required states"}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {Object.values(preview.states)
                .filter(Boolean)
                .map((state) => (
                  <div key={state.label} className="rounded-md border border-brand-border p-3">
                    <p className="font-semibold">{state.label}</p>
                    <p className="mt-1 text-sm text-brand-slate">{state.description}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </Stack>
      </div>

      <Card variant="dashboard">
        <CardHeader>
          <CardTitle>{locale === "fr" ? "Donnees representatives" : "Representative data"}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="border-b border-brand-border text-brand-slate">
              <tr>
                <th className="py-3 pr-4">ID</th>
                <th className="py-3 pr-4">Label</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Detail</th>
              </tr>
            </thead>
            <tbody>
              {preview.records.map((record) => (
                <tr key={record.id} className="border-b border-brand-border last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs">{record.id}</td>
                  <td className="py-3 pr-4 font-semibold">{record.label}</td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className="py-3 pr-4 text-brand-slate">{record.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-dashed border-brand-border bg-white p-5">
        <p className="font-semibold">{locale === "fr" ? "Actions preview" : "Preview actions"}</p>
        <Cluster className="mt-4">
          <Button disabled>{locale === "fr" ? "Action non connectee" : "Disconnected action"}</Button>
          <Button variant="outline">{locale === "fr" ? "Voir les etats" : "View states"}</Button>
        </Cluster>
      </div>
    </main>
  )
}

export function StatusBadge({ status }: { status: InterfacePreview["records"][number]["status"] }) {
  const variant =
    status === "active" || status === "paid" || status === "published"
      ? "success"
      : status === "failed" || status === "revoked"
        ? "destructive"
        : status === "suspended"
          ? "orange"
          : "secondary"

  return <Badge variant={variant}>{status}</Badge>
}
