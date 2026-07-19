import Link from "next/link"
import {
  ArrowRight,
  Check,
  CircleDot,
  HelpCircle,
  LifeBuoy,
  Minus,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

type LocalizedText = Record<Locale, string>

type PricingCopy = {
  badge: string
  title: string
  lead: string
  startStarter: string
  compareAll: string
  plansTitle: string
  licenseTitle: string
  licenseText: string
  comparisonTitle: string
  comparisonLead: string
  helperTitle: string
  helperLead: string
  faqTitle: string
  finalTitle: string
  finalLead: string
  contactManaged: string
  choose: string
  included: string
  pricePlaceholder: string
  customScope: string
  recommended: string
}

const copy: Record<Locale, PricingCopy> = {
  fr: {
    badge: "Offres d'acces commercial",
    title: "Choisissez le niveau de support derriere votre WooCommerce Template Engine.",
    lead:
      "Demarrez avec le package officiel, puis ajoutez onboarding ou support operationnel selon l'aide souhaitee autour du lancement et des mises a jour.",
    startStarter: "Demarrer avec Starter",
    compareAll: "Comparer les fonctions",
    plansTitle: "Trois parcours, sans prix final invente.",
    licenseTitle: "Clarification licence",
    licenseText:
      "La cle controle l'acces officiel, les mises a jour, les telechargements, les activations et les services de support. Elle ne desactive pas votre storefront ou votre checkout.",
    comparisonTitle: "Comparer les responsabilites par offre.",
    comparisonLead:
      "Cette comparaison presente les limites commerciales attendues. Les prix finaux restent geres cote catalogue et checkout approuves.",
    helperTitle: "Quelle offre choisir ?",
    helperLead: "Choisissez selon votre capacite de lancement, pas selon une promesse de resultat.",
    faqTitle: "Questions frequentes",
    finalTitle: "Commencez avec le parcours qui correspond a votre capacite de lancement.",
    finalLead:
      "Starter convient aux profils autonomes. Pro ajoute un accompagnement de lancement. Managed prepare un suivi operationnel plus continu.",
    contactManaged: "Contacter pour Managed",
    choose: "Choisir",
    included: "Inclus",
    pricePlaceholder: "Prix de lancement a confirmer",
    customScope: "Perimetre sur mesure",
    recommended: "Recommande",
  },
  en: {
    badge: "Commercial access plans",
    title: "Choose the level of support behind your WooCommerce Template Engine.",
    lead:
      "Start with the official template package, then add onboarding or managed operational support depending on how much help you want around launch and updates.",
    startStarter: "Start with Starter",
    compareAll: "Compare all features",
    plansTitle: "Three paths, without invented final prices.",
    licenseTitle: "License clarification",
    licenseText:
      "The key controls official access, updates, downloads, activation records and support services. It does not disable your storefront or checkout.",
    comparisonTitle: "Compare responsibilities by plan.",
    comparisonLead:
      "This comparison presents expected commercial boundaries. Final prices remain owned by approved catalog and checkout flows.",
    helperTitle: "Which plan should I choose?",
    helperLead: "Choose based on launch capacity, not on a promise of results.",
    faqTitle: "Frequently asked questions",
    finalTitle: "Start with the path that matches your launch capacity.",
    finalLead:
      "Starter fits autonomous teams. Pro adds guided launch support. Managed prepares a more continuous operational support path.",
    contactManaged: "Contact for Managed",
    choose: "Choose",
    included: "Included",
    pricePlaceholder: "Launch price to be confirmed",
    customScope: "Custom scope",
    recommended: "Recommended",
  },
}

const planData = [
  {
    id: "starter",
    label: { fr: "Self-install", en: "Self-install" },
    name: { fr: "Starter", en: "Starter" },
    audience: {
      fr: "Pour entrepreneurs techniques et agences.",
      en: "For technical entrepreneurs and agencies.",
    },
    price: "placeholder",
    href: (locale: Locale) => routes.marketing.offer(locale, "starter"),
    cta: { fr: "Choisir Starter", en: "Choose Starter" },
    icon: CircleDot,
    recommended: false,
    includes: {
      fr: [
        "Acces au telechargement officiel",
        "Cle pour services officiels",
        "Documentation",
        "Notes de version",
        "Installation geree par le client",
      ],
      en: [
        "Official theme download access",
        "License key for official services",
        "Documentation",
        "Release notes",
        "Self-managed installation",
      ],
    },
  },
  {
    id: "pro",
    label: { fr: "Lancement guide", en: "Guided launch" },
    name: { fr: "Pro", en: "Pro" },
    audience: {
      fr: "Pour les clients qui veulent de l'aide pour la premiere boutique.",
      en: "For customers who want help setting up their first store.",
    },
    price: "placeholder",
    href: (locale: Locale) => routes.marketing.offer(locale, "pro"),
    cta: { fr: "Choisir Pro", en: "Choose Pro" },
    icon: Sparkles,
    recommended: true,
    includes: {
      fr: [
        "Tout Starter",
        "Checklist onboarding",
        "Guidage de configuration",
        "Chemin de validation staging",
        "Limite de support lancement",
      ],
      en: [
        "Everything in Starter",
        "Onboarding checklist",
        "Setup guidance",
        "Staging validation path",
        "Launch support boundary",
      ],
    },
  },
  {
    id: "managed",
    label: { fr: "Support operationnel", en: "Operational support" },
    name: { fr: "Managed", en: "Managed" },
    audience: {
      fr: "Pour les clients qui veulent un suivi autour des mises a jour et validations.",
      en: "For customers who want ongoing help around updates, validation and operational continuity.",
    },
    price: "custom",
    href: (locale: Locale) => routes.marketing.contact(locale),
    cta: { fr: "Nous contacter", en: "Talk to us" },
    icon: Wrench,
    recommended: false,
    includes: {
      fr: [
        "Tout Pro",
        "Workflow de validation gere",
        "Planification des mises a jour",
        "Guidage rollback",
        "Limite de support operationnel prioritaire",
      ],
      en: [
        "Everything in Pro",
        "Managed validation workflow",
        "Update planning",
        "Rollback guidance",
        "Priority operational support boundary",
      ],
    },
  },
] as const

const comparisonRows = [
  {
    feature: { fr: "Telechargement officiel", en: "Official download access" },
    starter: { fr: "Inclus", en: "Included" },
    pro: { fr: "Inclus", en: "Included" },
    managed: { fr: "Inclus", en: "Included" },
  },
  {
    feature: { fr: "Cle et activations", en: "License key and activations" },
    starter: { fr: "Limites approuvees", en: "Approved limits" },
    pro: { fr: "Limites approuvees", en: "Approved limits" },
    managed: { fr: "Selon perimetre", en: "Scope-based" },
  },
  {
    feature: { fr: "Documentation", en: "Documentation" },
    starter: { fr: "Incluse", en: "Included" },
    pro: { fr: "Incluse", en: "Included" },
    managed: { fr: "Incluse", en: "Included" },
  },
  {
    feature: { fr: "Installation autonome", en: "Self-installation" },
    starter: { fr: "Client", en: "Customer" },
    pro: { fr: "Possible", en: "Possible" },
    managed: { fr: "Coordonnee", en: "Coordinated" },
  },
  {
    feature: { fr: "Configuration guidee", en: "Guided setup" },
    starter: null,
    pro: { fr: "Chemin Pro", en: "Pro path" },
    managed: { fr: "Chemin Managed", en: "Managed path" },
  },
  {
    feature: { fr: "Validation staging", en: "Staging validation" },
    starter: null,
    pro: { fr: "Si disponible", en: "When available" },
    managed: { fr: "Planifiee", en: "Planned" },
  },
  {
    feature: { fr: "Planification mises a jour", en: "Managed update planning" },
    starter: null,
    pro: null,
    managed: { fr: "Incluse au perimetre", en: "In scoped service" },
  },
  {
    feature: { fr: "Chemin support", en: "Support path" },
    starter: { fr: "Produit", en: "Product" },
    pro: { fr: "Lancement", en: "Launch" },
    managed: { fr: "Operationnel", en: "Operational" },
  },
  {
    feature: { fr: "Ideal pour", en: "Best for" },
    starter: { fr: "Autonomie technique", en: "Technical autonomy" },
    pro: { fr: "Premier lancement guide", en: "Guided first launch" },
    managed: { fr: "Suivi regulier", en: "Regular follow-up" },
  },
] as const

const decisionCards = [
  {
    plan: "Starter",
    title: { fr: "Je peux installer WordPress moi-meme", en: "I can install WordPress myself" },
    body: {
      fr: "Choisissez Starter si vous gerez hebergement, WordPress, WooCommerce, sauvegardes et installation.",
      en: "Choose Starter if you handle hosting, WordPress, WooCommerce, backups and installation.",
    },
  },
  {
    plan: "Pro",
    title: { fr: "J'ai besoin d'aide pour lancer", en: "I need help launching the first store" },
    body: {
      fr: "Choisissez Pro si vous voulez un parcours accompagne pour configurer et valider la premiere boutique.",
      en: "Choose Pro if you want an assisted path to configure and validate the first store.",
    },
  },
  {
    plan: "Managed",
    title: { fr: "Je veux un suivi operationnel", en: "I want ongoing operational help" },
    body: {
      fr: "Choisissez Managed si les mises a jour, validations et retours arriere doivent etre encadres.",
      en: "Choose Managed if updates, validation and rollback boundaries need an operating path.",
    },
  },
] as const

const faqs: Array<{ question: LocalizedText; answer: LocalizedText }> = [
  {
    question: { fr: "Puis-je changer de niche apres achat ?", en: "Can I change niche after purchase?" },
    answer: {
      fr: "La plateforme presente le moteur comme modulaire, mais chaque changement doit rester dans les limites de configuration et de documentation validees.",
      en: "The platform presents the engine as modular, but each change must stay within validated configuration and documentation boundaries.",
    },
  },
  {
    question: { fr: "Puis-je utiliser le template en dropshipping et stock ?", en: "Can I use the template for dropshipping and stock?" },
    answer: {
      fr: "Oui, les modeles dropshipping, stock, hybride et digital sont presentes comme chemins supportes par la structure, sans promettre d'integration fournisseur automatisee.",
      en: "Yes, dropshipping, stock, hybrid and digital are presented as structure-supported paths, without promising automated supplier integrations.",
    },
  },
  {
    question: { fr: "La licence desactive-t-elle ma boutique ?", en: "Does the license disable my store?" },
    answer: {
      fr: "Non. La cle controle les services officiels, telechargements, mises a jour, activations et support. Elle ne doit pas bloquer le storefront ou le checkout public.",
      en: "No. The key controls official services, downloads, updates, activations and support. It must not block the public storefront or checkout.",
    },
  },
  {
    question: { fr: "L'installation est-elle incluse dans Starter ?", en: "Is installation included in Starter?" },
    answer: {
      fr: "Non. Starter est le parcours autonome avec documentation et telechargement officiel. Le client reste responsable de son installation.",
      en: "No. Starter is the self-managed path with documentation and official download access. The customer remains responsible for installation.",
    },
  },
  {
    question: { fr: "Quelle difference entre Pro et Managed ?", en: "What is different between Pro and Managed?" },
    answer: {
      fr: "Pro concerne le lancement accompagne initial. Managed vise un suivi operationnel plus continu autour des validations, mises a jour et retours arriere selon perimetre.",
      en: "Pro covers the initial guided launch. Managed targets more continuous operational follow-up around validation, updates and rollback within scope.",
    },
  },
  {
    question: { fr: "Puis-je commencer avec Starter puis evoluer ?", en: "Can I start with Starter and upgrade later?" },
    answer: {
      fr: "Le parcours doit rester gere cote catalogue et commande approuves. La page indique l'intention commerciale sans simuler une mise a niveau persistante.",
      en: "The path must remain handled by approved catalog and order flows. This page states the commercial intent without simulating a persisted upgrade.",
    },
  },
]

export function PricingPageContent({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <PricingHero locale={locale} t={t} />
      <PlanCards locale={locale} t={t} />
      <LicenseExplanation locale={locale} t={t} />
      <ComparisonSection locale={locale} t={t} />
      <DecisionHelper locale={locale} t={t} />
      <PricingFaq locale={locale} t={t} />
      <FinalPricingCta locale={locale} t={t} />
    </main>
  )
}

function PricingHero({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(20rem,0.45fr)] lg:items-end">
        <div>
          <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">{t.badge}</Badge>
          <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-marketing-muted">{t.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={routes.marketing.offer(locale, "starter")}>{t.startStarter}</Link>
            </Button>
            <Button
              asChild
              className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
              size="lg"
              variant="outline"
            >
              <a href="#plan-comparison">{t.compareAll}</a>
            </Button>
          </div>
        </div>
        <Card className="border-marketing-border bg-marketing-card text-marketing-foreground">
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-marketing-muted">
              {locale === "fr" ? "Source prix" : "Price source"}
            </p>
            <p className="mt-3 text-2xl font-bold text-marketing-foreground">
              {locale === "fr" ? "Catalogue serveur" : "Server catalog"}
            </p>
            <p className="mt-3 text-sm leading-6 text-marketing-muted">
              {locale === "fr"
                ? "Cette interface n'accepte aucun prix depuis le navigateur et n'affiche aucun montant final non approuve."
                : "This interface accepts no browser-supplied price and shows no unapproved final amount."}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function PlanCards({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="pricing-plans">
      <div className="max-w-3xl">
        <h2 id="pricing-plans" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.plansTitle}
        </h2>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {planData.map((plan) => (
          <Card
            className={
              plan.recommended
                ? "border-marketing-accent bg-marketing-card text-marketing-foreground shadow-panel"
                : "border-marketing-border bg-marketing-card text-marketing-foreground"
            }
            key={plan.id}
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-lg bg-marketing-accent-soft text-marketing-accent">
                  <plan.icon aria-hidden="true" className="size-5" />
                </div>
                {plan.recommended ? (
                  <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">{t.recommended}</Badge>
                ) : null}
              </div>
              <div>
                <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">{plan.label[locale]}</Badge>
                <h2 className="mt-4 font-heading text-3xl font-bold text-marketing-foreground">{plan.name[locale]}</h2>
                <p className="mt-3 text-sm leading-6 text-marketing-muted">{plan.audience[locale]}</p>
              </div>
              <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
                <p className="text-sm font-semibold text-marketing-foreground">
                  {plan.price === "custom" ? t.customScope : t.pricePlaceholder}
                </p>
                <p className="mt-1 text-xs leading-5 text-marketing-muted">
                  {locale === "fr" ? "Montant final non publie dans cette interface." : "Final amount is not published in this interface."}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-5 bg-marketing-border" />
              <p className="text-sm font-semibold text-marketing-foreground">{t.included}</p>
              <ul className="mt-4 grid gap-3 text-sm text-marketing-muted">
                {plan.includes[locale].map((item) => (
                  <li className="flex gap-3" key={item}>
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-marketing-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full" variant={plan.id === "managed" ? "outline" : "primary"}>
                <Link
                  className={plan.id === "managed" ? "border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background" : undefined}
                  href={plan.href(locale)}
                >
                  {plan.cta[locale]}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function LicenseExplanation({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Alert className="border-marketing-warning/30 bg-marketing-warning/10 text-marketing-foreground" variant="warning">
        <div className="flex flex-col gap-4 sm:flex-row">
          <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-marketing-warning" />
          <div>
            <h2 className="font-heading text-lg font-bold text-marketing-foreground">{t.licenseTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-marketing-muted">{t.licenseText}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <Link className="text-marketing-accent hover:underline" href={routes.legal.commercialTerms(locale)}>
                {locale === "fr" ? "Conditions commerciales en revue" : "Commercial terms in review"}
              </Link>
              <Link className="text-marketing-accent hover:underline" href={routes.legal.supportPolicy(locale)}>
                {locale === "fr" ? "Politique support" : "Support policy"}
              </Link>
              <Link className="text-marketing-accent hover:underline" href={routes.docs.article(locale, "getting-started")}>
                {locale === "fr" ? "Guide de demarrage" : "Getting-started guide"}
              </Link>
            </div>
          </div>
        </div>
      </Alert>
    </section>
  )
}

function ComparisonSection({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section id="plan-comparison" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="comparison-title">
      <div className="max-w-3xl">
        <h2 id="comparison-title" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.comparisonTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.comparisonLead}</p>
      </div>
      <Card className="mt-8 hidden border-marketing-border bg-marketing-card text-marketing-foreground md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-marketing-border">
                <TableHead className="text-marketing-muted">{locale === "fr" ? "Critere" : "Feature"}</TableHead>
                <TableHead className="text-marketing-muted">Starter</TableHead>
                <TableHead className="text-marketing-muted">Pro</TableHead>
                <TableHead className="text-marketing-muted">Managed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow className="border-marketing-border" key={row.feature.en}>
                  <TableCell className="font-semibold text-marketing-foreground">{row.feature[locale]}</TableCell>
                  <ComparisonCell value={row.starter?.[locale]} />
                  <ComparisonCell value={row.pro?.[locale]} />
                  <ComparisonCell value={row.managed?.[locale]} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-8 grid gap-4 md:hidden">
        {comparisonRows.map((row) => (
          <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={row.feature.en}>
            <CardContent className="p-5">
              <h3 className="font-heading text-base font-bold text-marketing-foreground">{row.feature[locale]}</h3>
              <div className="mt-4 grid gap-3 text-sm text-marketing-muted">
                <MobileComparisonLine label="Starter" value={row.starter?.[locale]} />
                <MobileComparisonLine label="Pro" value={row.pro?.[locale]} />
                <MobileComparisonLine label="Managed" value={row.managed?.[locale]} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ComparisonCell({ value }: { value?: string }) {
  return (
    <TableCell className="text-marketing-muted">
      {value ? (
        <span className="inline-flex items-center gap-2">
          <Check aria-hidden="true" className="size-4 text-marketing-success" />
          {value}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          <Minus aria-hidden="true" className="size-4 text-marketing-muted" />
          <span className="sr-only">Not included</span>
        </span>
      )}
    </TableCell>
  )
}

function MobileComparisonLine({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-marketing-border bg-marketing-card-subtle px-3 py-2">
      <span className="font-semibold text-marketing-foreground">{label}</span>
      <span className="inline-flex items-center gap-2 text-right">
        {value ? <Check aria-hidden="true" className="size-4 text-marketing-success" /> : <Minus aria-hidden="true" className="size-4" />}
        {value ?? "—"}
      </span>
    </div>
  )
}

function DecisionHelper({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="decision-title">
      <div className="max-w-3xl">
        <h2 id="decision-title" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.helperTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-marketing-muted">{t.helperLead}</p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {decisionCards.map((decision) => (
          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={decision.plan}>
            <CardContent className="p-6">
              <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">{decision.plan}</Badge>
              <h3 className="mt-5 font-heading text-xl font-bold text-marketing-foreground">{decision.title[locale]}</h3>
              <p className="mt-3 text-sm leading-6 text-marketing-muted">{decision.body[locale]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function PricingFaq({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="pricing-faq">
      <div className="flex items-center gap-3">
        <HelpCircle aria-hidden="true" className="size-6 text-marketing-accent" />
        <h2 id="pricing-faq" className="font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.faqTitle}
        </h2>
      </div>
      <Card className="mt-8 border-marketing-border bg-marketing-card text-marketing-foreground">
        <CardContent className="p-2 sm:p-4">
          <Accordion collapsible type="single">
            {faqs.map((faq, index) => (
              <AccordionItem className="border-marketing-border px-2 sm:px-4" key={faq.question.en} value={`faq-${index}`}>
                <AccordionTrigger className="text-marketing-foreground hover:text-marketing-accent">
                  {faq.question[locale]}
                </AccordionTrigger>
                <AccordionContent className="text-marketing-muted">{faq.answer[locale]}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}

function FinalPricingCta({ locale, t }: { locale: Locale; t: PricingCopy }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="pricing-final">
      <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 text-center shadow-panel sm:p-10">
        <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
          {locale === "fr" ? "Prochaine decision" : "Next decision"}
        </Badge>
        <h2 id="pricing-final" className="mx-auto mt-5 max-w-4xl text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {t.finalTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-marketing-muted">{t.finalLead}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={routes.marketing.offer(locale, "starter")}>
              {t.startStarter}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background"
            size="lg"
            variant="outline"
          >
            <Link href={routes.marketing.contact(locale)}>
              <LifeBuoy aria-hidden="true" />
              {t.contactManaged}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
