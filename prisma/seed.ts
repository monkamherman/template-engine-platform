import { BillingMode, OfferType, PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.upsert({
    where: { slug: "woo-app-template-engine" },
    update: {
      name: "Woo App Template Engine",
      status: ProductStatus.ACTIVE,
    },
    create: {
      slug: "woo-app-template-engine",
      name: "Woo App Template Engine",
      description: "Commercial WooCommerce template engine license.",
      status: ProductStatus.ACTIVE,
    },
  });

  const offers = [
    {
      code: "STARTER",
      name: "Starter",
      type: OfferType.STARTER,
      billingMode: BillingMode.ONE_TIME,
      activationLimit: 1,
      amountMinor: 4900,
    },
    {
      code: "PRO",
      name: "Pro",
      type: OfferType.PRO,
      billingMode: BillingMode.ONE_TIME,
      activationLimit: 1,
      amountMinor: 14900,
    },
    {
      code: "MANAGED",
      name: "Managed",
      type: OfferType.MANAGED,
      billingMode: BillingMode.MANUAL_CONTRACT,
      activationLimit: 1,
      amountMinor: 29900,
    },
  ];

  for (const offer of offers) {
    const savedOffer = await prisma.offer.upsert({
      where: { code: offer.code },
      update: {
        name: offer.name,
        status: ProductStatus.ACTIVE,
        activationLimit: offer.activationLimit,
      },
      create: {
        productId: product.id,
        code: offer.code,
        name: offer.name,
        type: offer.type,
        billingMode: offer.billingMode,
        activationLimit: offer.activationLimit,
        status: ProductStatus.ACTIVE,
      },
    });

    await prisma.price.upsert({
      where: {
        provider_providerPriceId: {
          provider: "mock",
          providerPriceId: `dev_${offer.code.toLowerCase()}_eur`,
        },
      },
      update: {
        amountMinor: offer.amountMinor,
        active: true,
      },
      create: {
        offerId: savedOffer.id,
        currency: "EUR",
        amountMinor: offer.amountMinor,
        provider: "mock",
        providerPriceId: `dev_${offer.code.toLowerCase()}_eur`,
        active: true,
      },
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
