import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Download,
  Globe2,
  Languages,
  Layers3,
  Package,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Wrench,
} from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

type LocalizedText = Record<Locale, string>
type DemoModel = "dropshipping" | "stock" | "hybrid" | "digital"
type FilterId = "all" | DemoModel | "english" | "french"

type DemoScenario = {
  slug: string
  title: LocalizedText
  niche: LocalizedText
  model: DemoModel
  modelLabel: LocalizedText
  market: LocalizedText
  language: LocalizedText
  description: LocalizedText
  cta: LocalizedText
  status: LocalizedText
  support: LocalizedText
  features: LocalizedText[]
  icon: LucideIcon
}

const copy = {
  fr: {
    badge: "Demonstrations de boutique",
    title: "Explorez des scenarios de boutique construits avec le meme moteur WooCommerce modulaire.",
    lead:
      "Comparez niches, marches, langues et modeles de boutique avant de choisir le parcours de lancement adapte a votre projet.",
    viewPricing: "Voir les offres",
    readDocs: "Lire la documentation",
    galleryTitle: "Apercu catalogue",
    galleryLead: "Plusieurs configurations, une fondation WooCommerce commune.",
    filtersLabel: "Filtrer les demonstrations",
    status: "Scenario demo",
    scenarioGrid: "Scenarios disponibles",
    scenarioLead:
      "Chaque carte decrit le positionnement, le marche, la langue et le modele operationnel visible dans la configuration.",
    comparisonTitle: "Comparer les modeles de boutique.",
    comparisonLead: "Les differences restent operationnelles afin d'aider le choix entre Starter, Pro et Managed.",
    productType: "Type produit",
    shipping: "Expedition",
    supplierLogic: "Logique fournisseur",
    stockHandling: "Gestion stock",
    digitalDelivery: "Livraison digitale",
    recommendedOffer: "Offre conseillee",
    educationalTitle: "Qu'est-ce qui change entre les demos ?",
    note:
      "These demos are illustrative configurations. Final store content, supplier claims, payment settings and legal text must be adapted and validated for each launch market.",
    finalTitle: "Found a model close to your project?",
    comparePlans: "Compare plans",
    openDocs: "Open documentation",
  },
  en: {
    badge: "Store demonstrations",
    title: "Explore store scenarios built from the same modular WooCommerce engine.",
    lead:
      "Compare niches, markets, languages and shop models before choosing the launch path that fits your project.",
    viewPricing: "View pricing",
    readDocs: "Read setup docs",
    galleryTitle: "Catalog preview",
    galleryLead: "Several configurations, one WooCommerce foundation.",
    filtersLabel: "Filter demonstrations",
    status: "Demo scenario",
    scenarioGrid: "Available scenarios",
    scenarioLead:
      "Each card shows the positioning, market, language and operating model visible in the configuration.",
    comparisonTitle: "Compare shop models.",
    comparisonLead: "The differences stay operational so visitors can choose between Starter, Pro and Managed.",
    productType: "Product type",
    shipping: "Shipping",
    supplierLogic: "Supplier logic",
    stockHandling: "Stock handling",
    digitalDelivery: "Digital delivery",
    recommendedOffer: "Recommended offer",
    educationalTitle: "What changes between demos?",
    note:
      "These demos are illustrative configurations. Final store content, supplier claims, payment settings and legal text must be adapted and validated for each launch market.",
    finalTitle: "Found a model close to your project?",
    comparePlans: "Compare plans",
    openDocs: "Open documentation",
  },
} satisfies Record<Locale, Record<string, string>>

const filters = [
  { id: "all", label: { fr: "Tout", en: "All" } },
  { id: "dropshipping", label: { fr: "Dropshipping", en: "Dropshipping" } },
  { id: "stock", label: { fr: "Stock", en: "Stock" } },
  { id: "hybrid", label: { fr: "Hybride", en: "Hybrid" } },
  { id: "digital", label: { fr: "Digital", en: "Digital" } },
  { id: "english", label: { fr: "Marche anglais", en: "English market" } },
  { id: "french", label: { fr: "Marche francais", en: "French market" } },
] satisfies readonly { id: FilterId; label: LocalizedText }[]

const scenarios = [
  {
    slug: "productivity-remote-workers",
    title: { fr: "Productivity Remote Workers", en: "Productivity Remote Workers" },
    niche: { fr: "Productivite remote", en: "Productivity remote workers" },
    model: "hybrid",
    modelLabel: { fr: "Hybride", en: "Hybrid" },
    market: { fr: "US/EU", en: "US/EU" },
    language: { fr: "Anglais", en: "English" },
    description: {
      fr: "Produit physique de productivite avec bonus digital et parcours d'upsell.",
      en: "physical productivity product with digital bonus and upsell path",
    },
    cta: { fr: "Voir le scenario", en: "View scenario" },
    status: { fr: "Scenario demo", en: "Demo scenario" },
    support: { fr: "Activation + support", en: "Activation + support" },
    features: [
      { fr: "Fiche produit orientee benefices", en: "Benefit-led product page" },
      { fr: "Bonus digital visible", en: "Visible digital bonus" },
      { fr: "Chemin upsell documente", en: "Documented upsell path" },
    ],
    icon: Layers3,
  },
  {
    slug: "supplier-starter-store",
    title: { fr: "Supplier Starter Store", en: "Supplier Starter Store" },
    niche: { fr: "Catalogue fournisseur", en: "Supplier catalog" },
    model: "dropshipping",
    modelLabel: { fr: "Dropshipping", en: "Dropshipping" },
    market: { fr: "US", en: "US" },
    language: { fr: "Anglais", en: "English" },
    description: {
      fr: "Catalogue physique pret fournisseur utilisant WooCommerce comme coeur commerce.",
      en: "supplier-ready physical catalog using WooCommerce as commerce core",
    },
    cta: { fr: "Voir le scenario", en: "View scenario" },
    status: { fr: "Scenario demo", en: "Demo scenario" },
    support: { fr: "Fournisseur a valider", en: "Supplier to validate" },
    features: [
      { fr: "Categories catalogue claires", en: "Clear catalog categories" },
      { fr: "Promesses fournisseur separees", en: "Separated supplier claims" },
      { fr: "Checkout WooCommerce conserve", en: "WooCommerce checkout retained" },
    ],
    icon: Truck,
  },
  {
    slug: "local-stock-essentials",
    title: { fr: "Local Stock Essentials", en: "Local Stock Essentials" },
    niche: { fr: "Essentiels en stock local", en: "Local stock essentials" },
    model: "stock",
    modelLabel: { fr: "Stock", en: "Stock" },
    market: { fr: "France", en: "France" },
    language: { fr: "Francais", en: "French" },
    description: {
      fr: "Commerce avec inventaire local et presentation produit orientee confiance.",
      en: "local inventory commerce with trust-focused product presentation",
    },
    cta: { fr: "Voir le scenario", en: "View scenario" },
    status: { fr: "Scenario demo", en: "Demo scenario" },
    support: { fr: "Stock a confirmer", en: "Stock to confirm" },
    features: [
      { fr: "Etat stock visible", en: "Visible stock state" },
      { fr: "Blocs confiance adaptes", en: "Trust-focused content blocks" },
      { fr: "Operations locales lisibles", en: "Readable local operations" },
    ],
    icon: PackageCheck,
  },
  {
    slug: "digital-bundle-studio",
    title: { fr: "Digital Bundle Studio", en: "Digital Bundle Studio" },
    niche: { fr: "Bundles digitaux", en: "Digital bundles" },
    model: "digital",
    modelLabel: { fr: "Digital", en: "Digital" },
    market: { fr: "US/EU", en: "US/EU" },
    language: { fr: "Anglais", en: "English" },
    description: {
      fr: "Produits digitaux, templates ou bundles avec positionnement acces instantane.",
      en: "digital products, templates or bundles with instant-access positioning",
    },
    cta: { fr: "Voir le scenario", en: "View scenario" },
    status: { fr: "Scenario demo", en: "Demo scenario" },
    support: { fr: "Livraison digitale", en: "Digital delivery" },
    features: [
      { fr: "Acces instantane explique", en: "Instant access explained" },
      { fr: "Bundle et licence separes", en: "Bundle and license separated" },
      { fr: "Support de contenu clarifie", en: "Content support clarified" },
    ],
    icon: Download,
  },
] satisfies readonly DemoScenario[]

const comparisonRows = [
  {
    model: "Dropshipping",
    icon: Truck,
    productType: { fr: "Catalogue physique", en: "Physical catalog" },
    shipping: { fr: "Fournisseur", en: "Supplier" },
    supplierLogic: { fr: "Central", en: "Central" },
    stockHandling: { fr: "Externe", en: "External" },
    digitalDelivery: { fr: "Non requis", en: "Not required" },
    recommendedOffer: { fr: "Starter", en: "Starter" },
  },
  {
    model: "Stock",
    icon: Package,
    productType: { fr: "Inventaire local", en: "Local inventory" },
    shipping: { fr: "Marchand", en: "Merchant" },
    supplierLogic: { fr: "Secondaire", en: "Secondary" },
    stockHandling: { fr: "Manuel ou sync", en: "Manual or sync" },
    digitalDelivery: { fr: "Optionnel", en: "Optional" },
    recommendedOffer: { fr: "Pro", en: "Pro" },
  },
  {
    model: "Hybrid",
    icon: Layers3,
    productType: { fr: "Physique + digital", en: "Physical + digital" },
    shipping: { fr: "Mixte", en: "Mixed" },
    supplierLogic: { fr: "Selon produit", en: "Product-based" },
    stockHandling: { fr: "Partiel", en: "Partial" },
    digitalDelivery: { fr: "Incluse", en: "Included" },
    recommendedOffer: { fr: "Pro", en: "Pro" },
  },
  {
    model: "Digital",
    icon: Download,
    productType: { fr: "Fichiers ou acces", en: "Files or access" },
    shipping: { fr: "Aucune", en: "None" },
    supplierLogic: { fr: "Non requis", en: "Not required" },
    stockHandling: { fr: "Non requis", en: "Not required" },
    digitalDelivery: { fr: "Principale", en: "Primary" },
    recommendedOffer: { fr: "Managed", en: "Managed" },
  },
] as const

const educationCards = [
  {
    title: { fr: "Positionnement niche", en: "Niche positioning" },
    text: {
      fr: "Les titres, modules de preuve et priorites produit changent selon le contexte commercial.",
      en: "Headlines, proof modules and product priorities change with the commercial context.",
    },
    icon: Sparkles,
  },
  {
    title: { fr: "Marche et langue", en: "Market and language" },
    text: {
      fr: "La structure reste commune, mais les libelles, attentes de confiance et documents doivent etre localises.",
      en: "The structure stays shared, while labels, trust expectations and documents must be localized.",
    },
    icon: Languages,
  },
  {
    title: { fr: "Produit et fulfillment", en: "Product and fulfillment model" },
    text: {
      fr: "Chaque scenario rend visibles les contraintes de livraison, stock, fournisseur ou acces digital.",
      en: "Each scenario makes shipping, stock, supplier or digital access constraints visible.",
    },
    icon: Boxes,
  },
  {
    title: { fr: "Support et operations", en: "Support path and launch operations" },
    text: {
      fr: "Le parcours Starter, Pro ou Managed depend de l'aide necessaire pour configurer et valider le lancement.",
      en: "The Starter, Pro or Managed path depends on the help needed to configure and validate launch.",
    },
    icon: Wrench,
  },
] as const

function scenariosForFilter(filterId: FilterId) {
  if (filterId === "all") {
    return scenarios
  }

  if (filterId === "english") {
    return scenarios.filter((scenario) => scenario.language.en === "English")
  }

  if (filterId === "french") {
    return scenarios.filter((scenario) => scenario.language.en === "French")
  }

  return scenarios.filter((scenario) => scenario.model === filterId)
}

export function DemosPageContent({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:px-8">
        <div className="flex flex-col justify-center">
          <Badge className="w-fit border-marketing-border bg-marketing-card text-marketing-muted">{t.badge}</Badge>
          <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-marketing-muted">{t.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.marketing.pricing(locale)}>
                {t.viewPricing}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
            >
              <Link href={routes.docs.index(locale)}>{t.readDocs}</Link>
            </Button>
          </div>
        </div>

        <HeroGallery locale={locale} title={t.galleryTitle} lead={t.galleryLead} />
      </section>

      <section aria-labelledby="demo-filters" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-3xl">
          <h2 id="demo-filters" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
            {t.scenarioGrid}
          </h2>
          <p className="mt-4 text-base leading-7 text-marketing-muted">{t.scenarioLead}</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList
            aria-label={t.filtersLabel}
            className="flex h-auto w-full flex-wrap justify-start gap-1 border-marketing-border bg-marketing-card-subtle p-1"
          >
            {filters.map((filter) => (
              <TabsTrigger
                className="min-h-10 flex-1 whitespace-normal px-3 text-xs text-marketing-muted data-[state=active]:text-white sm:flex-none sm:text-sm"
                key={filter.id}
                value={filter.id}
              >
                {filter.label[locale]}
              </TabsTrigger>
            ))}
          </TabsList>

          {filters.map((filter) => (
            <TabsContent className="mt-8" key={filter.id} value={filter.id}>
              <DemoGrid demos={scenariosForFilter(filter.id)} locale={locale} />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section aria-labelledby="model-comparison" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">
            <Store aria-hidden="true" className="mr-2 size-3.5" />
            WooCommerce models
          </Badge>
          <h2 id="model-comparison" className="mt-5 font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
            {t.comparisonTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-marketing-muted">{t.comparisonLead}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {comparisonRows.map((row) => {
            const Icon = row.icon

            return (
              <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={row.model}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-2 text-marketing-accent">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
                      {row.recommendedOffer[locale]}
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-marketing-foreground">{row.model}</h3>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-3">
                    <ChipRow label={t.productType} value={row.productType[locale]} />
                    <ChipRow label={t.shipping} value={row.shipping[locale]} />
                    <ChipRow label={t.supplierLogic} value={row.supplierLogic[locale]} />
                    <ChipRow label={t.stockHandling} value={row.stockHandling[locale]} />
                    <ChipRow label={t.digitalDelivery} value={row.digitalDelivery[locale]} />
                    <ChipRow label={t.recommendedOffer} value={row.recommendedOffer[locale]} accent />
                  </dl>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="demo-education" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 id="demo-education" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.educationalTitle}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {educationCards.map((card) => {
            const Icon = card.icon

            return (
              <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={card.title.en}>
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-lg border border-marketing-border bg-marketing-card text-marketing-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-marketing-foreground">{card.title[locale]}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-marketing-muted">{card.text[locale]}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Alert
          className="border-warning/40 bg-marketing-card-subtle text-marketing-foreground"
          variant="warning"
        >
          <div className="flex gap-3">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-warning" />
            <p className="text-sm leading-6 text-marketing-muted">{t.note}</p>
          </div>
        </Alert>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-24 lg:px-8">
        <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 text-center shadow-panel sm:p-10">
          <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">Next step</Badge>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
            {t.finalTitle}
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={routes.marketing.pricing(locale)}>{t.comparePlans}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background"
            >
              <Link href={routes.docs.index(locale)}>{t.openDocs}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function HeroGallery({ locale, title, lead }: { locale: Locale; title: string; lead: string }) {
  return (
    <Card className="overflow-hidden border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
      <CardHeader className="border-b border-marketing-border bg-marketing-card-subtle">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">
              <Store aria-hidden="true" className="mr-2 size-3.5" />
              {title}
            </Badge>
            <p className="mt-3 text-sm leading-6 text-marketing-muted">{lead}</p>
          </div>
          <CheckCircle2 aria-hidden="true" className="hidden size-6 text-marketing-success sm:block" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 sm:grid-cols-2">
        {scenarios.map((scenario, index) => (
          <div
            className="rounded-xl border border-marketing-border bg-marketing-card-subtle p-3 shadow-subtle"
            key={scenario.slug}
          >
            <StorefrontThumbnail model={scenario.model} position={index} />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">
                {scenario.modelLabel[locale]}
              </Badge>
              <Badge className="border-marketing-border bg-marketing-background text-marketing-muted">
                {scenario.market[locale]} / {scenario.language[locale]}
              </Badge>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-sm font-bold text-marketing-foreground">{scenario.niche[locale]}</h3>
                <p className="mt-1 text-xs leading-5 text-marketing-muted">{scenario.title[locale]}</p>
              </div>
              <Badge className="border-marketing-success/30 bg-marketing-card text-marketing-success">
                {scenario.support[locale]}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function DemoGrid({ demos, locale }: { demos: readonly DemoScenario[]; locale: Locale }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {demos.map((demo, index) => (
        <DemoCard demo={demo} index={index} key={demo.slug} locale={locale} />
      ))}
    </div>
  )
}

function DemoCard({ demo, index, locale }: { demo: DemoScenario; index: number; locale: Locale }) {
  const Icon = demo.icon

  return (
    <Card className="flex h-full flex-col overflow-hidden border-marketing-border bg-marketing-card text-marketing-foreground shadow-subtle">
      <div className="p-4 pb-0">
        <StorefrontThumbnail model={demo.model} position={index} />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
            {demo.status[locale]}
          </Badge>
          <Badge className="border-marketing-border bg-marketing-accent-soft text-marketing-accent">
            {demo.modelLabel[locale]} model
          </Badge>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-2 text-marketing-accent">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold text-marketing-foreground">{demo.title[locale]}</h3>
            <p className="mt-2 text-sm leading-6 text-marketing-muted">{demo.description[locale]}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-wrap gap-2">
          <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
            <Globe2 aria-hidden="true" className="mr-2 size-3.5" />
            {demo.market[locale]}
          </Badge>
          <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
            <Languages aria-hidden="true" className="mr-2 size-3.5" />
            {demo.language[locale]}
          </Badge>
        </div>
        <Separator className="my-5 bg-marketing-border" />
        <ul className="grid gap-3 text-sm text-marketing-muted">
          {demo.features.map((feature) => (
            <li className="flex gap-3" key={feature.en}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-marketing-success" />
              <span>{feature[locale]}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className="mt-6 w-full"
          variant={demo.model === "digital" ? "outline" : "primary"}
        >
          <Link
            className={demo.model === "digital" ? "border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background" : undefined}
            href={routes.marketing.demoDetail(locale, demo.slug)}
          >
            {demo.cta[locale]}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function StorefrontThumbnail({ model, position }: { model: DemoModel; position: number }) {
  const blocks = model === "digital" ? 3 : 4
  const widthClasses = ["w-1/2", "w-2/3", "w-4/5"] as const

  return (
    <div className="aspect-[16/10] rounded-lg border border-marketing-border bg-marketing-background p-3" aria-hidden="true">
      <div className="flex items-center justify-between gap-2">
        <div className="h-2.5 w-20 rounded-full bg-marketing-foreground/80" />
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-marketing-success" />
          <div className="size-2 rounded-full bg-marketing-warning" />
          <div className="size-2 rounded-full bg-marketing-accent" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-3">
        <div className="rounded-md border border-marketing-border bg-marketing-card p-3">
          <div className="h-16 rounded-md bg-marketing-card-subtle" />
          <div className="mt-3 h-2 w-4/5 rounded-full bg-marketing-muted/40" />
          <div className="mt-2 h-2 w-2/3 rounded-full bg-marketing-muted/30" />
        </div>
        <div className="grid gap-2">
          {Array.from({ length: blocks }).map((_, blockIndex) => (
            <div
              className="rounded-md border border-marketing-border bg-marketing-card px-2 py-2"
              key={`${model}-${blockIndex}`}
            >
              <div className="h-2 rounded-full bg-marketing-muted/35" />
              <div
                className={`mt-2 h-2 rounded-full bg-marketing-accent/70 ${widthClasses[(blockIndex + position) % widthClasses.length]}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChipRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-marketing-border bg-marketing-card-subtle px-3 py-2">
      <dt className="text-xs font-medium text-marketing-muted">{label}</dt>
      <dd>
        <Badge
          className={
            accent
              ? "border-marketing-border bg-marketing-accent-soft text-marketing-accent"
              : "border-marketing-border bg-marketing-card text-marketing-foreground"
          }
        >
          {value}
        </Badge>
      </dd>
    </div>
  )
}
