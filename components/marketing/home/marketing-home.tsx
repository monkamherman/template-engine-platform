import Link from "next/link"
import {
  Archive,
  BookOpen,
  Boxes,
  CheckCircle2,
  CircleDot,
  Download,
  FileText,
  Globe2,
  Languages,
  LayoutTemplate,
  LifeBuoy,
  PackageCheck,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Store,
  Wrench,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

type LocalizedText = Record<Locale, string>

type MarketingHomeCopy = {
  badge: string
  heroTitle: string
  heroLead: string
  viewPlans: string
  exploreDemos: string
  readDocs: string
  visualTitle: string
  visualSubtitle: string
  licenseStatus: string
  storefront: string
  readySection: string
  moduleLabel: string
  offerSelector: string
  valuesTitle: string
  modelsTitle: string
  modelsLead: string
  featuresTitle: string
  featuresLead: string
  offersTitle: string
  offersLead: string
  comparePlans: string
  docsTitle: string
  docsLead: string
  searchPlaceholder: string
  finalTitle: string
  finalLead: string
  openDocs: string
}

const copy: Record<Locale, MarketingHomeCopy> = {
  fr: {
    badge: "WooCommerce Template Engine",
    heroTitle: "Lancez des boutiques WooCommerce de niche plus vite avec un moteur commercial modulaire.",
    heroLead:
      "Utilisez une fondation storefront reutilisable, les telechargements officiels, un acces par licence, la documentation et un onboarding optionnel pour tester produits, marches et modeles de boutique sans repartir de zero.",
    viewPlans: "Voir les offres",
    exploreDemos: "Explorer les demos",
    readDocs: "Lire la documentation",
    visualTitle: "Configuration de lancement",
    visualSubtitle: "Une base WooCommerce adaptee par modules.",
    licenseStatus: "Acces officiel actif",
    storefront: "Apercu storefront",
    readySection: "Sections pretes",
    moduleLabel: "Modules",
    offerSelector: "Parcours commercial",
    valuesTitle: "Une base claire pour tester un commerce sans promettre l'impossible.",
    modelsTitle: "Un moteur, plusieurs chemins ecommerce.",
    modelsLead:
      "Chaque modele garde les limites operationnelles visibles afin que la boutique reste comprehensible pour le marchand et l'equipe support.",
    featuresTitle: "Ce que la plateforme organise autour du theme.",
    featuresLead:
      "La page presente les briques commerciales et operationnelles sans confondre theme, acces officiel, documentation et services.",
    offersTitle: "Trois parcours pour acheter, lancer et maintenir.",
    offersLead: "Les prix finaux restent geres cote catalogue et checkout; cette page clarifie le role de chaque offre.",
    comparePlans: "Comparer les offres",
    docsTitle: "Documentation comme livrable produit.",
    docsLead:
      "Les guides structurent l'installation, l'activation, les modeles de boutique et les mises a jour avant les workflows client complets.",
    searchPlaceholder: "Rechercher installation, activation, mises a jour...",
    finalTitle: "Preparez votre prochain lancement ecommerce avec un systeme, pas une page blanche.",
    finalLead:
      "Comparez Starter, Pro et Managed, puis ouvrez le mode d'emploi pour verifier le chemin qui correspond a votre contexte.",
    openDocs: "Ouvrir la documentation",
  },
  en: {
    badge: "WooCommerce Template Engine",
    heroTitle: "Launch niche WooCommerce stores faster with one modular commercial engine.",
    heroLead:
      "Use a reusable storefront foundation, official downloads, license access, documentation and optional onboarding to test products, markets and shop models without rebuilding from zero.",
    viewPlans: "View plans",
    exploreDemos: "Explore demos",
    readDocs: "Read the documentation",
    visualTitle: "Launch configuration",
    visualSubtitle: "A WooCommerce base adapted through modules.",
    licenseStatus: "Official access active",
    storefront: "Storefront preview",
    readySection: "Ready sections",
    moduleLabel: "Modules",
    offerSelector: "Commercial path",
    valuesTitle: "A clear foundation for testing commerce without overpromising.",
    modelsTitle: "One engine, several ecommerce paths.",
    modelsLead:
      "Each model keeps operational boundaries visible so the store remains understandable for the merchant and support team.",
    featuresTitle: "What the platform organizes around the theme.",
    featuresLead:
      "The page presents commercial and operational building blocks without merging the theme, official access, documentation and services.",
    offersTitle: "Three paths to buy, launch and maintain.",
    offersLead: "Final prices remain owned by catalog and checkout; this page clarifies the role of each offer.",
    comparePlans: "Compare plans",
    docsTitle: "Documentation as a product deliverable.",
    docsLead:
      "Guides structure installation, activation, shop models and updates before complete customer workflows are connected.",
    searchPlaceholder: "Search installation, activation, updates...",
    finalTitle: "Prepare your next ecommerce launch with a system, not a blank page.",
    finalLead:
      "Compare Starter, Pro and Managed, then open the user guide to validate the path that matches your context.",
    openDocs: "Open documentation",
  },
}

const valueCards: Array<{ title: LocalizedText; description: LocalizedText; icon: typeof Rocket }> = [
  {
    icon: Rocket,
    title: { fr: "Changer de niche plus vite", en: "Change niche faster" },
    description: {
      fr: "Reutilisez une base de boutique au lieu de reconstruire chaque lancement.",
      en: "Reuse a store foundation instead of rebuilding every launch.",
    },
  },
  {
    icon: Globe2,
    title: { fr: "Adapter marche et langue", en: "Adapt language and market" },
    description: {
      fr: "Gardez les choix de pays, devise et langue visibles des le depart.",
      en: "Keep country, currency and language choices visible from the start.",
    },
  },
  {
    icon: ShoppingCart,
    title: { fr: "Couvrir plusieurs modeles", en: "Support several models" },
    description: {
      fr: "Dropshipping, stock, hybride et digital restent presentes comme chemins distincts.",
      en: "Dropshipping, stock, hybrid and digital stay presented as distinct paths.",
    },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Encadrer l'acces officiel", en: "Frame official access" },
    description: {
      fr: "Telechargements, mises a jour et support restent rattaches aux droits commerciaux.",
      en: "Downloads, updates and support stay tied to commercial access rights.",
    },
  },
]

const shopModels = [
  {
    id: "dropshipping",
    icon: PackageCheck,
    label: { fr: "Dropshipping", en: "Dropshipping" },
    marker: { fr: "Catalogue fournisseur", en: "Supplier catalog" },
    description: {
      fr: "Structure utile pour des catalogues lies a des fournisseurs, avec des limites claires sur la preparation et le suivi fulfillment.",
      en: "A useful structure for supplier-backed catalogs, with clear preparation and fulfillment boundaries.",
    },
  },
  {
    id: "stock",
    icon: Archive,
    label: { fr: "Stock", en: "Stock" },
    marker: { fr: "Inventaire gere", en: "Managed inventory" },
    description: {
      fr: "Parcours oriente produits physiques, stocks, variations et pages WooCommerce standard pour une exploitation controlee.",
      en: "A path for physical products, inventory, variations and standard WooCommerce pages for controlled operations.",
    },
  },
  {
    id: "hybrid",
    icon: Boxes,
    label: { fr: "Hybride", en: "Hybrid" },
    marker: { fr: "Offre mixte", en: "Mixed offer" },
    description: {
      fr: "Combine stock, support fournisseur ou bonus numeriques sans faire croire a une automatisation universelle.",
      en: "Combine stock, supplier support or digital bonuses without implying universal automation.",
    },
  },
  {
    id: "digital",
    icon: Download,
    label: { fr: "Digital", en: "Digital" },
    marker: { fr: "Fichiers et bundles", en: "Files and bundles" },
    description: {
      fr: "Presente les telechargements, bundles, templates et produits en ligne dans les limites WooCommerce prevues.",
      en: "Present downloads, bundles, templates and online products inside expected WooCommerce boundaries.",
    },
  },
] as const

const features: Array<{ title: LocalizedText; description: LocalizedText; icon: typeof Store }> = [
  {
    icon: Store,
    title: { fr: "Fondation WooCommerce-native", en: "WooCommerce-native foundation" },
    description: {
      fr: "Le produit reste centre sur une base theme WooCommerce, pas sur un constructeur universel.",
      en: "The product stays centered on a WooCommerce theme base, not a universal builder.",
    },
  },
  {
    icon: LayoutTemplate,
    title: { fr: "Sections de landing modulaires", en: "Modular landing sections" },
    description: {
      fr: "Composez une presentation claire pour une niche, une offre et un marche donnes.",
      en: "Compose a clear presentation for a specific niche, offer and market.",
    },
  },
  {
    icon: SlidersHorizontal,
    title: { fr: "Presets multi-niches", en: "Multi-niche presets" },
    description: {
      fr: "Les presets guident le positionnement sans inventer de performance commerciale.",
      en: "Presets guide positioning without inventing commercial performance.",
    },
  },
  {
    icon: Languages,
    title: { fr: "Adaptation langue et marche", en: "Market and language adaptation" },
    description: {
      fr: "La structure garde les routes FR/EN et les choix de localisation au premier plan.",
      en: "The structure keeps FR/EN routes and localization choices visible from the start.",
    },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Acces officiel par licence", en: "Official license access" },
    description: {
      fr: "La cle controle les services officiels, les telechargements et le support, pas les droits du code deja livre.",
      en: "The key controls official services, downloads and support, not rights to code already delivered.",
    },
  },
  {
    icon: BookOpen,
    title: { fr: "Documentation et onboarding", en: "Documentation and onboarding" },
    description: {
      fr: "Les guides et parcours accompagnes aident a choisir l'action suivante.",
      en: "Guides and assisted paths help choose the next action.",
    },
  },
  {
    icon: Wrench,
    title: { fr: "Workflow de versions", en: "Release and update workflow" },
    description: {
      fr: "La plateforme prepare les metadonnees, fichiers prives et liens temporaires.",
      en: "The platform prepares metadata, private files and temporary links.",
    },
  },
  {
    icon: LifeBuoy,
    title: { fr: "Chemins support", en: "Support paths" },
    description: {
      fr: "Starter, Pro et Managed gardent des responsabilites differentes et explicites.",
      en: "Starter, Pro and Managed keep different and explicit responsibilities.",
    },
  },
]

const offers = [
  {
    id: "starter",
    badge: { fr: "Self-install", en: "Self-install" },
    title: { fr: "Starter", en: "Starter" },
    description: {
      fr: "Installation autonome avec telechargement officiel, licence et documentation.",
      en: "Self-install path with official download, license and documentation.",
    },
    points: {
      fr: ["Acces au fichier protege", "Mode d'emploi client", "Activation officielle"],
      en: ["Protected file access", "Customer user guide", "Official activation"],
    },
  },
  {
    id: "pro",
    badge: { fr: "Guide", en: "Guided" },
    title: { fr: "Pro", en: "Pro" },
    description: {
      fr: "Starter avec questionnaire, configuration initiale et validation avant lancement.",
      en: "Starter plus questionnaire, initial setup and validation before launch.",
    },
    points: {
      fr: ["Onboarding structure", "Preparation staging si disponible", "Validation visuelle initiale"],
      en: ["Onboarding structure", "Staging preparation when available", "Initial visual validation"],
    },
  },
  {
    id: "managed",
    badge: { fr: "Support operationnel", en: "Operational support" },
    title: { fr: "Managed", en: "Managed" },
    description: {
      fr: "Validation, maintenance et suivi operationnel selon un perimetre commercial approuve.",
      en: "Validation, maintenance and operational follow-up within an approved commercial scope.",
    },
    points: {
      fr: ["Validation des mises a jour", "Rollback encadre", "Demandes de support suivies"],
      en: ["Update validation", "Managed rollback boundaries", "Tracked support requests"],
    },
  },
] as const

const docCards = [
  {
    slug: "getting-started",
    icon: Rocket,
    title: { fr: "Demarrage", en: "Getting started" },
    description: { fr: "Comprendre le parcours client.", en: "Understand the customer journey." },
  },
  {
    slug: "installation",
    icon: FileText,
    title: { fr: "Installation", en: "Installation" },
    description: { fr: "Installer depuis un environnement propre.", en: "Install from a clean environment." },
  },
  {
    slug: "activation",
    icon: ShieldCheck,
    title: { fr: "Activation", en: "Activation" },
    description: { fr: "Gerer acces officiel et limites.", en: "Manage official access and limits." },
  },
  {
    slug: "shop-models",
    icon: ShoppingCart,
    title: { fr: "Modeles boutique", en: "Shop models" },
    description: { fr: "Choisir dropshipping, stock, hybride ou digital.", en: "Choose dropshipping, stock, hybrid or digital." },
  },
  {
    slug: "updates",
    icon: Wrench,
    title: { fr: "Mises a jour", en: "Updates and rollback" },
    description: { fr: "Preparer sauvegarde, staging et retour arriere.", en: "Prepare backup, staging and rollback." },
  },
] as const

export function MarketingHome({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <MarketingHomeHero locale={locale} t={t} />
      <MarketingValueStrip locale={locale} t={t} />
      <ShopModelTabs locale={locale} t={t} />
      <MarketingFeatureGrid locale={locale} t={t} />
      <OfferPreviewCards locale={locale} t={t} />
      <DocumentationPreview locale={locale} t={t} />
      <MarketingFinalCta locale={locale} t={t} />
    </main>
  )
}

function MarketingHomeHero({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.82fr)] lg:items-center lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
          {t.badge}
        </Badge>
        <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
          {t.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-marketing-muted">{t.heroLead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild size="lg">
            <Link href={routes.marketing.pricing(locale)}>{t.viewPlans}</Link>
          </Button>
          <Button
            asChild
            className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
            size="lg"
            variant="outline"
          >
            <Link href={routes.marketing.demos(locale)}>{t.exploreDemos}</Link>
          </Button>
          <Link
            className="inline-flex min-h-12 items-center rounded-md px-1 text-sm font-semibold text-marketing-muted transition-colors hover:text-marketing-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            href={routes.docs.index(locale)}
          >
            {t.readDocs}
          </Link>
        </div>
      </div>
      <HeroProductVisual locale={locale} t={t} />
    </section>
  )
}

function HeroProductVisual({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  const modules = [
    { icon: CircleDot, label: locale === "fr" ? "Niche" : "Niche" },
    { icon: Languages, label: locale === "fr" ? "Langue" : "Language" },
    { icon: Globe2, label: locale === "fr" ? "Marche" : "Market" },
    { icon: ShoppingCart, label: locale === "fr" ? "Modele" : "Store model" },
    { icon: ShieldCheck, label: locale === "fr" ? "Licence" : "License" },
    { icon: BookOpen, label: locale === "fr" ? "Docs" : "Docs" },
  ]

  return (
    <Card className="overflow-hidden border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
      <CardHeader className="border-b border-marketing-border bg-marketing-card-subtle">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-marketing-accent">{t.visualTitle}</p>
            <h2 className="mt-2 font-heading text-xl font-bold text-marketing-foreground">{t.storefront}</h2>
            <p className="mt-1 text-sm leading-6 text-marketing-muted">{t.visualSubtitle}</p>
          </div>
          <Badge className="border-transparent bg-marketing-success/10 text-marketing-success">
            <CheckCircle2 aria-hidden="true" className="mr-1 size-3.5" />
            {t.licenseStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
          <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-marketing-foreground">WooCommerce</p>
                <p className="text-xs text-marketing-muted">{t.readySection}</p>
              </div>
              <Store aria-hidden="true" className="size-5 text-marketing-accent" />
            </div>
            <div className="mt-5 grid gap-3">
              <div className="h-24 rounded-lg border border-marketing-border bg-marketing-background p-3">
                <div className="h-3 w-28 rounded-full bg-marketing-accent" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-md bg-marketing-slate" />
                  <div className="h-12 rounded-md bg-marketing-slate" />
                  <div className="h-12 rounded-md bg-marketing-slate" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-marketing-border bg-marketing-background p-3">
                  <p className="text-xs font-semibold text-marketing-muted">Landing</p>
                  <div className="mt-3 h-2 rounded-full bg-marketing-slate" />
                  <div className="mt-2 h-2 w-2/3 rounded-full bg-marketing-slate" />
                </div>
                <div className="rounded-md border border-marketing-border bg-marketing-background p-3">
                  <p className="text-xs font-semibold text-marketing-muted">Checkout</p>
                  <div className="mt-3 h-2 rounded-full bg-marketing-slate" />
                  <div className="mt-2 h-2 w-3/4 rounded-full bg-marketing-slate" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-marketing-muted">{t.moduleLabel}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {modules.map((module) => (
                  <div
                    className="flex items-center gap-2 rounded-md border border-marketing-border bg-marketing-background px-3 py-2 text-xs font-semibold text-marketing-foreground"
                    key={module.label}
                  >
                    <module.icon aria-hidden="true" className="size-3.5 text-marketing-accent" />
                    {module.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-marketing-muted">{t.offerSelector}</p>
              <div className="mt-3 grid gap-2">
                {offers.map((offer) => (
                  <div
                    className="flex items-center justify-between rounded-md border border-marketing-border bg-marketing-background px-3 py-2"
                    key={offer.id}
                  >
                    <span className="text-sm font-semibold text-marketing-foreground">{offer.title[locale]}</span>
                    <span className="text-xs text-marketing-muted">{offer.badge[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MarketingValueStrip({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8" aria-labelledby="marketing-values">
      <h2 id="marketing-values" className="sr-only">
        {t.valuesTitle}
      </h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {valueCards.map((value) => (
          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={value.title.en}>
            <CardContent className="flex gap-4 p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-marketing-accent-soft text-marketing-accent">
                <value.icon aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-marketing-foreground">{value.title[locale]}</h3>
                <p className="mt-2 text-sm leading-6 text-marketing-muted">{value.description[locale]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ShopModelTabs({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8 lg:py-20" aria-labelledby="shop-models">
      <div>
        <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">
          {locale === "fr" ? "Modeles de boutique" : "Shop models"}
        </Badge>
        <h2 id="shop-models" className="mt-5 text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.modelsTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.modelsLead}</p>
      </div>
      <Tabs defaultValue="dropshipping" className="min-w-0">
        <TabsList className="flex h-auto w-full flex-wrap justify-start border-marketing-border bg-marketing-card-subtle p-1">
          {shopModels.map((model) => (
            <TabsTrigger
              className="min-h-10 flex-1 basis-[calc(50%-0.25rem)] text-marketing-muted data-[state=active]:bg-marketing-accent data-[state=active]:text-white sm:basis-auto"
              key={model.id}
              value={model.id}
            >
              {model.label[locale]}
            </TabsTrigger>
          ))}
        </TabsList>
        {shopModels.map((model) => (
          <TabsContent className="mt-4" key={model.id} value={model.id}>
            <Card className="border-marketing-border bg-marketing-card text-marketing-foreground">
              <CardContent className="grid gap-5 p-6 sm:grid-cols-[auto_1fr]">
                <div className="flex size-14 items-center justify-center rounded-lg bg-marketing-accent-soft text-marketing-accent">
                  <model.icon aria-hidden="true" className="size-7" />
                </div>
                <div>
                  <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
                    {model.marker[locale]}
                  </Badge>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-marketing-foreground">{model.label[locale]}</h3>
                  <p className="mt-3 text-base leading-7 text-marketing-muted">{model.description[locale]}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function MarketingFeatureGrid({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="marketing-features">
      <div className="max-w-3xl">
        <h2 id="marketing-features" className="text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.featuresTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.featuresLead}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={feature.title.en}>
            <CardContent className="p-5">
              <feature.icon aria-hidden="true" className="size-6 text-marketing-accent" />
              <h3 className="mt-5 font-heading text-lg font-bold text-marketing-foreground">{feature.title[locale]}</h3>
              <p className="mt-3 text-sm leading-6 text-marketing-muted">{feature.description[locale]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function OfferPreviewCards({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="offers-preview">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 id="offers-preview" className="text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
            {t.offersTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-marketing-muted">{t.offersLead}</p>
        </div>
        <Button asChild>
          <Link href={routes.marketing.pricing(locale)}>{t.comparePlans}</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {offers.map((offer) => (
          <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={offer.id}>
            <CardHeader>
              <Badge className="w-fit border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
                {offer.badge[locale]}
              </Badge>
              <h3 className="font-heading text-2xl font-bold text-marketing-foreground">{offer.title[locale]}</h3>
              <p className="text-sm leading-6 text-marketing-muted">{offer.description[locale]}</p>
            </CardHeader>
            <CardContent>
              <Separator className="mb-5 bg-marketing-border" />
              <ul className="grid gap-3 text-sm text-marketing-muted">
                {offer.points[locale].map((point) => (
                  <li className="flex gap-3" key={point}>
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-marketing-success" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function DocumentationPreview({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="documentation-preview">
      <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground">
        <CardContent className="grid gap-8 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div>
            <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">Docs</Badge>
            <h2 id="documentation-preview" className="mt-5 text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
              {t.docsTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-marketing-muted">{t.docsLead}</p>
            <Button
              asChild
              className="mt-6 border-marketing-border bg-marketing-background text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card"
              variant="outline"
            >
              <Link href={routes.docs.index(locale)}>{t.openDocs}</Link>
            </Button>
          </div>
          <div className="rounded-lg border border-marketing-border bg-marketing-background p-4">
            <div className="flex items-center gap-3 rounded-md border border-marketing-border bg-marketing-card px-3 py-3 text-sm text-marketing-muted">
              <BookOpen aria-hidden="true" className="size-4 text-marketing-accent" />
              <span>{t.searchPlaceholder}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {docCards.map((doc) => (
                <Link
                  className="rounded-lg border border-marketing-border bg-marketing-card p-4 transition-colors hover:border-marketing-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  href={routes.docs.article(locale, doc.slug)}
                  key={doc.slug}
                >
                  <doc.icon aria-hidden="true" className="size-5 text-marketing-accent" />
                  <h3 className="mt-4 font-heading text-base font-bold text-marketing-foreground">{doc.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-6 text-marketing-muted">{doc.description[locale]}</p>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function MarketingFinalCta({ locale, t }: { locale: Locale; t: MarketingHomeCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="final-cta">
      <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 text-center shadow-panel sm:p-10">
        <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
          {locale === "fr" ? "Prochaine etape" : "Next step"}
        </Badge>
        <h2 id="final-cta" className="mx-auto mt-5 max-w-4xl text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.finalTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-marketing-muted">{t.finalLead}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={routes.marketing.pricing(locale)}>{t.viewPlans}</Link>
          </Button>
          <Button
            asChild
            className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background"
            size="lg"
            variant="outline"
          >
            <Link href={routes.docs.index(locale)}>{t.openDocs}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
