export type LicenseRateLimitInput = {
  endpoint: "activate" | "validate" | "deactivate"
  clientId: string
  licensePrefix?: string
  installationId?: string
}

export interface LicenseRateLimiter {
  consume(input: LicenseRateLimitInput): Promise<{ allowed: boolean; retryAfterSeconds?: number }>
}
