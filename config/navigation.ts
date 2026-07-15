import { routes, type RouteBuilder } from "@/config/routes"

export type NavigationItem = {
  id: string
  label: {
    fr: string
    en: string
  }
  href: RouteBuilder
  access: "public" | "customer" | "admin" | "development"
}

export const publicNavigation: NavigationItem[] = [
  { id: "product", label: { fr: "Produit", en: "Product" }, href: routes.marketing.product, access: "public" },
  { id: "features", label: { fr: "Fonctions", en: "Features" }, href: routes.marketing.features, access: "public" },
  { id: "demos", label: { fr: "Demos", en: "Demos" }, href: routes.marketing.demos, access: "public" },
  { id: "docs", label: { fr: "Docs", en: "Docs" }, href: routes.docs.index, access: "public" },
  { id: "pricing", label: { fr: "Offres", en: "Plans" }, href: routes.marketing.pricing, access: "public" },
  { id: "faq", label: { fr: "FAQ", en: "FAQ" }, href: routes.marketing.faq, access: "public" },
]

export const legalNavigation: NavigationItem[] = [
  { id: "software-license", label: { fr: "Licence logicielle", en: "Software license" }, href: routes.legal.softwareLicense, access: "public" },
  { id: "commercial-terms", label: { fr: "Conditions", en: "Terms" }, href: routes.legal.commercialTerms, access: "public" },
  { id: "support-policy", label: { fr: "Support", en: "Support" }, href: routes.legal.supportPolicy, access: "public" },
  { id: "refunds", label: { fr: "Remboursements", en: "Refunds" }, href: routes.legal.refunds, access: "public" },
  { id: "privacy", label: { fr: "Confidentialite", en: "Privacy" }, href: routes.legal.privacy, access: "public" },
  { id: "trademark", label: { fr: "Marques", en: "Trademarks" }, href: routes.legal.trademark, access: "public" },
]

export const documentationNavigation: NavigationItem[] = [
  { id: "getting-started", label: { fr: "Demarrage", en: "Getting started" }, href: (locale) => routes.docs.article(locale, "getting-started"), access: "public" },
  { id: "requirements", label: { fr: "Pre-requis", en: "Requirements" }, href: (locale) => routes.docs.article(locale, "requirements"), access: "public" },
  { id: "installation", label: { fr: "Installation", en: "Installation" }, href: (locale) => routes.docs.article(locale, "installation"), access: "public" },
  { id: "activation", label: { fr: "Activation", en: "Activation" }, href: (locale) => routes.docs.article(locale, "activation"), access: "public" },
  { id: "updates", label: { fr: "Mises a jour", en: "Updates" }, href: (locale) => routes.docs.article(locale, "updates"), access: "public" },
  { id: "troubleshooting", label: { fr: "Depannage", en: "Troubleshooting" }, href: (locale) => routes.docs.article(locale, "troubleshooting"), access: "public" },
]

export const accountNavigation: NavigationItem[] = [
  { id: "dashboard", label: { fr: "Tableau de bord", en: "Dashboard" }, href: routes.account.dashboard, access: "customer" },
  { id: "orders", label: { fr: "Commandes", en: "Orders" }, href: routes.account.orders, access: "customer" },
  { id: "entitlements", label: { fr: "Acces", en: "Entitlements" }, href: routes.account.entitlements, access: "customer" },
  { id: "licenses", label: { fr: "Licences", en: "Licenses" }, href: routes.account.licenses, access: "customer" },
  { id: "downloads", label: { fr: "Telechargements", en: "Downloads" }, href: routes.account.downloads, access: "customer" },
  { id: "support", label: { fr: "Support", en: "Support" }, href: routes.account.support, access: "customer" },
]

export const adminNavigation: NavigationItem[] = [
  { id: "dashboard", label: { fr: "Operations", en: "Operations" }, href: routes.admin.dashboard, access: "admin" },
  { id: "customers", label: { fr: "Clients", en: "Customers" }, href: routes.admin.customers, access: "admin" },
  { id: "catalog", label: { fr: "Catalogue", en: "Catalog" }, href: routes.admin.products, access: "admin" },
  { id: "orders", label: { fr: "Commandes", en: "Orders" }, href: routes.admin.orders, access: "admin" },
  { id: "licenses", label: { fr: "Licences", en: "Licenses" }, href: routes.admin.licenses, access: "admin" },
  { id: "releases", label: { fr: "Versions", en: "Releases" }, href: routes.admin.releases, access: "admin" },
  { id: "legal", label: { fr: "Legal", en: "Legal" }, href: routes.admin.legal, access: "admin" },
  { id: "documentation", label: { fr: "Docs", en: "Docs" }, href: routes.admin.documentation, access: "admin" },
  { id: "audit", label: { fr: "Audit", en: "Audit" }, href: routes.admin.audit, access: "admin" },
]
