import Link from "next/link"
import type { ReactNode } from "react"
import { Menu } from "lucide-react"

import { LogoLockup } from "@/components/brand/logo"
import { LanguageToggle } from "@/components/navigation/language-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Container } from "@/components/ui/layout"
import type { NavigationItem } from "@/config/navigation"
import { legalNavigation, publicNavigation } from "@/config/navigation"
import { routes } from "@/config/routes"
import type { Locale } from "@/src/i18n/locales"

export function MarketingShell({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  return (
    <div className="min-h-screen bg-brand-canvas text-brand-ink">
      <header className="border-b border-brand-border bg-brand-ivory">
        <Container wide className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href={routes.home(locale)} className="brand-focus rounded-sm">
            <LogoLockup className="h-12 w-auto" />
          </Link>
          <nav aria-label="Navigation publique" className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            {publicNavigation.map((item) => (
              <Link key={item.id} href={item.href(locale)} className="rounded-sm px-2 py-1 text-brand-slate hover:text-brand-ink">
                {item.label[locale]}
              </Link>
            ))}
            <Link href={routes.auth.login(locale)} className="rounded-sm px-2 py-1 text-brand-slate hover:text-brand-ink">
              {locale === "fr" ? "Connexion" : "Login"}
            </Link>
            <Link href={routes.marketing.pricing(locale)} className="rounded-md bg-brand-orange px-4 py-2 text-white hover:bg-brand-orange-strong">
              {locale === "fr" ? "Voir les offres" : "View plans"}
            </Link>
            <LanguageToggle locale={locale} />
          </nav>
        </Container>
      </header>
      {children}
      <footer className="border-t border-brand-border bg-white">
        <Container wide className="grid gap-6 py-8 text-sm text-brand-slate md:grid-cols-3">
          <div>
            <LogoLockup className="h-10 w-auto" />
            <p className="mt-3 leading-6">Template Engine Platform. Fixture-backed skeleton until connected services are approved.</p>
          </div>
          <FooterGroup locale={locale} title="Product" items={publicNavigation.slice(0, 5)} />
          <div>
            <p className="font-semibold text-brand-ink">Legal</p>
            <div className="mt-3 grid gap-2">
              {legalNavigation.map((item) => (
                <Link key={item.id} href={item.href(locale)} className="hover:text-brand-ink">
                  {item.label[locale]}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <LanguageToggle compact locale={locale} />
          </div>
        </Container>
      </footer>
    </div>
  )
}

export function AuthShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <div className="min-h-screen bg-brand-ivory">
      <Container className="py-8">
        <Link href={routes.home(locale)}>
          <LogoLockup className="h-12 w-auto" />
        </Link>
        <div className="mx-auto mt-10 max-w-xl">{children}</div>
      </Container>
    </div>
  )
}

export function WorkspaceShell({
  children,
  locale,
  navigation,
  title,
  tone = "account",
}: {
  children: ReactNode
  locale: Locale
  navigation: NavigationItem[]
  title: string
  tone?: "account" | "admin"
}) {
  return (
    <div className="min-h-screen bg-brand-canvas">
      <header className="border-b border-brand-border bg-white">
        <Container wide className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href={routes.home(locale)}>
            <LogoLockup className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant={tone === "admin" ? "destructive" : "orange"}>{title}</Badge>
            {navigation.length > 0 ? <WorkspaceMobileMenu locale={locale} navigation={navigation} title={title} /> : null}
          </div>
        </Container>
      </header>
      <Container wide className="grid min-w-0 gap-6 py-4 sm:py-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden rounded-lg border border-brand-border bg-white p-4 lg:block">
          <nav aria-label={title} className="grid gap-2 text-sm font-semibold">
            {navigation.map((item) => (
              <Link key={item.id} href={item.href(locale)} className="rounded-md px-3 py-2 text-brand-slate hover:bg-brand-orange-soft hover:text-brand-ink">
                {item.label[locale]}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  )
}

function WorkspaceMobileMenu({
  locale,
  navigation,
  title,
}: {
  locale: Locale
  navigation: NavigationItem[]
  title: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={`${title} menu`} className="lg:hidden" size="icon" type="button" variant="outline">
          <Menu aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[min(20rem,calc(100vw-2rem))]">
        {navigation.map((item) => (
          <DropdownMenuItem asChild key={item.id}>
            <Link className="w-full py-2 font-semibold" href={item.href(locale)}>
              {item.label[locale]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function FooterGroup({ items, locale, title }: { items: NavigationItem[]; locale: Locale; title: string }) {
  return (
    <div>
      <p className="font-semibold text-brand-ink">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <Link key={item.id} href={item.href(locale)} className="hover:text-brand-ink">
            {item.label[locale]}
          </Link>
        ))}
      </div>
    </div>
  )
}
