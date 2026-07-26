import type { Metadata } from "next"

import { routes } from "@/config/routes"
import { documentationSlugs, legalSlugs, listDocumentationDocuments, listLegalDocuments } from "@/modules/content/documents"
import { supportedLocales, type Locale } from "@/src/i18n/locales"

export const siteName = "Template Engine Platform"

const defaultDescriptions = {
  fr: "Plateforme commerciale pour licences, documentation, acces clients et livraisons du WooCommerce Template Engine.",
  en: "Commercial platform for licensing, documentation, customer access and delivery of the WooCommerce Template Engine.",
} satisfies Record<Locale, string>

const publicPageMetadata = {
  home: {
    fr: {
      title: "Template Engine Platform",
      description: "Lancez une boutique WooCommerce avec un moteur de templates modulaire, documente et prepare pour Starter, Pro ou Managed.",
    },
    en: {
      title: "Template Engine Platform",
      description: "Launch a WooCommerce store with a modular template engine prepared for Starter, Pro or Managed paths.",
    },
  },
  product: {
    fr: {
      title: "Produit",
      description: "Comprenez le moteur WooCommerce modulaire, ses limites commerciales et les scenarios de lancement supportes.",
    },
    en: {
      title: "Product",
      description: "Understand the modular WooCommerce engine, commercial boundaries and supported launch scenarios.",
    },
  },
  features: {
    fr: {
      title: "Fonctionnalites",
      description: "Explorez les fonctions du Template Engine pour modeles de boutique, localisation, licences, documentation et operations.",
    },
    en: {
      title: "Features",
      description: "Explore Template Engine features for shop models, localization, licensing, documentation and operations.",
    },
  },
  demos: {
    fr: {
      title: "Demonstrations",
      description: "Comparez des scenarios demonstratifs dropshipping, stock, hybride et digital construits depuis le meme moteur WooCommerce.",
    },
    en: {
      title: "Demonstrations",
      description: "Compare dropshipping, stock, hybrid and digital demonstration scenarios built from the same WooCommerce engine.",
    },
  },
  useCases: {
    fr: {
      title: "Cas d'utilisation",
      description: "Comparez les modeles de boutique supportes avant de choisir le chemin de lancement adapte.",
    },
    en: {
      title: "Use cases",
      description: "Compare supported shop models before choosing the launch path that fits your project.",
    },
  },
  pricing: {
    fr: {
      title: "Tarifs",
      description: "Comparez Starter, Pro et Managed pour choisir l'acces commercial adapte au lancement de votre boutique.",
    },
    en: {
      title: "Pricing",
      description: "Compare Starter, Pro and Managed to choose the commercial access that fits your store launch.",
    },
  },
  faq: {
    fr: {
      title: "FAQ",
      description: "Reponses aux questions courantes sur le Template Engine, les licences, les offres et le support.",
    },
    en: {
      title: "FAQ",
      description: "Answers to common questions about the Template Engine, licensing, offers and support.",
    },
  },
  contact: {
    fr: {
      title: "Contact",
      description: "Contactez l'equipe Template Engine Platform pour une question commerciale, technique ou operationnelle.",
    },
    en: {
      title: "Contact",
      description: "Contact Template Engine Platform for a commercial, technical or operational question.",
    },
  },
  about: {
    fr: {
      title: "A propos",
      description: "Decouvrez le role de Template Engine Platform dans la vente, la documentation et l'exploitation commerciale du moteur WooCommerce.",
    },
    en: {
      title: "About",
      description: "Learn how Template Engine Platform sells, documents and operates the commercial WooCommerce engine.",
    },
  },
  docs: {
    fr: {
      title: "Documentation",
      description: "Documentation versionnee pour installer, configurer, activer et exploiter le Template Engine WooCommerce.",
    },
    en: {
      title: "Documentation",
      description: "Versioned documentation to install, configure, activate and operate the WooCommerce Template Engine.",
    },
  },
} satisfies Record<string, Record<Locale, { title: string; description: string }>>

export type PublicSeoPage = keyof typeof publicPageMetadata

export function getSiteUrl() {
  const value = process.env.APP_URL ?? "http://localhost:3000"

  try {
    return new URL(value)
  } catch {
    return new URL("http://localhost:3000")
  }
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString()
}

export function buildRootMetadata(): Metadata {
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: defaultDescriptions.fr,
    metadataBase: getSiteUrl(),
    openGraph: {
      title: siteName,
      description: defaultDescriptions.fr,
      url: routes.home("fr"),
      siteName,
      locale: "fr_FR",
      alternateLocale: ["en_US"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: siteName,
      description: defaultDescriptions.fr,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    icons: {
      icon: "/brand/favicon.svg",
      shortcut: "/brand/favicon.svg",
      apple: "/brand/favicon.svg",
    },
  }
}

export function buildPublicPageMetadata(locale: Locale, page: PublicSeoPage, path: string): Metadata {
  const copy = publicPageMetadata[page][locale]

  return buildLocalizedMetadata({
    locale,
    path,
    title: copy.title,
    description: copy.description,
  })
}

export function buildDocumentMetadata(input: {
  locale: Locale
  path: string
  title: string
  description: string
  noindex?: boolean
}) {
  return buildLocalizedMetadata(input)
}

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  noindex?: boolean
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

export function buildLanguageAlternates(path: string) {
  return {
    ...Object.fromEntries(supportedLocales.map((locale) => [locale, replaceLocaleInPath(path, locale)])),
    "x-default": replaceLocaleInPath(path, "fr"),
  } as Record<string, string>
}

export function listPublicSeoPaths() {
  const paths = new Set<string>()

  for (const locale of supportedLocales) {
    paths.add(routes.home(locale))
    paths.add(routes.marketing.product(locale))
    paths.add(routes.marketing.features(locale))
    paths.add(routes.marketing.demos(locale))
    paths.add(routes.marketing.demoDetail(locale, "dropshipping-modele"))
    paths.add(routes.marketing.useCases(locale))
    paths.add(routes.marketing.useCase(locale, "dropshipping"))
    paths.add(routes.marketing.useCase(locale, "stock"))
    paths.add(routes.marketing.useCase(locale, "hybrid"))
    paths.add(routes.marketing.useCase(locale, "digital"))
    paths.add(routes.marketing.pricing(locale))
    paths.add(routes.marketing.offer(locale, "starter"))
    paths.add(routes.marketing.offer(locale, "pro"))
    paths.add(routes.marketing.offer(locale, "managed"))
    paths.add(routes.marketing.faq(locale))
    paths.add(routes.marketing.contact(locale))
    paths.add(routes.marketing.about(locale))

    for (const slug of documentationSlugs) {
      paths.add(routes.docs.article(locale, slug))
    }

    for (const slug of legalSlugs) {
      paths.add(routes.legal.document(locale, slug))
    }
  }

  return Array.from(paths).sort()
}

export function getDocumentationSitemapMetadata(path: string) {
  const [, localeSegment, section, ...slugParts] = path.split("/")
  const locale = localeSegment as Locale
  const slug = section === "docs" ? slugParts.join("/") : ""
  const document = listDocumentationDocuments(locale).find((item) => item.slug === slug)

  return document?.lastReviewedAt
}

export function getLegalSitemapMetadata(path: string) {
  const [, localeSegment, section, slug] = path.split("/")
  const locale = localeSegment as Locale
  const document = section === "legal" ? listLegalDocuments(locale).find((item) => item.slug === slug) : null

  return document?.lastReviewedAt
}

function replaceLocaleInPath(path: string, locale: Locale) {
  const [, currentLocale, ...rest] = path.split("/")

  if (supportedLocales.includes(currentLocale as Locale)) {
    return `/${[locale, ...rest].filter(Boolean).join("/")}`
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`
}
