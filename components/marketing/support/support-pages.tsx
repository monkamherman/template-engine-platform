import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CircleDot,
  Compass,
  FileQuestion,
  HelpCircle,
  KeyRound,
  Layers3,
  LifeBuoy,
  Mail,
  MessageSquare,
  PackageCheck,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
  Wrench,
  XCircle,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

type LocalizedText = Record<Locale, string>

type FaqQuestion = {
  question: LocalizedText
  answer: LocalizedText
}

type FaqCategory = {
  id: string
  title: LocalizedText
  description: LocalizedText
  icon: LucideIcon
  questions: FaqQuestion[]
}

const faqCopy = {
  fr: {
    badge: "FAQ",
    title: "Reponses claires avant de choisir votre parcours Template Engine.",
    lead:
      "Comprenez le produit, les offres, la licence, l'installation, le support et les mises a jour sans promesse commerciale inventee.",
    pricing: "Voir les offres",
    docs: "Ouvrir la documentation",
    licenseTitle: "La licence controle les services officiels, pas le rendu public.",
    licenseBody:
      "La cle sert a verifier l'acces aux telechargements officiels, mises a jour, activations et support. Une indisponibilite du service de licence ne doit pas desactiver l'affichage public de votre boutique ou son checkout WooCommerce.",
    ctaTitle: "Encore une question avant de choisir ?",
    ctaLead: "Comparez Starter, Pro et Managed, ou ouvrez le mode d'emploi pour verifier le parcours technique.",
  },
  en: {
    badge: "FAQ",
    title: "Clear answers before choosing your Template Engine path.",
    lead:
      "Understand the product, plans, license, installation, support and updates without invented commercial promises.",
    pricing: "View pricing",
    docs: "Open documentation",
    licenseTitle: "The license controls official services, not public rendering.",
    licenseBody:
      "The key verifies access to official downloads, updates, activations and support. License-service downtime must not disable your public storefront or WooCommerce checkout.",
    ctaTitle: "Still checking the right path?",
    ctaLead: "Compare Starter, Pro and Managed, or open the user guide to validate the technical route.",
  },
} satisfies Record<Locale, Record<string, string>>

const faqCategories = [
  {
    id: "product",
    title: { fr: "Produit", en: "Product" },
    description: {
      fr: "Ce que vend la plateforme et comment le moteur reste modulaire.",
      en: "What the platform sells and how the engine stays modular.",
    },
    icon: Store,
    questions: [
      {
        question: { fr: "Qu'est-ce que Template Engine Platform ?", en: "What is Template Engine Platform?" },
        answer: {
          fr: "C'est la plateforme commerciale qui presente, vend, documente, livre et supporte l'acces officiel a un WooCommerce Template Engine modulaire. Le code source du theme reste dans un depot prive separe.",
          en: "It is the commercial platform that presents, sells, documents, delivers and supports official access to a modular WooCommerce Template Engine. The theme source code remains in a separate private repository.",
        },
      },
      {
        question: {
          fr: "Le template fonctionne-t-il avec le dropshipping, le stock et les modeles hybrides ?",
          en: "Does the template work with dropshipping, stock and hybrid models?",
        },
        answer: {
          fr: "La structure est pensee pour presenter des boutiques dropshipping, stock, hybrides et digitales. Les integrations fournisseur, paiements et textes legaux doivent toutefois etre valides pour chaque marche.",
          en: "The structure is designed to present dropshipping, stock, hybrid and digital stores. Supplier integrations, payments and legal text still need validation for each market.",
        },
      },
    ],
  },
  {
    id: "plans",
    title: { fr: "Offres", en: "Plans" },
    description: {
      fr: "Responsabilites Starter, Pro et Managed.",
      en: "Starter, Pro and Managed responsibilities.",
    },
    icon: PackageCheck,
    questions: [
      {
        question: { fr: "Quelle difference entre Starter, Pro et Managed ?", en: "What is the difference between Starter, Pro and Managed?" },
        answer: {
          fr: "Starter donne acces au package officiel, a la documentation et au parcours autonome. Pro ajoute un accompagnement de lancement. Managed prepare un suivi operationnel autour des validations, mises a jour et retours arriere selon perimetre approuve.",
          en: "Starter gives access to the official package, documentation and self-install path. Pro adds guided launch support. Managed prepares operational follow-up around validation, updates and rollback within approved scope.",
        },
      },
      {
        question: { fr: "Quand dois-je choisir Pro ou Managed ?", en: "When should I choose Pro or Managed?" },
        answer: {
          fr: "Choisissez Pro si vous voulez etre accompagne pour le premier lancement. Choisissez Managed si les validations, mises a jour et operations regulieres doivent etre structurees avec vous.",
          en: "Choose Pro if you want help with the first launch. Choose Managed if validation, updates and recurring operations need to be structured with you.",
        },
      },
    ],
  },
  {
    id: "license",
    title: { fr: "Licence", en: "License" },
    description: {
      fr: "Frontiere entre droits logiciels et services officiels.",
      en: "Boundary between software rights and official services.",
    },
    icon: KeyRound,
    questions: [
      {
        question: { fr: "La licence peut-elle desactiver ma boutique ?", en: "Can the license disable my store?" },
        answer: {
          fr: "Non. La cle controle les services officiels comme les telechargements, mises a jour, activations et support. Elle ne doit pas bloquer le rendu public de la boutique, le panier ou le checkout.",
          en: "No. The key controls official services such as downloads, updates, activations and support. It must not block public store rendering, cart or checkout.",
        },
      },
    ],
  },
  {
    id: "installation",
    title: { fr: "Installation", en: "Installation" },
    description: {
      fr: "Ce qui reste autonome et ce qui peut etre accompagne.",
      en: "What remains self-managed and what can be guided.",
    },
    icon: Wrench,
    questions: [
      {
        question: { fr: "Starter inclut-il l'installation ?", en: "Does Starter include installation?" },
        answer: {
          fr: "Non. Starter est le parcours autonome: vous gerez hebergement, WordPress, WooCommerce, sauvegardes et installation. L'accompagnement de lancement appartient au parcours Pro.",
          en: "No. Starter is the self-managed path: you handle hosting, WordPress, WooCommerce, backups and installation. Guided launch help belongs to the Pro path.",
        },
      },
      {
        question: { fr: "Puis-je changer de niche, langue ou marche ?", en: "Can I change niche, language or market?" },
        answer: {
          fr: "Oui, la logique modulaire aide a adapter le positionnement. Chaque changement doit rester compatible avec votre contenu final, votre logistique, votre paiement et les obligations du marche vise.",
          en: "Yes, the modular logic helps adapt positioning. Each change must still fit your final content, logistics, payments and target-market obligations.",
        },
      },
    ],
  },
  {
    id: "support",
    title: { fr: "Support", en: "Support" },
    description: {
      fr: "Canaux selon le type de demande.",
      en: "Channels by request type.",
    },
    icon: LifeBuoy,
    questions: [
      {
        question: { fr: "Quel canal utiliser pour une question commerciale ?", en: "Which channel should I use for a sales question?" },
        answer: {
          fr: "Utilisez Contact pour decrire votre modele, votre marche et le niveau d'aide souhaite. Ne partagez jamais de mot de passe, cle complete ou secret dans un message.",
          en: "Use Contact to describe your model, market and desired support level. Never share a password, full key or secret in a message.",
        },
      },
    ],
  },
  {
    id: "updates",
    title: { fr: "Mises a jour", en: "Updates" },
    description: {
      fr: "Acces officiel et validation prudente.",
      en: "Official access and careful validation.",
    },
    icon: RotateCcw,
    questions: [
      {
        question: { fr: "Comment fonctionnent les mises a jour officielles ?", en: "How do official updates work?" },
        answer: {
          fr: "Les mises a jour passent par l'acces officiel, les notes de version et la documentation. Les procedures finales dependent de la version publiee, des tests de compatibilite et du perimetre de support choisi.",
          en: "Updates go through official access, release notes and documentation. Final procedures depend on the published version, compatibility testing and selected support scope.",
        },
      },
    ],
  },
] satisfies readonly FaqCategory[]

const contactCopy = {
  fr: {
    badge: "Contact",
    title: "Orientez votre demande vers le bon parcours.",
    lead:
      "Decrivez votre projet sans partager de secrets. Le formulaire est actuellement une preview non persistante tant que le backend contact n'est pas connecte.",
    formTitle: "Demande de contact",
    formLead: "Preview disabled: aucun message n'est envoye ou stocke depuis cette interface.",
    name: "Nom",
    email: "Email",
    subject: "Sujet",
    projectType: "Type de projet",
    message: "Message",
    submit: "Envoi indisponible en preview",
    warning:
      "Ne partagez pas de cle de licence complete, mot de passe, secret fournisseur, identifiant de paiement ou URL signee dans votre message.",
    quickLinks: "Liens utiles",
    pricing: "Comparer les offres",
    faq: "Lire la FAQ",
    docs: "Ouvrir la documentation",
  },
  en: {
    badge: "Contact",
    title: "Route your request to the right path.",
    lead:
      "Describe your project without sharing secrets. The form is currently a non-persistent preview until a contact backend is connected.",
    formTitle: "Contact request",
    formLead: "Preview disabled: no message is sent or stored from this interface.",
    name: "Name",
    email: "Email",
    subject: "Subject",
    projectType: "Project type",
    message: "Message",
    submit: "Sending unavailable in preview",
    warning:
      "Do not share a complete license key, password, supplier secret, payment identifier or signed URL in your message.",
    quickLinks: "Useful links",
    pricing: "Compare plans",
    faq: "Read FAQ",
    docs: "Open documentation",
  },
} satisfies Record<Locale, Record<string, string>>

const contactCards = [
  {
    title: { fr: "Question commerciale", en: "Sales question" },
    body: {
      fr: "Clarifier Starter, Pro, Managed, le modele de boutique et le niveau d'autonomie attendu.",
      en: "Clarify Starter, Pro, Managed, the store model and expected autonomy level.",
    },
    icon: MessageSquare,
    badge: { fr: "Avant achat", en: "Before purchase" },
  },
  {
    title: { fr: "Support client", en: "Customer support" },
    body: {
      fr: "Pour les clients connectes, privilegier le portail compte afin de garder le contexte des commandes et droits.",
      en: "For signed-in customers, prefer the account portal so order and entitlement context stays attached.",
    },
    icon: LifeBuoy,
    badge: { fr: "Compte client", en: "Customer account" },
  },
  {
    title: { fr: "Accompagnement Pro/Managed", en: "Pro/Managed guidance" },
    body: {
      fr: "Decrire votre marche, langue, niche, contraintes stock/fournisseur et besoin de validation.",
      en: "Describe your market, language, niche, stock/supplier constraints and validation needs.",
    },
    icon: Sparkles,
    badge: { fr: "Lancement", en: "Launch" },
  },
] as const

const aboutCopy = {
  fr: {
    badge: "About",
    title: "Transformer un theme WooCommerce modulaire en systeme commercial reutilisable.",
    lead:
      "Template Engine Platform existe pour vendre, documenter, livrer et supporter le Template Engine sans exposer son depot prive ni promettre des resultats non valides.",
    visionTitle: "Vision",
    vision:
      "Faire du moteur WooCommerce une fondation repetable pour lancer plusieurs configurations de boutique: niche, marche, langue et modele operationnel peuvent changer sans repartir d'une page blanche.",
    problemTitle: "Le probleme",
    problem:
      "Reconstruire chaque boutique depuis zero fait perdre du temps, disperse la documentation et rend les responsabilites entre logiciel, licence, support et operations difficiles a comprendre.",
    solutionTitle: "La solution",
    solution:
      "Une plateforme commerciale unique organise la presentation produit, les offres, la documentation, l'authentification, les droits, les licences, les versions et le support autour du meme moteur modulaire.",
    philosophyTitle: "Philosophie",
    philosophy:
      "Systeme d'abord, promesses prudentes, documentation claire et support structure. Les pages publiques expliquent les limites autant que les possibilites.",
    buildingTitle: "What we are building",
    notPromiseTitle: "What we do not promise",
    demos: "Explorer les demos",
    pricing: "Comparer les offres",
    docs: "Lire la documentation",
  },
  en: {
    badge: "About",
    title: "Turning a modular WooCommerce theme into a reusable commercial system.",
    lead:
      "Template Engine Platform exists to sell, document, deliver and support the Template Engine without exposing its private repository or promising unvalidated outcomes.",
    visionTitle: "Vision",
    vision:
      "Make the WooCommerce engine a repeatable foundation for several store configurations: niche, market, language and operating model can change without starting from a blank page.",
    problemTitle: "The problem",
    problem:
      "Rebuilding every store from zero wastes time, scatters documentation and makes responsibilities between software, license, support and operations hard to understand.",
    solutionTitle: "The solution",
    solution:
      "One commercial platform organizes product presentation, plans, documentation, authentication, entitlements, licenses, releases and support around the same modular engine.",
    philosophyTitle: "Philosophy",
    philosophy:
      "System first, careful promises, clear documentation and structured support. Public pages explain limits as clearly as possibilities.",
    buildingTitle: "What we are building",
    notPromiseTitle: "What we do not promise",
    demos: "Explore demos",
    pricing: "Compare plans",
    docs: "Read documentation",
  },
} satisfies Record<Locale, Record<string, string>>

const buildingItems = [
  {
    title: { fr: "Plateforme commerciale", en: "Commercial platform" },
    body: {
      fr: "Un espace pour presenter les offres, guider l'achat, gerer comptes, droits et operations.",
      en: "A place to present plans, guide purchase, manage accounts, access rights and operations.",
    },
    icon: Store,
  },
  {
    title: { fr: "Moteur adaptable", en: "Adaptable engine" },
    body: {
      fr: "Une fondation WooCommerce qui peut s'adapter au dropshipping, stock, hybride et digital.",
      en: "A WooCommerce foundation that can adapt to dropshipping, stock, hybrid and digital paths.",
    },
    icon: Layers3,
  },
  {
    title: { fr: "Documentation exploitable", en: "Usable documentation" },
    body: {
      fr: "Des guides versionnes pour installer, activer, configurer et maintenir avec prudence.",
      en: "Versioned guides to install, activate, configure and maintain with care.",
    },
    icon: BookOpen,
  },
] as const

const promiseBoundaries = [
  {
    title: { fr: "Pas de ventes garanties", en: "No guaranteed sales" },
    body: {
      fr: "Le moteur aide a construire une boutique; il ne garantit pas demande, trafic, marge ou conversion.",
      en: "The engine helps build a store; it does not guarantee demand, traffic, margin or conversion.",
    },
  },
  {
    title: { fr: "Pas d'automatisation magique", en: "No magic automation" },
    body: {
      fr: "Les fournisseurs, paiements, taxes, contenus et operations restent a configurer et verifier.",
      en: "Suppliers, payments, taxes, content and operations still need configuration and verification.",
    },
  },
  {
    title: { fr: "Pas de claims legaux non valides", en: "No unvalidated legal claims" },
    body: {
      fr: "Les textes juridiques et conditions commerciales doivent rester en revue jusqu'a approbation qualifiee.",
      en: "Legal text and commercial terms must remain under review until qualified approval.",
    },
  },
] as const

export function FaqPageContent({ locale }: { locale: Locale }) {
  const t = faqCopy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <MarketingHero
        badge={t.badge}
        lead={t.lead}
        primaryHref={routes.marketing.pricing(locale)}
        primaryLabel={t.pricing}
        secondaryHref={routes.docs.index(locale)}
        secondaryLabel={t.docs}
        title={t.title}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {faqCategories.map((category) => (
            <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={category.id}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <IconFrame icon={category.icon} />
                  <div>
                    <h2 className="font-heading text-xl font-bold text-marketing-foreground">{category.title[locale]}</h2>
                    <p className="mt-2 text-sm leading-6 text-marketing-muted">{category.description[locale]}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion collapsible type="single">
                  {category.questions.map((item, index) => (
                    <AccordionItem className="border-marketing-border" key={item.question.en} value={`${category.id}-${index}`}>
                      <AccordionTrigger className="text-left text-marketing-foreground hover:text-marketing-accent">
                        {item.question[locale]}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-6 text-marketing-muted">
                        {item.answer[locale]}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Alert className="border-marketing-warning/30 bg-marketing-warning/10 text-marketing-foreground" variant="warning">
          <div className="flex flex-col gap-4 sm:flex-row">
            <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-marketing-warning" />
            <div>
              <h2 className="font-heading text-lg font-bold text-marketing-foreground">{t.licenseTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-marketing-muted">{t.licenseBody}</p>
            </div>
          </div>
        </Alert>
      </section>

      <FinalCta
        locale={locale}
        lead={t.ctaLead}
        primaryHref={routes.marketing.pricing(locale)}
        primaryLabel={t.pricing}
        secondaryHref={routes.docs.index(locale)}
        secondaryLabel={t.docs}
        title={t.ctaTitle}
      />
    </main>
  )
}

export function ContactPageContent({ locale }: { locale: Locale }) {
  const t = contactCopy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <MarketingHero
        badge={t.badge}
        lead={t.lead}
        primaryHref={routes.marketing.pricing(locale)}
        primaryLabel={t.pricing}
        secondaryHref={routes.marketing.faq(locale)}
        secondaryLabel={t.faq}
        title={t.title}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {contactCards.map((card) => (
            <Card className="border-marketing-border bg-marketing-card text-marketing-foreground" key={card.title.en}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <IconFrame icon={card.icon} />
                  <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">
                    {card.badge[locale]}
                  </Badge>
                </div>
                <h2 className="mt-5 font-heading text-xl font-bold text-marketing-foreground">{card.title[locale]}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-marketing-muted">{card.body[locale]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(18rem,0.35fr)] lg:px-8">
        <Card className="border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
          <CardHeader>
            <Badge className="w-fit border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
              Preview
            </Badge>
            <h2 className="font-heading text-2xl font-bold text-marketing-foreground">{t.formTitle}</h2>
            <p className="text-sm leading-6 text-marketing-muted">{t.formLead}</p>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" aria-describedby="contact-preview-state">
              <div className="grid gap-5 md:grid-cols-2">
                <DisabledField id="contact-name" label={t.name} placeholder={locale === "fr" ? "Votre nom" : "Your name"} />
                <DisabledField id="contact-email" label={t.email} placeholder="name@example.com" type="email" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <DisabledField id="contact-subject" label={t.subject} placeholder={locale === "fr" ? "Objet de la demande" : "Request subject"} />
                <DisabledField id="contact-project-type" label={t.projectType} placeholder="Starter / Pro / Managed" />
              </div>
              <div className="grid gap-2">
                <Label className="text-marketing-foreground" htmlFor="contact-message">
                  {t.message}
                </Label>
                <Textarea
                  disabled
                  id="contact-message"
                  placeholder={locale === "fr" ? "Contexte, marche, langue, modele de boutique..." : "Context, market, language, store model..."}
                  className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground placeholder:text-marketing-muted"
                />
              </div>
              <Button disabled type="button" className="w-full sm:w-fit">
                <Mail aria-hidden="true" />
                {t.submit}
              </Button>
              <p id="contact-preview-state" className="text-xs leading-5 text-marketing-muted">
                {t.formLead}
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Alert className="border-marketing-warning/30 bg-marketing-warning/10 text-marketing-foreground" variant="warning">
            <div className="flex gap-3">
              <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-warning" />
              <p className="text-sm leading-6 text-marketing-muted">{t.warning}</p>
            </div>
          </Alert>

          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground">
            <CardHeader>
              <h2 className="font-heading text-xl font-bold text-marketing-foreground">{t.quickLinks}</h2>
            </CardHeader>
            <CardContent className="grid gap-3">
              <SupportLink href={routes.marketing.faq(locale)} icon={HelpCircle} label={t.faq} />
              <SupportLink href={routes.marketing.pricing(locale)} icon={PackageCheck} label={t.pricing} />
              <SupportLink href={routes.docs.index(locale)} icon={BookOpen} label={t.docs} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export function AboutPageContent({ locale }: { locale: Locale }) {
  const t = aboutCopy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <MarketingHero
        badge={t.badge}
        lead={t.lead}
        primaryHref={routes.marketing.demos(locale)}
        primaryLabel={t.demos}
        secondaryHref={routes.marketing.pricing(locale)}
        secondaryLabel={t.pricing}
        title={t.title}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          <PrincipleCard body={t.vision} icon={Compass} title={t.visionTitle} />
          <PrincipleCard body={t.problem} icon={XCircle} title={t.problemTitle} />
          <PrincipleCard body={t.solution} icon={CheckCircle2} title={t.solutionTitle} />
          <PrincipleCard body={t.philosophy} icon={CircleDot} title={t.philosophyTitle} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card className="border-marketing-border bg-marketing-card text-marketing-foreground">
          <CardHeader>
            <Badge className="w-fit border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">
              <Layers3 aria-hidden="true" className="mr-2 size-3.5" />
              {t.buildingTitle}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4">
            {buildingItems.map((item) => (
              <InfoRow body={item.body[locale]} icon={item.icon} key={item.title.en} title={item.title[locale]} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground">
          <CardHeader>
            <Badge className="w-fit border-marketing-warning/30 bg-marketing-warning/10 text-marketing-warning">
              <ShieldAlert aria-hidden="true" className="mr-2 size-3.5" />
              {t.notPromiseTitle}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4">
            {promiseBoundaries.map((item) => (
              <div className="rounded-lg border border-marketing-border bg-marketing-card p-4" key={item.title.en}>
                <h3 className="font-heading text-base font-bold text-marketing-foreground">{item.title[locale]}</h3>
                <p className="mt-2 text-sm leading-6 text-marketing-muted">{item.body[locale]}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <FinalCta
        locale={locale}
        lead={t.lead}
        primaryHref={routes.marketing.demos(locale)}
        primaryLabel={t.demos}
        secondaryHref={routes.docs.index(locale)}
        secondaryLabel={t.docs}
        title={locale === "fr" ? "Comprendre le moteur par des scenarios concrets." : "Understand the engine through concrete scenarios."}
      />
    </main>
  )
}

function MarketingHero({
  badge,
  lead,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: {
  badge: string
  lead: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  title: string
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,0.75fr)_minmax(20rem,0.35fr)] lg:items-end lg:px-8">
      <div>
        <Badge className="border-marketing-accent-soft bg-marketing-accent-soft text-marketing-accent">{badge}</Badge>
        <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-extrabold leading-tight text-marketing-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-marketing-muted">{lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            className="border-marketing-border bg-marketing-card text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-card-subtle"
            size="lg"
            variant="outline"
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
      <Card className="border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
        <CardContent className="p-5">
          <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
            <div className="flex items-center justify-between">
              <FileQuestion aria-hidden="true" className="size-6 text-marketing-accent" />
              <Badge className="border-marketing-border bg-marketing-card text-marketing-muted">
                WooCommerce
              </Badge>
            </div>
            <Separator className="my-4 bg-marketing-border" />
            <div className="grid gap-3" aria-hidden="true">
              <div className="h-3 w-4/5 rounded-full bg-marketing-foreground/80" />
              <div className="h-3 w-2/3 rounded-full bg-marketing-muted/40" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-16 rounded-lg border border-marketing-border bg-marketing-card" />
                <div className="h-16 rounded-lg border border-marketing-border bg-marketing-card" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function FinalCta({
  lead,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: {
  locale: Locale
  lead: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  title: string
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-24 lg:px-8">
      <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 text-center shadow-panel sm:p-10">
        <h2 className="mx-auto max-w-3xl text-balance font-heading text-3xl font-bold text-marketing-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-marketing-muted">{lead}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button
            asChild
            className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground hover:border-marketing-accent hover:bg-marketing-background"
            size="lg"
            variant="outline"
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function DisabledField({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-marketing-foreground" htmlFor={id}>
        {label}
      </Label>
      <Input
        disabled
        id={id}
        placeholder={placeholder}
        type={type}
        className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground placeholder:text-marketing-muted"
      />
    </div>
  )
}

function IconFrame({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-marketing-border bg-marketing-card-subtle text-marketing-accent">
      <Icon aria-hidden="true" className="size-5" />
    </div>
  )
}

function PrincipleCard({ body, icon, title }: { body: string; icon: LucideIcon; title: string }) {
  return (
    <Card className="border-marketing-border bg-marketing-card text-marketing-foreground">
      <CardHeader>
        <IconFrame icon={icon} />
        <h2 className="mt-4 font-heading text-xl font-bold text-marketing-foreground">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-marketing-muted">{body}</p>
      </CardContent>
    </Card>
  )
}

function InfoRow({ body, icon: Icon, title }: { body: string; icon: LucideIcon; title: string }) {
  return (
    <div className="flex gap-4 rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
      <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-marketing-accent" />
      <div>
        <h3 className="font-heading text-base font-bold text-marketing-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-marketing-muted">{body}</p>
      </div>
    </div>
  )
}

function SupportLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return (
    <Link
      className="flex items-center justify-between gap-4 rounded-lg border border-marketing-border bg-marketing-card px-4 py-3 text-sm font-semibold text-marketing-foreground hover:border-marketing-accent"
      href={href}
    >
      <span className="inline-flex items-center gap-3">
        <Icon aria-hidden="true" className="size-4 text-marketing-accent" />
        {label}
      </span>
      <ArrowRight aria-hidden="true" className="size-4 text-marketing-muted" />
    </Link>
  )
}
