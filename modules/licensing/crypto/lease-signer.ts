import { createSign, createVerify, randomUUID } from "node:crypto"

import {
  LICENSE_LEASE_AUDIENCE,
  LICENSE_LEASE_ISSUER,
  LICENSE_PROTOCOL_VERSION,
} from "@/modules/licensing/constants"
import type { LicenseActivationEnvironment, LicenseLeaseClaims } from "@/modules/licensing/types"

export type SignedLease = {
  token: string
  issuedAt: string
  expiresAt: string
  graceUntil: string
  keyId: string
}

export type VerifiedLease = LicenseLeaseClaims & {
  ver: number
  iss: string
  aud: string
  jti: string
  iat: number
  exp: number
  graceUntil: number
}

export function signLicenseLease({
  claims,
  gracePeriodSeconds,
  keyId,
  privateKeyPem,
  ttlSeconds,
  now = new Date(),
}: {
  claims: LicenseLeaseClaims
  gracePeriodSeconds: number
  keyId: string
  privateKeyPem: string
  ttlSeconds: number
  now?: Date
}): SignedLease {
  const issuedAt = Math.floor(now.getTime() / 1000)
  const expiresAt = issuedAt + ttlSeconds
  const graceUntil = expiresAt + gracePeriodSeconds
  const header = {
    alg: "RS256",
    typ: "TEP-LICENSE-LEASE",
    kid: keyId,
  }
  const payload = {
    ver: LICENSE_PROTOCOL_VERSION,
    iss: LICENSE_LEASE_ISSUER,
    aud: LICENSE_LEASE_AUDIENCE,
    jti: `lease_${randomUUID()}`,
    ...claims,
    iat: issuedAt,
    exp: expiresAt,
    graceUntil,
  }
  const signingInput = `${base64urlJson(header)}.${base64urlJson(payload)}`
  const signature = createSign("RSA-SHA256").update(signingInput).end().sign(privateKeyPem, "base64url")

  return {
    token: `${signingInput}.${signature}`,
    issuedAt: new Date(issuedAt * 1000).toISOString(),
    expiresAt: new Date(expiresAt * 1000).toISOString(),
    graceUntil: new Date(graceUntil * 1000).toISOString(),
    keyId,
  }
}

export function verifyLicenseLease({
  expectedDomain,
  expectedEnvironment,
  expectedInstallationId,
  expectedKeyId,
  publicKeyPem,
  token,
}: {
  expectedDomain: string
  expectedEnvironment: LicenseActivationEnvironment
  expectedInstallationId: string
  expectedKeyId: string
  publicKeyPem: string
  token: string
}): VerifiedLease {
  const [encodedHeader, encodedPayload, signature] = token.split(".")
  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("Malformed lease token.")
  }

  const header = parseBase64urlJson(encodedHeader) as { alg?: string; typ?: string; kid?: string }
  if (header.alg !== "RS256" || header.typ !== "TEP-LICENSE-LEASE" || header.kid !== expectedKeyId) {
    throw new Error("Unsupported lease header.")
  }

  const signingInput = `${encodedHeader}.${encodedPayload}`
  const valid = createVerify("RSA-SHA256").update(signingInput).end().verify(publicKeyPem, signature, "base64url")
  if (!valid) {
    throw new Error("Invalid lease signature.")
  }

  const payload = parseBase64urlJson(encodedPayload) as VerifiedLease
  if (
    payload.ver !== LICENSE_PROTOCOL_VERSION ||
    payload.iss !== LICENSE_LEASE_ISSUER ||
    payload.aud !== LICENSE_LEASE_AUDIENCE ||
    payload.installationId !== expectedInstallationId ||
    payload.domain !== expectedDomain ||
    payload.environment !== expectedEnvironment ||
    payload.graceUntil < payload.exp ||
    payload.exp <= payload.iat
  ) {
    throw new Error("Invalid lease claims.")
  }

  return payload
}

function base64urlJson(input: unknown) {
  return Buffer.from(JSON.stringify(input), "utf8").toString("base64url")
}

function parseBase64urlJson(input: string) {
  return JSON.parse(Buffer.from(input, "base64url").toString("utf8")) as unknown
}
