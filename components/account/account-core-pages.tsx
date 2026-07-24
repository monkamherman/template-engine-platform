import Link from "next/link"
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Download,
  FileArchive,
  FileText,
  PackageCheck,
  ShieldCheck,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { routes } from "@/config/routes"
import type {
  AccountCoreData,
  AccountDownload,
  AccountEntitlement,
  AccountOrder,
  AccountRelease,
  AccountStatus,
} from "@/modules/account/account-query"
import { getAccountCoreData } from "@/modules/account/account-query"
import type { Locale } from "@/src/i18n/locales"

type AccountPageKind = "dashboard" | "orders" | "order-detail" | "entitlements" | "entitlement-detail" | "downloads" | "releases"

const copy = {
  fr: {
    home: "Compte",
    dashboard: "Tableau de bord client",
    dashboardLead: "Suivez vos commandes, acces officiels, telechargements et versions disponibles depuis un espace client unique.",
    orders: "Commandes",
    orderDetail: "Detail commande",
    entitlements: "Acces commerciaux",
    entitlementDetail: "Detail acces",
    downloads: "Telechargements",
    releases: "Versions",
    fixtureNotice:
      "Donnees representatives de compte. Aucun paiement reel, facture officielle, cle complete ou URL de telechargement signee n'est affiche dans cette interface.",
    activeAccess: "Acces actif",
    pendingAccess: "Acces en attente",
    expiredAccess: "Expire/suspendu",
    emptyState: "Etat vide",
    emptyBody: "Quand aucun droit n'est disponible, la page guidera le client vers les offres, la documentation ou le support sans inventer d'acces.",
    viewOrders: "Voir les commandes",
    viewDownloads: "Voir les telechargements",
    openDocs: "Ouvrir les docs",
    order: "Commande",
    status: "Statut",
    date: "Date",
    total: "Total",
    items: "Elements",
    terms: "Documents acceptes",
    offer: "Offre",
    quantity: "Quantite",
    unit: "Unitaire",
    source: "Origine",
    rights: "Droits associes",
    licensePreview: "Cle masquee",
    accessState: "Etat d'acces",
    version: "Version",
    channel: "Canal",
    checksum: "Checksum",
    action: "Action",
    changelog: "Changelog court",
    docs: "Documentation",
    unavailable: "Indisponible",
    signedUrlLater: "Lien signe genere uniquement apres verification serveur.",
    notFound: "Element introuvable dans les donnees representatives.",
    back: "Retour",
  },
  en: {
    home: "Account",
    dashboard: "Customer dashboard",
    dashboardLead: "Track orders, official access, downloads and available versions from one customer workspace.",
    orders: "Orders",
    orderDetail: "Order detail",
    entitlements: "Commercial access",
    entitlementDetail: "Access detail",
    downloads: "Downloads",
    releases: "Releases",
    fixtureNotice:
      "Representative account data. No real payment, official invoice, complete key or signed download URL is displayed in this interface.",
    activeAccess: "Active access",
    pendingAccess: "Pending access",
    expiredAccess: "Expired/suspended",
    emptyState: "Empty state",
    emptyBody: "When no rights are available, the page will guide the customer to plans, documentation or support without inventing access.",
    viewOrders: "View orders",
    viewDownloads: "View downloads",
    openDocs: "Open docs",
    order: "Order",
    status: "Status",
    date: "Date",
    total: "Total",
    items: "Items",
    terms: "Accepted documents",
    offer: "Plan",
    quantity: "Quantity",
    unit: "Unit",
    source: "Source",
    rights: "Associated rights",
    licensePreview: "Masked key",
    accessState: "Access state",
    version: "Version",
    channel: "Channel",
    checksum: "Checksum",
    action: "Action",
    changelog: "Short changelog",
    docs: "Documentation",
    unavailable: "Unavailable",
    signedUrlLater: "Signed link is generated only after server verification.",
    notFound: "Item not found in representative data.",
    back: "Back",
  },
} as const

export function AccountCorePage({
  kind,
  locale,
  resourceId,
}: {
  kind: AccountPageKind
  locale: Locale
  resourceId?: string
}) {
  const data = getAccountCoreData(locale)

  if (kind === "dashboard") {
    return <AccountDashboard data={data} locale={locale} />
  }

  if (kind === "orders") {
    return <OrdersPage data={data} locale={locale} />
  }

  if (kind === "order-detail") {
    return <OrderDetailPage data={data} locale={locale} orderId={resourceId} />
  }

  if (kind === "entitlements") {
    return <EntitlementsPage data={data} locale={locale} />
  }

  if (kind === "entitlement-detail") {
    return <EntitlementDetailPage data={data} entitlementId={resourceId} locale={locale} />
  }

  if (kind === "downloads") {
    return <DownloadsPage data={data} locale={locale} />
  }

  return <ReleasesPage data={data} locale={locale} />
}

function AccountDashboard({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]
  const activeCount = data.entitlements.filter((item) => item.status === "active").length
  const pendingCount = data.entitlements.filter((item) => item.status === "pending").length
  const blockedCount = data.entitlements.filter((item) => item.status === "expired" || item.status === "suspended").length

  return (
    <AccountFrame
      actions={
        <>
          <Button asChild>
            <Link href={routes.account.downloads(locale)}>{t.viewDownloads}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.docs.index(locale)}>{t.openDocs}</Link>
          </Button>
        </>
      }
      current={t.dashboard}
      lead={t.dashboardLead}
      locale={locale}
      title={t.dashboard}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={ShieldCheck} label={t.activeAccess} tone="success" value={String(activeCount)} />
        <SummaryCard icon={Clock3} label={t.pendingAccess} tone="warning" value={String(pendingCount)} />
        <SummaryCard icon={AlertCircle} label={t.expiredAccess} tone="danger" value={String(blockedCount)} />
        <SummaryCard icon={Download} label={t.downloads} tone="neutral" value={String(data.downloads.length)} />
      </div>

      <Tabs className="grid gap-5" defaultValue="overview">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">{locale === "fr" ? "Vue rapide" : "Overview"}</TabsTrigger>
          <TabsTrigger value="states">{locale === "fr" ? "Etats" : "States"}</TabsTrigger>
        </TabsList>
        <TabsContent className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]" value="overview">
          <OrdersTable compact data={data.orders.slice(0, 2)} locale={locale} />
          <EntitlementCards compact data={data.entitlements.slice(0, 2)} locale={locale} />
        </TabsContent>
        <TabsContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" value="states">
          <StateCard body={locale === "fr" ? "Telechargements et support officiels disponibles selon l'offre." : "Official downloads and support available according to plan."} icon={CheckCircle2} title={t.activeAccess} variant="success" />
          <StateCard body={locale === "fr" ? "Onboarding ou validation encore requis avant l'acces complet." : "Onboarding or validation is still required before full access."} icon={Clock3} title={t.pendingAccess} variant="warning" />
          <StateCard body={locale === "fr" ? "Les services officiels futurs sont limites; la boutique existante n'est pas volontairement desactivee." : "Future official services are limited; an existing storefront is not intentionally disabled."} icon={AlertCircle} title={t.expiredAccess} variant="danger" />
          <StateCard body={t.emptyBody} icon={PackageCheck} title={t.emptyState} variant="neutral" />
        </TabsContent>
      </Tabs>
    </AccountFrame>
  )
}

function OrdersPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.orders} lead={locale === "fr" ? "Historique des commandes et etats de paiement representatifs." : "Representative order history and payment states."} locale={locale} title={t.orders}>
      <OrdersTable data={data.orders} locale={locale} />
    </AccountFrame>
  )
}

function OrderDetailPage({ data, locale, orderId }: { data: AccountCoreData; locale: Locale; orderId?: string }) {
  const t = copy[locale]
  const order = data.orders.find((item) => item.id === orderId)

  if (!order) {
    return <NotFoundPanel locale={locale} />
  }

  return (
    <AccountFrame current={order.number} lead={locale === "fr" ? "Detail representatif d'une commande, sans facture officielle ni paiement provider expose." : "Representative order detail, without official invoice or exposed provider payment data."} locale={locale} parent={{ href: routes.account.orders(locale), label: t.orders }} title={t.orderDetail}>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>{order.number}</CardTitle>
            <CardDescription>{formatDate(order.placedAt, locale)}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <InfoRow label={t.status} value={<OrderStatusBadge status={order.status} />} />
            <InfoRow label={t.total} value={formatMoney(order.totalMinor, order.currency, locale)} />
            <InfoRow label={t.terms} value={`${order.acceptances.length} ${locale === "fr" ? "reference(s)" : "reference(s)"}`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.items}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.offer}</TableHead>
                  <TableHead>{t.quantity}</TableHead>
                  <TableHead>{t.unit}</TableHead>
                  <TableHead>{t.total}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatMoney(item.unitAmountMinor, order.currency, locale)}</TableCell>
                    <TableCell>{formatMoney(item.totalAmountMinor, order.currency, locale)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.terms}</CardTitle>
          <CardDescription>{locale === "fr" ? "References non finales tant que les documents legaux ne sont pas approuves." : "Non-final references until legal documents are approved."}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {order.acceptances.length > 0 ? (
            order.acceptances.map((acceptance) => (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand-border bg-white p-4" key={`${acceptance.document}-${acceptance.version}`}>
                <div>
                  <p className="font-semibold">{acceptance.document}</p>
                  <p className="mt-1 text-sm text-brand-slate">{acceptance.version}</p>
                </div>
                <Badge variant="secondary">{acceptance.status}</Badge>
              </div>
            ))
          ) : (
            <EmptyCard body={locale === "fr" ? "Aucune acceptation applicable dans cette fixture." : "No applicable acceptance in this fixture."} title={t.emptyState} />
          )}
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function EntitlementsPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.entitlements} lead={locale === "fr" ? "Droits commerciaux associes aux offres Starter, Pro et Managed." : "Commercial rights attached to Starter, Pro and Managed plans."} locale={locale} title={t.entitlements}>
      <EntitlementCards data={data.entitlements} locale={locale} />
    </AccountFrame>
  )
}

function EntitlementDetailPage({
  data,
  entitlementId,
  locale,
}: {
  data: AccountCoreData
  entitlementId?: string
  locale: Locale
}) {
  const t = copy[locale]
  const entitlement = data.entitlements.find((item) => item.id === entitlementId)

  if (!entitlement) {
    return <NotFoundPanel locale={locale} />
  }

  return (
    <AccountFrame current={entitlement.offer} lead={locale === "fr" ? "Origine, etat et droits associes a cet acces." : "Origin, state and rights attached to this access."} locale={locale} parent={{ href: routes.account.entitlements(locale), label: t.entitlements }} title={t.entitlementDetail}>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>{entitlement.offer}</CardTitle>
            <CardDescription>{entitlement.id}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <InfoRow label={t.status} value={<EntitlementStatusBadge status={entitlement.status} />} />
            <InfoRow label={t.source} value={entitlement.sourceOrderId} />
            <InfoRow label={t.date} value={formatDate(entitlement.startsAt, locale)} />
            <InfoRow label={t.licensePreview} value={<span className="font-mono">{entitlement.licensePreview}</span>} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.accessState}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <AccessRow label={locale === "fr" ? "Mises a jour" : "Updates" } status={entitlement.updateAccess} />
            <AccessRow label="Support" status={entitlement.supportAccess} />
            <AccessRow label={t.downloads} status={entitlement.downloadAccess} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.rights}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {entitlement.rights.map((right) => (
            <div className="rounded-lg border border-brand-border bg-white p-4 text-sm leading-6 text-brand-slate" key={right}>
              {right}
            </div>
          ))}
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function DownloadsPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.downloads} lead={locale === "fr" ? "Versions telechargeables apres verification serveur d'un acces actif." : "Downloadable versions after server-side verification of active access."} locale={locale} title={t.downloads}>
      <Card>
        <CardHeader>
          <CardTitle>{t.downloads}</CardTitle>
          <CardDescription>{t.signedUrlLater}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.version}</TableHead>
                <TableHead>{t.channel}</TableHead>
                <TableHead>{t.checksum}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.downloads.map((download) => (
                <DownloadRow download={download} key={download.id} locale={locale} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function ReleasesPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.releases} lead={locale === "fr" ? "Historique des versions visibles pour le client et liens vers la documentation associee." : "Customer-visible release history and related documentation links."} locale={locale} title={t.releases}>
      <div className="grid gap-5">
        {data.releases.map((release) => (
          <ReleaseCard key={release.id} locale={locale} release={release} />
        ))}
      </div>
    </AccountFrame>
  )
}

function AccountFrame({
  actions,
  children,
  current,
  lead,
  locale,
  parent,
  title,
}: {
  actions?: React.ReactNode
  children: React.ReactNode
  current: string
  lead: string
  locale: Locale
  parent?: { href: string; label: string }
  title: string
}) {
  const t = copy[locale]

  return (
    <main className="grid gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={routes.account.dashboard(locale)}>{t.home}</BreadcrumbLink>
          </BreadcrumbItem>
          {parent ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={parent.href}>{parent.label}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : null}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="rounded-xl border border-brand-border bg-white p-5 shadow-subtle sm:p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <Badge variant="orange">Sprint 08A</Badge>
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-normal text-brand-ink sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl leading-7 text-brand-slate">{lead}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </header>

      <Alert variant="info">{t.fixtureNotice}</Alert>
      {children}
    </main>
  )
}

function OrdersTable({ compact = false, data, locale }: { compact?: boolean; data: AccountOrder[]; locale: Locale }) {
  const t = copy[locale]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.orders}</CardTitle>
        <CardDescription>
          {compact
            ? locale === "fr"
              ? "Commandes recentes representatives."
              : "Recent representative orders."
            : locale === "fr"
              ? "Liste responsive des commandes visibles dans l'espace client."
              : "Responsive list of orders visible in the customer workspace."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.order}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead>{t.date}</TableHead>
              <TableHead>{t.total}</TableHead>
              <TableHead>{t.action}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-semibold">{order.number}</div>
                  <div className="mt-1 text-xs text-brand-slate">{order.items.map((item) => item.offer).join(", ")}</div>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>{formatDate(order.placedAt, locale)}</TableCell>
                <TableCell>{formatMoney(order.totalMinor, order.currency, locale)}</TableCell>
                <TableCell>
                  <Button asChild size="compact" variant="outline">
                    <Link href={routes.account.orderDetail(locale, order.id)}>
                      <ArrowUpRight aria-hidden="true" />
                      {locale === "fr" ? "Ouvrir" : "Open"}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function EntitlementCards({ compact = false, data, locale }: { compact?: boolean; data: AccountEntitlement[]; locale: Locale }) {
  const t = copy[locale]

  return (
    <div className={compact ? "grid gap-4" : "grid gap-5 md:grid-cols-2 xl:grid-cols-3"}>
      {data.map((entitlement) => (
        <Card key={entitlement.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>{entitlement.offer}</CardTitle>
                <CardDescription>{entitlement.id}</CardDescription>
              </div>
              <EntitlementStatusBadge status={entitlement.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 text-sm">
              <InfoRow label={t.source} value={entitlement.sourceOrderId} />
              <InfoRow label={t.licensePreview} value={<span className="font-mono">{entitlement.licensePreview}</span>} />
              <InfoRow label={t.downloads} value={<AccessBadge status={entitlement.downloadAccess} />} />
            </div>
            <Button asChild className="mt-5 w-full" variant="outline">
              <Link href={routes.account.entitlementDetail(locale, entitlement.id)}>
                <ArrowUpRight aria-hidden="true" />
                {locale === "fr" ? "Voir l'acces" : "View access"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function DownloadRow({ download, locale }: { download: AccountDownload; locale: Locale }) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-semibold">{download.version}</div>
        <div className="mt-1 text-xs text-brand-slate">{download.fileName}</div>
      </TableCell>
      <TableCell>
        <Badge variant={download.channel === "stable" ? "success" : "orange"}>{download.channel}</Badge>
      </TableCell>
      <TableCell>
        <span className="font-mono text-xs">{shortChecksum(download.checksumSha256)}</span>
      </TableCell>
      <TableCell>
        <AccessBadge status={download.status === "available" ? "available" : "blocked"} />
      </TableCell>
      <TableCell>
        <Button disabled size="compact" type="button" variant="outline">
          <FileArchive aria-hidden="true" />
          {locale === "fr" ? "Verification serveur" : "Server check"}
        </Button>
      </TableCell>
    </TableRow>
  )
}

function ReleaseCard({ locale, release }: { locale: Locale; release: AccountRelease }) {
  const t = copy[locale]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <CardTitle>{release.version}</CardTitle>
            <CardDescription>{formatDate(release.releasedAt, locale)}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant={release.channel === "stable" ? "success" : "orange"}>{release.channel}</Badge>
            <Badge variant="secondary">{release.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="font-semibold">{t.changelog}</p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-brand-slate">
            {release.changelog.map((item) => (
              <li className="flex gap-2" key={item}>
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button asChild variant="outline">
          <Link href={routes.docs.article(locale, release.docsSlug)}>
            <FileText aria-hidden="true" />
            {t.docs}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  tone,
  value,
}: {
  icon: typeof ShieldCheck
  label: string
  tone: "success" | "warning" | "danger" | "neutral"
  value: string
}) {
  const toneClass = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    neutral: "text-brand-orange",
  }[tone]

  return (
    <Card>
      <CardContent className="p-5">
        <Icon aria-hidden="true" className={`size-5 ${toneClass}`} />
        <p className="mt-4 text-sm font-semibold text-brand-slate">{label}</p>
        <p className="mt-2 font-heading text-3xl font-extrabold">{value}</p>
      </CardContent>
    </Card>
  )
}

function StateCard({
  body,
  icon: Icon,
  title,
  variant,
}: {
  body: string
  icon: typeof ShieldCheck
  title: string
  variant: "success" | "warning" | "danger" | "neutral"
}) {
  const badgeVariant = variant === "danger" ? "destructive" : variant === "neutral" ? "secondary" : variant === "warning" ? "orange" : variant

  return (
    <Card>
      <CardHeader>
        <Icon aria-hidden="true" className="size-5 text-brand-orange" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant={badgeVariant}>{title}</Badge>
        <p className="mt-3 text-sm leading-6 text-brand-slate">{body}</p>
      </CardContent>
    </Card>
  )
}

function EmptyCard({ body, title }: { body: string; title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-brand-border bg-white p-5">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-brand-slate">{body}</p>
    </div>
  )
}

function NotFoundPanel({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.unavailable} lead={t.notFound} locale={locale} title={t.unavailable}>
      <EmptyCard body={t.notFound} title={t.emptyState} />
      <Button asChild className="w-fit" variant="outline">
        <Link href={routes.account.dashboard(locale)}>{t.back}</Link>
      </Button>
    </AccountFrame>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-brand-slate">{label}</span>
      <span className="font-semibold text-brand-ink">{value}</span>
    </div>
  )
}

function AccessRow({ label, status }: { label: string; status: AccountStatus }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-brand-border bg-white p-4">
      <span className="font-semibold">{label}</span>
      <AccessBadge status={status} />
    </div>
  )
}

function OrderStatusBadge({ status }: { status: AccountOrder["status"] }) {
  const variant = status === "paid_fixture" ? "success" : status === "pending_fixture" ? "orange" : "destructive"
  return <Badge variant={variant}>{status}</Badge>
}

function EntitlementStatusBadge({ status }: { status: AccountEntitlement["status"] }) {
  const variant = status === "active" ? "success" : status === "pending" ? "orange" : "destructive"
  return <Badge variant={variant}>{status}</Badge>
}

function AccessBadge({ status }: { status: AccountStatus }) {
  const variant = status === "active" || status === "available" ? "success" : status === "pending" ? "orange" : "destructive"
  return <Badge variant={variant}>{status}</Badge>
}

function formatMoney(amountMinor: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency,
  }).format(amountMinor / 100)
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00.000Z`))
}

function shortChecksum(value: string) {
  return `${value.slice(0, 12)}...${value.slice(-8)}`
}
