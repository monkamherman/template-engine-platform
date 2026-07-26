import { InterfacePage } from "@/components/layout/interface-page"
import { OfferLegalLinks } from "@/components/marketing/offer-legal-links"
import { buildLocalizedMetadata } from "@/config/seo"
import { getInterfacePreviewByPath } from "@/modules/platform/interface-query"
import { isLocale } from "@/src/i18n/locales"
import type { Locale } from "@/src/i18n/locales"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>
}) {
  const { locale: rawLocale, segments = [] } = await params
  const locale = isLocale(rawLocale) ? rawLocale : "fr"
  const preview = getInterfacePreviewByPath(locale, segments)

  return buildLocalizedMetadata({
    locale,
    path: preview.path,
    title: preview.entry.title,
    description: preview.entry.notes,
    noindex: preview.entry.maturity === "SKELETON",
  })
}

export default async function MarketingGeneratedPage({
  params,
}: {
  params: Promise<{ locale: string; segments?: string[] }>
}) {
  const { locale: rawLocale, segments = [] } = await params
  const locale = rawLocale as Locale
  const preview = getInterfacePreviewByPath(locale, segments)

  if (segments[0] === "offers" && segments[1]) {
    return (
      <div className="grid gap-6">
        <InterfacePage preview={preview} />
        <OfferLegalLinks locale={locale} offerSlug={segments[1]} />
      </div>
    )
  }

  return <InterfacePage preview={preview} />
}

export function generateStaticParams() {
  const routes = [

    ["demos"],
    ["demos", "dropshipping-modele"],
    ["use-cases"],
    ["use-cases", "dropshipping"],
    ["use-cases", "stock"],
    ["use-cases", "hybrid"],
    ["use-cases", "digital"],
    ["offers", "starter"],
    ["offers", "pro"],
    ["offers", "managed"],
  ]

  return ["fr", "en"].flatMap((locale) => routes.map((segments) => ({ locale, segments })))
}
