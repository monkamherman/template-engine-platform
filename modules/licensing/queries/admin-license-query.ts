import type { PrismaClient } from "@prisma/client"

export type AdminLicenseOverview = {
  summary: {
    totalLicenses: number
    activeLicenses: number
    suspendedLicenses: number
    revokedLicenses: number
    expiredLicenses: number
    activeProductionActivations: number
    activeStagingActivations: number
  }
  licenses: Array<{
    id: string
    keyPrefix: string
    keyLast4: string
    keyVersion: number
    status: string
    productName: string
    productSlug: string
    offerName: string
    customerEmail: string
    productionLimit: number
    stagingLimit: number
    activationCount: number
    issuedAt: Date
    lastValidatedAt: Date | null
  }>
  recentActivations: Array<{
    id: string
    licenseId: string
    keyPrefix: string
    environment: string
    normalizedDomain: string
    installationId: string
    status: string
    customerEmail: string
    activatedAt: Date
    lastSeenAt: Date | null
  }>
}

export async function getAdminLicenseOverview(prisma: PrismaClient, take = 10): Promise<AdminLicenseOverview> {
  const [
    totalLicenses,
    activeLicenses,
    suspendedLicenses,
    revokedLicenses,
    expiredLicenses,
    activeProductionActivations,
    activeStagingActivations,
    licenses,
    recentActivations,
  ] = await prisma.$transaction([
    prisma.license.count(),
    prisma.license.count({ where: { status: "ACTIVE" } }),
    prisma.license.count({ where: { status: "SUSPENDED" } }),
    prisma.license.count({ where: { status: "REVOKED" } }),
    prisma.license.count({ where: { status: "EXPIRED" } }),
    prisma.licenseActivation.count({ where: { status: "ACTIVE", environment: "PRODUCTION" } }),
    prisma.licenseActivation.count({ where: { status: "ACTIVE", environment: "STAGING" } }),
    prisma.license.findMany({
      orderBy: { issuedAt: "desc" },
      take,
      select: {
        id: true,
        keyPrefix: true,
        keyLast4: true,
        keyVersion: true,
        status: true,
        productionLimit: true,
        stagingLimit: true,
        issuedAt: true,
        lastValidatedAt: true,
        _count: { select: { activations: true } },
        entitlement: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
            offer: {
              select: {
                name: true,
                product: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.licenseActivation.findMany({
      orderBy: { activatedAt: "desc" },
      take,
      select: {
        id: true,
        licenseId: true,
        environment: true,
        normalizedDomain: true,
        installationId: true,
        status: true,
        activatedAt: true,
        lastSeenAt: true,
        license: {
          select: {
            keyPrefix: true,
            entitlement: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
  ])

  return {
    summary: {
      totalLicenses,
      activeLicenses,
      suspendedLicenses,
      revokedLicenses,
      expiredLicenses,
      activeProductionActivations,
      activeStagingActivations,
    },
    licenses: licenses.map((license) => ({
      id: license.id,
      keyPrefix: license.keyPrefix,
      keyLast4: license.keyLast4,
      keyVersion: license.keyVersion,
      status: license.status,
      productName: license.entitlement.offer.product.name,
      productSlug: license.entitlement.offer.product.slug,
      offerName: license.entitlement.offer.name,
      customerEmail: license.entitlement.user.email,
      productionLimit: license.productionLimit,
      stagingLimit: license.stagingLimit,
      activationCount: license._count.activations,
      issuedAt: license.issuedAt,
      lastValidatedAt: license.lastValidatedAt,
    })),
    recentActivations: recentActivations.map((activation) => ({
      id: activation.id,
      licenseId: activation.licenseId,
      keyPrefix: activation.license.keyPrefix,
      environment: activation.environment,
      normalizedDomain: activation.normalizedDomain,
      installationId: activation.installationId,
      status: activation.status,
      customerEmail: activation.license.entitlement.user.email,
      activatedAt: activation.activatedAt,
      lastSeenAt: activation.lastSeenAt,
    })),
  }
}
