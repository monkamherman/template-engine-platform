import type { PrismaClient } from "@prisma/client"

import { LICENSE_ENCRYPTION_KEY_VERSION, LICENSE_HASH_VERSION } from "@/modules/licensing/constants"
import { decryptLicenseKey, encryptLicenseKey } from "@/modules/licensing/crypto/key-encryption"
import { generateLicenseKey } from "@/modules/licensing/crypto/key-format"
import { hashLicenseKey } from "@/modules/licensing/crypto/key-hash"
import type { LicenseEnvironment } from "@/modules/licensing/env"
import { LicensingError } from "@/modules/licensing/errors"
import type { LicenseActor } from "@/modules/licensing/types"

export type PrivilegedLicenseResult = {
  licenseId: string
  entitlementId: string
  displayKey: string
  keyPrefix: string
  keyLast4: string
}

export async function issueLicenseForEntitlement({
  actor,
  entitlementId,
  env,
  prisma,
  reason,
}: {
  actor: LicenseActor
  entitlementId: string
  env: LicenseEnvironment
  prisma: PrismaClient
  reason?: string
}): Promise<PrivilegedLicenseResult> {
  const existing = await prisma.license.findUnique({
    where: { entitlementId },
  })

  if (existing) {
    const displayKey = decryptLicenseKey(
      {
        secretCiphertext: existing.secretCiphertext,
        secretNonce: existing.secretNonce,
        secretAuthTag: existing.secretAuthTag,
      },
      env.LICENSE_ENCRYPTION_KEY_V1,
    )

    return {
      licenseId: existing.id,
      entitlementId: existing.entitlementId,
      displayKey,
      keyPrefix: existing.keyPrefix,
      keyLast4: existing.keyLast4,
    }
  }

  const entitlement = await prisma.entitlement.findUnique({
    where: { id: entitlementId },
    include: { offer: true },
  })

  if (!entitlement || entitlement.status !== "ACTIVE") {
    throw new LicensingError("INVALID_LICENSE", "Entitlement is not eligible for license issuance.")
  }

  const key = generateLicenseKey()
  const encrypted = encryptLicenseKey(key.canonicalKey, env.LICENSE_ENCRYPTION_KEY_V1)
  const license = await prisma.license.create({
    data: {
      entitlementId,
      keyPrefix: key.keyPrefix,
      keyLast4: key.keyLast4,
      secretHash: hashLicenseKey(key.canonicalKey, env.LICENSE_HASH_PEPPER_V1),
      secretCiphertext: encrypted.secretCiphertext,
      secretNonce: encrypted.secretNonce,
      secretAuthTag: encrypted.secretAuthTag,
      encryptionKeyVersion: LICENSE_ENCRYPTION_KEY_VERSION,
      hashVersion: LICENSE_HASH_VERSION,
      keyVersion: 1,
      productionLimit: Math.max(0, entitlement.offer.activationLimit),
      stagingLimit: Math.max(0, Math.min(1, entitlement.offer.activationLimit)),
      status: "ACTIVE",
    },
  })

  await audit(prisma, actor, "LICENSE_ISSUED", "License", license.id, reason)

  return {
    licenseId: license.id,
    entitlementId,
    displayKey: key.displayKey,
    keyPrefix: key.keyPrefix,
    keyLast4: key.keyLast4,
  }
}

export async function revealLicenseKey({
  actor,
  env,
  licenseId,
  prisma,
  reason,
}: {
  actor: LicenseActor
  env: LicenseEnvironment
  licenseId: string
  prisma: PrismaClient
  reason: string
}) {
  assertReason(reason)
  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) throw new LicensingError("INVALID_LICENSE")

  const canonicalKey = decryptLicenseKey(
    {
      secretCiphertext: license.secretCiphertext,
      secretNonce: license.secretNonce,
      secretAuthTag: license.secretAuthTag,
    },
    env.LICENSE_ENCRYPTION_KEY_V1,
  )
  await audit(prisma, actor, "LICENSE_KEY_REVEALED", "License", license.id, reason)

  return canonicalKey
}

export async function rotateLicenseKey({
  actor,
  env,
  licenseId,
  prisma,
  reason,
}: {
  actor: LicenseActor
  env: LicenseEnvironment
  licenseId: string
  prisma: PrismaClient
  reason: string
}): Promise<PrivilegedLicenseResult> {
  assertReason(reason)
  const current = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!current) throw new LicensingError("INVALID_LICENSE")

  const key = generateLicenseKey()
  const encrypted = encryptLicenseKey(key.canonicalKey, env.LICENSE_ENCRYPTION_KEY_V1)
  const license = await prisma.license.update({
    where: { id: licenseId },
    data: {
      keyPrefix: key.keyPrefix,
      keyLast4: key.keyLast4,
      secretHash: hashLicenseKey(key.canonicalKey, env.LICENSE_HASH_PEPPER_V1),
      secretCiphertext: encrypted.secretCiphertext,
      secretNonce: encrypted.secretNonce,
      secretAuthTag: encrypted.secretAuthTag,
      keyVersion: { increment: 1 },
      encryptionKeyVersion: LICENSE_ENCRYPTION_KEY_VERSION,
      hashVersion: LICENSE_HASH_VERSION,
      lastValidatedAt: null,
    },
  })

  await audit(prisma, actor, "LICENSE_KEY_ROTATED", "License", license.id, reason)

  return {
    licenseId: license.id,
    entitlementId: license.entitlementId,
    displayKey: key.displayKey,
    keyPrefix: key.keyPrefix,
    keyLast4: key.keyLast4,
  }
}

export async function suspendLicense(input: StatusChangeInput) {
  return changeLicenseStatus({ ...input, action: "LICENSE_SUSPENDED", status: "SUSPENDED" })
}

export async function reactivateLicense(input: StatusChangeInput) {
  return changeLicenseStatus({ ...input, action: "LICENSE_REACTIVATED", status: "ACTIVE" })
}

export async function revokeLicense(input: StatusChangeInput) {
  return changeLicenseStatus({ ...input, action: "LICENSE_REVOKED", status: "REVOKED", revokedAt: new Date() })
}

export async function changeLicenseLimits({
  actor,
  licenseId,
  prisma,
  productionLimit,
  reason,
  stagingLimit,
}: {
  actor: LicenseActor
  licenseId: string
  prisma: PrismaClient
  productionLimit: number
  reason: string
  stagingLimit: number
}) {
  assertReason(reason)
  if (productionLimit < 0 || stagingLimit < 0) {
    throw new LicensingError("BAD_REQUEST", "License limits cannot be negative.")
  }

  const license = await prisma.license.update({
    where: { id: licenseId },
    data: { productionLimit, stagingLimit },
  })

  await audit(prisma, actor, "LICENSE_LIMIT_CHANGED", "License", license.id, reason)
  return license
}

type StatusChangeInput = {
  actor: LicenseActor
  licenseId: string
  prisma: PrismaClient
  reason: string
}

async function changeLicenseStatus({
  action,
  actor,
  licenseId,
  prisma,
  reason,
  revokedAt,
  status,
}: StatusChangeInput & {
  action: string
  revokedAt?: Date
  status: "ACTIVE" | "SUSPENDED" | "REVOKED"
}) {
  assertReason(reason)
  const license = await prisma.license.update({
    where: { id: licenseId },
    data: { status, revokedAt },
  })

  await audit(prisma, actor, action, "License", license.id, reason)
  return license
}

function assertReason(reason: string) {
  if (!reason.trim()) {
    throw new LicensingError("BAD_REQUEST", "A reason is required for privileged license actions.")
  }
}

async function audit(
  prisma: Pick<PrismaClient, "auditEvent">,
  actor: LicenseActor,
  action: string,
  targetType: string,
  targetId: string,
  reason?: string,
) {
  await prisma.auditEvent.create({
    data: {
      actorUserId: actor.type === "operator" || actor.type === "customer" ? actor.id : null,
      action,
      targetType,
      targetId,
      reason,
      summary: {
        actorType: actor.type,
        source: "license-management",
      },
    },
  })
}
