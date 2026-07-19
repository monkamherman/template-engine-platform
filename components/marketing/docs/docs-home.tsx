import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  Globe2,
  HelpCircle,
  History,
  Home,
  Languages,
  Layers3,
  LifeBuoy,
  PackageCheck,
  Paintbrush,
  RotateCcw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

type LocalizedText = Record<Locale, string>

type DocsHomeMetadata = {
  lastReviewedAt: string
  reviewStatus: string
  productVersionRange: string
}

type LinkChip = {
  label: LocalizedText
  href: (locale: Locale) => string
}

type CategoryCard = {
  title: LocalizedText
  description: LocalizedText
  status: LocalizedText
  icon: LucideIcon
  href: (locale: Locale) => string
  chips: readonly LinkChip[]
}

const docsArticle = (slug: string) => (locale: Locale) => routes.docs.article(locale, slug)

const copy = {
  fr: {
    home: "Accueil",
    docs: "Docs",
    badge: "Documentation",
    title: "Installez, activez et exploitez votre WooCommerce Template Engine avec confiance.",
    lead:
      "Trouvez le bon guide pour l'installation autonome, le setup accompagne, l'acces officiel, les modeles de boutique, les mises a jour et le depannage.",
    searchLabel: "Recherche documentation",
    searchPlaceholder: "Rechercher installation, activation, modeles de boutique...",
    searchHint: "Apercu de recherche. Le moteur connecte sera ajoute avec l'interface de recherche documentation.",
    startHere: "Commencer ici",
    installation: "Installation",
    activation: "Activation",
    troubleshooting: "Depannage",
    choosePath: "Choisissez votre parcours.",
    choosePathLead:
      "Les parcours indiquent les guides prioritaires selon l'offre. Ils ne remplacent pas les limites commerciales approuvees.",
    categoriesTitle: "Parcourir la documentation.",
    categoriesLead:
      "Les categories couvrent le chemin client depuis les pre-requis jusqu'aux mises a jour et au support.",
    highlightedTitle: "Guides a lire avant de toucher production.",
    supportTitle: "Besoin d'aide apres lecture ?",
    supportLead:
      "Commencez par les diagnostics documentes, puis utilisez le bon canal selon votre compte et votre offre.",
    reviewNotice:
      "Documentation is versioned. Compatibility, legal and support claims must match the approved release and review state.",
    versionTitle: "Documentation actuelle",
    docsVersion: "Version docs",
    compatibleTheme: "Theme compatible",
    lastUpdated: "Derniere revue",
    releaseNotes: "Notes de version",
    reviewDraft: "Brouillon en revue technique",
    pendingRelease: "En attente de release approuvee",
    openGuide: "Ouvrir le guide",
    openSupport: "Ouvrir le support",
    compareSupport: "Comparer Pro et Managed",
  },
  en: {
    home: "Home",
    docs: "Docs",
    badge: "Documentation",
    title: "Install, activate and operate your WooCommerce Template Engine with confidence.",
    lead:
      "Find the right guide for self-installation, guided setup, official license access, store model configuration, updates and troubleshooting.",
    searchLabel: "Documentation search",
    searchPlaceholder: "Search installation, activation, shop models...",
    searchHint: "Search preview. The connected documentation search interface will be added separately.",
    startHere: "Start here",
    installation: "Installation",
    activation: "Activation",
    troubleshooting: "Troubleshooting",
    choosePath: "Choose your path.",
    choosePathLead:
      "Paths show the priority guides for each offer. They do not replace approved commercial boundaries.",
    categoriesTitle: "Browse documentation.",
    categoriesLead:
      "Categories cover the customer path from requirements through updates and support.",
    highlightedTitle: "Guides to read before touching production.",
    supportTitle: "Need help after reading?",
    supportLead:
      "Start with documented diagnostics, then use the correct path for your account and plan.",
    reviewNotice:
      "Documentation is versioned. Compatibility, legal and support claims must match the approved release and review state.",
    versionTitle: "Current documentation",
    docsVersion: "Docs version",
    compatibleTheme: "Compatible theme",
    lastUpdated: "Last reviewed",
    releaseNotes: "Release notes",
    reviewDraft: "Technical review draft",
    pendingRelease: "Pending approved release",
    openGuide: "Open guide",
    openSupport: "Open support",
    compareSupport: "Compare Pro and Managed",
  },
} satisfies Record<Locale, Record<string, string>>

const quickActions = [
  { label: { fr: "Commencer ici", en: "Start here" }, href: docsArticle("getting-started"), icon: BookOpen },
  { label: { fr: "Installation", en: "Installation" }, href: docsArticle("installation"), icon: PackageCheck },
  { label: { fr: "Activation", en: "Activation" }, href: docsArticle("activation"), icon: ShieldCheck },
  { label: { fr: "Depannage", en: "Troubleshooting" }, href: docsArticle("troubleshooting"), icon: HelpCircle },
] as const

const pathCards = [
  {
    title: { fr: "Starter self-install", en: "Starter self-install" },
    description: {
      fr: "Pour les utilisateurs techniques qui installent le theme eux-memes.",
      en: "For technical users installing the theme themselves.",
    },
    icon: Wrench,
    links: [
      { label: { fr: "Pre-requis", en: "Requirements" }, href: docsArticle("requirements") },
      { label: { fr: "Installation", en: "Installation" }, href: docsArticle("installation") },
      { label: { fr: "Activation", en: "Activation" }, href: docsArticle("activation") },
      { label: { fr: "Setup initial", en: "Initial setup" }, href: docsArticle("initial-setup") },
    ],
  },
  {
    title: { fr: "Pro guided launch", en: "Pro guided launch" },
    description: {
      fr: "Pour les clients qui suivent un accompagnement d'onboarding.",
      en: "For customers following onboarding support.",
    },
    icon: Sparkles,
    links: [
      { label: { fr: "Demarrage", en: "Getting started" }, href: docsArticle("getting-started") },
      { label: { fr: "Checklist onboarding", en: "Onboarding checklist" }, href: docsArticle("getting-started") },
      { label: { fr: "Validation staging", en: "Staging validation" }, href: docsArticle("updates") },
      { label: { fr: "Preparation lancement", en: "Launch preparation" }, href: docsArticle("initial-setup") },
    ],
  },
  {
    title: { fr: "Managed operations", en: "Managed operations" },
    description: {
      fr: "Pour les clients qui utilisent un support continu de mise a jour et validation.",
      en: "For customers using ongoing update and validation support.",
    },
    icon: Settings2,
    links: [
      { label: { fr: "Mises a jour", en: "Updates" }, href: docsArticle("updates") },
      { label: { fr: "Backup et rollback", en: "Backup and rollback" }, href: docsArticle("backup-rollback") },
      { label: { fr: "Notes de version", en: "Release notes" }, href: docsArticle("releases/1.0.0") },
      { label: { fr: "Support", en: "Support" }, href: (locale: Locale) => routes.account.support(locale) },
    ],
  },
] as const

const categories = [
  {
    title: { fr: "Demarrage", en: "Getting started" },
    description: { fr: "Vue d'ensemble du parcours client jusqu'a une boutique testable.", en: "Overview from customer account to a testable store." },
    status: { fr: "Essentiel", en: "Essential" },
    icon: BookOpen,
    href: docsArticle("getting-started"),
    chips: [
      { label: { fr: "Checklist", en: "Checklist" }, href: docsArticle("getting-started") },
      { label: { fr: "Compte", en: "Account" }, href: (locale) => routes.account.dashboard(locale) },
    ],
  },
  {
    title: { fr: "Pre-requis", en: "Requirements" },
    description: { fr: "Environnement WordPress, WooCommerce, SSL, backup et acces admin.", en: "WordPress, WooCommerce, SSL, backup and admin access prerequisites." },
    status: { fr: "Essentiel", en: "Essential" },
    icon: ClipboardCheck,
    href: docsArticle("requirements"),
    chips: [
      { label: { fr: "Hosting", en: "Hosting" }, href: docsArticle("requirements") },
      { label: { fr: "Backup", en: "Backup" }, href: docsArticle("backup-rollback") },
    ],
  },
  {
    title: { fr: "Installation", en: "Installation" },
    description: { fr: "Installer le paquet officiel sans exposer les sources privees.", en: "Install the official package without exposing private source files." },
    status: { fr: "Setup", en: "Setup" },
    icon: PackageCheck,
    href: docsArticle("installation"),
    chips: [
      { label: { fr: "ZIP theme", en: "Theme ZIP" }, href: docsArticle("installation") },
      { label: { fr: "Erreurs upload", en: "Upload errors" }, href: docsArticle("troubleshooting") },
    ],
  },
  {
    title: { fr: "Activation et licences", en: "Activation and licenses" },
    description: { fr: "Comprendre la cle, les limites et les services officiels.", en: "Understand the key, activation limits and official services." },
    status: { fr: "Essentiel", en: "Essential" },
    icon: ShieldCheck,
    href: docsArticle("activation"),
    chips: [
      { label: { fr: "Cle", en: "Key" }, href: docsArticle("activation") },
      { label: { fr: "Staging", en: "Staging" }, href: docsArticle("activation") },
      { label: { fr: "Licences", en: "Licenses" }, href: (locale) => routes.account.licenses(locale) },
    ],
  },
  {
    title: { fr: "Configuration initiale", en: "Initial setup" },
    description: { fr: "Pages WooCommerce, devise, taxes, emails et controles de base.", en: "WooCommerce pages, currency, taxes, emails and basic checks." },
    status: { fr: "Setup", en: "Setup" },
    icon: SlidersHorizontal,
    href: docsArticle("initial-setup"),
    chips: [
      { label: { fr: "WooCommerce", en: "WooCommerce" }, href: docsArticle("initial-setup") },
      { label: { fr: "Paiements", en: "Payments" }, href: docsArticle("payments") },
    ],
  },
  {
    title: { fr: "Modeles de boutique", en: "Shop models" },
    description: { fr: "Comparer dropshipping, stock, hybride et digital avant configuration.", en: "Compare dropshipping, stock, hybrid and digital before configuration." },
    status: { fr: "Setup", en: "Setup" },
    icon: Layers3,
    href: docsArticle("shop-models"),
    chips: [
      { label: { fr: "Dropshipping", en: "Dropshipping" }, href: (locale) => routes.marketing.useCase(locale, "dropshipping") },
      { label: { fr: "Digital", en: "Digital" }, href: (locale) => routes.marketing.useCase(locale, "digital") },
    ],
  },
  {
    title: { fr: "Niches", en: "Niches" },
    description: { fr: "Preparer contenus, promesses commerciales et limites de demo.", en: "Prepare content, commercial claims and demo boundaries." },
    status: { fr: "Setup", en: "Setup" },
    icon: Boxes,
    href: docsArticle("niches"),
    chips: [
      { label: { fr: "Contenu", en: "Content" }, href: docsArticle("niches") },
      { label: { fr: "Demos", en: "Demos" }, href: routes.marketing.demos },
    ],
  },
  {
    title: { fr: "Localisation", en: "Localization" },
    description: { fr: "Langue, marche, devise et libelles sans melanger les locales.", en: "Language, market, currency and labels without mixing locales." },
    status: { fr: "Setup", en: "Setup" },
    icon: Languages,
    href: docsArticle("localization"),
    chips: [
      { label: { fr: "Langue", en: "Language" }, href: docsArticle("localization") },
      { label: { fr: "Marche", en: "Market" }, href: docsArticle("localization") },
    ],
  },
  {
    title: { fr: "Produits", en: "Products" },
    description: { fr: "Produits, variations, stock et items digitaux selon le modele.", en: "Products, variations, stock and digital items for the selected model." },
    status: { fr: "Operations", en: "Operations" },
    icon: Boxes,
    href: docsArticle("products"),
    chips: [
      { label: { fr: "Catalogue", en: "Catalog" }, href: docsArticle("products") },
      { label: { fr: "Stock", en: "Stock" }, href: docsArticle("shop-models") },
    ],
  },
  {
    title: { fr: "Paiements", en: "Payments" },
    description: { fr: "Verifier les moyens de paiement WooCommerce et commandes test.", en: "Verify WooCommerce payment methods and test orders." },
    status: { fr: "Operations", en: "Operations" },
    icon: CreditCard,
    href: docsArticle("payments"),
    chips: [
      { label: { fr: "Checkout", en: "Checkout" }, href: docsArticle("payments") },
      { label: { fr: "Test", en: "Test" }, href: docsArticle("payments") },
    ],
  },
  {
    title: { fr: "Personnalisation", en: "Customization" },
    description: { fr: "Marque, couleurs, sections et limites de modification propres.", en: "Brand, colors, sections and clean modification boundaries." },
    status: { fr: "Setup", en: "Setup" },
    icon: Paintbrush,
    href: docsArticle("customization"),
    chips: [
      { label: { fr: "Branding", en: "Branding" }, href: docsArticle("customization") },
      { label: { fr: "Marques", en: "Trademarks" }, href: routes.legal.trademark },
    ],
  },
  {
    title: { fr: "Mises a jour", en: "Updates" },
    description: { fr: "Lire le changelog, tester staging et deployer avec controles.", en: "Read the changelog, test staging and deploy with checks." },
    status: { fr: "Operations", en: "Operations" },
    icon: RotateCcw,
    href: docsArticle("updates"),
    chips: [
      { label: { fr: "Changelog", en: "Changelog" }, href: docsArticle("releases/1.0.0") },
      { label: { fr: "Staging", en: "Staging" }, href: docsArticle("updates") },
    ],
  },
  {
    title: { fr: "Backup et rollback", en: "Backup and rollback" },
    description: { fr: "Verifier une restauration utilisable avant installation ou update.", en: "Verify a usable restore path before installation or update." },
    status: { fr: "Operations", en: "Operations" },
    icon: History,
    href: docsArticle("backup-rollback"),
    chips: [
      { label: { fr: "Backup", en: "Backup" }, href: docsArticle("backup-rollback") },
      { label: { fr: "Rollback", en: "Rollback" }, href: docsArticle("backup-rollback") },
    ],
  },
  {
    title: { fr: "Depannage", en: "Troubleshooting" },
    description: { fr: "Identifier les erreurs sans partager secrets, cles ou donnees client.", en: "Identify errors without sharing secrets, keys or customer data." },
    status: { fr: "Support", en: "Support" },
    icon: HelpCircle,
    href: docsArticle("troubleshooting"),
    chips: [
      { label: { fr: "Diagnostics", en: "Diagnostics" }, href: docsArticle("troubleshooting") },
      { label: { fr: "FAQ", en: "FAQ" }, href: docsArticle("faq") },
    ],
  },
  {
    title: { fr: "Notes de version", en: "Release notes" },
    description: { fr: "Structure de changelog, compatibilite et consignes par release.", en: "Changelog, compatibility and release-specific guidance structure." },
    status: { fr: "Operations", en: "Operations" },
    icon: FileText,
    href: docsArticle("releases/1.0.0"),
    chips: [
      { label: { fr: "Release", en: "Release" }, href: docsArticle("releases/1.0.0") },
      { label: { fr: "Updates", en: "Updates" }, href: docsArticle("updates") },
    ],
  },
] satisfies readonly CategoryCard[]

const highlightedGuides = [
  {
    title: { fr: "Installer depuis un WordPress propre", en: "Install from a clean WordPress environment" },
    description: {
      fr: "Preparez WordPress, WooCommerce et les controles minimum avant l'upload du paquet officiel.",
      en: "Prepare WordPress, WooCommerce and minimum checks before uploading the official package.",
    },
    icon: PackageCheck,
    href: docsArticle("installation"),
  },
  {
    title: { fr: "Activer l'acces officiel en securite", en: "Activate official access safely" },
    description: {
      fr: "Gardez la cle privee et distinguez production, staging et services officiels.",
      en: "Keep the key private and separate production, staging and official services.",
    },
    icon: ShieldCheck,
    href: docsArticle("activation"),
  },
  {
    title: { fr: "Preparer backup et rollback avant update", en: "Prepare backup and rollback before updates" },
    description: {
      fr: "Validez une restauration exploitable avant de modifier une boutique de production.",
      en: "Validate a usable restore path before changing a production store.",
    },
    icon: RotateCcw,
    href: docsArticle("backup-rollback"),
  },
] as const

const supportCards = [
  {
    title: { fr: "Verifier le depannage", en: "Check troubleshooting" },
    description: {
      fr: "Comparez erreur, contexte et etapes reproduites avant d'ouvrir une demande.",
      en: "Compare the error, context and reproduced steps before opening a request.",
    },
    icon: HelpCircle,
    href: docsArticle("troubleshooting"),
  },
  {
    title: { fr: "Ouvrir une demande support compte", en: "Open account support request" },
    description: {
      fr: "Utilisez l'espace compte pour les demandes liees a votre acces commercial.",
      en: "Use the account area for requests tied to your commercial access.",
    },
    icon: LifeBuoy,
    href: (locale: Locale) => routes.account.supportNew(locale),
  },
  {
    title: { fr: "Comparer Pro et Managed", en: "Compare Pro and Managed support" },
    description: {
      fr: "Verifiez si votre besoin releve d'un lancement accompagne ou d'operations suivies.",
      en: "Check whether your need fits guided launch support or ongoing operations.",
    },
    icon: BadgeCheck,
    href: (locale: Locale) => routes.marketing.pricing(locale),
  },
] as const

export function DocsHomeContent({
  locale,
  metadata,
}: {
  locale: Locale
  metadata: DocsHomeMetadata
}) {
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <div>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-marketing-muted">
            <Link className="inline-flex items-center gap-2 hover:text-marketing-foreground" href={routes.home(locale)}>
              <Home aria-hidden="true" className="size-4" />
              {t.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-marketing-foreground">{t.docs}</span>
          </nav>

          <div className="mt-8">
            <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">{t.badge}</Badge>
            <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-marketing-muted">{t.lead}</p>
          </div>

          <SearchPreview locale={locale} />
          <QuickActions locale={locale} />
        </div>

        <DocsVersionCard locale={locale} metadata={metadata} />
      </section>

      <section aria-labelledby="docs-paths" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 id="docs-paths" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
            {t.choosePath}
          </h2>
          <p className="mt-4 leading-7 text-marketing-muted">{t.choosePathLead}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pathCards.map((path) => {
            const Icon = path.icon

            return (
              <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={path.title.en}>
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-lg border border-marketing-border bg-marketing-card-subtle text-marketing-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-marketing-foreground">{path.title[locale]}</h3>
                  <p className="text-sm leading-6 text-marketing-muted">{path.description[locale]}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {path.links.map((item) => (
                      <LinkChip item={item} key={item.label.en} locale={locale} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="docs-categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <h2 id="docs-categories" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
              {t.categoriesTitle}
            </h2>
            <p className="mt-4 leading-7 text-marketing-muted">{t.categoriesLead}</p>
          </div>
          <Badge className="w-fit border-marketing-border bg-marketing-card text-marketing-muted">
            {metadata.reviewStatus}
          </Badge>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <DocsCategoryCard category={category} key={category.title.en} locale={locale} />
          ))}
        </div>
      </section>

      <section aria-labelledby="highlighted-guides" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="highlighted-guides" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.highlightedTitle}
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {highlightedGuides.map((guide) => {
            const Icon = guide.icon

            return (
              <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={guide.title.en}>
                <CardHeader>
                  <Icon aria-hidden="true" className="size-6 text-marketing-accent" />
                  <h3 className="mt-4 font-heading text-xl font-bold text-marketing-foreground">{guide.title[locale]}</h3>
                  <p className="text-sm leading-6 text-marketing-muted">{guide.description[locale]}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background"
                    variant="outline"
                  >
                    <Link href={guide.href(locale)}>
                      {t.openGuide}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="docs-support" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 shadow-panel sm:p-8">
          <div className="max-w-3xl">
            <h2 id="docs-support" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
              {t.supportTitle}
            </h2>
            <p className="mt-4 leading-7 text-marketing-muted">{t.supportLead}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {supportCards.map((card) => {
              const Icon = card.icon

              return (
                <Link
                  className="rounded-xl border border-marketing-border bg-marketing-card-subtle p-5 transition-colors hover:border-marketing-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                  href={card.href(locale)}
                  key={card.title.en}
                >
                  <Icon aria-hidden="true" className="size-5 text-marketing-accent" />
                  <h3 className="mt-4 font-heading text-lg font-bold text-marketing-foreground">{card.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-6 text-marketing-muted">{card.description[locale]}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <Alert className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground">
          <div className="flex gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-success" />
            <p className="text-sm leading-6 text-marketing-muted">{t.reviewNotice}</p>
          </div>
        </Alert>
      </section>
    </main>
  )
}

function SearchPreview({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <div className="mt-8 rounded-xl border border-marketing-border bg-marketing-card p-3 shadow-panel">
      <label className="sr-only" htmlFor="docs-search-preview">
        {t.searchLabel}
      </label>
      <div className="flex items-center gap-3 rounded-lg border border-marketing-border bg-marketing-background px-4 py-3">
        <Search aria-hidden="true" className="size-5 shrink-0 text-marketing-accent" />
        <Input
          aria-describedby="docs-search-preview-hint"
          className="h-auto border-0 bg-transparent p-0 text-base text-marketing-foreground shadow-none placeholder:text-marketing-muted focus-visible:outline-none"
          id="docs-search-preview"
          placeholder={t.searchPlaceholder}
          readOnly
          type="search"
        />
        <Badge className="hidden border-marketing-border bg-marketing-card-subtle text-marketing-muted sm:inline-flex">
          Preview
        </Badge>
      </div>
      <p id="docs-search-preview-hint" className="px-2 pt-3 text-xs leading-5 text-marketing-muted">
        {t.searchHint}
      </p>
    </div>
  )
}

function QuickActions({ locale }: { locale: Locale }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {quickActions.map((action) => {
        const Icon = action.icon

        return (
          <Button
            asChild
            className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
            key={action.label.en}
            size="compact"
            variant="outline"
          >
            <Link href={action.href(locale)}>
              <Icon aria-hidden="true" />
              {action.label[locale]}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}

function DocsVersionCard({ locale, metadata }: { locale: Locale; metadata: DocsHomeMetadata }) {
  const t = copy[locale]

  return (
    <Card className="h-fit border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
      <CardHeader>
        <Badge className="w-fit border-marketing-border bg-marketing-card-subtle text-marketing-muted">
          <Globe2 aria-hidden="true" className="mr-2 size-3.5" />
          {t.versionTitle}
        </Badge>
        <h2 className="font-heading text-2xl font-bold text-marketing-foreground">{t.versionTitle}</h2>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3">
          <VersionRow label={t.docsVersion} value={t.reviewDraft} />
          <VersionRow label={t.compatibleTheme} value={t.pendingRelease} />
          <VersionRow label={t.lastUpdated} value={metadata.lastReviewedAt} />
        </dl>
        <Separator className="my-5 bg-marketing-border" />
        <Button asChild className="w-full">
          <Link href={routes.docs.article(locale, "releases/1.0.0")}>
            {t.releaseNotes}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function VersionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle px-3 py-3">
      <dt className="text-xs font-medium text-marketing-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-marketing-foreground">{value}</dd>
    </div>
  )
}

function DocsCategoryCard({ category, locale }: { category: CategoryCard; locale: Locale }) {
  const Icon = category.icon

  return (
    <Card className="flex h-full flex-col border-marketing-border bg-marketing-card text-marketing-foreground shadow-subtle">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-11 items-center justify-center rounded-lg border border-marketing-border bg-marketing-card-subtle text-marketing-accent">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
            {category.status[locale]}
          </Badge>
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-marketing-foreground">
          <Link className="hover:text-marketing-accent" href={category.href(locale)}>
            {category.title[locale]}
          </Link>
        </h3>
        <p className="text-sm leading-6 text-marketing-muted">{category.description[locale]}</p>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {category.chips.map((chip) => (
            <LinkChip item={chip} key={chip.label.en} locale={locale} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LinkChip({ item, locale }: { item: LinkChip; locale: Locale }) {
  return (
    <Link
      className="inline-flex min-h-9 items-center rounded-md border border-marketing-border bg-marketing-card-subtle px-3 py-1 text-xs font-semibold text-marketing-muted transition-colors hover:border-marketing-accent hover:text-marketing-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
      href={item.href(locale)}
    >
      {item.label[locale]}
    </Link>
  )
}
