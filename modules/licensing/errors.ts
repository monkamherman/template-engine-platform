export class LicensingError extends Error {
  constructor(
    public readonly code:
      | "BAD_REQUEST"
      | "INVALID_LICENSE"
      | "PRODUCT_MISMATCH"
      | "DOMAIN_MISMATCH"
      | "PRODUCTION_LIMIT_REACHED"
      | "STAGING_LIMIT_REACHED"
      | "SERVICE_UNAVAILABLE",
    message = "The license request could not be completed.",
  ) {
    super(message)
    this.name = "LicensingError"
  }
}
