import { AuthPageContent } from "@/components/auth/auth-pages"

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { locale: rawLocale } = await params
  const { status } = await searchParams
  const locale = rawLocale === "en" ? "en" : "fr"

  return <AuthPageContent kind="login" locale={locale} status={status} />
}
