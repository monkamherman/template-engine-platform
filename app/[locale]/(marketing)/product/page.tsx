const copy = {
  fr: {
    title: "Fondation WooCommerce commercialisable",
    lead: "Le produit fournit une base de boutique structuree pour vendre en dropshipping, stock, modele hybride ou produits digitaux.",
    points: ["Architecture modulaire", "Adaptation par marche", "Livraison protegee", "Licence commerciale"],
  },
  en: {
    title: "Commercial WooCommerce foundation",
    lead: "The product provides a structured store foundation for dropshipping, stock, hybrid or digital-product models.",
    points: ["Modular architecture", "Market adaptation", "Protected delivery", "Commercial license"],
  },
} as const;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>;
}) {
  const { locale } = await params;
  const activeLocale = locale === "en" ? "en" : "fr";
  const t = copy[activeLocale];

  return (
    <main className="min-h-screen bg-white px-5 py-12 text-slate-950">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{t.lead}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {t.points.map((point) => (
            <li key={point} className="rounded-md border border-slate-200 p-4 font-medium">
              {point}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
