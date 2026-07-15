import type { Prisma, PrismaClient } from "@prisma/client"

import { LICENSE_ENCRYPTION_KEY_VERSION, LICENSE_HASH_VERSION } from "@/modules/licensing/constants"
import { canonicalizeLicenseKey, makeKeyParts } from "@/modules/licensing/crypto/key-format"
import { verifyLicenseKeyHash } from "@/modules/licensing/crypto/key-hash"
import { signLicenseLease } from "@/modules/licensing/crypto/lease-signer"
import { normalizeActivationDomain } from "@/modules/licensing/domain/domain-normalization"
import { isActivationLimitReached } from "@/modules/licensing/domain/license-policy"
import type { LicenseEnvironment } from "@/modules/licensing/env"
import { LicensingError } from "@/modules/licensing/errors"
import type { ActivateLicenseRequest, DeactivateLicenseRequest, LicenseServiceData, ValidateLicenseRequest } from "@/modules/licensing/schemas"

type LicenseWithRelations = Prisma.LicenseGetPayload<{
  include: {
    entitlement: {
      include: {
        offer: {
          include: {
            product: true
          }
        }
      }
    }
  }
}>

type Tx = Prisma.TransactionClient

export async function activateLicense({
  env,
  input,
  prisma,
  requestId,
}: {
  env: LicenseEnvironment
  input: ActivateLicenseRequest
  prisma: PrismaClient
  requestId: string
}): Promise<LicenseServiceData> {
  const { license, canonicalKey } = await findVerifiedLicense(prisma, input.licenseKey, env)
  const normalizedDomain = normalizeActivationDomain(input.siteUrl)
  assertLicenseCanServeRequest(license, input.productSlug)

  return prisma.$transaction(async (tx) => {
    const existing = await tx.licenseActivation.findUnique({
      where: {
        licenseId_installationId: {
          licenseId: license.id,
          installationId: input.installationId,
        },
      },
    })

    if (existing) {
      if (existing.environment !== input.environment || existing.normalizedDomain !== normalizedDomain) {
        throw new LicensingError("DOMAIN_MISMATCH")
      }

      const activation =
        existing.status === "ACTIVE"
          ? existing
          : await tx.licenseActivation.update({
              where: { id: existing.id },
              data: {
                status: "ACTIVE",
                siteUrl: input.siteUrl,
                deactivatedAt: null,
                lastSeenAt: new Date(),
              },
            })

      await audit(tx, "ACTIVATION_CREATED", "LicenseActivation", activation.id, requestId)
      return responseForActiveLicense(license, activation, env)
    }

    const activeCount = await tx.licenseActivation.count({
      where: {
        licenseId: license.id,
        environment: input.environment,
        status: "ACTIVE",
      },
    })

    if (
      isActivationLimitReached({
        activeCount,
        environment: input.environment,
        productionLimit: license.productionLimit,
        stagingLimit: license.stagingLimit,
      })
    ) {
      throw new LicensingError(input.environment === "PRODUCTION" ? "PRODUCTION_LIMIT_REACHED" : "STAGING_LIMIT_REACHED")
    }

    const activation = await tx.licenseActivation.create({
      data: {
        licenseId: license.id,
        installationId: input.installationId,
        environment: input.environment,
        normalizedDomain,
        siteUrl: input.siteUrl,
        status: "ACTIVE",
        environmentMetadata: sanitizeEnvironmentMetadata(input),
        lastSeenAt: new Date(),
      },
    })

    await tx.license.update({
      where: { id: license.id },
      data: { lastValidatedAt: new Date() },
    })
    await audit(tx, "ACTIVATION_CREATED", "LicenseActivation", activation.id, requestId)

    void canonicalKey
    return responseForActiveLicense(license, activation, env)
  })
}

export async function validateLicense({
  env,
  input,
  prisma,
  requestId,
}: {
  env: LicenseEnvironment
  input: ValidateLicenseRequest
  prisma: PrismaClient
  requestId: string
}): Promise<LicenseServiceData> {
  const { license } = await findVerifiedLicense(prisma, input.licenseKey, env)
  const normalizedDomain = normalizeActivationDomain(input.siteUrl)
  assertLicenseCanServeRequest(license, input.productSlug)

  const activation = await prisma.licenseActivation.findUnique({
    where: {
      licenseId_installationId: {
        licenseId: license.id,
        installationId: input.installationId,
      },
    },
  })

  if (!activation || activation.status !== "ACTIVE") {
    throw new LicensingError("INVALID_LICENSE")
  }

  if (activation.environment !== input.environment || activation.normalizedDomain !== normalizedDomain) {
    throw new LicensingError("DOMAIN_MISMATCH")
  }

  const updatedActivation = await prisma.licenseActivation.update({
    where: { id: activation.id },
    data: { lastSeenAt: new Date() },
  })
  await prisma.license.update({
    where: { id: license.id },
    data: { lastValidatedAt: new Date() },
  })
  await audit(prisma, "LICENSE_VALIDATED", "License", license.id, requestId)

  return responseForActiveLicense(license, updatedActivation, env)
}

export async function deactivateLicense({
  env,
  input,
  prisma,
  requestId,
}: {
  env: LicenseEnvironment
  input: DeactivateLicenseRequest
  prisma: PrismaClient
  requestId: string
}): Promise<Pick<LicenseServiceData, "activation">> {
  const { license } = await findVerifiedLicense(prisma, input.licenseKey, env)
  const normalizedDomain = normalizeActivationDomain(input.siteUrl)

  const activation = await prisma.licenseActivation.findUnique({
    where: {
      licenseId_installationId: {
        licenseId: license.id,
        installationId: input.installationId,
      },
    },
  })

  if (!activation) {
    return {
      activation: {
        installationId: input.installationId,
        status: "DEACTIVATED",
        deactivatedAt: new Date().toISOString(),
      },
    }
  }

  if (activation.environment !== input.environment || activation.normalizedDomain !== normalizedDomain) {
    throw new LicensingError("DOMAIN_MISMATCH")
  }

  const updatedActivation =
    activation.status === "DEACTIVATED"
      ? activation
      : await prisma.licenseActivation.update({
          where: { id: activation.id },
          data: {
            status: "DEACTIVATED",
            deactivatedAt: new Date(),
          },
        })

  await audit(prisma, "ACTIVATION_DEACTIVATED", "LicenseActivation", updatedActivation.id, requestId)

  return {
    activation: {
      installationId: updatedActivation.installationId,
      status: "DEACTIVATED",
      deactivatedAt: updatedActivation.deactivatedAt?.toISOString() ?? new Date().toISOString(),
    },
  }
}

async function findVerifiedLicense(prisma: PrismaClient, licenseKey: string, env: LicenseEnvironment) {
  const canonicalKey = canonicalizeLicenseKey(licenseKey)
  const { keyPrefix } = makeKeyParts(canonicalKey)
  const candidates = await prisma.license.findMany({
    where: {
      keyPrefix,
      hashVersion: LICENSE_HASH_VERSION,
      encryptionKeyVersion: LICENSE_ENCRYPTION_KEY_VERSION,
    },
    include: {
      entitlement: {
        include: {
          offer: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })

  const license = candidates.find((candidate) =>
    verifyLicenseKeyHash(canonicalKey, candidate.secretHash, env.LICENSE_HASH_PEPPER_V1),
  )

  if (!license) {
    throw new LicensingError("INVALID_LICENSE")
  }

  return { canonicalKey, license }
}

function assertLicenseCanServeRequest(license: LicenseWithRelations, productSlug: string) {
  if (license.status !== "ACTIVE" || license.entitlement.status !== "ACTIVE") {
    throw new LicensingError("INVALID_LICENSE")
  }

  if (license.expiresAt && license.expiresAt.getTime() <= Date.now()) {
    throw new LicensingError("INVALID_LICENSE")
  }

  if (license.entitlement.offer.product.slug !== productSlug || license.entitlement.offer.product.status !== "ACTIVE") {
    throw new LicensingError("PRODUCT_MISMATCH")
  }
}

function responseForActiveLicense(
  license: LicenseWithRelations,
  activation: {
    id: string
    installationId: string
    environment: "PRODUCTION" | "STAGING"
    normalizedDomain: string
    status: "ACTIVE" | "DEACTIVATED" | "BLOCKED"
    activatedAt: Date
  },
  env: LicenseEnvironment,
): LicenseServiceData {
  const services = {
    officialUpdates: true,
    protectedDownloads: true,
    support: true,
    updatesUntil: license.entitlement.updateExpiresAt?.toISOString() ?? null,
    supportUntil: license.entitlement.supportExpiresAt?.toISOString() ?? null,
  }
  const lease = signLicenseLease({
    claims: {
      sub: license.id,
      activationId: activation.id,
      installationId: activation.installationId,
      domain: activation.normalizedDomain,
      environment: activation.environment,
      licenseStatus: license.status,
      officialUpdates: services.officialUpdates,
      protectedDownloads: services.protectedDownloads,
      support: services.support,
      updatesUntil: license.entitlement.updateExpiresAt ? Math.floor(license.entitlement.updateExpiresAt.getTime() / 1000) : null,
      supportUntil: license.entitlement.supportExpiresAt ? Math.floor(license.entitlement.supportExpiresAt.getTime() / 1000) : null,
    },
    gracePeriodSeconds: env.LICENSE_GRACE_PERIOD_SECONDS,
    keyId: env.LICENSE_SIGNING_KEY_ID,
    privateKeyPem: env.LICENSE_SIGNING_PRIVATE_KEY_PEM,
    ttlSeconds: env.LICENSE_LEASE_TTL_SECONDS,
  })

  return {
    license: {
      status: license.status,
      keyPrefix: license.keyPrefix,
      keyLast4: license.keyLast4,
      expiresAt: license.expiresAt?.toISOString() ?? null,
    },
    activation: {
      id: activation.id,
      installationId: activation.installationId,
      environment: activation.environment,
      normalizedDomain: activation.normalizedDomain,
      status: activation.status,
      activatedAt: activation.activatedAt.toISOString(),
    },
    services,
    lease,
  }
}

function sanitizeEnvironmentMetadata(input: ActivateLicenseRequest) {
  return {
    themeVersion: input.themeVersion,
    wordpressVersion: input.wordpressVersion ?? null,
    woocommerceVersion: input.woocommerceVersion ?? null,
    phpVersion: input.phpVersion ?? null,
  }
}

async function audit(
  prisma: Pick<Tx, "auditEvent"> | Pick<PrismaClient, "auditEvent">,
  action: string,
  targetType: string,
  targetId: string,
  requestId: string,
) {
  await prisma.auditEvent.create({
    data: {
      action,
      targetType,
      targetId,
      correlationId: requestId,
      summary: {
        source: "license-service",
      },
    },
  })
}
