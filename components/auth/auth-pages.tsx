import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { AlertCircle, CheckCircle2, Clock3, EyeOff, KeyRound, Loader2, LockKeyhole, Mail, RefreshCw, ShieldCheck, UserRound } from "lucide-react"

import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AuthSubmitButton } from "@/components/auth/auth-submit-button"
import { routes } from "@/config/routes"
import {
  registerWithPasswordAction,
  requestPasswordResetAction,
  resetPasswordAction,
  resendVerificationAction,
  signInWithGoogleAction,
  signInWithPasswordAction,
} from "@/modules/auth/actions"
import type { MagicLinkResult } from "@/modules/auth/account-service"
import type { Locale } from "@/src/i18n/locales"

export type AuthPageKind = "login" | "register" | "forgot-password" | "reset-password" | "verify-email"

type AuthCopy = {
  eyebrow: string
  title: string
  lead: string
  previewTitle: string
  previewBody: string
  googleSignIn: string
  passwordSeparator: string
  email: string
  password: string
  name: string
  confirmPassword: string
  remember: string
  forgotPassword: string
  signIn: string
  createAccount: string
  sendReset: string
  updatePassword: string
  resendEmail: string
  backToLogin: string
  loginLink: string
  registerLink: string
  termsNote: string
  successSafe: string
  passwordRules: string
  missingToken: string
  disabledState: string
  loadingState: string
  errorState: string
  disabledBody: string
  loadingBody: string
  errorBody: string
  pending: string
  verified: string
  expired: string
  resendAvailable: string
  pendingBody: string
  verifiedBody: string
  expiredBody: string
  resendBody: string
  accountLink: string
  pendingSubmit: string
  sentStatus: string
  invalidCredentials: string
  invalidPassword: string
  passwordUpdated: string
  invalidToken: string
}

const copy: Record<Locale, AuthCopy> = {
  fr: {
    eyebrow: "Acces compte",
    title: "Connexion",
    lead: "Accedez a vos commandes, licences, telechargements et demandes support lorsque le fournisseur auth sera connecte.",
    previewTitle: "Authentification connectee",
    previewBody:
      "Google OAuth et email/password utilisent une session serveur. L'acces compte reste bloque tant que l'email n'est pas verifie par magic link.",
    googleSignIn: "Continuer avec Google",
    passwordSeparator: "ou avec email et mot de passe",
    email: "Email",
    password: "Mot de passe",
    name: "Nom",
    confirmPassword: "Confirmer le mot de passe",
    remember: "Conserver la session sur cet appareil",
    forgotPassword: "Mot de passe oublie ?",
    signIn: "Se connecter",
    createAccount: "Creer un compte",
    sendReset: "Envoyer les instructions",
    updatePassword: "Mettre a jour le mot de passe",
    resendEmail: "Renvoyer l'email",
    backToLogin: "Retour connexion",
    loginLink: "Deja un compte ? Se connecter",
    registerLink: "Pas encore de compte ? Creer un compte",
    termsNote:
      "L'acceptation des documents applicables sera capturee dans le flux approuve. Cette preview ne cree pas d'engagement legal.",
    successSafe:
      "Si un compte correspond a cette adresse, les instructions seront envoyees par le fournisseur connecte.",
    passwordRules: "Utilisez un mot de passe long, unique, avec lettres, chiffres et symbole.",
    missingToken: "Lien manquant ou expire: l'etat sera valide par le fournisseur auth connecte.",
    disabledState: "Etat desactive",
    loadingState: "Etat chargement",
    errorState: "Etat erreur",
    disabledBody: "Le CTA reste desactive tant que le provider n'est pas connecte.",
    loadingBody: "Le spinner represente une soumission future sans persistance locale.",
    errorBody: "Les erreurs restent generiques et ne revelent pas si un compte existe.",
    pending: "En attente",
    verified: "Verifie",
    expired: "Lien expire",
    resendAvailable: "Renvoi disponible",
    pendingBody: "La verification attend une action depuis l'email recu.",
    verifiedBody: "Le compte pourra continuer vers l'espace client apres validation.",
    expiredBody: "Un lien expire ne revele aucune information sensible.",
    resendBody: "Le renvoi restera limite par le fournisseur connecte.",
    accountLink: "Espace compte",
    pendingSubmit: "Traitement...",
    sentStatus: "Si l'adresse est eligible, un email securise vient d'etre envoye.",
    invalidCredentials: "Connexion impossible. Verifiez vos informations ou votre verification email.",
    invalidPassword: "Le mot de passe doit respecter les regles et les deux champs doivent correspondre.",
    passwordUpdated: "Mot de passe mis a jour. Vous pouvez vous connecter.",
    invalidToken: "Lien invalide ou deja utilise.",
  },
  en: {
    eyebrow: "Account access",
    title: "Sign in",
    lead: "Access orders, licenses, downloads and support requests once the authentication provider is connected.",
    previewTitle: "Connected authentication",
    previewBody:
      "Google OAuth and email/password use a server session. Account access remains blocked until the email is verified by magic link.",
    googleSignIn: "Continue with Google",
    passwordSeparator: "or use email and password",
    email: "Email",
    password: "Password",
    name: "Name",
    confirmPassword: "Confirm password",
    remember: "Keep this device signed in",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",
    createAccount: "Create account",
    sendReset: "Send reset instructions",
    updatePassword: "Update password",
    resendEmail: "Resend email",
    backToLogin: "Back to login",
    loginLink: "Already have an account? Sign in",
    registerLink: "No account yet? Create account",
    termsNote:
      "Applicable document acceptance will be captured in the approved flow. This preview creates no legal commitment.",
    successSafe:
      "If an account matches this address, instructions will be sent by the connected provider.",
    passwordRules: "Use a long, unique password with letters, numbers and a symbol.",
    missingToken: "Missing or expired link: the connected auth provider will validate this state.",
    disabledState: "Disabled state",
    loadingState: "Loading state",
    errorState: "Error state",
    disabledBody: "The CTA remains disabled until the provider is connected.",
    loadingBody: "The spinner represents future submission without local persistence.",
    errorBody: "Errors stay generic and do not reveal whether an account exists.",
    pending: "Pending",
    verified: "Verified",
    expired: "Expired link",
    resendAvailable: "Resend available",
    pendingBody: "Verification is waiting for action from the received email.",
    verifiedBody: "The account can continue to the customer area after validation.",
    expiredBody: "An expired link reveals no sensitive information.",
    resendBody: "Resend remains limited by the connected provider.",
    accountLink: "Account area",
    pendingSubmit: "Processing...",
    sentStatus: "If the address is eligible, a secure email has been sent.",
    invalidCredentials: "Sign-in failed. Check your details or email verification.",
    invalidPassword: "The password must follow the rules and both fields must match.",
    passwordUpdated: "Password updated. You can sign in.",
    invalidToken: "Invalid or already used link.",
  },
}

const pageMeta = {
  login: {
    title: { fr: "Connexion", en: "Sign in" },
    lead: {
      fr: "Connectez-vous a votre espace client lorsque le provider auth production sera disponible.",
      en: "Sign in to your customer area once the production auth provider is available.",
    },
    icon: LockKeyhole,
  },
  register: {
    title: { fr: "Creer un compte", en: "Create account" },
    lead: {
      fr: "Preparez l'identite client qui recevra commandes, licences et acces officiels.",
      en: "Prepare the customer identity that will receive orders, licenses and official access.",
    },
    icon: UserRound,
  },
  "forgot-password": {
    title: { fr: "Reinitialiser le mot de passe", en: "Reset password access" },
    lead: {
      fr: "Demandez des instructions sans reveler si une adresse email existe.",
      en: "Request instructions without revealing whether an email address exists.",
    },
    icon: Mail,
  },
  "reset-password": {
    title: { fr: "Nouveau mot de passe", en: "New password" },
    lead: {
      fr: "Definissez un mot de passe apres validation du lien par le provider connecte.",
      en: "Set a password after the connected provider validates the link.",
    },
    icon: KeyRound,
  },
  "verify-email": {
    title: { fr: "Verification email", en: "Email verification" },
    lead: {
      fr: "Suivez l'etat de verification sans exposer d'information sensible.",
      en: "Follow verification state without exposing sensitive information.",
    },
    icon: ShieldCheck,
  },
} satisfies Record<AuthPageKind, { title: Record<Locale, string>; lead: Record<Locale, string>; icon: LucideIcon }>

export function AuthPageContent({
  kind,
  locale,
  status,
  email,
  token,
  verificationResult,
}: {
  kind: AuthPageKind
  locale: Locale
  status?: string
  email?: string
  token?: string
  verificationResult?: MagicLinkResult
}) {
  const t = copy[locale]
  const meta = pageMeta[kind]
  const Icon = meta.icon

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <Card className="border-marketing-border bg-marketing-card text-marketing-foreground shadow-panel">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge className="border-marketing-border bg-marketing-card-subtle text-marketing-muted">{t.eyebrow}</Badge>
              <h1 className="mt-5 font-heading text-3xl font-extrabold text-marketing-foreground sm:text-4xl">
                {meta.title[locale]}
              </h1>
              <p className="mt-3 max-w-2xl leading-7 text-marketing-muted">{meta.lead[locale]}</p>
            </div>
            <div className="hidden rounded-xl border border-marketing-border bg-marketing-card-subtle p-3 text-marketing-accent sm:block">
              <Icon aria-hidden="true" className="size-6" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PreviewAlert locale={locale} />
          <Separator className="my-6 bg-marketing-border" />
          <StatusAlert locale={locale} status={status} verificationResult={verificationResult} />
          {kind === "login" ? <LoginForm locale={locale} /> : null}
          {kind === "register" ? <RegisterForm locale={locale} /> : null}
          {kind === "forgot-password" ? <ForgotPasswordForm locale={locale} /> : null}
          {kind === "reset-password" ? <ResetPasswordForm email={email} locale={locale} token={token} /> : null}
          {kind === "verify-email" ? <VerifyEmailPanel email={email} locale={locale} /> : null}
        </CardContent>
      </Card>

      <AuthStatePanel locale={locale} />
    </main>
  )
}

function PreviewAlert({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <Alert className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground">
      <div className="flex gap-3">
        <EyeOff aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-warning" />
        <div>
          <p className="font-semibold text-marketing-foreground">{t.previewTitle}</p>
          <p className="mt-1 text-sm leading-6 text-marketing-muted">{t.previewBody}</p>
        </div>
      </div>
    </Alert>
  )
}

function LoginForm({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <div className="grid gap-5">
      <form action={signInWithGoogleAction}>
        <input name="locale" type="hidden" value={locale} />
        <AuthSubmitButton label={t.googleSignIn} pendingLabel={t.pendingSubmit} variant="outline" />
      </form>
      <div className="flex items-center gap-3 text-xs uppercase text-marketing-muted">
        <Separator className="flex-1 bg-marketing-border" />
        <span>{t.passwordSeparator}</span>
        <Separator className="flex-1 bg-marketing-border" />
      </div>
      <form action={signInWithPasswordAction} className="grid gap-5">
        <input name="locale" type="hidden" value={locale} />
        <AuthField autoComplete="email" icon={Mail} id="auth-email" label={t.email} name="email" required type="email" />
        <AuthField autoComplete="current-password" icon={LockKeyhole} id="auth-password" label={t.password} name="password" required type="password" />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-marketing-muted" htmlFor="auth-remember">
            <Checkbox id="auth-remember" name="remember" />
            <span>{t.remember}</span>
          </label>
          <Link className="font-semibold text-marketing-accent hover:text-marketing-foreground" href={routes.auth.forgotPassword(locale)}>
            {t.forgotPassword}
          </Link>
        </div>
        <AuthSubmitButton label={t.signIn} pendingLabel={t.pendingSubmit} />
      </form>
      <AuthFooterLink href={routes.auth.register(locale)} label={t.registerLink} />
    </div>
  )
}

function RegisterForm({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <div className="grid gap-5">
      <form action={signInWithGoogleAction}>
        <input name="locale" type="hidden" value={locale} />
        <AuthSubmitButton label={t.googleSignIn} pendingLabel={t.pendingSubmit} variant="outline" />
      </form>
      <div className="flex items-center gap-3 text-xs uppercase text-marketing-muted">
        <Separator className="flex-1 bg-marketing-border" />
        <span>{t.passwordSeparator}</span>
        <Separator className="flex-1 bg-marketing-border" />
      </div>
      <form action={registerWithPasswordAction} className="grid gap-5">
        <input name="locale" type="hidden" value={locale} />
        <AuthField autoComplete="name" icon={UserRound} id="auth-name" label={t.name} name="name" />
        <AuthField autoComplete="email" icon={Mail} id="auth-email" label={t.email} name="email" required type="email" />
        <AuthField autoComplete="new-password" icon={LockKeyhole} id="auth-password" label={t.password} name="password" required type="password" />
        <AuthField autoComplete="new-password" icon={LockKeyhole} id="auth-confirm-password" label={t.confirmPassword} name="confirmPassword" required type="password" />
        <p className="rounded-lg border border-marketing-border bg-marketing-card-subtle px-3 py-3 text-sm leading-6 text-marketing-muted">
          {t.termsNote}
        </p>
        <AuthSubmitButton label={t.createAccount} pendingLabel={t.pendingSubmit} />
      </form>
      <AuthFooterLink href={routes.auth.login(locale)} label={t.loginLink} />
    </div>
  )
}

function ForgotPasswordForm({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <div className="grid gap-5">
      <form action={requestPasswordResetAction} className="grid gap-5">
        <input name="locale" type="hidden" value={locale} />
        <AuthField autoComplete="email" icon={Mail} id="auth-email" label={t.email} name="email" required type="email" />
        <AuthSubmitButton label={t.sendReset} pendingLabel={t.pendingSubmit} />
      </form>
      <Alert className="border-marketing-success/30 bg-marketing-card-subtle text-marketing-foreground" variant="success">
        <div className="flex gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-success" />
          <p className="text-sm leading-6 text-marketing-muted">{t.successSafe}</p>
        </div>
      </Alert>
      <AuthFooterLink href={routes.auth.login(locale)} label={t.backToLogin} />
    </div>
  )
}

function ResetPasswordForm({ email = "", locale, token = "" }: { email?: string; locale: Locale; token?: string }) {
  const t = copy[locale]
  const hasToken = Boolean(email && token)

  return (
    <div className="grid gap-5">
      {!hasToken ? <WarningAlert message={t.missingToken} /> : null}
      <form action={resetPasswordAction} className="grid gap-5">
        <input name="locale" type="hidden" value={locale} />
        <input name="email" type="hidden" value={email} />
        <input name="token" type="hidden" value={token} />
        <AuthField autoComplete="new-password" icon={LockKeyhole} id="auth-password" label={t.password} name="password" required type="password" />
        <AuthField autoComplete="new-password" icon={LockKeyhole} id="auth-confirm-password" label={t.confirmPassword} name="confirmPassword" required type="password" />
        <AuthSubmitButton label={t.updatePassword} pendingLabel={t.pendingSubmit} />
      </form>
      <p className="rounded-lg border border-marketing-border bg-marketing-card-subtle px-3 py-3 text-sm leading-6 text-marketing-muted">
        {t.passwordRules}
      </p>
      <AuthFooterLink href={routes.auth.login(locale)} label={t.backToLogin} />
    </div>
  )
}

function VerifyEmailPanel({ email = "", locale }: { email?: string; locale: Locale }) {
  const t = copy[locale]
  const statuses = [
    { title: t.pending, body: t.pendingBody, icon: Clock3, tone: "text-marketing-warning" },
    { title: t.verified, body: t.verifiedBody, icon: CheckCircle2, tone: "text-marketing-success" },
    { title: t.expired, body: t.expiredBody, icon: AlertCircle, tone: "text-marketing-warning" },
    { title: t.resendAvailable, body: t.resendBody, icon: RefreshCw, tone: "text-marketing-accent" },
  ] as const

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {statuses.map((status) => {
          const Icon = status.icon

          return (
            <div className="rounded-xl border border-marketing-border bg-marketing-card-subtle p-4" key={status.title}>
              <Icon aria-hidden="true" className={`size-5 ${status.tone}`} />
              <h2 className="mt-3 font-heading text-lg font-bold text-marketing-foreground">{status.title}</h2>
              <p className="mt-2 text-sm leading-6 text-marketing-muted">{status.body}</p>
            </div>
          )
        })}
      </div>
      <form action={resendVerificationAction} className="grid gap-3">
        <input name="locale" type="hidden" value={locale} />
        <AuthField autoComplete="email" defaultValue={email} icon={Mail} id="auth-email" label={t.email} name="email" required type="email" />
        <AuthSubmitButton label={t.resendEmail} pendingLabel={t.pendingSubmit} />
      </form>
      <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <Link className="text-marketing-accent hover:text-marketing-foreground" href={routes.auth.login(locale)}>
          {t.backToLogin}
        </Link>
        <Link className="text-marketing-accent hover:text-marketing-foreground" href={routes.account.dashboard(locale)}>
          {t.accountLink}
        </Link>
      </div>
    </div>
  )
}

function AuthField({
  autoComplete = "off",
  defaultValue,
  icon: Icon,
  id,
  label,
  name,
  required = false,
  type = "text",
}: {
  autoComplete?: string
  defaultValue?: string
  icon: LucideIcon
  id: string
  label: string
  name: string
  required?: boolean
  type?: string
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-marketing-foreground" htmlFor={id}>
        {label}
      </Label>
      <div className="flex items-center gap-3 rounded-lg border border-marketing-border bg-marketing-background px-3 py-2">
        <Icon aria-hidden="true" className="size-4 shrink-0 text-marketing-muted" />
        <Input
          autoComplete={autoComplete}
          className="h-9 border-0 bg-transparent px-0 py-0 text-marketing-foreground shadow-none placeholder:text-marketing-muted focus-visible:outline-none"
          defaultValue={defaultValue}
          id={id}
          name={name}
          required={required}
          type={type}
        />
      </div>
    </div>
  )
}

function StatusAlert({
  locale,
  status,
  verificationResult,
}: {
  locale: Locale
  status?: string
  verificationResult?: MagicLinkResult
}) {
  const t = copy[locale]
  const message =
    verificationResult === "verified"
      ? t.verifiedBody
      : verificationResult === "expired"
        ? t.expiredBody
        : verificationResult === "invalid"
          ? t.invalidToken
          : status === "sent"
            ? t.sentStatus
            : status === "invalid"
              ? t.invalidCredentials
              : status === "invalid-password"
                ? t.invalidPassword
                : status === "password-updated"
                  ? t.passwordUpdated
                  : undefined

  if (!message) {
    return null
  }

  return (
    <Alert className="mb-6 border-marketing-success/30 bg-marketing-card-subtle text-marketing-foreground" variant="success">
      <div className="flex gap-3">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-success" />
        <p className="text-sm leading-6 text-marketing-muted">{message}</p>
      </div>
    </Alert>
  )
}

function WarningAlert({ message }: { message: string }) {
  return (
    <Alert className="border-marketing-warning/30 bg-marketing-card-subtle text-marketing-foreground" variant="warning">
      <div className="flex gap-3">
        <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-marketing-warning" />
        <p className="text-sm leading-6 text-marketing-muted">{message}</p>
      </div>
    </Alert>
  )
}

function AuthFooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="text-center text-sm font-semibold text-marketing-accent hover:text-marketing-foreground" href={href}>
      {label}
    </Link>
  )
}

function AuthStatePanel({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const states = [
    { title: t.disabledState, body: t.disabledBody, icon: EyeOff },
    { title: t.loadingState, body: t.loadingBody, icon: Loader2 },
    { title: t.errorState, body: t.errorBody, icon: AlertCircle },
  ] as const

  return (
    <aside className="grid gap-4 lg:content-start">
      {states.map((state) => {
        const Icon = state.icon

        return (
          <Card className="border-marketing-border bg-marketing-card-subtle text-marketing-foreground" key={state.title}>
            <CardContent className="p-4">
              <Icon aria-hidden="true" className="size-5 text-marketing-accent" />
              <h2 className="mt-3 font-heading text-base font-bold text-marketing-foreground">{state.title}</h2>
              <p className="mt-2 text-sm leading-6 text-marketing-muted">{state.body}</p>
            </CardContent>
          </Card>
        )
      })}
    </aside>
  )
}
