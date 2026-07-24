import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  FileText,
  LifeBuoy,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/config/routes"
import { getCheckoutPreviewData, type CheckoutPlan } from "@/modules/checkout/checkout-preview-query"
import type { Locale } from "@/src/i18n/locales"

type CheckoutState = "checkout" | "success" | "failed"

const copy = {
  fr: {
    badge: "Checkout preview",
    title: "Verifier votre offre avant le paiement connecte.",
    lead:
      "Ce parcours prepare le checkout Template Engine Platform sans simuler un paiement reussi ni inventer un provider.",
    order: "Resume de commande",
    plans: "Choix de l'offre",
    customer: "Informations client",
    terms: "Termes a accepter",
    payment: "Etat paiement",
    paymentNotice:
      "Le provider de paiement n'est pas connecte dans cette interface. Le succes commercial devra venir d'un webhook verifie et idempotent.",
    continue: "Continuer quand le paiement sera connecte",
    disabled: "Paiement non connecte",
    security: "Securite et support",
    securityText:
      "Aucune donnee carte, secret provider, cle de licence ou token n'est collecte par cette preview.",
    successTitle: "Demande recue en mode preview.",
    successLead:
      "Cette page montre les prochaines etapes apres un paiement verifie. Aucun numero de commande reel n'est invente ici.",
    failedTitle: "Le paiement n'a pas ete confirme.",
    failedLead:
      "Vous pouvez reessayer ou contacter le support. Aucun detail provider sensible n'est affiche.",
    account: "Acceder au compte",
    docs: "Lire les docs",
    retry: "Reessayer",
    support: "Contacter le support",
    custom: "Sur devis",
  },
  en: {
    badge: "Checkout preview",
    title: "Review your plan before connected payment.",
    lead:
      "This flow prepares Template Engine Platform checkout without simulating a successful payment or inventing a provider.",
    order: "Order summary",
    plans: "Plan choice",
    customer: "Customer information",
    terms: "Terms to accept",
    payment: "Payment state",
    paymentNotice:
      "No payment provider is connected in this interface. Commercial success must come from a verified, idempotent webhook.",
    continue: "Continue once payment is connected",
    disabled: "Payment not connected",
    security: "Security and support",
    securityText:
      "No card data, provider secret, license key or token is collected by this preview.",
    successTitle: "Request received in preview mode.",
    successLead:
      "This page shows next steps after a verified payment. No real order number is invented here.",
    failedTitle: "Payment was not confirmed.",
    failedLead:
      "You can retry or contact support. No sensitive provider detail is displayed.",
    account: "Open account",
    docs: "Read docs",
    retry: "Retry",
    support: "Contact support",
    custom: "Custom scope",
  },
} as const

export function CheckoutPage({ locale, state = "checkout" }: { locale: Locale; state?: CheckoutState }) {
  if (state === "success") return <CheckoutResult locale={locale} result="success" />
  if (state === "failed") return <CheckoutResult locale={locale} result="failed" />

  const data = getCheckoutPreviewData(locale)
  const selectedPlan = data.plans.find((plan) => plan.id === data.selectedPlanId) ?? data.plans[0]
  const t = copy[locale]

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8 lg:py-16">
        <div className="grid gap-6">
          <div>
            <Badge variant="orange">{t.badge}</Badge>
            <h1 className="mt-4 max-w-4xl font-heading text-3xl font-extrabold tracking-normal text-marketing-foreground sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-marketing-muted">{t.lead}</p>
          </div>

          <Alert variant="warning">{t.paymentNotice}</Alert>

          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle>{t.plans}</CardTitle>
              <CardDescription>{locale === "fr" ? "Selection non persistante tant que le checkout adapter n'est pas connecte." : "Non-persistent selection until the checkout adapter is connected."}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue={data.selectedPlanId} className="grid gap-3 md:grid-cols-3">
                {data.plans.map((plan) => (
                  <PlanOption key={plan.id} locale={locale} plan={plan} />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle>{t.customer}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField htmlFor="checkout-email" label="Email">
                <Input disabled id="checkout-email" placeholder="client@example.com" type="email" />
              </FormField>
              <FormField htmlFor="checkout-name" label={locale === "fr" ? "Nom" : "Name"}>
                <Input disabled id="checkout-name" placeholder={locale === "fr" ? "Nom client" : "Customer name"} />
              </FormField>
            </CardContent>
          </Card>

          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle>{t.terms}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {data.terms.map((term) => (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-marketing-border bg-marketing-card-subtle p-4" key={term.id}>
                  <div>
                    <p className="font-semibold">{term.label}</p>
                    <p className="mt-1 text-sm text-marketing-muted">{term.version}</p>
                  </div>
                  <Badge variant={term.status === "draft_reference" ? "orange" : "secondary"}>{term.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="grid gap-5 self-start lg:sticky lg:top-6">
          <OrderSummary locale={locale} plan={selectedPlan} />
          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle>{t.payment}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning-soft p-4 text-brand-ink">
                <CreditCard aria-hidden="true" className="mt-0.5 size-5 text-warning" />
                <p className="text-sm leading-6">{t.paymentNotice}</p>
              </div>
              <Button disabled type="button">
                <LockKeyhole aria-hidden="true" />
                {t.disabled}
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle>{t.security}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3 text-sm leading-6 text-marketing-muted">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 text-success" />
              <p>{t.securityText}</p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}

function CheckoutResult({ locale, result }: { locale: Locale; result: "success" | "failed" }) {
  const t = copy[locale]
  const data = getCheckoutPreviewData(locale)
  const isSuccess = result === "success"

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <section className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-xl border border-marketing-border bg-marketing-card p-6 shadow-subtle sm:p-8">
          <Badge variant={isSuccess ? "success" : "destructive"}>{isSuccess ? "Preview success" : "Preview failed"}</Badge>
          <h1 className="mt-5 font-heading text-3xl font-extrabold sm:text-5xl">
            {isSuccess ? t.successTitle : t.failedTitle}
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-marketing-muted">
            {isSuccess ? t.successLead : t.failedLead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {isSuccess ? (
              <>
                <Button asChild><Link href={routes.account.dashboard(locale)}><UserRound aria-hidden="true" />{t.account}</Link></Button>
                <Button asChild variant="outline"><Link href={routes.docs.index(locale)}><BookOpen aria-hidden="true" />{t.docs}</Link></Button>
              </>
            ) : (
              <>
                <Button asChild><Link href={routes.checkout.index(locale)}><ArrowRight aria-hidden="true" />{t.retry}</Link></Button>
                <Button asChild variant="outline"><Link href={routes.marketing.contact(locale)}><LifeBuoy aria-hidden="true" />{t.support}</Link></Button>
              </>
            )}
          </div>
        </div>

        {isSuccess ? (
          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle>{locale === "fr" ? "Prochaines etapes selon l'offre" : "Next steps by plan"}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {data.plans.map((plan) => (
                <div className="rounded-lg border border-marketing-border bg-marketing-card-subtle p-4" key={plan.id}>
                  <p className="font-semibold">{plan.name}</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-marketing-muted">
                    {plan.nextSteps.map((step) => <li key={step}>{step}</li>)}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Alert variant="warning">{locale === "fr" ? "Aucune erreur provider brute n'est affichee dans cette interface." : "No raw provider error is displayed in this interface."}</Alert>
        )}
      </section>
    </main>
  )
}

function PlanOption({ locale, plan }: { locale: Locale; plan: CheckoutPlan }) {
  return (
    <label className="flex h-full cursor-pointer gap-3 rounded-xl border border-marketing-border bg-marketing-card-subtle p-4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-orange">
      <RadioGroupItem className="mt-1" value={plan.id} />
      <span className="min-w-0">
        <span className="block font-heading text-lg font-bold">{plan.name}</span>
        <span className="mt-1 block text-sm leading-6 text-marketing-muted">{plan.description}</span>
        <span className="mt-4 block font-semibold text-marketing-foreground">
          {plan.amountMinor ? formatMoney(plan.amountMinor, plan.currency, locale) : copy[locale].custom}
        </span>
      </span>
    </label>
  )
}

function OrderSummary({ locale, plan }: { locale: Locale; plan: CheckoutPlan }) {
  const t = copy[locale]
  return (
    <Card className="bg-marketing-card text-marketing-foreground">
      <CardHeader>
        <CardTitle>{t.order}</CardTitle>
        <CardDescription>{locale === "fr" ? "Montants fixtures, non contractuels tant que le catalogue/checkout n'est pas connecte." : "Fixture amounts, non-contractual until catalog/checkout is connected."}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <span>{plan.name}</span>
          <Badge variant="orange">{plan.mode}</Badge>
        </div>
        <Separator className="bg-marketing-border" />
        <div className="flex items-center justify-between gap-3 font-heading text-xl font-bold">
          <span>Total</span>
          <span>{plan.amountMinor ? formatMoney(plan.amountMinor, plan.currency, locale) : t.custom}</span>
        </div>
        <div className="flex gap-3 rounded-lg border border-marketing-border bg-marketing-card-subtle p-4 text-sm leading-6 text-marketing-muted">
          <FileText aria-hidden="true" className="mt-0.5 size-5 text-brand-orange" />
          <p>{locale === "fr" ? "L'acceptation finale devra capturer les versions legales approuvees au moment du paiement." : "Final acceptance must capture approved legal versions at payment time."}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function formatMoney(amountMinor: number, currency: "EUR", locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    currency,
    style: "currency",
  }).format(amountMinor / 100)
}
