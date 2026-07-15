import Link from "next/link"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster } from "@/components/ui/layout"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

const activations = [
  {
    id: "act_prod_preview",
    environment: "production",
    domain: "boutique-preview.example.test",
    status: "active",
    lastSeen: "2026-07-15",
  },
  {
    id: "act_stage_preview",
    environment: "staging",
    domain: "staging-preview.example.test",
    status: "active",
    lastSeen: "2026-07-14",
  },
] as const

export function LicenseKeyPreview({ locale }: { locale: Locale }) {
  const isFrench = locale === "fr"

  return (
    <main className="grid gap-6">
      <header className="rounded-xl border border-brand-border bg-white p-6 shadow-subtle">
        <Cluster>
          <Badge variant="secondary">WIREFRAME</Badge>
          <Badge variant="outline">fixture</Badge>
          <Badge variant="outline">licensing/documentation</Badge>
        </Cluster>
        <h1 className="mt-5 font-heading text-3xl font-extrabold">
          {isFrench ? "Cle officielle et activations" : "Official key and activations"}
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-brand-slate">
          {isFrench
            ? "Preview honnete de l'experience licence: la cle controle les services officiels, pas les droits sur le code GPL deja recu."
            : "Honest licensing UX preview: the key controls official services, not rights over GPL-covered code already received."}
        </p>
      </header>

      <Alert variant="info">
        {isFrench
          ? "Aucune activation n'est persistee. Les actions sont des apercus non connectes."
          : "No activation is persisted. Actions are disconnected previews."}
      </Alert>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card variant="dashboard">
          <CardHeader>
            <CardTitle>{isFrench ? "Cle masquee" : "Masked key"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-lg font-bold">TEP-PRVW-••••-••••-8F2C</p>
            <p className="mt-3 text-sm leading-6 text-brand-slate">
              {isFrench
                ? "Le prefixe aide le support a retrouver la licence sans exposer le secret complet."
                : "The prefix helps support locate the license without exposing the full secret."}
            </p>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-brand-slate">{isFrench ? "Production" : "Production"}</span>
                <span className="font-semibold">1 / 1</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-brand-slate">Staging</span>
                <span className="font-semibold">1 / 1</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-brand-slate">{isFrench ? "Acces mises a jour" : "Update access"}</span>
                <span className="font-semibold">Preview active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isFrench ? "Installations declarees" : "Declared installations"}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <thead className="border-b border-brand-border text-brand-slate">
                <tr>
                  <th className="py-3 pr-4">{isFrench ? "Environnement" : "Environment"}</th>
                  <th className="py-3 pr-4">Domain</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">{isFrench ? "Derniere validation" : "Last validation"}</th>
                </tr>
              </thead>
              <tbody>
                {activations.map((activation) => (
                  <tr className="border-b border-brand-border last:border-0" key={activation.id}>
                    <td className="py-3 pr-4 font-semibold">{activation.environment}</td>
                    <td className="py-3 pr-4">{activation.domain}</td>
                    <td className="py-3 pr-4">
                      <Badge variant="success">{activation.status}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-brand-slate">{activation.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: isFrench ? "Expiration d'acces" : "Expired access",
            body: isFrench
              ? "Limite les services officiels futurs sans desactiver volontairement une boutique existante."
              : "Limits future official services without intentionally disabling an existing storefront.",
          },
          {
            title: isFrench ? "Suspension/revocation" : "Suspension/revocation",
            body: isFrench
              ? "Reservee aux cas approuves comme abus, fraude, non-paiement ou decision support."
              : "Reserved for approved cases such as abuse, fraud, non-payment or support decision.",
          },
          {
            title: isFrench ? "Changement de domaine" : "Domain change",
            body: isFrench
              ? "La desactivation d'une ancienne installation sera traitee par le service connecte plus tard."
              : "Deactivating an old installation will be handled by the connected service later.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-brand-slate">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-brand-border bg-white p-5">
        <p className="font-semibold">{isFrench ? "Documents applicables" : "Applicable documents"}</p>
        <Cluster className="mt-4">
          <Button asChild variant="outline">
            <Link href={routes.docs.article(locale, "activation")}>{isFrench ? "Guide activation" : "Activation guide"}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.legal.softwareLicense(locale)}>{isFrench ? "Licence logicielle" : "Software license"}</Link>
          </Button>
          <Button disabled>{isFrench ? "Deconnecter une installation" : "Deactivate installation"}</Button>
        </Cluster>
      </div>
    </main>
  )
}
