export { canonicalizeLicenseKey, formatLicenseKey, generateLicenseKey, makeKeyParts } from "./crypto/key-format"
export { hashLicenseKey, verifyLicenseKeyHash } from "./crypto/key-hash"
export { decryptLicenseKey, encryptLicenseKey } from "./crypto/key-encryption"
export { signLicenseLease, verifyLicenseLease } from "./crypto/lease-signer"
export { normalizeActivationDomain } from "./domain/domain-normalization"
export { isActivationLimitReached } from "./domain/license-policy"
export { parseLicenseEnvironment } from "./env"
export { MemoryLicenseRateLimiter } from "./rate-limit/memory-license-rate-limiter"
export {
  changeLicenseLimits,
  issueLicenseForEntitlement,
  reactivateLicense,
  revealLicenseKey,
  revokeLicense,
  rotateLicenseKey,
  suspendLicense,
} from "./services/management-service"
export type { LicenseActivationEnvironment, LicenseLeaseClaims } from "./types"
