import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  GitBranch,
  HelpCircle,
  Info,
  LifeBuoy,
  ListChecks,
  ShieldAlert,
} from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { documentationNavigation } from "@/config/navigation"
import { routes } from "@/config/routes"
import type { DocumentationContentDocument, LegalContentDocument } from "@/content/shared/document-types"
import type { Locale } from "@/src/i18n/locales"

type DocumentShellProps = {
  locale: Locale
  children: ReactNode
  title: string
  summary: string
  reviewStatus: string
  lastReviewedAt: string
  productVersionRange?: string
  releaseVersion?: string
  relatedLinks?: string[]
  sections: Array<{ id: string; title: string }>
  breadcrumbs: Array<{ label: string; href: string }>
  previous?: DocumentationContentDocument | null
  next?: DocumentationContentDocument | null
}

const copy = {
  fr: {
    docs: "Docs",
    article: "Article",
    onThisPage: "Sur cette page",
    reviewed: "Derniere revue",
    versionScope: "Portee version",
    release: "Release",
    releaseDraft: "Notes de release en revue",
    releaseWarning:
      "Cette page de release decrit la structure attendue et les controles documentaires. Elle ne publie pas une compatibilite finale tant que la release theme n'est pas approuvee.",
    reviewBoundary: "Etat de review",
    reviewBoundaryText:
      "Ce document est une base controlee. Les compatibilites, engagements support et termes juridiques restent soumis a validation avant publication commerciale.",
    related: "Liens utiles",
    relatedDescription: "Acces rapides vers les guides, pages legales ou espaces compte cites par ce document.",
    supportTitle: "Besoin d'aide apres lecture ?",
    supportDescription:
      "Consultez le depannage, puis ouvrez une demande support sans partager de cle, token, mot de passe, donnees carte ou secret provider.",
    troubleshooting: "Ouvrir le depannage",
    support: "Ouvrir le support",
    previous: "Precedent",
    next: "Suivant",
    changelog: "Changelog",
    compatibility: "Compatibilite",
    warnings: "Avertissements",
    changelogText: "Le changelog detaille doit venir du paquet theme approuve et de ses metadonnees de release.",
    compatibilityText: "La plage actuelle reste marquee comme non finale tant que la matrice de tests n'est pas publiee.",
    warningsText: "Verifier sauvegarde, staging, checksum, documentation incluse et chemins de rollback avant production.",
  },
  en: {
    docs: "Docs",
    article: "Article",
    onThisPage: "On this page",
    reviewed: "Last reviewed",
    versionScope: "Version scope",
    release: "Release",
    releaseDraft: "Release notes under review",
    releaseWarning:
      "This release page describes the expected structure and documentation checks. It does not publish final compatibility until the theme release is approved.",
    reviewBoundary: "Review state",
    reviewBoundaryText:
      "This document is a controlled foundation. Compatibility, support commitments and legal terms remain subject to validation before commercial publication.",
    related: "Useful links",
    relatedDescription: "Fast access to guides, legal pages or account areas referenced by this document.",
    supportTitle: "Need help after reading?",
    supportDescription:
      "Read troubleshooting first, then open a support request without sharing keys, tokens, passwords, card data or provider secrets.",
    troubleshooting: "Open troubleshooting",
    support: "Open support",
    previous: "Previous",
    next: "Next",
    changelog: "Changelog",
    compatibility: "Compatibility",
    warnings: "Warnings",
    changelogText: "The detailed changelog must come from the approved theme package and its release metadata.",
    compatibilityText: "The current range remains non-final until the compatibility matrix is published.",
    warningsText: "Verify backup, staging, checksum, included documentation and rollback paths before production.",
  },
} as const

export function DocumentShell({
  locale,
  children,
  title,
  summary,
  reviewStatus,
  lastReviewedAt,
  productVersionRange,
  releaseVersion,
  relatedLinks = [],
  sections,
  breadcrumbs,
  previous,
  next,
}: DocumentShellProps) {
  const t = copy[locale]
  const isPublished = reviewStatus === "PUBLISHED"
  const isRelease = Boolean(releaseVersion)
  const versionScope = productVersionRange ?? (locale === "fr" ? "Document en revue" : "Document under review")

  return (
    <main className="bg-marketing-background text-marketing-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)_15rem] lg:px-8 lg:py-12">
        <aside className="self-start rounded-xl border border-marketing-border bg-marketing-card p-4 shadow-subtle lg:sticky lg:top-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg border border-brand-orange/30 bg-brand-orange-soft text-brand-orange">
              <BookOpen aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="font-heading text-lg font-extrabold">{t.docs}</p>
              <p className="text-xs text-marketing-muted">{versionScope}</p>
            </div>
          </div>
          <nav aria-label="Documentation" className="mt-5 grid gap-1 text-sm font-semibold">
            {documentationNavigation.map((item) => (
              <Link
                className="rounded-lg px-3 py-2 text-marketing-muted transition hover:bg-marketing-card-subtle hover:text-marketing-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                href={item.href(locale)}
                key={item.id}
              >
                {item.label[locale]}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="min-w-0">
          <Breadcrumb className="mb-5 text-marketing-muted">
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={item.href}>
                  {index < breadcrumbs.length - 1 ? (
                    <>
                      <BreadcrumbLink className="text-marketing-muted hover:text-marketing-foreground" href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage className="max-w-[16rem] text-marketing-foreground sm:max-w-none">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <header className="rounded-xl border border-marketing-border bg-marketing-card p-6 shadow-subtle sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant={isPublished ? "success" : "orange"}>{reviewStatus}</Badge>
              {isRelease ? <Badge variant="outline">{`${t.release} ${releaseVersion}`}</Badge> : null}
              <Badge variant="secondary">{t.article}</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl font-heading text-3xl font-extrabold tracking-normal sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-marketing-muted">{summary}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MetaItem icon={CalendarDays} label={t.reviewed} value={lastReviewedAt} />
              <MetaItem icon={GitBranch} label={t.versionScope} value={versionScope} />
            </div>
          </header>

          {isRelease ? <ReleaseOverview locale={locale} productVersionRange={versionScope} /> : null}

          <div className="mt-6 grid gap-5">{children}</div>

          <RelatedLinksCard locale={locale} links={relatedLinks} />
          <SupportCard locale={locale} />

          {previous || next ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {previous ? (
                <NeighborCard document={previous} label={t.previous} locale={locale} direction="previous" />
              ) : (
                <div />
              )}
              {next ? <NeighborCard document={next} label={t.next} locale={locale} direction="next" /> : null}
            </div>
          ) : null}
        </article>

        <aside className="hidden lg:block lg:self-start lg:sticky lg:top-6">
          <Card className="bg-marketing-card text-marketing-foreground">
            <CardHeader>
              <CardTitle className="text-base">{t.onThisPage}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <nav aria-label={t.onThisPage} className="grid gap-2 text-sm">
                {sections.map((section) => (
                  <a
                    className="rounded-md px-2 py-1 text-marketing-muted hover:bg-marketing-card-subtle hover:text-marketing-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                    href={`#${section.id}`}
                    key={section.id}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <Separator className="bg-marketing-border" />
              <Alert variant={isPublished ? "success" : "warning"}>{isPublished ? "Published content" : t.reviewBoundaryText}</Alert>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  )
}

export function DocumentSections({ document }: { document: DocumentationContentDocument | LegalContentDocument }) {
  const t = copy[document.locale]

  return (
    <>
      {document.sections.map((section, index) => (
        <section className="scroll-mt-24 rounded-xl border border-marketing-border bg-marketing-card p-6 shadow-subtle" id={section.id} key={section.id}>
          <div className="flex items-start gap-3">
            <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg border border-brand-orange/30 bg-brand-orange-soft text-brand-orange">
              <span className="text-sm font-bold">{index + 1}</span>
            </span>
            <div className="min-w-0">
              <h2 className="font-heading text-2xl font-extrabold">{section.title}</h2>
              <div className="mt-4 grid gap-3 leading-7 text-marketing-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
      <Alert variant={document.reviewStatus === "PUBLISHED" ? "success" : "warning"} className="rounded-xl">
        <span className="font-semibold">{t.reviewBoundary}</span>
        <span className="mt-1 block">{t.reviewBoundaryText}</span>
      </Alert>
    </>
  )
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-marketing-border bg-marketing-card-subtle p-4">
      <Icon aria-hidden="true" className="size-5 text-brand-orange" />
      <div>
        <p className="text-xs font-semibold uppercase text-marketing-muted">{label}</p>
        <p className="mt-1 font-semibold text-marketing-foreground">{value}</p>
      </div>
    </div>
  )
}

function ReleaseOverview({ locale, productVersionRange }: { locale: Locale; productVersionRange: string }) {
  const t = copy[locale]
  const cards = [
    { title: t.changelog, text: t.changelogText, icon: ListChecks },
    { title: t.compatibility, text: `${productVersionRange}. ${t.compatibilityText}`, icon: CheckCircle2 },
    { title: t.warnings, text: t.warningsText, icon: ShieldAlert },
  ] as const

  return (
    <section className="mt-6 grid gap-4">
      <Alert variant="warning" className="rounded-xl">
        <span className="font-semibold">{t.releaseDraft}</span>
        <span className="mt-1 block">{t.releaseWarning}</span>
      </Alert>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card className="bg-marketing-card text-marketing-foreground" key={card.title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg border border-brand-orange/30 bg-brand-orange-soft text-brand-orange">
                  <card.icon aria-hidden="true" className="size-5" />
                </span>
                <CardTitle>{card.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-marketing-muted">{card.text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function RelatedLinksCard({ locale, links }: { locale: Locale; links: string[] }) {
  const t = copy[locale]

  if (links.length === 0) return null

  return (
    <Card className="mt-6 bg-marketing-card text-marketing-foreground">
      <CardHeader>
        <CardTitle>{t.related}</CardTitle>
        <CardDescription>{t.relatedDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {links.map((href) => (
          <Button asChild key={href} variant="outline">
            <Link href={href}>
              <FileText aria-hidden="true" />
              {formatRelatedLabel(href)}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

function SupportCard({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <Card className="mt-6 bg-marketing-card text-marketing-foreground">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-success/30 bg-success-soft text-success">
            <LifeBuoy aria-hidden="true" className="size-5" />
          </span>
          <div>
            <CardTitle>{t.supportTitle}</CardTitle>
            <CardDescription>{t.supportDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={routes.docs.article(locale, "troubleshooting")}>
            <HelpCircle aria-hidden="true" />
            {t.troubleshooting}
          </Link>
        </Button>
        <Button asChild>
          <Link href={routes.account.support(locale)}>
            <Info aria-hidden="true" />
            {t.support}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function NeighborCard({
  direction,
  document,
  label,
  locale,
}: {
  direction: "previous" | "next"
  document: DocumentationContentDocument
  label: string
  locale: Locale
}) {
  const isPrevious = direction === "previous"

  return (
    <Link
      className="group rounded-xl border border-marketing-border bg-marketing-card p-4 text-marketing-foreground shadow-subtle transition hover:border-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
      href={routes.docs.article(locale, document.slug)}
    >
      <p className={isPrevious ? "flex items-center gap-2 text-sm text-marketing-muted" : "flex items-center justify-end gap-2 text-sm text-marketing-muted"}>
        {isPrevious ? <ArrowLeft aria-hidden="true" className="size-4" /> : null}
        {label}
        {!isPrevious ? <ArrowRight aria-hidden="true" className="size-4" /> : null}
      </p>
      <p className={isPrevious ? "mt-2 font-heading font-bold" : "mt-2 text-right font-heading font-bold"}>
        {document.title}
      </p>
    </Link>
  )
}

function formatRelatedLabel(href: string) {
  const label = href.split("/").filter(Boolean).slice(1).join(" / ")
  return label || href
}
