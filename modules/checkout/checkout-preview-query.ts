import type { Locale } from "@/src/i18n/locales"

export type CheckoutPlan = {
  id: "starter" | "pro" | "managed"
  name: "Starter" | "Pro" | "Managed"
  mode: "software" | "assisted" | "managed"
  amountMinor?: number
  currency: "EUR"
  description: string
  nextSteps: string[]
}

export type CheckoutPreviewData = {
  plans: CheckoutPlan[]
  selectedPlanId: CheckoutPlan["id"]
  terms: Array<{
    id: string
    label: string
    version: string
    status: "draft_reference" | "review_required"
  }>
}

const localized = {
  fr: {
    starterDescription: "Acces commercial au package officiel, documentation et services de licence.",
    proDescription: "Starter avec parcours onboarding pour lancer une premiere boutique avec assistance.",
    managedDescription: "Parcours operationnel sur mesure, a cadrer avant engagement commercial.",
    download: "Acceder au compte pour telecharger si le paiement est verifie.",
    docs: "Lire les guides d'installation et d'activation.",
    onboarding: "Completer le questionnaire onboarding apres verification.",
    contact: "Cadrer le perimetre Managed avec l'equipe.",
    terms: "Conditions commerciales",
    license: "Licence logicielle",
    support: "Politique de support",
  },
  en: {
    starterDescription: "Commercial access to the official package, documentation and license services.",
    proDescription: "Starter with an onboarding path to launch a first store with assistance.",
    managedDescription: "Custom operational path to scope before commercial commitment.",
    download: "Open the account to download once payment is verified.",
    docs: "Read installation and activation documentation.",
    onboarding: "Complete the onboarding questionnaire after verification.",
    contact: "Scope the Managed engagement with the team.",
    terms: "Commercial terms",
    license: "Software license",
    support: "Support policy",
  },
} as const

export function getCheckoutPreviewData(locale: Locale): CheckoutPreviewData {
  const t = localized[locale]

  return {
    selectedPlanId: "starter",
    plans: [
      {
        id: "starter",
        name: "Starter",
        mode: "software",
        amountMinor: 49000,
        currency: "EUR",
        description: t.starterDescription,
        nextSteps: [t.download, t.docs],
      },
      {
        id: "pro",
        name: "Pro",
        mode: "assisted",
        amountMinor: 129000,
        currency: "EUR",
        description: t.proDescription,
        nextSteps: [t.onboarding, t.docs],
      },
      {
        id: "managed",
        name: "Managed",
        mode: "managed",
        currency: "EUR",
        description: t.managedDescription,
        nextSteps: [t.contact, t.docs],
      },
    ],
    terms: [
      { id: "commercial_terms", label: t.terms, version: "draft-v1", status: "draft_reference" },
      { id: "software_license", label: t.license, version: "draft-v1", status: "draft_reference" },
      { id: "support_policy", label: t.support, version: "draft-v1", status: "review_required" },
    ],
  }
}
