export type LicenseActivationEnvironment = "PRODUCTION" | "STAGING"

export type LicenseActor = {
  id: string
  type: "system" | "customer" | "operator"
}

export type LicenseLeaseClaims = {
  sub: string
  activationId: string
  installationId: string
  domain: string
  environment: LicenseActivationEnvironment
  licenseStatus: "ACTIVE" | "SUSPENDED" | "EXPIRED" | "REVOKED"
  officialUpdates: boolean
  protectedDownloads: boolean
  support: boolean
  updatesUntil: number | null
  supportUntil: number | null
}
