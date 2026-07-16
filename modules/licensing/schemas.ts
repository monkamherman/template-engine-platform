import { z } from "zod"

import { LICENSE_PROTOCOL_VERSION } from "@/modules/licensing/constants"

export const licenseProtocolHeader = String(LICENSE_PROTOCOL_VERSION)

export const licenseEnvironmentSchema = z.enum(["PRODUCTION", "STAGING"])

export const licenseRequestMetadataSchema = z.object({
  licenseKey: z.string().min(1).max(80),
  installationId: z.string().uuid(),
  siteUrl: z.string().url().max(2048),
  environment: licenseEnvironmentSchema,
  productSlug: z.string().min(1).max(120),
  themeVersion: z.string().min(1).max(64),
  wordpressVersion: z.string().max(64).optional(),
  woocommerceVersion: z.string().max(64).optional(),
  phpVersion: z.string().max(64).optional(),
})

export const activateLicenseRequestSchema = licenseRequestMetadataSchema
export const validateLicenseRequestSchema = licenseRequestMetadataSchema
export const deactivateLicenseRequestSchema = licenseRequestMetadataSchema.omit({ themeVersion: true }).extend({
  themeVersion: z.string().min(1).max(64).optional(),
})

export type ActivateLicenseRequest = z.infer<typeof activateLicenseRequestSchema>
export type ValidateLicenseRequest = z.infer<typeof validateLicenseRequestSchema>
export type DeactivateLicenseRequest = z.infer<typeof deactivateLicenseRequestSchema>

export type LicenseServiceData = {
  license: {
    status: "ACTIVE" | "SUSPENDED" | "EXPIRED" | "REVOKED"
    keyPrefix: string
    keyLast4: string
    expiresAt: string | null
  }
  activation: {
    id?: string
    installationId: string
    environment?: "PRODUCTION" | "STAGING"
    normalizedDomain?: string
    status: "ACTIVE" | "DEACTIVATED" | "BLOCKED"
    activatedAt?: string
    deactivatedAt?: string
  }
  services?: {
    officialUpdates: boolean
    protectedDownloads: boolean
    support: boolean
    updatesUntil: string | null
    supportUntil: string | null
  }
  lease?: {
    token: string
    issuedAt: string
    expiresAt: string
    graceUntil: string
    keyId: string
  }
}
