import Link from "next/link"
import {
  BookOpen,
  Boxes,
  CheckCircle2,
  CircleDot,
  Cloud,
  Code2,
  Database,
  Download,
  FileText,
  Globe2,
  KeyRound,
  Layers3,
  LifeBuoy,
  PackageCheck,
  PanelsTopLeft,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Store,
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

type FeatureCopy = {
  badge: string
  title: string
  lead: string
  exploreDemos: string
  viewPricing: string
  visualTitle: string
  visualLead: string
  categoriesTitle: string
  categoriesLead: string
  modelsTitle: string
  modelsLead: string
  workflowTitle: string
  workflowLead: string
  boundaryTitle: string
  boundaryLead: string
  technicalTitle: string
  technicalLead: string
  finalTitle: string
  finalLead: string
  openDocs: string
}

const copy: Record<Locale, FeatureCopy> = {
  fr: {
    badge: "Fonctionnalites",
    title: "Tout pour transformer une fondation WooCommerce en plusieurs modeles de boutique.",
    lead:
      "Sections reutilisables, presets de niche, localisation, acces officiel et parcours support sont organises pour demarrer chaque lancement depuis un systeme, pas une page blanche.",
    exploreDemos: "Explorer les demos",
    viewPricing: "Voir les offres",
    visualTitle: "Carte du systeme",
    visualLead: "La plateforme relie storefront, acces officiel, documentation et services sans melanger leurs responsabilites.",
    categoriesTitle: "Fonctionnalites organisees par responsabilite.",
    categoriesLead:
      "Les categories separent clairement le moteur storefront, l'acces commercial, les operations de lancement et le support documente.",
    modelsTitle: "Construit pour plusieurs modeles ecommerce.",
    modelsLead:
      "Chaque modele modifie la presentation et les operations attendues sans promettre d'automatisation fournisseur non validee.",
    workflowTitle: "Du choix de niche a la validation du lancement.",
    workflowLead: "Le moteur aide a cadrer les decisions de niche, marche, langue et modele avant la mise en ligne.",
    boundaryTitle: "Frontiere licence et services",
    boundaryLead:
      "La cle controle les services officiels, mises a jour, telechargements et support. Le storefront public ne doit pas dependre du serveur de licence pour s'afficher.",
    technicalTitle: "Confiance pour acheteurs techniques.",
    technicalLead:
      "La plateforme commerciale garde des choix techniques lisibles sans transformer cette page en documentation developpeur.",
    finalTitle: "Utilisez les fonctionnalites comme un systeme de lancement, pas comme une checklist.",
    finalLead: "Comparez les offres ou ouvrez le mode d'emploi pour verifier le parcours adapte a votre contexte.",
    openDocs: "Ouvrir la documentation",
  },
  en: {
    badge: "Features",
    title: "Everything needed to turn one WooCommerce foundation into several store models.",
    lead:
      "Reusable sections, niche presets, localization, official access and support workflows are organized so each launch starts from a system instead of a blank page.",
    exploreDemos: "Explore demos",
    viewPricing: "View pricing",
    visualTitle: "System map",
    visualLead: "The platform connects storefront, official access, documentation and services without mixing their responsibilities.",
    categoriesTitle: "Features organized by responsibility.",
    categoriesLead:
      "Categories separate the storefront engine, commercial access, launch operations and documented support paths.",
    modelsTitle: "Built for several ecommerce models.",
    modelsLead:
      "Each model changes presentation and expected operations without promising unvalidated supplier automation.",
    workflowTitle: "From niche choice to launch validation.",
    workflowLead: "The engine helps frame niche, market, language and model decisions before launch.",
    boundaryTitle: "License and service boundary",
    boundaryLead:
      "The key controls official services, updates, downloads and support. The public storefront must not depend on the license server to render.",
    technicalTitle: "Confidence for technical buyers.",
    technicalLead:
      "The commercial platform keeps technical choices readable without turning this page into developer documentation.",
    finalTitle: "Use features as a launch system, not a checklist.",
    finalLead: "Compare plans or open the user guide to validate the path that matches your context.",
    openDocs: "Open documentation",
  },
}

const featureCategories = [
  {
    id: "storefront",
    label: { fr: "Moteur storefront", en: "Storefront engine" },
    features: [
      {
        icon: PanelsTopLeft,
        title: { fr: "Sections landing modulaires", en: "Modular landing sections" },
        body: {
          fr: "Assembler une presentation de niche avec des blocs reutilisables et comprehensibles.",
          en: "Assemble a niche presentation with reusable, understandable blocks.",
        },
      },
      {
        icon: Store,
        title: { fr: "Blocs page produit", en: "Product page blocks" },
        body: {
          fr: "Structurer les pages produit autour de WooCommerce et des besoins de conversion prudents.",
          en: "Structure product pages around WooCommerce and careful conversion needs.",
        },
      },
      {
        icon: ShoppingCart,
        title: { fr: "Structure orientee checkout", en: "Checkout-focused structure" },
        body: {
          fr: "Garder panier, compte et checkout visibles comme flux WooCommerce standard.",
          en: "Keep cart, account and checkout visible as standard WooCommerce flows.",
        },
      },
      {
        icon: SlidersHorizontal,
        title: { fr: "Presets de niche", en: "Theme presets for niches" },
        body: {
          fr: "Demarrer avec des choix de presentation adaptes a une categorie de boutique.",
          en: "Start from presentation choices adapted to a shop category.",
        },
      },
      {
        icon: CircleDot,
        title: { fr: "Flux WooCommerce natif", en: "WooCommerce-native flow" },
        body: {
          fr: "Rester proche des concepts WooCommerce au lieu d'inventer une couche proprietaire opaque.",
          en: "Stay close to WooCommerce concepts instead of inventing an opaque proprietary layer.",
        },
      },
    ],
  },
  {
    id: "access",
    label: { fr: "Acces commercial", en: "Commercial access" },
    features: [
      {
        icon: Download,
        title: { fr: "Acces aux versions officielles", en: "Official release access" },
        body: {
          fr: "Presenter les telechargements comme droits commerciaux proteges, pas comme URLs permanentes.",
          en: "Present downloads as protected commercial rights, not permanent URLs.",
        },
      },
      {
        icon: KeyRound,
        title: { fr: "Activations de licence", en: "License activations" },
        body: {
          fr: "Distinguer production et staging selon le protocole technique approuve.",
          en: "Separate production and staging according to the approved technical protocol.",
        },
      },
      {
        icon: ShieldCheck,
        title: { fr: "Logique production et staging", en: "Production and staging logic" },
        body: {
          fr: "Suivre les installations sans bloquer le rendu public de la boutique.",
          en: "Track installations without blocking public store rendering.",
        },
      },
      {
        icon: Cloud,
        title: { fr: "Portail compte", en: "Account portal" },
        body: {
          fr: "Preparer commandes, droits, licences, telechargements et onboarding client.",
          en: "Prepare orders, rights, licenses, downloads and customer onboarding.",
        },
      },
      {
        icon: PackageCheck,
        title: { fr: "Telechargements proteges", en: "Protected downloads" },
        body: {
          fr: "Utiliser des droits et liens temporaires plutot que des fichiers publics.",
          en: "Use rights and temporary links instead of public files.",
        },
      },
    ],
  },
  {
    id: "operations",
    label: { fr: "Operations lancement", en: "Launch operations" },
    features: [
      {
        icon: CheckCircle2,
        title: { fr: "Parcours Starter autonome", en: "Starter self-install path" },
        body: {
          fr: "Clarifier ce que le client installe et gere lui-meme.",
          en: "Clarify what the customer installs and manages themselves.",
        },
      },
      {
        icon: LifeBuoy,
        title: { fr: "Parcours onboarding Pro", en: "Pro onboarding path" },
        body: {
          fr: "Organiser les informations necessaires pour accompagner le premier lancement.",
          en: "Organize the information needed to guide the first launch.",
        },
      },
      {
        icon: Wrench,
        title: { fr: "Validation Managed", en: "Managed validation path" },
        body: {
          fr: "Cadrer validation, maintenance et suivi operationnel selon perimetre.",
          en: "Frame validation, maintenance and operational follow-up by scope.",
        },
      },
      {
        icon: RotateCcw,
        title: { fr: "Preparation mises a jour et rollback", en: "Update and rollback preparation" },
        body: {
          fr: "Relier notes de version, sauvegarde et staging sans promettre zero interruption.",
          en: "Connect release notes, backup and staging without claiming uninterrupted operation.",
        },
      },
      {
        icon: FileText,
        title: { fr: "Notes compatibilite", en: "Release compatibility notes" },
        body: {
          fr: "Publier uniquement les compatibilites testees et documentees.",
          en: "Publish only tested and documented compatibility notes.",
        },
      },
    ],
  },
  {
    id: "support",
    label: { fr: "Docs et support", en: "Documentation and support" },
    features: [
      {
        icon: BookOpen,
        title: { fr: "Guide de demarrage", en: "Getting started guide" },
        body: {
          fr: "Orienter prospects et clients vers le bon parcours.",
          en: "Route prospects and customers to the right path.",
        },
      },
      {
        icon: FileText,
        title: { fr: "Guide installation", en: "Installation guide" },
        body: {
          fr: "Documenter les prerequisites avant l'installation.",
          en: "Document prerequisites before installation.",
        },
      },
      {
        icon: KeyRound,
        title: { fr: "Guide activation", en: "Activation guide" },
        body: {
          fr: "Expliquer cle, limites et environnements sans exposer de secret.",
          en: "Explain key, limits and environments without exposing secrets.",
        },
      },
      {
        icon: LifeBuoy,
        title: { fr: "Depannage", en: "Troubleshooting" },
        body: {
          fr: "Preparer des chemins de resolution sans inventer une hotline.",
          en: "Prepare resolution paths without inventing a hotline.",
        },
      },
      {
        icon: FileText,
        title: { fr: "Notes de version", en: "Versioned release notes" },
        body: {
          fr: "Garder changelog, installation et mise a jour synchronises.",
          en: "Keep changelog, installation and update guidance synchronized.",
        },
      },
      {
        icon: LifeBuoy,
        title: { fr: "Demandes support", en: "Support requests" },
        body: {
          fr: "Relier Starter, Pro et Managed a des chemins de service explicites.",
          en: "Connect Starter, Pro and Managed to explicit service paths.",
        },
      },
    ],
  },
] as const

const shopModels = [
  {
    icon: PackageCheck,
    title: { fr: "Dropshipping", en: "Dropshipping" },
    body: {
      fr: "Met en avant catalogue fournisseur, delais et limites fulfillment sans promettre d'integration marketplace.",
      en: "Highlights supplier catalog, lead times and fulfillment boundaries without promising marketplace integrations.",
    },
  },
  {
    icon: Boxes,
    title: { fr: "Commerce stock", en: "Stock commerce" },
    body: {
      fr: "Priorise disponibilite, variations et operations d'inventaire WooCommerce standard.",
      en: "Prioritizes availability, variations and standard WooCommerce inventory operations.",
    },
  },
  {
    icon: Layers3,
    title: { fr: "Commerce hybride", en: "Hybrid commerce" },
    body: {
      fr: "Combine stock, support fournisseur ou bonus numeriques avec des responsabilites visibles.",
      en: "Combines stock, supplier support or digital bonuses with visible responsibilities.",
    },
  },
  {
    icon: Download,
    title: { fr: "Produits digitaux", en: "Digital products" },
    body: {
      fr: "Cadre telechargements, bundles et produits en ligne dans les limites WooCommerce prevues.",
      en: "Frames downloads, bundles and online products inside expected WooCommerce boundaries.",
    },
  },
] as const

const workflowSteps = [
  {
    title: { fr: "Choisir niche", en: "Choose niche" },
    body: { fr: "Definir categorie, offre et contexte client.", en: "Define category, offer and customer context." },
  },
  {
    title: { fr: "Ajuster marche", en: "Adjust market" },
    body: { fr: "Cadrer pays, devise et attentes operationnelles.", en: "Frame country, currency and operational expectations." },
  },
  {
    title: { fr: "Selectionner langue", en: "Select language" },
    body: { fr: "Preserver la structure FR/EN et les textes localises.", en: "Preserve FR/EN structure and localized copy." },
  },
  {
    title: { fr: "Configurer modele", en: "Configure model" },
    body: { fr: "Adapter dropshipping, stock, hybride ou digital.", en: "Adapt dropshipping, stock, hybrid or digital." },
  },
  {
    title: { fr: "Lancer et valider", en: "Launch and validate" },
    body: { fr: "Relier documentation, version et parcours support.", en: "Connect documentation, release and support path." },
  },
] as const

const technicalTrust = [
  {
    icon: Code2,
    title: { fr: "Next.js pour operations commerciales", en: "Next.js for commercial operations" },
    body: {
      fr: "Le site gere vente, documentation, licences, releases et interfaces client/admin.",
      en: "The site handles sales, documentation, licenses, releases and customer/admin surfaces.",
    },
  },
  {
    icon: Store,
    title: { fr: "Produit theme WooCommerce", en: "WooCommerce theme product" },
    body: {
      fr: "Le code theme reste hors de ce depot commercial et dans son depot prive.",
      en: "Theme source stays outside this commercial platform repository.",
    },
  },
  {
    icon: Database,
    title: { fr: "Modele PostgreSQL et Prisma", en: "PostgreSQL and Prisma data model" },
    body: {
      fr: "Commandes, droits, licences et releases gardent des frontieres de domaine.",
      en: "Orders, rights, licenses and releases keep domain boundaries.",
    },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Protocole licence prudent", en: "Security-first license protocol" },
    body: {
      fr: "Le protocole evite les cles dans les URLs et preserve le rendu storefront.",
      en: "The protocol avoids keys in URLs and preserves storefront rendering.",
    },
  },
] as const

export function FeaturesPageContent({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <FeaturesHero locale={locale} t={t} />
      <FeatureCategoryTabs locale={locale} t={t} />
      <ShopModelGrid locale={locale} t={t} />
      <WorkflowSection locale={locale} t={t} />
      <LicenseBoundary locale={locale} t={t} />
      <TechnicalConfidence locale={locale} t={t} />
      <FinalFeaturesCta locale={locale} t={t} />
    </main>
  )
}

function FeaturesHero({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.78fr)] lg:items-center lg:px-8 lg:py-20">
      <div>
        <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">{t.badge}</Badge>
        <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-marketing-muted">{t.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg">
            <Link href={routes.marketing.demos(locale)}>{t.exploreDemos}</Link>
          </Button>
          <Button
            asChild
            className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
            size="lg"
            variant="outline"
          >
            <Link href={routes.marketing.pricing(locale)}>{t.viewPricing}</Link>
          </Button>
        </div>
      </div>
      <SystemMapVisual locale={locale} t={t} />
    </section>
  )
}

function SystemMapVisual({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  const layers = [
    { icon: Store, label: "WooCommerce core" },
    { icon: PanelsTopLeft, label: locale === "fr" ? "Sections theme" : "Theme sections" },
    { icon: SlidersHorizontal, label: locale === "fr" ? "Presets niche" : "Niche presets" },
    { icon: Globe2, label: locale === "fr" ? "Marche et langue" : "Market and language" },
    { icon: KeyRound, label: locale === "fr" ? "Acces licence" : "License access" },
    { icon: BookOpen, label: locale === "fr" ? "Docs et support" : "Docs and support" },
  ]
  const widths = ["w-[36%]", "w-[46%]", "w-[56%]", "w-[66%]", "w-[76%]", "w-[86%]"]

  return (
    <Card className="overflow-hidden border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
      <CardHeader className="border-b border-marketing-border bg-marketing-card-subtle">
        <p className="text-xs font-semibold uppercase tracking-wide text-marketing-accent">{t.visualTitle}</p>
        <h2 className="font-heading text-2xl font-bold text-marketing-foreground">Template Engine Platform</h2>
        <p className="text-sm leading-6 text-marketing-muted">{t.visualLead}</p>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid gap-3">
          {layers.map((layer, index) => (
            <div
              className="flex items-center gap-3 rounded-lg border border-marketing-border bg-marketing-card-subtle p-3"
              key={layer.label}
            >
              <div className="flex size-10 items-center justify-center rounded-md bg-marketing-accent-soft text-marketing-accent">
                <layer.icon aria-hidden="true" className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-marketing-foreground">{layer.label}</p>
                <div className="mt-2 h-1.5 rounded-full bg-marketing-slate">
                  <div className={`h-1.5 rounded-full bg-marketing-accent ${widths[index]}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCategoryTabs({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="feature-categories">
      <div className="max-w-3xl">
        <h2 id="feature-categories" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.categoriesTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.categoriesLead}</p>
      </div>
      <Tabs className="mt-8" defaultValue="storefront">
        <TabsList className="flex h-auto w-full flex-wrap justify-start border-marketing-border bg-marketing-card-subtle p-1">
          {featureCategories.map((category) => (
            <TabsTrigger
              className="min-h-10 flex-1 basis-[calc(50%-0.25rem)] text-marketing-muted data-[state=active]:bg-marketing-accent data-[state=active]:text-white lg:basis-auto"
              key={category.id}
              value={category.id}
            >
              {category.label[locale]}
            </TabsTrigger>
          ))}
        </TabsList>
        {featureCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.features.map((feature) => (
                <FeatureCard
                  body={feature.body[locale]}
                  icon={feature.icon}
                  key={feature.title.en}
                  title={feature.title[locale]}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function FeatureCard({
  body,
  icon: Icon,
  title,
}: {
  body: string
  icon: typeof Store
  title: string
}) {
  return (
    <Card className="border-marketing-border bg-marketing-card text-marketing-foreground">
      <CardContent className="p-5">
        <Icon aria-hidden="true" className="size-6 text-marketing-accent" />
        <h3 className="mt-5 font-heading text-lg font-bold text-marketing-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-marketing-muted">{body}</p>
      </CardContent>
    </Card>
  )
}

function ShopModelGrid({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="shop-models">
      <div className="max-w-3xl">
        <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
          {locale === "fr" ? "Modeles ecommerce" : "Ecommerce models"}
        </Badge>
        <h2 id="shop-models" className="mt-5 font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.modelsTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.modelsLead}</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {shopModels.map((model) => (
          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={model.title.en}>
            <CardContent className="grid gap-5 p-6 sm:grid-cols-[auto_1fr]">
              <div className="flex size-12 items-center justify-center rounded-lg bg-marketing-accent-soft text-marketing-accent">
                <model.icon aria-hidden="true" className="size-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-marketing-foreground">{model.title[locale]}</h3>
                <p className="mt-3 text-sm leading-6 text-marketing-muted">{model.body[locale]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function WorkflowSection({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="workflow">
      <div className="max-w-3xl">
        <h2 id="workflow" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.workflowTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.workflowLead}</p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        {workflowSteps.map((step, index) => (
          <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={step.title.en}>
            <CardContent className="p-5">
              <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
                {String(index + 1).padStart(2, "0")}
              </Badge>
              <h3 className="mt-5 font-heading text-lg font-bold text-marketing-foreground">{step.title[locale]}</h3>
              <p className="mt-3 text-sm leading-6 text-marketing-muted">{step.body[locale]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function LicenseBoundary({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  const cards = [
    {
      title: { fr: "Acces officiel", en: "Official access" },
      body: {
        fr: "La cle couvre telechargements, mises a jour, activations et support officiel.",
        en: "The key covers downloads, updates, activations and official support.",
      },
    },
    {
      title: { fr: "Storefront resilient", en: "Resilient storefront" },
      body: {
        fr: "La boutique publique, le panier et le checkout ne doivent pas dependre de la disponibilite licence.",
        en: "The public store, cart and checkout must not depend on license availability.",
      },
    },
    {
      title: { fr: "Services explicites", en: "Explicit services" },
      body: {
        fr: "Starter, Pro et Managed decrivent des niveaux de service, pas une automatisation magique.",
        en: "Starter, Pro and Managed describe service levels, not magic automation.",
      },
    },
  ]

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Alert className="border-marketing-warning/30 bg-marketing-warning/10 text-marketing-foreground" variant="warning">
        <div className="flex flex-col gap-4 sm:flex-row">
          <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-marketing-warning" />
          <div>
            <h2 className="font-heading text-xl font-bold text-marketing-foreground">{t.boundaryTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-marketing-muted">{t.boundaryLead}</p>
          </div>
        </div>
      </Alert>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={card.title.en}>
            <CardContent className="p-5">
              <h3 className="font-heading text-lg font-bold text-marketing-foreground">{card.title[locale]}</h3>
              <p className="mt-3 text-sm leading-6 text-marketing-muted">{card.body[locale]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function TechnicalConfidence({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="technical-confidence">
      <div className="max-w-3xl">
        <h2 id="technical-confidence" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.technicalTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.technicalLead}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {technicalTrust.map((item) => (
          <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={item.title.en}>
            <CardContent className="p-5">
              <item.icon aria-hidden="true" className="size-6 text-marketing-accent" />
              <h3 className="mt-5 font-heading text-lg font-bold text-marketing-foreground">{item.title[locale]}</h3>
              <p className="mt-3 text-sm leading-6 text-marketing-muted">{item.body[locale]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function FinalFeaturesCta({ locale, t }: { locale: Locale; t: FeatureCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="features-final">
      <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 text-center shadow-panel sm:p-10">
        <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
          {locale === "fr" ? "Prochaine etape" : "Next step"}
        </Badge>
        <h2 id="features-final" className="mx-auto mt-5 max-w-4xl text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.finalTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-marketing-muted">{t.finalLead}</p>
        <Separator className="mx-auto mt-8 max-w-xl bg-marketing-border" />
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={routes.marketing.pricing(locale)}>{t.viewPricing}</Link>
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
