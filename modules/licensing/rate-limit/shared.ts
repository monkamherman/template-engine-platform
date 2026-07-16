import { MemoryLicenseRateLimiter } from "@/modules/licensing/rate-limit/memory-license-rate-limiter"

const globalForLicenseRateLimit = globalThis as unknown as {
  licenseRateLimiter: MemoryLicenseRateLimiter | undefined
}

export const licenseRateLimiter =
  globalForLicenseRateLimit.licenseRateLimiter ?? new MemoryLicenseRateLimiter()

if (process.env.NODE_ENV !== "production") {
  globalForLicenseRateLimit.licenseRateLimiter = licenseRateLimiter
}
