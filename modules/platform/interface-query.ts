import { interfaceRegistry, type InterfaceAudience, type InterfaceEntry } from "@/config/interface-registry"
import { joinLocalizedRoute } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

export type InterfaceState = {
  label: string
  description: string
}

export type InterfacePreview = {
  entry: InterfaceEntry
  locale: Locale
  path: string
  summary: string
  primarySections: string[]
  states: {
    loading: InterfaceState
    empty: InterfaceState
    error: InterfaceState
    forbidden?: InterfaceState
  }
  records: Array<{
    id: string
    label: string
    status: "paid" | "pending" | "failed" | "active" | "suspended" | "revoked" | "draft" | "published"
    detail: string
  }>
}

const audienceSections: Record<InterfaceAudience, string[]> = {
  public: ["Positionnement", "Structure de contenu", "Action suivante"],
  auth: ["Formulaire preview", "Etat fournisseur", "Liens de securite"],
  account: ["Resume client", "Liste representative", "Etats d'acces"],
  admin: ["Recherche et filtres", "Table operationnelle", "Actions preview auditees"],
  api: ["Contrat de route", "Validation", "Reponse non configuree"],
  system: ["Registre", "Maturite", "Suivi de personnalisation"],
}

const recordsByAudience: Record<InterfaceAudience, InterfacePreview["records"]> = {
  public: [
    { id: "offer_starter", label: "Starter", status: "active", detail: "Licence et telechargement protege." },
    { id: "offer_pro", label: "Pro", status: "pending", detail: "Installation accompagnee en preview." },
    { id: "offer_managed", label: "Managed", status: "draft", detail: "Support operationnel non connecte." },
  ],
  auth: [
    { id: "auth_provider", label: "Auth provider", status: "draft", detail: "Aucune persistance simulee." },
    { id: "security_notice", label: "Security boundary", status: "active", detail: "Formulaire desactive en production." },
  ],
  account: [
    { id: "ord_paid", label: "Commande TEP-1001", status: "paid", detail: "Droits actifs via fixture repository." },
    { id: "lic_suspended", label: "Licence LIC-PREVIEW", status: "suspended", detail: "Activation limitee representee." },
    { id: "rel_disabled", label: "Version 1.1.0", status: "draft", detail: "Telechargement non connecte." },
  ],
  admin: [
    { id: "pay_failed", label: "Paiement echoue", status: "failed", detail: "Reference fournisseur sanitisee." },
    { id: "ent_active", label: "Entitlement actif", status: "active", detail: "Action destructive desactivee." },
    { id: "release_published", label: "Release publiee", status: "published", detail: "Audit contextuel visible." },
  ],
  api: [
    { id: "contract", label: "Route contract", status: "draft", detail: "Integration fournisseur non configuree." },
  ],
  system: [
    { id: "registry", label: "Interface registry", status: "active", detail: "Genere depuis config/interface-registry.ts." },
  ],
}

export function getInterfacePreviewByPath(locale: Locale, segments: string[] = []): InterfacePreview {
  const path = joinLocalizedRoute(locale, segments)
  const entry =
    interfaceRegistry.find((item) => item.buildPath?.(locale) === path) ??
    inferDynamicEntry(path, locale) ??
    interfaceRegistry[0]

  return makePreview(entry, locale, path)
}

export function getInterfacePreviewById(locale: Locale, id: string): InterfacePreview {
  const entry = interfaceRegistry.find((item) => item.id === id) ?? interfaceRegistry[0]
  const path = entry.buildPath?.(locale) ?? `/${locale}`

  return makePreview(entry, locale, path)
}

export function listInterfaces() {
  return interfaceRegistry
}

function makePreview(entry: InterfaceEntry, locale: Locale, path: string): InterfacePreview {
  const isFrench = locale === "fr"

  return {
    entry,
    locale,
    path,
    summary: isFrench
      ? "Interface generee pour le squelette V1. Les donnees sont representatives et la fonctionnalite connectee reste explicite."
      : "Generated V1 skeleton interface. Data is representative and connected functionality remains explicit.",
    primarySections: audienceSections[entry.audience],
    states: {
      loading: {
        label: isFrench ? "Chargement contextualise" : "Contextual loading",
        description: isFrench
          ? "Chaque interface prevoit un squelette specifique a son contenu."
          : "Each interface plans a skeleton specific to its content.",
      },
      empty: {
        label: isFrench ? "Etat vide" : "Empty state",
        description: isFrench
          ? "La page explique quoi faire lorsqu'aucune donnee n'existe."
          : "The page explains what to do when no data exists.",
      },
      error: {
        label: isFrench ? "Erreur recuperable" : "Recoverable error",
        description: isFrench
          ? "Les erreurs restent sans details techniques ou secrets."
          : "Errors avoid technical details and secrets.",
      },
      forbidden:
        entry.audience === "account" || entry.audience === "admin"
          ? {
              label: isFrench ? "Acces interdit" : "Forbidden",
              description: isFrench
                ? "La frontiere d'autorisation est appliquee cote serveur ou via garde developpement isole."
                : "Authorization boundary is server-side or isolated to development guard.",
            }
          : undefined,
    },
    records: recordsByAudience[entry.audience],
  }
}

function inferDynamicEntry(path: string, locale: Locale) {
  return interfaceRegistry.find((entry) => {
    if (!entry.routePattern.includes("{")) return false
    const pattern = entry.routePattern.replace("/{locale}", `/${locale}`).replace(/\{[^}]+\}/g, "[^/]+")
    return new RegExp(`^${pattern}$`).test(path)
  })
}
