import Link from "next/link";

import { routes } from "@/config/routes";

const offers = {
  fr: [
    ["Starter", "Licence, documentation et telechargement protege."],
    ["Pro", "Installation initiale et validation avant lancement."],
    ["Managed", "Suivi des mises a jour et support d'exploitation."],
  ],
  en: [
    ["Starter", "License, documentation and protected download."],
    ["Pro", "Initial installation and validation before launch."],
    ["Managed", "Update follow-up and operational support."],
  ],
} as const;

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "en" ? "en" : "fr";

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">{activeLocale === "fr" ? "Offres" : "Plans"}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {offers[activeLocale].map(([name, description]) => (
            <article key={name} className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
              <div className="mt-5 grid gap-2 text-sm font-semibold">
                <Link className="text-orange-700 hover:underline" href={routes.legal.commercialTerms(activeLocale)}>
                  {activeLocale === "fr" ? "Conditions commerciales en revue" : "Commercial terms in review"}
                </Link>
                <Link className="text-orange-700 hover:underline" href={routes.legal.supportPolicy(activeLocale)}>
                  {activeLocale === "fr" ? "Politique support" : "Support policy"}
                </Link>
                <Link className="text-orange-700 hover:underline" href={routes.docs.article(activeLocale, "getting-started")}>
                  {activeLocale === "fr" ? "Guide de demarrage" : "Getting-started guide"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
