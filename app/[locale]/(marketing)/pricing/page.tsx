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

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">{locale === "fr" ? "Offres" : "Plans"}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {offers[locale].map(([name, description]) => (
            <article key={name} className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
