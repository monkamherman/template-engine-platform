import type { LicenseRateLimiter, LicenseRateLimitInput } from "@/modules/licensing/rate-limit/license-rate-limiter"

export class MemoryLicenseRateLimiter implements LicenseRateLimiter {
  private readonly hits = new Map<string, { count: number; resetAt: number }>()

  constructor(
    private readonly limit = 30,
    private readonly windowMs = 60_000,
  ) {}

  async consume(input: LicenseRateLimitInput) {
    const key = [input.endpoint, input.clientId, input.licensePrefix ?? "unknown", input.installationId ?? "unknown"].join(":")
    const now = Date.now()
    const current = this.hits.get(key)

    if (!current || current.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs })
      return { allowed: true }
    }

    current.count += 1
    if (current.count > this.limit) {
      return { allowed: false, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) }
    }

    return { allowed: true }
  }
}
