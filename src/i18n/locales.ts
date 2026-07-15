export const supportedLocales = ["fr", "en"] as const

export type Locale = (typeof supportedLocales)[number]

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}
