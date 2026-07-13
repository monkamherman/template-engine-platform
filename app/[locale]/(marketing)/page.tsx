import Link from "next/link";

const copy = {
  fr: {
    badge: "Plateforme commerciale",
    title: "Woo App Template Engine",
    lead: "Une fondation WooCommerce prete a recevoir vos produits, adaptee a votre niche, votre pays, votre langue et votre marche.",
    product: "Voir le produit",
    pricing: "Comparer les offres",
    models: ["Dropshipping", "Stock", "Hybride", "Produits digitaux"],
    paths: [
      ["Starter", "Licence commerciale, documentation et telechargement protege."],
      ["Pro", "Starter avec installation initiale et validation avant mise en ligne."],
      ["Managed", "Accompagnement continu pour mises a jour, staging et rollback."],
    ],
  },
  en: {
    badge: "Commercial platform",
    title: "Woo App Template Engine",
    lead: "A WooCommerce store foundation ready for products, adapted by niche, country, language and market.",
    product: "View product",
    pricing: "Compare plans",
    models: ["Dropshipping", "Stock", "Hybrid", "Digital products"],
    paths: [
      ["Starter", "Commercial license, documentation and protected download."],
      ["Pro", "Starter plus initial installation and validation before launch."],
      ["Managed", "Ongoing update, staging and rollback support."],
    ],
  },
} as const;

export default async function MarketingHome({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const t = copy[locale];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 sm:py-16">
        <nav className="flex items-center justify-between gap-4 text-sm">
          <Link href={`/${locale}`} className="font-bold">
            Woo App
          </Link>
          <div className="flex gap-4">
            <Link className="underline-offset-4 hover:underline" href={`/${locale}/product`}>
              {t.product}
            </Link>
            <Link className="underline-offset-4 hover:underline" href={`/${locale}/pricing`}>
              {t.pricing}
            </Link>
          </div>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {t.badge}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">{t.lead}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                href={`/${locale}/pricing`}
              >
                {t.pricing}
              </Link>
              <Link
                className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                href={`/${locale}/product`}
              >
                {t.product}
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            {t.models.map((model) => (
              <div key={model} className="rounded-md border border-slate-200 px-4 py-3 text-sm font-medium">
                {model}
              </div>
            ))}
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {t.paths.map(([name, description]) => (
            <article key={name} className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
