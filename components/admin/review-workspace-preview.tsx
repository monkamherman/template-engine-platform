import Link from "next/link"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster } from "@/components/ui/layout"
import { routes } from "@/config/routes"
import { listDocumentationDocuments, listLegalDocuments } from "@/modules/content/documents"
import type { Locale } from "@/src/i18n/locales"

export function ReviewWorkspacePreview({
  locale,
  kind,
}: {
  locale: Locale
  kind: "legal" | "documentation"
}) {
  const isFrench = locale === "fr"
  const documents = kind === "legal" ? listLegalDocuments(locale) : listDocumentationDocuments(locale)
  const title =
    kind === "legal"
      ? isFrench
        ? "Revue des documents legaux"
        : "Legal document review"
      : isFrench
        ? "Revue documentation"
        : "Documentation review"

  return (
    <main className="grid gap-6">
      <header className="rounded-xl border border-brand-border bg-white p-6 shadow-subtle">
        <Cluster>
          <Badge variant="secondary">WIREFRAME</Badge>
          <Badge variant="outline">fixture</Badge>
          <Badge variant="outline">{kind}</Badge>
        </Cluster>
        <h1 className="mt-5 font-heading text-3xl font-extrabold">{title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-brand-slate">
          {isFrench
            ? "Interface operationnelle preview pour suivre statuts de revue, versions et documents manquants sans publier de contenu."
            : "Operational preview interface for tracking review states, versions and missing documents without publishing content."}
        </p>
      </header>

      <Alert variant="info">
        {isFrench
          ? "Les actions de publication, archivage et approbation sont des boutons desactives tant que le workflow reel n'est pas connecte."
          : "Publish, archive and approval actions are disabled until the real workflow is connected."}
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>{isFrench ? "Files de revue" : "Review queue"}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="border-b border-brand-border text-brand-slate">
              <tr>
                <th className="py-3 pr-4">ID</th>
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Owner</th>
                <th className="py-3 pr-4">{isFrench ? "Derniere revue" : "Last review"}</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 8).map((document) => (
                <tr className="border-b border-brand-border last:border-0" key={document.id}>
                  <td className="py-3 pr-4 font-mono text-xs">{document.id}</td>
                  <td className="py-3 pr-4 font-semibold">{document.title}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={document.reviewStatus === "LEGAL_REVIEW" ? "orange" : "secondary"}>
                      {document.reviewStatus}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">{document.owner}</td>
                  <td className="py-3 pr-4 text-brand-slate">{document.lastReviewedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          {
            label: isFrench ? "Documents publics" : "Public documents",
            value: documents.length,
          },
          {
            label: isFrench ? "En revue" : "In review",
            value: documents.filter((document) => document.reviewStatus.includes("REVIEW")).length,
          },
          {
            label: isFrench ? "Publies" : "Published",
            value: documents.filter((document) => String(document.reviewStatus) === "PUBLISHED").length,
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-sm text-brand-slate">{item.label}</p>
              <p className="mt-2 font-heading text-3xl font-extrabold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-brand-border bg-white p-5">
        <p className="font-semibold">{isFrench ? "Liens de verification" : "Verification links"}</p>
        <Cluster className="mt-4">
          <Button asChild variant="outline">
            <Link href={kind === "legal" ? routes.legal.softwareLicense(locale) : routes.docs.index(locale)}>
              {isFrench ? "Voir cote public" : "View public side"}
            </Link>
          </Button>
          <Button disabled>{isFrench ? "Publier une version" : "Publish version"}</Button>
          <Button disabled variant="danger">
            {isFrench ? "Archiver" : "Archive"}
          </Button>
        </Cluster>
      </div>
    </main>
  )
}
