import Link from "next/link"
import type { ReactNode } from "react"

import { LanguageToggle } from "@/components/navigation/language-toggle"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Container } from "@/components/ui/layout"
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
  sections: Array<{ id: string; title: string }>
  breadcrumbs: Array<{ label: string; href: string }>
  previous?: DocumentationContentDocument | null
  next?: DocumentationContentDocument | null
}

export function DocumentShell({
  locale,
  children,
  title,
  summary,
  reviewStatus,
  lastReviewedAt,
  sections,
  breadcrumbs,
  previous,
  next,
}: DocumentShellProps) {
  return (
    <main className="bg-brand-canvas">
      <Container wide className="grid gap-8 py-8 lg:grid-cols-[17rem_1fr_14rem]">
        <aside className="rounded-lg border border-brand-border bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-heading text-lg font-extrabold">Docs</p>
            <LanguageToggle compact locale={locale} />
          </div>
          <nav aria-label="Documentation" className="mt-5 grid gap-2 text-sm font-semibold">
            {documentationNavigation.map((item) => (
              <Link className="rounded-md px-3 py-2 text-brand-slate hover:bg-brand-orange-soft hover:text-brand-ink" href={item.href(locale)} key={item.id}>
                {item.label[locale]}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-2 text-sm text-brand-slate">
            {breadcrumbs.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? <span className="mx-2">/</span> : null}
                <Link className="hover:text-brand-ink" href={item.href}>
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
          <header className="rounded-xl border border-brand-border bg-white p-6 shadow-subtle">
            <div className="flex flex-wrap gap-2">
              <Badge variant={reviewStatus === "PUBLISHED" ? "success" : "orange"}>{reviewStatus}</Badge>
              <Badge variant="outline">
                {locale === "fr" ? "Derniere revue" : "Last reviewed"} {lastReviewedAt}
              </Badge>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-extrabold">{title}</h1>
            <p className="mt-3 max-w-3xl leading-7 text-brand-slate">{summary}</p>
          </header>
          <div className="mt-6 grid gap-5">{children}</div>
          {previous || next ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {previous ? <NeighborCard label={locale === "fr" ? "Precedent" : "Previous"} document={previous} locale={locale} /> : <div />}
              {next ? <NeighborCard alignRight label={locale === "fr" ? "Suivant" : "Next"} document={next} locale={locale} /> : null}
            </div>
          ) : null}
        </article>

        <aside className="hidden lg:block">
          <Card>
            <CardContent className="p-4">
              <p className="font-semibold">{locale === "fr" ? "Sur cette page" : "On this page"}</p>
              <nav className="mt-3 grid gap-2 text-sm">
                {sections.map((section) => (
                  <a className="text-brand-slate hover:text-brand-ink" href={`#${section.id}`} key={section.id}>
                    {section.title}
                  </a>
                ))}
              </nav>
              <Link className="mt-5 block rounded-md bg-brand-orange px-3 py-2 text-center text-sm font-semibold text-white" href={routes.account.support(locale)}>
                {locale === "fr" ? "Contacter le support" : "Contact support"}
              </Link>
            </CardContent>
          </Card>
        </aside>
      </Container>
    </main>
  )
}

export function DocumentSections({ document }: { document: DocumentationContentDocument | LegalContentDocument }) {
  return (
    <>
      {document.sections.map((section) => (
        <section className="rounded-lg border border-brand-border bg-white p-6" id={section.id} key={section.id}>
          <h2 className="font-heading text-2xl font-extrabold">{section.title}</h2>
          <div className="mt-4 grid gap-3 leading-7 text-brand-slate">
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
      <section className="rounded-lg border border-dashed border-brand-border bg-white p-6">
        <h2 className="font-heading text-xl font-extrabold">Review boundary</h2>
        <p className="mt-3 text-brand-slate">
          This document is a controlled foundation. It is not final legal advice, not a production support SLA and not a connected service contract.
        </p>
      </section>
    </>
  )
}

function NeighborCard({
  alignRight,
  document,
  label,
  locale,
}: {
  alignRight?: boolean
  document: DocumentationContentDocument
  label: string
  locale: Locale
}) {
  return (
    <Link className="rounded-lg border border-brand-border bg-white p-4 hover:border-brand-orange" href={routes.docs.article(locale, document.slug)}>
      <p className={alignRight ? "text-right text-sm text-brand-slate" : "text-sm text-brand-slate"}>{label}</p>
      <p className={alignRight ? "mt-1 text-right font-semibold" : "mt-1 font-semibold"}>{document.title}</p>
    </Link>
  )
}
