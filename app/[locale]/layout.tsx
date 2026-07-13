import { notFound } from "next/navigation";

const supportedLocales = ["fr", "en"] as const;

type Locale = (typeof supportedLocales)[number];

function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return children;
}
