import Link from "next/link"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpenCheck,
  FileArchive,
  History,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  MoreHorizontal,
  RotateCcw,
  Settings2,
  ShieldAlert,
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
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { routes } from "@/config/routes"
import type {
  AdminAuditEvent,
  AdminOperationsData,
  AdminRelease,
  AdminSupportTicket,
  AdminSystemSetting,
} from "@/modules/admin/admin-operations-query"
import { getAdminOperationsData } from "@/modules/admin/admin-operations-query"
import type { Locale } from "@/src/i18n/locales"

type AdminOperationsKind =
  | "entitlements"
  | "entitlement-detail"
  | "licenses"
  | "license-detail"
  | "releases"
  | "release-new"
  | "release-detail"
  | "legal"
  | "support"
  | "support-detail"
  | "audit"
  | "settings"

const copy = {
  fr: {
    admin: "Admin",
    entitlements: "Acces",
    entitlementDetail: "Detail acces",
    licenses: "Licences",
    licenseDetail: "Detail licence",
    releases: "Versions",
    releaseNew: "Nouvelle version",
    releaseDetail: "Detail version",
    legal: "Legal review",
    support: "Support",
    supportDetail: "Detail ticket",
    audit: "Audit",
    settings: "Parametres",
    lead: "Operations sensibles: acces, licences, releases, legal, support, audit et configuration sans exposition de secrets.",
    preview:
      "Interface representative. Les actions sensibles exigent un backend connecte, une autorisation serveur et un audit; elles restent desactivees dans cette sprint.",
    secretNotice:
      "Aucune cle complete, private key, pepper, ciphertext, token, provider secret ou URL signee n'est exposee.",
    legalNotice: "Les documents draft/review restent explicitement non approuves.",
    releaseNotice: "Les versions affichent uniquement les checksums disponibles; aucune compatibilite n'est inventee.",
    open: "Ouvrir",
    status: "Statut",
    customer: "Client",
    updated: "Mis a jour",
    action: "Action",
    disabled: "Action non connectee",
    rotate: "Rotation",
    revoke: "Revoquer",
    publish: "Publier",
    close: "Clore",
    notFound: "Element introuvable dans les fixtures operations.",
  },
  en: {
    admin: "Admin",
    entitlements: "Entitlements",
    entitlementDetail: "Entitlement detail",
    licenses: "Licenses",
    licenseDetail: "License detail",
    releases: "Releases",
    releaseNew: "New release",
    releaseDetail: "Release detail",
    legal: "Legal review",
    support: "Support",
    supportDetail: "Ticket detail",
    audit: "Audit",
    settings: "Settings",
    lead: "Sensitive operations: access, licenses, releases, legal, support, audit and configuration without exposing secrets.",
    preview:
      "Representative interface. Sensitive actions require a connected backend, server authorization and audit; they remain disabled in this sprint.",
    secretNotice:
      "No complete key, private key, pepper, ciphertext, token, provider secret or signed URL is exposed.",
    legalNotice: "Draft/review documents remain explicitly not approved.",
    releaseNotice: "Releases show only available checksums; no compatibility is invented.",
    open: "Open",
    status: "Status",
    customer: "Customer",
    updated: "Updated",
    action: "Action",
    disabled: "Action not connected",
    rotate: "Rotate",
    revoke: "Revoke",
    publish: "Publish",
    close: "Close",
    notFound: "Item not found in operations fixtures.",
  },
} as const

export function AdminOperationsPage({
  kind,
  locale,
  resourceId,
}: {
  kind: AdminOperationsKind
  locale: Locale
  resourceId?: string
}) {
  const data = getAdminOperationsData(locale)

  if (kind === "entitlements") return <Entitlements data={data} locale={locale} />
  if (kind === "entitlement-detail") return <EntitlementDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "licenses") return <Licenses data={data} locale={locale} />
  if (kind === "license-detail") return <LicenseDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "releases") return <Releases data={data} locale={locale} />
  if (kind === "release-new") return <ReleaseNew locale={locale} />
  if (kind === "release-detail") return <ReleaseDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "legal") return <LegalReview data={data} locale={locale} />
  if (kind === "support") return <Support data={data} locale={locale} />
  if (kind === "support-detail") return <SupportDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "audit") return <Audit data={data} locale={locale} />
  return <Settings data={data} locale={locale} />
}

function Entitlements({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.entitlements} icon={ShieldCheck} locale={locale} title={t.entitlements}>
      <TableCard>
        <TableHeader><TableRow><TableHead>{t.customer}</TableHead><TableHead>Offer</TableHead><TableHead>{t.status}</TableHead><TableHead>Downloads</TableHead><TableHead>{t.action}</TableHead></TableRow></TableHeader>
        <TableBody>
          {data.entitlements.map((entitlement) => (
            <TableRow key={entitlement.id}>
              <TableCell>{entitlement.customerEmail}</TableCell>
              <TableCell>{entitlement.offer}<div className="text-xs text-brand-slate">{entitlement.source}</div></TableCell>
              <TableCell><StatusBadge status={entitlement.status} /></TableCell>
              <TableCell><StatusBadge status={entitlement.downloadAccess} /></TableCell>
              <TableCell><OpenButton href={routes.admin.entitlementDetail(locale, entitlement.id)} locale={locale} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableCard>
    </OperationsFrame>
  )
}

function EntitlementDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const entitlement = data.entitlements.find((item) => item.id === resourceId)
  if (!entitlement) return <NotFound locale={locale} />

  return (
    <OperationsFrame current={entitlement.id} icon={ShieldCheck} locale={locale} parent={{ href: routes.admin.entitlements(locale), label: t.entitlements }} title={t.entitlementDetail}>
      <DetailGrid cards={[
        { label: t.customer, value: entitlement.customerEmail },
        { label: "Offer", value: entitlement.offer },
        { label: t.status, value: <StatusBadge status={entitlement.status} /> },
        { label: "Source", value: entitlement.source },
      ]} />
      <CautiousActions actions={[t.revoke, t.rotate]} locale={locale} />
    </OperationsFrame>
  )
}

function Licenses({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.licenses} icon={KeyRound} locale={locale} title={t.licenses}>
      <Alert variant="warning">{t.secretNotice}</Alert>
      <TableCard>
        <TableHeader><TableRow><TableHead>{t.licenses}</TableHead><TableHead>{t.customer}</TableHead><TableHead>{t.status}</TableHead><TableHead>Limits</TableHead><TableHead>{t.action}</TableHead></TableRow></TableHeader>
        <TableBody>
          {data.licenses.map((license) => (
            <TableRow key={license.id}>
              <TableCell><div className="font-mono text-xs font-semibold">{license.maskedKey}</div><div className="text-xs text-brand-slate">{license.keyPrefix} / ****{license.keyLast4}</div></TableCell>
              <TableCell>{license.customerEmail}</TableCell>
              <TableCell><StatusBadge status={license.status} /></TableCell>
              <TableCell>PROD {license.productionLimit} / STG {license.stagingLimit}</TableCell>
              <TableCell><OpenButton href={routes.admin.licenseDetail(locale, license.id)} locale={locale} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableCard>
    </OperationsFrame>
  )
}

function LicenseDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const license = data.licenses.find((item) => item.id === resourceId)
  if (!license) return <NotFound locale={locale} />

  return (
    <OperationsFrame current={license.keyPrefix} icon={KeyRound} locale={locale} parent={{ href: routes.admin.licenses(locale), label: t.licenses }} title={t.licenseDetail}>
      <Alert variant="warning">{t.secretNotice}</Alert>
      <DetailGrid cards={[
        { label: t.licenses, value: <span className="font-mono">{license.maskedKey}</span> },
        { label: t.customer, value: license.customerEmail },
        { label: t.status, value: <StatusBadge status={license.status} /> },
        { label: "Key version", value: `v${license.keyVersion}` },
      ]} />
      <Card>
        <CardHeader><CardTitle>Activations</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Environment</TableHead><TableHead>Domain</TableHead><TableHead>{t.status}</TableHead><TableHead>Seen</TableHead></TableRow></TableHeader>
            <TableBody>
              {license.activations.map((activation) => (
                <TableRow key={activation.id}>
                  <TableCell>{activation.environment}</TableCell>
                  <TableCell>{activation.normalizedDomain}</TableCell>
                  <TableCell><StatusBadge status={activation.status} /></TableCell>
                  <TableCell>{formatDate(activation.lastSeenAt, locale)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CautiousActions actions={[t.revoke, t.rotate]} locale={locale} />
    </OperationsFrame>
  )
}

function Releases({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame actions={<Button asChild><Link href={routes.admin.releaseNew(locale)}><FileArchive aria-hidden="true" />{t.releaseNew}</Link></Button>} current={t.releases} icon={FileArchive} locale={locale} title={t.releases}>
      <Alert variant="info">{t.releaseNotice}</Alert>
      <div className="grid gap-4 md:grid-cols-2">
        {data.releases.map((release) => <ReleaseCard key={release.id} locale={locale} release={release} />)}
      </div>
    </OperationsFrame>
  )
}

function ReleaseNew({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.releaseNew} icon={FileArchive} locale={locale} parent={{ href: routes.admin.releases(locale), label: t.releases }} title={t.releaseNew}>
      <Alert variant="warning">{locale === "fr" ? "Creation preview: aucun paquet, checksum ou URL signee n'est persiste." : "Preview creation: no package, checksum or signed URL is persisted."}</Alert>
      <Card><CardContent className="grid gap-4 pt-6 md:grid-cols-2"><Input disabled aria-label="Version" placeholder="1.1.0" /><Select disabled aria-label="Channel"><option>stable</option><option>early_access</option></Select><Textarea disabled aria-label="Release notes" className="md:col-span-2" placeholder={locale === "fr" ? "Notes release internes" : "Internal release notes"} /><Button disabled className="w-fit" type="button">{t.disabled}</Button></CardContent></Card>
    </OperationsFrame>
  )
}

function ReleaseDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const release = data.releases.find((item) => item.id === resourceId)
  if (!release) return <NotFound locale={locale} />
  return (
    <OperationsFrame current={release.version} icon={FileArchive} locale={locale} parent={{ href: routes.admin.releases(locale), label: t.releases }} title={t.releaseDetail}>
      <Alert variant="info">{t.releaseNotice}</Alert>
      <DetailGrid cards={[
        { label: "Version", value: release.version },
        { label: "Channel", value: release.channel },
        { label: t.status, value: <StatusBadge status={release.status} /> },
        { label: "Checksum", value: release.checksumSha256 ?? "pending" },
      ]} />
      <ListCard items={release.notes} title="Notes" />
      <CautiousActions actions={[t.publish, t.revoke]} locale={locale} />
    </OperationsFrame>
  )
}

function LegalReview({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.legal} icon={BookOpenCheck} locale={locale} title={t.legal}>
      <Alert variant="warning">{t.legalNotice}</Alert>
      <TableCard>
        <TableHeader><TableRow><TableHead>Document</TableHead><TableHead>Locale</TableHead><TableHead>{t.status}</TableHead><TableHead>Version</TableHead><TableHead>{t.updated}</TableHead></TableRow></TableHeader>
        <TableBody>
          {data.legalDocuments.map((document) => (
            <TableRow key={document.id}>
              <TableCell><div className="font-semibold">{document.title}</div><div className="text-xs text-brand-slate">{document.type}</div></TableCell>
              <TableCell>{document.locale}</TableCell>
              <TableCell><StatusBadge status={document.status} /></TableCell>
              <TableCell>{document.version}</TableCell>
              <TableCell>{formatDate(document.updatedAt, locale)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableCard>
    </OperationsFrame>
  )
}

function Support({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.support} icon={LifeBuoy} locale={locale} title={t.support}>
      <TableCard>
        <TableHeader><TableRow><TableHead>Ticket</TableHead><TableHead>{t.customer}</TableHead><TableHead>{t.status}</TableHead><TableHead>{t.updated}</TableHead><TableHead>{t.action}</TableHead></TableRow></TableHeader>
        <TableBody>
          {data.supportTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell><div className="font-semibold">{ticket.subject}</div><div className="text-xs text-brand-slate">{ticket.category}</div></TableCell>
              <TableCell>{ticket.customerEmail}</TableCell>
              <TableCell><StatusBadge status={ticket.status} /></TableCell>
              <TableCell>{formatDate(ticket.updatedAt, locale)}</TableCell>
              <TableCell><OpenButton href={routes.admin.supportDetail(locale, ticket.id)} locale={locale} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableCard>
    </OperationsFrame>
  )
}

function SupportDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const ticket = data.supportTickets.find((item) => item.id === resourceId)
  if (!ticket) return <NotFound locale={locale} />
  return (
    <OperationsFrame current={ticket.subject} icon={LifeBuoy} locale={locale} parent={{ href: routes.admin.support(locale), label: t.support }} title={t.supportDetail}>
      <DetailGrid cards={[
        { label: "Ticket", value: ticket.subject },
        { label: t.customer, value: ticket.customerEmail },
        { label: t.status, value: <StatusBadge status={ticket.status} /> },
        { label: "Category", value: ticket.category },
      ]} />
      <Tabs defaultValue="messages">
        <TabsList><TabsTrigger value="messages">Messages</TabsTrigger><TabsTrigger value="reply">Reply preview</TabsTrigger></TabsList>
        <TabsContent value="messages"><Card><CardContent className="grid gap-3 pt-6">{ticket.messages.length ? ticket.messages.map((message) => <MessageCard key={message.id} locale={locale} message={message} />) : <p className="text-sm text-brand-slate">No messages.</p>}</CardContent></Card></TabsContent>
        <TabsContent value="reply"><Card><CardContent className="grid gap-4 pt-6"><Textarea disabled aria-label="Reply preview" placeholder={locale === "fr" ? "Reponse preview sans secret." : "Preview reply without secrets."} /><Button disabled className="w-fit" type="button">{t.disabled}</Button></CardContent></Card></TabsContent>
      </Tabs>
      <CautiousActions actions={[t.close]} locale={locale} />
    </OperationsFrame>
  )
}

function Audit({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.audit} icon={History} locale={locale} title={t.audit}>
      <Alert variant="warning">{t.secretNotice}</Alert>
      <div className="grid gap-3">
        {data.auditEvents.map((event) => <AuditCard event={event} key={event.id} locale={locale} />)}
      </div>
    </OperationsFrame>
  )
}

function Settings({ data, locale }: PageProps) {
  const t = copy[locale]
  return (
    <OperationsFrame current={t.settings} icon={Settings2} locale={locale} title={t.settings}>
      <Alert variant="warning">{t.secretNotice}</Alert>
      <div className="grid gap-4 md:grid-cols-2">
        {data.settings.map((setting) => <SettingCard key={setting.id} locale={locale} setting={setting} />)}
      </div>
    </OperationsFrame>
  )
}

type PageProps = { data: AdminOperationsData; locale: Locale }
type DetailProps = PageProps & { resourceId?: string }

function OperationsFrame({
  actions,
  children,
  current,
  icon: Icon,
  locale,
  parent,
  title,
}: {
  actions?: ReactNode
  children: ReactNode
  current: string
  icon: LucideIcon
  locale: Locale
  parent?: { href: string; label: string }
  title: string
}) {
  const t = copy[locale]
  return (
    <main className="grid min-w-0 gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href={routes.admin.dashboard(locale)}>{t.admin}</BreadcrumbLink></BreadcrumbItem>
          {parent ? <><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href={parent.href}>{parent.label}</BreadcrumbLink></BreadcrumbItem></> : null}
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{current}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <header className="rounded-xl border border-brand-border bg-white p-5 shadow-subtle">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2"><Badge variant="destructive">Admin</Badge><Badge variant="orange">Sprint 11B</Badge><Badge variant="outline">BRANDED</Badge></div>
            <h1 className="mt-4 flex items-center gap-3 font-heading text-2xl font-extrabold text-brand-ink sm:text-3xl"><Icon aria-hidden="true" className="size-6 text-danger" />{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-slate">{t.lead}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </header>
      <Alert variant="info">{t.preview}</Alert>
      {children}
    </main>
  )
}

function TableCard({ children }: { children: ReactNode }) {
  return <Card><CardContent className="pt-6"><Table>{children}</Table></CardContent></Card>
}

function DetailGrid({ cards }: { cards: Array<{ label: string; value: ReactNode }> }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => <Card key={card.label}><CardContent className="p-5"><p className="text-xs font-semibold uppercase text-brand-slate">{card.label}</p><div className="mt-3 break-words font-semibold text-brand-ink">{card.value}</div></CardContent></Card>)}</div>
}

function ReleaseCard({ locale, release }: { locale: Locale; release: AdminRelease }) {
  return (
    <Card>
      <CardHeader><CardTitle>{release.version}</CardTitle><CardDescription>{release.channel}</CardDescription></CardHeader>
      <CardContent className="grid gap-3">
        <StatusBadge status={release.status} />
        <p className="break-all font-mono text-xs text-brand-slate">{release.checksumSha256 ?? "checksum pending"}</p>
        <OpenButton href={routes.admin.releaseDetail(locale, release.id)} locale={locale} />
      </CardContent>
    </Card>
  )
}

function ListCard({ items, title }: { items: string[]; title: string }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><ul className="grid gap-2 text-sm text-brand-slate">{items.map((item) => <li className="rounded-md border border-brand-border p-3" key={item}>{item}</li>)}</ul></CardContent></Card>
}

function MessageCard({ locale, message }: { locale: Locale; message: AdminSupportTicket["messages"][number] }) {
  return <div className="rounded-md border border-brand-border p-4"><div className="flex flex-wrap justify-between gap-3 text-sm"><span className="font-semibold">{message.author}</span><span className="text-brand-slate">{formatDate(message.createdAt, locale)}</span></div><p className="mt-3 text-sm leading-6 text-brand-slate">{message.body}</p></div>
}

function AuditCard({ event, locale }: { event: AdminAuditEvent; locale: Locale }) {
  return <Card><CardContent className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{event.action}</p><p className="mt-1 text-sm text-brand-slate">{event.summary}</p></div><StatusBadge status={event.severity} /></div><Separator className="my-4 bg-brand-border" /><div className="grid gap-2 text-xs text-brand-slate sm:grid-cols-3"><span>{event.actor}</span><span>{event.target}</span><span>{formatDate(event.occurredAt, locale)}</span></div></CardContent></Card>
}

function SettingCard({ setting }: { locale: Locale; setting: AdminSystemSetting }) {
  return <Card><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{setting.label}</p><p className="mt-2 text-sm text-brand-slate">{setting.secret ? "********" : setting.valuePreview}</p></div>{setting.secret ? <LockKeyhole aria-hidden="true" className="size-5 text-danger" /> : <Settings2 aria-hidden="true" className="size-5 text-brand-orange" />}</div><div className="mt-4"><StatusBadge status={setting.status} /></div></CardContent></Card>
}

function OpenButton({ href, locale }: { href: string; locale: Locale }) {
  return <Button asChild size="compact" variant="outline"><Link href={href}><ArrowUpRight aria-hidden="true" />{copy[locale].open}</Link></Button>
}

function CautiousActions({ actions, locale }: { actions: string[]; locale: Locale }) {
  const t = copy[locale]
  return (
    <Card>
      <CardHeader><CardTitle>{locale === "fr" ? "Actions sensibles" : "Sensitive actions"}</CardTitle><CardDescription>{t.preview}</CardDescription></CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Dialog key={action}>
            <DialogTrigger asChild><Button type="button" variant="outline"><ShieldAlert aria-hidden="true" />{action}</Button></DialogTrigger>
            <DialogContent className="border-brand-border bg-white">
              <DialogHeader><DialogTitle>{action}</DialogTitle><DialogDescription>{t.preview}</DialogDescription></DialogHeader>
              <DialogFooter><Button disabled type="button" variant="danger">{t.disabled}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button type="button" variant="outline"><MoreHorizontal aria-hidden="true" />More</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end"><DropdownMenuLabel>Operations</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem disabled><AlertTriangle aria-hidden="true" />{t.disabled}</DropdownMenuItem><DropdownMenuItem disabled><RotateCcw aria-hidden="true" />{t.rotate}</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

function NotFound({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return <OperationsFrame current={t.notFound} icon={AlertTriangle} locale={locale} title={t.notFound}><Alert variant="warning">{t.notFound}</Alert></OperationsFrame>
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, BadgeProps["variant"]> = {
    active: "success",
    available: "success",
    published: "success",
    configured: "success",
    info: "success",
    pending: "orange",
    in_review: "orange",
    needs_customer_action: "orange",
    review: "orange",
    warning: "orange",
    draft: "secondary",
    expired: "secondary",
    deactivated: "secondary",
    closed: "secondary",
    missing: "destructive",
    suspended: "destructive",
    revoked: "destructive",
    blocked: "destructive",
    disabled: "destructive",
    danger: "destructive",
  }
  return <Badge variant={variants[status] ?? "outline"}>{status}</Badge>
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00.000Z`))
}
