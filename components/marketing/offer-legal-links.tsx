import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster } from "@/components/ui/layout"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

export function OfferLegalLinks({
  locale,
  offerSlug,
}: {
  locale: Locale
  offerSlug: string
}) {
  const isFrench = locale === "fr"

  return (
    <Card>
      <CardHeader>
        <Cluster>
          <Badge variant="orange">{isFrench ? "Documents en revue" : "Documents in review"}</Badge>
          <Badge variant="outline">{offerSlug}</Badge>
        </Cluster>
        <CardTitle>{isFrench ? "Documents applicables a l'offre" : "Documents applicable to this offer"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="max-w-3xl text-sm leading-6 text-brand-slate">
          {isFrench
            ? "Ces liens rendent les references legales et support visibles avant checkout, sans presenter les brouillons comme termes publies."
            : "These links make legal and support references visible before checkout without presenting drafts as published terms."}
        </p>
        <Cluster className="mt-5">
          <Button asChild variant="outline">
            <Link href={routes.legal.softwareLicense(locale)}>{isFrench ? "Licence logicielle" : "Software license"}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.legal.commercialTerms(locale)}>{isFrench ? "Conditions commerciales" : "Commercial terms"}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.legal.supportPolicy(locale)}>{isFrench ? "Politique support" : "Support policy"}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.docs.article(locale, "getting-started")}>{isFrench ? "Mode d'emploi" : "User guide"}</Link>
          </Button>
        </Cluster>
      </CardContent>
    </Card>
  )
}
