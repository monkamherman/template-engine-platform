import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Boxes,
  CheckCircle2,
  Download,
  Globe2,
  KeyRound,
  Layers3,
  PackageCheck,
  PanelsTopLeft,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Store,
  Wrench,
} from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

type LocalizedText = Record<Locale, string>

const copy = {
  fr: {
    badge: "Produit",
    title: "Un moteur WooCommerce modulaire, livre comme produit commercial exploitable.",
    lead:
      "Template Engine Platform presente le theme, les offres, les licences, les telechargements, la documentation et les services sans melanger leurs responsabilites.",
    demos: "Voir les demos",
    pricing: "Comparer les offres",
    systemTitle: "Ce que le produit organise",
    modelsTitle: "Plusieurs modeles de boutique depuis une meme base.",
    licenseTitle: "Frontiere licence claire",
    licenseLead:
      "La cle controle les services officiels, les telechargements, les mises a jour, les activations et le support. Elle ne doit pas bloquer le storefront public, le panier ou le checkout.",
    workflowTitle: "Un parcours lisible avant achat, installation et support.",
    finalTitle: "Explorez le produit sans promesse artificielle.",
    finalLead:
      "Regardez les demos, comparez Starter, Pro et Managed, puis ouvrez la documentation pour verifier le chemin adapte a votre contexte.",
    docs: "Lire la documentation",
  },
  en: {
    badge: "Product",
    title: "A modular WooCommerce engine delivered as an operable commercial product.",
    lead:
      "Template Engine Platform presents the theme, plans, licenses, downloads, documentation and services without mixing their responsibilities.",
    demos: "View demos",
    pricing: "Compare plans",
    systemTitle: "What the product organizes",
    modelsTitle: "Several store models from one foundation.",
    licenseTitle: "Clear license boundary",
    licenseLead:
      "The key controls official services, downloads, updates, activations and support. It must not block the public storefront, cart or checkout.",
    workflowTitle: "A readable path before purchase, installation and support.",
    finalTitle: "Explore the product without artificial promises.",
    finalLead:
      "Review demos, compare Starter, Pro and Managed, then open the documentation to validate the path that matches your context.",
    docs: "Read documentation",
  },
} as const

const systemItems = [
  {
    icon: Store,
    title: { fr: "Theme WooCommerce", en: "WooCommerce theme" },
    body: {
      fr: "Une fondation storefront pour pages produit, sections de vente, panier, compte et checkout WooCommerce.",
      en: "A storefront foundation for product pages, sales sections, cart, account and WooCommerce checkout.",
    },
  },
  {
    icon: SlidersHorizontal,
    title: { fr: "Adaptation niche et marche", en: "Niche and market adaptation" },
    body: {
      fr: "Des presets et decisions de presentation pour adapter langue, devise, categorie et modele de boutique.",
      en: "Presets and presentation decisions to adapt language, currency, category and store model.",
    },
  },
  {
    icon: Download,
    title: { fr: "Livraison protegee", en: "Protected delivery" },
    body: {
      fr: "Les releases officielles sont rattachees a des droits commerciaux et a des liens temporaires, pas a des URLs publiques permanentes.",
      en: "Official releases are tied to commercial rights and temporary links, not permanent public URLs.",
    },
  },
  {
    icon: KeyRound,
    title: { fr: "Acces officiel par cle", en: "Official key access" },
    body: {
      fr: "La cle sert aux services officiels, activations, mises a jour, support et telechargements autorises.",
      en: "The key is for official services, activations, updates, support and authorized downloads.",
    },
  },
] satisfies Array<{ icon: typeof Store; title: LocalizedText; body: LocalizedText }>

const shopModels = [
  {
    icon: PackageCheck,
    title: { fr: "Dropshipping", en: "Dropshipping" },
    body: {
      fr: "Presenter catalogue fournisseur, delais et limites fulfillment sans promettre d'automatisation marketplace.",
      en: "Present supplier catalog, lead times and fulfillment boundaries without promising marketplace automation.",
    },
  },
  {
    icon: Boxes,
    title: { fr: "Stock", en: "Stock" },
    body: {
      fr: "Garder inventaire, variations, disponibilite et operations physiques dans des flux WooCommerce lisibles.",
      en: "Keep inventory, variations, availability and physical operations in readable WooCommerce flows.",
    },
  },
  {
    icon: Layers3,
    title: { fr: "Hybride", en: "Hybrid" },
    body: {
      fr: "Combiner stock, fournisseurs ou bonus digitaux avec des limites operationnelles explicites.",
      en: "Combine stock, suppliers or digital bonuses with explicit operational boundaries.",
    },
  },
  {
    icon: ShoppingCart,
    title: { fr: "Digital", en: "Digital" },
    body: {
      fr: "Structurer fichiers, bundles, templates ou acces en ligne dans les limites WooCommerce prevues.",
      en: "Structure files, bundles, templates or online access inside expected WooCommerce boundaries.",
    },
  },
] satisfies Array<{ icon: typeof Store; title: LocalizedText; body: LocalizedText }>

const workflowSteps = [
  {
    icon: PanelsTopLeft,
    title: { fr: "Comprendre", en: "Understand" },
    body: {
      fr: "Les pages marketing expliquent produit, fonctions, demos, FAQ et limites.",
      en: "Marketing pages explain product, features, demos, FAQ and boundaries.",
    },
  },
  {
    icon: CheckCircle2,
    title: { fr: "Choisir", en: "Choose" },
    body: {
      fr: "Starter, Pro et Managed se distinguent par responsabilites, pas par promesses de resultat.",
      en: "Starter, Pro and Managed differ by responsibilities, not promises of results.",
    },
  },
  {
    icon: BookOpen,
    title: { fr: "Installer", en: "Install" },
    body: {
      fr: "La documentation versionnee guide pre-requis, installation, activation, mise a jour et depannage.",
      en: "Versioned documentation guides requirements, installation, activation, updates and troubleshooting.",
    },
  },
  {
    icon: Wrench,
    title: { fr: "Supporter", en: "Support" },
    body: {
      fr: "Le support suit les offres et les conditions approuvees, sans SLA invente.",
      en: "Support follows plans and approved terms, without invented SLAs.",
    },
  },
] satisfies Array<{ icon: typeof Store; title: LocalizedText; body: LocalizedText }>

export function ProductPageContent({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.42fr)] lg:items-center lg:px-8 lg:py-20">
        <div>
          <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">{t.badge}</Badge>
          <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-marketing-muted">{t.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={routes.marketing.demos(locale)}>{t.demos}</Link>
            </Button>
            <Button
              asChild
              className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
              size="lg"
              variant="outline"
            >
              <Link href={routes.marketing.pricing(locale)}>{t.pricing}</Link>
            </Button>
          </div>
        </div>
        <Card className="border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-marketing-accent-soft text-marketing-accent">
                <Globe2 aria-hidden="true" className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-marketing-muted">
                  {locale === "fr" ? "Plateforme commerciale" : "Commercial platform"}
                </p>
                <p className="font-heading text-xl font-bold text-marketing-foreground">Template Engine</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                locale === "fr" ? "Theme dans depot prive separe" : "Theme kept in a separate private repository",
                locale === "fr" ? "Routes FR/EN des le depart" : "FR/EN routes from the start",
                locale === "fr" ? "Services officiels distincts du code livre" : "Official services separated from delivered code",
              ].map((item) => (
                <div className="flex gap-3 rounded-lg border border-marketing-border bg-marketing-card-subtle p-3" key={item}>
                  <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-marketing-success" />
                  <span className="text-sm leading-6 text-marketing-muted">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16" aria-labelledby="product-system">
        <h2 id="product-system" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.systemTitle}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {systemItems.map((item) => (
            <FeatureCard body={item.body[locale]} icon={item.icon} key={item.title.en} title={item.title[locale]} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16" aria-labelledby="product-models">
        <h2 id="product-models" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.modelsTitle}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {shopModels.map((item) => (
            <FeatureCard body={item.body[locale]} icon={item.icon} key={item.title.en} title={item.title[locale]} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Alert className="border-marketing-warning/30 bg-marketing-warning/10 text-marketing-foreground" variant="warning">
          <div className="flex flex-col gap-4 sm:flex-row">
            <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-marketing-warning" />
            <div>
              <h2 className="font-heading text-lg font-bold text-marketing-foreground">{t.licenseTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-marketing-muted">{t.licenseLead}</p>
            </div>
          </div>
        </Alert>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16" aria-labelledby="product-workflow">
        <h2 id="product-workflow" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.workflowTitle}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step) => (
            <FeatureCard body={step.body[locale]} icon={step.icon} key={step.title.en} title={step.title[locale]} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 text-center shadow-panel sm:p-10">
          <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
            {locale === "fr" ? "Produit" : "Product"}
          </Badge>
          <h2 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-marketing-muted">{t.finalLead}</p>
          <Separator className="mx-auto my-8 max-w-xl bg-marketing-border" />
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href={routes.marketing.pricing(locale)}>
                {t.pricing}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background"
              variant="outline"
            >
              <Link href={routes.docs.index(locale)}>{t.docs}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ body, icon: Icon, title }: { body: string; icon: typeof Store; title: string }) {
  return (
    <Card className="border-marketing-border bg-marketing-card text-marketing-foreground">
      <CardContent className="p-6">
        <div className="flex size-11 items-center justify-center rounded-lg bg-marketing-accent-soft text-marketing-accent">
          <Icon aria-hidden="true" className="size-5" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-bold text-marketing-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-marketing-muted">{body}</p>
      </CardContent>
    </Card>
  )
}
