import { notFound } from "next/navigation"

import { AuthPageContent, type AuthPageKind } from "@/components/auth/auth-pages"
import { verifyEmailTokenFromSearchParams } from "@/modules/auth/actions"

const authPages = ["register", "forgot-password", "reset-password", "verify-email"] as const

function isAuthPage(value: string): value is AuthPageKind {
  return authPages.includes(value as (typeof authPages)[number])
}

export default async function AuthGeneratedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; authPage: string }>
  searchParams: Promise<{ email?: string; status?: string; token?: string }>
}) {
  const { locale: rawLocale, authPage } = await params
  const { email, status, token } = await searchParams
  const locale = rawLocale === "en" ? "en" : "fr"

  if (!isAuthPage(authPage)) {
    notFound()
  }

  const verificationResult =
    authPage === "verify-email" ? await verifyEmailTokenFromSearchParams({ email, token }) : undefined

  return (
    <AuthPageContent
      email={email}
      kind={authPage}
      locale={locale}
      status={status}
      token={token}
      verificationResult={verificationResult}
    />
  )
}

export function generateStaticParams() {
  return ["fr", "en"].flatMap((locale) =>
    ["register", "forgot-password", "reset-password", "verify-email"].map((authPage) => ({
      locale,
      authPage,
    })),
  )
}
