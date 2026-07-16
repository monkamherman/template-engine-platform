import { createHmac, timingSafeEqual } from "node:crypto"

export function hashLicenseKey(canonicalKey: string, pepper: string) {
  return createHmac("sha256", pepper).update(canonicalKey, "utf8").digest("base64url")
}

export function verifyLicenseKeyHash(canonicalKey: string, expectedHash: string, pepper: string) {
  const actual = Buffer.from(hashLicenseKey(canonicalKey, pepper), "utf8")
  const expected = Buffer.from(expectedHash, "utf8")

  if (actual.length !== expected.length) {
    return false
  }

  return timingSafeEqual(actual, expected)
}
