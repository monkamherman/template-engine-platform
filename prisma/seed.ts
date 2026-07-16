import { BillingMode, EntitlementSource, OfferType, PrismaClient, ProductStatus, Role } from "@prisma/client";

import { issueLicenseForEntitlement, parseLicenseEnvironment } from "../modules/licensing";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.upsert({
    where: { slug: "woo-app-theme" },
    update: {
      name: "Woo App Template Engine",
      status: ProductStatus.ACTIVE,
    },
    create: {
      slug: "woo-app-theme",
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

  let starterOfferId = "";

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

    if (offer.code === "STARTER") {
      starterOfferId = savedOffer.id;
    }

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

  if (process.env.SEED_DEV_LICENSE === "true") {
    const env = parseLicenseEnvironment(process.env);
    const user = await prisma.user.upsert({
      where: { email: "dev-license-customer@example.test" },
      update: { status: "ACTIVE" },
      create: {
        email: "dev-license-customer@example.test",
        name: "Dev License Customer",
        status: "ACTIVE",
      },
    });

    await prisma.userRole.upsert({
      where: {
        userId_role: {
          userId: user.id,
          role: Role.CUSTOMER,
        },
      },
      update: {},
      create: {
        userId: user.id,
        role: Role.CUSTOMER,
      },
    });

    const entitlement = await prisma.entitlement.create({
      data: {
        userId: user.id,
        offerId: starterOfferId,
        status: "ACTIVE",
        source: EntitlementSource.MANUAL,
      },
    });
    const license = await issueLicenseForEntitlement({
      actor: { id: "seed", type: "system" },
      entitlementId: entitlement.id,
      env,
      prisma,
      reason: "Local development seed license",
    });

    console.warn("Development license generated. Do not use this key outside local development.");
    console.warn(`DEV_LICENSE_KEY=${license.displayKey}`);
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
