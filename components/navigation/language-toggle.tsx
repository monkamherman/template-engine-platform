"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { supportedLocales, type Locale } from "@/src/i18n/locales"

type LanguageToggleProps = {
  locale: Locale
  compact?: boolean
}

export function LanguageToggle({ locale, compact = false }: LanguageToggleProps) {
  const pathname = usePathname()

  return (
    <div
      aria-label={locale === "fr" ? "Changer de langue" : "Change language"}
      className={cn(
        "inline-flex items-center rounded-md border border-brand-border bg-white p-1 text-xs font-extrabold uppercase",
        compact ? "w-fit" : "shrink-0",
      )}
    >
      {supportedLocales.map((targetLocale) => {
        const isActive = targetLocale === locale

        return (
          <Link
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-sm px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
              isActive
                ? "bg-brand-ink text-white"
                : "text-brand-slate hover:bg-brand-orange-soft hover:text-brand-ink",
            )}
            href={localizePath(pathname, targetLocale)}
            key={targetLocale}
          >
            {targetLocale}
          </Link>
        )
      })}
    </div>
  )
}

function localizePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) {
    return `/${locale}`
  }

  if (supportedLocales.includes(segments[0] as Locale)) {
    return `/${[locale, ...segments.slice(1)].join("/")}`
  }

  return `/${[locale, ...segments].join("/")}`
}
