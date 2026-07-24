import Link from "next/link"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  AlertCircle,
  ArrowUpRight,
  LockKeyhole,
  Mail,
  MonitorCheck,
  PenLine,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  UserRound,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { routes } from "@/config/routes"
import type {
  AccountCoreData,
  AccountLicense,
  AccountOnboardingRequest,
  AccountSupportTicket,
} from "@/modules/account/account-query"
import { getAccountCoreData } from "@/modules/account/account-query"
import type { Locale } from "@/src/i18n/locales"

type AccountSecondaryKind =
  | "licenses"
  | "license-detail"
  | "onboarding"
  | "onboarding-detail"
  | "support"
  | "support-new"
  | "support-detail"
  | "profile"
  | "security"

const copy = {
  fr: {
    home: "Compte",
    licenses: "Licences",
    licenseDetail: "Detail licence",
    onboarding: "Onboarding",
    onboardingDetail: "Detail onboarding",
    support: "Support",
    newSupport: "Nouvelle demande",
    supportDetail: "Detail support",
    profile: "Profil",
    security: "Securite",
    fixtureNotice:
      "Interface representative. Les actions sensibles restent desactivees tant que les services backend et controles d'autorisation ne sont pas connectes.",
    licenseBoundary:
      "La licence controle les services officiels, mises a jour, telechargements proteges et support. Elle ne desactive pas volontairement le storefront public.",
    noFullKey: "Cle masquee uniquement: prefixe et quatre derniers caracteres.",
    status: "Statut",
    offer: "Offre",
    issued: "Emission",
    expires: "Expiration",
    limits: "Limites",
    activations: "Activations",
    environment: "Environnement",
    domain: "Domaine normalise",
    lastSeen: "Derniere validation",
    action: "Action",
    previewAction: "Action preview",
    deactivate: "Desactiver",
    reset: "Reinitialiser",
    revoke: "Revoquer",
    notAvailable: "Non disponible",
    open: "Ouvrir",
    title: "Titre",
    updated: "Mis a jour",
    milestones: "Jalons",
    messages: "Messages",
    category: "Categorie",
    subject: "Sujet",
    description: "Description",
    submitDisabled: "Creation non connectee",
    providerNotice: "Ce formulaire ne persiste rien dans cette sprint.",
    name: "Nom",
    email: "Email",
    locale: "Langue",
    accountStatus: "Etat compte",
    password: "Mot de passe",
    sessions: "Sessions",
    google: "Google OAuth",
    verified: "Email verifie",
    notFound: "Element introuvable dans les donnees representatives.",
    back: "Retour",
  },
  en: {
    home: "Account",
    licenses: "Licenses",
    licenseDetail: "License detail",
    onboarding: "Onboarding",
    onboardingDetail: "Onboarding detail",
    support: "Support",
    newSupport: "New request",
    supportDetail: "Support detail",
    profile: "Profile",
    security: "Security",
    fixtureNotice:
      "Representative interface. Sensitive actions remain disabled until backend services and authorization checks are connected.",
    licenseBoundary:
      "The license controls official services, updates, protected downloads and support. It does not intentionally disable the public storefront.",
    noFullKey: "Masked key only: prefix and last four characters.",
    status: "Status",
    offer: "Plan",
    issued: "Issued",
    expires: "Expires",
    limits: "Limits",
    activations: "Activations",
    environment: "Environment",
    domain: "Normalized domain",
    lastSeen: "Last validation",
    action: "Action",
    previewAction: "Preview action",
    deactivate: "Deactivate",
    reset: "Reset",
    revoke: "Revoke",
    notAvailable: "Unavailable",
    open: "Open",
    title: "Title",
    updated: "Updated",
    milestones: "Milestones",
    messages: "Messages",
    category: "Category",
    subject: "Subject",
    description: "Description",
    submitDisabled: "Creation not connected",
    providerNotice: "This form does not persist anything in this sprint.",
    name: "Name",
    email: "Email",
    locale: "Locale",
    accountStatus: "Account status",
    password: "Password",
    sessions: "Sessions",
    google: "Google OAuth",
    verified: "Verified email",
    notFound: "Item not found in representative data.",
    back: "Back",
  },
} as const

export function AccountSupportSettingsPage({
  kind,
  locale,
  resourceId,
}: {
  kind: AccountSecondaryKind
  locale: Locale
  resourceId?: string
}) {
  const data = getAccountCoreData(locale)

  if (kind === "licenses") return <LicensesPage data={data} locale={locale} />
  if (kind === "license-detail") return <LicenseDetailPage data={data} licenseId={resourceId} locale={locale} />
  if (kind === "onboarding") return <OnboardingPage data={data} locale={locale} />
  if (kind === "onboarding-detail") return <OnboardingDetailPage data={data} locale={locale} requestId={resourceId} />
  if (kind === "support") return <SupportPage data={data} locale={locale} />
  if (kind === "support-new") return <SupportNewPage locale={locale} />
  if (kind === "support-detail") return <SupportDetailPage data={data} locale={locale} ticketId={resourceId} />
  if (kind === "profile") return <ProfileSettingsPage data={data} locale={locale} />
  return <SecuritySettingsPage data={data} locale={locale} />
}

function LicensesPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.licenses} lead={t.licenseBoundary} locale={locale} title={t.licenses}>
      <Alert variant="warning">{t.noFullKey}</Alert>
      <Card>
        <CardHeader>
          <CardTitle>{t.licenses}</CardTitle>
          <CardDescription>{locale === "fr" ? "Cles masquees, etats et limites d'activation." : "Masked keys, statuses and activation limits."}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.licenses}</TableHead>
                <TableHead>{t.offer}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.limits}</TableHead>
                <TableHead>{t.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.licenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell>
                    <div className="font-mono text-sm font-semibold">{license.maskedKey}</div>
                    <div className="mt-1 text-xs text-brand-slate">
                      {license.keyPrefix} / ****{license.keyLast4}
                    </div>
                  </TableCell>
                  <TableCell>{license.offer}</TableCell>
                  <TableCell>
                    <LicenseStatusBadge status={license.status} />
                  </TableCell>
                  <TableCell>
                    {license.productionLimit} production / {license.stagingLimit} staging
                  </TableCell>
                  <TableCell>
                    <Button asChild size="compact" variant="outline">
                      <Link href={routes.account.licenseDetail(locale, license.id)}>
                        <ArrowUpRight aria-hidden="true" />
                        {t.open}
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function LicenseDetailPage({
  data,
  licenseId,
  locale,
}: {
  data: AccountCoreData
  licenseId?: string
  locale: Locale
}) {
  const t = copy[locale]
  const license = data.licenses.find((item) => item.id === licenseId)

  if (!license) return <NotFoundPanel locale={locale} />

  return (
    <AccountFrame current={license.keyPrefix} lead={t.licenseBoundary} locale={locale} parent={{ href: routes.account.licenses(locale), label: t.licenses }} title={t.licenseDetail}>
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t.noFullKey}</CardTitle>
            <CardDescription>{license.id}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <InfoRow label={t.licenses} value={<span className="font-mono">{license.maskedKey}</span>} />
            <InfoRow label={t.status} value={<LicenseStatusBadge status={license.status} />} />
            <InfoRow label={t.issued} value={formatDate(license.issuedAt, locale)} />
            <InfoRow label={t.expires} value={license.expiresAt ? formatDate(license.expiresAt, locale) : t.notAvailable} />
            <InfoRow label={t.limits} value={`${license.productionLimit} production / ${license.stagingLimit} staging`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.activations}</CardTitle>
            <CardDescription>{locale === "fr" ? "Production et staging sont controles separement." : "Production and staging are controlled separately."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.environment}</TableHead>
                  <TableHead>{t.domain}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.lastSeen}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {license.activations.map((activation) => (
                  <TableRow key={activation.id}>
                    <TableCell>{activation.environment}</TableCell>
                    <TableCell>{activation.normalizedDomain}</TableCell>
                    <TableCell>
                      <ActivationStatusBadge status={activation.status} />
                    </TableCell>
                    <TableCell>{formatDate(activation.lastSeenAt, locale)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <SensitiveActionsPanel locale={locale} />
    </AccountFrame>
  )
}

function OnboardingPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.onboarding} lead={locale === "fr" ? "Suivez les demandes Pro et Managed sans promesse SLA non approuvee." : "Track Pro and Managed requests without unapproved SLA promises."} locale={locale} title={t.onboarding}>
      <div className="grid gap-5 md:grid-cols-2">
        {data.onboarding.map((request) => (
          <RequestCard href={routes.account.onboardingDetail(locale, request.id)} icon={MonitorCheck} key={request.id} locale={locale} request={request} />
        ))}
      </div>
    </AccountFrame>
  )
}

function OnboardingDetailPage({
  data,
  locale,
  requestId,
}: {
  data: AccountCoreData
  locale: Locale
  requestId?: string
}) {
  const t = copy[locale]
  const request = data.onboarding.find((item) => item.id === requestId)

  if (!request) return <NotFoundPanel locale={locale} />

  return (
    <AccountFrame current={request.title} lead={locale === "fr" ? "Progression representative du workflow d'accompagnement." : "Representative progress for the assisted workflow."} locale={locale} parent={{ href: routes.account.onboarding(locale), label: t.onboarding }} title={t.onboardingDetail}>
      <Card>
        <CardHeader>
          <CardTitle>{request.title}</CardTitle>
          <CardDescription>
            {request.offer} / {formatDate(request.updatedAt, locale)}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {request.milestones.map((milestone) => (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand-border bg-white p-4" key={milestone.id}>
              <div>
                <p className="font-semibold">{milestone.label}</p>
                <p className="mt-1 text-sm text-brand-slate">{t.status}</p>
              </div>
              <WorkStatusBadge status={milestone.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function SupportPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame
      actions={
        <Button asChild>
          <Link href={routes.account.supportNew(locale)}>
            <PenLine aria-hidden="true" />
            {t.newSupport}
          </Link>
        </Button>
      }
      current={t.support}
      lead={locale === "fr" ? "Suivez les tickets sans partager de secrets, mots de passe ou cles completes." : "Track tickets without sharing secrets, passwords or complete keys."}
      locale={locale}
      title={t.support}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t.support}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.subject}</TableHead>
                <TableHead>{t.category}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.updated}</TableHead>
                <TableHead>{t.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.supportTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-semibold">{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <WorkStatusBadge status={ticket.status} />
                  </TableCell>
                  <TableCell>{formatDate(ticket.updatedAt, locale)}</TableCell>
                  <TableCell>
                    <Button asChild size="compact" variant="outline">
                      <Link href={routes.account.supportDetail(locale, ticket.id)}>{t.open}</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function SupportNewPage({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.newSupport} lead={locale === "fr" ? "Preparez une demande sans inclure de secret ou cle complete." : "Prepare a request without including any secret or complete key."} locale={locale} parent={{ href: routes.account.support(locale), label: t.support }} title={t.newSupport}>
      <Alert variant="warning">{t.providerNotice}</Alert>
      <Card>
        <CardHeader>
          <CardTitle>{t.newSupport}</CardTitle>
          <CardDescription>{locale === "fr" ? "Formulaire preview non persistant." : "Non-persistent preview form."}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <Field id="support-subject" label={t.subject}>
            <Input disabled id="support-subject" placeholder={locale === "fr" ? "Sujet de la demande" : "Request subject"} />
          </Field>
          <Field id="support-category" label={t.category}>
            <Select disabled id="support-category">
              <option>license</option>
              <option>download</option>
              <option>installation</option>
            </Select>
          </Field>
          <Field id="support-description" label={t.description}>
            <Textarea disabled id="support-description" placeholder={locale === "fr" ? "Ne collez pas de mot de passe, secret ou cle complete." : "Do not paste passwords, secrets or complete keys."} />
          </Field>
          <Button disabled className="w-fit" type="button">
            {t.submitDisabled}
          </Button>
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function SupportDetailPage({
  data,
  locale,
  ticketId,
}: {
  data: AccountCoreData
  locale: Locale
  ticketId?: string
}) {
  const t = copy[locale]
  const ticket = data.supportTickets.find((item) => item.id === ticketId)

  if (!ticket) return <NotFoundPanel locale={locale} />

  return (
    <AccountFrame current={ticket.subject} lead={locale === "fr" ? "Conversation representative sans donnees sensibles." : "Representative conversation without sensitive data."} locale={locale} parent={{ href: routes.account.support(locale), label: t.support }} title={t.supportDetail}>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>{ticket.subject}</CardTitle>
              <CardDescription>{formatDate(ticket.updatedAt, locale)}</CardDescription>
            </div>
            <WorkStatusBadge status={ticket.status} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          {ticket.messages.length > 0 ? (
            ticket.messages.map((message) => (
              <div className="rounded-lg border border-brand-border bg-white p-4" key={message.id}>
                <div className="flex flex-wrap justify-between gap-3 text-sm">
                  <span className="font-semibold">{message.author}</span>
                  <span className="text-brand-slate">{formatDate(message.createdAt, locale)}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-brand-slate">{message.body}</p>
              </div>
            ))
          ) : (
            <EmptyCard body={locale === "fr" ? "Aucun message detaille dans cette fixture." : "No detailed message in this fixture."} title={t.messages} />
          )}
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function ProfileSettingsPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.profile} lead={locale === "fr" ? "Identite client et preferences visibles. Les modifications restent preview." : "Visible customer identity and preferences. Edits remain preview-only."} locale={locale} title={t.profile}>
      <Alert variant="info">{t.providerNotice}</Alert>
      <Card>
        <CardHeader>
          <CardTitle>{t.profile}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field id="profile-name" label={t.name}>
            <Input disabled defaultValue={data.settings.profile.name} id="profile-name" />
          </Field>
          <Field id="profile-email" label={t.email}>
            <Input disabled defaultValue={data.settings.profile.email} id="profile-email" type="email" />
          </Field>
          <Field id="profile-locale" label={t.locale}>
            <Select disabled defaultValue={data.settings.profile.locale} id="profile-locale">
              <option value="fr">Francais</option>
              <option value="en">English</option>
            </Select>
          </Field>
          <InfoCard icon={UserRound} label={t.accountStatus} value={data.settings.profile.accountStatus} />
        </CardContent>
      </Card>
    </AccountFrame>
  )
}

function SecuritySettingsPage({ data, locale }: { data: AccountCoreData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AccountFrame current={t.security} lead={locale === "fr" ? "Controle des fournisseurs auth et actions sensibles non persistantes." : "Auth provider controls and non-persistent sensitive actions."} locale={locale} title={t.security}>
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={LockKeyhole} label={t.password} value={data.settings.security.passwordProvider} />
        <InfoCard icon={Mail} label={t.verified} value={data.settings.security.emailVerified ? "verified" : "pending"} />
        <InfoCard icon={ShieldCheck} label={t.google} value={data.settings.security.googleLinked ? "linked" : "not linked"} />
        <InfoCard icon={MonitorCheck} label={t.sessions} value={String(data.settings.security.activeSessions)} />
      </div>
      <SensitiveActionsPanel locale={locale} />
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
  actions?: ReactNode
  children: ReactNode
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
            <Badge variant="orange">Sprint 08B</Badge>
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

function RequestCard({
  href,
  icon: Icon,
  locale,
  request,
}: {
  href: string
  icon: LucideIcon
  locale: Locale
  request: AccountOnboardingRequest
}) {
  const t = copy[locale]

  return (
    <Card>
      <CardHeader>
        <Icon aria-hidden="true" className="size-5 text-brand-orange" />
        <CardTitle>{request.title}</CardTitle>
        <CardDescription>
          {request.offer} / {formatDate(request.updatedAt, locale)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-3">
          <WorkStatusBadge status={request.status} />
          <Button asChild size="compact" variant="outline">
            <Link href={href}>{t.open}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SensitiveActionsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const actions = [
    { label: t.deactivate, icon: ShieldAlert },
    { label: t.reset, icon: RotateCcw },
    { label: t.revoke, icon: AlertCircle },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.previewAction}</CardTitle>
        <CardDescription>{locale === "fr" ? "Actions prudentes affichees mais non fonctionnelles dans cette sprint." : "Cautious actions are visible but non-functional in this sprint."}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Dialog key={action.label}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  <Icon aria-hidden="true" />
                  {action.label}
                </Button>
              </DialogTrigger>
              <DialogContent className="border-brand-border bg-white">
                <DialogHeader>
                  <DialogTitle>{action.label}</DialogTitle>
                  <DialogDescription>{locale === "fr" ? "Cette action exige un service backend connecte, une autorisation serveur et un audit. Elle reste desactivee." : "This action requires a connected backend service, server authorization and audit. It remains disabled."}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button disabled type="button" variant="danger">
                    {t.notAvailable}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )
        })}
      </CardContent>
    </Card>
  )
}

function InfoCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <Icon aria-hidden="true" className="size-5 text-brand-orange" />
        <p className="mt-4 text-sm font-semibold text-brand-slate">{label}</p>
        <p className="mt-2 font-heading text-xl font-bold text-brand-ink">{value}</p>
      </CardContent>
    </Card>
  )
}

function Field({ children, id, label }: { children: ReactNode; id: string; label: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-brand-slate">{label}</span>
      <span className="font-semibold text-brand-ink">{value}</span>
    </div>
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
    <AccountFrame current={t.notAvailable} lead={t.notFound} locale={locale} title={t.notAvailable}>
      <EmptyCard body={t.notFound} title={t.notAvailable} />
      <Button asChild className="w-fit" variant="outline">
        <Link href={routes.account.dashboard(locale)}>{t.back}</Link>
      </Button>
    </AccountFrame>
  )
}

function LicenseStatusBadge({ status }: { status: AccountLicense["status"] }) {
  const variant = status === "active" ? "success" : status === "suspended" ? "orange" : "destructive"
  return <Badge variant={variant}>{status}</Badge>
}

function ActivationStatusBadge({ status }: { status: AccountLicense["activations"][number]["status"] }) {
  const variant = status === "active" ? "success" : status === "deactivated" ? "secondary" : "destructive"
  return <Badge variant={variant}>{status}</Badge>
}

function WorkStatusBadge({ status }: { status: AccountOnboardingRequest["status"] | AccountSupportTicket["status"] }) {
  const variant = status === "closed" ? "success" : status === "needs_customer_action" ? "orange" : status === "in_review" ? "secondary" : "outline"
  return <Badge variant={variant}>{status}</Badge>
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00.000Z`))
}
